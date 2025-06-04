const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const router = express.Router();
require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const crypto = require("crypto");

// Configure API URL
const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

// Check FastAPI service status
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

// Create image from prompt
router.post("/generate", async (req, res) => {
  try {
    const { prompt, style = "Realistic", width = 768, height = 768 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    // Create FormData to send to FastAPI
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", style);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("enhance_prompt", "true");
    formData.append("num_inference_steps", "30");

    // Send request to FastAPI service
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

    // Process response from FastAPI
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

// Create image from topic
router.post("/topic-to-image", async (req, res) => {
  try {
    const { topic, style = "Realistic", width = 768, height = 768 } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        error: "Topic is required",
      });
    }

    // Create FormData to send to FastAPI
    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("style", style);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("num_inference_steps", "30");

    // Send request to FastAPI service
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

    // Process response from FastAPI
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
router.post("/save", async (req, res) => {
  try {
    const { image_data, prompt, style, contentId } = req.body;

    if (!image_data) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: image_data is required",
      });
    }

    console.log("[IMAGE] Processing image save request");

    // Parse the base64 image data
    const buffer = Buffer.from(image_data, "base64");

    // If contentId is provided, save directly to the associated content record
    if (contentId) {
      const Content = require("../models").Content;
      const content = await Content.findByPk(contentId);

      if (!content) {
        return res.status(404).json({
          success: false,
          error: "Content not found",
        });
      }

      // Save image to database
      content.image_data = buffer;
      content.imageUrl = `/api/image/content-image/${contentId}`;
      content.imagePrompt = prompt || content.imagePrompt;

      await content.save();

      console.log(
        `[IMAGE] Saved image directly to database for content ID: ${contentId}`
      );

      return res.json({
        success: true,
        imageUrl: content.imageUrl,
        message: "Image saved to database successfully",
      });
    } else {
      // If no contentId is provided, create a temporary content record
      // to store the image or return an error
      return res.status(400).json({
        success: false,
        error: "contentId is required to save images",
      });
    }
  } catch (error) {
    console.error("Error saving image:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to save image: " + error.message,
    });
  }
});

// Route to serve images from the uploads directory - now deprecated
router.get("/uploads/:fileName", (req, res) => {
  const { fileName } = req.params;

  console.log(
    `[WARNING] Deprecated /uploads/${fileName} endpoint called. Images are now stored in database.`
  );

  // Return a proper error message explaining that the endpoint is deprecated
  return res.status(410).json({
    success: false,
    error:
      "This endpoint is deprecated. Images are now stored in the database.",
    message:
      "Please update your code to use /api/image/content-image/:contentId instead.",
  });
});

// Add new route to handle base64 image
router.post("/save-base64", async (req, res) => {
  try {
    const { imageData, contentId } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: "Missing image data",
      });
    }

    // Check if the data is base64
    if (!imageData.startsWith("data:image")) {
      return res.status(400).json({
        success: false,
        error: "Invalid image data format",
      });
    }

    // Process base64 data
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // If contentId is provided, save directly to the database
    if (contentId) {
      try {
        const Content = require("../models").Content;
        const content = await Content.findByPk(contentId);
        if (content) {
          // Save image data to database
          content.image_data = buffer;

          // Update imageUrl to point to the endpoint to get image from database
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
      // If no contentId, return an error
      return res.status(400).json({
        success: false,
        error: "contentId is required to save images",
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

// Endpoint to retrieve image from database based on contentId
router.get("/content-image/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;

    // Get image data from database
    const Content = require("../models").Content;
    const content = await Content.findByPk(contentId);

    if (!content || !content.image_data) {
      return res.status(404).json({
        success: false,
        error: "Image not found in database",
      });
    }

    // Set appropriate header
    res.setHeader("Content-Type", "image/png");
    // Send image data to client
    res.send(content.image_data);
  } catch (error) {
    console.error("Error retrieving image from database:", error);
    res.status(500).json({
      success: false,
      error: "Error retrieving image from database",
      details: error.message,
    });
  }
});

module.exports = router;