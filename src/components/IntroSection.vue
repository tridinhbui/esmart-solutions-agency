<template>
  <section class="hero">
    <!-- Enhanced animated background elements -->
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="gradient-orb orb-4"></div>
      <div class="gradient-orb orb-5"></div>
      <div class="particles"></div>
      <div class="morphing-shapes">
        <div class="morph-shape shape-a"></div>
        <div class="morph-shape shape-b"></div>
        <div class="morph-shape shape-c"></div>
      </div>
      
      <!-- New Energetic Elements -->
      <div class="hero-energy-field">
        <div class="energy-orb"></div>
        <div class="energy-orb"></div>
        <div class="energy-orb"></div>
      </div>
      
      <div class="spiral-energy">
        <div class="spiral-line"></div>
        <div class="spiral-line"></div>
        <div class="spiral-line"></div>
        <div class="spiral-line"></div>
        <div class="spiral-line"></div>
        <div class="spiral-line"></div>
      </div>
      
      <div class="particle-system">
        <div class="magic-particle"></div>
        <div class="magic-particle"></div>
        <div class="magic-particle"></div>
        <div class="magic-particle"></div>
        <div class="magic-particle"></div>
      </div>
    </div>
    
    <div class="hero-container">
      <div class="hero-content">
        <div class="text-content">
          <div class="badge" data-aos="fade-down">
            <div class="badge-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <span>{{ $t("hero.badge") || "Digital Innovation Leader" }}</span>
            <div class="badge-pulse"></div>
          </div>
          
          <h1 class="hero-title">
            <span class="title-line" data-aos="fade-up" data-aos-delay="200">
              {{ $t("hero.title") || "ESmart Solutions Agency" }}
            </span>
            <span class="gradient-text" data-aos="fade-up" data-aos-delay="400">
              {{ $t("hero.subtitle") || "Transform Your Business" }}
            </span>
            <div class="title-decoration">
              <div class="decoration-line"></div>
              <div class="decoration-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </h1>
          
          <p class="hero-description" data-aos="fade-up" data-aos-delay="600">
            {{ $t("hero.description") || "ESmart Solutions Agency is a professional partner and companion for Vietnamese businesses on the journey to build and develop reputable and quality brands." }}
          </p>
          
          <div class="hero-stats" data-aos="fade-up" data-aos-delay="800">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <span class="stat-number">500+</span>
              <span class="stat-label">{{ $t("hero.stats.projects") || "Projects" }}</span>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-heart"></i>
              </div>
              <span class="stat-number">98%</span>
              <span class="stat-label">{{ $t("hero.stats.satisfaction") || "Satisfaction" }}</span>
              <div class="stat-glow"></div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-clock"></i>
              </div>
              <span class="stat-number">24/7</span>
              <span class="stat-label">{{ $t("hero.stats.support") || "Support" }}</span>
              <div class="stat-glow"></div>
            </div>
          </div>
          
          <div class="hero-buttons" data-aos="fade-up" data-aos-delay="1000">
            <button class="primary-button glow-effect" @click="scrollToSection('marketing-assessment')">
              <span class="button-text">{{ $t("hero.buttons.getStarted") || "Get Started" }}</span>
              <div class="button-icon">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="button-shimmer"></div>
            </button>
            <button class="secondary-button glass-effect" @click="scrollToSection('about-us')">
              <div class="button-icon">
                <i class="fas fa-play"></i>
              </div>
              <span class="button-text">{{ $t("hero.buttons.watchDemo") || "Watch Demo" }}</span>
              <div class="button-ripple"></div>
            </button>
          </div>
          
          <div class="trusted-by" data-aos="fade-up" data-aos-delay="1200">
            <span class="trusted-label">{{ $t("hero.trustedBy") || "Trusted by 1000+ companies" }}</span>
            <div class="trusted-logos">
              <div class="logo-placeholder" v-for="i in 4" :key="i">
                <div class="logo-shine"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="visual-content">
          <div class="hero-illustration">
            <!-- Enhanced floating cards with unique shapes -->
            <div class="floating-card card-1 hexagon" data-aos="zoom-in" data-aos-delay="500">
              <div class="card-glow"></div>
              <i class="fas fa-chart-line"></i>
              <span>Analytics</span>
              <div class="card-particles"></div>
            </div>
            <div class="floating-card card-2 triangle" data-aos="zoom-in" data-aos-delay="700">
              <div class="card-glow"></div>
              <i class="fas fa-users"></i>
              <span>Team</span>
              <div class="card-particles"></div>
            </div>
            <div class="floating-card card-3 pentagon" data-aos="zoom-in" data-aos-delay="900">
              <div class="card-glow"></div>
              <i class="fas fa-rocket"></i>
              <span>Growth</span>
              <div class="card-particles"></div>
            </div>
            <div class="floating-card card-4 diamond" data-aos="zoom-in" data-aos-delay="1100">
              <div class="card-glow"></div>
              <i class="fas fa-lightbulb"></i>
              <span>Innovation</span>
              <div class="card-particles"></div>
            </div>
            
            <!-- Enhanced main visual with holographic effect -->
            <div class="main-visual">
              <div class="hologram-container">
                <img :src="require('@/assets/logo.png')" alt="ESmart Logo" class="hero-logo" />
                <div class="hologram-grid"></div>
                <div class="hologram-rings">
                  <div class="ring ring-1"></div>
                  <div class="ring ring-2"></div>
                  <div class="ring ring-3"></div>
                  <div class="ring ring-4"></div>
                </div>
              </div>
              <div class="energy-field">
                <div class="energy-line" v-for="i in 8" :key="i"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced scroll indicator -->
    <div class="scroll-indicator" @click="scrollToSection('social-proof')" data-aos="fade-up" data-aos-delay="1400">
      <div class="scroll-container">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <div class="scroll-arrows">
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-chevron-down"></i>
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <span>{{ $t("hero.scrollDown") || "Scroll Down" }}</span>
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
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add staggered animation to floating cards
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
        observer.observe(element);
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
  },
  beforeUnmount() {
    // Cleanup any ongoing animations or intervals
    const particles = document.querySelectorAll('.particle, .mini-particle, .hover-particle');
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
  }
}
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: var(--gradient-magical);
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: orbitalFloat 25s infinite ease-in-out;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(240, 171, 252, 0.6) 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: 8s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.7) 0%, transparent 70%);
  top: 30%;
  right: 10%;
  animation-delay: 4s;
}

