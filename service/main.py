from fastapi import FastAPI, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import torch
from diffusers import KandinskyV22Pipeline, KandinskyV22PriorPipeline, AutoPipelineForText2Image
from PIL import Image
import io
import os
import json
import requests
import base64
import uuid
from dotenv import load_dotenv
import logging
from typing import Optional, List

# Cấu hình logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Thiết lập device - sử dụng MPS cho Apple Silicon (M1/M2)
if torch.backends.mps.is_available():
    device = "mps"
    logger.info("Using MPS (Metal Performance Shaders) for Apple Silicon")
elif torch.cuda.is_available():
    device = "cuda"
    logger.info("Using CUDA for GPU acceleration")
else:
    device = "cpu"
    logger.info("Using CPU for computation")

# Set default device
torch.set_default_device(device)

# Load các biến môi trường
load_dotenv()

app = FastAPI(title="Esmart AI Image Generator API")

# Thiết lập CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Trong môi trường production, hãy chỉ định domain cụ thể
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Khai báo các biến toàn cục
PRIOR_MODEL_ID = "kandinsky-community/kandinsky-2-2-prior"
MODEL_ID = "kandinsky-community/kandinsky-2-2-decoder"
OUTPUT_DIR = "outputs"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

# Đảm bảo thư mục outputs tồn tại
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Lazy loading models để tối ưu memory
prior_pipe = None
pipe = None

def load_prior_model():
    global prior_pipe
    if prior_pipe is None:
        logger.info("Loading Kandinsky 2.2 Prior model...")
        prior_pipe = KandinskyV22PriorPipeline.from_pretrained(
            PRIOR_MODEL_ID, 
            torch_dtype=torch.float16,
            use_safetensors=True
        )
        prior_pipe = prior_pipe.to(device)
        logger.info(f"Prior model loaded successfully on {device}")
    return prior_pipe

def load_model():
    global pipe
    if pipe is None:
        logger.info("Loading Kandinsky 2.2 Decoder model...")
        pipe = KandinskyV22Pipeline.from_pretrained(
            MODEL_ID,
            torch_dtype=torch.float16,
            use_safetensors=True
        )
        pipe = pipe.to(device)
        logger.info(f"Decoder model loaded successfully on {device}")
    return pipe

def save_image(image, prompt):
    """Lưu ảnh vào thư mục outputs"""
    filename = f"{uuid.uuid4()}.png"
    filepath = os.path.join(OUTPUT_DIR, filename)
    image.save(filepath)
    logger.info(f"Image saved to {filepath}")
    return filepath, filename

async def generate_improved_prompt(original_prompt):
    """Sử dụng DeepSeek để cải thiện prompt"""
    if not OPENROUTER_API_KEY:
        logger.warning("OpenRouter API key not found, using original prompt")
        return original_prompt

    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "deepseek-ai/deepseek-llm-67b-chat",
            "messages": [
                {"role": "system", "content": "You are an AI image prompt engineer. Improve the given text to create a detailed, vivid image prompt for an AI image generator. Add more details, artistic style, lighting, mood, and visual elements to make it more specific and visually interesting. Respond only with the improved prompt, no explanations."},
                {"role": "user", "content": original_prompt}
            ],
            "max_tokens": 500
        }
        
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data
        )
        
        if response.status_code == 200:
            improved_prompt = response.json()["choices"][0]["message"]["content"]
            logger.info(f"Original prompt: {original_prompt}")
            logger.info(f"Improved prompt: {improved_prompt}")
            return improved_prompt
        else:
            logger.error(f"Error from OpenRouter API: {response.text}")
            return original_prompt
    except Exception as e:
        logger.error(f"Error generating improved prompt: {str(e)}")
        return original_prompt

@app.get("/")
async def root():
    return {"message": "Esmart AI Image Generator API is running"}

@app.get("/status")
async def check_status():
    """Kiểm tra trạng thái của API và các models"""
    cuda_available = torch.cuda.is_available()
    mps_available = torch.backends.mps.is_available()
    cuda_device = torch.cuda.get_device_name(0) if cuda_available else "N/A"
    return {
        "status": "running",
        "cuda_available": cuda_available,
        "mps_available": mps_available,
        "device": device,
        "cuda_device": cuda_device,
        "models": {
            "prior": prior_pipe is not None,
            "decoder": pipe is not None
        }
    }

