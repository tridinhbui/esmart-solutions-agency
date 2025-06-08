<template>
  <section class="feats-section">
    <!-- Revolutionary Quantum Background System -->
    <div class="feats-quantum-background">
      <div class="quantum-orb orb-1" />
      <div class="quantum-orb orb-2" />
      <div class="quantum-orb orb-3" />
      <div class="quantum-orb orb-4" />
      <div class="energy-matrix">
        <div class="matrix-grid">
          <div
            v-for="i in 16"
            :key="'cell-'+i"
            class="grid-cell"
          />
        </div>
      </div>
      <div class="floating-development-particles">
        <div
          v-for="i in 12"
          :key="'particle-'+i"
          class="quantum-particle"
        />
      </div>
    </div>
    
    <!-- Revolutionary Title Section -->
    <div class="feats-title-zone">
      <div class="title-quantum-frame">
        <div class="quantum-badge">
          <div class="badge-energy-core" />
          <i class="fas fa-rocket" />
          <span>{{ $t("feats.sectionTitle") }}</span>
          <div class="badge-quantum-trail" />
        </div>
        <h1 class="quantum-feats-title">
          {{ $t("feats.mainTitle") }}
          <div class="title-energy-beam" />
          <div class="title-matrix-scan" />
        </h1>
        <div class="title-quantum-glow" />
      </div>
    </div>

    <!-- Revolutionary Features Quantum Grid -->
    <div class="quantum-feats-container">
      <div 
        v-for="(feat, index) in features" 
        :key="index" 
        class="quantum-feat-portal"
        :data-feat="index"
      >
        <div class="feat-quantum-shell">
          <div class="feat-energy-border" />
          
          <!-- Quantum Feature Icon Portal -->
          <div class="feat-icon-portal">
            <div class="icon-quantum-core">
              <i :class="feat.icon" />
              <div class="icon-energy-ring ring-1" />
              <div class="icon-energy-ring ring-2" />
              <div class="icon-energy-ring ring-3" />
              <div class="icon-energy-ring ring-4" />
            </div>
            <div class="icon-plasma-glow" />
            <div class="icon-hologram-effect" />
          </div>
          
          <!-- Revolutionary Feature Content -->
          <div class="feat-quantum-content">
            <h3 class="feat-title">
              {{ $t(`feats.items.${index}.title`) }}
              <div class="title-energy-underline" />
            </h3>
            <div class="feat-description">
              <span class="quantum-text">{{ $t(`feats.items.${index}.description`) }}</span>
            </div>
            
            <!-- Quantum Feature Tags -->
            <div class="feature-quantum-tags">
              <span
                v-for="tag in feat.tags"
                :key="tag"
                class="quantum-tag"
              >
                <div class="tag-energy-core" />
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Interactive Quantum Elements -->
          <div class="feat-interaction-zone">
            <div class="quantum-ripple" />
            <div class="energy-pulse" />
          </div>
          
          <div class="feat-quantum-field" />
        </div>
      </div>
    </div>
    
    <!-- Revolutionary CTA Portal -->
    <div class="quantum-cta-portal">
      <div class="cta-quantum-frame">
        <div class="cta-energy-border" />
        <div class="cta-content">
          <h3 class="cta-title">
            {{ $t("feats.cta.title") }}
            <div class="cta-title-glow" />
          </h3>
          <p class="cta-description">
            {{ $t("feats.cta.description") }}
          </p>
          <div class="cta-buttons">
            <button
              class="quantum-button primary"
              @click="scrollToContact"
            >
              <div class="button-quantum-core" />
              <span>{{ $t("feats.cta.button") }}</span>
              <div class="button-energy-trail" />
            </button>
            <button
              class="quantum-button secondary"
              @click="learnMore"
            >
              <div class="button-quantum-core" />
              <span>Tìm hiểu thêm</span>
              <div class="button-energy-trail" />
            </button>
          </div>
        </div>
        <div class="cta-quantum-field" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeatsSection",
  data() {
    return {
      features: [
        { 
          icon: "fas fa-cogs",
          tags: ["Drag & Drop", "Visual", "Advanced"]
        },
        { 
          icon: "fas fa-shopping-cart",
          tags: ["E-commerce", "Payments", "Secure"]
        },
        { 
          icon: "fas fa-globe",
          tags: ["Multi-language", "Global", "SEO"]
        },
        { 
          icon: "fas fa-video",
          tags: ["Tutorials", "Learning", "Support"]
        },
        { 
          icon: "fas fa-paint-brush",
          tags: ["Unlimited", "Customizable", "Creative"]
        },
      ],
    };
  },
  mounted() {
    this.initializeQuantumEffects();
    this.setupIntersectionObserver();
    this.startQuantumAnimations();
  },
  beforeUnmount() {
    this.cleanupAnimations();
  },
  methods: {
    getFeatureDescription(index) {
      const descriptions = [
        "Professional visual page builder with quantum interface technology",
        "Advanced e-commerce solution with revolutionary payment integration",
        "Multi-dimensional language support for global digital expansion",
        "Comprehensive video documentation with quantum learning protocols",
        "Infinite color customization with quantum design possibilities"
      ];
      return descriptions[index] || "Revolutionary feature with quantum capabilities";
    },
    
    initializeQuantumEffects() {
      this.createQuantumParticles();
      this.setupHoverEffects();
    },
    
    createQuantumParticles() {
      const container = document.querySelector('.floating-development-particles');
      if (!container) return;
      
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(particle);
      }
    },
    
    setupHoverEffects() {
      const featCards = document.querySelectorAll('.quantum-feat-portal');
      featCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          this.activateQuantumField(card, index);
        });
        
        card.addEventListener('mouseleave', () => {
          this.deactivateQuantumField(card);
        });
      });
    },
    
    activateQuantumField(card, index) {
      card.classList.add('quantum-active');
      const field = card.querySelector('.feat-quantum-field');
      const ripple = card.querySelector('.quantum-ripple');
      
      if (field) {
        field.style.opacity = '1';
        field.style.transform = 'scale(1.1)';
      }
      
      if (ripple) {
        ripple.style.animation = 'quantumRipple 0.8s ease-out';
      }
      
      // Add staggered glow effect
      setTimeout(() => {
        card.style.boxShadow = `0 0 50px rgba(255, 107, 53, 0.${4 + index})`;
      }, 100);
    },
    
    deactivateQuantumField(card) {
      card.classList.remove('quantum-active');
      const field = card.querySelector('.feat-quantum-field');
      
      if (field) {
        field.style.opacity = '0';
        field.style.transform = 'scale(1)';
      }
      
      card.style.boxShadow = 'none';
    },
    
    setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("quantum-reveal");
            
            // Staggered animation for feat cards
            if (entry.target.classList.contains('quantum-feat-portal')) {
              const featIndex = parseInt(entry.target.dataset.feat);
              setTimeout(() => {
                entry.target.classList.add('quantum-animate');
              }, featIndex * 200);
            }
          }
        });
      }, { threshold: 0.2 });

      // Observe all quantum elements
      document.querySelectorAll(".quantum-feat-portal, .feats-title-zone, .quantum-cta-portal").forEach((el) => {
        observer.observe(el);
      });
    },
    
    startQuantumAnimations() {
      // Start matrix grid animation
      const gridCells = document.querySelectorAll('.grid-cell');
      gridCells.forEach((cell, index) => {
        setTimeout(() => {
          cell.classList.add('matrix-active');
        }, index * 50);
      });
    },
    
    cleanupAnimations() {
      // Clean up any running animations or intervals
      const particles = document.querySelectorAll('.floating-development-particles .quantum-particle');
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    },
    
    scrollToContact() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to contact page if section doesn't exist
        this.$router.push('/contact');
      }
    },
    
    learnMore() {
      // Scroll to about us section or navigate to about page
      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.$router.push('/about-us');
      }
    }
  },
};
</script>

