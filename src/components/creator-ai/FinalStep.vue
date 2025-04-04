<template>
  <div class="step-content">
    <h2>Final Step</h2>
    <div v-if="hasProjectId" class="project-info">
      <h3>{{ projectTitle }}</h3>
      <p v-if="projectDescription">{{ projectDescription }}</p>
      <div class="project-status">
        <span :class="['status-badge', projectStatus]">
          {{ projectStatus === "in_progress" ? "In Progress" : "Finished" }}
        </span>
        <button
          v-if="projectStatus === 'in_progress'"
          class="status-button"
          @click="markAsFinished"
          :disabled="loading"
        >
          {{ loading ? "Updating..." : "Mark as Finished" }}
        </button>
        <button
          v-else
          class="status-button"
          @click="markAsInProgress"
          :disabled="loading"
        >
          {{ loading ? "Updating..." : "Mark as In Progress" }}
        </button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
    <div v-else class="project-info warning">
      <p>
        This content is not saved to a project. Create a new project to save
        your work.
      </p>
    </div>
    <div class="final-content">
      <h3 class="mb-3">Generated Content</h3>
      <div v-if="loading" class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="content-box" v-html="formattedContent"></div>
    </div>

    <div class="final-image-section">
      <h3>Generated Image</h3>
      <div class="image-section">
        <div
          v-if="imageLoading"
          class="d-flex justify-content-center align-items-center image-loading"
        >
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="loading-text">Loading image...</p>
        </div>
        <div v-else-if="imageError" class="no-image-placeholder">
          <i class="fa-solid fa-triangle-exclamation fa-3x"></i>
          <p>{{ imageError }}</p>
          <div class="image-error-actions">
            <button
              v-if="hasContentId"
              @click="generateImageForContent"
              class="btn btn-primary mt-2"
            >
              <i class="fa-solid fa-image"></i> Tạo hình ảnh mới
            </button>
            <button
              v-if="hasContentId"
              @click="loadImageFromDatabase"
              class="btn btn-secondary mt-2 ms-2"
            >
              <i class="fa-solid fa-rotate"></i> Tải lại hình ảnh
            </button>
          </div>
        </div>
        <img
          v-else-if="imageUrl"
          :src="imageUrl"
          alt="Generated image"
          class="img-fluid rounded mb-3"
          @error="handleImageError"
          @load="handleImageLoad"
        />
        <div v-else class="no-image-placeholder">
          <i class="fa-solid fa-image fa-5x"></i>
          <p>Không có hình ảnh</p>
          <button
            v-if="hasContentId"
            @click="generateImageForContent"
            class="btn btn-primary mt-3"
          >
            <i class="fa-solid fa-image"></i> Tạo hình ảnh
          </button>
        </div>

        <div class="image-actions">
          <button
            v-if="!imageLoading && !imageUrl && contentId"
            class="btn btn-success mt-2"
            @click="generateImageForContent"
          >
            <i class="fas fa-magic me-1"></i>
            Generate Image
          </button>
        </div>
      </div>
    </div>

    <div class="final-actions">
      <div class="action-buttons">
        <div class="additional-actions">
          <button class="btn btn-outline-primary" @click="exportContent">
            <i class="fas fa-file-export me-1"></i>
            Export
          </button>
          <button class="btn btn-outline-primary" @click="shareContent">
            <i class="fas fa-share-alt me-1"></i>
            Share
          </button>
          <button class="btn btn-outline-primary" @click="downloadPDF">
            <i class="fas fa-file-pdf me-1"></i>
            Download PDF
          </button>
        </div>
      </div>
      <div class="navigation-buttons">
        <button
          v-if="!fromDashboard"
          class="btn btn-light"
          @click="$emit('prev')"
        >
          <i class="fas fa-arrow-left me-1"></i>
          Previous Step
        </button>
        <button v-else class="btn btn-light" @click="$emit('go-to-dashboard')">
          <i class="fas fa-home me-1"></i>
          Back to Dashboard
        </button>
        <button class="btn btn-info" @click="$emit('go-to-dashboard')">
          <i class="fas fa-home me-1"></i>
          Dashboard
        </button>
        <button class="btn btn-success" @click="$emit('new')">
          <i class="fas fa-plus me-1"></i>
          Create New
        </button>
      </div>
    </div>
    <div v-if="saveMessage" :class="['save-message', saveStatus]">
      {{ saveMessage }}
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FinalStep",
  props: {
    content: {
      type: String,
      required: true,
    },
    generatedImage: {
      type: String,
      default: null,
    },
    projectId: {
      type: String,
      default: "",
    },
    projectTitle: {
      type: String,
      default: "Content Project",
    },
    projectDescription: {
      type: String,
      default: "",
    },
    contentId: {
      type: String,
      default: "",
    },
    fromDashboard: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      projectStatus: "in_progress",
      loading: false,
      error: null,
      saveLoading: false,
      saveMessage: null,
      saveStatus: "success",
      imageLoading: false,
      imageError: null,
      localImage: this.generatedImage,
      toasts: [],
    };
  },
  computed: {
    apiEndpoint() {
      return process.env.VUE_APP_API_URL || "http://localhost:3001/api";
    },
    hasProjectId() {
      return this.projectId && this.projectId.length > 0;
    },
    hasContentId() {
      return this.contentId && this.contentId.length > 0;
    },
    formattedContent() {
      if (!this.content) return "";

      // Tạo định dạng HTML cho nội dung
      const formatted = this.content
        // Thay thế dòng trống bằng thẻ đoạn
        .replace(/\n\s*\n/g, "</p><p>")
        // Thay thế dòng mới đơn bằng thẻ br
        .replace(/\n/g, "<br>")
        // Bọc toàn bộ nội dung trong thẻ p
        .replace(/^(.+)$/, "<p>$1</p>");

      return formatted;
    },
    imageUrl() {
      // First, use localImage from data if available
      if (this.localImage) {
        console.log(
          "Using local image:",
          this.localImage.substring(0, 50) + "..."
        );

        // Ensure the URL is properly formatted for deployment
        return this.ensureAbsoluteUrl(this.localImage);
      }

      // Next, try to use generated image from props
      if (this.generatedImage) {
        console.log(
          "Using generated image from props:",
          typeof this.generatedImage === "string"
            ? this.generatedImage.substring(0, 50) + "..."
            : "object"
        );

        // Handle string URLs (including data URLs)
        if (typeof this.generatedImage === "string") {
          return this.ensureAbsoluteUrl(this.generatedImage);
        }

        // Handle object format
        if (
          typeof this.generatedImage === "object" &&
          this.generatedImage !== null
        ) {
          if ("image" in this.generatedImage) {
            return this.ensureAbsoluteUrl(this.generatedImage.image);
          }
          if ("imageUrl" in this.generatedImage) {
            return this.ensureAbsoluteUrl(this.generatedImage.imageUrl);
          }
        }
      }

      return null;
    },
  },
  created() {
    console.log("FinalStep created");
    console.log("generatedImage prop:", this.generatedImage);
    console.log("contentId prop:", this.contentId);

    // Set initial local image from props
    if (this.generatedImage) {
      this.localImage = this.generatedImage;
    } else {
      this.localImage = null;
    }

    if (this.hasProjectId) {
      this.fetchProjectStatus();
    }

    // Always fetch content image if we have contentId, regardless of generatedImage prop
    if (this.hasContentId) {
      this.fetchContentImage();
    }
  },
  mounted() {
    console.log("FinalStep mounted, contentId:", this.contentId);
    console.log("From dashboard:", this.fromDashboard);
    console.log("Generated image from props:", !!this.generatedImage);

    // Thêm giá trị mặc định cho toasts
    if (!this.toasts) {
      this.toasts = [];
    }

    // Tải lại dữ liệu hình ảnh từ cơ sở dữ liệu nếu có contentId
    if (this.contentId && (!this.generatedImage || this.fromDashboard)) {
      console.log("Loading image data from database...");
      this.loadImageFromDatabase();
    }
  },
  methods: {
    async fetchProjectStatus() {
      try {
        if (!this.hasProjectId) return;

        const response = await axios.get(
          `${this.apiEndpoint}/projects/${this.projectId}`
        );
        if (response.data.success) {
          this.projectStatus = response.data.data.status;
        }
      } catch (error) {
        console.error("Error fetching project status:", error);
        this.error = "Could not fetch project status";
      }
    },
    async fetchContentImage() {
      this.imageLoading = true;
      this.imageError = false;

      try {
        console.log("Fetching content image...");

        if (!this.contentId) {
          console.error("No content ID available");
          throw new Error("Không có ID nội dung để tải hình ảnh");
        }

        // Ưu tiên sử dụng endpoint content-image để lấy ảnh từ database
        const contentImageUrl = `/api/image/content-image/${this.contentId}`;
        console.log(`Trying content-image endpoint: ${contentImageUrl}`);

        try {
          // Kiểm tra xem ảnh có tồn tại trong database không
          const testImg = new Image();
          const imageLoadPromise = new Promise((resolve) => {
            testImg.onload = () => resolve(true);
            testImg.onerror = () => resolve(false);
          });

          testImg.src = contentImageUrl;
          const imageExists = await imageLoadPromise;

          if (imageExists) {
            console.log(
              "Image exists in database, using content-image endpoint"
            );
            this.imageUrl = this.ensureAbsoluteUrl(contentImageUrl);
            this.contentImage = this.imageUrl;
            this.imageLoading = false;
            return;
          }
        } catch (e) {
          console.log("Error checking content-image endpoint:", e);
        }

        console.log("Image not found in database, checking content record");

        // Nếu không tìm thấy trong database, thì kiểm tra từ API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await axios.get(
          `/api/content/contents/${this.contentId}`,
          {
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (response.data && response.data.success) {
          const contentData = response.data.data;
          console.log("Full content data:", contentData);

          if (contentData && contentData.imageUrl) {
            console.log(
              `Found image URL for content ${this.contentId}:`,
              contentData.imageUrl
            );

            // Check for content-image endpoint first (highest priority)
            if (contentData.imageUrl.includes("/content-image/")) {
              const imageUrl = this.ensureAbsoluteUrl(contentData.imageUrl);
              console.log(`Using content-image URL: ${imageUrl}`);
              this.imageUrl = imageUrl;
              this.contentImage = imageUrl;
              this.imageLoading = false;
              return;
            }

            // Check filename pattern next
            const imageFilenameMatch =
              contentData.imageUrl.match(/image_\d+\.png/);
            if (imageFilenameMatch) {
              const filename = imageFilenameMatch[0];
              console.log(
                `Detected image filename pattern directly in content data: ${filename}`
              );

              // Create absolute URL to image uploads endpoint
              const directUrl = `${window.location.origin}/api/image/uploads/${filename}`;
              console.log("Created direct URL to image:", directUrl);

              this.imageUrl = directUrl;
              this.contentImage = directUrl;
              this.imageLoading = false;
              return;
            }

            // Kiểm tra đường dẫn hình ảnh
            if (
              contentData.imageUrl.includes("undefined") ||
              contentData.imageUrl === "null" ||
              contentData.imageUrl === ""
            ) {
              console.error(
                "Invalid image URL detected:",
                contentData.imageUrl
              );
              this.imageError = "URL hình ảnh không hợp lệ";
              this.imageLoading = false;
              return;
            }

            // Store the original URL
            const originalUrl = contentData.imageUrl;
            console.log("Original image URL:", originalUrl);

            // Use the original URL with proper handling
            this.imageUrl = this.ensureAbsoluteUrl(originalUrl);
            this.contentImage = this.imageUrl;
            this.imageLoading = false;
          } else {
            console.log(`No image found for content ${this.contentId}`);
            this.imageUrl = null;
            this.imageLoading = false;
            this.imageError = "Không tìm thấy hình ảnh trong cơ sở dữ liệu";
          }
        } else {
          console.warn("API did not return success:", response.data);
          this.imageUrl = null;
          this.imageLoading = false;
          this.imageError = "Lỗi khi lấy dữ liệu nội dung";
        }
      } catch (error) {
        console.error("Error in fetchContentImage:", error);

        if (error.name === "AbortError") {
          this.imageError = "Request timed out when loading image";
        } else {
          this.imageError = "Failed to load image: " + error.message;
        }

        this.imageUrl = null;
        this.imageLoading = false;
      }
    },
    async markAsFinished() {
      try {
        if (!this.hasProjectId) {
          alert("Cannot update status: No project ID available");
          return;
        }

        this.loading = true;
        const response = await axios.patch(
          `${this.apiEndpoint}/projects/${this.projectId}/status`,
          {
            status: "finished",
          }
        );

        if (response.data.success) {
          this.projectStatus = "finished";
        }
      } catch (error) {
        console.error("Error updating project status:", error);
        alert("Failed to update project status: " + error.message);
      } finally {
        this.loading = false;
      }
    },
    async markAsInProgress() {
      try {
        if (!this.hasProjectId) {
          alert("Cannot update status: No project ID available");
          return;
        }

        this.loading = true;
        const response = await axios.patch(
          `${this.apiEndpoint}/projects/${this.projectId}/status`,
          {
            status: "in_progress",
          }
        );

        if (response.data.success) {
          this.projectStatus = "in_progress";
        }
      } catch (error) {
        console.error("Error updating project status:", error);
        alert("Failed to update project status: " + error.message);
      } finally {
        this.loading = false;
      }
    },
    async saveContent() {
      try {
        if (!this.hasContentId) {
          this.saveMessage = "No content ID available. Cannot save.";
          this.saveStatus = "error";
          return;
        }

        this.saveLoading = true;
        this.saveMessage = null;

        const response = await axios.put(
          `${this.apiEndpoint}/content/contents/${this.contentId}`,
          {
            generatedContent: this.content,
          }
        );

        if (response.data.success) {
          this.saveMessage = "Content saved successfully!";
          this.saveStatus = "success";
          // Emit event to update parent content
          this.$emit("update:content", this.content);
        } else {
          throw new Error(response.data.error || "Unknown error occurred");
        }
      } catch (error) {
        console.error("Error saving content:", error);
        this.saveMessage = "Failed to save content: " + error.message;
        this.saveStatus = "error";
      } finally {
        this.saveLoading = false;

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      }
    },
    exportContent() {
      try {
        // Tạo dữ liệu để export
        const exportData = {
          title: this.projectTitle || "Untitled Content",
          content: this.content,
          image: this.imageUrl,
          createdAt: new Date().toISOString(),
          projectInfo: {
            id: this.projectId,
            title: this.projectTitle,
            description: this.projectDescription,
          },
        };

        // Tạo JSON string
        const dataStr = JSON.stringify(exportData, null, 2);

        // Tạo blob để download
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Tạo link và kích hoạt download
        const a = document.createElement("a");
        a.download = `${this.projectTitle || "content"}_export.json`;
        a.href = url;
        a.click();

        // Giải phóng URL object
        URL.revokeObjectURL(url);

        this.saveMessage = "Content exported successfully!";
        this.saveStatus = "success";

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      } catch (error) {
        console.error("Error exporting content:", error);
        this.saveMessage = "Failed to export content: " + error.message;
        this.saveStatus = "error";

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      }
    },
    shareContent() {
      // Xử lý chia sẻ nội dung - có thể thông qua email hoặc mạng xã hội
      try {
        // Kiểm tra nếu Web Share API được hỗ trợ
        if (navigator.share) {
          navigator
            .share({
              title: this.projectTitle || "My Content",
              text: `Check out my content: ${this.projectTitle || "Content"}`,
              url: window.location.href,
            })
            .then(() => {
              this.saveMessage = "Content shared successfully!";
              this.saveStatus = "success";
            })
            .catch((error) => {
              throw error;
            });
        } else {
          // Fallback - copy URL vào clipboard
          navigator.clipboard.writeText(window.location.href).then(() => {
            this.saveMessage = "URL copied to clipboard!";
            this.saveStatus = "success";
          });
        }

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      } catch (error) {
        console.error("Error sharing content:", error);
        this.saveMessage = "Failed to share content: " + error.message;
        this.saveStatus = "error";

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      }
    },
    downloadPDF() {
      try {
        // Thông báo cho người dùng rằng chức năng đang được phát triển
        this.saveMessage = "PDF download feature will be available soon.";
        this.saveStatus = "success";

        // Xóa thông báo sau 3 giây
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);

        // NOTE: Chức năng này sẽ được triển khai trong bản cập nhật tới
        // Sử dụng thư viện như jsPDF hoặc html2pdf.js để tạo PDF từ nội dung
      } catch (error) {
        console.error("Error downloading PDF:", error);
        this.saveMessage = "Failed to download PDF: " + error.message;
        this.saveStatus = "error";

        // Clear message after 3 seconds
        setTimeout(() => {
          this.saveMessage = null;
        }, 3000);
      }
    },
    goToDashboard() {
      this.$emit("go-to-dashboard");
    },
    async generateImageForContent() {
      try {
        this.imageLoading = true;
        this.imageError = null;

        // Hiển thị thông báo đang xử lý
        this.showToast("Đang chuẩn bị tạo hình ảnh cho nội dung...", "info");

        if (!this.contentId) {
          throw new Error("Không có ID nội dung để tạo hình ảnh");
        }

        // Kiểm tra xem có nội dung không
        if (!this.content || this.content.trim().length === 0) {
          this.showToast("Không thể tạo hình ảnh: Nội dung trống", "error");
          throw new Error("Nội dung trống, không thể tạo hình ảnh");
        }

        console.log(`Generating image for content ID: ${this.contentId}`);
        console.log(`Content length: ${this.content.length} characters`);

        // Bước 1: Tạo prompt từ nội dung
        console.log("Step 1: Generating prompt from content");
        const promptResponse = await axios.post(
          `/api/content/contents/generate-prompt`,
          {
            contentId: this.contentId,
            style: "Realistic",
            template: `Generate a [STYLE] image of [SUBJECT], featuring [KEY DETAILS]. Style: [ART STYLE/MEDIUM], color palette: [COLORS], lighting: [LIGHTING], composition: [COMPOSITION]. Additional effects: [EFFECTS]. Keep the overall mood [MOOD]. Render in Kandinsky 2.2 with high detail, resolution [RESOLUTION].`,
            content: this.content,
          },
          {
            timeout: 45000, // 45 seconds timeout for prompt generation
          }
        );

        if (!promptResponse.data.success) {
          throw new Error(
            promptResponse.data.error || "Lỗi khi tạo mô tả hình ảnh"
          );
        }

        const generatedPrompt = promptResponse.data.prompt;
        console.log(
          "Generated prompt:",
          generatedPrompt.substring(0, 100) + "..."
        );

        // Hiển thị thông báo prompt đã được tạo
        this.showToast(
          "Đã tạo mô tả hình ảnh, đang tạo hình ảnh...",
          "success"
        );

        // Bước 2: Tạo hình ảnh từ prompt
        const imageResponse = await axios.post(
          `/api/image/generate`,
          {
            prompt: generatedPrompt,
            style: "Realistic",
            width: 512,
            height: 512,
            num_inference_steps: 30,
          },
          {
            timeout: 180000, // 3 minutes timeout for image generation
          }
        );

        if (!imageResponse.data.success) {
          throw new Error(
            imageResponse.data.error || "Lỗi khi tạo hình ảnh từ mô tả"
          );
        }

        // Kiểm tra nếu response có chứa dữ liệu hình ảnh dạng base64
        if (
          imageResponse.data.image &&
          imageResponse.data.image.startsWith("data:image")
        ) {
          console.log("Received base64 image data from API");

          // Save base64 image to server and get URL
          await this.saveBase64ImageToServer(imageResponse.data.image);
          return;
        }

        // Trường hợp API trả về filename
        const imageUrl = `/api/content/contents/${this.contentId}/images/${imageResponse.data.filename}`;

        // Bước 3: Cập nhật URL hình ảnh vào nội dung
        const updateResponse = await axios.put(
          `/api/content/contents/${this.contentId}`,
          {
            imageUrl,
            generatedContent: this.content, // Thêm trường generatedContent để tránh lỗi
          }
        );

        if (!updateResponse.data.success) {
          throw new Error(
            updateResponse.data.error || "Lỗi khi cập nhật URL hình ảnh"
          );
        }

        // Cập nhật URL hình ảnh vào local state
        this.localImage = imageUrl;
        this.$emit("update:image", imageUrl);

        // Hiển thị thông báo thành công
        this.showToast("Đã tạo hình ảnh thành công!", "success");
      } catch (error) {
        console.error("Error generating image for content:", error);

        let errorMessage = "Lỗi không xác định";

        // Check for API response error
        if (error.response) {
          console.log("API response error:", error.response.data);

          // Handle specific error messages from server
          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;

            // Specific checks for common errors
            if (errorMessage.includes("Missing required field")) {
              errorMessage =
                "Thiếu trường dữ liệu cần thiết. Vui lòng thử lại.";
              console.log("Content availability:", !!this.content);
              console.log("ContentId availability:", !!this.contentId);

              // Try retrieving the content again if missing
              if (
                this.contentId &&
                (!this.content || this.content.trim().length === 0)
              ) {
                this.showToast("Đang thử tải lại nội dung...", "info");
                try {
                  const contentResponse = await axios.get(
                    `/api/content/contents/${this.contentId}`
                  );
                  if (
                    contentResponse.data.success &&
                    contentResponse.data.data.generatedContent
                  ) {
                    // Update the local content
                    this.$emit(
                      "update:content",
                      contentResponse.data.data.generatedContent
                    );
                    this.showToast(
                      "Đã tải lại nội dung, vui lòng thử lại",
                      "info"
                    );
                  }
                } catch (reloadError) {
                  console.error("Error reloading content:", reloadError);
                }
              }
            }
          }
        } else if (error.message) {
          errorMessage = error.message;
        }

        this.imageError = `Lỗi khi tạo hình ảnh: ${errorMessage}`;

        // Hiển thị thông báo lỗi
        this.showToast(`Lỗi: ${errorMessage}`, "error");

        // Nếu lỗi do timeout
        if (error.message.includes("timeout")) {
          this.showToast(
            "Quá thời gian chờ phản hồi. Vui lòng thử lại sau.",
            "error"
          );
        }
      } finally {
        this.imageLoading = false;
      }
    },
    async saveBase64ImageToServer(base64Data) {
      try {
        console.log("Saving base64 image to server...");
        if (!this.contentId) {
          throw new Error("No content ID available");
        }

        // Hiển thị thông báo đang xử lý
        this.showToast("Đang lưu hình ảnh vào máy chủ...", "info");

        // 1. Gửi dữ liệu base64 đến API để lưu trên server
        const saveResponse = await axios.post("/api/image/save-base64", {
          imageData: base64Data,
          contentId: this.contentId,
        });

        if (!saveResponse.data.success) {
          throw new Error(saveResponse.data.error || "Lỗi khi lưu hình ảnh");
        }

        // 2. Lấy URL của hình ảnh đã lưu
        const imageUrl = saveResponse.data.imageUrl;
        console.log("Image saved successfully, URL:", imageUrl);

        // 3. Cập nhật URL hình ảnh vào content
        const updateResponse = await axios.patch(
          `/api/content/contents/${this.contentId}/partial`,
          { imageUrl }
        );

        if (!updateResponse.data.success) {
          throw new Error(
            updateResponse.data.error || "Lỗi khi cập nhật URL hình ảnh"
          );
        }

        // 4. Cập nhật URL hình ảnh vào local state
        this.localImage = imageUrl;
        this.$emit("update:image", imageUrl);

        // Hiển thị thông báo thành công
        this.showToast("Đã lưu hình ảnh thành công!", "success");
        this.imageError = null;
      } catch (error) {
        console.error("Error saving base64 image:", error);

        // Nếu đã có dữ liệu base64, vẫn hiển thị dù không lưu được
        if (base64Data) {
          this.localImage = base64Data;
          this.$emit("update:image", base64Data);
          this.showToast(
            "Hiển thị hình ảnh tạm thời. Không thể lưu vào máy chủ.",
            "warning"
          );
        } else {
          this.imageError =
            "Không thể lưu hình ảnh vào máy chủ: " + error.message;
          this.showToast("Lỗi: " + error.message, "error");
        }
      }
    },
    async updateImageUrlToDatabase() {
      try {
        // Kiểm tra xem có imageUrl trong local state không
        if (!this.localImage || !this.contentId) {
          console.error("Không có dữ liệu hình ảnh hoặc ID nội dung");
          return;
        }

        this.imageLoading = true;
        this.showToast("Đang cập nhật hình ảnh vào cơ sở dữ liệu...", "info");

        // Lấy thông tin nội dung hiện tại
        const contentResponse = await axios.get(
          `/api/content/contents/${this.contentId}`
        );
        if (!contentResponse.data.success) {
          throw new Error("Không thể lấy thông tin nội dung");
        }

        const content = contentResponse.data.data;

        // Nếu là data URL, cần lưu vào server trước
        if (this.localImage.startsWith("data:image")) {
          await this.saveBase64ImageToServer(this.localImage);
          return;
        }

        // Cập nhật URL
        const updateResponse = await axios.put(
          `/api/content/contents/${this.contentId}`,
          {
            imageUrl: this.localImage,
            generatedContent: content.generatedContent || this.content,
          }
        );

        if (!updateResponse.data.success) {
          throw new Error(
            updateResponse.data.error || "Lỗi khi cập nhật URL hình ảnh"
          );
        }

        this.showToast("Đã cập nhật hình ảnh vào cơ sở dữ liệu!", "success");
      } catch (error) {
        console.error("Error updating image URL:", error);
        this.showToast("Lỗi: " + error.message, "error");
      } finally {
        this.imageLoading = false;
      }
    },
    showToast(message, type = "info") {
      if (!this.toasts) this.toasts = [];

      const id = Date.now();
      this.toasts.push({ id, message, type });

      // Tự động xóa sau 5 giây
      setTimeout(() => {
        this.removeToast(id);
      }, 5000);
    },
    removeToast(id) {
      if (this.toasts) {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
      }
    },
    ensureAbsoluteUrl(url) {
      if (!url) return null;

      // Log URL for debugging
      console.log(`Resolving URL: ${url}`);

      // Return as-is if already absolute or data URL
      if (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("data:")
      ) {
        console.log(`URL is already absolute: ${url}`);
        return url;
      }

      // Check if URL contains image_XXXXXXXX.png pattern (saved image format)
      const imageFilenameMatch = url.match(/image_\d+\.png/);
      if (imageFilenameMatch) {
        // Extract filename
        const filename = imageFilenameMatch[0];
        console.log(`Detected image filename pattern: ${filename}`);
        // Use correct endpoint /api/image/uploads/:fileName
        const result = `${window.location.origin}/api/image/uploads/${filename}`;
        console.log(`Created direct URL for image file: ${result}`);
        return result;
      }

      // Special handling for uploads directory
      if (url.includes("/uploads/") || url.includes("uploads/")) {
        // Extract filename from path
        const filename = url.split("/").pop();
        console.log(`Extracted filename from uploads path: ${filename}`);
        // Use correct endpoint /api/image/uploads/:fileName
        const result = `${window.location.origin}/api/image/uploads/${filename}`;
        console.log(`Created uploads URL: ${result}`);
        return result;
      }

      // If starts with /api, add domain
      if (url.startsWith("/api")) {
        const result = `${window.location.origin}${url}`;
        console.log(`Created API URL: ${result}`);
        return result;
      }

      // If starts with server/ or /server/
      if (url.startsWith("server/") || url.startsWith("/server/")) {
        const result = `${window.location.origin}/api/${url.replace(
          /^(\/)?server\//,
          ""
        )}`;
        console.log(`Created server path URL: ${result}`);
        return result;
      }

      // If doesn't start with / but is still a relative path, add /
      if (!url.startsWith("/")) {
        const result = `${window.location.origin}/${url}`;
        console.log(`Created relative path URL: ${result}`);
        return result;
      }

      // Default case, assume relative to root
      const result = `${window.location.origin}${url}`;
      console.log(`Created root-relative URL: ${result}`);
      return result;
    },
    handleImageError(event) {
      console.error("Image loading error:", event);
      this.imageError = "Failed to load image";

      // Try to debug and fix the image URL
      if (this.localImage) {
        this.debugImageUrl(this.localImage);
      } else if (this.generatedImage) {
        this.debugImageUrl(this.generatedImage);
      }
    },
    debugImageUrl(originalUrl) {
      console.log("Debugging image URL:", originalUrl);

      // Kiểm tra nhiều định dạng URL khác nhau
      const possibleUrls = [];

      if (typeof originalUrl !== "string") {
        console.error("Original URL is not a string:", originalUrl);
        return;
      }

      // Lấy tên tệp nếu có
      const filename = originalUrl.split("/").pop();
      console.log("Extracted filename:", filename);

      // Đường dẫn trực tiếp đến API endpoint (ưu tiên cao nhất)
      if (filename) {
        possibleUrls.push(`/api/image/uploads/${filename}`);
        possibleUrls.push(
          `${window.location.origin}/api/image/uploads/${filename}`
        );
      }

      if (originalUrl.includes("uploads/")) {
        // Các định dạng khác cũng được thử
        possibleUrls.push(`/server/uploads/${filename}`);
        possibleUrls.push(`/uploads/${filename}`);
      }

      // Thử URL gốc với tên miền
      if (!originalUrl.startsWith("http") && !originalUrl.startsWith("data:")) {
        possibleUrls.push(
          `${window.location.origin}${
            originalUrl.startsWith("/") ? "" : "/"
          }${originalUrl}`
        );
      }

      // Thêm URL gốc vào danh sách (nếu chưa có)
      if (!possibleUrls.includes(originalUrl)) {
        possibleUrls.push(originalUrl);
      }

      console.log("Trying alternate URLs:", possibleUrls);

      // Thử tải mỗi URL
      let successFound = false;

      possibleUrls.forEach((url, index) => {
        setTimeout(() => {
          // Skip if we already found a working URL
          if (successFound) return;

          const img = new Image();
          img.onload = () => {
            console.log(`Success with URL: ${url}`);
            successFound = true;
            this.localImage = url;
            this.$emit("update:image", url);
            this.imageError = null;
            this.imageLoading = false;
          };
          img.onerror = () => {
            console.log(`Failed with URL: ${url}`);

            // Nếu đây là URL cuối cùng và tất cả đều thất bại, hiển thị nút tạo hình ảnh mới
            if (index === possibleUrls.length - 1 && !successFound) {
              console.log("All URLs failed, showing generate button");
              this.imageError =
                "Không thể tải hình ảnh. Bạn có thể tạo hình ảnh mới.";
            }
          };
          img.src = url;
        }, index * 100);
      });
    },
    handleImageLoad() {
      console.log("Image loaded successfully");
      this.imageError = null;
      this.imageLoading = false; // Ensure loading state is cleared
    },
    loadImageFromDatabase() {
      if (!this.contentId) return;

      this.imageLoading = true;
      this.imageError = null;

      console.log(`Fetching image data for content ID: ${this.contentId}`);

      // Nếu có hình ảnh ở local state nhưng chưa được lưu vào database
      if (this.localImage && this.localImage.startsWith("data:image")) {
        console.log("Found local base64 image, saving to database...");
        this.saveBase64ImageToServer(this.localImage);
        return;
      }

      axios
        .get(`/api/content/contents/${this.contentId}`)
        .then((response) => {
          if (response.data && response.data.success && response.data.data) {
            const content = response.data.data;
            console.log("Full content data from DB:", content);

            if (content.imageUrl) {
              console.log(`Found image URL in database: ${content.imageUrl}`);

              // Force reset error state
              this.imageError = null;

              // Check for image_XXXXXXXX.png pattern first (highest priority)
              const imageFilenameMatch =
                content.imageUrl.match(/image_\d+\.png/);
              if (imageFilenameMatch) {
                const filename = imageFilenameMatch[0];
                console.log(
                  `Detected image filename pattern in database: ${filename}`
                );

                // Create direct URL to image uploads endpoint
                const directUrl = `${window.location.origin}/api/image/uploads/${filename}`;
                console.log(
                  "Created direct URL to image from database:",
                  directUrl
                );

                // Force update the image URL
                this.localImage = directUrl;
                this.$emit("update:image", directUrl);

                // Verify the image can be loaded
                const img = new Image();
                img.onload = () => {
                  console.log(
                    "Image loaded successfully using direct URL:",
                    directUrl
                  );
                  this.imageError = null;
                  this.imageLoading = false;
                  this.showToast("Đã tải hình ảnh thành công", "success");
                };

                img.onerror = (err) => {
                  console.error("Failed to load image with direct URL:", err);
                  // Try one more time with a direct fetch to verify file exists
                  fetch(directUrl, { method: "HEAD" })
                    .then((response) => {
                      if (response.ok) {
                        console.log(
                          "Image exists on server but failed to load. Trying again..."
                        );
                        // Force browser to reload the image by adding timestamp
                        const timestamp = new Date().getTime();
                        const urlWithCache = `${directUrl}?t=${timestamp}`;
                        this.localImage = urlWithCache;
                        this.$emit("update:image", urlWithCache);
                        this.imageLoading = false;
                        this.showToast("Đã tải hình ảnh thành công", "success");
                      } else {
                        throw new Error(`Server returned ${response.status}`);
                      }
                    })
                    .catch((fetchErr) => {
                      console.error("Image verification failed:", fetchErr);
                      this.imageError = "Không thể tải hình ảnh từ server";
                      this.imageLoading = false;
                      // Try debug as last resort
                      this.debugImageUrl(content.imageUrl);
                    });
                };

                img.src = directUrl;
                return;
              }

              // Try standard URL processing if no filename pattern
              const formattedUrl = this.ensureAbsoluteUrl(content.imageUrl);
              console.log("Formatted URL for image:", formattedUrl);

              // Verify the image can be loaded
              const standardImg = new Image();
              standardImg.onload = () => {
                console.log(
                  "Image loaded successfully with formatted URL:",
                  formattedUrl
                );
                this.localImage = formattedUrl;
                this.$emit("update:image", formattedUrl);
                this.imageError = null;
                this.imageLoading = false;
                this.showToast("Đã tải hình ảnh thành công", "success");
              };

              standardImg.onerror = () => {
                console.error("Failed to load image with formatted URL");
                // Try fallback methods
                this.tryAlternativeImageUrls(content.imageUrl);
              };

              standardImg.src = formattedUrl;
            } else {
              console.log("No image URL found in database");

              // Kiểm tra xem có generatedImage từ prop hoặc local state không
              if (this.generatedImage || this.localImage) {
                console.log("Using generatedImage or localImage instead");

                const imageToUse = this.localImage || this.generatedImage;

                // Nếu là data URL, lưu vào database
                if (
                  typeof imageToUse === "string" &&
                  imageToUse.startsWith("data:image")
                ) {
                  console.log("Saving base64 image to database...");
                  this.saveBase64ImageToServer(imageToUse);
                  return;
                } else if (
                  typeof imageToUse === "object" &&
                  imageToUse.image &&
                  imageToUse.image.startsWith("data:image")
                ) {
                  console.log("Saving object image.image to database...");
                  this.saveBase64ImageToServer(imageToUse.image);
                  return;
                }
              } else {
                this.localImage = null;
                this.imageError = "Không tìm thấy hình ảnh trong cơ sở dữ liệu";
                this.imageLoading = false;
              }
            }
          } else {
            console.error("Error fetching content:", response.data);
            this.imageError = "Lỗi khi tải dữ liệu nội dung";
            this.imageLoading = false;
          }
        })
        .catch((error) => {
          console.error("Error fetching content:", error);
          this.imageError = `Lỗi kết nối: ${error.message}`;
          this.imageLoading = false;
        });
    },
    // Thêm hàm mới để thử các phương pháp thay thế khi tải hình ảnh
    tryAlternativeImageUrls(originalUrl) {
      try {
        console.log("Trying alternative methods to load image:", originalUrl);

        // First, look for image_XXXXXXXX.png pattern
        const imageFilenameMatch = originalUrl.match(/image_\d+\.png/);
        if (imageFilenameMatch) {
          const filename = imageFilenameMatch[0];
          console.log(`Found image filename pattern: ${filename}`);

          // Create direct URL to image uploads endpoint
          const directUrl = `${window.location.origin}/api/image/uploads/${filename}`;
          console.log("Created direct URL to image:", directUrl);

          // Update URL immediately
          this.localImage = directUrl;
          this.$emit("update:image", directUrl);
          this.imageLoading = false;

          // Still try loading to confirm
          const img = new Image();
          img.onload = () => {
            console.log("Image loaded successfully from direct URL");
            this.imageError = null;
          };
          img.onerror = () => {
            console.error("Image failed to load from direct URL");
            this.imageError = "Không thể tải hình ảnh từ server";
            this.debugImageUrl(originalUrl);
          };
          img.src = directUrl;
          return;
        }

        // Try to load the original URL image first
        const img = new Image();
        img.onload = () => {
          console.log("Image loaded successfully from original URL");
          this.localImage = originalUrl;
          this.$emit("update:image", originalUrl);
          this.imageLoading = false;
        };

        img.onerror = async () => {
          console.log(
            "Failed to load image from original URL, trying alternate paths"
          );

          // Try with /api prefix for server uploads
          if (originalUrl.includes("uploads/")) {
            const uploadPathMatch = originalUrl.match(/(uploads\/.*$)/);
            if (uploadPathMatch && uploadPathMatch[1]) {
              const apiUrl = `/api/image/${uploadPathMatch[1]}`;
              console.log("Trying with API URL:", apiUrl);

              // Check if this URL works
              const altImg = new Image();
              altImg.onload = () => {
                console.log("Image loaded successfully from API URL");
                this.localImage = apiUrl;
                this.$emit("update:image", apiUrl);
                this.imageLoading = false;
              };

              altImg.onerror = () => {
                console.log("Failed to load image from API URL");

                // Try one more time with absolute URL
                const absoluteApiUrl = `${window.location.origin}${apiUrl}`;
                console.log("Trying with absolute API URL:", absoluteApiUrl);

                const finalImg = new Image();
                finalImg.onload = () => {
                  console.log(
                    "Image loaded successfully from absolute API URL"
                  );
                  this.localImage = absoluteApiUrl;
                  this.$emit("update:image", absoluteApiUrl);
                  this.imageLoading = false;
                };

                finalImg.onerror = () => {
                  console.log("All API URL attempts failed");
                  this.imageError = "Không thể tải hình ảnh từ server";
                  this.localImage = null;
                  this.imageLoading = false;

                  // Final attempt - debug URL
                  this.debugImageUrl(originalUrl);
                };

                finalImg.src = absoluteApiUrl;
              };

              altImg.src = apiUrl;
            } else {
              this.imageError = "Invalid image path format";
              this.localImage = null;
              this.imageLoading = false;

              // Final attempt - debug URL
              this.debugImageUrl(originalUrl);
            }
          } else {
            this.imageError = "Image not found";
            this.localImage = null;
            this.imageLoading = false;

            // Final attempt - debug URL
            this.debugImageUrl(originalUrl);
          }
        };

        // Ensure the URL is properly formatted
        img.src = this.ensureAbsoluteUrl(originalUrl);
      } catch (imgError) {
        console.error("Error checking image:", imgError);
        this.localImage = originalUrl;
        this.$emit("update:image", originalUrl);
        this.imageLoading = false;
      }
    },
  },
  watch: {
    generatedImage: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log("generatedImage changed:", newValue);

          // If we get a new generatedImage value, update localImage
          if (newValue) {
            this.localImage = newValue;
          }
          // Don't clear localImage if newValue is null - we may already have a valid image
          // from fetchContentImage
        }
      },
    },
    contentId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          console.log("Content ID changed from", oldValue, "to", newValue);

          // Only clear localImage if we're switching to a different content
          if (oldValue) {
            this.localImage = null;
          }

          // Always fetch the image when contentId changes
          this.fetchContentImage();

          // Tải dữ liệu hình ảnh từ cơ sở dữ liệu
          this.loadImageFromDatabase();
        }
      },
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
  color: #1c1c4c;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.project-info {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.project-info h3 {
  color: #1c1c4c;
  margin: 0 0 0.5rem 0;
}

