<template>
  <div class="creator-ai-page">
    <!-- Enhanced Quantum Universe Background -->
    <div class="quantum-universe">
      <!-- Atomic Particles Field -->
      <div class="atomic-field">
        <div class="atomic-particle" v-for="i in 40" :key="`atomic-${i}`" />
      </div>
      
      <!-- Universe Energy Streams -->
      <div class="universe-energy">
        <div class="energy-stream" v-for="i in 12" :key="`universe-${i}`" />
      </div>
      
      <!-- Quantum Cosmic Grid -->
      <div class="cosmic-grid">
        <div class="grid-node" v-for="i in 20" :key="`grid-${i}`" />
        <div class="grid-connection" v-for="i in 35" :key="`connection-${i}`" />
      </div>
      
      <!-- Stellar Background -->
      <div class="stellar-field">
        <div class="star" v-for="i in 100" :key="`star-${i}`" />
      </div>
      
      <!-- Dark Matter Effects -->
      <div class="dark-matter">
        <div class="matter-wave" v-for="i in 6" :key="`matter-${i}`" />
      </div>
      
      <!-- Quantum Vortex -->
      <div class="quantum-vortex">
        <div class="vortex-ring" v-for="i in 8" :key="`vortex-${i}`" />
      </div>
    </div>

    <!-- Original Quantum Background Effects (Enhanced) -->
    <div class="quantum-cosmos enhanced">
      <div class="cosmic-particles">
        <div class="cosmic-particle enhanced" v-for="i in 35" :key="i" />
      </div>
      <div class="energy-streams">
        <div class="energy-stream enhanced" v-for="i in 15" :key="i" />
      </div>
      <div class="neural-network-bg">
        <div class="neural-node enhanced" v-for="i in 18" :key="i" />
        <div class="neural-connection enhanced" v-for="i in 30" :key="i" />
      </div>
    </div>

    <NavBar />

    <div
      v-if="isLoading"
      class="loading-container quantum-loading"
    >
      <div class="quantum-loader">
        <div class="quantum-ring" v-for="i in 3" :key="i" />
      </div>
      <p class="loading-text">{{ $t("creatorAI.common.loading") }}</p>
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
import NavBar from "./NavBar.vue";
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
    NavBar,
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
/* Quantum Creator AI Page */
.creator-ai-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: 6rem;
  background: 
    radial-gradient(circle at 20% 30%, rgba(139, 69, 244, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%),
    linear-gradient(135deg, #0f0f1e 0%, #1e1b4b 50%, #1e293b 100%);
  position: relative;
  overflow-x: hidden;
}

/* Quantum Background Effects */
.quantum-cosmos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.cosmic-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cosmic-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  border-radius: 50%;
  animation: cosmicFloat 15s infinite linear;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
}

.cosmic-particle:nth-child(odd) {
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  animation-duration: 18s;
}

.cosmic-particle:nth-child(3n) {
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  animation-duration: 12s;
}

/* Positioning cosmic particles */
.cosmic-particle:nth-child(1) { left: 5%; top: 90%; animation-delay: 0s; }
.cosmic-particle:nth-child(2) { left: 12%; top: 95%; animation-delay: 2s; }
.cosmic-particle:nth-child(3) { left: 18%; top: 88%; animation-delay: 1s; }
.cosmic-particle:nth-child(4) { left: 25%; top: 92%; animation-delay: 3s; }
.cosmic-particle:nth-child(5) { left: 32%; top: 96%; animation-delay: 1.5s; }
.cosmic-particle:nth-child(6) { left: 38%; top: 89%; animation-delay: 4s; }
.cosmic-particle:nth-child(7) { left: 45%; top: 94%; animation-delay: 2.5s; }
.cosmic-particle:nth-child(8) { left: 52%; top: 91%; animation-delay: 5s; }
.cosmic-particle:nth-child(9) { left: 58%; top: 97%; animation-delay: 0.5s; }
.cosmic-particle:nth-child(10) { left: 65%; top: 93%; animation-delay: 3.5s; }
.cosmic-particle:nth-child(11) { left: 72%; top: 86%; animation-delay: 1.8s; }
.cosmic-particle:nth-child(12) { left: 78%; top: 98%; animation-delay: 4.5s; }
.cosmic-particle:nth-child(13) { left: 85%; top: 87%; animation-delay: 2.8s; }
.cosmic-particle:nth-child(14) { left: 91%; top: 95%; animation-delay: 6s; }
.cosmic-particle:nth-child(15) { left: 97%; top: 90%; animation-delay: 3.8s; }
.cosmic-particle:nth-child(16) { left: 8%; top: 85%; animation-delay: 7s; }
.cosmic-particle:nth-child(17) { left: 15%; top: 82%; animation-delay: 4.2s; }
.cosmic-particle:nth-child(18) { left: 28%; top: 84%; animation-delay: 8s; }
.cosmic-particle:nth-child(19) { left: 42%; top: 80%; animation-delay: 5.5s; }
.cosmic-particle:nth-child(20) { left: 55%; top: 83%; animation-delay: 9s; }
.cosmic-particle:nth-child(21) { left: 68%; top: 81%; animation-delay: 6.5s; }
.cosmic-particle:nth-child(22) { left: 75%; top: 79%; animation-delay: 10s; }
.cosmic-particle:nth-child(23) { left: 88%; top: 78%; animation-delay: 7.5s; }
.cosmic-particle:nth-child(24) { left: 93%; top: 76%; animation-delay: 11s; }
.cosmic-particle:nth-child(25) { left: 22%; top: 75%; animation-delay: 8.5s; }