<style scoped>
/* Revolutionary CSS Variables */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --quantum-blue: rgba(59, 130, 246, 1);
  --quantum-purple: rgba(139, 92, 246, 1);
  --quantum-green: rgba(34, 197, 94, 1);
  --gradient-magical: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(217, 119, 6, 0.9) 100%);
  --gradient-quantum: linear-gradient(135deg, var(--quantum-blue) 0%, var(--quantum-purple) 50%, var(--primary-color) 100%);
  --gradient-cyber: linear-gradient(135deg, var(--quantum-green) 0%, var(--quantum-blue) 100%);
}

/* Revolutionary Features Section */
.feats-section {
  background: 
    radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgba(28, 28, 76, 1) 0%, rgba(15, 15, 30, 0.95) 100%);
  color: white;
  padding: 120px 2rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Revolutionary Quantum Background */
.feats-quantum-background {
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
  background: var(--gradient-magical);
  filter: blur(60px);
  animation: quantumFloat 15s ease-in-out infinite;
}

.orb-1 {
  width: 350px;
  height: 350px;
  top: 5%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 280px;
  height: 280px;
  top: 70%;
  right: 5%;
  animation-delay: 5s;
  background: var(--gradient-quantum);
}

.orb-3 {
  width: 220px;
  height: 220px;
  bottom: 10%;
  left: 50%;
  animation-delay: 10s;
  background: var(--gradient-cyber);
}

