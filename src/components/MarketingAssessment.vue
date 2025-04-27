<template>
  <section class="assessment">
    <h2>{{ $t("creatorAI.MarketingAssessment.title") }}</h2>

    <div class="progress-container">
      <div class="progress-info">
        <span class="progress-text">
          {{
            $t("creatorAI.MarketingAssessment.progressText", {
              completed: completedQuestions,
              total: questions.length,
            })
          }}
        </span>
        <span class="progress-percentage">
          {{
            $t("creatorAI.MarketingAssessment.progressPercentage", {
              percentage: Math.round(progressPercentage),
            })
          }}
        </span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>

    <form @submit.prevent="submitAnswers">
      <transition name="fade" mode="out-in">
        <div
          v-if="currentQuestion"
          :key="currentQuestionIndex"
          class="question-card"
        >
          <span class="question-number">
            {{
              $t("creatorAI.MarketingAssessment.questionNumber", {
                number: currentQuestionIndex + 1,
              })
            }}
          </span>
          <h3 class="question-text">{{ currentQuestion.question }}</h3>

          <div class="answers-container">
            <label
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              class="answer-option"
              :class="{ selected: answers[currentQuestionIndex] === index }"
            >
              <input
                type="radio"
                :name="'question' + currentQuestionIndex"
                :value="index"
                v-model="answers[currentQuestionIndex]"
              />
              <span class="radio-custom"></span>
              <span class="answer-text">{{ answer.text }}</span>
            </label>
          </div>
        </div>
      </transition>

      <div class="navigation">
        <button
          type="button"
          class="nav-button prev-button"
          @click="prevQuestion"
          :disabled="currentQuestionIndex === 0"
        >
          {{ $t("creatorAI.MarketingAssessment.prevButton") }}
        </button>

        <button
          v-if="currentQuestionIndex < questions.length - 1"
          type="button"
          class="nav-button next-button"
          @click="nextQuestion"
          :disabled="answers[currentQuestionIndex] === undefined"
        >
          {{ $t("creatorAI.MarketingAssessment.nextButton") }}
        </button>

        <button
          v-else
          type="submit"
          class="nav-button submit-button"
          :disabled="!allQuestionsAnswered"
        >
          {{ $t("creatorAI.MarketingAssessment.submitButton") }}
        </button>
      </div>
    </form>

    <transition name="fade">
      <div v-if="report" class="results-container">
        <div class="score-card">
          <h3>{{ $t("creatorAI.MarketingAssessment.results.scoreTitle") }}</h3>
          <div class="score-value">{{ score }}<span>/100</span></div>
        </div>

        <div class="report-sections">
          <div class="report-section strengths">
            <h4>{{ $t("creatorAI.MarketingAssessment.results.strengthsTitle") }}</h4>
            <ul>
              <li v-for="strength in report.strengths" :key="strength">
                {{ strength }}
              </li>
            </ul>
          </div>

          <div class="report-section weaknesses">
            <h4>{{ $t("creatorAI.MarketingAssessment.results.weaknessesTitle") }}</h4>
            <ul>
              <li v-for="weakness in report.weaknesses" :key="weakness">
                {{ weakness }}
              </li>
            </ul>
          </div>

          <div class="report-section suggestions">
            <h4>{{ $t("creatorAI.MarketingAssessment.results.suggestionsTitle") }}</h4>
            <ul>
              <li v-for="suggestion in report.suggestions" :key="suggestion">
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "MarketingAssessment",
  data() {
    return {
      answers: [],
      currentQuestionIndex: 0,
      score: null,
      report: null,
    };
  },
  computed: {
    questions() {
      try {
        const locale = this.$i18n.locale;
        if (
          this.$i18n.messages[locale] &&
          this.$i18n.messages[locale].creatorAI &&
          this.$i18n.messages[locale].creatorAI.questions
        ) {
          return this.$i18n.messages[locale].creatorAI.questions;
        } else {
          console.warn(
            `Translation path 'MarketingAssessment.questions' not found for locale ${locale}`
          );
          // Return empty array or fallback to English if available
          return (
            this.$i18n.messages["en"]?.creatorAI?.questions || []
          );
        }
      } catch (error) {
        console.error("Error accessing translation:", error);
        return []; // Return empty array as fallback
      }
    },
    completedQuestions() {
      return this.answers.filter((answer) => answer !== undefined).length;
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    progressPercentage() {
      return this.questions.length > 0 ? (this.completedQuestions / this.questions.length) * 100 : 0;
    },
    allQuestionsAnswered() {
      return this.answers.every((answer) => answer !== undefined);
    },
    nextDisabled() {
      return this.answers[this.currentQuestionIndex] === undefined;
    },
  },
  watch: {
    // Watch for changes in the questions and initialize the answers array
    questions: {
      immediate: true,
      handler(newQuestions) {
        if (newQuestions && newQuestions.length > 0) {
          this.answers = Array(newQuestions.length).fill(undefined);
        }
      },
    },

    // Reset answers when locale changes
    "$i18n.locale": {
      immediate: false,
      handler(newLocale, oldLocale) {
        console.log(`Locale changed from ${oldLocale} to ${newLocale}`);
        this.currentQuestionIndex = 0;
        this.answers = Array(this.questions.length).fill(undefined);
      },
    },
  },
  methods: {
    async submitAnswers() {
      try {
        const response = await axios.post(
          `.netlify/functions/server/api/questionnaire/submit`,
          {
            answers: this.answers,
            locale: this.$i18n.locale,
          }
        );
        this.score = response.data.score;
        this.report = response.data.report;

        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.querySelector(".results-container");
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      } catch (error) {
        console.error("Error submitting answers:", error);
      }
    },
    nextQuestion() {
      if (this.answers[this.currentQuestionIndex] === undefined) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        return;
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
  },
};
</script>

<style scoped>
/* Base styles */
.assessment {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: #1a202c;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
  letter-spacing: -0.025em;
}

/* Progress bar */
.progress-container {
  margin-bottom: 2.5rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.progress-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3182ce;
}

.progress-bar {
  height: 8px;
  background-color: #edf2f7;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3182ce, #63b3ed);
  border-radius: 9999px;
  transition: width 0.5s ease;
}

/* Question card */
.question-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.question-number {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #3182ce;
  background-color: #ebf8ff;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.question-text {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
  line-height: 1.5;
}

/* Answer options */
.answers-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.answer-option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;
}

