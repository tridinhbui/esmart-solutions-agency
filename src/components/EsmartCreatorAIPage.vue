<template>
  <div class="creator-ai-page">
    <!-- Enhanced Quantum Universe Background -->
    <div class="quantum-universe">
      <!-- Atomic Particles Field -->
      <div class="atomic-field">
        <div
          v-for="i in 40"
          :key="`atomic-${i}`"
          class="atomic-particle"
        />
      </div>
      
      <!-- Universe Energy Streams -->
      <div class="universe-energy">
        <div
          v-for="i in 12"
          :key="`universe-${i}`"
          class="energy-stream"
        />
      </div>
      
      <!-- Quantum Cosmic Grid -->
      <div class="cosmic-grid">
        <div
          v-for="i in 20"
          :key="`grid-${i}`"
          class="grid-node"
        />
        <div
          v-for="i in 35"
          :key="`connection-${i}`"
          class="grid-connection"
        />
      </div>
      
      <!-- Stellar Background -->
      <div class="stellar-field">
        <div
          v-for="i in 100"
          :key="`star-${i}`"
          class="star"
        />
      </div>
      
      <!-- Dark Matter Effects -->
      <div class="dark-matter">
        <div
          v-for="i in 6"
          :key="`matter-${i}`"
          class="matter-wave"
        />
      </div>
      
      <!-- Quantum Vortex -->
      <div class="quantum-vortex">
        <div
          v-for="i in 8"
          :key="`vortex-${i}`"
          class="vortex-ring"
        />
      </div>
    </div>

    <!-- Original Quantum Background Effects (Enhanced) -->
    <div class="quantum-cosmos enhanced">
      <div class="cosmic-particles">
        <div
          v-for="i in 35"
          :key="i"
          class="cosmic-particle enhanced"
        />
      </div>
      <div class="energy-streams">
        <div
          v-for="i in 15"
          :key="i"
          class="energy-stream enhanced"
        />
      </div>
      <div class="neural-network-bg">
        <div
          v-for="i in 18"
          :key="i"
          class="neural-node enhanced"
        />
        <div
          v-for="i in 30"
          :key="i"
          class="neural-connection enhanced"
        />
      </div>
    </div>

    

    <div
      v-if="isLoading"
      class="loading-container quantum-loading"
    >
      <div class="quantum-loader">
        <div
          v-for="i in 3"
          :key="i"
          class="quantum-ring"
        />
      </div>
      <p class="loading-text">
        {{ $t("creatorAI.common.loading") }}
      </p>
    </div>

    <div
      v-else-if="error"
      class="error-container"
    >
      <p>{{ error }}</p>
      <button
        class="primary-button"
        @click="$router.push('/dashboard')"
      >
        {{ $t("creatorAI.common.returnToDashboard") }}
      </button>
    </div>

    <div
      v-else
      class="creator-ai-content"
    >
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
        :content-id="contentData.contentId || ''"
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

    <div
      v-if="debugMode"
      class="debug-panel"
    >
      <h3>Debug Panel</h3>
      <p>Current Step: {{ currentStep }}</p>
      <p>Content Data: {{ JSON.stringify(contentData, null, 2) }}</p>
    </div>

    <AppFooter />
    <Chat />
  </div>
</template>

<script>
import DashboardStep from "./creator-ai/DashboardStep.vue";
import RequirementsStep from "./creator-ai/RequirementsStep.vue";
import EditorStep from "./creator-ai/EditorStep.vue";
import ImageStep from "./creator-ai/ImageStep.vue";
import FinalStep from "./creator-ai/FinalStep.vue";

import AppFooter from "./FooterBar.vue";
import Chat from "./Chat.vue";
import axios from "axios";

