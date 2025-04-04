<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.editor.title") }}</h2>
    <div class="editor-container">
      <div class="main-content">
        <textarea
          v-model="content"
          placeholder="Your AI-generated content will appear here..."
          @input="updateContent"
          style="height: 600px; resize: none"
        ></textarea>

        <div class="editor-actions">
          <!-- Đã xóa ô optimization-status và loading-indicator -->
        </div>
      </div>
      <div class="sidebar">
        <div class="sidebar-section">
          <h3>SEO Score</h3>
          <div
            class="seo-score-box"
            :class="{ loading: isAnalyzing || isFetchingSeo }"
          >
            <div v-if="isAnalyzing || isFetchingSeo" class="loading-indicator">
              <div class="spinner"></div>
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
                ></div>
              </div>
            </div>
            <div v-else class="no-data-message">
              <p>{{ $t("creatorAI.editor.seoAnalyzing") }}</p>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3>{{ $t("creatorAI.editor.keywordsTitle") }}</h3>
          <ul>
            <li v-for="(keyword, index) in keywordsList" :key="index">
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
            <div class="improvement-list" v-if="category.improvements">
              <p class="improvement-title">Improvement Suggestions:</p>
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
      <button class="secondary-button" @click="goBack">
        {{ $t("creatorAI.editor.previous") }}
      </button>
      <button class="primary-button-save" @click="saveContent" v-if="contentId">
        {{ $t("creatorAI.editor.save") }}
      </button>
      <button class="primary-button" @click="$emit('next')">
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
      showNotification: function (type, title, message) {
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
  methods: {
    updateContent() {
      if (this.content !== null && this.content !== undefined) {
        console.log("[SEO_CLIENT] Updating content in parent component");
        this.$emit("update:content", this.content);

        // Bỏ qua autoAnalyzeAndOptimize nếu đang có thao tác nhập liệu
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
      if (!this.contentId) {
        return;
      }

      try {
        if (this.content === this.lastSavedContent) {
          console.log("[SEO_CLIENT] Nội dung không thay đổi, không cần lưu");
          return;
        }

        console.log("[SEO_CLIENT] Đang lưu nội dung...");

        // Gọi API lưu nội dung
        const response = await axios.put(
          `/api/content/contents/${this.contentId}`,
          {
            generatedContent: this.content,
          }
        );

        if (response.data.success) {
          console.log("[SEO_CLIENT] Lưu nội dung thành công");
          this.lastSavedContent = this.content;

          // Hiển thị thông báo thành công
          this.showNotification(
            "success",
            "Save Content",
            "Content saved successfully"
          );

          // Tự động phân tích và tối ưu SEO sau khi lưu
          this.optimizationCount = 0; // Reset count khi có nội dung mới
          await this.autoAnalyzeAndOptimize();
        } else {
          console.error(
            "[SEO_CLIENT] Lỗi khi lưu nội dung:",
            response.data.error
          );
          this.showNotification(
            "error",
            "Save Content",
            "Error saving content: " + response.data.error
          );
        }
      } catch (error) {
        console.error("[SEO_CLIENT] Lỗi khi lưu nội dung:", error);
        this.showNotification(
          "error",
          "Save Content",
          "Error saving content: " + error.message
        );
      }
    },

    async autoAnalyzeAndOptimize() {
      console.log("[SEO_CLIENT] Bắt đầu tự động phân tích và tối ưu hóa SEO");

      // Kiểm tra nếu gần đây đã phân tích
      const now = new Date().getTime();
      if (this.lastAnalysisTime && now - this.lastAnalysisTime < 5000) {
        console.log("[SEO_CLIENT] Đã phân tích gần đây, bỏ qua để tránh lặp");
        return;
      }

      // Nếu đã đạt giới hạn tối ưu, không tiếp tục
      if (this.optimizationCount >= this.maxOptimizations) {
        console.log(
          `[SEO_CLIENT] Đã đạt giới hạn tối ưu (${this.maxOptimizations}), không tối ưu thêm`
        );
        return;
      }

      // Không tiếp tục nếu đang phân tích hoặc tối ưu
      if (this.isAnalyzing || this.isOptimizing) {
        console.log("[SEO_CLIENT] Đang phân tích hoặc tối ưu, không tiếp tục");
        return;
      }

      // Lưu thời điểm phân tích hiện tại
      this.lastAnalysisTime = now;

      await this.analyzeSEO();

      // Thêm độ trễ nhỏ trước khi tối ưu để tránh gọi API liên tục
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Nếu điểm SEO dưới 80, tự động tối ưu hóa
      if (
        this.seoData &&
        (this.seoData.seoScore || this.seoData.score) < 80 &&
        this.optimizationCount < this.maxOptimizations &&
        !this.hasBeenOptimized
      ) {
        console.log("[SEO_CLIENT] Điểm SEO dưới 80, tự động tối ưu hóa");
        await this.autoOptimizeSEO();
        this.hasBeenOptimized = true;
      } else {
        console.log(
          "[SEO_CLIENT] Điểm SEO đạt yêu cầu hoặc đã đạt giới hạn tối ưu, không cần tối ưu hóa"
        );
      }
    },

    async analyzeSEO() {
      if (!this.contentId) {
        return;
      }

      try {
        this.isAnalyzing = true;
        console.log("[SEO_CLIENT] Bắt đầu phân tích SEO với Gemini API");
        this.seoAnalysisStage = "Đang gọi Gemini API để phân tích SEO...";

        // Gọi API phân tích SEO
        const response = await axios.post(`/api/seo/analyze/${this.contentId}`);

        if (response.data.success) {
          this.seoData = response.data.data.analysis;
          console.log("[SEO_CLIENT] Phân tích SEO hoàn tất:", this.seoData);
          this.seoAnalysisStage = "Phân tích SEO hoàn tất";
        } else {
          console.error("[SEO_CLIENT] Lỗi phân tích SEO:", response.data.error);
          this.seoAnalysisStage = "Phân tích SEO thất bại";
        }
      } catch (error) {
        console.error("[SEO_CLIENT] Lỗi phân tích SEO:", error);
        this.seoAnalysisStage = "Lỗi phân tích SEO";
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
          "Đang tối ưu hóa nội dung với DeepSeek và Gemini...";
        console.log("[SEO_CLIENT] Bắt đầu tối ưu hóa SEO thủ công");

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
          `[SEO_CLIENT] Điểm SEO trước khi tối ưu thủ công: ${previousScore}`
        );

        // Gọi API tối ưu hóa SEO
        const response = await axios.post(
          `/api/seo/optimize/${this.contentId}`
        );

        if (response.data.success) {
          const result = response.data.data;
          console.log("[SEO_CLIENT] Kết quả tối ưu hóa SEO:", result);

          if (result.optimized) {
            // Lấy dữ liệu SEO trước khi cập nhật nội dung
            this.seoData = await this.fetchSEOData();

            // Lưu lại điểm SEO mới
            this.lastSeoScore = result.newScore;

            // Cập nhật nội dung sau khi đã có dữ liệu SEO
            console.log(
              "[SEO_CLIENT] Cập nhật nội dung và điểm số sau khi tối ưu"
            );
            this.content = result.content.generatedContent;
            this.lastSavedContent = this.content; // Cập nhật nội dung đã lưu

            // Gọi updateContent() sau khi đã cập nhật SEO data
            this.updateContent();
            this.optimizationStage = "Tối ưu hóa SEO hoàn tất";

            // Đánh dấu đã tối ưu
            this.hasBeenOptimized = true;

            // Tăng bộ đếm tối ưu
            this.optimizationCount++;

            // Hiển thị thông báo thành công
            this.showNotification(
              "success",
              "SEO Optimization",
              `Content optimized! SEO Score: ${result.previousScore} → ${result.newScore}`
            );
          } else {
            // Hiển thị thông báo nếu không thể tối ưu thêm
            this.optimizationStage = "Không thể tối ưu thêm";
            this.showNotification("info", "SEO Optimization", result.message);
          }
        } else {
          console.error(
            "[SEO_CLIENT] Lỗi tối ưu hóa SEO:",
            response.data.error
          );
          this.optimizationStage = "Tối ưu hóa SEO thất bại";
        }
      } catch (error) {
        console.error("[SEO_CLIENT] Lỗi tối ưu hóa SEO:", error);
        this.optimizationStage = "Lỗi tối ưu hóa SEO";
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
        console.log("[SEO_CLIENT] Bắt đầu tự động tối ưu hóa SEO");

        // Lưu điểm SEO trước khi tối ưu
        const previousScore =
          this.lastSeoScore ||
          (this.seoData ? this.seoData.seoScore || this.seoData.score || 0 : 0);
        console.log(
          `[SEO_CLIENT] Điểm SEO trước khi tự động tối ưu: ${previousScore}`
        );

        // Gọi API tự động tối ưu hóa
        const response = await axios.post(
          `/api/seo/auto-optimize/${this.contentId}`,
          {
            maxOptimizations: 3,
            targetScore: 80,
          }
        );

        if (response.data.success) {
          const result = response.data.data;

          // Lưu dữ liệu SEO trước khi cập nhật nội dung
          this.seoData = {
            seoScore: result.finalScore,
            keywordDensity: result.finalReport.keywordDensity,
            readabilityScore: result.finalReport.readabilityScore,
            suggestedKeywords: result.finalReport.suggestedKeywords,
            detailedAnalysis: result.finalReport.detailedAnalysis,
          };

          // Cập nhật điểm cuối cùng
          this.lastSeoScore = result.finalScore;

          // Đánh dấu đã tối ưu
          this.hasBeenOptimized = true;

          // Sau đó cập nhật nội dung
          this.content = result.finalReport.content;
          this.lastSavedContent = this.content; // Cập nhật nội dung đã lưu

          // Gọi update content sau khi đã cập nhật dữ liệu SEO
          this.updateContent();

          // Hiển thị thông báo thành công
          this.showNotification(
            "success",
            "SEO Optimization",
            `Automatic optimization completed! SEO Score: ${result.initialScore} → ${result.finalScore}`
          );

          // Tăng bộ đếm tối ưu hóa
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
  },
  watch: {
    initialContent(newValue) {
      this.content = newValue || "";
      if (newValue && newValue !== this.lastSavedContent) {
        this.lastSavedContent = newValue;
      }
    },
    content(newValue) {
      // Khi nội dung thay đổi, không phân tích ngay lập tức
      // Chỉ đặt timer để phân tích sau khi người dùng ngừng gõ một khoảng thời gian
      if (this.updateContentTimer) {
        clearTimeout(this.updateContentTimer);
      }

      // Chỉ phân tích nếu người dùng đã lưu nội dung
      if (newValue === this.lastSavedContent) {
        return;
      }

      // Tạo timer mới để phân tích sau 5 giây ngừng gõ
      this.updateContentTimer = setTimeout(() => {
        // Đặt lại cờ hasBeenOptimized để có thể tối ưu lại nếu cần
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

          // Nếu có contentId, kiểm tra xem đã có dữ liệu SEO chưa
          const seoData = await this.fetchSEOData();
          if (seoData) {
            this.seoData = seoData;
            this.lastSeoScore = seoData.seoScore || seoData.score || 0;

            // Nếu SEO score dưới 80, tự động tối ưu
            if (
              (seoData.seoScore || seoData.score) < 80 &&
              !this.hasBeenOptimized
            ) {
              await this.autoOptimizeSEO();
              this.hasBeenOptimized = true;
            }
          } else {
            // Nếu chưa có dữ liệu SEO, tự động phân tích và tối ưu
            await this.autoAnalyzeAndOptimize();
            this.hasBeenOptimized = true;
          }
        }
      },
    },
  },
  mounted() {
    this.content = this.initialContent || "";
    this.lastSavedContent = this.initialContent || "";

    if (this.content) {
      this.updateContent();
    }

    // Thêm biến để lưu điểm SEO cuối cùng
    this.lastSeoScore = 0;

    // Nếu có contentId nhưng chưa có seoData, phân tích ngay khi component được tạo
    if (this.contentId && !this.seoData) {
      this.$nextTick(async () => {
        // Lấy dữ liệu SEO nếu đã có
        const seoData = await this.fetchSEOData();
        if (seoData) {
          this.seoData = seoData;
          this.lastSeoScore = seoData.seoScore || seoData.score || 0;

          // Chỉ tối ưu nếu điểm dưới 80 và chưa có phân tích trước đó
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

    // Nếu đang trong trạng thái phân tích SEO, cập nhật UI
    if (this.isAnalyzingSeo) {
      this.isFetchingSeo = true;

      // Thiết lập interval để kiểm tra dữ liệu SEO mỗi 3 giây
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

      // Xóa interval sau 30 giây để tránh lãng phí tài nguyên
      setTimeout(() => {
        clearInterval(checkSeoInterval);
        this.isFetchingSeo = false;
      }, 30000);
    }
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