.answer-option:hover {
  background-color: #edf2f7;
  border-color: #cbd5e0;
}

.answer-option.selected {
  background-color: #ebf8ff;
  border-color: #90cdf4;
}

.answer-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-custom {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #cbd5e0;
  margin-right: 12px;
  transition: all 0.2s ease;
}

.answer-option.selected .radio-custom {
  border-color: #3182ce;
}

.answer-option.selected .radio-custom::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3182ce;
}

.answer-text {
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
}

.answer-option.selected .answer-text {
  color: #2c5282;
  font-weight: 600;
}

/* Alert */
.alert {
  background-color: #fed7d7;
  color: #c53030;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  text-align: center;
}

.alert.show {
  opacity: 1;
  transform: translateY(0);
}

/* Navigation */
.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.prev-button {
  background-color: #edf2f7;
  color: #4a5568;
}

.prev-button:hover:not(:disabled) {
  background-color: #e2e8f0;
}

.next-button,
.submit-button {
  background-color: #3182ce;
  color: white;
}

.next-button:hover:not(:disabled),
.submit-button:hover:not(:disabled) {
  background-color: #2c5282;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Results */
.results-container {
  margin-top: 3rem;
}

.score-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  text-align: center;
}

.score-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
}

.score-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: #3182ce;
  line-height: 1;
}

.score-value span {
  font-size: 1.5rem;
  color: #718096;
  font-weight: 500;
}

.report-sections {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .report-sections {
    grid-template-columns: repeat(3, 1fr);
  }
}

.report-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.report-section h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

.strengths h4 {
  color: #2f855a;
}

.weaknesses h4 {
  color: #c53030;
}

.suggestions h4 {
  color: #3182ce;
}

.report-section ul {
  padding-left: 1rem;
}

.report-section li {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #4a5568;
  line-height: 1.5;
  text-align: left;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .question-card {
    padding: 1.5rem;
  }

  .navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-button {
    width: 100%;
  }
}
</style>
