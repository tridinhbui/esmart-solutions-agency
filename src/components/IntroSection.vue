<template>
  <section class="hero">
    <!-- Revolutionary animated background with breakthrough design -->
    <div class="hero-background">
      <!-- Quantum Orbs with Energy Fields -->
      <div class="quantum-field">
        <div class="quantum-orb orb-1" />
        <div class="quantum-orb orb-2" />
        <div class="quantum-orb orb-3" />
        <div class="quantum-orb orb-4" />
        <div class="quantum-orb orb-5" />
        <div class="quantum-orb orb-6" />
      </div>
      
      <!-- Revolutionary Particle System -->
      <div class="particle-system">
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
        <div class="magic-particle" />
      </div>
      
      <!-- Energy Vortex -->
      <div class="energy-vortex">
        <div class="vortex-ring ring-1" />
        <div class="vortex-ring ring-2" />
        <div class="vortex-ring ring-3" />
        <div class="vortex-ring ring-4" />
        <div class="vortex-ring ring-5" />
      </div>
      
      <!-- Geometric Morphing Shapes -->
      <div class="morphing-geometry">
        <div class="geo-shape triangle" />
        <div class="geo-shape hexagon" />
        <div class="geo-shape pentagon" />
        <div class="geo-shape octagon" />
      </div>
      
      <!-- Electric Grid -->
      <div class="electric-grid">
        <div
          v-for="i in 8"
          :key="'h-'+i"
          class="grid-line horizontal"
        />
        <div
          v-for="i in 12"
          :key="'v-'+i"
          class="grid-line vertical"
        />
      </div>
      
      <!-- Plasma Waves -->
      <div class="plasma-waves">
        <div class="plasma-wave wave-1" />
        <div class="plasma-wave wave-2" />
        <div class="plasma-wave wave-3" />
      </div>
    </div>
    
    <div class="hero-container">
      <div class="hero-content">
        <!-- Left Side - Text Content with Cosmic Effects -->
        <div class="text-content">
          <!-- Cosmic Background for Left Side -->
          <div class="cosmic-left-effects">
            <!-- Atomic Particle System -->
            <div class="atomic-particle-system">
              <div
                v-for="i in 20"
                :key="'atomic-'+i"
                class="atomic-particle"
                :style="{ 
                  animationDelay: (i * 0.3) + 's',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%'
                }"
              />
            </div>
            
            <!-- Cosmic Wave System -->
            <div class="cosmic-wave-system">
              <div class="cosmic-wave wave-1" />
              <div class="cosmic-wave wave-2" />
              <div class="cosmic-wave wave-3" />
              <div class="cosmic-wave wave-4" />
            </div>
            
            <!-- Stellar Formation -->
            <div class="stellar-formation">
              <div
                v-for="i in 15"
                :key="'star-'+i"
                class="stellar-point"
                :style="{ 
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: (i * 0.2) + 's'
                }"
              />
            </div>
            
            <!-- Atomic Orbit System -->
            <div class="atomic-orbit-system">
              <div class="atom-core" />
              <div class="electron-orbit orbit-1">
                <div class="electron electron-1" />
              </div>
              <div class="electron-orbit orbit-2">
                <div class="electron electron-2" />
              </div>
              <div class="electron-orbit orbit-3">
                <div class="electron electron-3" />
              </div>
            </div>
            
            <!-- Quantum Field Lines -->
            <div class="quantum-field-lines">
              <div
                v-for="i in 12"
                :key="'field-line-'+i"
                class="field-line"
                :style="{ 
                  transform: `rotate(${i * 30}deg)`,
                  animationDelay: (i * 0.1) + 's'
                }"
              />
            </div>
            
            <!-- Cosmic Nebula -->
            <div class="cosmic-nebula">
              <div class="nebula-cloud cloud-1" />
              <div class="nebula-cloud cloud-2" />
              <div class="nebula-cloud cloud-3" />
            </div>
          </div>

          <!-- Revolutionary Badge Design -->
          <div
            class="revolutionary-badge animate-fadeIn"
            data-aos="fade-down"
            data-aos-delay="100"
            style="margin-top: 1.5rem;"
          >
            <div class="badge-hologram">
              <div class="hologram-layer layer-1" />
              <div class="hologram-layer layer-2" />
              <div class="hologram-layer layer-3" />
            </div>
            <div class="badge-content">
              <div class="badge-icon">
                <i class="fas fa-rocket" />
                <div class="icon-trail" />
              </div>
              <span>{{ $t("hero.badge") }}</span>
            </div>
            <div class="badge-energy-field" />
          </div>
          
          <!-- Quantum Title -->
          <h1 class="quantum-title animate-slideIn" data-aos="fade-up" data-aos-delay="200">
            <div class="title-matrix">
              <span
                class="matrix-line"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {{ $t("hero.title") || "ESmart Solutions Agency" }}
              </span>
              <span
                class="quantum-gradient-text"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {{ $t("hero.subtitle") || "Transform Your Business" }}
              </span>
            </div>
            <div class="title-energy-field">
              <div class="energy-beam beam-1" />
              <div class="energy-beam beam-2" />
              <div class="energy-beam beam-3" />
            </div>
            <div class="quantum-decoration">
              <div class="quantum-line" />
              <div class="quantum-dots">
                <span class="quantum-dot" />
                <span class="quantum-dot" />
                <span class="quantum-dot" />
                <span class="quantum-dot" />
              </div>
            </div>
          </h1>
          
          <!-- Enhanced Description with Glitch Effect -->
          <div
            class="hero-description glitch-text animate-fadeIn"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {{ $t("hero.description") || "ESmart Solutions Agency is a professional partner and companion for Vietnamese businesses on the journey to build and develop reputable and quality brands." }}
            <div class="text-glow-effect" />
          </div>
          
          <!-- Revolutionary Stats Grid -->
          <div
            class="quantum-stats-grid animate-slideIn"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div class="quantum-stat-card">
              <div class="stat-hologram">
                <div class="stat-icon">
                  <i class="fas fa-chart-line" />
                </div>
                <div class="stat-energy" />
              </div>
              <div class="stat-data">
                <span class="stat-number">500+</span>
                <span class="stat-label">{{ $t("hero.stats.projects") || "Projects" }}</span>
              </div>
              <div class="stat-plasma-field" />
            </div>
            
            <div class="quantum-stat-card">
              <div class="stat-hologram">
                <div class="stat-icon">
                  <i class="fas fa-heart" />
                </div>
                <div class="stat-energy" />
              </div>
              <div class="stat-data">
                <span class="stat-number">98%</span>
                <span class="stat-label">{{ $t("hero.stats.satisfaction") || "Satisfaction" }}</span>
              </div>
              <div class="stat-plasma-field" />
            </div>
            
            <div class="quantum-stat-card">
              <div class="stat-hologram">
                <div class="stat-icon">
                  <i class="fas fa-clock" />
                </div>
                <div class="stat-energy" />
              </div>
              <div class="stat-data">
                <span class="stat-number">24/7</span>
                <span class="stat-label">{{ $t("hero.stats.support") || "Support" }}</span>
              </div>
              <div class="stat-plasma-field" />
            </div>
          </div>
          
          <!-- Enhanced Action Buttons -->
          <div
            class="quantum-action-hub animate-fadeIn"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div class="action-buttons-grid">
              <button
                class="quantum-premium-btn get-started-btn"
                @click="scrollToSection('marketing-assessment')"
              >
                <div class="btn-quantum-shell">
                  <div class="shell-energy-core" />
                  <div class="shell-glow-ring" />
                </div>
                <div class="btn-content">
                  <i class="fas fa-rocket btn-icon" />
                  <span class="btn-text">{{ $t("hero.buttons.getStarted") }}</span>
                  <div class="btn-arrow">
                    <i class="fas fa-arrow-right" />
                  </div>
                </div>
                <div class="btn-energy-trail" />
              </button>
              
              <button
                class="quantum-demo-btn"
                @click="scrollToSection('about-us')"
              >
                <div class="demo-btn-frame">
                  <div class="frame-border" />
                  <div class="frame-glow" />
                </div>
                <div class="demo-content">
                  <div class="play-icon-wrapper">
                    <i class="fas fa-play" />
                    <div class="play-pulse" />
                  </div>
                  <span>{{ $t("hero.buttons.watchDemo") }}</span>
                </div>
              </button>
            </div>
            
            <!-- Scroll Down Indicator -->
            <div 
              class="scroll-indicator-enhanced" 
              @click="scrollToSection('social-proof')"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div class="scroll-wrapper">
                <div class="scroll-icon">
                  <div class="scroll-wheel">
                    <div class="wheel-dot" />
                  </div>
                  <div class="scroll-arrows">
                    <i class="fas fa-chevron-down" />
                    <i class="fas fa-chevron-down" />
                  </div>
                </div>
                <span class="scroll-text">{{ $t("hero.scrollDown") }}</span>
              </div>
            </div>
          </div>
          
          <!-- Enhanced Trust Badge -->
          <div
            class="quantum-trust-badge animate-fadeIn"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div class="trust-badge-shell">
              <div class="badge-energy-border" />
              <div class="badge-content">
                <div class="trust-icon">
                  <i class="fas fa-shield-check" />
                  <div class="icon-glow" />
                </div>
                <div class="trust-text">
                  <span class="trust-label">{{ $t("hero.trustedBy") }}</span>
                  <div class="trust-companies-preview">
                    <div class="company-dot" v-for="i in 5" :key="i" />
                    <span class="companies-count">1000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Revolutionary Visual Content -->
        <div class="quantum-visual-zone animate-zoomIn" data-aos="zoom-in" data-aos-delay="700">
          <!-- Cosmic Background for Right Side -->
          <div class="cosmic-right-effects">
            <!-- Stellar Background -->
            <div class="stellar-background">
              <div
                v-for="i in 25"
                :key="'right-star-'+i"
                class="background-star"
                :style="{ 
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: (i * 0.15) + 's'
                }"
              />
            </div>
            
            <!-- Planet System -->
            <div class="planet-system">
              <div class="planet planet-1" />
              <div class="planet planet-2" />
              <div class="planet planet-3" />
              <div class="planet-ring ring-1" />
              <div class="planet-ring ring-2" />
            </div>
            
            <!-- Cosmic Dust -->
            <div class="cosmic-dust-system">
              <div
                v-for="i in 30"
                :key="'dust-'+i"
                class="cosmic-dust"
                :style="{ 
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: (i * 0.1) + 's'
                }"
              />
            </div>
            
            <!-- Galaxy Spiral -->
            <div class="galaxy-spiral">
              <div class="spiral-arm arm-1" />
              <div class="spiral-arm arm-2" />
              <div class="spiral-arm arm-3" />
              <div class="galaxy-core" />
            </div>
          </div>
          
          <div class="quantum-illustration">
            <!-- Enhanced Compact Floating Cards Grid -->
            <div class="quantum-cards-grid">
              <div
                class="quantum-mini-card card-analytics"
                data-aos="zoom-in"
                data-aos-delay="800"
              >
                <div class="mini-card-glow" />
                <div class="mini-card-content">
                  <div class="mini-card-icon">
                    <i class="fas fa-chart-bar" />
                    <div class="icon-energy-pulse" />
                  </div>
                  <div class="mini-card-text">
                    <h4 class="mini-card-title">{{ $t("hero.cards.analytics.title") }}</h4>
                    <p class="mini-card-description">{{ $t("hero.cards.analytics.description") }}</p>
                  </div>
                </div>
                <div class="mini-card-particles">
                  <div class="particle" v-for="i in 4" :key="i" />
                </div>
              </div>
              
              <div
                class="quantum-mini-card card-team"
                data-aos="zoom-in"
                data-aos-delay="900"
              >
                <div class="mini-card-glow" />
                <div class="mini-card-content">
                  <div class="mini-card-icon">
                    <i class="fas fa-users-cog" />
                    <div class="icon-energy-pulse" />
                  </div>
                  <div class="mini-card-text">
                    <h4 class="mini-card-title">{{ $t("hero.cards.team.title") }}</h4>
                    <p class="mini-card-description">{{ $t("hero.cards.team.description") }}</p>
                  </div>
                </div>
                <div class="mini-card-particles">
                  <div class="particle" v-for="i in 4" :key="i" />
                </div>
              </div>
              
              <div
                class="quantum-mini-card card-growth"
                data-aos="zoom-in"
                data-aos-delay="1000"
              >
                <div class="mini-card-glow" />
                <div class="mini-card-content">
                  <div class="mini-card-icon">
                    <i class="fas fa-rocket" />
                    <div class="icon-energy-pulse" />
                  </div>
                  <div class="mini-card-text">
                    <h4 class="mini-card-title">{{ $t("hero.cards.growth.title") }}</h4>
                    <p class="mini-card-description">{{ $t("hero.cards.growth.description") }}</p>
                  </div>
                </div>
                <div class="mini-card-particles">
                  <div class="particle" v-for="i in 4" :key="i" />
                </div>
              </div>
              
              <div
                class="quantum-mini-card card-innovation"
                data-aos="zoom-in"
                data-aos-delay="1100"
              >
                <div class="mini-card-glow" />
                <div class="mini-card-content">
                  <div class="mini-card-icon">
                    <i class="fas fa-lightbulb" />
                    <div class="icon-energy-pulse" />
                  </div>
                  <div class="mini-card-text">
                    <h4 class="mini-card-title">{{ $t("hero.cards.innovation.title") }}</h4>
                    <p class="mini-card-description">{{ $t("hero.cards.innovation.description") }}</p>
                  </div>
                </div>
                <div class="mini-card-particles">
                  <div class="particle" v-for="i in 4" :key="i" />
                </div>
              </div>
            </div>
            
            <!-- Central Quantum Portal -->
            <div class="quantum-portal animate-zoomIn" data-aos="zoom-in" data-aos-delay="1200">
              <div class="portal-frame">
                <div class="portal-ring ring-1" />
                <div class="portal-ring ring-2" />
                <div class="portal-ring ring-3" />
                <div class="portal-ring ring-4" />
                <div class="portal-ring ring-5" />
              </div>
              <div class="portal-core">
                <img
                  :src="require('@/assets/logo.png')"
                  :alt="$t('hero.logoAlt')"
                  class="quantum-logo"
                >
                <div class="logo-energy-field" />
                <div class="logo-quantum-glow" />
              </div>
              <div class="portal-energy-streams">
                <div
                  v-for="i in 12"
                  :key="i"
                  class="energy-stream"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Revolutionary Scroll Indicator -->
    <div
      class="quantum-scroll-indicator animate-fadeIn"
      data-aos="fade-up"
      data-aos-delay="1300"
      @click="scrollToSection('social-proof')"
    >
      <div class="scroll-quantum-portal">
        <div class="quantum-mouse">
          <div class="mouse-quantum-core" />
          <div class="mouse-energy-wheel" />
        </div>
        <div class="scroll-energy-beams">
          <div class="energy-beam" />
          <div class="energy-beam" />
          <div class="energy-beam" />
        </div>
      </div>
      <span class="scroll-quantum-text">{{ $t("hero.scrollDown") }}</span>
      <div class="scroll-quantum-field" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'IntroSection',
  data() {
    return {
      morphingShapes: [],
      energyLines: [],
      cardParticles: [],
    };
  },
  mounted() {
    this.initializeAnimations();
    this.createParticles();
    this.createMorphingShapes();
    this.createEnergyField();
    this.observeElements();
    this.initializeAOS();
  },
  beforeUnmount() {
    // Cleanup any ongoing animations or intervals
    const particles = document.querySelectorAll('.particle, .mini-particle, .hover-particle');
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.$router.push({ path: '/', hash: `#${sectionId}` });
      }
    },
    createParticles() {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;
      
      // Clear existing particles
      particlesContainer.innerHTML = '';
      
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Random particle types
        const types = ['sparkle', 'glow', 'dot'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        particle.classList.add(randomType);
        
        particlesContainer.appendChild(particle);
      }
    },
    createMorphingShapes() {
      const shapesContainer = document.querySelector('.morphing-shapes');
      if (!shapesContainer) return;
      
      const shapes = document.querySelectorAll('.morph-shape');
      shapes.forEach((shape, index) => {
        // Add random morphing animation
        const duration = (Math.random() * 10 + 8) + 's';
        const delay = (index * 2) + 's';
        shape.style.animationDuration = duration;
        shape.style.animationDelay = delay;
      });
    },
    createEnergyField() {
      const energyField = document.querySelector('.energy-field');
      if (!energyField) return;
      
      const energyLines = document.querySelectorAll('.energy-line');
      energyLines.forEach((line, index) => {
        const angle = (360 / energyLines.length) * index;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.animationDelay = (index * 0.2) + 's';
      });
    },
    createCardParticles() {
      const cards = document.querySelectorAll('.floating-card');
      cards.forEach(card => {
        const particleContainer = card.querySelector('.card-particles');
        if (!particleContainer) return;
        
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('div');
          particle.className = 'mini-particle';
          particle.style.animationDelay = (i * 0.3) + 's';
          particleContainer.appendChild(particle);
        }
      });
    },
    initializeAnimations() {
      // Add intersection observer for scroll-triggered animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('floating-card')) {
              this.animateCard(entry.target);
            }
            if (entry.target.classList.contains('hero-stats')) {
              this.animateStats();
            }
          }
        });
      }, observerOptions);
      
      // Observe all animatable elements
      const animateElements = document.querySelectorAll('.floating-card, .hero-stats, .badge, .hero-title');
      animateElements.forEach(el => observer.observe(el));
    },
    animateCard(card) {
      // Add floating animation to card
      card.style.animation = 'cardFloat 4s ease-in-out infinite';
      
      // Create particle burst effect
      setTimeout(() => {
        this.createCardParticles();
      }, 500);
    },
    animateStats() {
      const statNumbers = document.querySelectorAll('.stat-number');
      statNumbers.forEach((stat, index) => {
        setTimeout(() => {
          stat.classList.add('count-up');
        }, index * 200);
      });
    },
    observeElements() {
      if (this._observer) return;
      this._observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('floating-card')) {
              const cards = document.querySelectorAll('.floating-card');
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('animate-float');
                }, index * 150);
              });
            }
          }
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('.floating-card, .main-visual').forEach(element => {
        if (!element.hasAttribute('data-observed')) {
          this._observer.observe(element);
          element.setAttribute('data-observed', 'true');
        }
      });
    },
    initializeAOS() {
      // Initialize AOS (Animate On Scroll) library if available
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100
        });
      }
    },
    addInteractiveEffects() {
      // Add hover effects to floating cards
      const cards = document.querySelectorAll('.floating-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.classList.add('hover-glow');
          this.createHoverParticles(card);
        });
        
        card.addEventListener('mouseleave', () => {
          card.classList.remove('hover-glow');
        });
      });
      
      // Add click effects to buttons
      const buttons = document.querySelectorAll('.primary-button, .secondary-button');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          this.createRippleEffect(e, button);
        });
      });
    },
    createHoverParticles(element) {
      const rect = element.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        document.body.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1000);
      }
    },
    createRippleEffect(event, button) {
      const ripple = document.createElement('div');
      ripple.className = 'button-ripple-effect';
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    }
  }
}
</script>

