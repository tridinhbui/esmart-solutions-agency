<template>
  <!-- Revolutionary Quantum Testimonials Section -->
  <section id="testimonials" class="quantum-testimonials-zone">
    <!-- Revolutionary Quantum Background System -->
    <div class="testimonials-quantum-background">
      <!-- Quantum Orbs System -->
      <div class="testimonials-quantum-orbs">
        <div class="quantum-orb orb-1" />
        <div class="quantum-orb orb-2" />
        <div class="quantum-orb orb-3" />
        <div class="quantum-orb orb-4" />
      </div>

      <!-- Energy Grid System -->
      <div class="testimonials-energy-grid">
        <div class="energy-line line-1" />
        <div class="energy-line line-2" />
        <div class="energy-line line-3" />
        <div class="energy-line line-4" />
        <div class="energy-line line-5" />
        <div class="energy-line line-6" />
        <div class="energy-line line-7" />
        <div class="energy-line line-8" />
      </div>

      <!-- Floating Quantum Particles -->
      <div class="testimonials-floating-particles">
        <div v-for="i in 12" :key="'particle-' + i" class="quantum-particle" />
      </div>
    </div>

    <!-- Revolutionary Title Zone -->
    <div
      class="testimonials-title-zone animate-fadeIn"
      data-aos="fade-down"
      data-aos-delay="100"
    >
      <!-- Quantum Badge -->
      <div class="testimonials-quantum-badge">
        <div class="badge-energy-core" />
        <i class="fas fa-comments" />
        <span>Khách Hàng Nói Gì</span>
        <div class="badge-quantum-ring" />
      </div>

      <!-- Revolutionary Title -->
      <h2
        class="testimonials-revolutionary-title animate-slideIn"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <span class="title-main">Khách Hàng Nói Gì</span>
        <div class="title-energy-beams">
          <div class="energy-beam beam-1" />
          <div class="energy-beam beam-2" />
          <div class="energy-beam beam-3" />
        </div>
        <div class="title-hologram-effect" />
      </h2>
    </div>

    <!-- Simplified Testimonials Container - Single Row Moving -->
    <div
      class="testimonials-simple-container"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <div ref="testimonialTrack" class="testimonials-track scroller__inner">
        <!-- First set of testimonials -->
        <div
          v-for="(testimonial, index) in testimonials"
          :key="'first-' + index"
          class="testimonial-card"
        >
          <!-- Simple Card -->
          <div class="card-simple">
            <!-- Avatar -->
            <div class="avatar-container">
              <img
                :src="getImageUrl(testimonial.image)"
                :alt="testimonial.name"
                class="avatar-image"
              />
            </div>

            <!-- Customer Info -->
            <div class="customer-info">
              <h3 class="customer-name">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".name")
                }}
              </h3>
              <h4 class="customer-title">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".title")
                }}
              </h4>

              <!-- Simple Stars -->
              <div class="stars-container">
                <i v-for="n in 5" :key="n" class="fas fa-star star-icon" />
              </div>
            </div>

            <!-- Testimonial Content -->
            <div class="testimonial-content">
              <p class="testimonial-text">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".text")
                }}
              </p>
            </div>
          </div>
        </div>

        <!-- Duplicate testimonials for seamless infinite scroll -->
        <div
          v-for="(testimonial, index) in testimonials"
          :key="'duplicate-' + index"
          class="testimonial-card"
        >
          <!-- Simple Card -->
          <div class="card-simple">
            <!-- Avatar -->
            <div class="avatar-container">
              <img
                :src="getImageUrl(testimonial.image)"
                :alt="testimonial.name"
                class="avatar-image"
              />
            </div>

            <!-- Customer Info -->
            <div class="customer-info">
              <h3 class="customer-name">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".name")
                }}
              </h3>
              <h4 class="customer-title">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".title")
                }}
              </h4>

              <!-- Simple Stars -->
              <div class="stars-container">
                <i v-for="n in 5" :key="n" class="fas fa-star star-icon" />
              </div>
            </div>

            <!-- Testimonial Content -->
            <div class="testimonial-content">
              <p class="testimonial-text">
                {{
                  $t("socialProof.testimonial" + testimonial.index + ".text")
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialQuote",
  data() {
    return {
      translateX: 0,
    };
  },
  computed: {
    testimonials() {
      // Get testimonials from translation data
      return [
        { image: "testimonial1.jpg", index: 1 },
        { image: "testimonial2.jpg", index: 2 },
        { image: "testimonial3.jpg", index: 3 },
        { image: "testimonial4.jpg", index: 4 },
        { image: "testimonial5.jpg", index: 5 },
        { image: "testimonial6.jpg", index: 6 },
      ];
    },
    trackWidth() {
      return this.testimonials.length * 380; // Updated for larger quantum cards
    },
  },
  mounted() {
    this.startAutoSlide();
    const scroller = this.$refs.scroller;
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      scroller
    ) {
      if (!scroller.getAttribute("data-cloned")) {
        scroller.setAttribute("data-animated", true);
        scroller.setAttribute("data-cloned", "true");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    }
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
    startAutoSlide() {
      setInterval(() => {
        this.translateX += 1;
        if (this.translateX >= this.trackWidth) {
          this.translateX = 0;
        }
      }, 16); // ~60fps
    },
  },
};
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

/* Enhanced CSS Variables with Quantum Theme */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --quantum-blue: rgba(59, 130, 246, 1);
  --quantum-purple: rgba(139, 92, 246, 1);
  --quantum-green: rgba(34, 197, 94, 1);
  --gradient-magical: linear-gradient(
    135deg,
    rgba(255, 107, 53, 0.9) 0%,
    rgba(245, 158, 11, 0.8) 50%,
    rgba(217, 119, 6, 0.9) 100%
  );
  --gradient-primary: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  --gradient-secondary: linear-gradient(
    135deg,
    var(--secondary-color) 0%,
    var(--tertiary-color) 100%
  );
  --gradient-tertiary: linear-gradient(
    135deg,
    var(--tertiary-color) 0%,
    var(--primary-color) 100%
  );
  --gradient-quantum: linear-gradient(
    135deg,
    var(--quantum-blue) 0%,
    var(--quantum-purple) 50%,
    var(--primary-color) 100%
  );
  --gradient-cyber: linear-gradient(
    135deg,
    var(--quantum-green) 0%,
    var(--quantum-blue) 100%
  );
  --success-color: var(--quantum-green);
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}

