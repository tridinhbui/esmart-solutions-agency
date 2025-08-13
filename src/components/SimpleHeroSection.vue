<template>
  <section class="simple-hero">
    <!-- Mystical Background Elements -->
    <div class="mystical-bg">
      <!-- Parallax Layers -->
      <div class="parallax-layer" data-speed="0.1">
        <div class="floating-orb orb-1" />
        <div class="floating-orb orb-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.3">
        <div class="floating-orb orb-3" />
        <div class="energy-field field-1" />
      </div>
      
      <div class="parallax-layer" data-speed="0.5">
        <div class="floating-orb orb-4" />
        <div class="energy-field field-2" />
        <div class="cosmic-waves">
          <div class="cosmic-wave wave-1" />
          <div class="cosmic-wave wave-2" />
        </div>
      </div>
      
      <div class="parallax-layer" data-speed="0.7">
        <div class="floating-orb orb-5" />
        <div class="energy-field field-3" />
        <div class="cosmic-waves">
          <div class="cosmic-wave wave-3" />
          <div class="cosmic-wave wave-4" />
        </div>
      </div>
      
      <div class="parallax-layer" data-speed="0.9">
        <!-- Mystical Particles -->
        <div class="mystical-particles">
          <div
            v-for="n in 30"
            :key="n"
            class="mystical-particle"
            :style="{ 
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 15 + 's',
              animationDuration: (8 + Math.random() * 12) + 's',
              '--particle-size': (3 + Math.random() * 8) + 'px'
            }"
          />
        </div>
        
        <!-- Stardust Trail -->
        <div class="stardust-trail" />
        
        <!-- Aurora Effect -->
        <div class="aurora-effect aurora-1" />
        <div class="aurora-effect aurora-2" />
        <div class="aurora-effect aurora-3" />
      </div>
    </div>

    <div class="container">
      <!-- Hero Content -->
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="company-name mystical-text">ESmart Solutions Agency</span>
          <span class="main-title mystical-text">Chuyển đổi Doanh nghiệp của Bạn</span>
        </h1>
        
        <p class="hero-description mystical-text glitch-text">
          {{ currentText }}<span v-if="isTyping" class="typing-cursor">|</span>
        </p>
        
        <!-- Improved Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card mystical-card glass-card">
            <div class="stat-number-wrapper">
              <span
                class="stat-number counter-animation mystical-number"
                data-target="500"
              >0</span>
              <span class="stat-plus mystical-accent">+</span>
            </div>
            <span class="stat-label mystical-label">Dự án</span>
          </div>
          
          <div class="stat-card mystical-card glass-card">
            <div class="stat-number-wrapper">
              <span
                class="stat-number counter-animation mystical-number"
                data-target="98"
              >0</span>
              <span class="stat-percent mystical-accent">%</span>
            </div>
            <span class="stat-label mystical-label">Hài lòng</span>
          </div>
          
          <div class="stat-card mystical-card glass-card">
            <div class="stat-number-wrapper">
              <span class="stat-number mystical-number">24/7</span>
            </div>
            <span class="stat-label mystical-label">Hỗ trợ</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button
            class="primary-btn mystical-btn"
            @click="scrollToAssessment"
          >
            <span class="btn-text">Bắt đầu ngay</span>
            <div class="btn-glow" />
          </button>
          <button
            class="secondary-btn mystical-btn"
            @click="scrollToAbout"
          >
            <span class="btn-text">Khám Phá</span>
            <div class="btn-glow" />
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
      animatedElements: [],
      stats: [
        { number: "500+", label: "Projects" },
        { number: "98%", label: "Satisfaction" },
        { number: "24/7", label: "Support" }
      ],
      currentText: "",
      fullText: "ESmart Solutions Agency - Đối tác tin cậy cho sự phát triển bền vững",
      textIndex: 0,
      isTyping: true,
      gradientAngle: 0,
      glitchActive: false
    };
  },
  mounted() {
    this.initializeMysticalEffects();
    this.startCounterAnimation();
    this.setupScrollAnimation();
    this.setupParallaxEffect();
    this.startTypewriterEffect();
    this.startGradientAnimation();
    this.startGlitchEffect();
  },
  methods: {
    initializeMysticalEffects() {
      // Add mystical entrance animations
      const elements = document.querySelectorAll('.mystical-text, .mystical-card, .mystical-btn');
      elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('mystical-entrance');
      });
    },
    startCounterAnimation() {
      const counters = document.querySelectorAll('.counter-animation');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current);
        }, 16);
      });
    },
    scrollToAssessment() {
      // Scroll to assessment section
      console.log('Scroll to assessment');
    },
    scrollToAbout() {
      // Scroll to about section
      console.log('Scroll to about');
    },
    
    setupScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add staggered delay based on element type
            const delay = this.getAnimationDelay(entry.target);
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });

      // Observe all elements with animation classes
      this.$nextTick(() => {
        const elements = this.$el.querySelectorAll('.slide-in-element, .fade-in-element, .slide-in-up, .slide-in-left, .slide-in-right, .move-in-element');
        elements.forEach(el => {
          observer.observe(el);
        });
      });
    },
    
    getAnimationDelay(element) {
      const classList = element.classList;
      
      if (classList.contains('slide-in-element')) return 0;
      if (classList.contains('slide-in-up')) return 300;
      if (classList.contains('slide-in-left')) return 450;
      if (classList.contains('slide-in-right')) return 600;
      if (classList.contains('move-in-element')) return 750;
      
      return 0;
    },
    
    setupParallaxEffect() {
      // Scroll-based parallax
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = this.$el.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.speed) || 0.5;
          const yPos = -(scrolled * speed);
          const scale = 1 + (scrolled * 0.0001);
          const rotate = scrolled * 0.01;
          
          element.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotate}deg)`;
        });
      });
      
      // Mouse-based parallax for 3D effect
      this.$el.addEventListener('mousemove', (e) => {
        const rect = this.$el.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const parallaxElements = this.$el.querySelectorAll('.parallax-layer');
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.speed) || 0.5;
          const xOffset = (mouseX - centerX) * speed * 0.01;
          const yOffset = (mouseY - centerY) * speed * 0.01;
          
          const currentTransform = element.style.transform;
          const scrollTransform = currentTransform.includes('translateY') ? currentTransform : '';
          
          element.style.transform = `${scrollTransform} translate(${xOffset}px, ${yOffset}px)`;
        });
      });
    },
    
    startTypewriterEffect() {
      const typeInterval = setInterval(() => {
        if (this.textIndex < this.fullText.length) {
          this.currentText += this.fullText[this.textIndex];
          this.textIndex++;
        } else {
          clearInterval(typeInterval);
          this.isTyping = false;
        }
      }, 100);
    },
    
    startGradientAnimation() {
      setInterval(() => {
        this.gradientAngle = (this.gradientAngle + 1) % 360;
        const gradientElements = this.$el.querySelectorAll('.animated-gradient');
        gradientElements.forEach(element => {
          element.style.background = `linear-gradient(${this.gradientAngle}deg, #0f172a 0%, #1e3a8a 25%, #3b82f6 50%, #1e3a8a 75%, #0f172a 100%)`;
        });
      }, 50);
    },
    
    startGlitchEffect() {
      setInterval(() => {
        this.glitchActive = !this.glitchActive;
        const glitchElements = this.$el.querySelectorAll('.glitch-text');
        glitchElements.forEach(element => {
          if (this.glitchActive) {
            element.style.textShadow = `
              2px 0 #ff0000,
              -2px 0 #00ffff,
              0 2px #00ff00,
              0 -2px #ff00ff
            `;
            element.style.transform = 'translate(2px, -1px)';
          } else {
            element.style.textShadow = 'none';
            element.style.transform = 'translate(0, 0)';
          }
        });
      }, 200);
    }
  }
};
</script>

