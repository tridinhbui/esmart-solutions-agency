<template>
  <section class="simple-hero">
    <!-- Ocean Background with Radial Gradient -->
    <div class="ocean-background">
      <div class="radial-glow"></div>
      <div class="light-rays"></div>
      <div class="ocean-particles">
        <div class="particle" v-for="n in 20" :key="n"></div>
      </div>
      <div class="wave-overlay">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div>
    </div>

    <div class="container">
      <!-- Hero Content -->
      <div class="hero-content">
        <!-- Company Name with Ocean Glow -->
        <div class="company-name-container slide-up-element" data-delay="0.2">
          <span class="company-name">ESmart Solutions Agency</span>
          <div class="company-glow"></div>
        </div>
        
        <!-- Main Title with Ocean Accent -->
        <h1 class="main-title">
          <span class="title-main slide-up-element" data-delay="0.4">Đối tác tin cậy cho sự</span>
          <span class="title-accent slide-up-element" data-delay="0.6">phát triển bền vững</span>
        </h1>
        
        <!-- Hero Description -->
        <p class="hero-description slide-up-element" data-delay="0.8">
          {{ currentText }}<span v-if="isTyping" class="typing-cursor">|</span>
        </p>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button
            class="cta-primary modern-btn slide-up-element"
            data-delay="1.0"
            @click="scrollToAssessment"
          >
            <span class="btn-text">Bắt đầu ngay</span>
            <div class="btn-glow"></div>
          </button>
          <button
            class="cta-secondary modern-btn slide-up-element"
            data-delay="1.2"
            @click="scrollToAbout"
          >
            <span class="btn-text">Khám Phá</span>
          </button>
        </div>
      </div>

      <!-- Stats Grid with Ocean Theme -->
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-card glass-card slide-up-element"
          :data-delay="1.4 + (index * 0.1)"
        >
          <div class="stat-number counter-animation" :data-target="stat.number">
            {{ stat.number }}
          </div>
          <div class="stat-label">{{ stat.label }}</div>
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
      currentText: '',
      fullText: 'Chúng tôi cung cấp giải pháp công nghệ toàn diện giúp doanh nghiệp tối ưu hóa quy trình, tăng hiệu suất và phát triển bền vững trong kỷ nguyên số.',
      isTyping: true,
      stats: [
        { number: 500, label: 'Dự án' },
        { number: 98, label: 'Hài lòng' },
        { number: '24/7', label: 'Hỗ trợ' }
      ]
    };
  },
  mounted() {
    this.startTyping();
    this.initSlideUpAnimations();
  },
  methods: {
    startTyping() {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= this.fullText.length) {
          this.currentText = this.fullText.slice(0, index);
          index++;
        } else {
          clearInterval(typeInterval);
          this.isTyping = false;
        }
      }, 50);
    },
    
    initSlideUpAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay * 1000);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all slide-up elements
      const slideElements = document.querySelectorAll('.slide-up-element');
      slideElements.forEach(el => observer.observe(el));
    },

    scrollToAssessment() {
      const element = document.getElementById('marketing-assessment');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    scrollToAbout() {
      const element = document.getElementById('about-us');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
/* Ocean Hero Section */
.simple-hero {
  background: radial-gradient(ellipse at center, #3B82F6 0%, #1E40AF 40%, #1E293B 100%);
  color: #ffffff;
  padding: 8rem 2rem 6rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Ocean Background Elements */
.ocean-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Radial Glow Effect */
.radial-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(30, 64, 175, 0.2) 40%, transparent 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: oceanGlow 8s ease-in-out infinite;
  filter: blur(40px);
}

/* Light Rays Effect */
.light-rays {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
    linear-gradient(-45deg, transparent 40%, rgba(59, 130, 246, 0.08) 50%, transparent 60%),
    linear-gradient(90deg, transparent 40%, rgba(59, 130, 246, 0.06) 50%, transparent 60%);
  animation: lightRays 12s ease-in-out infinite;
}

/* Ocean Particles */
.ocean-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ocean-particles .particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(147, 197, 253, 0.8);
  border-radius: 50%;
  animation: oceanParticleFloat 15s ease-in-out infinite;
}

.ocean-particles .particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
.ocean-particles .particle:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
.ocean-particles .particle:nth-child(3) { top: 30%; left: 20%; animation-delay: 2s; }
.ocean-particles .particle:nth-child(4) { top: 40%; left: 70%; animation-delay: 3s; }
.ocean-particles .particle:nth-child(5) { top: 50%; left: 15%; animation-delay: 4s; }
.ocean-particles .particle:nth-child(6) { top: 60%; left: 85%; animation-delay: 5s; }
.ocean-particles .particle:nth-child(7) { top: 70%; left: 25%; animation-delay: 6s; }
.ocean-particles .particle:nth-child(8) { top: 80%; left: 75%; animation-delay: 7s; }
.ocean-particles .particle:nth-child(9) { top: 90%; left: 35%; animation-delay: 8s; }
.ocean-particles .particle:nth-child(10) { top: 15%; left: 90%; animation-delay: 9s; }
.ocean-particles .particle:nth-child(11) { top: 25%; left: 5%; animation-delay: 10s; }
.ocean-particles .particle:nth-child(12) { top: 35%; left: 95%; animation-delay: 11s; }
.ocean-particles .particle:nth-child(13) { top: 45%; left: 8%; animation-delay: 12s; }
.ocean-particles .particle:nth-child(14) { top: 55%; left: 88%; animation-delay: 13s; }
.ocean-particles .particle:nth-child(15) { top: 65%; left: 12%; animation-delay: 14s; }
.ocean-particles .particle:nth-child(16) { top: 75%; left: 92%; animation-delay: 15s; }
.ocean-particles .particle:nth-child(17) { top: 85%; left: 18%; animation-delay: 16s; }
.ocean-particles .particle:nth-child(18) { top: 95%; left: 82%; animation-delay: 17s; }
.ocean-particles .particle:nth-child(19) { top: 5%; left: 45%; animation-delay: 18s; }
.ocean-particles .particle:nth-child(20) { top: 55%; left: 55%; animation-delay: 19s; }

/* Wave Overlay */
.wave-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  z-index: 2;
}

.wave-overlay svg {
  width: 100%;
  height: 100%;
}

.shape-fill {
  fill: rgba(147, 197, 253, 0.15);
}

/* Container */
.container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 3;
}

