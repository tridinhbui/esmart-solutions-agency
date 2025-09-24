<template>
  <section class="simple-social">
    <!-- Flat Design Background -->
    <div class="flat-background">
      <div class="geometric-pattern">
        <div class="pattern-shape shape-1"></div>
        <div class="pattern-shape shape-2"></div>
        <div class="pattern-shape shape-3"></div>
      </div>
    </div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <!-- Header Icon -->
        <div class="header-icon slide-up-element" data-delay="0.05">
          <i class="fas fa-handshake"></i>
        </div>

        <!-- Section Title -->
        <h2 class="section-title slide-up-element" data-delay="0.1">
          {{ $t("simpleComponents.socialProof.title") }}
        </h2>

        <!-- Section Subtitle -->
        <p class="section-subtitle slide-up-element" data-delay="0.15">
          {{ $t("sections.socialProofSubtitle") }}
        </p>
      </div>

      <!-- Auto-Sliding Clients & Partners Banner -->
      <div class="clients-banner">
        <div class="banner-container">
          <div
            class="sliding-track"
            :style="{ transform: `translateX(-${slidePosition}px)` }"
          >
            <!-- First set of logos -->
            <div
              v-for="(client, index) in clients"
              :key="`first-${index}`"
              class="client-logo"
            >
              <div class="logo-container">
                <img
                  :src="client.logo"
                  :alt="client.name"
                  @error="handleImageError"
                  class="client-image"
                />
                <div class="logo-overlay">
                  <span class="client-name">{{ client.name }}</span>
                </div>
              </div>
            </div>

            <!-- Duplicate set for seamless loop -->
            <div
              v-for="(client, index) in clients"
              :key="`second-${index}`"
              class="client-logo"
            >
              <div class="logo-container">
                <img
                  :src="client.logo"
                  :alt="client.name"
                  @error="handleImageError"
                  class="client-image"
                />
                <div class="logo-overlay">
                  <span class="client-name">{{ client.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Banner Controls -->
        <!-- <div class="banner-controls">
          <button class="control-btn pause-btn" @click="togglePause">
            <i :class="isPaused ? 'fas fa-play' : 'fas fa-pause'"></i>
          </button>
          <button class="control-btn speed-btn" @click="toggleSpeed">
            <span class="speed-text">{{ speedLabels[currentSpeedIndex] }}</span>
          </button>
        </div> -->
      </div>

      <!-- Trust Indicators -->
      <div class="trust-indicators">
        <div
          v-for="(indicator, index) in trustIndicators"
          :key="index"
          class="trust-item"
        >
          <div class="trust-icon">
            <i :class="indicator.icon"></i>
          </div>
          <div class="trust-content">
            <h3 class="trust-number">{{ indicator.number }}</h3>
            <p class="trust-label">{{ indicator.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleSocialProof",
  computed: {
    // Get current translation texts for trust indicators
    trustIndicators() {
      return [
        {
          icon: "fas fa-users",
          number: this.$t(
            "simpleComponents.socialProof.trustIndicators.trustedCustomers.number"
          ),
          label: this.$t(
            "simpleComponents.socialProof.trustIndicators.trustedCustomers.label"
          ),
        },
        {
          icon: "fas fa-project-diagram",
          number: this.$t(
            "simpleComponents.socialProof.trustIndicators.successfulProjects.number"
          ),
          label: this.$t(
            "simpleComponents.socialProof.trustIndicators.successfulProjects.label"
          ),
        },
        {
          icon: "fas fa-star",
          number: this.$t(
            "simpleComponents.socialProof.trustIndicators.satisfactionRate.number"
          ),
          label: this.$t(
            "simpleComponents.socialProof.trustIndicators.satisfactionRate.label"
          ),
        },
      ];
    },
  },
  watch: {
    // Watch for language changes
    "$i18n.locale"() {
      console.log(
        "Language changed in SimpleSocialProof, trust indicators will update"
      );
      this.$forceUpdate();
    },
  },
  data() {
    return {
      slidePosition: 0,
      isPaused: false,
      currentSpeedIndex: 1,
      slideInterval: null,
      clients: [
        {
          name: "Samsung",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Samsung",
        },
        {
          name: "Nestlé",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Nestlé",
        },
        {
          name: "Vinamilk",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Vinamilk",
        },
        {
          name: "Unilever",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Unilever",
        },
        {
          name: "L'Oréal",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=L'Oréal",
        },
        {
          name: "Morinaga",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Morinaga",
        },
        {
          name: "Simply",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Simply",
        },
        {
          name: "Aeon Mall",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Aeon+Mall",
        },
        {
          name: "Viettel",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Viettel",
        },
        {
          name: "FPT",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=FPT",
        },
        {
          name: "Vingroup",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=Vingroup",
        },
        {
          name: "BIDV",
          logo: "/api/placeholder/120/60/3b82f6/ffffff?text=BIDV",
        },
      ],
      speedLabels: ["Slow", "Normal", "Fast"],
      speeds: [50, 30, 15],
    };
  },
  mounted() {
    this.startSliding();
    this.initSlideUpAnimations();
  },
  beforeUnmount() {
    this.stopSliding();
  },
  methods: {
    handleImageError(event) {
      // Fallback to text-based logo if image fails to load
      const clientName = event.target.alt;
      event.target.style.display = "none";

      const fallbackDiv = document.createElement("div");
      fallbackDiv.className = "fallback-logo";
      fallbackDiv.textContent = clientName;
      fallbackDiv.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #3b82f6;
        color: #ffffff;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        border-radius: 8px;
        padding: 8px;
      `;

      event.target.parentNode.appendChild(fallbackDiv);
    },

    startSliding() {
      if (this.slideInterval) return;

      this.slideInterval = setInterval(() => {
        if (!this.isPaused) {
          this.slidePosition += 1;

          // Reset position when reaching the end for seamless loop
          if (this.slidePosition >= this.clients.length * 180) {
            this.slidePosition = 0;
          }
        }
      }, this.speeds[this.currentSpeedIndex]);
    },

    stopSliding() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
        this.slideInterval = null;
      }
    },

    togglePause() {
      this.isPaused = !this.isPaused;
    },

    toggleSpeed() {
      this.currentSpeedIndex =
        (this.currentSpeedIndex + 1) % this.speeds.length;
      if (this.slideInterval) {
        this.stopSliding();
        this.startSliding();
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
/* Flat Design Social Proof Section - White Background with Blue Accents */
.simple-social {
  position: relative;
  background: #ffffff;
  padding: 100px 0;
  overflow: hidden;
}

.flat-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.geometric-pattern {
  position: relative;
  width: 100%;
  height: 100%;
}

.pattern-shape {
  position: absolute;
  background: #f1f5f9;
  border-radius: 8px;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 5%;
  transform: rotate(45deg);
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 10%;
  transform: rotate(30deg);
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  transform: rotate(60deg);
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: #3b82f6;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.section-title {
  font-family: "Inter", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

.section-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #64748b;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Auto-Sliding Clients Banner */
.clients-banner {
  margin-bottom: 80px;
  position: relative;
}

.banner-container {
  overflow: hidden;
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 20%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0.9) 100%
  );
  border-radius: 16px;
  padding: 20px 0;
}

.sliding-track {
  display: flex;
  gap: 30px;
  align-items: center;
  transition: transform 0.1s linear;
  width: max-content;
}

.client-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo-container {
  position: relative;
  width: 200px;
  height: 100px;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logo-container:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.25);
}

.client-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #f8fafc;
  border: 3px solid #e2e8f0;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.logo-container:hover .client-image {
  border-color: #3b82f6;
}

.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(59, 130, 246, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 16px;
}

.logo-container:hover .logo-overlay {
  opacity: 1;
}

.client-name {
  color: #ffffff;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 0 12px;
}

/* Banner Controls */
.banner-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.control-btn {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 20px;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.control-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

.pause-btn {
  min-width: 100px;
}

.speed-btn {
  min-width: 80px;
}

.speed-text {
  font-weight: 500;
}

/* Trust Indicators */
.trust-indicators {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.trust-item:hover {
  border-color: #3b82f6;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.trust-icon {
  width: 60px;
  height: 60px;
  background: #eff6ff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.trust-item:hover .trust-icon {
  background: #3b82f6;
  color: #ffffff;
}

.trust-content {
  flex: 1;
}

.trust-number {
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.trust-label {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .clients-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  .logo-container {
    width: 140px;
    height: 70px;
  }
}

@media (max-width: 768px) {
  .simple-social {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .clients-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .logo-container {
    width: 120px;
    height: 60px;
  }

  .trust-indicators {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .trust-item {
    padding: 25px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .simple-social {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .clients-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .logo-container {
    width: 100px;
    height: 50px;
  }

  .trust-item {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .trust-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .trust-number {
    font-size: 1.5rem;
  }

  .header-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
