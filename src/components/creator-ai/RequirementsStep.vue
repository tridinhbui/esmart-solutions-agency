<template>
  <div class="step-content">
    <h2>{{ $t("creatorAI.requirements.title") }}</h2>
    <div class="form-container">
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.projectTitle") }}</label>
        <input
          v-model="formData.title"
          type="text"
          placeholder="Enter project title"
        >
      </div>
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.projectDescription") }}</label>
        <textarea
          v-model="formData.description"
          placeholder="Enter project description"
          rows="3"
          style="resize: none"
        />
      </div>
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.topic") }}</label>
        <input
          v-model="formData.topic"
          type="text"
          placeholder="Enter your topic"
        >
      </div>
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.keywords") }}</label>
        <input
          v-model="formData.keywords"
          type="text"
          :placeholder="$t('creatorAI.requirements.keywordsTip')"
        >
      </div>
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.tone") }}</label>
        <select v-model="formData.tone">
          <option value="professional">
            {{ $t("creatorAI.requirements.professional") }}
          </option>
          <option value="casual">
            {{ $t("creatorAI.requirements.casual") }}
          </option>
          <option value="friendly">
            {{ $t("creatorAI.requirements.friendly") }}
          </option>
          <option value="formal">
            {{ $t("creatorAI.requirements.formal") }}
          </option>
          <option value="persuasive">
            {{ $t("creatorAI.requirements.persuasive") }}
          </option>
          <option value="optimistic">
            {{ $t("creatorAI.requirements.optimistic") }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>{{ $t("creatorAI.requirements.contentType") }}</label>
        <select v-model="formData.type">
          <option value="blog">
            {{ $t("creatorAI.requirements.blog") }}
          </option>
          <option value="social">
            {{ $t("creatorAI.requirements.socialMedia") }}
          </option>
          <option value="article">
            {{ $t("creatorAI.requirements.article") }}
          </option>
          <option value="product">
            {{ $t("creatorAI.requirements.productDescription") }}
          </option>
          <option value="email">
            {{ $t("creatorAI.requirements.emailNewsletter") }}
          </option>
        </select>
      </div>
    </div>
    <div class="button-group">
      <button
        class="secondary-button"
        @click="$emit('prev')"
      >
        {{ $t("creatorAI.requirements.previous") }}
      </button>
      <button
        class="primary-button"
        :disabled="isLoading"
        :class="{ 'loading-button': isLoading }"
        @click="generateContent"
      >
        <div class="button-content">
          <span
            v-if="isLoading"
            class="loading-spinner"
          />
          <span>{{
            isLoading
              ? $t("creatorAI.requirements.analyzing")
              : $t("creatorAI.requirements.next")
          }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RequirementsStep",
  props: {
    initialData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        ...this.initialData,
        title: "",
        description: "",
      },
      isLoading: false,
      isGeneratingContent: false,
      isAnalyzingSEO: false,
      apiUrl: "http://localhost:3001/api/generate-content",
    };
  },
  computed: {
    apiEndpoint() {
      // Use environment variable if available, otherwise default to localhost
      return process.env.VUE_APP_API_URL || "http://localhost:3001/api";
    },
  },
  methods: {
    async generateContent() {
      try {
        // Validate input
        if (
          !this.formData.topic ||
          !this.formData.keywords ||
          !this.formData.title
        ) {
          alert(this.$t("creatorAI.requirements.requiredFields"));
          return;
        }

        this.isLoading = true;
        this.isGeneratingContent = true;

        // First create a project
        let projectId;
        let projectCreated = false;

        try {
          const projectResponse = await axios.post(
            `${this.apiEndpoint}/projects`,
            {
              title: this.formData.title,
              description:
                this.formData.description ||
                `Project about ${this.formData.topic}`,
              type: this.formData.type,
            }
          );

          if (projectResponse.data.success) {
            projectId = projectResponse.data.data.id;
            projectCreated = true;
            console.log("Created project with ID:", projectId);
          } else {
            throw new Error(
              "Failed to create project: " +
                (projectResponse.data.error || "Unknown error")
            );
          }
        } catch (projectError) {
          console.error("Error creating project:", projectError);

          // If we cannot create a project, use local content
          const placeholderContent = this.generatePlaceholderContent();

          const updatedData = {
            ...this.formData,
            content: placeholderContent,
          };

          this.$emit("update:data", updatedData);
          alert(
            "Could not create project: " +
              projectError.message +
              ". Using sample content."
          );
          this.$emit("next");
          this.isLoading = false;
          return;
        }

        // Now create content associated with this project
        if (projectCreated && projectId) {
          try {
            const contentResponse = await axios.post(
              `${this.apiEndpoint}/content/contents`,
              {
                projectId: projectId,
                topic: this.formData.topic,
                keywords: this.formData.keywords,
                tone: this.formData.tone,
                contentType: this.formData.type,
              }
            );

            if (contentResponse.data.success) {
              // Update the content data with the generated content
              const updatedData = {
                ...this.formData,
                projectId: projectId,
                contentId: contentResponse.data.data.id,
                content:
                  contentResponse.data.data.generatedContent ||
                  "Không thể tạo nội dung",
              };

              // Emit update event with new data
              this.$emit("update:data", updatedData);

              // Go to next step
              this.$emit("next");

              // Hiển thị thông báo đang phân tích SEO
              this.$emit("seo-analyzing", true);
            } else {
              throw new Error(
                contentResponse.data.error || "Unknown error occurred"
              );
            }
          } catch (contentError) {
            console.error("Error generating content:", contentError);

            // If content generation failed but project was created, use placeholder
            const placeholderContent = this.generatePlaceholderContent();

            const updatedData = {
              ...this.formData,
              projectId: projectId,
              contentId: null,
              content: placeholderContent,
            };

            this.$emit("update:data", updatedData);
            alert(
              "Không thể tạo nội dung: " +
                contentError.message +
                ". Đang sử dụng nội dung mẫu."
            );
            this.$emit("next");
          }
        }
      } catch (error) {
        console.error("Error in content generation process:", error);

        // If it's a network error, generate placeholder content for development/demos
        if (
          error.message.includes("Network Error") ||
          error.message.includes("Connection refused")
        ) {
          // Generate simple placeholder content for development
          const placeholderContent = this.generatePlaceholderContent();

          // Update the data with placeholder content
          const updatedData = {
            ...this.formData,
            content: placeholderContent,
          };

          // Emit update event with placeholder data
          this.$emit("update:data", updatedData);

          // Show a notification but still proceed
          alert("Không thể kết nối với server, đang sử dụng nội dung mẫu");

          // Go to next step
          this.$emit("next");
        } else {
          // For other errors, show the error message
          alert(
            "Không thể tạo nội dung: " + (error.message || "Lỗi không xác định")
          );
        }
      } finally {
        this.isLoading = false;
      }
    },

    generatePlaceholderContent() {
      const { topic, keywords, type } = this.formData;

      if (type === "blog") {
        return `# ${topic}: A Comprehensive Guide

## Introduction
Welcome to our comprehensive guide on ${topic}. In this article, we'll explore everything you need to know about this fascinating subject, with special attention to ${keywords}.

## Understanding ${topic}
${topic} has become increasingly important in today's world. When we consider ${keywords}, the significance becomes even more apparent. Experts in the field suggest that a thorough understanding of these concepts can lead to better outcomes.

## Key Benefits
- Improved understanding of ${keywords}
- Enhanced performance in related areas
- Greater appreciation for the complexities of ${topic}

## Practical Applications
The practical applications of ${topic} are numerous. Many professionals use these concepts daily, especially when dealing with ${keywords}.

## Conclusion
As we've explored throughout this article, ${topic} represents a significant area of interest, particularly when considered alongside ${keywords}.`;
      } else if (type === "social") {
        return `📢 Excited to share my thoughts on ${topic}!

Did you know that ${keywords} plays a crucial role in understanding this concept? I've been researching this topic extensively, and the results are fascinating.

What are your experiences with ${topic}? Comment below! 👇

#${topic.replace(/\s+/g, "")} #${keywords
          .split(",")[0]
          .trim()
          .replace(/\s+/g, "")} #ProfessionalInsights`;
      } else {
        return `# ${topic}: Unlock Your Potential

Are you looking to master ${topic}? Our comprehensive resources focus on ${keywords} to give you the edge you need.

## Why Choose Us?

- Expert guidance on ${topic}
- Specialized focus on ${keywords}
- Proven results for our clients

Don't wait to enhance your understanding of ${topic}. Start your journey today!

[Get Started] [Learn More] [Contact Us]`;
      }
    },
  },
};
</script>

<style scoped>
.step-content {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: black;
  margin-bottom: 2rem;
  text-align: center;
}

.form-container {
  display: grid;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: black;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
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

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
}

.secondary-button {
  background: var(--bg-primary);
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

.loading-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #e5e5e5;
  border-radius: 50%;
  border-top-color: #333;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
</style>
