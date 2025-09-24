<template>
  <section class="simple-features">
    <!-- Background Pattern -->
    <div class="flat-background">
      <div class="geometric-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Main Title -->
      <div class="main-title">
        <h1 class="slide-up-element" data-delay="0.05">
          {{ $t("simpleComponents.features.title") }}
        </h1>
      </div>

      <!-- Sub Description -->
      <div class="sub-description">
        <p
          class="description-line slide-up-element"
          data-delay="0.1"
          v-html="$t('simpleComponents.features.description1')"
        ></p>
        <p class="description-line slide-up-element" data-delay="0.15">
          {{ $t("simpleComponents.features.description2") }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="main-cta-button slide-up-element" data-delay="0.2">
          <i class="fas fa-rocket"></i>
          <span>{{ $t("simpleComponents.features.getStartedToday") }}</span>
        </button>

        <button class="secondary-cta-button slide-up-element" data-delay="0.25">
          <i class="fas fa-arrow-right"></i>
          <span>{{ $t("simpleComponents.features.learnMore") }}</span>
        </button>
      </div>

      <!-- WHAT WE OFFER Section -->
      <div class="what-we-offer-section">
        <!-- Decorative Icons -->
        <div class="decorative-icons">
          <i class="fab fa-instagram decorative-icon instagram-icon"></i>
          <i class="fab fa-facebook decorative-icon facebook-icon"></i>
        </div>

        <h2 class="section-title slide-up-element" data-delay="0.3">
          {{ $t("simpleComponents.features.whatWeOffer") }}
        </h2>

        <div class="section-description slide-up-element" data-delay="0.35">
          <p v-html="$t('simpleComponents.features.whatWeOfferDesc')"></p>
        </div>

        <div class="service-cards">
          <div class="service-card slide-up-element" data-delay="0.4">
            <div class="card-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>
              {{ $t("simpleComponents.features.services.digitalGrowth.title") }}
            </h3>
            <p>
              {{
                $t(
                  "simpleComponents.features.services.digitalGrowth.description"
                )
              }}
            </p>
          </div>

          <div class="service-card slide-up-element" data-delay="0.45">
            <div class="card-icon">
              <i class="fas fa-palette"></i>
            </div>
            <h3>
              {{ $t("simpleComponents.features.services.brandIdentity.title") }}
            </h3>
            <p>
              {{
                $t(
                  "simpleComponents.features.services.brandIdentity.description"
                )
              }}
            </p>
          </div>

          <div class="service-card slide-up-element" data-delay="0.5">
            <div class="card-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>
              {{
                $t(
                  "simpleComponents.features.services.communicationContent.title"
                )
              }}
            </h3>
            <p>
              {{
                $t(
                  "simpleComponents.features.services.communicationContent.description"
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleFeatures",
  data() {
    return {
      // Component data if needed
    };
  },
  mounted() {
    this.initSlideUpAnimations();
  },
  methods: {
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
.simple-features {
  position: relative;
  padding: 120px 0;
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

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* Main Title */
.main-title {
  margin-bottom: 50px;
  text-align: center;
}

.main-title h1 {
  font-family: "Inter", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

/* Sub Description */
.sub-description {
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.description-line {
  font-family: "Inter", sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  line-height: 1.6;
  color: #64748b;
  margin: 0 0 20px 0;
}

.description-line:last-child {
  margin-bottom: 0;
}

.highlight {
  font-style: italic;
  color: #3b82f6;
  font-weight: 600;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 80px;
}

.main-cta-button {
  position: relative;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
  border: none;
  border-radius: 16px;
  padding: 20px 40px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.main-cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
}

.main-cta-button:active {
  transform: translateY(-2px);
}

.main-cta-button i {
  font-size: 16px;
}

.secondary-cta-button {
  background: transparent;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 200px;
}

.secondary-cta-button:hover {
  background: #3b82f6;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.secondary-cta-button:active {
  transform: translateY(0);
}

.secondary-cta-button i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.secondary-cta-button:hover i {
  transform: translateX(4px);
}

/* WHAT WE OFFER Section */
.what-we-offer-section {
  position: relative;
  padding: 120px 0;
  background: #ffffff;
  overflow: hidden;
}

.what-we-offer-section .container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

/* Main Title - Uppercase, Blue, Professional */
.what-we-offer-section .section-title {
  font-family: "Inter", sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #1e40af;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 50px;
  text-align: center;
}

/* Section Description - Clear, Persuasive */
.what-we-offer-section .section-description {
  font-family: "Inter", sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  font-weight: 400;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 70px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.what-we-offer-section .section-description p {
  margin-bottom: 18px;
}

.what-we-offer-section .section-description strong {
  color: #1e40af;
  font-weight: 700;
}

.what-we-offer-section .highlight-line {
  font-style: italic;
  color: #3b82f6;
  font-weight: 600;
  margin-top: 25px;
  font-size: 1.2rem;
}

/* Service Cards Grid - 3 Columns, Blue Background */
.what-we-offer-section .service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Service Card - Dark Blue Background, White Text */
.what-we-offer-section .service-card {
  background: linear-gradient(135deg, #1e40af, #1d4ed8);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(30, 64, 175, 0.25);
  transition: all 0.4s ease;
  border: none;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.what-we-offer-section .service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #60a5fa, #93c5fd, #60a5fa);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.what-we-offer-section .service-card:hover::before {
  transform: scaleX(1);
}

.what-we-offer-section .service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(30, 64, 175, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #2563eb);
}

/* Card Icon - White, Centered */
.what-we-offer-section .card-icon {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: #ffffff;
  font-size: 32px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.what-we-offer-section .service-card:hover .card-icon {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
  transition: all 0.3s ease;
}

/* Card Title - White, Bold */
.what-we-offer-section .service-card h3 {
  font-family: "Inter", sans-serif;
  font-size: clamp(1.4rem, 3vw, 1.6rem);
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Card Description - White, Clear */
.what-we-offer-section .service-card p {
  font-family: "Inter", sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  font-weight: 400;
  line-height: 1.6;
  color: #e0e7ff;
  margin-bottom: 0;
}

.what-we-offer-section .service-card strong {
  color: #ffffff;
  font-weight: 600;
}

/* Decorative Icons - Neon Effects */
.what-we-offer-section .decorative-icon {
  position: absolute;
  font-size: 120px;
  opacity: 0.08;
  z-index: 0;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 0 20px currentColor);
}

/* Instagram Icon - Neon Pink/Purple */
.what-we-offer-section .instagram-icon {
  top: 20%;
  left: 10%;
  color: #ec4899;
  animation: neonGlow 3s ease-in-out infinite alternate;
}

/* Facebook Icon - Blue */
.what-we-offer-section .facebook-icon {
  top: 80%;
  right: 10%;
  color: #3b82f6;
  animation: neonGlow 3s ease-in-out infinite alternate-reverse;
}

/* Neon Glow Animation */
@keyframes neonGlow {
  0% {
    filter: drop-shadow(0 0 20px currentColor) brightness(1);
  }
  100% {
    filter: drop-shadow(0 0 30px currentColor) brightness(1.2);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .what-we-offer-section .service-cards {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }

  .what-we-offer-section .service-card {
    padding: 35px 25px;
    min-height: 260px;
  }

  .what-we-offer-section .decorative-icon {
    font-size: 100px;
  }
}

@media (max-width: 768px) {
  .simple-features {
    padding: 80px 0;
  }

  .main-title {
    margin-bottom: 40px;
  }

  .main-title h1 {
    font-size: 2.5rem;
  }

  .sub-description {
    margin-bottom: 50px;
  }

  .description-line {
    font-size: 1.1rem;
    margin-bottom: 18px;
  }

  .action-buttons {
    margin-bottom: 60px;
    gap: 16px;
  }

  .main-cta-button {
    min-width: 280px;
    padding: 18px 32px;
    font-size: 1rem;
  }

  .secondary-cta-button {
    min-width: 180px;
    padding: 14px 28px;
    font-size: 0.9rem;
  }

  .what-we-offer-section {
    padding: 80px 0;
  }

  .what-we-offer-section .section-title {
    font-size: 2.5rem;
  }

  .what-we-offer-section .section-description {
    font-size: 1.1rem;
    margin-bottom: 50px;
  }

  .what-we-offer-section .service-cards {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 400px;
  }

  .what-we-offer-section .service-card {
    padding: 30px 25px;
    min-height: 240px;
  }

  .what-we-offer-section .card-icon {
    width: 60px;
    height: 60px;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .what-we-offer-section .decorative-icon {
    font-size: 80px;
    opacity: 0.05;
  }
}

@media (max-width: 480px) {
  .simple-features {
    padding: 60px 0;
  }

  .main-title {
    margin-bottom: 30px;
  }

  .main-title h1 {
    font-size: 2rem;
  }

  .sub-description {
    margin-bottom: 40px;
  }

  .description-line {
    font-size: 1rem;
    margin-bottom: 16px;
  }

  .action-buttons {
    margin-bottom: 50px;
    gap: 14px;
  }

  .main-cta-button {
    min-width: 260px;
    padding: 16px 28px;
    font-size: 0.95rem;
  }

  .secondary-cta-button {
    min-width: 160px;
    padding: 12px 24px;
    font-size: 0.85rem;
  }

  .what-we-offer-section {
    padding: 60px 0;
  }

  .what-we-offer-section .section-title {
    font-size: 2rem;
  }

  .what-we-offer-section .section-description {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .what-we-offer-section .service-card {
    padding: 25px 20px;
    min-height: 220px;
  }

  .what-we-offer-section .card-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
    margin-bottom: 18px;
  }

  .what-we-offer-section .decorative-icon {
    font-size: 60px;
  }
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
.slide-up-element[data-delay="0.35"] {
  transition-delay: 0.35s;
}
.slide-up-element[data-delay="0.4"] {
  transition-delay: 0.4s;
}
.slide-up-element[data-delay="0.45"] {
  transition-delay: 0.45s;
}
.slide-up-element[data-delay="0.5"] {
  transition-delay: 0.5s;
}
</style>