.energy-streams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-stream {
  position: absolute;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #ff6b35, transparent);
  animation: energyFlow 8s infinite ease-in-out;
  opacity: 0.3;
}

.energy-stream:nth-child(1) { left: 10%; animation-delay: 0s; }
.energy-stream:nth-child(2) { left: 20%; animation-delay: 1s; }
.energy-stream:nth-child(3) { left: 35%; animation-delay: 2s; }
.energy-stream:nth-child(4) { left: 50%; animation-delay: 3s; }
.energy-stream:nth-child(5) { left: 65%; animation-delay: 1.5s; }
.energy-stream:nth-child(6) { left: 80%; animation-delay: 2.5s; }
.energy-stream:nth-child(7) { left: 90%; animation-delay: 0.5s; }
.energy-stream:nth-child(8) { left: 95%; animation-delay: 4s; }

.neural-network-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.neural-node {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ff6b35;
  border-radius: 50%;
  animation: neuralPulse 3s infinite ease-in-out;
}

.neural-node:nth-child(1) { top: 10%; left: 15%; animation-delay: 0s; }
.neural-node:nth-child(2) { top: 20%; left: 35%; animation-delay: 0.5s; }
.neural-node:nth-child(3) { top: 15%; left: 55%; animation-delay: 1s; }
.neural-node:nth-child(4) { top: 30%; left: 75%; animation-delay: 1.5s; }
.neural-node:nth-child(5) { top: 45%; left: 20%; animation-delay: 2s; }
.neural-node:nth-child(6) { top: 40%; left: 50%; animation-delay: 2.5s; }
.neural-node:nth-child(7) { top: 55%; left: 80%; animation-delay: 0.8s; }
.neural-node:nth-child(8) { top: 70%; left: 10%; animation-delay: 1.3s; }
.neural-node:nth-child(9) { top: 65%; left: 40%; animation-delay: 1.8s; }
.neural-node:nth-child(10) { top: 80%; left: 65%; animation-delay: 2.3s; }
.neural-node:nth-child(11) { top: 85%; left: 25%; animation-delay: 0.3s; }
.neural-node:nth-child(12) { top: 90%; left: 85%; animation-delay: 2.8s; }

.neural-connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff6b35, transparent);
  animation: connectionPulse 4s infinite ease-in-out;
}

