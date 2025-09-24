<template>
  <section class="assessment">
    <!-- Revolutionary Quantum Background System -->
    <div class="assessment-quantum-background">
      <div class="quantum-orb orb-1" />
      <div class="quantum-orb orb-2" />
      <div class="quantum-orb orb-3" />
      <div class="quantum-orb orb-4" />
      <div class="energy-matrix">
        <div class="matrix-grid">
          <div v-for="i in 12" :key="'cell-' + i" class="grid-cell" />
        </div>
      </div>
      <div class="floating-assessment-particles">
        <div v-for="i in 6" :key="'particle-' + i" class="quantum-particle" />
      </div>
    </div>

    <!-- Revolutionary Title Section -->
    <div class="assessment-title-zone">
      <div class="title-quantum-frame">
        <h2 class="assessment-title">
          {{ $t("creatorAI.MarketingAssessment.title") }}
        </h2>
        <div class="title-holographic-border" />
      </div>
    </div>

    <!-- Revolutionary Progress System -->
    <div class="quantum-progress-container">
      <div class="progress-quantum-frame">
        <div class="progress-holographic-shell">
          <div class="progress-info">
            <span class="progress-quantum-text">
              {{
                $t("creatorAI.MarketingAssessment.progressText", {
                  completed: completedQuestions,
                  total: questions.length,
                })
              }}
            </span>
            <span class="progress-quantum-percentage">
              {{
                $t("creatorAI.MarketingAssessment.progressPercentage", {
                  percentage: Math.round(progressPercentage),
                })
              }}
            </span>
          </div>
          <div class="quantum-progress-bar">
            <div class="progress-energy-track" />
            <div
              class="progress-quantum-fill"
              :style="{ width: progressPercentage + '%' }"
            >
              <div class="progress-energy-flow" />
              <div class="progress-particles">
                <div v-for="i in 3" :key="'flow-' + i" class="flow-particle" />
              </div>
            </div>
            <div class="progress-glow-effect" />
          </div>
        </div>
        <div class="progress-quantum-border" />
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
          <h3 class="question-text">
            {{ currentQuestion.question }}
          </h3>

          <div class="answers-container">
            <label
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              class="answer-option"
              :class="{ selected: answers[currentQuestionIndex] === index }"
              @click="selectAnswer(index)"
            >
              <input
                v-model="answers[currentQuestionIndex]"
                type="radio"
                :name="'question' + currentQuestionIndex"
                :value="index"
                class="radio-input"
                @change="selectAnswer(index)"
              />
              <span class="answer-text">{{ answer.text }}</span>
            </label>
          </div>
        </div>
      </transition>

      <div class="navigation">
        <button
          type="button"
          class="nav-button prev-button"
          :disabled="currentQuestionIndex === 0"
          @click="prevQuestion"
        >
          {{ $t("creatorAI.MarketingAssessment.prevButton") }}
        </button>

        <button
          v-if="currentQuestionIndex < questions.length - 1"
          type="button"
          class="nav-button next-button"
          :disabled="answers[currentQuestionIndex] === undefined"
          @click="nextQuestion"
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
            <h4>
              {{ $t("creatorAI.MarketingAssessment.results.strengthsTitle") }}
            </h4>
            <ul>
              <li v-for="strength in report.strengths" :key="strength">
                {{ strength }}
              </li>
            </ul>
          </div>

          <div class="report-section weaknesses">
            <h4>
              {{ $t("creatorAI.MarketingAssessment.results.weaknessesTitle") }}
            </h4>
            <ul>
              <li v-for="weakness in report.weaknesses" :key="weakness">
                {{ weakness }}
              </li>
            </ul>
          </div>

          <div class="report-section suggestions">
            <h4>
              {{ $t("creatorAI.MarketingAssessment.results.suggestionsTitle") }}
            </h4>
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
          return this.$i18n.messages["en"]?.creatorAI?.questions || [];
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
      return this.questions.length > 0
        ? (this.completedQuestions / this.questions.length) * 100
        : 0;
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
        console.log("Submitting answers:", this.answers);
        const response = await axios.post(
          `.netlify/functions/server/api/questionnaire/submit`,
          {
            answers: this.answers,
            locale: this.$i18n.locale,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
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
    selectAnswer(index) {
      this.answers[this.currentQuestionIndex] = index;
    },
  },
};
</script>

<style scoped>
/* Revolutionary Base Styles */
.assessment {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  color: white;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #181824 0%, #23234a 100%);
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
}

/* Simplified Quantum Background */
.assessment-quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 107, 53, 0.1);
  filter: blur(30px);
  animation: orbFloat 6s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 180px;
  height: 180px;
  bottom: 20%;
  left: 50%;
  animation-delay: 4s;
}

.orb-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 40%;
  animation-delay: 3s;
}

/* Simplified Grid */
.energy-matrix {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

.grid-cell {
  border: 1px solid rgba(255, 107, 53, 0.3);
}

/* Simplified Particles */
.floating-assessment-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 107, 53, 0.5);
  border-radius: 50%;
  animation: particleFloat 4s linear infinite;
}

.quantum-particle:nth-child(1) {
  top: 20%;
  left: 30%;
  animation-delay: 0s;
}
.quantum-particle:nth-child(2) {
  top: 70%;
  right: 20%;
  animation-delay: 1s;
}
.quantum-particle:nth-child(3) {
  bottom: 30%;
  left: 60%;
  animation-delay: 2s;
}
.quantum-particle:nth-child(4) {
  top: 50%;
  right: 50%;
  animation-delay: 3s;
}
.quantum-particle:nth-child(5) {
  bottom: 60%;
  right: 70%;
  animation-delay: 4s;
}
.quantum-particle:nth-child(6) {
  top: 80%;
  left: 20%;
  animation-delay: 5s;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
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
.question-card,
.score-card,
.report-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(255, 107, 53, 0.2), 0 1.5px 8px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(255, 107, 53, 0.3);
  margin-bottom: 2rem;
  padding: 2rem;
  transition: box-shadow 0.3s, transform 0.3s;
  position: relative;
  z-index: 10;
}

.question-card:hover,
.score-card:hover,
.report-section:hover {
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3), 0 2px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.question-number {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: #ff6b35;
  background-color: rgba(255, 107, 53, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
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
  gap: 1rem;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  min-height: 48px;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.answer-option:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.4);
  transform: translateY(-2px);
}

.answer-option.selected {
  background: rgba(255, 107, 53, 0.15);
  border-color: #ff6b35;
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

.radio-input {
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  accent-color: #ff6b35;
}

.answer-text {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
  flex: 1;
}

.answer-option.selected .answer-text {
  color: #1a202c;
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
  .assessment {
    padding: 4rem 1rem;
  }

  .question-card {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-button {
    width: 100%;
    padding: 1rem;
  }

  .answer-option {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .quantum-orb {
    display: none;
  }

  .container {
    padding: 0;
  }
}

/* Simplified Animations */
@keyframes orbFloat {
  0%,
  100% {
    transform: translateY(0px);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.6;
  }
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translateY(0px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
}

.quantum-assessment-title {
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(255, 107, 53, 0.5),
    0 0 20px rgba(255, 107, 53, 0.3);
  letter-spacing: -0.05em;
  margin: 0;
  padding: 0;
  position: relative;
}

/* Revolutionary Progress System */
.quantum-progress-container {
  max-width: 800px;
  margin: 2.5rem auto 3rem;
  position: relative;
  z-index: 10;
}
</style>