<style scoped>
/* Mystical Hero Section */
.simple-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

.simple-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #0f172a 0%, #1e3a8a 25%, #3b82f6 50%, #1e3a8a 75%, #0f172a 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  opacity: 0.3;
  z-index: 0;
}

/* Mystical Background Elements */
.mystical-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Parallax Layers */
.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  will-change: transform;
}

.parallax-layer[data-speed="0.1"] { z-index: 1; }
.parallax-layer[data-speed="0.3"] { z-index: 2; }
.parallax-layer[data-speed="0.5"] { z-index: 3; }
.parallax-layer[data-speed="0.7"] { z-index: 4; }
.parallax-layer[data-speed="0.9"] { z-index: 5; }

/* Typewriter Effect */
.typing-cursor {
  animation: blink 1s infinite;
  color: #3b82f6;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Glitch Effect */
.glitch-text {
  position: relative;
  transition: all 0.2s ease;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.glitch-text::before {
  color: #ff0000;
  animation: glitch-1 0.3s infinite;
}

.glitch-text::after {
  color: #00ffff;
  animation: glitch-2 0.3s infinite;
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
}

/* Animated Gradient Background */
.animated-gradient {
  background: linear-gradient(0deg, #0f172a 0%, #1e3a8a 25%, #3b82f6 50%, #1e3a8a 75%, #0f172a 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Enhanced Background Animation */
.simple-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(15, 23, 42, 0.1) 0%, transparent 50%);
  animation: backgroundFloat 20s ease-in-out infinite;
  z-index: 0;
}

@keyframes backgroundFloat {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.1;
  }
  25% { 
    transform: translate(-20px, -20px) scale(1.1);
    opacity: 0.15;
  }
  50% { 
    transform: translate(20px, -10px) scale(0.9);
    opacity: 0.2;
  }
  75% { 
    transform: translate(-10px, 20px) scale(1.05);
    opacity: 0.15;
  }
}

/* Enhanced Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-8px) scale(1.02);
}

.glass-card:hover::before {
  left: 100%;
}

/* Special glassmorphism for hero stats */
.stat-card.glass-card {
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
}

.stat-card.glass-card:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-10px) scale(1.03);
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
  filter: blur(25px);
  animation: orbFloat 12s ease-in-out infinite;
}

