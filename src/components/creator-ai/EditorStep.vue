<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.editor.title") }}</h2>
    <div class="editor-container">
      <div class="main-content">
        <textarea
          v-model="content"
          placeholder="Your AI-generated content will appear here..."
          style="height: 600px; resize: none"
          @input="handleInput"
        />

        <div class="editor-actions" />
      </div>
      <div class="sidebar">
        <div class="sidebar-section">
          <h3>SEO Score</h3>
          <div
            class="seo-score-box"
            :class="{ loading: isAnalyzing || isFetchingSeo }"
          >
            <div
              v-if="isAnalyzing || isFetchingSeo"
              class="loading-indicator"
            >
              <div class="spinner" />
              <p>{{ $t("creatorAI.editor.seoAnalyzing") }}</p>
            </div>
            <div
              v-else-if="seoData"
              class="score-display"
              :class="getSEOScoreClass()"
            >
              <div class="score-number">
                {{ lastSeoScore || seoData.seoScore || seoData.score || 0
                }}<span class="score-percent">%</span>
              </div>
              <div class="score-bar">
                <div
                  class="score-bar-fill"
                  :style="{
                    width:
                      (lastSeoScore || seoData.seoScore || seoData.score || 0) +
                      '%',
                  }"
                  :class="getSEOScoreClass()"
                />
              </div>
            </div>
            <div
              v-else
              class="no-data-message"
            >
              <p>{{ $t("creatorAI.editor.seoAnalyzing") }}</p>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3>{{ $t("creatorAI.editor.keywordsTitle") }}</h3>
          <ul>
            <li
              v-for="(keyword, index) in keywordsList"
              :key="index"
            >
              {{ keyword }}
            </li>
          </ul>
          <div
            v-if="
              seoData &&
                seoData.suggestedKeywords &&
                seoData.suggestedKeywords.length > 0
            "
          >
            <h4>{{ $t("creatorAI.editor.keywordsTitle") }}</h4>
            <ul class="suggested-keywords">
              <li
                v-for="(keyword, index) in seoData.suggestedKeywords"
                :key="`sug-${index}`"
              >
                {{ keyword }}
              </li>
            </ul>
          </div>
        </div>

        <div class="sidebar-section">
          <h3>{{ $t("creatorAI.editor.contentLength") }}</h3>
          <div class="length">
            {{ wordCount }} {{ $t("creatorAI.editor.words") }}
          </div>
        </div>

        <div
          v-if="seoData && seoData.detailedAnalysis"
          class="sidebar-section seo-analysis"
        >
          <h3>SEO Analysis</h3>
          <div
            v-for="(category, key) in seoData.detailedAnalysis"
            :key="key"
            class="analysis-category"
          >
            <h4>{{ formatCategoryName(key) }} ({{ category.score }}/100)</h4>
            <div
              v-if="category.improvements"
              class="improvement-list"
            >
              <p class="improvement-title">
                Improvement Suggestions:
              </p>
              <ul>
                <li
                  v-for="(improvement, i) in category.improvements.slice(0, 3)"
                  :key="i"
                >
                  {{ improvement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button
        class="secondary-button"
        @click="goBack"
      >
        {{ $t("creatorAI.editor.previous") }}
      </button>
      <button
        class="primary-button-save"
        @click="saveContent"
      >
        {{ $t("creatorAI.editor.save") }}
      </button>
      <button
        class="primary-button"
        @click="$emit('next')"
      >
        {{ $t("creatorAI.editor.next") }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditorStep",
  props: {
    initialContent: {
      type: String,
      required: true,
    },
    suggestedKeywords: {
      type: Array,
      default: () => [],
    },
    readabilityScore: {
      type: Number,
      default: 0,
    },
    contentLength: {
      type: Number,
      default: 0,
    },
    contentId: {
      type: String,
      default: "",
    },
    isAnalyzingSeo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: this.initialContent,
      seoData: null,
      isAnalyzing: false,
      isOptimizing: false,
      isFetchingSeo: false,
      optimizationCount: 0,
      maxOptimizations: 3,
      lastSavedContent: this.initialContent,
      lastNotificationTime: 0,
      lastNotificationMessage: "",
      showNotification: function (type, title, message) {
        // Prevent duplicate notifications within 2 seconds
        const now = Date.now();
        if (
          now - this.lastNotificationTime < 2000 &&
          this.lastNotificationMessage === message
        ) {
          console.log("Preventing duplicate notification:", message);
          return;
        }

        // Update last notification info
        this.lastNotificationTime = now;
        this.lastNotificationMessage = message;

        if (this.$notify) {
          this.$notify({
            group: "seo",
            type: type,
            title: title,
            text: message,
          });
        } else {
          console.log(`${type} notification: ${title} - ${message}`);
          if (type === "error") {
            alert(`${title}: ${message}`);
          }
        }
      },
      updateContentTimer: null,
      lastSeoScore: 0,
      hasBeenOptimized: false,
      lastAnalysisTime: null,
      optimizationStage: "",
    };
  },
  computed: {
    keywordsList() {
      return this.suggestedKeywords || [];
    },
    wordCount() {
      if (!this.content) return 0;
      return this.content.trim().split(/\s+/).length;
    },
  },
  watch: {
    initialContent(newValue) {
      this.content = newValue || "";
      if (newValue && newValue !== this.lastSavedContent) {
        this.lastSavedContent = newValue;
      }
    },
    content(newValue) {
      // When content changes, don't analyze immediately
      // Only set timer to analyze after a certain time when user stops typing
      if (this.updateContentTimer) {
        clearTimeout(this.updateContentTimer);
      }

      if (newValue === this.lastSavedContent) {
        return;
      }

      this.updateContentTimer = setTimeout(() => {
        this.hasBeenOptimized = false;
      }, 5000);
    },
    contentId: {
      immediate: true,
      async handler(newValue) {
        if (newValue) {
          // Reset optimization count when a new content is loaded
          this.optimizationCount = 0;
          this.hasBeenOptimized = false;
          this.lastAnalysisTime = null;

          // If contentId exists, check if SEO data is available
          const seoData = await this.fetchSEOData();
          if (seoData) {
            this.seoData = seoData;
            this.lastSeoScore = seoData.seoScore || seoData.score || 0;

            // If SEO score is below 80, automatically optimize
            if (
              (seoData.seoScore || seoData.score) < 80 &&
              !this.hasBeenOptimized
            ) {
              await this.autoOptimizeSEO();
              this.hasBeenOptimized = true;
            }
          } else {
            // If no SEO data, automatically analyze and optimize
            await this.autoAnalyzeAndOptimize();
            this.hasBeenOptimized = true;
          }
        }
      },
    },
  },
  mounted() {
    console.log("EditorStep mounted, contentId:", this.contentId);
    console.log(
      "EditorStep initialContent:",
      this.initialContent
        ? this.initialContent.substring(0, 50) + "..."
        : "No content"
    );

    // Ensure content is initialized from props
    this.content = this.initialContent || "";

    // Initialize lastSavedContent initially - set to initialContent to avoid unnecessary auto-save
    this.lastSavedContent = this.initialContent || "";
    console.log("lastSavedContent initialized with initial content");

    // Avoid unnecessary emit event if there's no content
    if (this.content) {
      console.log(
        "Initializing content with:",
        this.content.substring(0, 50) + "..."
      );
      // Avoid unnecessary emit event if there's no content
      // this.$emit("update:content", this.content);
    }

    // Add variable to save final SEO score
    this.lastSeoScore = 0;

    // Add event listener for navigation buttons
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        // If not save button and content has changed, save before navigation
        if (
          !e.target.classList.contains("primary-button-save") &&
          this.contentId &&
          this.content &&
          this.content !== this.lastSavedContent
        ) {
          console.log("Auto-saving content before navigation");
          // Call API to save content silently - no notification
          this.autoSaveContent();
        }
      });
    });

    // If contentId exists but no SEO data, analyze and optimize immediately
    if (this.contentId && !this.seoData) {
      this.$nextTick(async () => {
        // Get SEO data if available
        const seoData = await this.fetchSEOData();
        if (seoData) {
          this.seoData = seoData;
          this.lastSeoScore = seoData.seoScore || seoData.score || 0;

          // Only optimize if score is below 80 and no previous analysis
          if (
            (seoData.seoScore || seoData.score) < 80 &&
            !this.hasBeenOptimized
          ) {
            await this.autoOptimizeSEO();
            this.hasBeenOptimized = true;
          }
        } else {
          await this.autoAnalyzeAndOptimize();
          this.hasBeenOptimized = true;
        }
      });
    }

    // If in SEO analysis state, update UI
    if (this.isAnalyzingSeo) {
      this.isFetchingSeo = true;

      // Set interval to check SEO data every 3 seconds
      const checkSeoInterval = setInterval(async () => {
        if (this.contentId) {
          try {
            const seoData = await this.fetchSEOData();
            if (seoData) {
              clearInterval(checkSeoInterval);
              this.isFetchingSeo = false;
              this.lastSeoScore = seoData.seoScore || seoData.score || 0;
            }
          } catch (error) {
            console.error("Error checking SEO data:", error);
          }
        }
      }, 3000);

      // Clear interval after 30 seconds to avoid wasting resources
      setTimeout(() => {
        clearInterval(checkSeoInterval);
        this.isFetchingSeo = false;
      }, 30000);
    }
  },
  beforeUnmount() {
    // When component is destroyed, save content before navigating
    console.log("EditorStep beforeUnmount, will attempt to save content");
    if (
      this.contentId &&
      this.content &&
      this.content !== this.lastSavedContent
    ) {
      console.log("Content changed but not saved, auto-saving before unmount");
      // Use autoSaveContent instead of saveContent to avoid showing notification
      this.autoSaveContent();
    }
  },
  methods: {
    handleInput(event) {
      // Use event.target.value to get the latest value from textarea
      const newContent = event.target.value;
      console.log(
        "[SEO_CLIENT] Input changed, first 50 chars:",
        newContent.substring(0, 50)
      );

      // Update content variable
      this.content = newContent;

      // Notify parent component
      this.updateContent();
    },

    updateContent() {
      if (this.content !== null && this.content !== undefined) {
        console.log(
          "[SEO_CLIENT] Updating content in parent component, first 50 chars:",
          this.content.substring(0, 50)
        );
        // Use .sync or v-model from parent component
        this.$emit("update:content", this.content);

        // Skip autoAnalyzeAndOptimize if there's ongoing input
        clearTimeout(this.updateContentTimer);
        this.updateContentTimer = null;
      }
    },
    goBack() {
      if (this.contentId) {
        this.$emit("go-to-dashboard");
      } else {
        this.$emit("prev");
      }
    },
    async saveContent() {
      console.log("saveContent called, contentId:", this.contentId);
      console.log(
        "Content to save (first 50 chars):",
        this.content ? this.content.substring(0, 50) : "none"
      );
      console.log(
        "Last saved content (first 50 chars):",
        this.lastSavedContent ? this.lastSavedContent.substring(0, 50) : "none"
      );

      if (!this.contentId) {
        console.error("Cannot save content: No contentId provided");
        this.showNotification(
          "error",
          "Save Content",
          "Cannot save content: No content ID provided. Please try creating a new content or refreshing the page."
        );
        return;
      }

      try {
        // Ensure getting the latest content from textarea
        const currentContent = this.content;

        // But still check if there's no change to notify user
        if (currentContent === this.lastSavedContent) {
          console.log("[SEO_CLIENT] Content unchanged, no need to save");
          this.showNotification(
            "info",
            "Save Content",
            "Content is unchanged, no need to save"
          );
          return;
        }

        // Check again to ensure
        if (!this.contentId || this.contentId.trim() === "") {
          this.showNotification(
            "error",
            "Save Content",
            "Invalid content ID. Cannot save changes."
          );
          return;
        }

        console.log(
          "[SEO_CLIENT] Saving content with contentId:",
          this.contentId
        );

        // Call API to save content
        const response = await axios.put(
          `/api/content/contents/${this.contentId}`,
          {
            generatedContent: currentContent,
          }
        );

        if (response.data.success) {
          console.log("[SEO_CLIENT] Content saved successfully");
          this.lastSavedContent = currentContent;

          // Display success notification - only show once
          this.showNotification(
            "success",
            "Save Content",
            "Content saved successfully"
          );

          // Automatically analyze and optimize SEO after saving
          this.optimizationCount = 0; // Reset count when new content is saved
          await this.autoAnalyzeAndOptimize();
        } else {
          console.error(
            "[SEO_CLIENT] Error saving content:",
            response.data.error
          );
          this.showNotification(
            "error",
            "Save Content",
            "Error saving content: " + response.data.error
          );
        }
      } catch (error) {
        console.error("[SEO_CLIENT] Error saving content:", error);
        this.showNotification(
          "error",
          "Save Content",
          "Error saving content: " + error.message
        );
      }
    },

    async autoAnalyzeAndOptimize() {
      console.log(
        "[SEO_CLIENT] Starting automatic SEO analysis and optimization"
      );

      // Kiểm tra nếu gần đây đã phân tích
      const now = new Date().getTime();
      if (this.lastAnalysisTime && now - this.lastAnalysisTime < 5000) {
        console.log(
          "[SEO_CLIENT] Recent analysis, skipping to avoid repetition"
        );
        return;
      }

      // If optimization limit reached, skip
      if (this.optimizationCount >= this.maxOptimizations) {
        console.log(
          `[SEO_CLIENT] Optimization limit reached (${this.maxOptimizations}), skipping`
        );
        return;
      }

      // Don't continue if analyzing or optimizing
      if (this.isAnalyzing || this.isOptimizing) {
        console.log("[SEO_CLIENT] Analyzing or optimizing, skipping");
        return;
      }

      // Save current analysis time
      this.lastAnalysisTime = now;

      await this.analyzeSEO();

      // Add small delay before optimizing to avoid continuous API calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If SEO score below 80, automatically optimize
      if (
        this.seoData &&
        (this.seoData.seoScore || this.seoData.score) < 80 &&
        this.optimizationCount < this.maxOptimizations &&
        !this.hasBeenOptimized
      ) {
        console.log(
          "[SEO_CLIENT] SEO score below 80, automatically optimizing"
        );
        await this.autoOptimizeSEO();
        this.hasBeenOptimized = true;
      } else {
        console.log(
          "[SEO_CLIENT] SEO score meets requirements or optimization limit reached, no need to optimize"
        );
      }
    },

    async analyzeSEO() {
      if (!this.contentId) {
        return;
      }

      try {
        this.isAnalyzing = true;
        console.log("[SEO_CLIENT] Starting SEO analysis with Gemini API");
        this.seoAnalysisStage = "Analyzing SEO with Gemini API...";

        const response = await axios.post(`/api/seo/analyze/${this.contentId}`);

        if (response.data.success) {
          this.seoData = response.data.data.analysis;
          console.log("[SEO_CLIENT] SEO analysis complete:", this.seoData);
          this.seoAnalysisStage = "SEO analysis complete";
        } else {
          console.error(
            "[SEO_CLIENT] SEO analysis error:",
            response.data.error
          );
          this.seoAnalysisStage = "SEO analysis failed";
        }
      } catch (error) {
        console.error("[SEO_CLIENT] SEO analysis error:", error);
        this.seoAnalysisStage = "SEO analysis failed";
      } finally {
        this.isAnalyzing = false;
      }
    },

    async optimizeSEO() {
      if (!this.contentId) {
        return;
      }

      try {
        this.isOptimizing = true;
        this.optimizationStage =
          "Optimizing content with DeepSeek and Gemini...";
        console.log("[SEO_CLIENT] Starting manual SEO optimization");

        this.showNotification(
          "info",
          "SEO Optimization",
          "Optimizing your content..."
        );

        // Lưu điểm SEO trước khi tối ưu
        const previousScore =
          this.lastSeoScore ||
          (this.seoData ? this.seoData.seoScore || this.seoData.score || 0 : 0);
        console.log(
          `[SEO_CLIENT] SEO score before manual optimization: ${previousScore}`
        );

        // Call SEO optimization API
        const response = await axios.post(
          `/api/seo/optimize/${this.contentId}`
        );

        if (response.data.success) {
          const result = response.data.data;
          console.log("[SEO_CLIENT] SEO optimization result:", result);

          if (result.optimized) {
            // Get SEO data before updating content
            this.seoData = await this.fetchSEOData();

            // Save new SEO score
            this.lastSeoScore = result.newScore;

            // Update content after having SEO data
            console.log(
              "[SEO_CLIENT] Update content and score after optimization"
            );
            this.content = result.content.generatedContent;
            this.lastSavedContent = this.content; // Update saved content

            // Call updateContent() after updating SEO data
            this.updateContent();
            this.optimizationStage = "SEO optimization complete";

            this.hasBeenOptimized = true;
            this.optimizationCount++;
            this.showNotification(
              "success",
              "SEO Optimization",
              `Content optimized! SEO Score: ${result.previousScore} → ${result.newScore}`
            );
          } else {
            // Show notification if unable to optimize further
            this.optimizationStage = "Unable to optimize further";
            this.showNotification("info", "SEO Optimization", result.message);
          }
        } else {
          console.error(
            "[SEO_CLIENT] SEO optimization error:",
            response.data.error
          );
          this.optimizationStage = "SEO optimization failed";
        }
      } catch (error) {
        console.error("[SEO_CLIENT] SEO optimization error:", error);
        this.optimizationStage = "SEO optimization failed";
      } finally {
        this.isOptimizing = false;
      }
    },

    async fetchSEOData() {
      try {
        const response = await axios.get(`/api/seo/report/${this.contentId}`);

        if (response.data.success) {
          return {
            seoScore: response.data.data.seoScore,
            keywordDensity: response.data.data.keywordDensity,
            readabilityScore: response.data.data.readabilityScore,
            suggestedKeywords: response.data.data.suggestedKeywords,
            detailedAnalysis: response.data.data.detailedAnalysis,
          };
        }
        return null;
      } catch (error) {
        console.error("Error fetching SEO data:", error);
        return null;
      }
    },

    getSEOScoreClass() {
      if (!this.seoData && !this.lastSeoScore) return "poor";

      const score =
        this.lastSeoScore ||
        (this.seoData ? this.seoData.seoScore || this.seoData.score || 0 : 0);
      if (score >= 80) return "excellent";
      if (score >= 60) return "good";
      if (score >= 40) return "average";
      return "poor";
    },

    formatCategoryName(key) {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },

    async autoOptimizeSEO() {
      if (!this.contentId) {
        return;
      }

      try {
        this.isOptimizing = true;
        console.log("[SEO_CLIENT] Starting automatic SEO optimization");

        // Save SEO score before optimization
        const previousScore =
          this.lastSeoScore ||
          (this.seoData ? this.seoData.seoScore || this.seoData.score || 0 : 0);
        console.log(
          `[SEO_CLIENT] SEO score before automatic optimization: ${previousScore}`
        );

        // Call automatic SEO optimization API
        const response = await axios.post(
          `/api/seo/auto-optimize/${this.contentId}`,
          {
            maxOptimizations: 3,
            targetScore: 80,
          }
        );

        if (response.data.success) {
          const result = response.data.data;

          // Save SEO data before updating content
          this.seoData = {
            seoScore: result.finalScore,
            keywordDensity: result.finalReport.keywordDensity,
            readabilityScore: result.finalReport.readabilityScore,
            suggestedKeywords: result.finalReport.suggestedKeywords,
            detailedAnalysis: result.finalReport.detailedAnalysis,
          };

          this.lastSeoScore = result.finalScore;
          this.hasBeenOptimized = true;

          this.content = result.finalReport.content;
          this.lastSavedContent = this.content;

          // Call updateContent() after updating SEO data
          this.updateContent();
          this.showNotification(
            "success",
            "SEO Optimization",
            `Automatic optimization completed! SEO Score: ${result.initialScore} → ${result.finalScore}`
          );

          this.optimizationCount++;
        } else {
          console.error("Failed to auto optimize SEO:", response.data.error);
        }
      } catch (error) {
        console.error("Error auto optimizing SEO:", error);
      } finally {
        this.isOptimizing = false;
      }
    },

    async autoSaveContent() {
      if (!this.contentId || !this.content) {
        return;
      }

      try {
        // Call API to save content without showing notification
        console.log("Auto-saving content with contentId:", this.contentId);
        const response = await axios.put(
          `/api/content/contents/${this.contentId}`,
          {
            generatedContent: this.content,
          }
        );

        if (response.data.success) {
          console.log("Content auto-saved successfully");
          this.lastSavedContent = this.content;
        } else {
          console.error("Failed to auto-save content:", response.data.error);
        }
      } catch (error) {
        console.error("Error during auto-save:", error);
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
  color: #1c1c4c;
  margin-bottom: 2rem;
  text-align: center;
}

.editor-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-content textarea {
  width: 100%;
  height: 400px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  font-family: "Arial", sans-serif;
  line-height: 1.6;
}

.editor-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
}

.action-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(46, 125, 50, 0.3);
  border-radius: 50%;
  border-top-color: #2e7d32;
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

.sidebar {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 1.5rem;
}

.sidebar-section h3 {
  color: #1c1c4c;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;
}

.sidebar-section h4 {
  color: #1c1c4c;
  font-size: 0.9rem;
  margin-top: 0.8rem;
  margin-bottom: 0.3rem;
}

.sidebar-section ul {
  list-style-type: none;
  padding-left: 0;
}

.sidebar-section li {
  padding: 0.3rem 0.5rem;
  background: #e9ecef;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.suggested-keywords li {
  background: #e3f2fd;
  color: #0d47a1;
}

.seo-score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.score-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1c1c4c;
}