<style scoped>
/* Quantum Hero Revolutionary Design */
.hero {
  position: relative;
  overflow: hidden;
}

/* Revolutionary Quantum Background System */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  /* If using a background image, ensure it covers */
  background-size: cover;
  background-position: center;
  margin: 0;
  max-width: none;
}

/* Quantum Field System */
.quantum-field {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(217, 119, 6, 0.9), rgba(245, 158, 11, 0.4), transparent 65%);
  filter: blur(30px);
  animation: quantumFloat 25s ease-in-out infinite;
}

.quantum-orb.orb-1 {
  width: 400px;
  height: 400px;
  top: 5%;
  left: 5%;
  animation-delay: 0s;
  background: radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.9), rgba(245, 158, 11, 0.5), transparent 65%);
}

.quantum-orb.orb-2 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: 10%;
  animation-delay: 5s;
  background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.8), rgba(217, 119, 6, 0.4), transparent 65%);
}

.quantum-orb.orb-3 {
  width: 250px;
  height: 250px;
  bottom: 15%;
  left: 20%;
  animation-delay: 10s;
  background: radial-gradient(circle at 30% 30%, rgba(217, 119, 6, 0.8), rgba(255, 107, 53, 0.4), transparent 65%);
}

.quantum-orb.orb-4 {
  width: 350px;
  height: 350px;
  top: 20%;
  right: 30%;
  animation-delay: 15s;
  background: radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.9), rgba(255, 107, 53, 0.5), transparent 65%);
}

