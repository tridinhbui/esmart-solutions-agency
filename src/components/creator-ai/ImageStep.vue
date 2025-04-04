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
        <p v-if="apiStatus.details" class="error-details">
          Chi tiết lỗi: {{ apiStatus.details }}
        </p>
        <button class="retry-button" @click="checkApiStatus">
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
        <button class="toast-close-btn">&times;</button>
      </div>
    </div>

    <div class="image-container">
      <div class="generated-image">
        <img v-if="displayImage" :src="displayImage" alt="AI Generated Image" />
        <div v-else-if="isGenerating" class="image-placeholder">
          <div class="loading-spinner"></div>
          <p>{{ $t("creatorAI.image.generating") }}</p>
        </div>
        <div v-else class="image-placeholder">
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

          <div class="form-group" v-if="generationMethod === 'prompt'">
            <label for="customPrompt">{{
              $t("creatorAI.image.customPromptLabel")
            }}</label>
            <textarea
              id="customPrompt"
              v-model="customPrompt"
              :placeholder="$t('creatorAI.image.promptPlaceholder')"
              rows="3"
            ></textarea>
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
            @click="generateImage"
            :disabled="isGenerating"
          >
            <span v-if="isGenerating" class="loading-spinner-btn"></span>
            {{
              isGenerating
                ? $t("creatorAI.image.generating")
                : generatedImage
                ? $t("creatorAI.image.regenerateButton")
                : $t("creatorAI.image.generateButton")
            }}
          </button>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="additional-buttons">
          <button
            class="function-button"
            @click="generatePromptFromContent"
            :disabled="isGenerating"
          >
            {{ $t("creatorAI.image.generatePrompt") }}
          </button>
          <button
            class="function-button"
            @click="saveGeneratedImage"
            :disabled="!displayImage || isGenerating"
          >
            {{ $t("creatorAI.image.saveImage") }}
          </button>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button class="secondary-button" @click="$emit('prev')">
        {{ $t("creatorAI.image.previous") }}
      </button>
      <button
        class="primary-button"
        @click="handleContinue"
        :disabled="!generatedImage"
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
        // Extract image data from the dataURL
        const imageData = this.displayImage.split(",")[1];

        // Call API to save the image
        const response = await axios.post(`${this.apiUrl}/image/save`, {
          image_data: imageData,
          prompt: this.customPrompt,
          style: this.selectedStyle,
        });

        if (response.data && response.data.success) {
          // Emit event with the URL of the saved image
          this.$emit("image-saved", {
            imageUrl: response.data.imageUrl,
            prompt: this.customPrompt,
            style: this.selectedStyle,
          });

          // Show success message
          alert("Image saved successfully!");
        } else {
          throw new Error(response.data?.error || "Failed to save image");
        }
      } catch (error) {
        console.error("Error saving image:", error);
        this.error =
          error.response?.data?.error || error.message || "Error saving image";
      }
    },

    async generateImage() {
      this.isGenerating = true;
      this.error = null;

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

        if (this.generationMethod === "prompt") {
          // Tạo ảnh từ prompt tùy chỉnh
          if (!this.customPrompt.trim()) {
            throw new Error("Please enter a custom prompt");
          }

          console.log("Generating image from custom prompt...");
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
        } else {
          // Tạo ảnh từ chủ đề (topic)
          console.log(`Generating image from topic: ${this.topicForImage}`);
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
        }

        if (response.data && response.data.success) {
          // Đặt ảnh từ dữ liệu base64
          this.localImage = `data:image/png;base64,${response.data.image_data}`;

          // Lưu prompt được sử dụng để tạo ảnh
          this.customPrompt = response.data.prompt || this.customPrompt;

          // Gửi thông tin ảnh lên component cha
          this.$emit("image-generated", {
            image: this.localImage,
            prompt: this.customPrompt,
            style: this.selectedStyle,
          });

          // Show success toast
          this.showToast("Đã tạo hình ảnh thành công!", "success");
        } else {
          throw new Error(response.data?.error || "Failed to generate image");
        }
      } catch (error) {
        // Use the new handleApiError method
        this.handleApiError(error, "tạo hình ảnh");
      } finally {
        this.isGenerating = false;
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
      // Nếu đã có ảnh, gửi thông tin ảnh lên component cha
      if (this.displayImage) {
        this.$emit("image-generated", {
          image: this.displayImage,
          prompt: this.customPrompt,
          style: this.selectedStyle,
        });
      } else {
        // Nếu chưa có ảnh, thông báo cho người dùng
        if (
          confirm(
            "Bạn chưa tạo ảnh. Bạn có muốn tiếp tục mà không có ảnh không?"
          )
        ) {
          this.$emit("image-generated", {
            image: null,
            prompt: this.customPrompt,
            style: this.selectedStyle,
          });
        } else {
          // Người dùng muốn tạo ảnh trước
          return;
        }
      }

      // Tiếp tục sang bước tiếp theo
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
  },
  mounted() {
    // Kiểm tra trạng thái API khi component được tạo
    this.checkApiStatus();
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
  color: #1c1c4c;
  margin-bottom: 2rem;
  text-align: center;
}

h3 {
  color: #1c1c4c;
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
  background: #f1f1f4;
  border-radius: 4px;
  color: #1c1c4c;
}

.loading-spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(28, 28, 76, 0.3);
  border-radius: 50%;
  border-top-color: #1c1c4c;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-spinner-btn {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
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
  background: #1c1c4c;
  color: white;
  border-color: #1c1c4c;
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
  background: #1c1c4c;
  color: white;
  border-color: #1c1c4c;
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
  color: #1c1c4c;
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
  background: #1c1c4c;
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
  background: #1c1c4c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.primary-button:hover:not(:disabled) {
  background: #2a2a6c;
}

.primary-button:disabled {
  background: #7a7a9c;
  cursor: not-allowed;
}

.secondary-button {
  background: white;
  color: #1c1c4c;
  border: 1px solid #1c1c4c;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
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
  background: #1c1c4c;
  color: white;
  border-color: #1c1c4c;
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