export default {
  name: "EsmartCreatorAIPage",
  components: {
    DashboardStep,
    RequirementsStep,
    EditorStep,
    ImageStep,
    FinalStep,
    AppFooter,
    Chat,
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

    // Set navbar background color
    this.setupNavbarStyle();
  },
  mounted() {
    // Double-check navbar styling is applied
    this.setupNavbarStyle();
  },
  methods: {
    // Setup navbar styling
    setupNavbarStyle() {
      setTimeout(() => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          navbar.style.backgroundColor = "#ffffff";
          navbar.style.color = "#333333";
          navbar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

          const navLinks = navbar.querySelectorAll("a");
          navLinks.forEach((link) => {
            link.style.color = "#333333";
          });
        }
      }, 100);
    },
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

      console.log(
        "EsmartCreatorAIPage - Updating content:",
        typeof content === "string"
          ? content.substring(0, 50) + "..."
          : "Not a string"
      );

      if (typeof content !== "string") {
        console.error("Invalid content type:", typeof content);
        return;
      }

      const currentSeoScore = this.contentData.seoScore;

      this.contentData.content = content;
      console.log("Content updated in contentData");

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

      // Store the raw image data for debugging purposes
      this.rawImageData = imageData;

      // Handle null or undefined image data
      if (!imageData) {
        console.log("Received null or undefined image data, clearing image");
        this.generatedImage = null;
        return;
      }

      // Handle object type image data
      if (typeof imageData === "object") {
        if (imageData === null) {
          console.log("Received null image data, clearing image");
          this.generatedImage = null;
        } else if (imageData.image) {
          console.log(
            "Using image from object.image property:",
            typeof imageData.image === "string" && imageData.image.length > 50
              ? imageData.image.substring(0, 50) + "..."
              : imageData.image
          );
          // Always prioritize the direct image data over URL to ensure immediate display
          this.generatedImage = imageData.image;
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
          this.generatedImage = imageData;
        }
      } else {
        console.warn("Unrecognized image data format, cannot process");
      }

      console.log(
        "Final generatedImage value updated to:",
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

<style>
/* Simple Black & White Creator AI Page */
.creator-ai-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 6rem;
  background: white;
  color: black;
  position: relative;
  overflow-x: hidden;
}

/* Remove all quantum effects - keep it simple */
.quantum-cosmos,
.quantum-universe,
.atomic-field,
.neural-network,
.energy-waves {
  display: none !important;
}

.creator-ai-content {
  flex: 1;
  padding: 120px 30px 60px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* Simple Loading */
.quantum-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 120px;
  min-height: 60vh;
  text-align: center;
  position: relative;
  z-index: 1;
  background: white;
}

.quantum-loader {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 2rem;
}

.quantum-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #f0f0f0;
  border-top: 2px solid black;
  border-radius: 50%;
  animation: simpleSpinAI 1s linear infinite;
}

.quantum-ring:nth-child(2) {
  width: 40px;
  height: 40px;
  top: 10px;
  left: 10px;
  border-top-color: #666;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.quantum-ring:nth-child(3) {
  width: 20px;
  height: 20px;
  top: 20px;
  left: 20px;
  border-top-color: #333;
  animation-duration: 0.8s;
}

@keyframes simpleSpinAI {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: white;
  color: black;
}

.error-message {
  color: #dc3545;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.retry-button {
  background: black;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #333;
  transform: translateY(-2px);
}

.primary-button {
  background: black;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background: #333;
  transform: translateY(-2px);
}

/* Simple NavBar for creator-ai pages */
.creator-ai-page .navbar {
  background-color: #ffffff !important;
  color: #333333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.creator-ai-page .navbar a {
  color: #333333 !important;
}

.creator-ai-page .navbar a:hover {
  color: black !important;
}

/* Simple button styles */
.creator-ai-page .button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.creator-ai-page .button-group button {
  height: 48px;
  min-width: 150px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.creator-ai-page .secondary-button {
  background-color: #f5f5f5;
  color: black;
  border: 1px solid #ddd;
  height: 48px;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.creator-ai-page .secondary-button:hover {
  background-color: #e5e5e5;
  transform: translateY(-2px);
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  .creator-ai-content {
    padding: 100px 15px 40px;
  }

  .creator-ai-page .button-group {
    flex-direction: column;
    align-items: center;
  }

  .creator-ai-page .button-group button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
