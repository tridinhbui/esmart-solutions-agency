const express = require("express");
const {
  generateContent,
  generateOptimizedContent,
} = require("../services/deepseek");
const {
  getProjectContent,
  getContentById,
  createContent,
  deleteContent,
  updateContent,
  getAllContents,
  generateImageForContent,
  generatePromptFromContent,
  updateContentPartial,
} = require("../controllers/contentController");
const { Content } = require("../models");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    content: "hello world"
  });
});

// Get all contents
router.get("/contents", getAllContents);

// Generate content endpoint
router.post("/generate-content", async (req, res) => {
  try {
    const { topic, keywords, tone, type } = req.body;

    // Validate input
    if (!topic || !keywords) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: topic and keywords are required",
      });
    }

    console.log(
      `Generating content for topic: "${topic}" with keywords: "${keywords}"`
    );

    // Generate content using API service
    const generatedContent = await generateContent(topic, keywords, tone, type);

    // Log success (but not the entire content)
    console.log(
      `Content generated successfully for "${topic}" (${generatedContent.length} chars)`
    );

    // Send response
    res.json({
      success: true,
      content: generatedContent,
    });
  } catch (error) {
    console.error("Error in content generation route:", error);

    // Send a more detailed error response
    res.status(500).json({
      success: false,
      error: "Failed to generate content",
      details: error.message,
      code: error.code || "UNKNOWN_ERROR",
    });
  }
});

// Add new endpoint using automated workflow
router.post("/generate-optimized-content", async (req, res) => {
  try {
    const { topic, keywords, tone, type } = req.body;

    // Validate input
    if (!topic || !keywords) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: topic and keywords are required",
      });
    }

    console.log(
      `Generating optimized content using automated workflow for topic: "${topic}" with keywords: "${keywords}"`
    );

    // Generate content using optimized workflow
    const result = await generateOptimizedContent(topic, keywords, tone, type);

    // If content exists (whether there were errors or not)
    if (result.content) {
      // Log success or partial success
      if (result.usedFallback) {
        console.log(
          `Optimized content generated with fallbacks for "${topic}" (${result.content.length} chars). Errors: ${result.errorMessage}`
        );
      } else {
        console.log(
          `Optimized content generated successfully for "${topic}" (${result.content.length} chars)`
        );
      }

      // Return result with error information if any
      return res.json({
        success: true,
        content: result.content,
        trendKeywords: result.trendKeywords,
        workflow: "deepseek-gemini-optimized",
        usedFallback: result.usedFallback || false,
        errorMessage: result.errorMessage || "",
      });
    } else {
      // Very rare case where no content was generated
      throw new Error("No content was generated");
    }
  } catch (error) {
    console.error("Error in optimized content generation route:", error);

    // If serious error, return 500 with detailed information
    res.status(500).json({
      success: false,
      error: "Failed to generate optimized content",
      details: error.message,
      code: error.code || "WORKFLOW_ERROR",
    });
  }
});

// Add routes for project content management
// Get all content for a project
router.get("/project-contents/:projectId", getProjectContent);

// Get content by ID
router.get("/contents/:id", getContentById);

// Create content and associate with project
router.post("/contents", createContent);

// Update content (full update requiring generatedContent)
router.put("/contents/:id", updateContent);

// Update content partially (allows updating just imageUrl or other fields)
router.patch("/contents/:id", updateContentPartial);

// Delete content
router.delete("/contents/:id", deleteContent);

// Generate image for content
router.post("/contents/:id/generate-image", generateImageForContent);

// Save image data to content
router.post("/contents/:id/save-image", async (req, res) => {
  try {
    const { id } = req.params;
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({
        success: false,
        error: "Missing image data",
      });
    }

    // Find the content record
    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Process the base64 data
    let base64Data;
    if (imageData.startsWith("data:image")) {
      base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    } else {
      base64Data = imageData;
    }

    // Convert to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Update the content record
    content.image_data = buffer;
    content.imageUrl = `/api/image/content-image/${id}`;

    await content.save();

    console.log(
      `[IMAGE] Saved image directly to database for content ID: ${id}`
    );

    return res.json({
      success: true,
      imageUrl: content.imageUrl,
      message: "Image saved to database successfully",
    });
  } catch (error) {
    console.error("Error saving image to content:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to save image to content",
    });
  }
});

// Generate prompt from content for image generation
router.post("/contents/generate-prompt", generatePromptFromContent);

// Partial update route for content
router.patch("/contents/:contentId/partial", async (req, res) => {
  try {
    const { contentId } = req.params;
    const updateFields = req.body;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        error: "Missing content ID",
      });
    }

    // Find existing content
    const content = await Content.findByPk(contentId);
    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    console.log(`Updating content ${contentId} with fields:`, updateFields);

    // Update provided fields
    await content.update(updateFields);

    return res.json({
      success: true,
      data: content,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content partially:", error);
    return res.status(500).json({
      success: false,
      error: `Failed to update content: ${error.message}`,
    });
  }
});

// Add a test endpoint to verify API is working
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Content generation API is working",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