/* Revolutionary Quantum Testimonials Section */
.quantum-testimonials-zone {
  position: relative;
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Revolutionary Quantum Background System */
.testimonials-quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

/* Quantum Orbs System */
.testimonials-quantum-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-magical);
  filter: blur(40px);
  animation: quantumOrbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 20%;
  right: 10%;
  background: var(--gradient-cyber);
  animation-delay: 2s;
}

.orb-3 {
  width: 180px;
  height: 180px;
  bottom: 15%;
  left: 15%;
  background: var(--gradient-quantum);
  animation-delay: 4s;
}

.orb-4 {
  width: 120px;
  height: 120px;
  bottom: 25%;
  right: 20%;
  animation-delay: 6s;
}

/* Energy Grid System */
.testimonials-energy-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-line {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--quantum-blue) 50%,
    transparent 100%
  );
  height: 1px;
  animation: energyLineFlow 4s linear infinite;
  opacity: 0.6;
}

.line-1 {
  top: 10%;
  width: 40%;
  left: 0;
  animation-delay: 0s;
}
.line-2 {
  top: 25%;
  width: 60%;
  right: 0;
  animation-delay: 0.5s;
}
.line-3 {
  top: 40%;
  width: 35%;
  left: 30%;
  animation-delay: 1s;
}
.line-4 {
  top: 55%;
  width: 50%;
  right: 0;
  animation-delay: 1.5s;
}
.line-5 {
  top: 70%;
  width: 45%;
  left: 0;
  animation-delay: 2s;
}
.line-6 {
  top: 85%;
  width: 55%;
  right: 10%;
  animation-delay: 2.5s;
}
.line-7 {
  left: 20%;
  height: 30%;
  width: 1px;
  top: 0;
  background: linear-gradient(
    0deg,
    transparent 0%,
    var(--quantum-green) 50%,
    transparent 100%
  );
  animation-delay: 3s;
}
.line-8 {
  right: 25%;
  height: 25%;
  width: 1px;
  bottom: 0;
  background: linear-gradient(
    0deg,
    transparent 0%,
    var(--primary-color) 50%,
    transparent 100%
  );
  animation-delay: 3.5s;
}