.quantum-orb.orb-5 {
  width: 200px;
  height: 200px;
  bottom: 50%;
  right: 5%;
  animation-delay: 7s;
  background: radial-gradient(circle at 30% 30%, rgba(255, 107, 53, 0.8), rgba(217, 119, 6, 0.4), transparent 65%);
}

.quantum-orb.orb-6 {
  width: 280px;
  height: 280px;
  top: 60%;
  left: 50%;
  animation-delay: 20s;
  background: radial-gradient(circle at 30% 30%, rgba(217, 119, 6, 0.9), rgba(245, 158, 11, 0.4), transparent 65%);
}

.orb-5 {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, transparent 70%);
  top: 80%;
  right: 30%;
  animation-delay: 16s;
}

/* Morphing shapes for unique layout */
.morphing-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.morph-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: morphing 12s infinite ease-in-out;
}

.shape-a {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 80%;
  border-radius: 50% 20% 50% 20%;
  animation-delay: 0s;
}

.shape-b {
  width: 80px;
  height: 120px;
  top: 70%;
  left: 15%;
  border-radius: 20% 50% 20% 50%;
  animation-delay: 4s;
}

.shape-c {
  width: 120px;
  height: 80px;
  top: 40%;
  right: 20%;
  border-radius: 30% 70% 30% 70%;
  animation-delay: 8s;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: magicalParticleFloat infinite linear;
}

.particle.sparkle {
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.particle.glow {
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
}

.particle.dot {
  width: 2px;
  height: 2px;
  background: rgba(240, 171, 252, 0.7);
  box-shadow: 0 0 8px rgba(240, 171, 252, 0.5);
}

.hero-container {
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  width: 100%;
}

.text-content {
  animation: slideInLeft 1.5s ease-out;
}

/* Enhanced badge with pulse effect */
.quantum-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.badge-pulse {
  width: 8px;
  height: 8px;
  background: var(--secondary-color);
  border-radius: 50%;
  opacity: 0.8;
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--gradient-secondary);
  border-radius: 50%;
  font-size: 14px;
  animation: iconSpin 6s linear infinite;
}