.project-info p {
  color: #6c757d;
  margin: 0 0 1rem 0;
}

.project-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: bold;
}

.status-badge.in_progress {
  background-color: #ecedf7;
  color: #1c1c4c;
}

.status-badge.finished {
  background-color: #e8f5e9;
  color: #28a745;
}

.status-button {
  background: transparent;
  border: 1px solid #1c1c4c;
  color: #1c1c4c;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.status-button:hover {
  background: #ecedf7;
}

.final-content {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.final-content h3 {
  margin-bottom: 1rem;
  color: #1c1c4c;
  font-weight: 600;
}

.content-box {
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: "Arial", sans-serif;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-box p {
  margin-bottom: 1rem;
}

.content-box h1,
.content-box h2,
.content-box h3,
.content-box h4,
.content-box h5,
.content-box h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1c1c4c;
}

.final-image-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.final-image-section h3 {
  margin-bottom: 1.5rem;
  color: #1c1c4c;
  font-weight: 600;
}

.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-loading {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading-text {
  color: #6c757d;
  font-size: 0.9rem;
  text-align: center;
}

.image-section img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.no-image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.no-image-placeholder p {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.image-actions {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.final-actions {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.additional-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.navigation-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.btn {
  min-width: 120px;
  text-align: center;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #1c1c4c;
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #2a2a6c;
}

.btn-outline-primary {
  background: transparent;
  border: 1px solid #1c1c4c;
  color: #1c1c4c;
}

.btn-outline-primary:hover {
  background: #ecedf7;
}

.btn-light {
  background: white;
  color: #1c1c4c;
  border: 1px solid #1c1c4c;
}

.btn-light:hover {
  background: #f8f9fa;
}

.btn-info {
  background: white;
  color: #1c1c4c;
  border: 1px solid #1c1c4c;
}

.btn-info:hover {
  background: #f8f9fa;
}

.btn-success {
  background: #1c1c4c;
  color: white;
  border: none;
}

.btn-success:hover {
  background: #2a2a6c;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.project-info.warning {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
}

.status-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.save-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
}

.save-message.success {
  background-color: #e8f5e9;
  color: #28a745;
}

.save-message.error {
  background-color: #ffebee;
  color: #dc3545;
}

@media (max-width: 768px) {
  .action-buttons,
  .navigation-buttons,
  .additional-actions {
    flex-direction: column;
    width: 100%;
  }

  .action-buttons button,
  .navigation-buttons button,
  .additional-actions button {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .btn {
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

.image-error-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