.neural-connection:nth-child(1) { top: 12%; left: 15%; width: 18%; animation-delay: 0s; }
.neural-connection:nth-child(2) { top: 22%; left: 35%; width: 15%; animation-delay: 0.5s; }
.neural-connection:nth-child(3) { top: 17%; left: 55%; width: 20%; animation-delay: 1s; }
.neural-connection:nth-child(4) { top: 32%; left: 20%; width: 25%; animation-delay: 1.5s; }
.neural-connection:nth-child(5) { top: 47%; left: 50%; width: 22%; animation-delay: 2s; }
.neural-connection:nth-child(6) { top: 42%; left: 25%; width: 20%; animation-delay: 2.5s; }
.neural-connection:nth-child(7) { top: 57%; left: 10%; width: 25%; animation-delay: 0.8s; }
.neural-connection:nth-child(8) { top: 72%; left: 40%; width: 18%; animation-delay: 1.3s; }
.neural-connection:nth-child(9) { top: 67%; left: 65%; width: 15%; animation-delay: 1.8s; }
.neural-connection:nth-child(10) { top: 82%; left: 10%; width: 12%; animation-delay: 2.3s; }
.neural-connection:nth-child(11) { top: 87%; left: 25%; width: 35%; animation-delay: 0.3s; }
.neural-connection:nth-child(12) { top: 92%; left: 45%; width: 30%; animation-delay: 2.8s; }
.neural-connection:nth-child(13) { top: 25%; left: 60%; width: 15%; animation-delay: 0.7s; }
.neural-connection:nth-child(14) { top: 35%; left: 30%; width: 18%; animation-delay: 1.2s; }
.neural-connection:nth-child(15) { top: 50%; left: 75%; width: 20%; animation-delay: 1.7s; }
.neural-connection:nth-child(16) { top: 60%; left: 15%; width: 22%; animation-delay: 2.2s; }
.neural-connection:nth-child(17) { top: 75%; left: 50%; width: 12%; animation-delay: 0.4s; }
.neural-connection:nth-child(18) { top: 78%; left: 30%; width: 28%; animation-delay: 1.4s; }
.neural-connection:nth-child(19) { top: 88%; left: 60%; width: 25%; animation-delay: 1.9s; }
.neural-connection:nth-child(20) { top: 95%; left: 15%; width: 65%; animation-delay: 2.4s; }

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

/* Quantum Loading */
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
}

.quantum-loader {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
}

.quantum-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top: 2px solid #ff6b35;
  border-radius: 50%;
  animation: quantumSpin 2s linear infinite;
}

.quantum-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-top-color: #f59e0b;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.quantum-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-top-color: #d97706;
  animation-duration: 1s;
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
  animation: textPulse 2s infinite ease-in-out;
}

.error-container {
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
}

.error-container p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

/* Quantum Animations */
@keyframes cosmicFloat {
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes energyFlow {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.5;
  }
}

@keyframes neuralPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes connectionPulse {
  0%, 100% {
    opacity: 0.1;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 0.6;
    transform: scaleX(1);
  }
}

@keyframes quantumSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes textPulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
}

.debug-panel {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 4px;
  max-width: 500px;
  max-height: 300px;
  overflow: auto;
  z-index: 1000;
  font-family: monospace;
  font-size: 12px;
}

/* .primary-button {
  background-color: #1c1c4c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 16px;
  transition: background-color 0.3s ease;
  height: 48px;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
} */

.primary-button:hover {
  background-color: #2a2a6c;
}

/* Override NavBar styles for creator-ai pages */
.creator-ai-page .navbar {
  background-color: #ffffff !important;
  color: #333333 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.creator-ai-page .navbar a {
  color: #333333 !important;
}

.creator-ai-page .navbar a:hover {
  color: #0077b6 !important;
}

/* Dashboard button styles */
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
  color: #1c1c4c;
  border: 1px solid #ddd;
  height: 48px;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.creator-ai-page .secondary-button:hover {
  background-color: #e5e5e5;
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

/* Enhanced Atomic Universe Theme */
.quantum-universe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  pointer-events: none;
  overflow: hidden;
}

/* Atomic Particles Field */
.atomic-field {
  position: absolute;
  width: 100%;
  height: 100%;
}

.atomic-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #ff6b35 0%, #f59e0b 50%, transparent 100%);
  border-radius: 50%;
  animation: atomicOrbit 20s infinite linear;
  box-shadow: 
    0 0 15px rgba(255, 107, 53, 0.8),
    0 0 30px rgba(245, 158, 11, 0.4);
}

.atomic-particle:nth-child(odd) {
  background: radial-gradient(circle, #3b82f6 0%, #1e40af 50%, transparent 100%);
  box-shadow: 
    0 0 15px rgba(59, 130, 246, 0.8),
    0 0 30px rgba(30, 64, 175, 0.4);
  animation-duration: 25s;
  animation-direction: reverse;
}

.atomic-particle:nth-child(3n) {
  background: radial-gradient(circle, #10b981 0%, #047857 50%, transparent 100%);
  box-shadow: 
    0 0 15px rgba(16, 185, 129, 0.8),
    0 0 30px rgba(4, 120, 87, 0.4);
  animation-duration: 30s;
}

/* Universe Energy Streams */
.universe-energy {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-stream {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom, 
    transparent 0%,
    rgba(255, 107, 53, 0.3) 20%,
    rgba(245, 158, 11, 0.6) 50%,
    rgba(217, 119, 6, 0.4) 80%,
    transparent 100%
  );
  animation: universeFlow 12s infinite ease-in-out;
  opacity: 0.4;
  filter: blur(0.5px);
}

.energy-stream:nth-child(odd) {
  background: linear-gradient(
    to bottom, 
    transparent 0%,
    rgba(59, 130, 246, 0.3) 20%,
    rgba(30, 64, 175, 0.6) 50%,
    rgba(37, 99, 235, 0.4) 80%,
    transparent 100%
  );
  animation-duration: 15s;
}

/* Cosmic Grid */
.cosmic-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}

.grid-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ff6b35;
  border-radius: 50%;
  animation: gridPulse 4s infinite ease-in-out;
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
}