.orb-4 {
  width: 160px;
  height: 160px;
  top: 40%;
  right: 40%;
  animation-delay: 7.5s;
}

.energy-matrix {
  position: absolute;
  width: 100%;
  height: 100%;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 2px;
}

.grid-cell {
  background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.1) 50%, transparent 70%);
  opacity: 0;
  animation: matrixPulse 4s ease-in-out infinite;
  transition: all 0.3s ease;
}

.grid-cell.matrix-active {
  opacity: 1;
}

.grid-cell:nth-child(odd) {
  animation-delay: 0.5s;
}

.grid-cell:nth-child(4n) {
  background: linear-gradient(45deg, transparent 30%, rgba(245, 158, 11, 0.1) 50%, transparent 70%);
  animation-delay: 1s;
}

.floating-development-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: particleFloat 10s linear infinite;
}

/* Revolutionary Title Zone */
.feats-title-zone {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 6rem;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.feats-title-zone.quantum-reveal {
  opacity: 1;
  transform: translateY(0);
}

.title-quantum-frame {
  position: relative;
  display: inline-block;
}

.quantum-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  font-weight: 600;
}

.badge-energy-core {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: energyCorePulse 2s ease-in-out infinite;
}

.badge-quantum-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: badgeShimmer 3s infinite;
}

.quantum-feats-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;
  line-height: 1.2;
}

.title-energy-beam {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 2px;
  animation: beamGlow 3s ease-in-out infinite;
}

.title-matrix-scan {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 30%, rgba(139, 92, 246, 0.4) 70%, transparent 100%);
  animation: matrixScan 5s infinite;
}

.title-quantum-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: var(--gradient-quantum);
  filter: blur(40px);
  opacity: 0.4;
  z-index: -1;
  animation: titleGlowPulse 4s ease-in-out infinite;
}

/* Revolutionary Features Grid */
.quantum-feats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  align-items: stretch;
  max-width: 1600px;
  margin: 0 auto 8rem;
  position: relative;
  z-index: 5;
}

.quantum-feat-portal {
  position: relative;
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.quantum-feat-portal.quantum-reveal {
  opacity: 1;
}

.quantum-feat-portal.quantum-animate {
  transform: translateY(0) scale(1);
}

.feat-quantum-shell {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feat-quantum-shell:hover {
  transform: translateY(-20px) scale(1.05);
  box-shadow: 
    0 40px 80px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(255, 107, 53, 0.4);
  border-color: rgba(255, 107, 53, 0.6);
}

.feat-energy-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--tertiary-color), var(--quantum-blue), var(--primary-color));
  border-radius: 24px;
  z-index: -1;
  animation: borderRotate 8s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feat-quantum-shell:hover .feat-energy-border {
  opacity: 1;
}

