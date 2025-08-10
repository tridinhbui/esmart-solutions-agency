<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.image.title") }}</h2>

    <!-- API Status Error Alert -->
    <div
      v-if="apiStatus && apiStatus.status === 'error'"
      class="api-error-alert"
    >
      <div class="api-error-content">
        <h3>Dịch vụ tạo hình ảnh không khả dụng</h3>
        <p>{{ apiStatus.message }}</p>
        <p
          v-if="apiStatus.details"
          class="error-details"
        >
          Chi tiết lỗi: {{ apiStatus.details }}
        </p>
        <button
          class="retry-button"
          @click="checkApiStatus"
        >
          Kiểm tra lại
        </button>
      </div>
    </div>

    <!-- Toast Messages Container -->
    <div class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast-message', `toast-${toast.type}`]"
        @click="removeToast(toast.id)"
      >
        <span>{{ toast.message }}</span>
        <button class="toast-close-btn">
          &times;
        </button>
      </div>
    </div>

    <div class="image-container">
      <div class="generated-image">
        <img
          v-if="displayImage"
          :src="displayImage"
          alt="AI Generated Image"
          @error="handleImageLoadError"
        >
        <div
          v-else-if="isGenerating"
          class="image-placeholder"
        >
          <div class="loading-spinner" />
          <p>{{ $t("creatorAI.image.generating") }}</p>
        </div>
        <div
          v-else
          class="image-placeholder"
        >
          <p>The generated image will appear here</p>
        </div>
      </div>
      <div class="style-options">
        <h3>{{ $t("creatorAI.image.styleTitle") }}</h3>
        <div class="style-buttons">
          <button
            v-for="style in imageStyles"
            :key="style"
            :class="['style-button', { active: selectedStyle === style }]"
            @click="selectStyle(style)"
          >
            {{ style }}
          </button>
        </div>

        <div class="prompt-container">
          <h3>{{ $t("creatorAI.image.promptTitle") }}</h3>
          <div class="form-group">
            <label>{{ $t("creatorAI.image.generationMethod") }}</label>
            <div class="method-buttons">
              <button
                :class="[
                  'method-button',
                  { active: generationMethod === 'topic' },
                ]"
                @click="generationMethod = 'topic'"
              >
                {{ $t("creatorAI.image.fromTopic") }}
              </button>
              <button
                :class="[
                  'method-button',
                  { active: generationMethod === 'prompt' },
                ]"
                @click="generationMethod = 'prompt'"
              >
                {{ $t("creatorAI.image.customPrompt") }}
              </button>
            </div>
          </div>

          <div
            v-if="generationMethod === 'prompt'"
            class="form-group"
          >
            <label for="customPrompt">{{
              $t("creatorAI.image.customPromptLabel")
            }}</label>
            <textarea
              id="customPrompt"
              v-model="customPrompt"
              :placeholder="$t('creatorAI.image.promptPlaceholder')"
              rows="3"
            />
          </div>

          <div class="form-group">
            <label>Chất lượng ảnh</label>
            <div class="quality-buttons">
              <button
                :class="['quality-button', { active: imageQuality === 'low' }]"
                @click="imageQuality = 'low'"
              >
                Thấp (Nhanh)
              </button>
              <button
                :class="[
                  'quality-button',
                  { active: imageQuality === 'medium' },
                ]"
                @click="imageQuality = 'medium'"
              >
                Trung bình
              </button>
              <button
                :class="['quality-button', { active: imageQuality === 'high' }]"
                @click="imageQuality = 'high'"
              >
                Cao (Chậm)
              </button>
            </div>
          </div>
        </div>

        <div class="generate-button-container">
          <button
            class="generate-button"
            :disabled="isGenerating"
            @click="generateImage"
          >
            <span
              v-if="isGenerating"
              class="loading-spinner-btn"
            />
            {{
              isGenerating
                ? $t("creatorAI.image.generating")
                : generatedImage
                  ? $t("creatorAI.image.regenerateButton")
                  : $t("creatorAI.image.generateButton")
            }}
          </button>
        </div>

        <div
          v-if="error"
          class="error-message"
        >
          {{ error }}
        </div>

        <div class="additional-buttons">
          <button
            class="function-button"
            :disabled="isGenerating"
            @click="generatePromptFromContent"
          >
            {{ $t("creatorAI.image.generatePrompt") }}
          </button>
          <button
            class="function-button"
            :disabled="!displayImage || isGenerating"
            @click="saveGeneratedImage"
          >
            {{ $t("creatorAI.image.saveImage") }}
          </button>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button
        class="secondary-button"
        @click="$emit('prev')"
      >
        {{ $t("creatorAI.image.previous") }}
      </button>
      <button
        class="primary-button"
        @click="handleContinue"
      >
        {{ $t("creatorAI.image.next") }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ImageStep",
  props: {
    generatedImage: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: "",
    },
    requirements: {
      type: Object,
      default: () => ({}),
    },
    imageStyles: {
      type: Array,
      default: () => [
        "Realistic",
        "3D",
        "Minimalist",
        "Watercolor",
        "Flat Vector",
      ],
    },
    initialStyle: {
      type: String,
      default: "Realistic",
    },
  },
  data() {
    return {
      selectedStyle: this.initialStyle,
      isGenerating: false,
      localImage: null,
      customPrompt: "",
      generationMethod: "topic",
      error: null,
      apiStatus: null,
      apiUrl: process.env.VUE_APP_API_URL || "http://localhost:3001/api",
      imageQuality: "medium",
      toasts: [],
    };
  },
  computed: {
    displayImage() {
      // Hiển thị ảnh từ prop, hoặc ảnh được tạo cục bộ
      return this.generatedImage || this.localImage || null;
    },
    topicForImage() {
      // Sử dụng chủ đề từ requirements
      return this.requirements.topic || "AI Generated Image";
    },
    contentId() {
      // Extract contentId from requirements
      return this.requirements && this.requirements.contentId;
    },
  },
  mounted() {
    // Check API status when component is created
    this.checkApiStatus();

    // Debug logging for image data
    console.log("ImageStep mounted with props:", {
      generatedImage: this.generatedImage
        ? typeof this.generatedImage === "string"
          ? "string data (truncated)"
          : typeof this.generatedImage
        : "null",
      hasContent: !!this.content,
      requirements: this.requirements,
      contentId: this.contentId,
    });
  },
  methods: {
    selectStyle(style) {
      this.selectedStyle = style;
      this.$emit("style-select", style);
    },

    async generatePromptFromContent() {
      if (
        !this.content &&
        (!this.requirements || !this.requirements.contentId)
      ) {
        this.error =
          "No content or contentId available to generate prompt from";
        this.showToast("Không có nội dung để tạo mô tả", "error");
        return;
      }

      this.error = null;
      this.isGenerating = true;

      try {
        // Toast message for starting the process
        this.showToast("Đang tạo mô tả hình ảnh từ nội dung...", "info");
        console.log("Sending request to generate prompt from content...");
        console.log("Content ID:", this.requirements?.contentId);

        // Call the API to generate a prompt based on the content with longer timeout
        const response = await axios.post(
          `/api/content/contents/generate-prompt`,
          {
            content: this.content,
            contentId: this.requirements?.contentId,
            style: this.selectedStyle,
            template: `Generate a [STYLE] image of [SUBJECT], featuring [KEY DETAILS]. Style: [ART STYLE/MEDIUM], color palette: [COLORS], lighting: [LIGHTING], composition: [COMPOSITION]. Additional effects: [EFFECTS]. Keep the overall mood [MOOD]. Render in Kandinsky 2.2 with high detail, resolution [RESOLUTION].`,
          },
          {
            timeout: 60000, // Increase timeout to 60 seconds
          }
        );

        if (response.data && response.data.success) {
          // Set the generated prompt in the custom prompt field
          this.customPrompt = response.data.prompt;
          // Switch to custom prompt mode
          this.generationMethod = "prompt";

          // Show success toast
          this.showToast("Đã tạo mô tả hình ảnh thành công!", "success");
          console.log(
            "Generated prompt:",
            this.customPrompt.substring(0, 100) + "..."
          );
        } else {
          throw new Error(response.data?.error || "Failed to generate prompt");
        }
      } catch (error) {
        // Use the new handleApiError method
        this.handleApiError(error, "tạo mô tả hình ảnh");
      } finally {
        this.isGenerating = false;
      }
    },

    async saveGeneratedImage() {
      if (!this.displayImage) {
        this.error = "No image to save";
        return;
      }

      try {
        // Check if we have contentId - if so, save directly to the database
        if (this.contentId) {
          console.log(
            `Saving image directly to database for content ID: ${this.contentId}`
          );
          // Save image data to content record
          const saveResponse = await axios.post(
            `/api/content/contents/${this.contentId}/save-image`,
            { imageData: this.displayImage }
          );

          if (saveResponse.data && saveResponse.data.success) {
            // Emit event with the URL that fetches from the database
            this.$emit("image-saved", {
              imageUrl: saveResponse.data.imageUrl,
              prompt: this.customPrompt,
              style: this.selectedStyle,
            });

            // Show success message
            this.showToast("Image saved successfully to database!", "success");
          } else {
            throw new Error(
              saveResponse.data?.error || "Failed to save image to database"
            );
          }
        } else {
          // If no contentId, save the image as base64 data and return it
          // Don't save to server uploads folder
          this.$emit("image-saved", {
            image: this.displayImage, // Pass base64 directly
            prompt: this.customPrompt,
            style: this.selectedStyle,
          });

          // Show success message
          this.showToast("Image saved to local state", "success");
        }
      } catch (error) {
        console.error("Error saving image:", error);
        this.error =
          error.response?.data?.error || error.message || "Error saving image";
        this.showToast(this.error, "error");
      }
    },

    async generateImage() {
      this.isGenerating = true;
      this.error = null;

      // Clear any previously cached image data to prevent display of old images
      this.localImage = null;

      try {
        let response;

        // Xác định kích thước và số bước dựa trên chất lượng
        let width, height, steps;
        switch (this.imageQuality) {
          case "low":
            width = 384;
            height = 384;
            steps = 20;
            break;
          case "medium":
            width = 512;
            height = 512;
            steps = 30;
            break;
          case "high":
            width = 768;
            height = 768;
            steps = 50;
            break;
          default:
            width = 512;
            height = 512;
            steps = 30;
        }

        // Show a toast to inform the user that generation has started
        this.showToast(
          `Generating image with ${this.imageQuality} quality...`,
          "info"
        );

        if (this.generationMethod === "prompt") {
          // Tạo ảnh từ prompt tùy chỉnh
          if (!this.customPrompt.trim()) {
            throw new Error("Please enter a custom prompt");
          }

          console.log("Generating image from custom prompt...");
          try {
            response = await axios.post(
              `${this.apiUrl}/image/generate`,
              {
                prompt: this.customPrompt,
                style: this.selectedStyle,
                width: width,
                height: height,
                num_inference_steps: steps,
              },
              {
                timeout: 90000, // 90 seconds timeout for image generation
              }
            );
          } catch (error) {
            console.error("Error generating image from prompt:", error);
            // Ensure we return a base64 data URL since we can't retrieve from file system
            throw new Error(
              "Failed to generate image. Please try again or contact support if the issue persists."
            );
          }
        } else {
          // Tạo ảnh từ chủ đề (topic)
          console.log(`Generating image from topic: ${this.topicForImage}`);
          try {
            response = await axios.post(
              `${this.apiUrl}/image/topic-to-image`,
              {
                topic: this.topicForImage,
                style: this.selectedStyle,
                width: width,
                height: height,
                num_inference_steps: steps,
              },
              {
                timeout: 90000, // 90 seconds timeout for image generation
              }
            );
          } catch (error) {
            console.error("Error generating image from topic:", error);
            // Ensure we return a base64 data URL since we can't retrieve from file system
            throw new Error(
              "Failed to generate image. Please try again or contact support if the issue persists."
            );
          }
        }

        if (!response.data.success) {
          throw new Error(response.data.error || "Failed to generate image");
        }

        console.log("Image generated successfully");

        // Create a data URL directly to display locally
        const dataUrl = `data:image/png;base64,${response.data.image_data}`;

        // Update the local image first for immediate display
        this.localImage = dataUrl;

        // If we have a contentId, save the image to the database
        if (this.contentId) {
          console.log(
            `Saving generated image to content ID: ${this.contentId}`
          );
          try {
            // Save the image data to the content record
            const saveResponse = await axios.post(
              `/api/content/contents/${this.contentId}/save-image`,
              { imageData: dataUrl }
            );

            if (!saveResponse.data.success) {
              console.warn(
                "Warning: Failed to save image to content record:",
                saveResponse.data.error
              );
              // Even if saving fails, emit the data URL so it's still displayed
              this.$emit("image-generated", { image: dataUrl });
            } else {
              // If save was successful, emit both the image data URL and the database URL
              // This ensures the image is immediately displayed and can be fetched later
              const contentImageUrl = saveResponse.data.imageUrl;
              this.$emit("image-generated", {
                image: dataUrl,
                imageUrl: contentImageUrl,
                prompt: this.customPrompt,
                style: this.selectedStyle,
              });
            }
          } catch (saveError) {
            console.error("Error saving image to content:", saveError);
            // Even if saving to the database fails, emit the data URL so it's still displayed
            this.$emit("image-generated", { image: dataUrl });
          }
        } else {
          // If no contentId, just emit the data URL
          this.$emit("image-generated", {
            image: dataUrl,
            prompt: this.customPrompt,
            style: this.selectedStyle,
          });
        }

        // Reset the loading state
        this.isGenerating = false;

        // Show success message
        this.showToast("Image generated successfully!", "success");
      } catch (error) {
        console.error("Error generating image:", error);
        this.error = error.message || "Failed to generate image";
        this.isGenerating = false;
        this.showToast(this.error, "error");
      }
    },

    async checkApiStatus() {
      try {
        const response = await axios.get(`${this.apiUrl}/image/status`, {
          timeout: 5000,
        });
        this.apiStatus = response.data;
        console.log("API Status check result:", this.apiStatus);
      } catch (error) {
        console.error("API Status check failed:", error);
        this.apiStatus = {
          status: "error",
          message:
            "The image generation service is currently unavailable. Please try again later.",
          details: error.message,
        };

        // Show a toast with the error information
        this.showToast(
          "Dịch vụ tạo hình ảnh đang không khả dụng. Vui lòng thử lại sau.",
          "error"
        );
      }
    },

    // Add a new method to handle API errors more effectively
    handleApiError(error, operation) {
      console.error(`Error during ${operation}:`, error);

      // Default error message
      let errorMessage = `Lỗi khi ${operation}: `;

      // Check for specific error types
      if (error.code === "ECONNABORTED") {
        errorMessage += "Quá thời gian chờ, máy chủ không phản hồi.";
      } else if (error.message.includes("Network Error")) {
        errorMessage += "Lỗi kết nối mạng, kiểm tra kết nối internet của bạn.";
      } else if (error.response) {
        // Server responded with an error status
        errorMessage += `Máy chủ phản hồi với lỗi ${error.response.status}: ${
          error.response.data?.error || "Lỗi không xác định"
        }`;
      } else {
        // Something else happened
        errorMessage += error.message || "Lỗi không xác định.";
      }

      // Show toast with the error
      this.showToast(errorMessage, "error");

      // Update error state
      this.error = errorMessage;

      // Check API status on certain errors
      if (
        error.message.includes("Network Error") ||
        error.message.includes("timeout") ||
        error.code === "ECONNABORTED"
      ) {
        this.checkApiStatus();
      }
    },

    handleContinue() {
      // If we have an image, send the image data to the parent component
      if (this.displayImage) {
        // Emit the image-generated event with the current image data
        this.$emit("image-generated", {
          image: this.displayImage, // Always send the actual image data to ensure it's displayed
          prompt: this.customPrompt,
          style: this.selectedStyle,
        });

        // Also show a success message
        this.showToast("Proceeding with the generated image", "success");
      } else {
        // If there's no image, just proceed without showing a confirmation
        // User has intentionally decided to continue without an image
        this.$emit("image-generated", {
          image: null,
          prompt: this.customPrompt,
          style: this.selectedStyle,
        });

        // Optionally show a message indicating no image was generated
        this.showToast("Continuing without an image", "info");
      }

      // Proceed to the next step
      this.$emit("next");
    },

    // Add toast message functionality
    showToast(message, type = "info") {
      if (!this.toasts) this.toasts = [];

      const id = Date.now();
      this.toasts.push({ id, message, type });

      // Auto remove after 5 seconds
      setTimeout(() => {
        this.removeToast(id);
      }, 5000);
    },

    removeToast(id) {
      if (this.toasts) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
      }
    },

    handleImageLoadError(event) {
      console.error("Image failed to load:", event);
      this.error = "Failed to load image. Trying fallback approach...";

      // If we have base64 data, let's try to use that directly
      if (this.localImage && this.localImage.startsWith("data:image")) {
        console.log("Using fallback to local base64 image data");
        return; // Keep using the localImage since it's already a data URL
      }

      // For database images that failed to load, try to re-fetch the image
      if (this.contentId && this.generatedImageUrl) {
        console.log(
          `Trying to re-fetch image for content ID: ${this.contentId}`
        );
        axios
          .get(`/api/content/contents/${this.contentId}`)
          .then((response) => {
            if (
              response.data.success &&
              response.data.data &&
              response.data.data.image_data
            ) {
              // Create a data URL from the image_data
              const dataUrl = `data:image/png;base64,${response.data.data.image_data}`;
              this.localImage = dataUrl;
              console.log("Successfully recovered image from database");

              // Clear the error since we've recovered
              this.error = null;
            } else {
              this.error = "Failed to load image. Please try generating again.";
              this.$emit("message", {
                type: "error",
                text: this.error,
              });
            }
          })
          .catch((err) => {
            console.error("Error fetching content for image recovery:", err);
            this.error = "Failed to load image. Please try generating again.";
            this.$emit("message", {
              type: "error",
              text: this.error,
            });
          });
      } else {
        this.error = "Failed to load image. Please try generating again.";
        this.$emit("message", {
          type: "error",
          text: this.error,
        });
      }
    },
  },
};
</script>