.orb-1 {
  width: 250px;
  height: 250px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 180px;
  height: 180px;
  top: 60%;
  right: 15%;
  animation-delay: 3s;
}

.orb-3 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  left: 20%;
  animation-delay: 6s;
}

.orb-4 {
  width: 200px;
  height: 200px;
  top: 30%;
  right: 30%;
  animation-delay: 9s;
}

.orb-5 {
  width: 150px;
  height: 150px;
  bottom: 40%;
  right: 10%;
  animation-delay: 12s;
}

/* Energy Fields */
.energy-field {
  position: absolute;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.1), transparent);
  filter: blur(30px);
  animation: energyPulse 8s ease-in-out infinite;
}

.field-1 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.field-2 {
  width: 300px;
  height: 300px;
  top: 20%;
  left: 20%;
  animation-delay: 2s;
}

.field-3 {
  width: 350px;
  height: 350px;
  bottom: 10%;
  right: 20%;
  animation-delay: 4s;
}

/* Mystical Particles */
.mystical-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mystical-particle {
  position: absolute;
  width: var(--particle-size);
  height: var(--particle-size);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 100%);
  border-radius: 50%;
  animation: particleFloat 15s linear infinite;
}

/* Cosmic Waves */
.cosmic-waves {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cosmic-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(96, 165, 250, 0.05) 0%, transparent 70%);
  filter: blur(40px);
  animation: cosmicWave 20s ease-in-out infinite;
}

.wave-1 { animation-delay: 0s; }
.wave-2 { animation-delay: 5s; }
.wave-3 { animation-delay: 10s; }
.wave-4 { animation-delay: 15s; }

