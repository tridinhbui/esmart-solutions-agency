<template>
  <section class="revolutionary-about">
    <!-- Quantum Background System -->
    <div class="about-quantum-field">
      <div class="quantum-orb orb-about-1" />
      <div class="quantum-orb orb-about-2" />
      <div class="quantum-orb orb-about-3" />
      <div class="quantum-orb orb-about-4" />
    </div>
    
    <!-- Energy Grid -->
    <div class="about-energy-grid">
      <div
        v-for="i in 6"
        :key="i"
        class="energy-line"
      />
    </div>
    
    <!-- Floating Particles -->
    <div class="about-particles">
      <div
        v-for="i in 12"
        :key="i"
        class="quantum-particle"
      />
    </div>
    
    <div class="about-container">
      <!-- Revolutionary Title Section -->
      <div class="quantum-title-section">
        <div class="title-hologram">
          <h2 class="quantum-about-title">
            {{ $t("AboutUs.title") }}
          </h2>
          <div class="title-energy-field" />
          <div class="title-quantum-glow" />
        </div>
      </div>
      
      <!-- Enhanced Content Grid -->
      <div class="quantum-content-grid">
        <div class="content-quantum-card">
          <div class="card-energy-frame">
            <div class="energy-border top" />
            <div class="energy-border right" />
            <div class="energy-border bottom" />
            <div class="energy-border left" />
          </div>
          <div class="card-content">
            <p class="quantum-text">
              {{ $t("AboutUs.description1") }}
            </p>
            <div class="text-quantum-glow" />
          </div>
        </div>
        
        <div class="content-quantum-card">
          <div class="card-energy-frame">
            <div class="energy-border top" />
            <div class="energy-border right" />
            <div class="energy-border bottom" />
            <div class="energy-border left" />
          </div>
          <div class="card-content">
            <p class="quantum-text">
              {{ $t("AboutUs.description2") }}
            </p>
            <div class="text-quantum-glow" />
          </div>
        </div>
        
        <div class="content-quantum-card">
          <div class="card-energy-frame">
            <div class="energy-border top" />
            <div class="energy-border right" />
            <div class="energy-border bottom" />
            <div class="energy-border left" />
          </div>
          <div class="card-content">
            <p class="quantum-text">
              {{ $t("AboutUs.description3") }}
            </p>
            <div class="text-quantum-glow" />
          </div>
        </div>
      </div>
      
      <!-- Revolutionary Slideshow Portal -->
      <div class="quantum-slideshow-portal">
        <div class="portal-frame">
          <div class="portal-energy-ring ring-1" />
          <div class="portal-energy-ring ring-2" />
          <div class="portal-energy-ring ring-3" />
          <div class="portal-energy-ring ring-4" />
        </div>
        
        <div class="quantum-slideshow">
          <div class="slideshow-quantum-container">
            <img
              v-for="(image, index) in images"
              :key="index"
              :src="image.src"
              :alt="image.alt"
              class="quantum-image"
              :class="{ 'quantum-active': currentIndex === index }"
            >
            <div class="image-quantum-overlay" />
            <div class="image-energy-field" />
          </div>
          
          <!-- Quantum Navigation -->
          <div class="quantum-navigation">
            <div
              v-for="(image, index) in images" 
              :key="'nav-' + index" 
              class="quantum-nav-indicator"
              :class="{ 'active': currentIndex === index }"
              @click="currentIndex = index"
            >
              <div class="nav-quantum-core" />
              <div class="nav-energy-pulse" />
            </div>
          </div>
        </div>
        
        <div class="portal-energy-streams">
          <div
            v-for="i in 8"
            :key="i"
            class="energy-stream"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      currentIndex: 0,
      // Make sure these alt texts are defined in your locale files
      images: [
        { src: require("@/assets/esmart_end.jpg"), alt: this.$t("AboutUs.imageAlt", "Esmart End Image") },
        { src: require("@/assets/esmart_start.jpg"), alt: this.$t("AboutUs.imageAlt1", "Esmart Start Image") },
        { src: require("@/assets/logo.png"), alt: this.$t("AboutUs.imageAlt2", "Logo Image") },
      ],
      // Add default values for alt text just in case translation fails
    };
  },
  mounted() {
    // Start the auto-slide when the component is mounted
    this.startAutoSlide();
  },
  beforeUnmount() { // Replaced beforeDestroy with beforeUnmount
    // Clear the interval when the component is unmounted to prevent memory leaks
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoSlide() {
      // Start the interval to call nextSlide every 2 seconds (2000 milliseconds)
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 2000);
    },
  },

};
</script>

