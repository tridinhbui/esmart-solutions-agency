<template>
  <section class="simple-hero">
    <!-- Flat Design Background -->
    <div class="flat-background">
      <div class="geometric-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <div class="container">
      <!-- Hero Content -->
      <div class="hero-content">
        <!-- Company Header -->
        <div class="company-header slide-up-element" data-delay="0.05">
          <div class="company-icon slide-up-element" data-delay="0.1">
            <i class="fas fa-rocket"></i>
          </div>

          <div class="company-info slide-up-element" data-delay="0.15">
            <span class="company-name">ESmart Solutions</span>
            <span class="company-tagline">Digital Agency</span>
          </div>
        </div>

        <!-- Main Title -->
        <div class="hero-title">
          <span class="title-main slide-up-element" data-delay="0.2">{{
            $t("simpleComponents.hero.allStartsWith")
          }}</span>
          <span class="title-accent slide-up-element" data-delay="0.25">{{
            $t("simpleComponents.hero.conversation")
          }}</span>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button
            class="cta-primary flat-btn slide-up-element"
            data-delay="0.3"
            @click="scrollToAssessment"
          >
            {{ $t("simpleComponents.hero.startYourDream") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleHeroSection",
  data() {
    return {
      // Stats data removed as stats section is no longer needed
    };
  },
  mounted() {
    this.initSlideUpAnimations();
  },
  methods: {
    scrollToAssessment() {
      const assessmentSection = document.querySelector(
        ".simple-marketing-assessment"
      );
      if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: "smooth" });
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
  },
};
</script>

<style scoped>
/* Flat Design Hero Section - White Background with Blue Accents */
.simple-hero {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 80px;
}

.flat-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.geometric-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: #f1f5f9;
  border-radius: 8px;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  right: 15%;
  transform: rotate(45deg);
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 30%;
  left: 10%;
  transform: rotate(30deg);
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  right: 25%;
  transform: rotate(60deg);
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  left: 20%;
  transform: rotate(15deg);
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

/* Company Header */
.company-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
}

.company-icon {
  width: 80px;
  height: 80px;
  background: #3b82f6;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.company-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.company-name {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.company-tagline {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.5px;
}

/* Main Title */
.hero-title {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
}

.title-main {
  font-family: "Inter", sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.1;
  letter-spacing: -1px;
  display: block;
}

.title-accent {
  font-family: "Inter", sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #3b82f6;
  line-height: 1.1;
  letter-spacing: -1px;
  display: block;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}

.flat-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-primary {
  background: #3b82f6;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
}

.cta-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
}

.flat-btn i {
  font-size: 16px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.flat-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.flat-card:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: #eff6ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #3b82f6;
  font-size: 24px;
}

.stat-number {
  font-family: "Inter", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.stat-label {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
.slide-up-element[data-delay="0.25"] {
  transition-delay: 0.25s;
}
.slide-up-element[data-delay="0.3"] {
  transition-delay: 0.3s;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-hero {
    padding: 100px 0 60px;
  }

  .title-main,
  .title-accent {
    font-size: 2.5rem;
  }

  .company-name {
    font-size: 1.2rem;
  }

  .company-tagline {
    font-size: 0.8rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .flat-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .company-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .company-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .simple-hero {
    padding: 80px 0 40px;
  }

  .title-main,
  .title-accent {
    font-size: 2rem;
    letter-spacing: -0.5px;
  }

  .company-name {
    font-size: 1rem;
  }

  .company-tagline {
    font-size: 0.7rem;
  }

  .flat-btn {
    padding: 14px 24px;
    font-size: 0.9rem;
  }
}
</style>
