<template>
  <div class="creator-ai-page">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>{{ $t("creatorAI.common.loading") }}</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button class="primary-button" @click="$router.push('/dashboard')">
        {{ $t("creatorAI.common.returnToDashboard") }}
      </button>
    </div>

    <div v-else>
      <DashboardStep
        v-if="currentStep === 1"
        :previous-content="previousContent"
        @next="nextStep"
        @edit-project="editProject"
        @view-final="viewFinalContent"
        @create-new="createNewContent"
      />

      <RequirementsStep
        v-if="currentStep === 2"
        :initial-data="contentData"
        @prev="prevStep"
        @next="nextStep"
        @update:data="updateContentData"
        @seo-analyzing="handleSeoAnalyzing"
      />

      <EditorStep
        v-if="currentStep === 3"
        :initial-content="contentData.content"
        :suggested-keywords="parseKeywords(contentData.keywords)"
        :readability-score="readabilityScore"
        :content-length="calculateContentLength(contentData.content)"
        :content-id="contentData.contentId"
        :is-analyzing-seo="isAnalyzingSeo"
        @prev="prevStep"
        @next="nextStep"
        @update:content="updateContent"
        @go-to-dashboard="goToDashboard"
      />

      <ImageStep
        v-if="currentStep === 4"
        :generated-image="generatedImage"
        :image-styles="imageStyles"
        :initial-style="selectedStyle"
        :requirements="contentData"
        @prev="prevStep"
        @next="nextStep"
        @image-generated="updateGeneratedImage"
        @style-select="updateSelectedStyle"
      />

      <FinalStep
        v-if="currentStep === 5"
        :content="contentData.content"
        :generated-image="generatedImage"
        :project-id="contentData.projectId"
        :project-title="contentData.title"
        :project-description="contentData.description"
        :content-id="contentData.contentId"
        :from-dashboard="fromDashboard"
        @prev="prevStep"
        @go-to-dashboard="goToDashboard"
        @go-to-image="goToImageStep"
        @new="startNew"
        @update:image="updateGeneratedImage"
        @update:content="updateContent"
      />
    </div>

    <div v-if="debugMode" class="debug-panel">
      <h3>Debug Panel</h3>
      <p>Current Step: {{ currentStep }}</p>
      <p>Content Data: {{ JSON.stringify(contentData, null, 2) }}</p>
    </div>
  </div>
</template>

<script>
import DashboardStep from "./creator-ai/DashboardStep.vue";
import RequirementsStep from "./creator-ai/RequirementsStep.vue";
import EditorStep from "./creator-ai/EditorStep.vue";
import ImageStep from "./creator-ai/ImageStep.vue";
import FinalStep from "./creator-ai/FinalStep.vue";
import axios from "axios";