.grid-node:nth-child(even) {
  background: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  animation-duration: 5s;
}

.grid-connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.4), transparent);
  animation: gridConnection 6s infinite ease-in-out;
}

.grid-connection:nth-child(even) {
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
  animation-duration: 7s;
}

/* Stellar Field */
.stellar-field {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  width: 1px;
  height: 1px;
  background: white;
  border-radius: 50%;
  animation: starTwinkle 8s infinite ease-in-out;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

.star:nth-child(3n) {
  animation-duration: 12s;
  background: #ff6b35;
  box-shadow: 0 0 5px rgba(255, 107, 53, 0.8);
}

.star:nth-child(5n) {
  animation-duration: 15s;
  background: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.8);
}

/* Dark Matter Effects */
.dark-matter {
  position: absolute;
  width: 100%;
  height: 100%;
}

.matter-wave {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent);
  animation: matterWave 20s infinite ease-in-out;
  opacity: 0.3;
}

/* Quantum Vortex */
.quantum-vortex {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  margin: -200px 0 0 -200px;
  border-radius: 50%;
  opacity: 0.1;
}

.vortex-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 50%;
  animation: vortexSpin 15s infinite linear;
}

.vortex-ring:nth-child(1) {
  width: 50px; height: 50px; margin: -25px 0 0 -25px;
  animation-duration: 10s;
}

.vortex-ring:nth-child(2) {
  width: 100px; height: 100px; margin: -50px 0 0 -50px;
  animation-duration: 12s; animation-direction: reverse;
}

.vortex-ring:nth-child(3) {
  width: 150px; height: 150px; margin: -75px 0 0 -75px;
  animation-duration: 14s;
}

.vortex-ring:nth-child(4) {
  width: 200px; height: 200px; margin: -100px 0 0 -100px;
  animation-duration: 16s; animation-direction: reverse;
}

.vortex-ring:nth-child(5) {
  width: 250px; height: 250px; margin: -125px 0 0 -125px;
  animation-duration: 18s;
}

.vortex-ring:nth-child(6) {
  width: 300px; height: 300px; margin: -150px 0 0 -150px;
  animation-duration: 20s; animation-direction: reverse;
}

.vortex-ring:nth-child(7) {
  width: 350px; height: 350px; margin: -175px 0 0 -175px;
  animation-duration: 22s;
}

.vortex-ring:nth-child(8) {
  width: 400px; height: 400px; margin: -200px 0 0 -200px;
  animation-duration: 25s; animation-direction: reverse;
}

/* Enhanced versions of existing elements */
.quantum-cosmos.enhanced {
  z-index: -1;
}

.cosmic-particle.enhanced {
  width: 3px;
  height: 3px;
  box-shadow: 
    0 0 15px rgba(255, 107, 53, 0.7),
    0 0 30px rgba(245, 158, 11, 0.3);
  animation-duration: 20s;
}

.energy-stream.enhanced {
  width: 2px;
  opacity: 0.5;
  filter: blur(0.5px);
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.4);
}

.neural-node.enhanced {
  width: 6px;
  height: 6px;
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
  animation-duration: 4s;
}

.neural-connection.enhanced {
  opacity: 0.3;
  box-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
}

/* Enhanced Atomic Universe Animations */
@keyframes atomicOrbit {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(200px, -300px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes universeFlow {
  0%, 100% {
    transform: translateY(0) scaleY(1);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-50px) scaleY(1.2);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-100px) scaleY(0.8);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-150px) scaleY(1.1);
    opacity: 0.4;
  }
}

@keyframes gridPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.8);
    opacity: 1;
  }
}

