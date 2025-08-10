<template>
  <section class="simple-hero magical-hero">
    <!-- Magical Background -->
    <div class="magical-bg">
      <div class="floating-particles">
        <div v-for="n in 50" :key="n" class="particle" 
             :style="{ 
               left: Math.random() * 100 + '%',
               animationDelay: Math.random() * 15 + 's',
               animationDuration: (15 + Math.random() * 10) + 's'
             }"></div>
      </div>
      
      <div class="morphing-shapes">
        <div class="morph-shape morph-1"></div>
        <div class="morph-shape morph-2"></div>
        <div class="morph-shape morph-3"></div>
      </div>
    </div>

    <div class="container">

      <!-- Magical Hero Content -->
      <div class="magical-hero-content">
        <h1 class="magical-title holographic-text">
          <span class="company-name typing-effect mystical-glow">ESmart Solutions Agency</span>
          <span class="main-title glitch-effect dimensional-shift">Chuyển đổi Doanh nghiệp của Bạn</span>
        </h1>
        <p class="simple-hero-description spectral-shimmer">
          ESmart Solutions Agency là đối tác, người bạn đồng hành chuyên nghiệp cùng doanh nghiệp Việt Nam trên hành trình xây dựng và phát triển thương hiệu uy tín, chất lượng.
        </p>
        <div class="simple-stats-grid">
          <div class="simple-stat-card scroll-reveal cosmic-pulse">
            <span class="stat-number counter-animation" data-target="500">0</span>
            <span class="stat-label">Dự án</span>
          </div>
          <div class="simple-stat-card scroll-reveal cosmic-pulse" style="animation-delay: 0.2s;">
            <span class="stat-number counter-animation" data-target="98">0</span>
            <span class="stat-label">Hài lòng%</span>
          </div>
          <div class="simple-stat-card scroll-reveal cosmic-pulse" style="animation-delay: 0.4s;">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Hỗ trợ 24/7</span>
          </div>
        </div>
        <div class="simple-action-buttons">
          <button class="simple-primary-btn enchanted-btn astral-projection" @click="scrollToAssessment">
            Bắt đầu ngay
          </button>
                  <button class="simple-secondary-btn enchanted-btn ethereal-float" @click="scrollToAbout">
          Khám Phá
        </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SimpleHeroSection',
  data() {
    return {
      stats: [
        { number: "500+", label: "Projects" },
        { number: "98%", label: "Satisfaction" },
        { number: "24/7", label: "Support" }
      ]
    };
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
    
    scrollToAssessment() {
      this.scrollToSection('marketing-assessment');
    },
    
    scrollToAbout() {
      this.$router.push('/about');
    },
    
    goToElegantDemo() {
      this.$router.push('/about');
    },
    
    // Initialize counter animations
    initCounterAnimations() {
      const counters = document.querySelectorAll('.counter-animation');
      
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      counters.forEach(counter => {
        observer.observe(counter);
      });
    },
    
    // Animate counter numbers
    animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };
      
      updateCounter();
    },
    
    // Initialize scroll animations
    initScrollAnimations() {
      const animatedElements = document.querySelectorAll('.scroll-reveal');
      
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }, observerOptions);
      
      animatedElements.forEach(element => {
        observer.observe(element);
      });
    }
  },
  
  mounted() {
    // Initialize animations after component is mounted
    this.$nextTick(() => {
      this.initCounterAnimations();
      this.initScrollAnimations();
    });
  }
}
</script>

