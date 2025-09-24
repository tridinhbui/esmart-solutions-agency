<template>
  <section class="simple-marketing-assessment">
    <!-- Background Pattern with Radial Gradients -->
    <div class="flat-background">
      <div class="geometric-pattern"></div>
      <div class="radial-ribbon ribbon-1"></div>
      <div class="radial-ribbon ribbon-2"></div>
      <div class="radial-ribbon ribbon-3"></div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <!-- Header Icon -->
        <div class="header-icon slide-up-element" data-delay="0.05">
          <i class="fas fa-chart-line"></i>
        </div>

        <!-- Section Title -->
        <h2 class="section-title slide-up-element" data-delay="0.1">
          <span
            class="typing-text"
            :data-text="$t('sections.marketingAssessment')"
            >{{ $t("sections.marketingAssessment") }}</span
          >
        </h2>

        <!-- Section Subtitle -->
        <p class="section-subtitle slide-up-element" data-delay="0.15">
          <span
            class="typing-text"
            :data-text="$t('sections.marketingAssessmentSubtitle')"
            >{{ $t("sections.marketingAssessmentSubtitle") }}</span
          >
        </p>
      </div>

      <!-- Assessment Form -->
      <div class="assessment-form-container slide-up-element" data-delay="0.2">
        <div class="form-card">
          <h3
            class="form-title typing-text"
            :data-text="$t('simpleComponents.assessment.formTitle')"
          >
            {{ $t("simpleComponents.assessment.formTitle") }}
          </h3>
          <p
            class="form-description typing-text"
            :data-text="$t('simpleComponents.assessment.formDescription')"
          >
            {{ $t("simpleComponents.assessment.formDescription") }}
          </p>

          <!-- Progress Indicator -->
          <div class="form-progress">
            <div
              class="progress-step"
              :class="{
                active: currentSection === 1,
                completed: currentSection > 1,
              }"
            >
              <div class="step-number">1</div>
              <span class="step-label">
                <span class="step-label">
                  {{ $t("simpleComponents.assessment.personalInfo") }}</span
                >
              </span>
            </div>
            <div
              class="progress-line"
              :class="{ completed: currentSection > 1 }"
              style="left: 25%; right: 25%"
            ></div>
            <div
              class="progress-step"
              :class="{
                active: currentSection === 2,
                completed: currentSection > 2,
              }"
            >
              <div class="step-number">2</div>
              <span class="step-label">
                <span class="step-label">{{
                  $t("simpleComponents.assessment.businessDetails")
                }}</span>
              </span>
            </div>
          </div>

          <form
            class="assessment-form"
            @submit.prevent="submitAssessment"
            style="width: 100%"
          >
            <!-- Section 1: Personal Information -->
            <div v-show="currentSection === 1" class="form-section">
              <div class="section-header-small">
                <span class="step-label">{{
                  $t("simpleComponents.assessment.personalInfo")
                }}</span>
                <h4 class="section-title-small"></h4>
                <p class="section-description-small">
                  <span class="step-label">{{
                    $t("simpleComponents.assessment.personalInfoDesc")
                  }}</span>
                </p>
              </div>

              <div class="form-fields">
                <div class="form-row">
                  <label for="name">{{
                    $t("simpleComponents.assessment.form.fullName")
                  }}</label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    :placeholder="
                      $t('simpleComponents.assessment.form.fullNamePlaceholder')
                    "
                    required
                  />
                </div>

                <div class="form-row">
                  <label for="email">{{
                    $t("simpleComponents.assessment.form.emailAddress")
                  }}</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    :placeholder="
                      $t('simpleComponents.assessment.form.emailPlaceholder')
                    "
                    required
                  />
                </div>

                <div class="form-row">
                  <label for="phone">{{
                    $t("simpleComponents.assessment.form.phoneNumber")
                  }}</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="formData.phone"
                    :placeholder="
                      $t('simpleComponents.assessment.form.phonePlaceholder')
                    "
                  />
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="next-btn"
                  @click="nextSection"
                  :disabled="!canProceedToNext"
                >
                  <span>{{ $t("simpleComponents.assessment.form.next") }}</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <!-- Section 2: Business Details -->
            <div v-show="currentSection === 2" class="form-section">
              <div class="section-header-small">
                <h4 class="section-title-small">
                  {{ $t("simpleComponents.assessment.businessDetails") }}
                </h4>
                <p class="section-description-small">
                  {{ $t("simpleComponents.assessment.businessDetailsDesc") }}
                </p>
              </div>

              <div class="form-fields">
                <div class="form-row">
                  <label for="company">{{
                    $t("simpleComponents.assessment.form.companyName")
                  }}</label>
                  <input
                    type="text"
                    id="company"
                    v-model="formData.company"
                    :placeholder="
                      $t('simpleComponents.assessment.form.companyPlaceholder')
                    "
                  />
                </div>

                <div class="form-row">
                  <label for="website">{{
                    $t("simpleComponents.assessment.form.websiteUrl")
                  }}</label>
                  <input
                    type="url"
                    id="website"
                    v-model="formData.website"
                    :placeholder="
                      $t('simpleComponents.assessment.form.websitePlaceholder')
                    "
                  />
                </div>

                <div class="form-row">
                  <label for="industry">{{
                    $t("simpleComponents.assessment.form.industry")
                  }}</label>
                  <select id="industry" v-model="formData.industry">
                    <option value="">
                      {{
                        $t("simpleComponents.assessment.form.selectIndustry")
                      }}
                    </option>
                    <option value="ecommerce">
                      {{ $t("simpleComponents.assessment.form.ecommerce") }}
                    </option>
                    <option value="saas">
                      {{ $t("simpleComponents.assessment.form.saas") }}
                    </option>
                    <option value="healthcare">
                      {{ $t("simpleComponents.assessment.form.healthcare") }}
                    </option>
                    <option value="finance">
                      {{ $t("simpleComponents.assessment.form.finance") }}
                    </option>
                    <option value="education">
                      {{ $t("simpleComponents.assessment.form.education") }}
                    </option>
                    <option value="real-estate">
                      {{ $t("simpleComponents.assessment.form.realEstate") }}
                    </option>
                    <option value="consulting">
                      {{ $t("simpleComponents.assessment.form.consulting") }}
                    </option>
                    <option value="manufacturing">
                      {{ $t("simpleComponents.assessment.form.manufacturing") }}
                    </option>
                    <option value="retail">
                      {{ $t("simpleComponents.assessment.form.retail") }}
                    </option>
                    <option value="other">
                      {{ $t("simpleComponents.assessment.form.other") }}
                    </option>
                  </select>
                </div>

                <div class="form-row">
                  <label for="goals">{{
                    $t("simpleComponents.assessment.form.marketingGoals")
                  }}</label>
                  <textarea
                    id="goals"
                    v-model="formData.goals"
                    :placeholder="
                      $t(
                        'simpleComponents.assessment.form.marketingGoalsPlaceholder'
                      )
                    "
                    rows="4"
                  ></textarea>
                </div>

                <div class="form-row">
                  <label for="challenges">{{
                    $t("simpleComponents.assessment.form.currentChallenges")
                  }}</label>
                  <textarea
                    id="challenges"
                    v-model="formData.challenges"
                    :placeholder="
                      $t(
                        'simpleComponents.assessment.form.challengesPlaceholder'
                      )
                    "
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="back-btn" @click="previousSection">
                  <i class="fas fa-arrow-left"></i>
                  <span>{{
                    $t("simpleComponents.assessment.form.previous")
                  }}</span>
                </button>
                <button type="submit" class="submit-btn">
                  <i class="fas fa-rocket"></i>
                  <span>{{
                    $t("simpleComponents.assessment.form.submit")
                  }}</span>
                </button>
              </div>
            </div>
          </form>

          <div class="form-benefits">
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>{{ $t("simpleComponents.benefits.analysisReport") }}</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>{{
                $t("simpleComponents.benefits.strategicRecommendations")
              }}</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>{{
                $t("simpleComponents.benefits.actionableRoadmap")
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- BRANDING + PERFORMANCE Section -->
      <div
        class="branding-performance-section slide-up-element"
        data-delay="0.3"
      >
        <div class="section-container">
          <h2 class="main-title">
            <span
              class="title-line-1 typing-text"
              :data-text="$t('simpleComponents.brandingPerformance.title1')"
              >{{ $t("simpleComponents.brandingPerformance.title1") }}</span
            >
            <span
              class="title-line-2 typing-text"
              :data-text="$t('simpleComponents.brandingPerformance.title2')"
              >{{ $t("simpleComponents.brandingPerformance.title2") }}</span
            >
          </h2>
          <div class="description-container">
            <p
              class="subtitle typing-text"
              :data-text="$t('simpleComponents.brandingPerformance.subtitle')"
            >
              {{ $t("simpleComponents.brandingPerformance.subtitle") }}
            </p>
            <p
              class="highlight-subtitle typing-text"
              :data-text="
                $t('simpleComponents.brandingPerformance.highlightSubtitle')
              "
            >
              {{ $t("simpleComponents.brandingPerformance.highlightSubtitle") }}
            </p>
          </div>

          <div class="cta-container">
            <button class="hero-cta-button" @click="startAssessment">
              <span class="cta-text">{{
                $t("simpleComponents.brandingPerformance.primaryCta")
              }}</span>
              <div class="wave-effect"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleMarketingAssessment",
  data() {
    return {
      currentSection: 1,
      formData: {
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        industry: "",
        goals: "",
        challenges: "",
      },
      contactFormData: {
        name: "",
        email: "",
        phone: "",
        channel: "",
        message: "",
      },
      typingElements: [],
      scrollObserver: null,
      resizeTimeout: null,
    };
  },
  computed: {
    canProceedToNext() {
      if (this.currentSection === 1) {
        return (
          this.formData.name.trim() !== "" && this.formData.email.trim() !== ""
        );
      }
      return true;
    },
  },
  watch: {
    // Watch for language changes and re-initialize typing effect
    "$i18n.locale"() {
      this.$nextTick(() => {
        // Give Vue more time to update the DOM attributes
        setTimeout(() => {
          // Clear any existing typing effects
          const typingElements = document.querySelectorAll(".typing-text");
          typingElements.forEach((element) => {
            element.textContent = "";
          });

          // Re-initialize typing effect with updated translations
          this.initTypingEffect();
        }, 200);
      });
    },
  },
  mounted() {
    this.initSlideUpAnimations();
    this.initTypingEffect();
    this.initScrollAnimations();

    // Add resize listener to handle screen size changes
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    // Remove resize listener
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    nextSection() {
      if (this.currentSection < 2) {
        this.currentSection++;
      }
    },
    previousSection() {
      if (this.currentSection > 1) {
        this.currentSection--;
      }
    },
    submitAssessment() {
      console.log("Assessment submitted:", this.formData);
      alert(
        "Thank you for your interest! We will send your free assessment report shortly."
      );
      // Reset form and go back to first section
      this.formData = {
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        industry: "",
        goals: "",
        challenges: "",
      };
      this.currentSection = 1;
    },
    submitContactForm() {
      console.log("Contact form submitted:", this.contactFormData);
      alert(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      // Reset contact form
      this.contactFormData = {
        name: "",
        email: "",
        phone: "",
        channel: "",
        message: "",
      };
    },
    startAssessment() {
      // Scroll to the assessment form
      const formElement = document.querySelector(".assessment-form-container");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    initSlideUpAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = parseFloat(entry.target.dataset.delay) || 0;
              setTimeout(() => {
                entry.target.classList.add("animate-in");
              }, delay * 1000);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      // Observe all slide-up elements
      const slideUpElements = document.querySelectorAll(".slide-up-element");
      slideUpElements.forEach((el) => observer.observe(el));
    },
    initTypingEffect() {
      this.typingElements = document.querySelectorAll(".typing-text");
      this.typingElements.forEach((element, index) => {
        // Always get fresh text from data-text attribute (important for language changes)
        const text = element.getAttribute("data-text") || element.dataset.text;
        element.textContent = "";

        // Check if this is a form description element
        const isFormDescription =
          element.classList.contains("form-description");

        // Set initial styles for responsive text
        element.style.width = "auto";
        element.style.minWidth = "fit-content";
        element.style.maxWidth = "100%";
        element.style.overflow = "visible";

        // Handle form descriptions differently to prevent overflow
        if (isFormDescription) {
          element.style.whiteSpace = "normal";
          element.style.wordWrap = "break-word";
          element.style.overflowWrap = "break-word";
          element.style.hyphens = "auto";
          element.style.textAlign = "center";
          element.style.padding = "0 15px";
          element.style.boxSizing = "border-box";
        } else {
          element.style.whiteSpace = "nowrap";
        }

        setTimeout(() => {
          this.typeText(element, text, 0);
        }, index * 500);
      });
    },
    typeText(element, text, index) {
      if (index < text.length) {
        element.textContent += text.charAt(index);

        // Check if this is a form description
        const isFormDescription =
          element.classList.contains("form-description");

        // Dynamically adjust container width as text is typed
        element.style.width = "auto";
        element.style.minWidth = "fit-content";

        // Check if text is overflowing and adjust if needed
        const parent = element.closest(
          ".section-title, .main-title, .form-title, .form-card"
        );

        if (parent && !isFormDescription) {
          const parentWidth = parent.offsetWidth;
          const elementWidth = element.scrollWidth;

          if (elementWidth > parentWidth * 0.95) {
            element.style.whiteSpace = "normal";
            element.style.wordWrap = "break-word";
            element.style.overflowWrap = "break-word";
          }
        }

        // For form descriptions, ensure they always wrap properly
        if (isFormDescription) {
          const containerWidth = element.offsetParent
            ? element.offsetParent.offsetWidth
            : window.innerWidth;
          const maxWidth = Math.min(600, containerWidth - 40); // 20px padding on each side

          if (element.scrollWidth > maxWidth) {
            element.style.whiteSpace = "normal";
            element.style.maxWidth = maxWidth + "px";
          }
        }

        setTimeout(() => {
          this.typeText(element, text, index + 1);
        }, 50); // Typing speed
      } else {
        // When typing is complete, ensure final responsive adjustments
        this.adjustTypingTextResponsive(element);
      }
    },
    adjustTypingTextResponsive(element) {
      // Final adjustments after typing is complete
      const parent = element.closest(
        ".section-title, .main-title, .form-title"
      );
      if (parent) {
        const parentWidth = parent.offsetWidth;
        const elementWidth = element.scrollWidth;

        if (elementWidth > parentWidth * 0.95) {
          element.style.whiteSpace = "normal";
          element.style.wordWrap = "break-word";
          element.style.overflowWrap = "break-word";
          element.style.hyphens = "auto";
        }
      }

      // Ensure cursor position is correct
      element.style.position = "relative";
      element.style.display = "inline-block";
    },
    initScrollAnimations() {
      this.scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add scroll-triggered animations
              if (entry.target.classList.contains("form-card")) {
                entry.target.style.transform = "translateY(0)";
                entry.target.style.opacity = "1";
              }

              // Animate form fields sequentially
              if (entry.target.classList.contains("form-row")) {
                const delay =
                  Array.from(entry.target.parentNode.children).indexOf(
                    entry.target
                  ) * 100;
                setTimeout(() => {
                  entry.target.style.transform = "translateX(0)";
                  entry.target.style.opacity = "1";
                }, delay);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      // Observe form elements for scroll animations
      const formCard = document.querySelector(".form-card");
      const formRows = document.querySelectorAll(".form-row");

      if (formCard) this.scrollObserver.observe(formCard);
      formRows.forEach((row) => this.scrollObserver.observe(row));
    },
    handleResize() {
      // Debounce resize events
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        // Re-adjust all typing text elements on resize
        const typingElements = document.querySelectorAll(".typing-text");
        typingElements.forEach((element) => {
          this.adjustTypingTextResponsive(element);
        });
      }, 250);
    },
  },
};
</script>

<style scoped>
/* Flat Design Marketing Assessment - Consistent with Overall Design */
.simple-marketing-assessment {
  position: relative;
  padding: 120px 0 160px 0; /* Increased bottom padding to push content below */
  background: #ffffff;
  overflow: hidden;
}

.flat-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.geometric-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(59, 130, 246, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(59, 130, 246, 0.03) 0%,
      transparent 50%
    ),
    linear-gradient(
      45deg,
      transparent 48%,
      rgba(59, 130, 246, 0.02) 50%,
      transparent 52%
    );
}