@keyframes gridConnection {
  0%, 100% {
    opacity: 0.1;
    transform: scaleX(0.3);
  }
  50% {
    opacity: 0.6;
    transform: scaleX(1.2);
  }
}

@keyframes starTwinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  25% {
    opacity: 1;
    transform: scale(1.5);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  75% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes matterWave {
  0% {
    transform: translateX(-100%) scaleY(1);
    opacity: 0;
  }
  50% {
    transform: translateX(50%) scaleY(1.5);
    opacity: 0.3;
  }
  100% {
    transform: translateX(200%) scaleY(1);
    opacity: 0;
  }
}

@keyframes vortexSpin {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
    opacity: 0.1;
  }
}

/* Generate random positions for atomic particles */
.atomic-particle:nth-child(1) { left: 5%; top: 10%; animation-delay: 0s; }
.atomic-particle:nth-child(2) { left: 15%; top: 20%; animation-delay: 2s; }
.atomic-particle:nth-child(3) { left: 25%; top: 15%; animation-delay: 4s; }
.atomic-particle:nth-child(4) { left: 35%; top: 30%; animation-delay: 1s; }
.atomic-particle:nth-child(5) { left: 45%; top: 25%; animation-delay: 3s; }
.atomic-particle:nth-child(6) { left: 55%; top: 35%; animation-delay: 5s; }
.atomic-particle:nth-child(7) { left: 65%; top: 20%; animation-delay: 1.5s; }
.atomic-particle:nth-child(8) { left: 75%; top: 40%; animation-delay: 3.5s; }
.atomic-particle:nth-child(9) { left: 85%; top: 30%; animation-delay: 0.5s; }
.atomic-particle:nth-child(10) { left: 95%; top: 45%; animation-delay: 2.5s; }
.atomic-particle:nth-child(11) { left: 10%; top: 50%; animation-delay: 4.5s; }
.atomic-particle:nth-child(12) { left: 20%; top: 60%; animation-delay: 1.2s; }
.atomic-particle:nth-child(13) { left: 30%; top: 55%; animation-delay: 3.2s; }
.atomic-particle:nth-child(14) { left: 40%; top: 65%; animation-delay: 5.2s; }
.atomic-particle:nth-child(15) { left: 50%; top: 70%; animation-delay: 0.8s; }
.atomic-particle:nth-child(16) { left: 60%; top: 60%; animation-delay: 2.8s; }
.atomic-particle:nth-child(17) { left: 70%; top: 75%; animation-delay: 4.8s; }
.atomic-particle:nth-child(18) { left: 80%; top: 65%; animation-delay: 1.8s; }
.atomic-particle:nth-child(19) { left: 90%; top: 80%; animation-delay: 3.8s; }
.atomic-particle:nth-child(20) { left: 8%; top: 85%; animation-delay: 5.8s; }
.atomic-particle:nth-child(21) { left: 18%; top: 90%; animation-delay: 0.3s; }
.atomic-particle:nth-child(22) { left: 28%; top: 95%; animation-delay: 2.3s; }
.atomic-particle:nth-child(23) { left: 38%; top: 88%; animation-delay: 4.3s; }
.atomic-particle:nth-child(24) { left: 48%; top: 93%; animation-delay: 1.3s; }
.atomic-particle:nth-child(25) { left: 58%; top: 98%; animation-delay: 3.3s; }
.atomic-particle:nth-child(26) { left: 68%; top: 92%; animation-delay: 5.3s; }
.atomic-particle:nth-child(27) { left: 78%; top: 87%; animation-delay: 0.6s; }
.atomic-particle:nth-child(28) { left: 88%; top: 95%; animation-delay: 2.6s; }
.atomic-particle:nth-child(29) { left: 3%; top: 75%; animation-delay: 4.6s; }
.atomic-particle:nth-child(30) { left: 13%; top: 65%; animation-delay: 1.6s; }
.atomic-particle:nth-child(31) { left: 23%; top: 80%; animation-delay: 3.6s; }
.atomic-particle:nth-child(32) { left: 33%; top: 70%; animation-delay: 5.6s; }
.atomic-particle:nth-child(33) { left: 43%; top: 85%; animation-delay: 0.9s; }
.atomic-particle:nth-child(34) { left: 53%; top: 78%; animation-delay: 2.9s; }
.atomic-particle:nth-child(35) { left: 63%; top: 82%; animation-delay: 4.9s; }
.atomic-particle:nth-child(36) { left: 73%; top: 88%; animation-delay: 1.9s; }
.atomic-particle:nth-child(37) { left: 83%; top: 72%; animation-delay: 3.9s; }
.atomic-particle:nth-child(38) { left: 93%; top: 68%; animation-delay: 5.9s; }
.atomic-particle:nth-child(39) { left: 12%; top: 38%; animation-delay: 0.7s; }
.atomic-particle:nth-child(40) { left: 87%; top: 12%; animation-delay: 2.7s; }