/* Enhanced hero title */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  background: var(--gradient-energy);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
}

.title-line {
  display: block;
  animation: fadeInUp 1.2s ease-out 0.3s both;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 1.2s ease-out 0.6s both, gradientShift 4s ease-in-out infinite;
  text-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
}

.title-decoration {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.decoration-line {
  width: 60px;
  height: 3px;
  background: var(--gradient-secondary);
  border-radius: 2px;
  animation: lineGrow 1s ease-out 1s both;
}

.decoration-dots {
  display: flex;
  gap: 0.5rem;
}

.decoration-dots span {
  width: 8px;
  height: 8px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: dotBounce 1.5s ease-in-out infinite;
}

.decoration-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.decoration-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

.hero-description {
  font-size: 1.3rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 550px;
  animation: fadeInUp 1.2s ease-out 0.9s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

/* Enhanced stats section */
.hero-stats {
  display: flex;
  gap: 1.8rem;
  margin-bottom: 2.5rem;
  animation: fadeInUp 1.2s ease-out 1.2s both;
}

.stat-item {
  text-align: center;
  position: relative;
  padding: 0.8rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 100px;
}

.stat-item:hover {
  transform: scale(1.1) rotate(2deg);
  color: var(--accent-color);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--gradient-secondary);
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  font-size: 18px;
  animation: iconFloat 3s ease-in-out infinite;
}

.stat-number {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
  animation: countUp 2s ease-out 1.5s both;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  background: var(--gradient-magical);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.stat-item:hover .stat-glow {
  opacity: 0.3;
}

/* Enhanced buttons */
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  animation: fadeInUp 1.2s ease-out 1.5s both;
}

.primary-button {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 15px 35px rgba(245, 158, 11, 0.4);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.primary-button .button-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: buttonShimmer 3s infinite;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.primary-button:hover .button-icon {
  transform: translateX(5px);
}

.secondary-button:hover .button-icon {
  transform: scale(1.2);
}

.primary-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 45px rgba(245, 158, 11, 0.5);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-3px);
}

/* Enhanced trusted by section */
.trusted-by {
  animation: fadeInUp 1.2s ease-out 1.8s both;
}

.trusted-label {
  display: block;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.trusted-logos {
  display: flex;
  gap: 2rem;
  align-items: center;
  animation: trustedFloat 5s ease-in-out infinite;
}

.logo-placeholder {
  width: 70px;
  height: 35px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: logoHover 3s ease-in-out infinite;
}

.logo-placeholder:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.logo-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: logoShine 3s infinite;
}

/* Visual content enhancements */
.visual-content {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideInRight 1.5s ease-out;
}

.hero-illustration {
  position: relative;
  width: 500px;
  height: 500px;
}