.feat-icon-portal {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.icon-quantum-core {
  position: relative;
  width: 120px;
  height: 120px;
  background: var(--gradient-magical);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  z-index: 4;
  animation: iconFloat 5s ease-in-out infinite;
  box-shadow: 0 0 40px rgba(255, 107, 53, 0.5);
}

.icon-energy-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: ringPulse 4s ease-in-out infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ring-1 {
  width: 140px;
  height: 140px;
  border-color: rgba(255, 107, 53, 0.7);
  animation-delay: 0s;
}

.ring-2 {
  width: 160px;
  height: 160px;
  border-color: rgba(245, 158, 11, 0.5);
  animation-delay: 0.5s;
}

.ring-3 {
  width: 180px;
  height: 180px;
  border-color: rgba(217, 119, 6, 0.4);
  animation-delay: 1s;
}

.ring-4 {
  width: 200px;
  height: 200px;
  border-color: rgba(59, 130, 246, 0.3);
  animation-delay: 1.5s;
}

.icon-plasma-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  background: var(--gradient-quantum);
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.3;
  animation: plasmaGlow 5s ease-in-out infinite;
  z-index: 1;
}

.icon-hologram-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
  animation: hologramSpin 8s linear infinite;
  z-index: 2;
}

.feat-quantum-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 5;
}

.feat-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  line-height: 1.4;
}

.title-energy-underline {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 2px;
  animation: underlineGlow 3s ease-in-out infinite;
}

.feat-description {
  margin-bottom: 2rem;
}

.quantum-text {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  font-size: 1.1rem;
}

.feature-quantum-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.quantum-tag {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  color: white;
  font-weight: 500;
  overflow: hidden;
  transition: all 0.3s ease;
}

.quantum-tag:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: rgba(255, 107, 53, 0.5);
  transform: scale(1.05);
}

.tag-energy-core {
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: tagPulse 2s ease-in-out infinite;
}

.feat-interaction-zone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.quantum-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
}

.energy-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.1) 50%, transparent 70%);
  opacity: 0;
  animation: energyPulse 6s ease-in-out infinite;
}

.feat-quantum-field {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.2) 0%, transparent 70%);
  border-radius: 24px;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
  filter: blur(10px);
}

/* Revolutionary CTA Portal */
.quantum-cta-portal {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease-out;
}

.quantum-cta-portal.quantum-reveal {
  opacity: 1;
  transform: translateY(0);
}

.cta-quantum-frame {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  border-radius: 30px;
  padding: 4rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  width: 100%;
}

.cta-energy-border {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: conic-gradient(from 0deg, var(--gradient-magical), var(--gradient-quantum), var(--gradient-cyber), var(--gradient-magical));
  border-radius: 30px;
  z-index: -1;
  animation: ctaBorderRotate 10s linear infinite;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  position: relative;
}

.cta-title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: var(--gradient-magical);
  filter: blur(30px);
  opacity: 0.4;
  z-index: -1;
  animation: ctaGlow 4s ease-in-out infinite;
}

.cta-description {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.quantum-button {
  position: relative;
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 200px;
}

.quantum-button.primary {
  background: var(--gradient-magical);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
}

.quantum-button.secondary {
  background: var(--gradient-quantum);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
}

.quantum-button:hover {
  transform: translateY(-5px) scale(1.05);
}

.quantum-button.primary:hover {
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.6);
}

.quantum-button.secondary:hover {
  box-shadow: 0 15px 40px rgba(59, 130, 246, 0.6);
}

.button-quantum-core {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: buttonCorePulse 2s ease-in-out infinite;
}

.button-energy-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: buttonTrail 3s infinite;
}

.cta-quantum-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.05) 0%, transparent 70%);
  border-radius: 30px;
  animation: ctaFieldPulse 6s ease-in-out infinite;
}

/* Revolutionary Keyframe Animations */
@keyframes quantumFloat {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1); 
    opacity: 0.6; 
  }
  33% { 
    transform: translateY(-50px) translateX(30px) scale(1.1); 
    opacity: 0.8; 
  }
  66% { 
    transform: translateY(40px) translateX(-20px) scale(0.9); 
    opacity: 0.7; 
  }
}

