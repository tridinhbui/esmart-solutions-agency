const { Content, Project } = require("../models");
const {
  generateContent,
  generateOptimizedContent,
} = require("../services/deepseek");

// Get all contents
const getAllContents = async (req, res) => {
  try {
    const contents = await Content.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Project,
          attributes: ["title", "description", "type", "status"],
        },
      ],
    });

    res.json({
      success: true,
      data: contents,
    });
  } catch (error) {
    console.error("Error fetching all contents:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contents",
      details: error.message,
    });
  }
};

// Get all content for a project
const getProjectContent = async (req, res) => {
  try {
    const { projectId } = req.params;

    const contents = await Content.findAll({
      where: { projectId },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: contents,
    });
  } catch (error) {
    console.error("Error fetching project content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch project content",
      details: error.message,
    });
  }
};

// Get content by ID
const getContentById = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch content",
      details: error.message,
    });
  }
};

// Create content
const createContent = async (req, res) => {
  try {
    const {
      projectId,
      topic,
      keywords,
      tone,
      contentType,
      useOptimizedWorkflow = true,
      generateImage = false,
      imageStyle = "Realistic",
    } = req.body;

    if (!projectId || !topic || !keywords || !tone || !contentType) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        details:
          "projectId, topic, keywords, tone, and contentType are required",
      });
    }

    // Check if project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    // Create initial content entry
    const contentEntry = await Content.create({
      projectId,
      topic,
      keywords,
      tone,
      contentType,
      generatedContent: null,
    });

    try {
      console.log(
        `Generating content for topic: "${topic}" with keywords: "${keywords}"`
      );

      let generatedContent;
      let additionalData = {};

      // Use optimized workflow if requested
      if (useOptimizedWorkflow) {
        console.log("Using optimized DeepSeek-Gemini workflow");

        // Pass topic explicitly to ensure trending keywords match the content topic
        const result = await generateOptimizedContent(
          topic,
          keywords,
          tone,
          contentType
        );

        generatedContent = result.content;
        additionalData = {
          trendKeywords: result.trendKeywords,
          optimizedWorkflow: true,
          optimizedPrompt: result.usedPrompt,
          usedFallback: result.usedFallback || false,
          errorMessage: result.errorMessage || "",
        };

        // Log results
        if (result.usedFallback) {
          console.log(
            `Content generated with fallbacks: ${result.errorMessage}`
          );
        } else {
          console.log("Content generated successfully with optimized workflow");
        }
      } else {
        // Use standard method if not using optimized workflow
        console.log("Using standard content generation");
        generatedContent = await generateContent(
          topic,
          keywords,
          tone,
          contentType
        );
      }

      if (!generatedContent) {
        throw new Error("Generated content is null or empty");
      }

      // Update content entry with generated content
      contentEntry.generatedContent = generatedContent;
      if (additionalData.trendKeywords) {
        contentEntry.seoData = JSON.stringify(additionalData);
      }
      await contentEntry.save();

      // Generate image if requested
      let imageData = null;
      if (generateImage) {
        try {
          console.log("Generating image for content");
          const FormData = require("form-data");
          const axios = require("axios");
          const FASTAPI_URL =
            process.env.FASTAPI_URL || "http://localhost:8000";

          // Kiểm tra trạng thái FastAPI service trước khi gửi yêu cầu
          console.log(
            `[IMAGE] Checking FastAPI service status at ${FASTAPI_URL}`
          );
          try {
            const statusResponse = await axios.get(`${FASTAPI_URL}/status`, {
              timeout: 5000,
            });

            if (!statusResponse.data || !statusResponse.data.running) {
              console.error("[IMAGE] FastAPI service is not running or ready");
              return res.status(503).json({
                success: false,
                error: "Image generation service is not ready",
                details:
                  "The service is either starting up or not fully initialized",
                code: "SERVICE_NOT_READY",
              });
            }

            console.log(
              "[IMAGE] FastAPI service is up and running, proceeding with image generation"
            );
          } catch (statusError) {
            console.error(
              "[IMAGE] Failed to check FastAPI service status:",
              statusError.message
            );
            return res.status(503).json({
              success: false,
              error: "Cannot connect to image generation service",
              details:
                "Failed to connect to the FastAPI service for status check",
              code: "SERVICE_UNAVAILABLE",
            });
          }

          // Prepare the FormData for the FastAPI service
          const formData = new FormData();
          formData.append("topic", `${topic}. Keywords: ${keywords}`);
          formData.append("style", imageStyle);
          formData.append("width", 768);
          formData.append("height", 768);
          formData.append("num_inference_steps", "30");

          // Call the FastAPI service to generate the image
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

          if (response.data && response.data.success) {
            // Kiểm tra phản hồi từ FastAPI
            const fastApiFilename = response.data.filename;
            let imageUrl = null;

            if (response.data.image_data) {
              // Nếu có dữ liệu hình ảnh, lưu hình ảnh vào thư mục uploads
              const fs = require("fs");
              const path = require("path");
              const crypto = require("crypto");

              // Tạo buffer từ dữ liệu base64
              const buffer = Buffer.from(response.data.image_data, "base64");

              // Tạo mã hash từ dữ liệu hình ảnh để so sánh
              const imageHash = crypto
                .createHash("md5")
                .update(buffer)
                .digest("hex");

              // Kiểm tra xem ảnh đã tồn tại chưa
              const uploadsDir = path.join(__dirname, "../uploads");

              // Đảm bảo thư mục tồn tại
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
              }

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
                    console.log(
                      `[IMAGE] Found existing identical image: ${fileName}`
                    );
                    break;
                  }
                }
              }

              // Nếu ảnh chưa tồn tại, tạo file mới
              if (!existingImagePath) {
                // Tạo tên tệp tin mới
                fileName = `image_${Date.now()}.png`;
                const filePath = path.join(uploadsDir, fileName);

                // Lưu tệp tin
                fs.writeFileSync(filePath, buffer);
                console.log(
                  `[IMAGE] Saved new image to uploads folder: ${fileName}`
                );
              } else {
                console.log(
                  `[IMAGE] Reusing existing image: ${fileName} instead of creating duplicate`
                );
              }

              // Tạo URL cho hình ảnh trên server của chúng ta
              imageUrl = `/api/image/uploads/${fileName}`;
              console.log(
                `[IMAGE] Using image from server uploads folder: ${fileName}`
              );
            } else if (fastApiFilename) {
              // Dùng URL từ FastAPI nếu không có dữ liệu hình ảnh
              imageUrl = `${FASTAPI_URL}/images/${fastApiFilename}`;
              console.log(`[IMAGE] Using FastAPI provided image: ${imageUrl}`);
            }

            // Kiểm tra nếu có URL hình ảnh
            if (!imageUrl) {
              throw new Error(
                "No image URL or data was returned from the image generation service"
              );
            }

            console.log(
              `[IMAGE] Image generated successfully. URL: ${imageUrl}`
            );

            // Cập nhật nội dung với URL hình ảnh và prompt
            contentEntry.imageUrl = imageUrl;
            contentEntry.imagePrompt = response.data.prompt;
            await contentEntry.save();
            console.log(
              `[IMAGE] Content updated with new image URL for ID: ${id}`
            );

            return res.json({
              success: true,
              data: {
                contentId: contentEntry.id,
                topic: response.data.topic,
                prompt: response.data.prompt,
                imageUrl: imageUrl,
                imageData: response.data.image_data,
              },
              message: "Image generated and linked to content successfully",
            });
          }
        } catch (imageError) {
          console.error("Error generating image:", imageError);
          // Don't fail the entire request if image generation fails
          additionalData.imageGenerationError = imageError.message;
        }
      }

      // If content was successfully generated, return it
      return res.json({
        success: true,
        data: contentEntry,
        additionalData,
        imageData,
        message: additionalData.usedFallback
          ? "Content created with fallback methods due to some errors"
          : "Content created successfully",
      });
    } catch (error) {
      console.error("Error generating content:", error);

      // Try to create simple content if everything else fails
      let fallbackContent = "";
      try {
        // Generate simple sample content
        console.log("Attempting to generate simple fallback content");
        if (contentType === "blog") {
          fallbackContent = `# ${topic}\n\nThis is a placeholder article about ${topic}.\n\nKeywords: ${keywords}`;
        } else if (contentType === "social") {
          fallbackContent = `Check out our latest content about ${topic}! #${keywords
            .split(",")[0]
            .trim()
            .replace(/\s+/g, "")}`;
        } else {
          fallbackContent = `Content about ${topic}\n\nKeywords: ${keywords}`;
        }

        // Update content entry with fallback content
        contentEntry.generatedContent = fallbackContent;
        await contentEntry.save();

        return res.status(500).json({
          success: false,
          error: "Error generating detailed content",
          data: contentEntry,
          fallback: true,
          message: "Simple fallback content created instead",
          details: error.message,
        });
      } catch (fallbackError) {
        console.error("Error creating fallback content:", fallbackError);

        // If even the fallback fails, return a more detailed error
        return res.status(500).json({
          success: false,
          error: "Failed to generate content",
          details: error.message,
          fallbackError: fallbackError.message,
        });
      }
    }
  } catch (error) {
    console.error("Error in content creation:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create content",
      details: error.message,
    });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Delete associated image file if exists
    if (content.imageUrl) {
      try {
        const fs = require("fs");
        const path = require("path");
        const axios = require("axios");
        const crypto = require("crypto");
        const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

        // Extract filename from imageUrl
        const imageUrlParts = content.imageUrl.split("/");
        const filename = imageUrlParts[imageUrlParts.length - 1];

        console.log(`[IMAGE] Attempting to delete image file: ${filename}`);

        // Track if any images were found and deleted
        let imagesDeleted = false;
        let imageContent = null;

        // If we can get the image content for hash comparison
        try {
          // Try to read the image if it's in uploads folder
          if (filename.startsWith("image_")) {
            const uploadPath = path.join(__dirname, "../uploads", filename);
            if (fs.existsSync(uploadPath)) {
              imageContent = fs.readFileSync(uploadPath);
              const imageHash = crypto
                .createHash("md5")
                .update(imageContent)
                .digest("hex");
              console.log(`[IMAGE] Original image hash: ${imageHash}`);
            }
          }
        } catch (readError) {
          console.error(
            `[IMAGE] Error reading image file: ${readError.message}`
          );
        }

        // Check if image is from FastAPI or local uploads folder
        if (
          content.imageUrl.includes(FASTAPI_URL) ||
          content.imageUrl.includes("/images/")
        ) {
          // Try to delete the image through FastAPI
          try {
            await axios.delete(`${FASTAPI_URL}/images/${filename}`, {
              timeout: 5000,
            });
            console.log(
              `[IMAGE] Successfully deleted image file from FastAPI: ${filename}`
            );
            imagesDeleted = true;
          } catch (fastApiError) {
            console.error(
              `[IMAGE] Error deleting image file through FastAPI API: ${fastApiError.message}`
            );
          }
        }

        // Function to delete image from a directory
        const deleteImageFromDir = (dir, fileName) => {
          try {
            const filePath = path.join(dir, fileName);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              console.log(
                `[IMAGE] Successfully deleted image file from ${dir}: ${fileName}`
              );
              imagesDeleted = true;
              return true;
            }
            return false;
          } catch (error) {
            console.error(
              `[IMAGE] Error deleting from ${dir}: ${error.message}`
            );
            return false;
          }
        };

        // Function to scan a directory for similar images based on hash or filename pattern
        const scanDirectoryForImages = (dirPath, baseFileName) => {
          if (!fs.existsSync(dirPath)) {
            console.log(`[IMAGE] Directory does not exist: ${dirPath}`);
            return;
          }

          // Extract timestamp part from filename for pattern matching
          let timestampPattern = null;
          let fileBaseName = null;

          if (baseFileName.startsWith("image_")) {
            const parts = baseFileName.split("_");
            if (parts.length > 1) {
              const timestamp = parts[1].split(".")[0];
              // Use first few digits of timestamp for pattern matching
              if (timestamp.length >= 4) {
                timestampPattern = timestamp.substring(0, 4);
                console.log(
                  `[IMAGE] Looking for pattern: image_*${timestampPattern}*`
                );
              }
              fileBaseName = "image_";
            }
          } else {
            // For other file types, use the first part of the name for pattern matching
            fileBaseName = baseFileName.split(".")[0];
            if (fileBaseName && fileBaseName.length > 3) {
              // Use first few characters as pattern
              timestampPattern = fileBaseName.substring(
                0,
                Math.min(fileBaseName.length, 5)
              );
              console.log(`[IMAGE] Looking for pattern: *${timestampPattern}*`);
            }
          }

          // Scan directory for files
          const files = fs.readdirSync(dirPath);
          console.log(
            `[IMAGE] Scanning ${dirPath}, found ${files.length} files`
          );

          for (const file of files) {
            // Skip if not an image file
            if (
              !file.endsWith(".png") &&
              !file.endsWith(".jpg") &&
              !file.endsWith(".jpeg")
            ) {
              continue;
            }

            // Exact match with filename
            if (file === baseFileName) {
              deleteImageFromDir(dirPath, file);
              continue;
            }

            // For pattern matching
            if (timestampPattern && file.includes(timestampPattern)) {
              console.log(`[IMAGE] Found file with matching pattern: ${file}`);
              // Confirm with hash comparison if we have the original image content
              if (imageContent) {
                try {
                  const filePath = path.join(dirPath, file);
                  const fileBuffer = fs.readFileSync(filePath);
                  const fileHash = crypto
                    .createHash("md5")
                    .update(fileBuffer)
                    .digest("hex");
                  const originalHash = crypto
                    .createHash("md5")
                    .update(imageContent)
                    .digest("hex");

                  // If hashes are similar (allowing for small differences)
                  if (fileHash === originalHash) {
                    console.log(`[IMAGE] Hash match for file: ${file}`);
                    deleteImageFromDir(dirPath, file);
                  } else {
                    console.log(`[IMAGE] Hash mismatch: ${file}`);

                    // Even if hash doesn't match exactly, if file pattern is very close
                    // and they're from same timestamp period (within few minutes), delete anyway
                    if (
                      fileBaseName === "image_" &&
                      file.startsWith("image_")
                    ) {
                      // Extract timestamps for comparison
                      const origTimestamp = parseInt(
                        baseFileName.split("_")[1].split(".")[0]
                      );
                      const fileTimestamp = parseInt(
                        file.split("_")[1].split(".")[0]
                      );

                      // If timestamps are within 1 minute (60000 ms) of each other
                      if (
                        !isNaN(origTimestamp) &&
                        !isNaN(fileTimestamp) &&
                        Math.abs(origTimestamp - fileTimestamp) < 60000
                      ) {
                        console.log(
                          `[IMAGE] Timestamps are very close, deleting anyway: ${file}`
                        );
                        deleteImageFromDir(dirPath, file);
                      }
                    }
                  }
                } catch (hashError) {
                  console.error(
                    `[IMAGE] Error comparing file hash: ${hashError.message}`
                  );
                }
              } else {
                // If we don't have original content, delete based on filename pattern
                deleteImageFromDir(dirPath, file);
              }
            }
          }
        };

        // Check primary locations: uploads and outputs folders
        const uploadsDir = path.join(__dirname, "../uploads");
        const outputsDir = path.join(__dirname, "../outputs");

        // Ensure uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
          try {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log(`[IMAGE] Created uploads directory: ${uploadsDir}`);
          } catch (mkdirError) {
            console.error(
              `[IMAGE] Error creating uploads directory: ${mkdirError.message}`
            );
          }
        }

        // Ensure outputs directory exists
        if (!fs.existsSync(outputsDir)) {
          try {
            fs.mkdirSync(outputsDir, { recursive: true });
            console.log(`[IMAGE] Created outputs directory: ${outputsDir}`);
          } catch (mkdirError) {
            console.error(
              `[IMAGE] Error creating outputs directory: ${mkdirError.message}`
            );
          }
        }

        // Exact matches first
        if (filename) {
          deleteImageFromDir(uploadsDir, filename);
          deleteImageFromDir(outputsDir, filename);

          // Also look for filename with different extension
          const baseNameWithoutExt =
            filename.substring(0, filename.lastIndexOf(".")) || filename;
          if (baseNameWithoutExt !== filename) {
            for (const ext of [".png", ".jpg", ".jpeg"]) {
              const altFileName = baseNameWithoutExt + ext;
              if (altFileName !== filename) {
                deleteImageFromDir(uploadsDir, altFileName);
                deleteImageFromDir(outputsDir, altFileName);
              }
            }
          }
        }

        // Then scan for similar images
        scanDirectoryForImages(uploadsDir, filename);
        scanDirectoryForImages(outputsDir, filename);

        // If no images were deleted, log a warning
        if (!imagesDeleted) {
          console.log(
            `[IMAGE] Warning: No image files were found or deleted for this content`
          );
        }
      } catch (imageDeleteError) {
        console.error(
          `[IMAGE] Failed to delete image file: ${imageDeleteError.message}`
        );
        // Continue with content deletion even if image deletion fails
      }
    }

    await content.destroy();

    res.json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete content",
      details: error.message,
    });
  }
};