/* Radial Gradient Ribbons - Made Bigger */
.radial-ribbon {
  position: absolute;
  width: 500px; /* Increased from 300px */
  height: 500px; /* Increased from 300px */
  border-radius: 50%;
  opacity: 0.12; /* Increased from 0.08 */
  pointer-events: none;
  z-index: 0;
  animation: ribbonFloat 10s ease-in-out infinite; /* Increased duration */
}

.ribbon-1 {
  top: 5%;
  left: 15%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(59, 130, 246, 0.25) 0%,
    rgba(29, 78, 216, 0.18) 25%,
    rgba(59, 130, 246, 0.12) 50%,
    rgba(29, 78, 216, 0.08) 75%,
    transparent 100%
  );
  animation-delay: 0s;
}

.ribbon-2 {
  bottom: 10%;
  right: 5%;
  background: radial-gradient(
    circle at 70% 70%,
    rgba(59, 130, 246, 0.22) 0%,
    rgba(29, 78, 216, 0.16) 30%,
    rgba(59, 130, 246, 0.1) 60%,
    rgba(29, 78, 216, 0.06) 80%,
    transparent 100%
  );
  animation-delay: 2s;
}

.ribbon-3 {
  top: 60%;
  left: 55%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(29, 78, 216, 0.14) 40%,
    rgba(59, 130, 246, 0.08) 70%,
    rgba(29, 78, 216, 0.04) 90%,
    transparent 100%
  );
  animation-delay: 4s;
}

