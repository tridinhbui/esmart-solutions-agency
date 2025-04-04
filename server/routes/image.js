const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const router = express.Router();
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Cấu hình API URL
const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

// Kiểm tra trạng thái FastAPI service
async function checkServiceStatus() {
  try {
    const response = await axios.get(`${FASTAPI_URL}/status`, {
      timeout: 5000,
    });
    return {
      status: "ok",
      message: "FastAPI service is running",
      details: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "FastAPI service is not available",
      error: error.message,
    };
  }
}

// Tạo ảnh từ prompt
router.post("/generate", async (req, res) => {
  try {
    const { prompt, style = "Realistic", width = 768, height = 768 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    // Tạo FormData để gửi đến FastAPI
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", style);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("enhance_prompt", "true");
    formData.append("num_inference_steps", "30");

    // Gửi request đến FastAPI service
    console.log(`Sending request to ${FASTAPI_URL}/generate-image`);
    const response = await axios.post(
      `${FASTAPI_URL}/generate-image`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 300000, // 5 minutes
      }
    );

    // Xử lý response từ FastAPI
    if (response.data && response.data.success) {
      return res.json({
        success: true,
        prompt: response.data.prompt,
        filename: response.data.filename,
        image_url: `${FASTAPI_URL}/images/${response.data.filename}`,
        image_data: response.data.image_data,
      });
    } else {
      throw new Error("Failed to generate image");
    }
  } catch (error) {
    console.error("Error in image generation route:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate image",
      details: error.message,
    });
  }
});

// Tạo ảnh từ topic
router.post("/topic-to-image", async (req, res) => {
  try {
    const { topic, style = "Realistic", width = 768, height = 768 } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        error: "Topic is required",
      });
    }

    // Tạo FormData để gửi đến FastAPI
    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("style", style);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("num_inference_steps", "30");

    // Gửi request đến FastAPI service
    console.log(`Sending request to ${FASTAPI_URL}/topic-to-image`);
    const response = await axios.post(
      `${FASTAPI_URL}/topic-to-image`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 300000, // 5 minutes
      }
    );

    // Xử lý response từ FastAPI
    if (response.data && response.data.success) {
      return res.json({
        success: true,
        topic: response.data.topic,
        prompt: response.data.prompt,
        filename: response.data.filename,
        image_url: `${FASTAPI_URL}/images/${response.data.filename}`,
        image_data: response.data.image_data,
      });
    } else {
      throw new Error("Failed to generate image from topic");
    }
  } catch (error) {
    console.error("Error in topic-to-image generation route:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate image from topic",
      details: error.message,
    });
  }
});

// Check FastAPI service status
router.get("/status", async (req, res) => {
  try {
    const status = await checkServiceStatus();
    res.json(status);
  } catch (error) {
    console.error("Error checking FastAPI service status:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Save an image
router.post("/save", (req, res) => {
  try {
    const { image_data, prompt, style } = req.body;

    if (!image_data) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: image_data is required",
      });
    }

    console.log("[IMAGE] Saving image to server");

    // Xử lý dữ liệu hình ảnh
    const buffer = Buffer.from(image_data, "base64");

    // Tạo mã hash từ dữ liệu hình ảnh để so sánh
    const imageHash = crypto.createHash("md5").update(buffer).digest("hex");

    // Thiết lập đường dẫn thư mục uploads
    const uploadsDir = path.join(__dirname, "../uploads");

    // Đảm bảo thư mục tồn tại
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Kiểm tra tất cả các file trong thư mục uploads để tìm ảnh trùng lặp
    let existingImagePath = null;
    let fileName = null;

    // Lấy danh sách file hiện có
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      // Chỉ kiểm tra các file ảnh
      if (
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg")
      ) {
        const filePath = path.join(uploadsDir, file);
        const fileBuffer = fs.readFileSync(filePath);
        const fileHash = crypto
          .createHash("md5")
          .update(fileBuffer)
          .digest("hex");

        // Nếu hash giống nhau, ảnh đã tồn tại
        if (fileHash === imageHash) {
          existingImagePath = filePath;
          fileName = file;
          console.log(`[IMAGE] Found existing identical image: ${fileName}`);
          break;
        }
      }
    }

    // Nếu ảnh chưa tồn tại, tạo file mới
    if (!existingImagePath) {
      // Tạo tên file duy nhất
      fileName = `image_${Date.now()}.png`;
      const filePath = path.join(uploadsDir, fileName);

      // Lưu file
      fs.writeFileSync(filePath, buffer);
      console.log(`[IMAGE] Saved new image to ${filePath}`);
    } else {
      console.log(
        `[IMAGE] Reusing existing image: ${fileName} instead of creating duplicate`
      );
    }

    // Tạo URL hình ảnh để trả về
    const imageUrl = `${
      process.env.API_URL || "http://localhost:3001"
    }/api/image/uploads/${fileName}`;

    console.log(`[IMAGE] Image saved successfully: ${fileName}`);

    // Trả về kết quả
    res.json({
      success: true,
      message: "Image saved successfully",
      fileName: fileName,
      imageUrl: imageUrl,
      prompt: prompt,
      style: style,
    });
  } catch (error) {
    console.error("[IMAGE] Error saving image:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save image",
      details: error.message,
    });
  }
});