/* Enhanced floating cards with unique shapes */
.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px) scale(0.8);
  animation: cardMagic 6s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.floating-card.hexagon {
  border-radius: 20px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.floating-card.triangle {
  border-radius: 15px;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.floating-card.pentagon {
  border-radius: 18px;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.floating-card.diamond {
  border-radius: 0;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.floating-card i {
  font-size: 2rem;
  color: var(--accent-color);
  animation: iconPulse 2s ease-in-out infinite;
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  z-index: -1;
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.floating-card:hover .card-glow {
  opacity: 0.7;
}

.card-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mini-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  animation: miniParticleFloat 3s infinite ease-in-out;
}

.card-1 {
  top: 15%;
  left: -15%;
  animation-delay: 0.5s;
}

.card-2 {
  top: 65%;
  right: -15%;
  animation-delay: 0.7s;
}

.card-3 {
  bottom: 5%;
  left: 5%;
  animation-delay: 0.9s;
}

.card-4 {
  top: 35%;
  right: 15%;
  animation-delay: 1.1s;
}

/* Holographic main visual */
.main-visual {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hologram-container {
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-logo {
  width: 200px;
  height: 200px;
  object-fit: contain;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3));
  animation: logoPlasma 4s ease-in-out infinite;
  z-index: 2;
}

.hologram-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: gridMove 10s linear infinite;
  border-radius: 50%;
}

.hologram-rings {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: ringPulse 4s infinite ease-in-out;
}

.ring-1 {
  width: 100%;
  height: 100%;
  border-color: rgba(99, 102, 241, 0.4);
  animation-delay: 0s;
}

.ring-2 {
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  border-color: rgba(240, 171, 252, 0.3);
  animation-delay: 1s;
}

.ring-3 {
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  border-color: rgba(75, 172, 254, 0.3);
  animation-delay: 2s;
}

.ring-4 {
  width: 160%;
  height: 160%;
  top: -30%;
  left: -30%;
  border-color: rgba(245, 158, 11, 0.2);
  animation-delay: 3s;
}

/* Energy field effect */
.energy-field {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.energy-line {
  position: absolute;
  width: 2px;
  height: 150px;
  background: linear-gradient(transparent, rgba(99, 102, 241, 0.8), transparent);
  top: 50%;
  left: 50%;
  transform-origin: bottom;
  animation: energyPulse 3s infinite ease-in-out;
}

/* Enhanced scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  animation: fadeInUp 1.2s ease-out 2s both;
}

.scroll-indicator:hover {
  color: white;
  transform: translateX(-50%) translateY(-5px);
}

.scroll-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.mouse {
  width: 28px;
  height: 42px;
  border: 2px solid currentColor;
  border-radius: 14px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.wheel {
  width: 4px;
  height: 8px;
  background: currentColor;
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

.scroll-arrows {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.scroll-arrows i {
  font-size: 12px;
  opacity: 0.7;
  animation: arrowBounce 2s infinite ease-in-out;
}

.scroll-arrows i:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrows i:nth-child(3) {
  animation-delay: 0.4s;
}

/* Animation keyframes */
@keyframes orbitalFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(30px, -40px) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(-20px, -60px) rotate(180deg) scale(0.9);
  }
  75% {
    transform: translate(-40px, 20px) rotate(270deg) scale(1.05);
  }
}

@keyframes morphing {
  0%, 100% {
    border-radius: 50% 20% 50% 20%;
    transform: rotate(0deg) scale(1);
  }
  25% {
    border-radius: 20% 50% 20% 50%;
    transform: rotate(90deg) scale(1.2);
  }
  50% {
    border-radius: 70% 30% 70% 30%;
    transform: rotate(180deg) scale(0.8);
  }
  75% {
    border-radius: 30% 70% 30% 70%;
    transform: rotate(270deg) scale(1.1);
  }
}

@keyframes magicalParticleFloat {
  from {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(-100px) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes iconSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes badgePulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes lineGrow {
  from {
    width: 0;
  }
  to {
    width: 60px;
  }
}

@keyframes dotBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes buttonShimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes logoShine {
  0%, 100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

@keyframes cardMagic {
  0%, 100% {
    transform: translateY(0) rotateX(0deg) rotateY(0deg);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  25% {
    transform: translateY(-20px) rotateX(5deg) rotateY(2deg);
    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.3);
  }
  50% {
    transform: translateY(-30px) rotateX(0deg) rotateY(-2deg);
    box-shadow: 0 30px 60px rgba(255, 17, 68, 0.3);
  }
  75% {
    transform: translateY(-15px) rotateX(-3deg) rotateY(1deg);
    box-shadow: 0 20px 40px rgba(239, 30, 99, 0.3);
  }
}

@keyframes logoPlasma {
  0%, 100% {
    filter: drop-shadow(0 0 20px var(--primary-color)) 
            drop-shadow(0 0 40px var(--secondary-color));
  }
  25% {
    filter: drop-shadow(0 0 30px var(--secondary-color)) 
            drop-shadow(0 0 60px var(--tertiary-color));
  }
  50% {
    filter: drop-shadow(0 0 25px var(--tertiary-color)) 
            drop-shadow(0 0 50px var(--accent-color));
  }
  75% {
    filter: drop-shadow(0 0 35px var(--accent-color)) 
            drop-shadow(0 0 70px var(--primary-color));
  }
}

@keyframes gridMove {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(20px, 20px);
  }
}

@keyframes ringPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes energyPulse {
  0%, 100% {
    opacity: 0.3;
    height: 150px;
  }
  50% {
    opacity: 0.8;
    height: 200px;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(80px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(15px);
  }
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}

/* Hover particles effect */
.hover-particle {
  position: fixed;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: hoverParticleFloat 1s ease-out forwards;
}

@keyframes hoverParticleFloat {
  from {
    transform: scale(0) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(1) translateY(-50px);
    opacity: 0;
  }
}

/* Button ripple effect */
.button-ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  animation: rippleExpand 0.6s ease-out forwards;
  pointer-events: none;
}

@keyframes rippleExpand {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 4rem;
    text-align: center;
  }
  
  .hero-illustration {
    width: 400px;
    height: 400px;
  }
  
  .hologram-container {
    width: 200px;
    height: 200px;
  }
  
  .hero-logo {
    width: 150px;
    height: 150px;
  }
  
  .energy-field {
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 0 0.5rem;
  }
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;
  }
  .text-content,
  .quantum-visual-zone {
    width: 100%;
    max-width: 100vw;
    text-align: center;
  }
  .quantum-visual-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 100vw;
  }
  .quantum-illustration {
    width: 90vw;
    max-width: 350px;
    margin: 0 auto;
  }
  .quantum-title {
    font-size: 2rem;
  }
  .hero-description {
    font-size: 1rem;
    max-width: 100vw;
  }
  .quantum-stats-grid {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  .quantum-stat-card {
    width: 90vw;
    max-width: 320px;
    margin: 0 auto;
    font-size: 0.95rem;
    padding: 1rem 0.5rem;
  }
  .quantum-action-buttons {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
  .quantum-primary-btn,
  .quantum-secondary-btn {
    width: 100%;
    max-width: 260px;
    font-size: 1rem;
    padding: 0.9rem 1.2rem;
  }
  .quantum-scroll-indicator {
    bottom: 1.5rem;
    font-size: 0.9rem;
  }
}

/* Enhanced Quantum Scroll Indicator */
.quantum-scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.quantum-scroll-indicator:hover {
  transform: translateX(-50%) translateY(-10px) scale(1.1);
}

.scroll-quantum-portal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.quantum-mouse {
  position: relative;
  width: 28px;
  height: 50px;
  border: 2px solid rgba(255, 107, 53, 0.8);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  animation: mouseGlow 3s ease-in-out infinite;
}

.mouse-quantum-core {
  width: 4px;
  height: 8px;
  background: linear-gradient(180deg, #ff6b35, #f59e0b);
  border-radius: 2px;
  animation: mouseScroll 2s ease-in-out infinite;
}

.mouse-energy-wheel {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border: 1px solid rgba(255, 107, 53, 0.6);
  border-radius: 50%;
  animation: wheelSpin 2s linear infinite;
}

.scroll-energy-beams {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.energy-beam {
  width: 2px;
  height: 8px;
  background: linear-gradient(180deg, rgba(255, 107, 53, 0.8), transparent);
  border-radius: 2px;
  animation: beamPulse 1.5s ease-in-out infinite;
}

.energy-beam:nth-child(1) { animation-delay: 0s; }
.energy-beam:nth-child(2) { animation-delay: 0.2s; }
.energy-beam:nth-child(3) { animation-delay: 0.4s; }

.scroll-quantum-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  animation: textPulse 3s ease-in-out infinite;
}

.scroll-quantum-field {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.1), transparent);
  border-radius: 50%;
  animation: fieldExpand 4s ease-in-out infinite;
  pointer-events: none;
}

/* Scroll Indicator Animations */
@keyframes mouseGlow {
  0%, 100% { 
    border-color: rgba(255, 107, 53, 0.8);
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
  }
  50% { 
    border-color: rgba(245, 158, 11, 1);
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
  }
}

@keyframes mouseScroll {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(12px); opacity: 1; }
}

@keyframes wheelSpin {
  0% { transform: translateX(-50%) rotate(0deg); }
  100% { transform: translateX(-50%) rotate(360deg); }
}

@keyframes beamPulse {
  0%, 100% { 
    opacity: 0.4; 
    transform: translateY(0) scaleY(1); 
  }
  50% { 
    opacity: 1; 
    transform: translateY(5px) scaleY(1.5); 
  }
}

@keyframes textPulse {
  0%, 100% { 
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
  }
  50% { 
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
  }
}

@keyframes fieldExpand {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 0.1; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.5); 
    opacity: 0.3; 
  }
}
@media (max-width: 480px) {
  .hero-container {
    padding: 0 0.25rem;
  }
  .quantum-title {
    font-size: 1.3rem;
  }
  .hero-description {
    font-size: 0.95rem;
  }
  .quantum-stat-card {
    font-size: 0.85rem;
    padding: 0.7rem 0.2rem;
  }
  .quantum-primary-btn,
  .quantum-secondary-btn {
    font-size: 0.95rem;
    padding: 0.7rem 0.8rem;
    max-width: 200px;
  }
  .quantum-illustration {
    max-width: 220px;
    width: 95vw;
  }
}

/* Enhanced Energetic Animations and Effects */
.hero-energy-field {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.energy-orb {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-magical);
  filter: blur(3px);
  animation: energyOrb 6s ease-in-out infinite;
}

.energy-orb:nth-child(1) {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.energy-orb:nth-child(2) {
  width: 100px;
  height: 100px;
  top: 70%;
  right: 10%;
  animation-delay: 2s;
}

.energy-orb:nth-child(3) {
  width: 80px;
  height: 80px;
  top: 40%;
  left: 80%;
  animation-delay: 4s;
}

@keyframes energyOrb {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-30px) scale(1.2);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50px) scale(0.8);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-20px) scale(1.1);
    opacity: 0.4;
  }
}

/* Spiral Energy Lines */
.spiral-energy {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.spiral-line {
  position: absolute;
  width: 2px;
  height: 200px;
  background: linear-gradient(180deg, var(--primary-color), transparent);
  transform-origin: bottom center;
  animation: spiralRotate 8s linear infinite;
}

.spiral-line:nth-child(1) {
  animation-delay: 0s;
}

.spiral-line:nth-child(2) {
  animation-delay: 1s;
  transform: rotate(60deg);
}

.spiral-line:nth-child(3) {
  animation-delay: 2s;
  transform: rotate(120deg);
}

.spiral-line:nth-child(4) {
  animation-delay: 3s;
  transform: rotate(180deg);
}

.spiral-line:nth-child(5) {
  animation-delay: 4s;
  transform: rotate(240deg);
}

.spiral-line:nth-child(6) {
  animation-delay: 5s;
  transform: rotate(300deg);
}

@keyframes spiralRotate {
  from {
    transform: rotate(0deg) scale(1);
    opacity: 0.8;
  }
  to {
    transform: rotate(360deg) scale(1.5);
    opacity: 0;
  }
}

/* Enhanced Badge with Bounce */
.badge {
  animation: badgeBounce 3s ease-in-out infinite;
}

@keyframes badgeBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-10px) scale(1.05);
  }
  50% {
    transform: translateY(-5px) scale(1.02);
  }
  75% {
    transform: translateY(-7px) scale(1.03);
  }
}