/* Hero Content */
.hero-content {
  margin-bottom: 4rem;
}

/* Slide Up Animation Elements */
.slide-up-element {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-up-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Company Name Container */
.company-name-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.company-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
}

.company-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: companyGlow 4s ease-in-out infinite;
  filter: blur(20px);
}

/* Main Title */
.main-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.title-main {
  display: block;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.title-accent {
  display: block;
  color: #93C5FD;
  background: linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(147, 197, 253, 0.5));
}

/* Hero Description */
.hero-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6;
  color: #D0E7F7;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

/* CTA Primary Button */
.cta-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 1.2rem 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.cta-primary:hover {
  background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.5);
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.cta-primary:hover .btn-glow {
  width: 300px;
  height: 300px;
}

/* CTA Secondary Button */
.cta-secondary {
  background: #1A1A1A;
  color: #ffffff;
  border: 2px solid #3B82F6;
  border-radius: 10px;
  padding: 1.2rem 2.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.cta-secondary:hover {
  background: #3B82F6;
  color: #ffffff;
  border-color: #60A5FA;
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(59, 130, 246, 0.3);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(147, 197, 253, 0.2);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(147, 197, 253, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

.stat-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #3B82F6;
  margin-bottom: 0.5rem;
  display: block;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
}

.stat-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #D0E7F7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Typing Cursor */
.typing-cursor {
  animation: blink 1s infinite;
  color: #3B82F6;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Ocean Animations */
@keyframes oceanGlow {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
  }
}

@keyframes lightRays {
  0%, 100% { 
    opacity: 0.1;
    transform: rotate(0deg);
  }
  50% { 
    opacity: 0.15;
    transform: rotate(180deg);
  }
}

@keyframes oceanParticleFloat {
  0%, 100% { 
    transform: translateY(0px) scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

@keyframes companyGlow {
  0%, 100% { 
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-hero {
    padding: 6rem 1.5rem 4rem;
  }
  
  .main-title {
    font-size: 3rem;
  }
  
  .company-name {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .company-name {
    font-size: 1.8rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .cta-primary,
  .cta-secondary {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}
</style>