<style scoped>
/* Revolutionary About Section */
.revolutionary-about {
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(28, 28, 76, 1) 0%, rgba(15, 15, 30, 0.95) 100%);
  color: white;
  padding: 120px 2rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Keep pseudo-element if desired, ensure it doesn't interfere */
.about::after {
  content: "";
  /* background-image: url(...); */ /* Add your pattern here if needed */
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.1; /* Reduced opacity further */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* Ensure it's behind content */
}

/* Ensure content is above the pseudo-element */
h2, p, .slideshow-container {
  position: relative;
  z-index: 1;
}


h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 1.5rem; /* Slightly reduced margin */
  max-width: 800px; /* Limit paragraph width for readability */
  margin-left: auto;
  margin-right: auto;
}

.slideshow-container {
  position: relative;
  /* Use a max-width for better control than percentage */
  max-width: 900px;
  width: 90%; /* Use width percentage for responsiveness */
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 15px; /* Optional: round the container corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Optional: add shadow */
}

.slideshow {
  position: relative;
  width: 100%;
  height: 400px;
  /* Control height using aspect-ratio instead of fixed pixels */
  aspect-ratio: 16 / 9; /* Adjust (e.g., 4 / 3, 1 / 1) based on your image shapes */
  /* Remove fixed height: height: 1000px; */
  background-color: #333; /* Add a background for loading/transition */
}

.about-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s ease-in-out, transform 0.5s ease;
  filter: brightness(1.1);
  opacity: 0;
  z-index: 0;
}

.about-image.active {
  opacity: 1;
  z-index: 1;
}

.about-image.active:hover {
  transform: scale(1.05);
}

/* Removed the hover effect that shrinks the image as it might be distracting */
/* .about-image:hover { ... } */

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white;
  border: none;
  padding: 0.6rem 1.1rem; /* Slightly adjusted padding */
  cursor: pointer;
  font-size: 1.8rem; /* Slightly larger arrows */
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 2; /* Ensure arrows are above images */
}

.arrow:hover {
  background-color: rgba(0, 0, 0, 0.8); /* Darker on hover */
}

.left-arrow {
  left: 15px; /* Adjusted position */
}

.right-arrow {
  right: 15px; /* Adjusted position */
}

/* Add media query for smaller screens if needed */
@media (max-width: 600px) {
  .slideshow-container {
    width: 95%;
  }
  .arrow {
    font-size: 1.5rem;
    padding: 0.4rem 0.9rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  p {
    font-size: 15px;
  }
}

/* Quantum Background System */
.about-quantum-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: quantumOrbitFloat 20s ease-in-out infinite;
}

.orb-about-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.6), rgba(245, 158, 11, 0.3), transparent 70%);
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.orb-about-2 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.6), rgba(217, 119, 6, 0.3), transparent 70%);
  bottom: 20%;
  right: 10%;
  animation-delay: 5s;
}

.orb-about-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at 30% 30%, rgba(217, 119, 6, 0.6), rgba(255, 107, 53, 0.3), transparent 70%);
  top: 50%;
  right: 5%;
  animation-delay: 10s;
}

.orb-about-4 {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.6), rgba(255, 107, 53, 0.3), transparent 70%);
  bottom: 40%;
  left: 20%;
  animation-delay: 15s;
}

/* Energy Grid System */
.about-energy-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.energy-line {
  position: absolute;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.8), transparent);
  animation: energyPulse 4s ease-in-out infinite;
}

.energy-line:nth-child(1) { top: 16.67%; animation-delay: 0s; }
.energy-line:nth-child(2) { top: 33.33%; animation-delay: 0.7s; }
.energy-line:nth-child(3) { top: 50%; animation-delay: 1.4s; }
.energy-line:nth-child(4) { top: 66.67%; animation-delay: 2.1s; }
.energy-line:nth-child(5) { top: 83.33%; animation-delay: 2.8s; }
.energy-line:nth-child(6) { top: 100%; animation-delay: 3.5s; }