export default {
  name: "EsmartCreatorAIPage",
  components: {
    DashboardStep,
    RequirementsStep,
    EditorStep,
    ImageStep,
    FinalStep,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "project", // Can be "project" or "content"
    },
  },
  data() {
    return {
      currentStep: 1,
      contentData: {
        title: "",
        description: "",
        projectId: "",
        contentId: "",
        topic: "",
        keywords: "",
        tone: "professional",
        type: "blog",
        content: "",
      },
      previousContent: [],
      suggestedKeywords: ["AI", "Content Creation", "Digital Marketing"],
      readabilityScore: 85,
      contentLength: 500,
      generatedImage: null,
      selectedStyle: "Realistic",
      imageStyles: [
        this.$t("creatorAI.image.styles.realistic") || "Realistic",
        this.$t("creatorAI.image.styles.threeD") || "3D",
        this.$t("creatorAI.image.styles.minimalist") || "Minimalist",
        this.$t("creatorAI.image.styles.watercolor") || "Watercolor",
        this.$t("creatorAI.image.styles.flatVector") || "Flat Vector",
      ],
      debugMode: false,
      isLoading: false,
      error: null,
      isAnalyzingSeo: false,
      fromDashboard: false,
      rawImageData: null,
      preventUnintendedNavigation: false, // Flag to prevent unintended navigation
    };
  },
  created() {
    // Setup global error handler for axios to prevent navigation issues
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle errors that shouldn't cause navigation
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );

    // If we're on the dashboard route, always show dashboard
    if (this.$route.path === "/dashboard") {
      this.currentStep = 1;
    }

    // If we have an ID in the route
    if (this.id) {
      if (this.type === "project") {
        this.loadProject(this.id);
      } else if (this.type === "content") {
        this.loadContent(this.id);
      }
    }
  },
  methods: {
    // Add a central error handler for API errors
    handleApiError(error) {
      console.error("API error intercepted:", error);

      // Don't trigger navigation for certain API errors
      if (
        error.config &&
        (error.config.url.includes("/generate-prompt") ||
          error.config.url.includes("/image/generate"))
      ) {
        this.preventUnintendedNavigation = true;
        console.log(
          "Preventing navigation due to API error in image/prompt generation"
        );

        // Clear the flag after a short delay
        setTimeout(() => {
          this.preventUnintendedNavigation = false;
        }, 1000);

        // Don't set global error that would show error screen
        return;
      }

      // For other errors, we can handle them normally
    },
    async loadProject(projectId) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`/api/projects/${projectId}`);

        if (response.data.success) {
          const project = response.data.data;

          // If project has contents, get the first one
          if (project.Contents && project.Contents.length > 0) {
            const content = project.Contents[0];

            this.contentData = {
              projectId: project.id,
              contentId: content.id,
              title: project.title,
              description: project.description,
              topic: content.topic,
              keywords: content.keywords,
              tone: content.tone,
              type: content.contentType,
              content: content.generatedContent,
            };

            // Go directly to final step
            this.currentStep = 5;
          } else {
            this.error = "Project found but no content available";
          }
        } else {
          this.error = "Failed to load project";
        }
      } catch (error) {
        console.error("Error loading project:", error);
        this.error = "Error loading project: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async loadContent(contentId) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`/api/content/contents/${contentId}`);

        if (response.data.success) {
          const content = response.data.data;

          // If the content has a projectId, load the project data
          if (content.projectId) {
            try {
              const projectResponse = await axios.get(
                `/api/projects/${content.projectId}`
              );
              if (projectResponse.data.success) {
                const project = projectResponse.data.data;

                this.contentData = {
                  projectId: content.projectId,
                  contentId: content.id,
                  title: project.title,
                  description: project.description,
                  topic: content.topic,
                  keywords: content.keywords,
                  tone: content.tone,
                  type: content.contentType,
                  content: content.generatedContent,
                };
              }
            } catch (projectError) {
              console.error("Error loading project for content:", projectError);
              // Still continue even if project info can't be loaded
              this.contentData = {
                contentId: content.id,
                projectId: content.projectId,
                title: "Unknown Project",
                description: "",
                topic: content.topic,
                keywords: content.keywords,
                tone: content.tone,
                type: content.contentType,
                content: content.generatedContent,
              };
            }
          } else {
            this.contentData = {
              contentId: content.id,
              projectId: "",
              title: content.topic,
              description: "",
              topic: content.topic,
              keywords: content.keywords,
              tone: content.tone,
              type: content.contentType,
              content: content.generatedContent,
            };
          }

          // Go directly to final step
          this.currentStep = 5;
        } else {
          this.error = "Failed to load content";
        }
      } catch (error) {
        console.error("Error loading content:", error);
        this.error = "Error loading content: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    nextStep() {
      // Check if we should prevent navigation due to recent API errors
      if (this.preventUnintendedNavigation) {
        console.log("Navigation prevented due to recent API error");
        return;
      }

      if (this.currentStep < 5) {
        this.currentStep++;
        if (this.currentStep === 5) {
          this.fromDashboard = false;
        }
      }
    },
    prevStep() {
      // Check if we should prevent navigation due to recent API errors
      if (this.preventUnintendedNavigation) {
        console.log("Navigation prevented due to recent API error");
        return;
      }

      if (this.currentStep > 1) {
        this.currentStep--;
        if (this.currentStep !== 5) {
          this.fromDashboard = false;
        }
      }
    },
    updateContentData(data) {
      console.log("Updating content data:", data);
      this.contentData = data;
      if (data.content) {
        this.readabilityScore = this.calculateReadabilityScore(data.content);
      }
    },
    updateContent(content) {
      if (!content) {
        console.warn("Received null or empty content, skipping update");
        return;
      }
      console.log("Updating content:", content.substring(0, 50) + "...");

      // Lưu điểm SEO hiện tại trước khi cập nhật nội dung
      const currentSeoScore = this.contentData.seoScore;

      // Cập nhật nội dung
      this.contentData.content = content;

      // Đảm bảo giữ nguyên điểm SEO sau khi cập nhật
      if (currentSeoScore) {
        this.contentData.seoScore = currentSeoScore;
      }

      this.readabilityScore = this.calculateReadabilityScore(content);
    },
    updateSelectedStyle(style) {
      this.selectedStyle = style;
    },
    updateGeneratedImage(imageData) {
      console.log(
        "Image data received:",
        typeof imageData === "object" ? "object" : "string"
      );

      // Lưu trữ imageData nguyên bản cho trường hợp cần thiết
      this.rawImageData = imageData;

      // Xử lý imageData là null hoặc undefined
      if (!imageData) {
        console.log("Received null or undefined image data, clearing image");
        this.generatedImage = null;
        return;
      }

      // Xử lý cẩn thận với nhiều trường hợp format khác nhau
      if (typeof imageData === "object") {
        if (imageData === null) {
          console.log("Received null image data, clearing image");
          this.generatedImage = null;
        } else if (imageData.image) {
          console.log(
            "Using image from object.image property:",
            imageData.image.substring(0, 50) + "..."
          );
          this.generatedImage = this.handleImagePath(imageData.image);
        } else if (imageData.imageUrl) {
          console.log(
            "Using image from object.imageUrl property:",
            imageData.imageUrl
          );
          this.generatedImage = this.handleImagePath(imageData.imageUrl);
        }
      } else if (typeof imageData === "string") {
        if (imageData === "null" || imageData === "") {
          console.log("Received empty string as image data");
          this.generatedImage = null;
        } else {
          console.log(
            "Using string directly as image:",
            imageData.substring(0, 50) + "..."
          );
          this.generatedImage = this.handleImagePath(imageData);
        }
      } else {
        console.warn("Unrecognized image data format, cannot process");
      }

      console.log(
        "Final generatedImage value:",
        this.generatedImage
          ? typeof this.generatedImage === "string" &&
            this.generatedImage.length > 50
            ? this.generatedImage.substring(0, 50) + "..."
            : this.generatedImage
          : "null"
      );
    },
    handleImagePath(url) {
      if (!url) return null;

      // Handle URLs from the uploads folder
      if (url.includes("uploads/")) {
        const filename = url.split("/").pop();
        return `/api/image/uploads/${filename}`;
      }

      // Handle FastAPI URLs
      if (url.includes("/images/")) {
        // If it's already a full URL (from FastAPI), keep it as is
        if (url.startsWith("http")) {
          return url;
        }

        // If not, make sure it has the right prefix
        const FASTAPI_URL =
          process.env.VUE_APP_FASTAPI_URL || "http://localhost:8000";
        return `${FASTAPI_URL}${url.startsWith("/") ? "" : "/"}${url}`;
      }

      // If it starts with /api, it's already a relative server URL
      if (url.startsWith("/api")) {
        return url;
      }

      // Default: return URL as is
      return url;
    },
    exportContent() {
      console.log("Exporting content...");
    },
    downloadPDF() {
      console.log("Downloading PDF...");
    },
    shareContent() {
      console.log("Sharing content...");
    },
    startNew() {
      this.currentStep = 1;
      this.contentData = {
        title: "",
        description: "",
        projectId: "",
        contentId: "",
        topic: "",
        keywords: "",
        tone: "professional",
        type: "blog",
        content: "",
      };
    },
    createNewContent() {
      // Reset tất cả dữ liệu về mặc định trước khi chuyển sang RequirementsStep
      this.contentData = {
        title: "",
        description: "",
        projectId: "",
        contentId: "",
        topic: "",
        keywords: "",
        tone: "professional",
        type: "blog",
        content: "",
      };
      // Chuyển sang bước RequirementsStep
      this.currentStep = 2;
    },
    async editProject(projectId) {
      try {
        this.isLoading = true;
        this.error = null;

        const response = await axios.get(`/api/projects/${projectId}`);

        if (response.data.success) {
          const project = response.data.data;

          // If project has contents, get the first one
          if (project.Contents && project.Contents.length > 0) {
            const content = project.Contents[0];

            this.contentData = {
              projectId: project.id,
              contentId: content.id,
              title: project.title,
              description: project.description,
              topic: content.topic,
              keywords: content.keywords,
              tone: content.tone,
              type: content.contentType,
              content: content.generatedContent,
            };

            // Go directly to editor step
            this.currentStep = 3;
          } else {
            this.error = "Project found but no content available";
          }
        } else {
          this.error = "Failed to load project";
        }
      } catch (error) {
        console.error("Error loading project for editing:", error);
        this.error = "Error loading project: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    goToImageStep() {
      this.currentStep = 4;
    },
    parseKeywords(keywordsString) {
      if (!keywordsString) return this.suggestedKeywords;

      return keywordsString
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);
    },
    calculateContentLength(content) {
      if (!content) return 0;
      return content.trim().split(/\s+/).length;
    },
    calculateReadabilityScore(content) {
      if (!content) return 0;

      const words = content.trim().split(/\s+/).length;
      const sentences = content.split(/[.!?]+/).length;
      const avgWordsPerSentence = words / Math.max(1, sentences);

      let score = Math.min(
        100,
        Math.max(
          50,
          85 - Math.abs(avgWordsPerSentence - 15) + Math.min(words / 50, 15)
        )
      );

      return Math.round(score);
    },
    goToDashboard() {
      // Check if we should prevent navigation due to recent API errors
      if (this.preventUnintendedNavigation) {
        console.log(
          "Navigation to dashboard prevented due to recent API error"
        );
        return;
      }

      this.currentStep = 1;
      this.fromDashboard = false;
    },
    handleSeoAnalyzing(status) {
      this.isAnalyzingSeo = status;
    },
    async viewFinalContent(id, type = "project") {
      // Redirect to the appropriate view based on the ID and type
      console.log(`Viewing final content for ${type} ID: ${id}`);
      this.fromDashboard = true;

      if (type === "project") {
        // For projects, load the project data
        this.loadProject(id);
      } else if (type === "content") {
        // For individual content, load the content data
        this.loadContent(id);
      } else {
        console.error(`Unknown content type: ${type}`);
      }
    },
  },
};
</script>

<style scoped>
.creator-ai-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.debug-panel {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
  white-space: pre-wrap;
}

.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.primary-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #2980b9;
}
</style>