// Update existing content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { generatedContent } = req.body;

    if (!generatedContent) {
      return res.status(400).json({
        success: false,
        error: "Missing required field: generatedContent is required",
      });
    }

    // Check if content exists
    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Update content with edited version
    content.generatedContent = generatedContent;

    // Also update imageUrl if provided
    if (req.body.imageUrl) {
      content.imageUrl = req.body.imageUrl;
    }

    await content.save();

    res.json({
      success: true,
      data: content,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update content",
      details: error.message,
    });
  }
};

// Update content partial (imageUrl only or other fields)
const updateContentPartial = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if content exists
    const content = await Content.findByPk(id);

    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Check if we have any data to update
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No fields provided for update",
      });
    }

    // Update only the fields that are provided
    const allowedFields = [
      "imageUrl",
      "imagePrompt",
      "topic",
      "keywords",
      "tone",
      "contentType",
    ];
    let updated = false;

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
        updated = true;
        console.log(`Updated ${field} for content ${id}`);
      }
    }

    // Update generatedContent if provided
    if (req.body.generatedContent) {
      content.generatedContent = req.body.generatedContent;
      updated = true;
      console.log(`Updated generatedContent for content ${id}`);
    }

    if (!updated) {
      return res.status(400).json({
        success: false,
        error: "No valid fields provided for update",
      });
    }

    await content.save();

    res.json({
      success: true,
      data: content,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update content",
      details: error.message,
    });
  }
};