/* Floating Quantum Particles */
.testimonials-floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: quantumParticleFloat 6s linear infinite;
  box-shadow: 0 0 10px var(--primary-color);
}

.quantum-particle:nth-child(1) {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}
.quantum-particle:nth-child(2) {
  top: 20%;
  left: 80%;
  animation-delay: 0.5s;
}
.quantum-particle:nth-child(3) {
  top: 30%;
  left: 30%;
  animation-delay: 1s;
}
.quantum-particle:nth-child(4) {
  top: 40%;
  right: 20%;
  animation-delay: 1.5s;
}
.quantum-particle:nth-child(5) {
  top: 50%;
  left: 60%;
  animation-delay: 2s;
}
.quantum-particle:nth-child(6) {
  top: 60%;
  right: 40%;
  animation-delay: 2.5s;
}
.quantum-particle:nth-child(7) {
  top: 70%;
  left: 20%;
  animation-delay: 3s;
}
.quantum-particle:nth-child(8) {
  top: 80%;
  right: 10%;
  animation-delay: 3.5s;
}
.quantum-particle:nth-child(9) {
  bottom: 20%;
  left: 50%;
  animation-delay: 4s;
}
.quantum-particle:nth-child(10) {
  bottom: 30%;
  right: 60%;
  animation-delay: 4.5s;
}
.quantum-particle:nth-child(11) {
  bottom: 10%;
  left: 70%;
  animation-delay: 5s;
}
.quantum-particle:nth-child(12) {
  bottom: 15%;
  right: 30%;
  animation-delay: 5.5s;
}

/* Revolutionary Title Zone */
.testimonials-title-zone {
  position: relative;
  z-index: 3;
  text-align: center;
  margin-bottom: 4rem;
}

/* Quantum Badge */
.testimonials-quantum-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 50px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  overflow: hidden;
}

.badge-energy-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  border-radius: 50px;
  opacity: 0.2;
  animation: badgeEnergyPulse 3s ease-in-out infinite;
}

.badge-quantum-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--quantum-blue);
  border-radius: 50px;
  animation: badgeRingRotate 4s linear infinite;
  opacity: 0.8;
}

/* Revolutionary Title */
.testimonials-revolutionary-title {
  position: relative;
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.title-main {
  position: relative;
  z-index: 2;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.5));
}

.title-energy-beams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.energy-beam {
  position: absolute;
  width: 200px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--quantum-blue) 50%,
    transparent 100%
  );
  animation: energyBeamPulse 2s ease-in-out infinite;
}

.beam-1 {
  top: 20%;
  left: -50px;
  animation-delay: 0s;
}

.beam-2 {
  bottom: 20%;
  right: -50px;
  animation-delay: 0.7s;
}

.beam-3 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  animation-delay: 1.4s;
}

.title-hologram-effect {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-cyber);
  border-radius: 10px;
  filter: blur(30px);
  opacity: 0.3;
  animation: hologramFlicker 3s ease-in-out infinite;
  z-index: -1;
}

/* Simplified Testimonials Container - Single Row Moving */
.testimonials-simple-container {
  position: relative;
  z-index: 2;
  max-width: 100%;
  overflow: hidden;
  margin: 0 auto;
  mask: linear-gradient(
    90deg,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(
    90deg,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.testimonials-track {
  display: flex;
  gap: 2rem;
  animation: testimonialSmoothSlide 40s linear infinite;
  will-change: transform;
  width: max-content;
}

/* Smooth Left to Right Infinite Slide */
@keyframes testimonialSmoothSlide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Revolutionary Testimonial Cards */
.testimonial-card {
  width: 360px;
  flex-shrink: 0;
  margin: 1rem;
  position: relative;
  animation: none; /* Remove complex animations */
}

.card-simple {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* Ensure proper height and text wrapping */
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: visible;
}

.shell-energy-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background: var(--gradient-magical);
  padding: 2px;
  z-index: -1;
}

.shell-energy-border::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 22px;
}

/* Avatar Portal */
.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 107, 53, 0.5);
  position: relative;
  z-index: 2;
  transition: all 0.4s ease;
}