/* Enhanced Stats with Magnetic Effect */
.stats-container {
  animation: statsFloat 4s ease-in-out infinite;
}

@keyframes statsFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-15px) rotate(-1deg);
  }
}

.stat-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-item:hover {
  transform: scale(1.1) rotate(2deg);
  color: var(--accent-color);
}

/* Enhanced Hero Logo with Plasma Effect */
.hero-logo {
  position: relative;
  animation: logoPlasma 4s ease-in-out infinite;
}

@keyframes logoPlasma {
  0%, 100% {
    filter: drop-shadow(0 0 20px var(--primary-color)) 
            drop-shadow(0 0 40px var(--secondary-color));
  }
  25% {
    filter: drop-shadow(0 0 30px var(--secondary-color)) 
            drop-shadow(0 0 60px var(--tertiary-color));
  }
  50% {
    filter: drop-shadow(0 0 25px var(--tertiary-color)) 
            drop-shadow(0 0 50px var(--accent-color));
  }
  75% {
    filter: drop-shadow(0 0 35px var(--accent-color)) 
            drop-shadow(0 0 70px var(--primary-color));
  }
}

/* Enhanced CTA Buttons with Pulse Waves */
.primary-button {
  position: relative;
  overflow: hidden;
}

.primary-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
  border-radius: 50%;
}

.primary-button:hover::before {
  width: 300px;
  height: 300px;
}

.secondary-button {
  position: relative;
}

.secondary-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.secondary-button:hover::after {
  left: 100%;
}

/* Enhanced Floating Cards with Advanced Effects */
.floating-card {
  animation: cardMagic 6s ease-in-out infinite;
}

.floating-card:nth-child(odd) {
  animation-delay: 0s;
}

.floating-card:nth-child(even) {
  animation-delay: 3s;
}

@keyframes cardMagic {
  0%, 100% {
    transform: translateY(0) rotateX(0deg) rotateY(0deg);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  25% {
    transform: translateY(-20px) rotateX(5deg) rotateY(2deg);
    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.3);
  }
  50% {
    transform: translateY(-30px) rotateX(0deg) rotateY(-2deg);
    box-shadow: 0 30px 60px rgba(255, 17, 68, 0.3);
  }
  75% {
    transform: translateY(-15px) rotateX(-3deg) rotateY(1deg);
    box-shadow: 0 20px 40px rgba(239, 30, 99, 0.3);
  }
}

/* Revolutionary Particle System */
.particle-system {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 107, 53, 1) 0%, rgba(245, 158, 11, 0.8) 50%, transparent 100%);
  border-radius: 50%;
  animation: quantumParticleFloat 15s infinite linear;
  filter: blur(0.5px);
}

.magic-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.magic-particle:nth-child(2) { left: 20%; animation-delay: 2s; }
.magic-particle:nth-child(3) { left: 30%; animation-delay: 4s; }
.magic-particle:nth-child(4) { left: 40%; animation-delay: 6s; }
.magic-particle:nth-child(5) { left: 50%; animation-delay: 8s; }
.magic-particle:nth-child(6) { left: 60%; animation-delay: 10s; }
.magic-particle:nth-child(7) { left: 70%; animation-delay: 12s; }
.magic-particle:nth-child(8) { left: 80%; animation-delay: 14s; }

/* Energy Vortex System */
.energy-vortex {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.vortex-ring {
  position: absolute;
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 50%;
  animation: vortexSpin 8s linear infinite;
}

.vortex-ring.ring-1 {
  width: 100%;
  height: 100%;
  animation-delay: 0s;
  border-color: rgba(255, 107, 53, 0.4);
}

.vortex-ring.ring-2 {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  animation-delay: 1s;
  border-color: rgba(245, 158, 11, 0.4);
}

.vortex-ring.ring-3 {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  animation-delay: 2s;
  border-color: rgba(217, 119, 6, 0.4);
}

.vortex-ring.ring-4 {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  animation-delay: 3s;
  border-color: rgba(255, 107, 53, 0.5);
}

.vortex-ring.ring-5 {
  width: 20%;
  height: 20%;
  top: 40%;
  left: 40%;
  animation-delay: 4s;
  border-color: rgba(245, 158, 11, 0.6);
}

/* Morphing Geometry */
.morphing-geometry {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.geo-shape {
  position: absolute;
  background: linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(245, 158, 11, 0.1));
  animation: geometryMorph 20s ease-in-out infinite;
  filter: blur(1px);
}

.geo-shape.triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid rgba(255, 107, 53, 0.3);
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.geo-shape.hexagon {
  width: 50px;
  height: 28.87px;
  background: rgba(245, 158, 11, 0.3);
  position: relative;
  top: 70%;
  right: 20%;
  animation-delay: 5s;
}

.geo-shape.hexagon:before,
.geo-shape.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
}

.geo-shape.hexagon:before {
  bottom: 100%;
  border-bottom: 14.43px solid rgba(245, 158, 11, 0.3);
}

.geo-shape.hexagon:after {
  top: 100%;
  border-top: 14.43px solid rgba(245, 158, 11, 0.3);
}

.geo-shape.pentagon {
  width: 54px;
  border-width: 50px 18px 0;
  border-style: solid;
  border-color: rgba(217, 119, 6, 0.3) transparent;
  top: 50%;
  left: 80%;
  animation-delay: 10s;
}

.geo-shape.octagon {
  width: 40px;
  height: 40px;
  background: rgba(255, 107, 53, 0.3);
  position: relative;
  transform: rotate(22.5deg);
  top: 30%;
  right: 15%;
  animation-delay: 15s;
}

/* Electric Grid System */
.electric-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.5), transparent);
  animation: electricPulse 3s ease-in-out infinite;
}

.grid-line.horizontal {
  height: 1px;
  width: 100%;
  left: 0;
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
  top: 0;
}

.grid-line:nth-child(1) { top: 12.5%; animation-delay: 0s; }
.grid-line:nth-child(2) { top: 25%; animation-delay: 0.5s; }
.grid-line:nth-child(3) { top: 37.5%; animation-delay: 1s; }
.grid-line:nth-child(4) { top: 50%; animation-delay: 1.5s; }
.grid-line:nth-child(5) { top: 62.5%; animation-delay: 2s; }
.grid-line:nth-child(6) { top: 75%; animation-delay: 2.5s; }
.grid-line:nth-child(7) { top: 87.5%; animation-delay: 3s; }
.grid-line:nth-child(8) { top: 100%; animation-delay: 3.5s; }

.grid-line:nth-child(9) { left: 8.33%; animation-delay: 0.2s; }
.grid-line:nth-child(10) { left: 16.66%; animation-delay: 0.7s; }
.grid-line:nth-child(11) { left: 25%; animation-delay: 1.2s; }
.grid-line:nth-child(12) { left: 33.33%; animation-delay: 1.7s; }
.grid-line:nth-child(13) { left: 41.66%; animation-delay: 2.2s; }
.grid-line:nth-child(14) { left: 50%; animation-delay: 2.7s; }
.grid-line:nth-child(15) { left: 58.33%; animation-delay: 3.2s; }
.grid-line:nth-child(16) { left: 66.66%; animation-delay: 3.7s; }
.grid-line:nth-child(17) { left: 75%; animation-delay: 4.2s; }
.grid-line:nth-child(18) { left: 83.33%; animation-delay: 4.7s; }
.grid-line:nth-child(19) { left: 91.66%; animation-delay: 5.2s; }
.grid-line:nth-child(20) { left: 100%; animation-delay: 5.7s; }