// Generate image for content
const generateImageForContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { style = "Realistic", width = 768, height = 768 } = req.body;

    // Find the content
    const content = await Content.findByPk(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        error: "Content not found",
      });
    }

    // Xóa ảnh cũ nếu có (không cần thực hiện xóa file vì chúng ta sẽ lưu ảnh trong DB)
    // Chỉ cần reset giá trị image_data và imageUrl
    if (content.image_data || content.imageUrl) {
      console.log(`[IMAGE] Resetting image data for content ID: ${id}`);
      content.image_data = null;
      // Giữ lại imageUrl để ghi đè dữ liệu sau này
    }

    // Create a topic-based prompt using the content's topic and keywords
    const topic = content.topic;
    const keywords = content.keywords;
    const contentType = content.contentType;

    console.log(
      `[IMAGE] Generating image for content ID: ${id}, topic: "${topic}", keywords: "${keywords}"`
    );

    // Kiểm tra trạng thái FastAPI service trước khi gửi yêu cầu
    const FormData = require("form-data");
    const axios = require("axios");
    const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

    // Kiểm tra trạng thái của FastAPI service
    console.log(`[IMAGE] Checking FastAPI service status at ${FASTAPI_URL}`);
    try {
      const statusResponse = await axios.get(`${FASTAPI_URL}/status`, {
        timeout: 5000,
      });

      if (!statusResponse.data || !statusResponse.data.running) {
        console.error("[IMAGE] FastAPI service is not running or ready");
        return res.status(503).json({
          success: false,
          error: "Image generation service is not ready",
          details: "The service is either starting up or not fully initialized",
          code: "SERVICE_NOT_READY",
        });
      }

      console.log(
        "[IMAGE] FastAPI service is up and running, proceeding with image generation"
      );
    } catch (statusError) {
      console.error(
        "[IMAGE] Failed to check FastAPI service status:",
        statusError.message
      );
      return res.status(503).json({
        success: false,
        error: "Cannot connect to image generation service",
        details: "Failed to connect to the FastAPI service for status check",
        code: "SERVICE_UNAVAILABLE",
      });
    }

    // Prepare the FormData for the FastAPI service
    const formData = new FormData();
    formData.append("topic", `${topic}. Keywords: ${keywords}`);
    formData.append("style", style);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("num_inference_steps", "30");

    // Call the FastAPI service to generate the image with timeout
    console.log(`[IMAGE] Sending request to ${FASTAPI_URL}/topic-to-image`);
    try {
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

      // Process the response
      if (response.data && response.data.success) {
        // Kiểm tra phản hồi từ FastAPI
        const fastApiFilename = response.data.filename;
        let imageUrl = null;

        if (response.data.image_data) {
          // Nhận dữ liệu hình ảnh dưới dạng base64
          const buffer = Buffer.from(response.data.image_data, "base64");

          // Lưu trực tiếp vào database thay vì file system
          content.image_data = buffer;

          // Tạo URL để truy cập hình ảnh
          imageUrl = `/api/image/content-image/${id}`;
          console.log(`[IMAGE] Stored image in database for content ID: ${id}`);
        } else if (fastApiFilename) {
          // Nếu không có dữ liệu hình ảnh nhưng có filename từ FastAPI
          // Tải hình ảnh từ FastAPI service
          try {
            const imageUrl = `${FASTAPI_URL}/images/${fastApiFilename}`;
            const imageResponse = await axios.get(imageUrl, {
              responseType: "arraybuffer",
            });

            // Lưu dữ liệu hình ảnh vào database
            content.image_data = Buffer.from(imageResponse.data);

            // Cập nhật URL truy cập
            imageUrl = `/api/image/content-image/${id}`;
            console.log(
              `[IMAGE] Retrieved and stored image from FastAPI for content ID: ${id}`
            );
          } catch (downloadError) {
            console.error(
              `[IMAGE] Failed to download image from FastAPI: ${downloadError.message}`
            );
            // Fallback to using FastAPI URL directly if download fails
            imageUrl = `${FASTAPI_URL}/images/${fastApiFilename}`;
            console.log(
              `[IMAGE] Using FastAPI provided image URL as fallback: ${imageUrl}`
            );
          }
        }

        // Kiểm tra nếu có URL hình ảnh
        if (!imageUrl) {
          throw new Error(
            "No image URL or data was returned from the image generation service"
          );
        }

        console.log(`[IMAGE] Image generated successfully. URL: ${imageUrl}`);

        // Cập nhật nội dung với URL hình ảnh và prompt
        content.imageUrl = imageUrl;
        content.imagePrompt = response.data.prompt;
        await content.save();
        console.log(
          `[IMAGE] Content updated with new image data for ID: ${id}`
        );

        return res.json({
          success: true,
          data: {
            contentId: content.id,
            topic: response.data.topic,
            prompt: response.data.prompt,
            imageUrl: imageUrl,
            // Không trả về dữ liệu hình ảnh trong phản hồi API để giảm kích thước phản hồi
          },
          message: "Image generated and stored in database successfully",
        });
      } else {
        console.error(
          "[IMAGE] FastAPI service returned unsuccessful response:",
          response.data
        );
        throw new Error("Failed to generate image from topic");
      }
    } catch (axiosError) {
      console.error(
        "[IMAGE] Error connecting to FastAPI service:",
        axiosError.message
      );

      if (axiosError.code === "ECONNREFUSED") {
        return res.status(503).json({
          success: false,
          error: "Image generation service is not available",
          details:
            "Could not connect to the FastAPI service. Make sure it's running at " +
            FASTAPI_URL,
          code: "SERVICE_UNAVAILABLE",
        });
      }

      if (
        axiosError.code === "ETIMEDOUT" ||
        axiosError.message.includes("timeout")
      ) {
        return res.status(504).json({
          success: false,
          error: "Image generation timed out",
          details:
            "The request to generate an image took too long and timed out. Please try again later with a simpler prompt or a different style.",
          code: "TIMEOUT",
        });
      }

      // Xử lý lỗi từ FastAPI API nếu có
      if (axiosError.response && axiosError.response.data) {
        console.error(
          "[IMAGE] FastAPI service error details:",
          axiosError.response.data
        );
        return res.status(axiosError.response.status || 500).json({
          success: false,
          error: "Image generation service error",
          details:
            axiosError.response.data.detail ||
            axiosError.response.data.message ||
            axiosError.message,
          code: "API_ERROR",
          serviceResponse: axiosError.response.data,
        });
      }

      throw axiosError;
    }
  } catch (error) {
    console.error("Error generating image for content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate image for content",
      details: error.message,
      code: error.code || "UNKNOWN_ERROR",
    });
  }
};