<style scoped>
.step-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: black;
  margin-bottom: 2rem;
  text-align: center;
}

h3 {
  color: black;
  margin-bottom: 1rem;
}

.image-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.generated-image {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.generated-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 4px;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 4px;
  color: black;
}

.loading-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  border-top-color: #333;
  animation: spin 1.2s linear infinite;
  margin-bottom: 16px;
}

.loading-spinner-btn {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  border-top-color: #333;
  animation: spin 1.2s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.style-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.style-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.style-button {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.style-button.active {
  background: black;
  color: white;
  border-color: black;
}

.method-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.method-button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.method-button.active {
  background: black;
  color: white;
  border-color: black;
}

.prompt-container {
  margin-top: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: 500;
  color: black;
}

.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
}

.generate-button-container {
  margin-top: 1.5rem;
  text-align: center;
}

.generate-button {
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
  position: relative;
}

.generate-button:hover:not(:disabled) {
  background: #2a2a6c;
}

.generate-button:disabled {
  background: #7a7a9c;
  cursor: not-allowed;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-message.ok {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-message.error {
  background-color: #ffebee;
  color: #c62828;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.primary-button {
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  position: relative;
  min-width: 120px;
  height: 48px;
}

.primary-button:hover:not(:disabled) {
  background: #333;
}

.primary-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.loading-button {
  background: #333 !important;
}

.secondary-button {
  background: white;
  color: black;
  border: 1px solid black;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  min-width: 120px;
  height: 48px;
}

.secondary-button:hover {
  background: #f8f9fa;
}

.quality-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.quality-button {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quality-button.active {
  background: black;
  color: white;
  border-color: black;
}

.additional-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.function-button {
  flex: 1;
  background: #2a6a9c;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.function-button:hover:not(:disabled) {
  background: #1d4e7c;
}

.function-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .image-container {
    grid-template-columns: 1fr;
  }

  .button-group {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}

/* Toast Styles */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.toast-message {
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slide-in 0.3s ease-out forwards;
  cursor: pointer;
  color: white;
}

.toast-success {
  background-color: #42b983;
}

.toast-error {
  background-color: #e74c3c;
}

.toast-info {
  background-color: #3498db;
}

.toast-close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: 8px;
  opacity: 0.7;
}

.toast-close-btn:hover {
  opacity: 1;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Error alert styles */
.api-error-alert {
  background-color: #fff9fa;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(255, 0, 0, 0.1);
}

.api-error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.api-error-content h3 {
  color: #d32f2f;
  margin-bottom: 0.5rem;
}

.api-error-content p {
  margin-bottom: 0.5rem;
}

.error-details {
  font-size: 0.85rem;
  color: #757575;
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: normal;
}

.retry-button {
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.retry-button:hover {
  background-color: #b71c1c;
}
</style>