<style scoped>
/* Simple Hero Section - White Background, Black Text */
.simple-hero {
  background: #ffffff;
  color: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Simple Title Styles */
.simple-hero-title {
  margin-bottom: 2rem;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #000000;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-align: center;
}

.title-line {
  color: #000000;
  font-weight: 700;
}

.sub-title {
  font-size: 1.4rem;
  color: #333333;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Simple Description */
.simple-hero-description {
  font-size: 1.1rem;
  color: #666666;
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;
}

/* Simple Stats Grid */
.simple-stats-grid {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.simple-stat-card {
  text-align: center;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: white;
  min-width: 120px;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Simple Action Buttons */
.simple-action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.simple-primary-btn,
.simple-secondary-btn,
.simple-elegant-btn {
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid;
  text-decoration: none;
  display: inline-block;
}

.simple-primary-btn {
  background: black;
  color: white;
  border-color: black;
}

.simple-primary-btn:hover {
  background: #333;
  border-color: #333;
}

.simple-secondary-btn {
  background: white;
  color: black;
  border-color: black;
}

.simple-secondary-btn:hover {
  background: #f5f5f5;
}

.simple-elegant-btn {
  background: #f8f8f8;
  color: black;
  border-color: #ddd;
}

.simple-elegant-btn:hover {
  background: #e8e8e8;
  border-color: #bbb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-hero-section {
    padding: 1rem;
  }
  
  .simple-stats-grid {
    gap: 1.5rem;
  }
  
  .simple-action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .simple-primary-btn,
  .simple-secondary-btn,
  .simple-elegant-btn {
    width: 100%;
    max-width: 300px;
  }
}

/* Magical Hero Animations */
.magical-hero {
  position: relative;
  overflow: hidden;
}

.magical-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 4rem;
  animation: slideDown 1s ease-out;
}

.animated-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  animation: logoGlow 3s ease-in-out infinite;
}

.logo-accent {
  font-size: 1.5rem;
  font-weight: 300;
  color: #333;
  animation: logoFloat 2s ease-in-out infinite;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.magical-link {
  color: black;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  animation: linkFadeIn 0.8s ease-out backwards;
}

.magical-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: black;
  transition: width 0.3s ease;
}

.magical-link:hover::after {
  width: 100%;
}

.magical-link:hover {
  transform: translateY(-2px);
}

.magical-select {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.magical-select:hover {
  border-color: black;
  transform: scale(1.05);
}

/* Hero Content Animations */
.magical-hero-content {
  text-align: center;
  animation: heroContentFadeIn 1.5s ease-out;
}

.magical-title {
  margin-bottom: 2rem;
}

.typing-effect {
  display: block;
  font-size: 1.2rem;
  color: #000000;
  margin-bottom: 1rem;
  overflow: hidden;
  border-right: 2px solid black;
  white-space: nowrap;
  animation: typewriter 3s steps(40) 1s both, blinkCursor 2s infinite;
}

.glitch-effect {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.fade-in-up {
  animation: fadeInUp 1s ease-out 0.5s both;
}

/* Magical Stats */
.magical-stats-grid {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.magical-stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background: white;
  min-width: 140px;
  position: relative;
  animation: cardFloatIn 1s ease-out backwards;
  transition: all 0.4s ease;
  overflow: hidden;
}

.magical-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  transition: left 0.6s ease;
}

.magical-stat-card:hover::before {
  left: 100%;
}

.magical-stat-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: black;
}

.counter-animation {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.5rem;
  animation: countUp 2s ease-out 1s both;
}

/* Magical Buttons */
.magical-action-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.magical-primary-btn,
.magical-secondary-btn,
.magical-elegant-btn {
  padding: 1.2rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.magical-primary-btn {
  background: black;
  color: white;
  border-color: black;
  animation: buttonPulse 2s ease-in-out infinite;
}

.pulse-glow {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  animation: pulseGlow 2s ease-in-out infinite;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.magical-primary-btn:hover .btn-ripple {
  width: 300px;
  height: 300px;
}

.magical-secondary-btn {
  background: white;
  color: black;
  border-color: black;
}

.hover-morph:hover {
  transform: translateY(-5px) rotate(2deg);
  border-radius: 15px;
}

.magical-elegant-btn {
  background: transparent;
  color: black;
  border-color: black;
  border-style: dashed;
}

.floating-btn {
  animation: floatingButton 3s ease-in-out infinite;
}

/* Animation Keyframes */
@keyframes slideDown {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes logoGlow {
  0%, 100% { text-shadow: none; }
  50% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.3); }
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes linkFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroContentFadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blinkCursor {
  50% { border-color: transparent; }
}

@keyframes glitchTitle {
  0%, 100% { 
    transform: translateX(0);
    text-shadow: none;
  }
  10% { 
    transform: translateX(-2px);
    text-shadow: 2px 0 rgba(0, 0, 0, 0.1);
  }
  20% { 
    transform: translateX(2px);
    text-shadow: -2px 0 rgba(0, 0, 0, 0.1);
  }
  30% { transform: translateX(0); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardFloatIn {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes countUp {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes buttonPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes pulseGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  }
}

@keyframes floatingButton {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style> 