.orb-4 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%);
  top: 60%;
  left: 10%;
  animation-delay: 12s;
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
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
  animation: badgeBounce 3s ease-in-out infinite;
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

.badge-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid rgba(245, 158, 11, 0.6);
  border-radius: 50px;
  animation: badgePulse 3s infinite;
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
  gap: 2.5rem;
  margin-bottom: 3rem;
  animation: fadeInUp 1.2s ease-out 1.2s both;
}

.stat-item {
  text-align: center;
  position: relative;
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
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
    padding: 0 1rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .stat-item {
    flex: 1;
    min-width: 120px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .primary-button,
  .secondary-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .trusted-logos {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .floating-card {
    display: none;
  }
  
  .orb-4, .orb-5 {
    display: none;
  }
  
  .morphing-shapes {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .badge-icon {
    width: 28px;
    height: 28px;
    font-size: 12px;
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

/* Enhanced Particle System */
.particle-system {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: magicFloat 10s infinite ease-in-out;
}

.magic-particle:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
  background: var(--primary-color);
}

.magic-particle:nth-child(2) {
  left: 25%;
  animation-delay: 2s;
  background: var(--secondary-color);
}

.magic-particle:nth-child(3) {
  left: 50%;
  animation-delay: 4s;
  background: var(--tertiary-color);
}

.magic-particle:nth-child(4) {
  left: 75%;
  animation-delay: 6s;
  background: var(--accent-color);
}

.magic-particle:nth-child(5) {
  left: 90%;
  animation-delay: 8s;
  background: var(--success-color);
}

@keyframes magicFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) scale(1);
  }
  50% {
    transform: translateY(50vh) scale(1.2);
    opacity: 0.8;
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) scale(0.8);
  }
  100% {
    transform: translateY(-10vh) scale(0);
    opacity: 0;
  }
}

/* Enhanced Scroll Indicator with Multiple Arrows */
.scroll-indicator {
  position: relative;
}

.scroll-arrow {
  display: block;
  margin: 0.2rem auto;
  animation: arrowBounce 2s infinite ease-in-out;
}

.scroll-arrow:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrow:nth-child(3) {
  animation-delay: 0.4s;
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

/* Enhanced Text with Gradient Animation */
.hero-title {
  background: var(--gradient-energy);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Enhanced Subtitle with Typewriter Effect */
.hero-subtitle {
  overflow: hidden;
  border-right: 3px solid var(--accent-color);
  white-space: nowrap;
  animation: typewriter 3s steps(50) 1s both, blink 1s infinite;
}

@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

/* Enhanced Trusted By with Floating Effect */
.trusted-logos {
  animation: trustedFloat 5s ease-in-out infinite;
}

@keyframes trustedFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.logo-placeholder {
  animation: logoHover 3s ease-in-out infinite;
}

.logo-placeholder:nth-child(odd) {
  animation-delay: 0s;
}

.logo-placeholder:nth-child(even) {
  animation-delay: 1.5s;
}

@keyframes logoHover {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.05);
  }
}
</style>