/* Customer Info Zone */
.customer-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.customer-name {
  position: relative;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
}

.customer-title {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem;
  font-weight: 500;
}

/* Simple Stars System */
.stars-container {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin: 0.5rem 0;
}

.star-icon {
  color: var(--secondary-color);
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

/* Testimonial Content Zone */
.testimonial-content {
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 120px;
  margin-top: 1rem;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  position: relative;
  z-index: 2;
  font-style: italic;
  /* Ensure proper text wrapping */
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  hyphens: auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 1rem 0;
}

/* Card Energy Effects */
.card-energy-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.energy-pulse {
  position: absolute;
  border: 2px solid var(--quantum-blue);
  border-radius: 50%;
  animation: energyPulseExpand 3s ease-out infinite;
  opacity: 0;
}

.pulse-1 {
  top: 20%;
  left: 20%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.pulse-2 {
  bottom: 30%;
  right: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 1s;
  border-color: var(--quantum-green);
}

.pulse-3 {
  top: 60%;
  left: 80%;
  width: 18px;
  height: 18px;
  animation-delay: 2s;
  border-color: var(--primary-color);
}

/* Magic Particles */
.card-magic-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.magic-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: magicParticleOrbit 8s linear infinite;
  box-shadow: 0 0 8px var(--primary-color);
}

.magic-particle:nth-child(1) {
  top: 15%;
  left: 85%;
  animation-delay: 0s;
}
.magic-particle:nth-child(2) {
  top: 25%;
  right: 85%;
  animation-delay: 1.3s;
}
.magic-particle:nth-child(3) {
  bottom: 35%;
  right: 80%;
  animation-delay: 2.6s;
}
.magic-particle:nth-child(4) {
  bottom: 25%;
  left: 80%;
  animation-delay: 3.9s;
}
.magic-particle:nth-child(5) {
  top: 45%;
  left: 85%;
  animation-delay: 5.2s;
}
.magic-particle:nth-child(6) {
  bottom: 15%;
  right: 90%;
  animation-delay: 6.5s;
}

/* Card Hover Effects */
.card-simple:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: var(--primary-color);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.2),
    0 0 20px rgba(59, 130, 246, 0.1), inset 0 0 15px rgba(255, 107, 53, 0.05);
}

.card-simple:hover .avatar-image {
  transform: scale(1.05);
  border-color: var(--primary-color);
}

.card-simple:hover .star-icon {
  color: var(--primary-color);
  transform: scale(1.1);
}

.card-simple:hover .testimonial-text {
  opacity: 0.3;
  animation-duration: 3s;
}

/* Scroller Animation */
.scroller {
  max-width: 100%;
}

.scroller__inner {
  padding-block: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.scroller[data-animated="true"] {
  overflow: hidden;
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: testimonialScroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction="right"] {
  --_animation-direction: reverse;
}

.scroller[data-direction="left"] {
  --_animation-direction: forwards;
}

.scroller[data-speed="fast"] {
  --_animation-duration: 30s;
}

.scroller[data-speed="slow"] {
  --_animation-duration: 80s;
}

/* Animation Keyframes */
@keyframes quantumOrbFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
    opacity: 1;
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
    opacity: 0.7;
  }
}

@keyframes energyLineFlow {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%);
    opacity: 0;
  }
}

@keyframes quantumParticleFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-15px) scale(1.2);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
}

@keyframes badgeEnergyPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

@keyframes badgeRingRotate {
  0% {
    transform: rotate(0deg);
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.8;
  }
}