// Generate a prompt for image generation based on content
const generatePromptFromContent = async (req, res) => {
  try {
    const { content, style, contentId, template } = req.body;

    if (!content && !contentId) {
      return res.status(400).json({
        success: false,
        error: "Either content or contentId is required for prompt generation",
      });
    }

    console.log(
      `[PROMPT] Generating image prompt from ${
        contentId ? "contentId: " + contentId : "provided content"
      }`
    );

    // Nếu contentId được cung cấp, lấy nội dung từ cơ sở dữ liệu
    let contentText = content;
    if (contentId && !content) {
      try {
        const Content = require("../models").Content;
        const contentRecord = await Content.findByPk(contentId);
        if (!contentRecord) {
          return res.status(404).json({
            success: false,
            error: `Content with ID ${contentId} not found`,
          });
        }
        contentText = contentRecord.generatedContent;
        console.log(
          `[PROMPT] Fetched content from database, length: ${contentText.length} characters`
        );
      } catch (dbError) {
        console.error(
          `[PROMPT] Error fetching content from database:`,
          dbError
        );
        return res.status(500).json({
          success: false,
          error: "Failed to fetch content from database",
          details: dbError.message,
        });
      }
    }

    if (!contentText || contentText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Content text is empty or invalid",
      });
    }

    // Use DeepSeek API to generate a prompt based on the content
    const axios = require("axios");
    const API_KEY = process.env.DEEPSEEK_API_KEY;
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";

    // Create a system prompt for DeepSeek
    const systemPrompt =
      "You are an expert at creating image generation prompts for Kandinsky 2.2, a text-to-image AI model. Your job is to analyze content and create detailed, vivid prompts that capture the essence of the content for AI image generation. You must create prompts that will result in high-quality, visually appealing images.";

    // Use template provided or default template
    const promptTemplate =
      template ||
      `Generate a [STYLE] image of [SUBJECT], featuring [KEY DETAILS]. Style: [ART STYLE/MEDIUM], color palette: [COLORS], lighting: [LIGHTING], composition: [COMPOSITION]. Additional effects: [EFFECTS]. Keep the overall mood [MOOD]. Render in Kandinsky 2.2 with high detail, resolution [RESOLUTION].`;

    // Create user prompt for DeepSeek
    const userPrompt = `
    Create an AI image generation prompt for Kandinsky 2.2 based on the following content:
    
    ${contentText.substring(0, 3000)}
    
    Please follow these instructions carefully:
    1. ANALYZE the content to understand its main topic, key concepts, and overall tone
    2. Extract the MAIN SUBJECT that should be the focus of the image
    3. Identify 3-5 KEY DETAILS from the content that should be featured in the image
    4. Select an appropriate MOOD/TONE that matches the content's emotional feel
    5. Choose a suitable COLOR PALETTE that reinforces the content's theme
    6. Determine the best COMPOSITION that would visually represent the content
    7. Use this template and fill in all placeholders:
    
    ${promptTemplate}
    
    IMPORTANT REQUIREMENTS: 
    - Replace all parts in [BRACKETS] with specific, detailed descriptions
    - For [STYLE], use: ${style || "Realistic"} as the base style
    - For [RESOLUTION], choose one of: 512x512, 768x768, or 1024x1024
    - Make the prompt vivid and detailed while keeping it under 200 words
    - Focus on visual elements that can be depicted in an image
    - Include ONLY the prompt in your response, no explanations or other text
    - Make sure the prompt will work well with Kandinsky 2.2 image generation
    - The image should clearly represent the content of the article
    `;

    console.log(
      `[PROMPT] Sending request to DeepSeek API with style: ${
        style || "Realistic"
      }`
    );

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 800,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://esmart-solutions-agency.com",
            "X-Title": "Esmart AI Prompt Generator",
          },
          timeout: 45000, // 45 seconds
        }
      );

      const generatedPrompt = response.data.choices[0].message.content;

      console.log(
        `[PROMPT] Successfully generated prompt: ${generatedPrompt.substring(
          0,
          100
        )}...`
      );

      // Lưu prompt vào cơ sở dữ liệu nếu có contentId
      if (contentId) {
        try {
          const Content = require("../models").Content;
          await Content.update(
            { imagePrompt: generatedPrompt },
            { where: { id: contentId } }
          );
          console.log(`[PROMPT] Saved prompt to content ID: ${contentId}`);
        } catch (dbError) {
          console.warn(
            `[PROMPT] Warning: Could not save prompt to database:`,
            dbError.message
          );
          // Tiếp tục xử lý ngay cả khi không thể lưu vào cơ sở dữ liệu
        }
      }

      return res.json({
        success: true,
        prompt: generatedPrompt,
        message: "Prompt generated successfully",
      });
    } catch (apiError) {
      console.error("[PROMPT] Error calling DeepSeek API:", apiError.message);

      // Try fallback with Claude
      try {
        console.log("[PROMPT] Trying fallback with Claude model...");
        const fallbackResponse = await axios.post(
          API_URL,
          {
            model: "anthropic/claude-3-haiku",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 800,
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://esmart-solutions-agency.com",
              "X-Title": "Esmart AI Prompt Generator",
            },
            timeout: 45000,
          }
        );

        const fallbackPrompt = fallbackResponse.data.choices[0].message.content;
        console.log(
          `[PROMPT] Successfully generated prompt with Claude: ${fallbackPrompt.substring(
            0,
            100
          )}...`
        );

        // Lưu prompt vào cơ sở dữ liệu nếu có contentId (với fallback model)
        if (contentId) {
          try {
            const Content = require("../models").Content;
            await Content.update(
              { imagePrompt: fallbackPrompt },
              { where: { id: contentId } }
            );
            console.log(
              `[PROMPT] Saved fallback prompt to content ID: ${contentId}`
            );
          } catch (dbError) {
            console.warn(
              `[PROMPT] Warning: Could not save prompt to database:`,
              dbError.message
            );
          }
        }

        return res.json({
          success: true,
          prompt: fallbackPrompt,
          message: "Prompt generated successfully with fallback model",
          usedFallback: true,
        });
      } catch (fallbackError) {
        console.error(
          "[PROMPT] Fallback model also failed:",
          fallbackError.message
        );
        throw apiError; // Throw original error
      }
    }
  } catch (error) {
    console.error("[PROMPT] Error generating prompt from content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate prompt",
      details: error.message,
    });
  }
};

module.exports = {
  getAllContents,
  getProjectContent,
  getContentById,
  createContent,
  updateContent,
  updateContentPartial,
  deleteContent,
  generateImageForContent,
  generatePromptFromContent,
};