@keyframes matrixPulse {
  0%, 100% { 
    opacity: 0.1; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.05); 
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(0px) translateX(0px) rotate(0deg); 
    opacity: 0.4; 
  }
  25% { 
    transform: translateY(-40px) translateX(20px) rotate(90deg); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-30px) translateX(-15px) rotate(180deg); 
    opacity: 0.6; 
  }
  75% { 
    transform: translateY(-50px) translateX(25px) rotate(270deg); 
    opacity: 0.8; 
  }
  100% { 
    transform: translateY(0px) translateX(0px) rotate(360deg); 
    opacity: 0.4; 
  }
}

@keyframes energyCorePulse {
  0%, 100% { 
    transform: translateY(-50%) scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-50%) scale(1.3); 
    opacity: 0.7; 
  }
}

@keyframes badgeShimmer {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes beamGlow {
  0%, 100% { 
    box-shadow: 0 0 25px rgba(255, 107, 53, 0.6); 
    transform: translateX(-50%) scaleX(1); 
  }
  50% { 
    box-shadow: 0 0 50px rgba(255, 107, 53, 0.9); 
    transform: translateX(-50%) scaleX(1.1); 
  }
}

@keyframes matrixScan {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes titleGlowPulse {
  0%, 100% { 
    opacity: 0.4; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.1); 
  }
}

@keyframes borderRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes iconFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-15px) rotate(5deg); 
  }
}

@keyframes ringPulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 0.7; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1); 
    opacity: 1; 
  }
}

@keyframes plasmaGlow {
  0%, 100% { 
    opacity: 0.3; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: translate(-50%, -50%) scale(1.1); 
  }
}

@keyframes hologramSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes underlineGlow {
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 107, 53, 0.6); 
  }
  50% { 
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.9); 
  }
}

@keyframes tagPulse {
  0%, 100% { 
    opacity: 0.8; 
    transform: translateY(-50%) scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: translateY(-50%) scale(1.1); 
  }
}

@keyframes energyPulse {
  0%, 100% { 
    opacity: 0; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.3; 
    transform: scale(1.05); 
  }
}

@keyframes quantumRipple {
  0% { 
    width: 0; 
    height: 0; 
    opacity: 0.8; 
  }
  100% { 
    width: 400px; 
    height: 400px; 
    opacity: 0; 
  }
}

@keyframes ctaBorderRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes ctaGlow {
  0%, 100% { 
    opacity: 0.4; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.05); 
  }
}

@keyframes buttonCorePulse {
  0%, 100% { 
    opacity: 1; 
    transform: translateY(-50%) scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: translateY(-50%) scale(1.2); 
  }
}

@keyframes buttonTrail {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes ctaFieldPulse {
  0%, 100% { 
    opacity: 0.8; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.02); 
  }
}

/* Revolutionary Responsive Design */
@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
}

@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .quantum-feats-container {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
  }
  
  .quantum-feats-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .feats-section {
    padding: 80px 1.5rem;
  }
  
  .quantum-feats-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .quantum-feats-title {
    font-size: 2.8rem;
  }
  
  .feat-quantum-shell {
    padding: 2.5rem 1.5rem;
    min-height: 350px;
  }
  
  .icon-quantum-core {
    width: 100px;
    height: 100px;
  font-size: 2.5rem;
  }
  
  .cta-quantum-frame {
    padding: 3rem 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .quantum-button {
    width: 100%;
    max-width: 300px;
  }
  
  .orb-3, .orb-4 {
    display: none;
  }
}

@media (max-width: 480px) {
  .feats-section {
    padding: 60px 1rem;
  }
  
  .quantum-feats-title {
    font-size: 2.2rem;
  }
  
  .feat-quantum-shell {
    padding: 2rem 1rem;
    min-height: 320px;
  }
  
  .icon-quantum-core {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .feat-title {
    font-size: 1.3rem;
  }
  
  .quantum-text {
  font-size: 1rem;
  }
  
  .cta-quantum-frame {
    padding: 2.5rem 1.5rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .cta-description {
    font-size: 1.1rem;
  }
  
  .quantum-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .feat-quantum-shell {
    border: 2px solid;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .quantum-badge {
    border: 2px solid;
    background: rgba(255, 255, 255, 0.2);
  }
  
  .quantum-button {
    border: 2px solid white;
  }
}
</style>