/* Universe energy stream positions */
.universe-energy .energy-stream:nth-child(1) { left: 8%; animation-delay: 0s; }
.universe-energy .energy-stream:nth-child(2) { left: 16%; animation-delay: 1s; }
.universe-energy .energy-stream:nth-child(3) { left: 24%; animation-delay: 2s; }
.universe-energy .energy-stream:nth-child(4) { left: 32%; animation-delay: 3s; }
.universe-energy .energy-stream:nth-child(5) { left: 40%; animation-delay: 4s; }
.universe-energy .energy-stream:nth-child(6) { left: 48%; animation-delay: 5s; }
.universe-energy .energy-stream:nth-child(7) { left: 56%; animation-delay: 1.5s; }
.universe-energy .energy-stream:nth-child(8) { left: 64%; animation-delay: 2.5s; }
.universe-energy .energy-stream:nth-child(9) { left: 72%; animation-delay: 3.5s; }
.universe-energy .energy-stream:nth-child(10) { left: 80%; animation-delay: 4.5s; }
.universe-energy .energy-stream:nth-child(11) { left: 88%; animation-delay: 0.5s; }
.universe-energy .energy-stream:nth-child(12) { left: 96%; animation-delay: 5.5s; }

/* Grid nodes positions */
.grid-node:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
.grid-node:nth-child(2) { top: 25%; left: 30%; animation-delay: 0.5s; }
.grid-node:nth-child(3) { top: 35%; left: 50%; animation-delay: 1s; }
.grid-node:nth-child(4) { top: 45%; left: 70%; animation-delay: 1.5s; }
.grid-node:nth-child(5) { top: 55%; left: 90%; animation-delay: 2s; }
.grid-node:nth-child(6) { top: 65%; left: 20%; animation-delay: 2.5s; }
.grid-node:nth-child(7) { top: 75%; left: 40%; animation-delay: 3s; }
.grid-node:nth-child(8) { top: 85%; left: 60%; animation-delay: 3.5s; }
.grid-node:nth-child(9) { top: 20%; left: 80%; animation-delay: 4s; }
.grid-node:nth-child(10) { top: 30%; left: 15%; animation-delay: 4.5s; }
.grid-node:nth-child(11) { top: 40%; left: 35%; animation-delay: 5s; }
.grid-node:nth-child(12) { top: 50%; left: 55%; animation-delay: 0.2s; }
.grid-node:nth-child(13) { top: 60%; left: 75%; animation-delay: 0.7s; }
.grid-node:nth-child(14) { top: 70%; left: 95%; animation-delay: 1.2s; }
.grid-node:nth-child(15) { top: 80%; left: 25%; animation-delay: 1.7s; }
.grid-node:nth-child(16) { top: 90%; left: 45%; animation-delay: 2.2s; }
.grid-node:nth-child(17) { top: 10%; left: 65%; animation-delay: 2.7s; }
.grid-node:nth-child(18) { top: 12%; left: 85%; animation-delay: 3.2s; }
.grid-node:nth-child(19) { top: 22%; left: 5%; animation-delay: 3.7s; }
.grid-node:nth-child(20) { top: 32%; left: 95%; animation-delay: 4.2s; }

/* Stars positioning (sample - automatically distributed) */
.star:nth-child(n) {
  left: calc(var(--i, 0) * 1% + 0%);
  top: calc(var(--j, 0) * 1% + 0%);
  animation-delay: calc(var(--k, 0) * 0.1s);
}

/* Dark matter waves positioning */
.matter-wave:nth-child(1) { top: 15%; animation-delay: 0s; }
.matter-wave:nth-child(2) { top: 35%; animation-delay: 5s; }
.matter-wave:nth-child(3) { top: 55%; animation-delay: 10s; }
.matter-wave:nth-child(4) { top: 75%; animation-delay: 15s; }
.matter-wave:nth-child(5) { top: 45%; animation-delay: 7.5s; }
.matter-wave:nth-child(6) { top: 85%; animation-delay: 12.5s; }
</style>