/* Floating Particles */
.about-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.quantum-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 107, 53, 1), rgba(245, 158, 11, 0.8), transparent);
  border-radius: 50%;
  animation: particleFloat 12s linear infinite;
}

.quantum-particle:nth-child(1) { left: 8.33%; animation-delay: 0s; }
.quantum-particle:nth-child(2) { left: 16.67%; animation-delay: 1s; }
.quantum-particle:nth-child(3) { left: 25%; animation-delay: 2s; }
.quantum-particle:nth-child(4) { left: 33.33%; animation-delay: 3s; }
.quantum-particle:nth-child(5) { left: 41.67%; animation-delay: 4s; }
.quantum-particle:nth-child(6) { left: 50%; animation-delay: 5s; }
.quantum-particle:nth-child(7) { left: 58.33%; animation-delay: 6s; }
.quantum-particle:nth-child(8) { left: 66.67%; animation-delay: 7s; }
.quantum-particle:nth-child(9) { left: 75%; animation-delay: 8s; }
.quantum-particle:nth-child(10) { left: 83.33%; animation-delay: 9s; }
.quantum-particle:nth-child(11) { left: 91.67%; animation-delay: 10s; }
.quantum-particle:nth-child(12) { left: 100%; animation-delay: 11s; }

/* Main Container */
.about-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
}

/* Revolutionary Title Section */
.quantum-title-section {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.title-hologram {
  position: relative;
  display: inline-block;
}

.quantum-about-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;
  animation: titleQuantumGlow 3s ease-in-out infinite alternate;
}

.title-energy-field {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: 
    radial-gradient(ellipse at top, rgba(255, 107, 53, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at bottom, rgba(245, 158, 11, 0.3) 0%, transparent 50%);
  z-index: -1;
  filter: blur(20px);
  animation: titleEnergyPulse 4s ease-in-out infinite;
}

.title-quantum-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: 
    conic-gradient(from 0deg, transparent, rgba(255, 107, 53, 0.2), transparent, rgba(245, 158, 11, 0.2), transparent);
  z-index: -2;
  animation: quantumSpin 8s linear infinite;
  filter: blur(30px);
}

/* Quantum Content Grid */
.quantum-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 5rem;
}

.content-quantum-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.content-quantum-card:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 50px rgba(255, 107, 53, 0.2);
}

.card-energy-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.energy-border {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.6), transparent);
  opacity: 0;
  animation: borderEnergy 3s ease-in-out infinite;
}

.energy-border.top {
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  animation-delay: 0s;
}

.energy-border.right {
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(255, 107, 53, 0.6), transparent);
  animation-delay: 0.75s;
}

.energy-border.bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  animation-delay: 1.5s;
}

.energy-border.left {
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(255, 107, 53, 0.6), transparent);
  animation-delay: 2.25s;
}

.card-content {
  position: relative;
  z-index: 2;
}

.quantum-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.text-quantum-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
  z-index: -1;
  filter: blur(20px);
  animation: textGlowPulse 4s ease-in-out infinite;
}

/* Revolutionary Slideshow Portal */
.quantum-slideshow-portal {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.portal-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  pointer-events: none;
}

.portal-energy-ring {
  position: absolute;
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 50%;
  animation: portalRingSpin 12s linear infinite;
}

.portal-energy-ring.ring-1 {
  width: 100%;
  height: 100%;
  animation-delay: 0s;
  border-color: rgba(255, 107, 53, 0.4);
}

.portal-energy-ring.ring-2 {
  width: 85%;
  height: 85%;
  top: 7.5%;
  left: 7.5%;
  animation-delay: 3s;
  border-color: rgba(245, 158, 11, 0.4);
}

.portal-energy-ring.ring-3 {
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  animation-delay: 6s;
  border-color: rgba(217, 119, 6, 0.4);
}

.portal-energy-ring.ring-4 {
  width: 55%;
  height: 55%;
  top: 22.5%;
  left: 22.5%;
  animation-delay: 9s;
  border-color: rgba(255, 107, 53, 0.5);
}

.quantum-slideshow {
  width: 600px;
  height: 400px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.slideshow-quantum-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.quantum-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
}

.quantum-image.quantum-active {
  opacity: 1;
  transform: scale(1.05);
}

.image-quantum-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(245, 158, 11, 0.1));
  z-index: 1;
  pointer-events: none;
}