/* Plasma Waves */
.plasma-waves {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.plasma-wave {
  position: absolute;
  width: 200%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.6), transparent);
  animation: plasmaFlow 8s linear infinite;
  transform-origin: center;
}

.plasma-wave.wave-1 {
  top: 20%;
  left: -50%;
  animation-delay: 0s;
  transform: rotate(15deg);
}

.plasma-wave.wave-2 {
  top: 50%;
  left: -50%;
  animation-delay: 2.5s;
  transform: rotate(-10deg);
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.6), transparent);
}

.plasma-wave.wave-3 {
  top: 80%;
  left: -50%;
  animation-delay: 5s;
  transform: rotate(25deg);
  background: linear-gradient(90deg, transparent, rgba(217, 119, 6, 0.6), transparent);
}

@keyframes plasmaFlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add fallback .animate-in CSS for fade/slide/zoom */
.animate-in, .animate-fadeIn {
  opacity: 1 !important;
  transform: none !important;
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1);
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

/* Cosmic Effects for Left Side */
.cosmic-left-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Atomic Particle System */
.atomic-particle-system {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.atomic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #ff6b35, transparent);
  border-radius: 50%;
  animation: atomicFloat 8s ease-in-out infinite;
  box-shadow: 0 0 10px #ff6b35, 0 0 20px #ff6b35;
}

.atomic-particle:nth-child(even) {
  background: radial-gradient(circle, #3b82f6, transparent);
  box-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
  animation-duration: 6s;
}

.atomic-particle:nth-child(3n) {
  background: radial-gradient(circle, #f59e0b, transparent);
  box-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b;
  animation-duration: 10s;
}

/* Cosmic Wave System */
.cosmic-wave-system {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.cosmic-wave {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: cosmicPulse 4s ease-in-out infinite;
  opacity: 0.3;
}

.cosmic-wave.wave-1 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 10%;
  border-color: #ff6b35;
  animation-delay: 0s;
}

.cosmic-wave.wave-2 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 20%;
  border-color: #3b82f6;
  animation-delay: 1s;
}

.cosmic-wave.wave-3 {
  width: 80px;
  height: 80px;
  top: 70%;
  left: 15%;
  border-color: #f59e0b;
  animation-delay: 2s;
}

.cosmic-wave.wave-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  left: 30%;
  border-color: #10b981;
  animation-delay: 3s;
}

/* Stellar Formation */
.stellar-formation {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stellar-point {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: stellarTwinkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px white, 0 0 12px white;
}

.stellar-point:nth-child(odd) {
  animation-duration: 4s;
}

.stellar-point:nth-child(3n) {
  background: #ff6b35;
  box-shadow: 0 0 6px #ff6b35, 0 0 12px #ff6b35;
  animation-duration: 5s;
}

/* Atomic Orbit System */
.atomic-orbit-system {
  position: absolute;
  top: 15%;
  left: 5%;
  width: 200px;
  height: 200px;
}

.atom-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #ff6b35, #f59e0b);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px #ff6b35, 0 0 40px #ff6b35;
  animation: atomicCorePulse 2s ease-in-out infinite;
}

.electron-orbit {
  position: absolute;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.electron-orbit.orbit-1 {
  width: 60px;
  height: 60px;
  animation: orbitRotate 4s linear infinite;
}

.electron-orbit.orbit-2 {
  width: 100px;
  height: 100px;
  animation: orbitRotate 6s linear infinite reverse;
}

.electron-orbit.orbit-3 {
  width: 140px;
  height: 140px;
  animation: orbitRotate 8s linear infinite;
}

.electron {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px #3b82f6;
}

/* Quantum Field Lines */
.quantum-field-lines {
  position: absolute;
  top: 50%;
  left: 20%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, -50%);
}

.field-line {
  position: absolute;
  width: 2px;
  height: 150px;
  background: linear-gradient(0deg, transparent, #10b981, transparent);
  top: 50%;
  left: 50%;
  transform-origin: 50% 100%;
  animation: fieldLinePulse 3s ease-in-out infinite;
  opacity: 0.6;
}

/* Cosmic Nebula */
.cosmic-nebula {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.nebula-cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  animation: nebulaFloat 8s ease-in-out infinite;
  opacity: 0.1;
}

.nebula-cloud.cloud-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #ff6b35, transparent);
  top: 10%;
  left: 0%;
  animation-delay: 0s;
}

.nebula-cloud.cloud-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #3b82f6, transparent);
  top: 40%;
  left: 10%;
  animation-delay: 2s;
}

.nebula-cloud.cloud-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, #f59e0b, transparent);
  top: 70%;
  left: 5%;
  animation-delay: 4s;
}

/* Animations */
@keyframes atomicFloat {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: 1;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) translateX(-15px);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-30px) translateX(5px);
    opacity: 0.9;
  }
}

@keyframes cosmicPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.1;
  }
}

@keyframes stellarTwinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.5);
  }
}

@keyframes atomicCorePulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 20px #ff6b35, 0 0 40px #ff6b35;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: 0 0 30px #ff6b35, 0 0 60px #ff6b35;
  }
}

@keyframes orbitRotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes fieldLinePulse {
  0%, 100% {
    opacity: 0.6;
    height: 150px;
  }
  50% {
    opacity: 1;
    height: 180px;
  }
}

@keyframes nebulaFloat {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

/* Cosmic Right Effects */
.cosmic-right-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Stellar Background for Right Side */
.stellar-background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.background-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  animation: starTwinkle 3s ease-in-out infinite;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
}

.background-star:nth-child(3n) {
  width: 3px;
  height: 3px;
  background: var(--secondary-color);
  box-shadow: 0 0 8px var(--secondary-color);
}

.background-star:nth-child(5n) {
  width: 1px;
  height: 1px;
  background: #87ceeb;
  box-shadow: 0 0 4px #87ceeb;
}

/* Planet System */
.planet-system {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
}

.planet {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ff6b35, #8b4513);
  animation: planetRotate 20s linear infinite;
}

.planet-1 {
  width: 60px;
  height: 60px;
  top: 20px;
  left: 20px;
  background: radial-gradient(circle at 30% 30%, #ff9500, #e74c3c);
}

.planet-2 {
  width: 40px;
  height: 40px;
  bottom: 30px;
  right: 30px;
  background: radial-gradient(circle at 30% 30%, #3498db, #2980b9);
}

.planet-3 {
  width: 25px;
  height: 25px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at 30% 30%, #e74c3c, #c0392b);
}

.planet-ring {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: ringRotate 15s linear infinite;
}

.planet-ring.ring-1 {
  width: 120px;
  height: 120px;
  top: 40px;
  left: 40px;
}

.planet-ring.ring-2 {
  width: 180px;
  height: 180px;
  top: 10px;
  left: 10px;
}

/* Cosmic Dust System */
.cosmic-dust-system {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cosmic-dust {
  position: absolute;
  width: 1px;
  height: 1px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: dustFloat 8s ease-in-out infinite;
}

.cosmic-dust:nth-child(2n) {
  background: rgba(138, 43, 226, 0.4);
  animation-duration: 10s;
}

.cosmic-dust:nth-child(3n) {
  background: rgba(255, 107, 53, 0.3);
  animation-duration: 12s;
}

/* Galaxy Spiral */
.galaxy-spiral {
  position: absolute;
  bottom: 15%;
  left: 15%;
  width: 150px;
  height: 150px;
  animation: galaxyRotate 30s linear infinite;
}

.spiral-arm {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 1px;
  transform-origin: center;
}

.spiral-arm.arm-1 {
  transform: rotate(0deg);
  animation-delay: 0s;
}

.spiral-arm.arm-2 {
  transform: rotate(120deg);
  animation-delay: 1s;
}

.spiral-arm.arm-3 {
  transform: rotate(240deg);
  animation-delay: 2s;
}

.galaxy-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #ffffff, var(--secondary-color));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px var(--secondary-color);
}

/* Animation Keyframes for Right Side */
@keyframes starTwinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes planetRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes ringRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes dustFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
  50% { transform: translateY(-10px) translateX(-15px); opacity: 0.6; }
  75% { transform: translateY(-30px) translateX(5px); opacity: 0.9; }
}

@keyframes galaxyRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Compact Cards Grid Styles */
.quantum-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  max-width: 280px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}