.score-percent {
  font-size: 0.8rem;
  font-weight: normal;
  color: #6c757d;
}

.score-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  background-color: #4caf50;
}

.score-bar.excellent {
  background-color: #4caf50;
}

.score-bar.good {
  background-color: #8bc34a;
}

.score-bar.average {
  background-color: #ffc107;
}

.score-bar.poor {
  background-color: #f44336;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #2e7d32;
  font-size: 0.9rem;
}

.no-data-message {
  text-align: center;
  color: #6c757d;
  font-size: 0.9rem;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
}

.analysis-category {
  background: #f0f4f8;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.improvement-title {
  font-size: 0.85rem;
  font-weight: bold;
  margin: 5px 0;
}

.improvement-list ul {
  margin-top: 5px;
}

.improvement-list li {
  background: #e6f7ff;
  color: #0d47a1;
  font-size: 0.85rem;
}

.score,
.length {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1c1c4c;
  text-align: center;
  padding: 0.5rem;
  background: #e9ecef;
  border-radius: 4px;
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

.primary-button:hover {
  background: #2a2a6c;
}

.primary-button-save {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.primary-button-save:hover {
  background: #218838;
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

.analysis-stage,
.optimization-stage {
  display: none;
}

@media (max-width: 768px) {
  .editor-container {
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
</style>