.image-energy-field {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: 
    linear-gradient(45deg, rgba(255, 107, 53, 0.3) 0%, transparent 50%, rgba(245, 158, 11, 0.3) 100%);
  z-index: -1;
  filter: blur(15px);
  animation: imageEnergyPulse 3s ease-in-out infinite;
}

/* Quantum Navigation */
.quantum-navigation {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
}

.quantum-nav-indicator {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 107, 53, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.quantum-nav-indicator.active {
  background: rgba(255, 107, 53, 0.8);
  border-color: rgba(255, 107, 53, 1);
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
}

.nav-quantum-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.quantum-nav-indicator.active .nav-quantum-core {
  background: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.nav-energy-pulse {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 50%;
  animation: navPulse 2s ease-in-out infinite;
  opacity: 0;
}

.quantum-nav-indicator.active .nav-energy-pulse {
  opacity: 1;
}

.portal-energy-streams {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.energy-stream {
  position: absolute;
  width: 2px;
  height: 50px;
  background: linear-gradient(180deg, rgba(255, 107, 53, 0.8), transparent);
  animation: streamFlow 4s linear infinite;
  transform-origin: center bottom;
}

.energy-stream:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; transform: rotate(45deg); }
.energy-stream:nth-child(2) { top: 20%; right: 25%; animation-delay: 0.5s; transform: rotate(-30deg); }
.energy-stream:nth-child(3) { bottom: 30%; left: 15%; animation-delay: 1s; transform: rotate(60deg); }
.energy-stream:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 1.5s; transform: rotate(-45deg); }
.energy-stream:nth-child(5) { top: 50%; left: 10%; animation-delay: 2s; transform: rotate(15deg); }
.energy-stream:nth-child(6) { top: 40%; right: 15%; animation-delay: 2.5s; transform: rotate(-60deg); }
.energy-stream:nth-child(7) { bottom: 40%; left: 30%; animation-delay: 3s; transform: rotate(30deg); }
.energy-stream:nth-child(8) { bottom: 50%; right: 30%; animation-delay: 3.5s; transform: rotate(-15deg); }

/* Revolutionary Animations */
@keyframes quantumOrbitFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.6;
  }
  33% {
    transform: translateY(-30px) rotate(120deg) scale(1.1);
    opacity: 0.8;
  }
  66% {
    transform: translateY(-50px) rotate(240deg) scale(0.9);
    opacity: 0.4;
  }
}

@keyframes energyPulse {
  0%, 100% {
    opacity: 0.1;
    transform: scaleX(0);
  }
  50% {
    opacity: 0.8;
    transform: scaleX(1);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) scale(1) rotate(36deg);
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) scale(1.2) rotate(324deg);
  }
  100% {
    transform: translateY(-10vh) scale(0) rotate(360deg);
    opacity: 0;
  }
}

@keyframes titleQuantumGlow {
  0% {
    text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  }
  100% {
    text-shadow: 0 0 40px rgba(255, 107, 53, 0.8), 0 0 60px rgba(245, 158, 11, 0.5);
  }
}

@keyframes titleEnergyPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes quantumSpin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes borderEnergy {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes textGlowPulse {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
}

@keyframes portalRingSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes imageEnergyPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes navPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
}

@keyframes streamFlow {
  0% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-25px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(0.8);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .quantum-content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .quantum-slideshow {
    width: 500px;
    height: 333px;
  }
  
  .portal-frame {
    width: 140%;
    height: 140%;
  }
}

@media (max-width: 768px) {
  .revolutionary-about {
    padding: 80px 1rem;
  }
  
  .quantum-about-title {
    font-size: 2.5rem;
  }
  
  .content-quantum-card {
    padding: 2rem;
  }
  
  .quantum-slideshow {
    width: 100%;
    max-width: 400px;
    height: 266px;
  }
}

@media (max-width: 480px) {
  .revolutionary-about {
    padding: 60px 1rem;
  }
  
  .quantum-about-title {
    font-size: 2rem;
  }
  
  .quantum-text {
    font-size: 1.1rem;
  }
  
  .quantum-slideshow {
    height: 250px;
  }
  
  .quantum-navigation {
    bottom: 15px;
  }
  
  .quantum-nav-indicator {
    width: 12px;
    height: 12px;
  }
}
</style>