@keyframes energyBeamPulse {
  0%,
  100% {
    opacity: 0;
    transform: scaleX(0);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes hologramFlicker {
  0%,
  100% {
    opacity: 0.3;
  }
  25%,
  75% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes starTwinkle {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

@keyframes energyPulseExpand {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes magicParticleOrbit {
  0% {
    transform: rotate(0deg) translateX(15px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(15px) rotate(-360deg);
  }
}

@keyframes testimonialScroll {
  to {
    transform: translate(calc(-50% - 1rem));
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .quantum-testimonials-zone {
    padding: 6rem 1.5rem;
  }

  .testimonials-revolutionary-title {
    font-size: 3rem;
  }

  .testimonial-card {
    width: 320px;
  }

  .card-simple {
    padding: 1.5rem;
    min-height: 380px;
  }
  .testimonial-text {
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .quantum-testimonials-zone {
    padding: 4rem 1rem;
    min-height: auto;
  }
  .testimonials-title-zone {
    margin-bottom: 2rem;
  }
  .testimonials-revolutionary-title {
    font-size: 1.8rem;
    padding: 0 1rem;
  }
  .testimonials-quantum-badge {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  .testimonials-simple-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
  .testimonials-track {
    gap: 1.5rem;
    min-width: auto;
  }
  .testimonial-card {
    width: 280px;
    min-width: 280px;
    max-width: 320px;
  }
  .card-simple {
    padding: 1.5rem 1rem;
    min-height: 350px;
  }
  .testimonial-text {
    font-size: 0.9rem;
    line-height: 1.5;
    padding: 0.8rem 0;
    text-align: center;
  }
  .avatar-container {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  .avatar-image {
    width: 60px;
    height: 60px;
  }
  .avatar-container {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  .avatar-image {
    width: 60px;
    height: 60px;
  }
  .customer-name {
    font-size: 1.1rem;
  }
  .customer-title {
    font-size: 0.9rem;
  }
  .testimonial-text {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .star-icon {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .quantum-testimonials-zone {
    padding: 3rem 0.5rem;
  }
  .testimonials-revolutionary-title {
    font-size: 1.4rem;
    padding: 0 0.5rem;
  }
  .testimonials-quantum-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .testimonials-simple-container {
    margin: 0;
    width: 100%;
    max-width: 100%;
  }
  .testimonials-track {
    gap: 1rem;
    min-width: auto;
  }
  .testimonial-card {
    width: 240px;
    min-width: 240px;
    max-width: 280px;
  }
  .card-simple {
    padding: 1rem;
  }
  .avatar-container {
    width: 50px;
    height: 50px;
    margin-bottom: 0.8rem;
  }
  .avatar-image {
    width: 50px;
    height: 50px;
  }
  .customer-name {
    font-size: 1rem;
  }
  .customer-title {
    font-size: 0.85rem;
  }
  .testimonial-text {
    font-size: 0.85rem;
    line-height: 1.4;
  }
  .star-icon {
    font-size: 0.9rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .card-simple {
    border: 2px solid white;
    background: rgba(0, 0, 0, 0.9);
  }

  .testimonials-revolutionary-title .title-main {
    -webkit-text-fill-color: white;
  }
}

/* Add fallback .animate-in CSS for fade/slide/zoom */
.animate-in,
.animate-fadeIn {
  opacity: 1 !important;
  transform: none !important;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.animate-slideIn {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition: opacity 0.8s, transform 0.8s;
}
.animate-zoomIn {
  opacity: 1 !important;
  transform: scale(1) !important;
  transition: opacity 0.8s, transform 0.8s;
}

/* New styles for glowing border and holographic shimmer */
.card-simple::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  pointer-events: none;
  background: linear-gradient(
    120deg,
    rgba(255, 107, 53, 0.15) 0%,
    rgba(245, 158, 11, 0.12) 50%,
    rgba(59, 130, 246, 0.1) 100%
  );
  opacity: 0.7;
  z-index: 2;
  animation: cardShimmer 3s linear infinite;
}
.card-simple:hover,
.card-simple.in-view {
  box-shadow: 0 0 40px 10px rgba(255, 107, 53, 0.25),
    0 0 80px 20px rgba(59, 130, 246, 0.12);
  border-color: var(--primary-color);
}
.card-simple .avatar-container {
  animation: avatarFloat 3s ease-in-out infinite;
}
@keyframes cardShimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}
@keyframes avatarFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

/* Parallax for orbs/particles */
.testimonials-quantum-orbs,
.testimonials-floating-particles {
  will-change: transform;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