// Route để phục vụ hình ảnh từ thư mục uploads
router.get("/uploads/:fileName", (req, res) => {
  const { fileName } = req.params;
  const path = require("path");
  const fs = require("fs");

  // Đường dẫn đến file yêu cầu
  const filePath = path.join(__dirname, "../uploads", fileName);

  // Đảm bảo thư mục uploads tồn tại
  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at ${uploadsDir}`);
  }

  // Kiểm tra xem file có tồn tại không
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: "File not found",
    });
  }

  // Trả về file
  return res.sendFile(filePath);
});

// Thêm route mới để xử lý hình ảnh base64
router.post("/save-base64", async (req, res) => {
  try {
    const { imageData, contentId } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: "Missing image data",
      });
    }

    // Kiểm tra xem dữ liệu có phải là base64 không
    if (!imageData.startsWith("data:image")) {
      return res.status(400).json({
        success: false,
        error: "Invalid image data format",
      });
    }

    // Xử lý dữ liệu base64
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Nếu có contentId, lưu trực tiếp vào database
    if (contentId) {
      try {
        const Content = require("../models").Content;
        const content = await Content.findByPk(contentId);
        if (content) {
          // Lưu dữ liệu hình ảnh vào database
          content.image_data = buffer;

          // Cập nhật imageUrl để trỏ đến endpoint lấy ảnh từ database
          const imageUrl = `/api/image/content-image/${contentId}`;
          content.imageUrl = imageUrl;

          await content.save();
          console.log(`Image saved to database for content ID: ${contentId}`);

          return res.json({
            success: true,
            imageUrl,
            message: "Image saved to database successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            error: `Content with ID ${contentId} not found`,
          });
        }
      } catch (contentError) {
        console.error(
          `Error saving image to database: ${contentError.message}`
        );
        return res.status(500).json({
          success: false,
          error: "Failed to save image to database: " + contentError.message,
        });
      }
    } else {
      // Nếu không có contentId, lưu vào uploads như trước đây
      const fs = require("fs");
      const path = require("path");
      const crypto = require("crypto");

      // Đảm bảo thư mục uploads tồn tại
      const uploadsDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log(`Created uploads directory at ${uploadsDir}`);
      }

      // Tạo mã hash từ dữ liệu hình ảnh để so sánh
      const imageHash = crypto.createHash("md5").update(buffer).digest("hex");

      // Kiểm tra tất cả các file trong thư mục uploads
      let existingImagePath = null;
      let fileName = null;

      // Lấy danh sách file hiện có
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        // Chỉ kiểm tra các file ảnh
        if (
          file.endsWith(".png") ||
          file.endsWith(".jpg") ||
          file.endsWith(".jpeg")
        ) {
          const filePath = path.join(uploadsDir, file);
          const fileBuffer = fs.readFileSync(filePath);
          const fileHash = crypto
            .createHash("md5")
            .update(fileBuffer)
            .digest("hex");

          // Nếu hash giống nhau, ảnh đã tồn tại
          if (fileHash === imageHash) {
            existingImagePath = filePath;
            fileName = file;
            console.log(`Found existing identical image: ${fileName}`);
            break;
          }
        }
      }

      // Nếu ảnh chưa tồn tại, tạo file mới
      if (!existingImagePath) {
        // Tạo tên file duy nhất
        const timestamp = Date.now();
        fileName = `image_${timestamp}.png`;
        const filePath = path.join(uploadsDir, fileName);

        // Lưu file
        fs.writeFileSync(filePath, buffer);
        console.log(`Saved new base64 image to ${filePath}`);
      } else {
        console.log(
          `Reusing existing image: ${fileName} instead of creating duplicate`
        );
      }

      // Trả về URL cho client
      const imageUrl = `/api/image/uploads/${fileName}`;

      return res.json({
        success: true,
        imageUrl,
        message: "Image saved successfully",
      });
    }
  } catch (error) {
    console.error("Error saving base64 image:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to save image: " + error.message,
    });
  }
});

// Endpoint để lấy hình ảnh từ database dựa vào contentId
router.get("/content-image/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;

    // Lấy dữ liệu hình ảnh từ database
    const Content = require("../models").Content;
    const content = await Content.findByPk(contentId);

    if (!content || !content.image_data) {
      return res.status(404).json({
        success: false,
        error: "Không tìm thấy hình ảnh trong cơ sở dữ liệu",
      });
    }

    // Thiết lập header phù hợp
    res.setHeader("Content-Type", "image/png");
    // Gửi dữ liệu hình ảnh về client
    res.send(content.image_data);
  } catch (error) {
    console.error("Error retrieving image from database:", error);
    res.status(500).json({
      success: false,
      error: "Lỗi khi lấy hình ảnh từ cơ sở dữ liệu",
      details: error.message,
    });
  }
});

module.exports = router;