@app.post("/generate-image")
async def generate_image(
    prompt: str = Form(...),
    negative_prompt: Optional[str] = Form("low quality, blurry"),
    enhance_prompt: Optional[bool] = Form(False),
    width: Optional[int] = Form(512),
    height: Optional[int] = Form(512),
    num_inference_steps: Optional[int] = Form(20),
    guidance_scale: Optional[float] = Form(7.5),
    style: Optional[str] = Form("Simple")
):
    """
    Tạo ảnh từ prompt văn bản sử dụng Kandinsky 2.2
    - prompt: Mô tả nội dung ảnh muốn tạo
    - negative_prompt: Mô tả những gì không muốn xuất hiện trong ảnh
    - width, height: Kích thước ảnh (pixels)
    - num_inference_steps: Số bước suy luận (cao hơn = chất lượng tốt hơn nhưng chậm hơn)
    - guidance_scale: Mức độ tuân thủ prompt (cao hơn = theo sát prompt hơn)
    - style: Phong cách nghệ thuật
    """
    try:
        # Cải thiện prompt nếu được yêu cầu
        if enhance_prompt:
            # Thêm style vào prompt gốc
            styled_prompt = f"{prompt}, {style} style"
            final_prompt = await generate_improved_prompt(styled_prompt)
        else:
            # Nếu không cải thiện, vẫn thêm style vào prompt
            final_prompt = f"{prompt}, {style} style"
        
        # Load models nếu chưa được load
        prior = load_prior_model()
        decoder = load_model()
        
        # Tạo image embeddings bằng prior model
        logger.info(f"Generating image embedding for prompt: {final_prompt}")
        image_embeds, negative_image_embeds = prior(
            prompt=final_prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps
        ).to_tuple()
        
        # Tạo ảnh từ embeddings bằng decoder model
        logger.info("Generating image from embeddings...")
        image = decoder(
            image_embeds=image_embeds,
            negative_image_embeds=negative_image_embeds,
            height=height,
            width=width,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Lưu ảnh vào thư mục và trả về đường dẫn
        filepath, filename = save_image(image, final_prompt)
        
        # Chuyển đổi ảnh thành base64 để trả về
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        
        return JSONResponse({
            "success": True,
            "prompt": final_prompt,
            "filename": filename,
            "image_data": img_str
        })
        
    except Exception as e:
        logger.error(f"Error generating image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

@app.post("/topic-to-image")
async def topic_to_image(
    topic: str = Form(...),
    style: Optional[str] = Form("Simple"),
    width: Optional[int] = Form(512),
    height: Optional[int] = Form(512),
    num_inference_steps: Optional[int] = Form(20)
):
    """
    Tạo ảnh từ một chủ đề (topic) bằng cách tạo prompt từ chủ đề trước
    """
    try:
        # Tạo một prompt chi tiết từ topic sử dụng DeepSeek
        prompt_prefix = f"Create a visually striking image of {topic} in {style} style."
        improved_prompt = await generate_improved_prompt(prompt_prefix)
        
        # Gọi lại API generate-image
        # Load models nếu chưa được load
        prior = load_prior_model()
        decoder = load_model()
        
        # Tạo image embeddings bằng prior model
        logger.info(f"Generating image embedding for topic: {topic}")
        image_embeds, negative_image_embeds = prior(
            prompt=improved_prompt,
            negative_prompt="low quality, blurry",
            guidance_scale=7.5,
            num_inference_steps=num_inference_steps
        ).to_tuple()
        
        # Tạo ảnh từ embeddings bằng decoder model
        logger.info("Generating image from embeddings...")
        image = decoder(
            image_embeds=image_embeds,
            negative_image_embeds=negative_image_embeds,
            height=height,
            width=width,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Lưu ảnh vào thư mục và trả về đường dẫn
        filepath, filename = save_image(image, improved_prompt)
        
        # Chuyển đổi ảnh thành base64 để trả về
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        
        return JSONResponse({
            "success": True,
            "topic": topic,
            "prompt": improved_prompt,
            "filename": filename,
            "image_data": img_str
        })
        
    except Exception as e:
        logger.error(f"Error generating image from topic: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image from topic: {str(e)}")

@app.get("/images/{filename}")
async def get_image(filename: str):
    """Trả về một ảnh đã tạo theo filename"""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if not os.path.isfile(filepath):
        raise HTTPException(status_code=404, detail="Image not found")
    return FileResponse(filepath)

@app.delete("/images/{filename}")
async def delete_image(filename: str):
    """Xóa một ảnh đã tạo theo filename"""
    filepath = os.path.join(OUTPUT_DIR, filename)
    if not os.path.isfile(filepath):
        return JSONResponse({
            "success": False,
            "message": "Image not found",
        }, status_code=404)
    
    try:
        os.remove(filepath)
        logger.info(f"Deleted image: {filename}")
        return JSONResponse({
            "success": True,
            "message": f"Successfully deleted image: {filename}",
        })
    except Exception as e:
        logger.error(f"Error deleting image {filename}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error deleting image: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 