@keyframes ribbonFloat {
  0%,
  100% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 0.12;
  }
  25% {
    transform: translateY(-30px) scale(1.08) rotate(90deg);
    opacity: 0.18;
  }
  50% {
    transform: translateY(-15px) scale(1.12) rotate(180deg);
    opacity: 0.15;
  }
  75% {
    transform: translateY(20px) scale(0.95) rotate(270deg);
    opacity: 0.1;
  }
}

/* Enhanced Typing Effect */
.typing-text {
  display: inline-block;
  position: relative;
  overflow: visible;
  white-space: nowrap;
  min-width: fit-content;
  width: auto;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.typing-text::after {
  content: "|";
  position: absolute;
  right: -4px;
  top: 0;
  color: #3b82f6;
  font-weight: bold;
  animation: blink 1.2s infinite;
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
  white-space: nowrap;
}

/* Hide cursor for "NO MORE FLOP" title */
.title-line-1.typing-text::after {
  display: none;
}

/* Hide cursor for "NO MORE FLOP" title */
.title-line-2.typing-text::after {
  display: none;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
    transform: scale(1);
  }
  51%,
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* Typing animation with staggered delays */
.typing-text[data-text] {
  animation: typingReveal 0.1s steps(1) forwards;
  max-width: 100%;
  overflow: visible;
  text-overflow: clip;
}

@keyframes typingReveal {
  from {
    width: 0;
    min-width: 0;
  }
  to {
    width: auto;
    min-width: fit-content;
  }
}

/* Responsive typography for different languages */
.typing-text {
  font-size: inherit;
  line-height: inherit;
  word-spacing: inherit;
  letter-spacing: inherit;
}

/* Language-specific adjustments */
html[lang="vi"] .typing-text {
  word-spacing: 0.1em;
  letter-spacing: 0.02em;
}

html[lang="en"] .typing-text {
  word-spacing: 0;
  letter-spacing: -0.02em;
}

/* Flexible container for titles */
.section-title,
.main-title,
.form-title {
  hyphens: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Ensure typing text containers are flexible */
.section-title .typing-text,
.main-title .typing-text,
.form-title .typing-text {
  max-width: 100%;
  width: auto;
  min-width: 0;
  flex-shrink: 1;
}

/* Specific handling for form description typing text */
.form-description.typing-text {
  white-space: normal !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  display: block;
  box-sizing: border-box;
  padding: 0 15px;
  overflow: visible;
}

/* Scroll-triggered animations for form elements */
.form-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.form-row {
  transform: translateX(-30px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Enhanced hover effects for ribbons */
.radial-ribbon:hover {
  animation-play-state: paused;
  opacity: 0.15;
  transform: scale(1.1);
  transition: all 0.3s ease;
}

/* Responsive adjustments for bigger ribbons */
@media (max-width: 768px) {
  .radial-ribbon {
    width: 350px; /* Adjusted for mobile */
    height: 350px;
    opacity: 0.08;
  }

  .ribbon-1 {
    top: 3%;
    left: 8%;
  }

  .ribbon-2 {
    bottom: 8%;
    right: 3%;
  }

  .ribbon-3 {
    top: 55%;
    left: 50%;
  }

  .branding-performance-section {
    padding: 60px 0;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .simple-marketing-assessment {
    padding: 60px 0 100px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .form-card {
    padding: 25px;
  }

  .form-title {
    font-size: 1.6rem;
  }

  .submit-btn {
    padding: 14px 28px;
    font-size: 1rem;
  }

  /* Progress indicator small screens */
  .form-progress {
    max-width: 280px;
    margin-bottom: 30px;
  }

  .step-number {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .step-label {
    font-size: 0.75rem;
    margin-top: 6px;
  }

  /* Form sections small screens */
  .section-header-small {
    margin-bottom: 25px;
    padding-left: 5px;
  }

  .section-title-small {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  .section-description-small {
    font-size: 0.85rem;
    margin-bottom: 15px;
    text-align: center;
  }

  /* Form rows small screens */
  .form-row {
    gap: 10px;
    width: 100%;
    max-width: 100%;
  }

  .form-row label {
    font-size: 0.9rem;
    margin-bottom: 6px;
    text-align: center;
  }

  .form-row input,
  .form-row select,
  .form-row textarea {
    padding: 12px 16px;
    font-size: 0.95rem;
  }

  /* Ensure full width on small screens */
  .form-section,
  .form-fields {
    width: 100%;
    margin: 0 auto;
  }

  /* Center section headers on small screens */
  .section-header-small {
    text-align: center;
    padding-left: 0;
  }

  /* Navigation buttons small screens */
  .next-btn,
  .back-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }

  /* Center form actions on small screens */
  .form-actions {
    justify-content: center;
  }

  /* BRANDING + PERFORMANCE Section - iPhone SE Specific */
  .branding-performance-section {
    margin-top: 80px;
    padding: 60px 20px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1.8rem, 8vw, 2.2rem);
    line-height: 1.2;
    gap: 8px;
    margin-bottom: 25px;
  }

  .branding-performance-section .title-line-1,
  .branding-performance-section .title-line-2 {
    display: block;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .branding-performance-section .description-container {
    margin-bottom: 40px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .branding-performance-section .cta-container {
    gap: 20px;
  }

  .branding-performance-section .hero-cta-button {
    padding: 20px 30px;
    font-size: 1rem;
    max-width: 100%;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 16px 24px;
    font-size: 0.9rem;
  }
}

/* Extra Small Devices - iPhone SE and similar */
@media (max-width: 375px) {
  .branding-performance-section {
    margin-top: 60px;
    padding: 50px 15px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1.6rem, 9vw, 2rem);
    gap: 6px;
    margin-bottom: 20px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 1rem;
    line-height: 1.4;
  }

  .branding-performance-section .hero-cta-button {
    padding: 18px 25px;
    font-size: 0.95rem;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 14px 20px;
    font-size: 0.85rem;
  }
}

/* iPhone 5/SE Extra Small */
@media (max-width: 320px) {
  .branding-performance-section {
    margin-top: 50px;
    padding: 40px 10px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1.2rem, 12vw, 1.6rem);
    gap: 4px;
    margin-bottom: 15px;
    line-height: 1.1;
    word-spacing: -2px;
    letter-spacing: -1px;
  }

  .branding-performance-section .title-line-1,
  .branding-performance-section .title-line-2 {
    display: block;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .branding-performance-section .description-container {
    margin-bottom: 30px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 0.85rem;
    line-height: 1.3;
    margin-bottom: 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .branding-performance-section .cta-container {
    gap: 15px;
  }

  .branding-performance-section .hero-cta-button {
    padding: 16px 20px;
    font-size: 0.9rem;
    min-width: 200px;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 12px 18px;
    font-size: 0.8rem;
    min-width: 150px;
  }
}

/* iPhone 4 and very small devices */
@media (max-width: 280px) {
  .branding-performance-section {
    margin-top: 40px;
    padding: 30px 8px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1rem, 13vw, 1.4rem);
    gap: 3px;
    margin-bottom: 12px;
    line-height: 1;
    word-spacing: -3px;
    letter-spacing: -2px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 0.75rem;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .branding-performance-section .hero-cta-button {
    padding: 14px 18px;
    font-size: 0.85rem;
    min-width: 180px;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 10px 16px;
    font-size: 0.75rem;
    min-width: 140px;
  }
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: #ffffff;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.section-title {
  font-family: "Inter", sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  width: 100%;
  max-width: 100%;
}

.section-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Assessment Form Container */
.assessment-form-container {
  margin-top: 60px;
  position: relative;
  z-index: 2;
}

.form-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.form-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.form-card:hover::before {
  transform: scaleX(1);
}

.form-title {
  font-family: "Inter", sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  text-align: center;
}

.form-description {
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: clip;
}

/* Form Fields Layout */
.assessment-form {
  margin-bottom: 40px;
  width: 100%;
  text-align: center;
  align-items: center;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  max-width: 600px;
  align-items: center;
  margin: 0 auto;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  justify-content: center;
}

.form-row label {
  flex: 0 0 200px;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  padding-top: 14px;
  line-height: 1.4;
  text-align: left;
}

.form-row input,
.form-row select,
.form-row textarea {
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #374151;
  background: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
}

.form-row input::placeholder,
.form-row select::placeholder,
.form-row textarea::placeholder {
  color: #9ca3af;
}

.form-row input:focus,
.form-row select:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-row textarea {
  resize: vertical;
  min-height: 100px;
}

/* Progress Indicator Styles */
.form-progress {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #e0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.progress-step.completed .step-number {
  background-color: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

.step-label {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 8px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.progress-step.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.progress-step.completed .step-label {
  color: #10b981;
  font-weight: 600;
}

.progress-line {
  position: absolute;
  top: 20px;
  left: 20%;
  right: 20%;
  height: 2px;
  background: #e0e7ff;
  z-index: 0;
  transition: background 0.3s ease;
}

.progress-line.completed {
  background: linear-gradient(90deg, #3b82f6, #10b981);
}

.submit-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.submit-btn i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.submit-btn:hover i {
  transform: translateX(4px);
}

/* Form Benefits */
.form-benefits {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 30px;
  border-top: 1px solid #f1f5f9;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #3b82f6;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
}

.benefit-item i {
  font-size: 1.2rem;
  color: #10b981;
}

/* BRANDING + PERFORMANCE Section - Minimalist Design */
.branding-performance-section {
  margin-top: 120px;
  padding: 100px 0;
  background: #ffffff;
  text-align: center;
  position: relative;
  z-index: 2;
  border-top: 1px solid #f1f5f9;
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-title {
  font-family: "Inter", sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: #1e40af;
  margin-bottom: 30px;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  overflow: visible;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.title-line-1,
.title-line-2 {
  display: block;
  position: relative;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.title-line-1 {
  color: #1e40af;
}

.title-line-2 {
  color: #10b981;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.main-title .typing-text {
  position: relative;
}

.main-title .typing-text::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 2px;
}

.title-line-2 .typing-text::after {
  background: linear-gradient(90deg, #10b981, #059669);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.description-container {
  margin-bottom: 50px;
}

.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 15px;
  font-weight: 400;
}

.highlight-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 0;
  font-weight: 500;
}

.highlight-subtitle strong {
  color: #1e40af;
  font-weight: 700;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.hero-cta-button {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  border: none;
  padding: 24px 40px;
  border-radius: 16px;
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.hero-cta-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s ease;
}

.hero-cta-button:hover::before {
  left: 100%;
}

.hero-cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.hero-cta-button .cta-text {
  position: relative;
  z-index: 2;
  font-size: 1.3rem;
  font-weight: 900;
}

.wave-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 16px;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
}

.hero-cta-button:hover .wave-effect {
  opacity: 1;
  animation: wavePulse 2s infinite;
}

@keyframes wavePulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

.secondary-cta-button {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  padding: 16px 32px;
  border-radius: 50px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
  text-transform: none;
  letter-spacing: 0.5px;
  min-width: 160px;
  justify-content: center;
}

.secondary-cta-button:hover {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.secondary-cta-button i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.secondary-cta-button:hover i {
  transform: translateY(-3px);
}

/* Enhanced Typing Effect for CASH */
.main-title .typing-text[data-text*="CASH"]::after {
  background: linear-gradient(90deg, #10b981, #059669);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

/* Progress Indicator Styles */
.form-progress {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #e0e7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.progress-step.completed .step-number {
  background-color: #10b981;
  color: #ffffff;
  border-color: #10b981;
}

.step-label {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  margin-top: 8px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.progress-step.active .step-label {
  color: #3b82f6;
  font-weight: 600;
}

.progress-step.completed .step-label {
  color: #10b981;
  font-weight: 600;
}

/* Form Section Styles */
.form-section {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.section-header-small {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 0;
}

.section-title-small {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 700;
  text-align: center;
}

.section-description-small {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.5;
  text-align: center;
}

/* Navigation Buttons */
.form-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
}

.next-btn,
.back-btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.next-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.next-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.back-btn {
  background: transparent;
  color: #64748b;
  border: 2px solid #e5e7eb;
}

.back-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
  transform: translateY(-2px);
}

.next-btn i,
.back-btn i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.next-btn:hover:not(:disabled) i {
  transform: translateX(4px);
}

.back-btn:hover i {
  transform: translateX(-4px);
}

/* Slide Up Element Animations */
.slide-up-element {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.slide-up-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered Animation Delays */
.slide-up-element[data-delay="0.05"] {
  transition-delay: 0.05s;
}
.slide-up-element[data-delay="0.1"] {
  transition-delay: 0.1s;
}
.slide-up-element[data-delay="0.15"] {
  transition-delay: 0.15s;
}
.slide-up-element[data-delay="0.2"] {
  transition-delay: 0.2s;
}
.slide-up-element[data-delay="0.3"] {
  transition-delay: 0.3s;
}
.slide-up-element[data-delay="0.4"] {
  transition-delay: 0.4s;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .form-card {
    padding: 40px;
  }

  .section-title {
    font-size: clamp(1.8rem, 4.5vw, 2.5rem);
  }

  .main-title {
    font-size: clamp(2rem, 5vw, 3rem);
  }

  /* Enhanced text wrapping for longer content */
  .typing-text {
    word-spacing: 0.05em;
    letter-spacing: 0.01em;
  }

  html[lang="vi"] .typing-text {
    word-spacing: 0.08em;
    letter-spacing: 0.02em;
  }
}

@media (max-width: 768px) {
  .simple-marketing-assessment {
    padding: 80px 0 120px 0;
  }

  .section-title {
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    line-height: 1.3;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .form-card {
    padding: 30px;
  }

  .form-title {
    font-size: clamp(1.4rem, 3.5vw, 1.8rem);
    line-height: 1.3;
  }

  .form-description {
    font-size: 1rem;
    line-height: 1.5;
    max-width: 100%;
    padding: 0 20px;
    margin: 0 auto 30px auto;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .form-description.typing-text {
    white-space: normal !important;
    max-width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }

  /* Enhanced Vietnamese text handling */
  html[lang="vi"] .section-title,
  html[lang="vi"] .form-title,
  html[lang="vi"] .main-title {
    line-height: 1.4;
    word-spacing: 0.1em;
    letter-spacing: 0.03em;
  }

  html[lang="vi"] .typing-text {
    word-spacing: 0.12em;
    letter-spacing: 0.04em;
  }

  /* Form card padding for smaller screens */
  @media (max-width: 480px) {
    .form-card {
      padding: 25px;
    }
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .form-benefits {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  /* Progress indicator responsive */
  .form-progress {
    max-width: 300px;
  }

  .step-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .step-label {
    font-size: 0.8rem;
  }

  /* Form sections responsive */
  .section-title-small {
    font-size: 1.6rem;
  }

  .section-description-small {
    font-size: 0.9rem;
  }

  /* Form rows responsive */
  .form-row {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 100%;
  }

  .form-row label {
    flex: none;
    width: 100%;
    padding-top: 0;
    margin-bottom: 8px;
    text-align: center;
  }

  /* Ensure form sections take full width on mobile */
  .form-section {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .form-fields {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  /* Center form actions on mobile */
  .form-actions {
    justify-content: center;
  }

  /* Navigation buttons responsive */
  .form-actions {
    flex-direction: column;
    gap: 15px;
  }

  .next-btn,
  .back-btn {
    width: 100%;
    justify-content: center;
  }

  .branding-performance-section {
    padding: 60px 0;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .simple-marketing-assessment {
    padding: 60px 0 100px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .form-title {
    font-size: 1.6rem;
  }

  .form-description {
    font-size: 0.95rem;
    line-height: 1.4;
    max-width: 100%;
    padding: 0 15px;
    margin: 0 auto 25px auto;
  }

  .form-description.typing-text {
    padding: 0 10px;
    white-space: normal !important;
  }

  .submit-btn {
    padding: 14px 28px;
    font-size: 1rem;
  }

  /* Form sections centering on small screens */
  .form-section {
    max-width: 100%;
    margin: 0 auto;
  }

  .form-fields {
    max-width: 100%;
    margin: 0 auto;
  }

  /* BRANDING + PERFORMANCE Section - iPhone SE Specific */
  .branding-performance-section {
    margin-top: 80px;
    padding: 60px 20px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1.8rem, 8vw, 2.2rem);
    line-height: 1.2;
    gap: 8px;
    margin-bottom: 25px;
  }

  .branding-performance-section .title-line-1,
  .branding-performance-section .title-line-2 {
    display: block;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .branding-performance-section .description-container {
    margin-bottom: 40px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .branding-performance-section .cta-container {
    gap: 20px;
  }

  .branding-performance-section .hero-cta-button {
    padding: 20px 30px;
    font-size: 1rem;
    max-width: 100%;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 16px 24px;
    font-size: 0.9rem;
  }
}

/* Extra Small Devices - iPhone SE and similar */
@media (max-width: 375px) {
  .branding-performance-section {
    margin-top: 60px;
    padding: 50px 15px;
  }

  .branding-performance-section .main-title {
    font-size: clamp(1.6rem, 9vw, 2rem);
    gap: 6px;
    margin-bottom: 20px;
  }

  .branding-performance-section .subtitle,
  .branding-performance-section .highlight-subtitle {
    font-size: 1rem;
    line-height: 1.4;
  }

  .branding-performance-section .hero-cta-button {
    padding: 18px 25px;
    font-size: 0.95rem;
  }

  .branding-performance-section .secondary-cta-button {
    padding: 14px 20px;
    font-size: 0.85rem;
  }
}

/* Contact Form Section */
.contact-form-section {
  margin-top: 80px;
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  text-align: center;
  position: relative;
  z-index: 2;
  border-top: 1px solid #e2e8f0;
}

.contact-form-section .section-title {
  font-family: "Inter", sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.contact-form-section .section-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 50px;
  max-width: 600px;
  margin: 0 auto 50px auto;
}

.contact-form-container {
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-form:hover::before {
  transform: scaleX(1);
}

.contact-form .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 30px;
}

.contact-form .form-group.full-width {
  grid-column: 1 / -1;
}

.contact-form .form-group label {
  display: block;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.contact-form .form-group input,
.contact-form .form-group textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #374151;
  background: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.contact-form .form-group input::placeholder,
.contact-form .form-group textarea::placeholder {
  color: #9ca3af;
}

.contact-form .form-group input:focus,
.contact-form .form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.contact-form .form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-contact-btn {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #059669);
}

.submit-contact-btn i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.submit-contact-btn:hover i {
  transform: translateX(4px);
}
</style>
