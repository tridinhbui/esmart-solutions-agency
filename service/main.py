from fastapi import FastAPI, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
from diffusers import KandinskyV22Pipeline, KandinskyV22PriorPipeline
import io
import os
import requests
import base64
import uuid
from dotenv import load_dotenv
import logging
from typing import Optional, List

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Set device - use MPS for Apple Silicon (M1/M2)
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

# Load environment variables
load_dotenv()

app = FastAPI(title="Esmart AI Image Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production environment, specify specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Declare global variables
PRIOR_MODEL_ID = "kandinsky-community/kandinsky-2-2-prior"
MODEL_ID = "kandinsky-community/kandinsky-2-2-decoder"
OUTPUT_DIR = "outputs"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

# Ensure the outputs directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Lazy loading models to optimize memory
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
    """Return image data without saving to disk"""
    # Generate a filename for reference purposes only
    filename = f"{uuid.uuid4()}.png"
    
    # Don't save to file system, instead return the filename and image object
    logger.info(f"Generated image with filename: {filename} (not saved to disk)")
    return None, filename

async def generate_improved_prompt(original_prompt):
    """Use DeepSeek to improve prompt"""
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
    """Check the status of the API and models"""
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
    Create an image from a text prompt using Kandinsky 2.2
    - prompt: Description of the image content to create
    - negative_prompt: Description of what should not appear in the image
    - width, height: Image size (pixels)
    - num_inference_steps: Number of inference steps (higher = better quality but slower)
    - guidance_scale: Level of adherence to prompt (higher = more closely follows prompt)
    - style: Artistic style
    """
    try:
        # Improve prompt if requested
        if enhance_prompt:
            # Add style to original prompt
            styled_prompt = f"{prompt}, {style} style"
            final_prompt = await generate_improved_prompt(styled_prompt)
        else:
            # If not improving, still add style to prompt
            final_prompt = f"{prompt}, {style} style"
        
        # Load models if not already loaded
        prior = load_prior_model()
        decoder = load_model()
        
        # Create image embeddings using prior model
        logger.info(f"Generating image embedding for prompt: {final_prompt}")
        image_embeds, negative_image_embeds = prior(
            prompt=final_prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps
        ).to_tuple()
        
        # Create image from embeddings using decoder model
        logger.info("Generating image from embeddings...")
        image = decoder(
            image_embeds=image_embeds,
            negative_image_embeds=negative_image_embeds,
            height=height,
            width=width,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Return reference filename only, don't save to disk
        _, filename = save_image(image, final_prompt)
        
        # Convert image to base64 to return
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
    Create an image from a topic by creating a prompt from the topic first
    """
    try:
        # Create a detailed prompt from topic using DeepSeek
        prompt_prefix = f"Create a visually striking image of {topic} in {style} style."
        improved_prompt = await generate_improved_prompt(prompt_prefix)
        
        # Call the generate-image API
        # Load models if not already loaded
        prior = load_prior_model()
        decoder = load_model()
        
        # Create image embeddings using prior model
        logger.info(f"Generating image embedding for prompt: {improved_prompt}")
        image_embeds, negative_image_embeds = prior(
            prompt=improved_prompt,
            negative_prompt="low quality, blurry, deformed",
            num_inference_steps=num_inference_steps
        ).to_tuple()
        
        # Create image from embeddings using decoder model
        logger.info("Generating image from embeddings...")
        image = decoder(
            image_embeds=image_embeds,
            negative_image_embeds=negative_image_embeds,
            height=height,
            width=width,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Return reference filename only, don't save to disk
        _, filename = save_image(image, improved_prompt)
        
        # Convert image to base64 to return
        buffer = io.BytesIO()
        image.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        
        return JSONResponse({
            "success": True,
            "prompt": improved_prompt,
            "filename": filename,
            "image_data": img_str
        })
        
    except Exception as e:
        logger.error(f"Error generating image from topic: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image from topic: {str(e)}")

@app.get("/images/{filename}")
async def get_image(filename: str):
    """
    This endpoint is no longer needed because images are stored directly in the database
    Kept for backward compatibility with older versions
    """
    logger.warning(f"Deprecated endpoint called: GET /images/{filename}")
    return JSONResponse({
        "success": false,
        "error": "Images are now stored in the database, not in the file system"
    }, status_code=410)  # 410 Gone status code

@app.delete("/images/{filename}")
async def delete_image(filename: str):
    """
    This endpoint is no longer needed because images are stored directly in the database
    Kept for backward compatibility with older versions
    """
    logger.warning(f"Deprecated endpoint called: DELETE /images/{filename}")
    return JSONResponse({
        "success": False,
        "error": "Images are now stored in the database, not in the file system"
    }, status_code=410)  # 410 Gone status code

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 