/* Stardust Trail */
.stardust-trail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.2), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.3), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: stardustMove 25s linear infinite;
}

/* Aurora Effect */
.aurora-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    transparent 0%, 
    rgba(96, 165, 250, 0.03) 25%, 
    rgba(147, 197, 253, 0.05) 50%, 
    rgba(96, 165, 250, 0.03) 75%, 
    transparent 100%);
  filter: blur(50px);
  animation: auroraShift 30s ease-in-out infinite;
}

.aurora-1 { animation-delay: 0s; }
.aurora-2 { animation-delay: 10s; }
.aurora-3 { animation-delay: 20s; }

.container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 3;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Hero Title */
.hero-title {
  margin-bottom: 2rem;
}

.company-name {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 15px rgba(96, 165, 250, 0.6);
  animation: companyNameGlow 4s ease-in-out infinite;
}

.main-title {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.4);
  animation: mainTitleFloat 6s ease-in-out infinite;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #bfdbfe;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: descriptionFade 3s ease-out 1s backwards;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 24px;
  padding: 2rem 1rem;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(30, 58, 138, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
  transition: left 0.8s ease;
  z-index: 1;
}

.stat-card:hover::before {
  left: 100%;
}

.stat-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 
    0 24px 72px rgba(30, 58, 138, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2);
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.98);
}

.stat-number-wrapper {
  position: relative;
  z-index: 2;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e3a8a;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-plus,
.stat-percent {
  font-size: 1.5rem;
  color: #3b82f6;
  font-weight: 600;
}

.stat-label {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  position: relative;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.primary-btn {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  color: #ffffff;
  box-shadow: 0 8px 25px rgba(96, 165, 250, 0.4);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #1e3a8a;
  border: 2px solid #1e3a8a;
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.2);
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.primary-btn:hover .btn-glow,
.secondary-btn:hover .btn-glow {
  width: 300px;
  height: 300px;
}

.primary-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(96, 165, 250, 0.5);
}

.secondary-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
  background: #1e3a8a;
  color: #ffffff;
}

/* Mystical Entrance Animation */
.mystical-entrance {
  animation: mysticalEntrance 1.5s ease-out forwards;
}

/* Animation Keyframes */
@keyframes orbFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1); 
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-30px) rotate(180deg) scale(1.1); 
    opacity: 1;
  }
}

@keyframes energyPulse {
  0%, 100% { 
    transform: scale(1) rotate(0deg); 
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.2) rotate(180deg); 
    opacity: 0.6;
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes cosmicWave {
  0%, 100% { 
    transform: scale(1) translateX(0); 
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.1) translateX(20px); 
    opacity: 0.6;
  }
}

@keyframes stardustMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

@keyframes auroraShift {
  0%, 100% { 
    transform: translateX(0) skewX(0deg); 
    opacity: 0.3;
  }
  50% { 
    transform: translateX(50px) skewX(5deg); 
    opacity: 0.6;
  }
}

@keyframes companyNameGlow {
  0%, 100% { 
    text-shadow: 0 2px 15px rgba(96, 165, 250, 0.6);
  }
  50% { 
    text-shadow: 0 4px 25px rgba(96, 165, 250, 0.8), 0 0 30px rgba(96, 165, 250, 0.4);
  }
}

@keyframes mainTitleFloat {
  0%, 100% { 
    transform: translateY(0); 
    text-shadow: 0 4px 20px rgba(255, 255, 255, 0.4);
  }
  50% { 
    transform: translateY(-5px); 
    text-shadow: 0 6px 30px rgba(255, 255, 255, 0.6);
  }
}

@keyframes descriptionFade {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mysticalEntrance {
  from {
    opacity: 0;
    transform: translateY(50px) rotateX(-30deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-hero {
    padding: 1rem;
  }
  
  .company-name {
    font-size: 2rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .floating-orb {
    display: none;
  }
}

@media (max-width: 480px) {
  .company-name {
    font-size: 1.75rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style>