/* Title Matrix Layout */
.title-matrix {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.matrix-line {
  display: block;
  text-align: center;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.quantum-gradient-text {
  display: block;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.quantum-mini-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  overflow: hidden;
  min-height: 120px;
  display: flex;
  flex-direction: column;
}

.quantum-mini-card:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: rgba(255, 107, 53, 0.8);
  box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4), 0 0 30px rgba(255, 107, 53, 0.3);
}

.mini-card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(245, 158, 11, 0.1));
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quantum-mini-card:hover .mini-card-glow {
  opacity: 1;
}

.mini-card-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mini-card-icon {
  position: relative;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 107, 53, 0.2);
  border-radius: 50%;
  color: #ff6b35;
  font-size: 1rem;
  flex-shrink: 0;
}

.icon-energy-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 107, 53, 0.5);
  animation: energyPulse 2s ease-in-out infinite;
}

.mini-card-text {
  flex: 1;
}

.mini-card-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.3rem 0;
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  animation: titleShimmer 3s ease-in-out infinite;
}

.mini-card-description {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.mini-card-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mini-card-particles .particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 107, 53, 0.8);
  border-radius: 50%;
  animation: particleFloat 3s ease-in-out infinite;
}

.mini-card-particles .particle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.mini-card-particles .particle:nth-child(2) { top: 20%; right: 20%; animation-delay: 0.5s; }
.mini-card-particles .particle:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 1s; }
.mini-card-particles .particle:nth-child(4) { bottom: 20%; right: 20%; animation-delay: 1.5s; }

/* Enhanced Action Hub Styles */
.quantum-action-hub {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.action-buttons-grid {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.quantum-premium-btn {
  position: relative;
  background: linear-gradient(135deg, #ff6b35, #f59e0b);
  border: none;
  border-radius: 50px;
  padding: 0.9rem 1.8rem;
  color: white;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.quantum-premium-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(255, 107, 53, 0.4);
}

.btn-quantum-shell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  overflow: hidden;
}

.shell-energy-core {
  position: absolute;
  top: 50%;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  animation: energySweep 2s ease-in-out infinite;
}

.shell-glow-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50px;
  background: linear-gradient(45deg, rgba(255, 107, 53, 0.5), rgba(245, 158, 11, 0.5));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quantum-premium-btn:hover .shell-glow-ring {
  opacity: 1;
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.quantum-premium-btn:hover .btn-arrow {
  transform: translateX(5px);
}

.quantum-demo-btn {
  position: relative;
  background: transparent;
  border: 2px solid rgba(255, 107, 53, 0.6);
  border-radius: 50px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.quantum-demo-btn:hover {
  border-color: rgba(255, 107, 53, 1);
  background: rgba(255, 107, 53, 0.1);
  transform: translateY(-2px);
}

.demo-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.play-icon-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 107, 53, 0.5);
  border-radius: 50%;
  animation: playPulse 2s ease-in-out infinite;
}

/* Scroll Indicator Enhanced */
.scroll-indicator-enhanced {
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator-enhanced:hover {
  transform: translateY(-3px);
}

.scroll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-icon {
  position: relative;
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 107, 53, 0.6);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.scroll-wheel {
  width: 6px;
  height: 10px;
  background: rgba(255, 107, 53, 0.8);
  border-radius: 3px;
  position: relative;
}

.wheel-dot {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: wheelScroll 2s ease-in-out infinite;
}

.scroll-arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.scroll-arrows i {
  font-size: 8px;
  color: rgba(255, 107, 53, 0.8);
  animation: arrowBounce 1.5s ease-in-out infinite;
}

.scroll-arrows i:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Enhanced Trust Badge */
.quantum-trust-badge {
  margin-top: 1.5rem;
}

.trust-badge-shell {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  padding: 0.8rem 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.badge-energy-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  background: linear-gradient(45deg, transparent, rgba(255, 107, 53, 0.3), transparent);
  animation: borderFlow 3s ease-in-out infinite;
}

.badge-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
}

.trust-icon {
  position: relative;
  color: #ff6b35;
  font-size: 1.5rem;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent);
  border-radius: 50%;
  animation: iconGlow 2s ease-in-out infinite;
}

.trust-text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.trust-label {
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
}

.trust-companies-preview {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.company-dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 107, 53, 0.8);
  border-radius: 50%;
  animation: dotPulse 2s ease-in-out infinite;
}

.company-dot:nth-child(2) { animation-delay: 0.2s; }
.company-dot:nth-child(3) { animation-delay: 0.4s; }
.company-dot:nth-child(4) { animation-delay: 0.6s; }
.company-dot:nth-child(5) { animation-delay: 0.8s; }

.companies-count {
  font-size: 0.8rem;
  color: #ff6b35;
  font-weight: 700;
  margin-left: 0.5rem;
}

/* Additional Animations */
@keyframes energyPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-10px); opacity: 1; }
}

@keyframes energySweep {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes playPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 0.8; }
}

@keyframes wheelScroll {
  0%, 100% { top: 0; }
  50% { top: 6px; }
}

@keyframes arrowBounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(3px); opacity: 1; }
}

@keyframes borderFlow {
  0%, 100% { opacity: 0.3; transform: rotate(0deg); }
  50% { opacity: 0.8; transform: rotate(180deg); }
}

@keyframes iconGlow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
}

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .title-matrix {
    max-width: 100%;
    gap: 0.8rem;
  }
  
  .matrix-line {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .quantum-gradient-text {
    font-size: 1.8rem;
    line-height: 1.2;
  }
  
  .quantum-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    max-width: 280px;
  }
  
  .quantum-mini-card {
    padding: 0.8rem;
    min-height: 120px;
  }
  
  .mini-card-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .mini-card-title {
    font-size: 0.8rem;
  }
  
  .mini-card-description {
    font-size: 0.65rem;
    -webkit-line-clamp: 2;
  }
  
  .action-buttons-grid {
    flex-direction: column;
    gap: 1rem;
  }
  
  .quantum-premium-btn,
  .quantum-demo-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .trust-badge-shell {
    padding: 0.8rem 1.5rem;
  }
  
  .trust-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .title-matrix {
    gap: 0.6rem;
  }
  
  .matrix-line {
    font-size: 2rem;
    line-height: 1.1;
  }
  
  .quantum-gradient-text {
    font-size: 1.5rem;
    line-height: 1.2;
  }
  
  .quantum-cards-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    max-width: 250px;
  }
  
  .quantum-mini-card {
    padding: 0.8rem;
    min-height: 100px;
  }
  
  .mini-card-title {
    font-size: 0.75rem;
  }
  
  .mini-card-description {
    font-size: 0.65rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
}

@keyframes signatureFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
}

@keyframes titleShimmer {
  0%, 100% { 
    background-position: 0% 50%;
    filter: brightness(1);
  }
  50% { 
    background-position: 100% 50%;
    filter: brightness(1.2) drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .quantum-cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    max-width: 280px;
  }
}
</style>