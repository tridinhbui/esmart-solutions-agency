<template>
  <section class="simple-about">
    <!-- Elegant Background Elements -->
    <div class="elegant-bg">
      <div class="parallax-layer" data-speed="0.1">
        <div class="geometric-pattern pattern-1" />
        <div class="geometric-pattern pattern-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.3">
        <div class="geometric-pattern pattern-3" />
        <div class="flowing-waves wave-1" />
      </div>
      
      <div class="parallax-layer" data-speed="0.5">
        <div class="flowing-waves wave-2" />
        <div class="elegant-dots dot-1" />
        <div class="elegant-dots dot-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.7">
        <div class="elegant-dots dot-3" />
      </div>
    </div>

    <div class="container">
      <!-- Enhanced City Skyline Background -->
      <div class="city-skyline-bg">
        <div class="skyline-overlay"></div>
        
        <!-- Floating Elements -->
        <div class="floating-elements">
          <div class="floating-icon icon-1">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="floating-icon icon-2">
            <i class="fas fa-chart-line"></i>
        </div>
          <div class="floating-icon icon-3">
            <i class="fas fa-coins"></i>
            </div>
          <div class="floating-icon icon-4">
            <i class="fas fa-rocket"></i>
            </div>
          </div>
        
        <!-- Main Content -->
        <div class="skyline-content">
          <div class="message-container">
            <!-- Pre-title -->
            <div class="pre-title">
              <span class="pre-title-text">The Question Is</span>
              <div class="pre-title-line"></div>
        </div>

            <!-- Main Message -->
            <h1 class="main-message">
              <span class="ready-text slide-up-element" data-delay="0.2">READY TO</span>
              <span class="make-text slide-up-element" data-delay="0.4">MAKE</span>
              <span class="cash-text slide-up-element" data-delay="0.6">CASH?</span>
            </h1>
            
            <!-- Sub Message -->
            <p class="sub-message slide-up-element" data-delay="0.8">
              Transform your business with our proven strategies and innovative solutions
            </p>
            
            <!-- CTA Buttons -->
            <div class="cta-buttons">
              <button class="primary-cta slide-up-element" data-delay="1.0" @click="startJourney">
                <i class="fas fa-rocket"></i>
                <span>Start Your Journey</span>
              </button>
              <button class="secondary-cta slide-up-element" data-delay="1.2" @click="learnMore">
                <i class="fas fa-info-circle"></i>
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Animated Background Elements -->
        <div class="bg-animations">
          <div class="money-rain">
            <div class="money-symbol" v-for="n in 8" :key="n" :style="{ animationDelay: (n * 0.5) + 's' }">$</div>
          </div>
          <div class="pulse-rings">
            <div class="pulse-ring ring-1"></div>
            <div class="pulse-ring ring-2"></div>
            <div class="pulse-ring ring-3"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleAboutUs",
  data() {
    return {
      animatedElements: [],
      companyValues: [
        {
          title: this.$t('companyValues.respect'),
          description: this.$t('companyValues.respectDesc'),
          icon: "fas fa-heart"
        },
        {
          title: this.$t('companyValues.efficiency'),
          description: this.$t('companyValues.efficiencyDesc'),
          icon: "fas fa-rocket"
        },
        {
          title: this.$t('companyValues.professionalism'),
          description: this.$t('companyValues.professionalismDesc'),
          icon: "fas fa-medal"
        },
        {
          title: this.$t('companyValues.innovation'),
          description: this.$t('companyValues.innovationDesc'),
          icon: "fas fa-lightbulb"
        }
      ],
      companyStats: [
        {
          number: "500+",
          label: this.$t('companyStats.completedProjects'),
          description: this.$t('companyStats.completedProjectsDesc'),
          percentage: 95
        },
        {
          number: "98%",
          label: this.$t('companyStats.satisfiedCustomers'),
          description: this.$t('companyStats.satisfiedCustomersDesc'),
          percentage: 98
        },
        {
          number: "24/7",
          label: this.$t('companyStats.customerSupport'),
          description: this.$t('companyStats.customerSupportDesc'),
          percentage: 100
        },
        {
          number: "5+",
          label: this.$t('companyStats.yearsExperience'),
          description: this.$t('companyStats.yearsExperienceDesc'),
          percentage: 85
        }
      ],
      teamMembers: [
        {
          name: "Nguyễn Văn A",
          position: this.$t('teamMembers.ceo'),
          description: this.$t('teamMembers.ceoDesc'),
          avatar: "https://via.placeholder.com/150x150/1e3a8a/ffffff?text=CEO",
          social: [
            { icon: "fab fa-linkedin", link: "#" },
            { icon: "fab fa-twitter", link: "#" },
            { icon: "fab fa-github", link: "#" }
          ]
        },
        {
          name: "Trần Thị B",
          position: this.$t('teamMembers.cto'),
          description: this.$t('teamMembers.ctoDesc'),
          avatar: "https://via.placeholder.com/150x150/3b82f6/ffffff?text=CTO",
          social: [
            { icon: "fab fa-linkedin", link: "#" },
            { icon: "fab fa-github", link: "#" }
          ]
        },
        {
          name: "Lê Văn C",
          position: this.$t('teamMembers.headOfDesign'),
          description: this.$t('teamMembers.headOfDesignDesc'),
          avatar: "https://via.placeholder.com/150x150/60a5fa/ffffff?text=Design",
          social: [
            { icon: "fab fa-dribbble", link: "#" },
            { icon: "fab fa-behance", link: "#" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.initSlideUpAnimations();
  },
  methods: {
    handleImageError(event) {
      event.target.src = "https://via.placeholder.com/150x150/1e3a8a/ffffff?text=Avatar";
    },
    startJourney() {
      // Scroll to footer or contact section
      const footer = document.querySelector('.simple-footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    learnMore() {
      // Scroll to features section
      const features = document.querySelector('.simple-features');
      if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    initSlideUpAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay) || 0;
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
      const slideUpElements = document.querySelectorAll('.slide-up-element');
      slideUpElements.forEach(el => observer.observe(el));
    },
    initSequentialAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay) || 0;
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay * 1000);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all sequential elements
      const sequentialElements = document.querySelectorAll('.sequential-text, .sequential-appear');
      sequentialElements.forEach(el => observer.observe(el));
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
      if (classList.contains('fade-in-element')) return 150;
      if (classList.contains('slide-in-up')) return 300;
      if (classList.contains('slide-in-left')) return 450;
      if (classList.contains('slide-in-right')) return 600;
      if (classList.contains('move-in-element')) return 750;
      
      return 0;
    },
    
    setupParallaxEffect() {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = this.$el.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach(element => {
          const speed = parseFloat(element.dataset.speed) || 0.5;
          const yPos = -(scrolled * speed);
          const scale = 1 + (scrolled * 0.0001);
          const rotate = scrolled * 0.005;
          
          element.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotate}deg)`;
        });
      });
    }
  }
};
</script>

<style scoped>
/* Enhanced City Skyline Background Section */
.simple-about {
  position: relative;
  min-height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

.container {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
}

/* Enhanced City Skyline Background */
.city-skyline-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23f8fafc;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ffffff;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23sky)"/><g fill="%233b82f6" opacity="0.3"><rect x="100" y="400" width="80" height="300" rx="5"/><rect x="200" y="300" width="100" height="400" rx="5"/><rect x="320" y="350" width="90" height="350" rx="5"/><rect x="430" y="250" width="120" height="450" rx="5"/><rect x="570" y="200" width="150" height="500" rx="5"/><rect x="740" y="280" width="110" height="420" rx="5"/><rect x="870" y="320" width="95" height="380" rx="5"/><rect x="985" y="180" width="130" height="520" rx="5"/><rect x="1135" y="400" width="65" height="300" rx="5"/></g><g fill="%231e40af" opacity="0.2"><rect x="150" y="450" width="60" height="250" rx="3"/><rect x="250" y="380" width="70" height="320" rx="3"/><rect x="350" y="420" width="65" height="280" rx="3"/><rect x="450" y="320" width="85" height="380" rx="3"/><rect x="600" y="270" width="110" height="430" rx="3"/><rect x="780" y="350" width="75" height="350" rx="3"/><rect x="920" y="390" width="65" height="310" rx="3"/><rect x="1020" y="250" width="95" height="450" rx="3"/><rect x="1160" y="450" width="40" height="250" rx="3"/></g><g fill="%2360a5fa" opacity="0.15"><rect x="180" y="500" width="40" height="200" rx="2"/><rect x="280" y="430" width="50" height="270" rx="2"/><rect x="380" y="470" width="45" height="230" rx="2"/><rect x="480" y="370" width="65" height="330" rx="2"/><rect x="630" y="320" width="80" height="380" rx="2"/><rect x="800" y="400" width="55" height="300" rx="2"/><rect x="940" y="440" width="45" height="260" rx="2"/><rect x="1040" y="300" width="70" height="400" rx="2"/><rect x="1170" y="480" width="30" height="220" rx="2"/></g><g fill="%233b82f6" opacity="0.1"><circle cx="200" cy="150" r="3"/><circle cx="400" cy="120" r="4"/><circle cx="600" cy="180" r="2"/><circle cx="800" cy="100" r="3"/><circle cx="1000" cy="160" r="4"/><circle cx="300" cy="200" r="2"/><circle cx="500" cy="140" r="3"/><circle cx="700" cy="220" r="2"/><circle cx="900" cy="180" r="3"/><circle cx="1100" cy="200" r="2"/></g></svg>');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  z-index: 1;
}

/* Enhanced Skyline Overlay */
.skyline-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(248, 250, 252, 0.8) 40%, 
    rgba(226, 232, 240, 0.6) 70%, 
    rgba(203, 213, 225, 0.4) 100%);
  z-index: 2;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
  font-size: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: floatUpDown 6s ease-in-out infinite;
}

.icon-1 {
  top: 20%;
  right: 15%;
  animation-delay: 0s;
}

.icon-2 {
  top: 35%;
  right: 25%;
  animation-delay: 1.5s;
}

.icon-3 {
  top: 60%;
  right: 10%;
  animation-delay: 3s;
}

.icon-4 {
  top: 15%;
  right: 35%;
  animation-delay: 4.5s;
}

@keyframes floatUpDown {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Enhanced Skyline Content */
.skyline-content {
  position: relative;
  z-index: 4;
  padding: 0 4rem;
  max-width: 800px;
}

.message-container {
  text-align: left;
}

/* Pre-title */
.pre-title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  opacity: 0;
  animation: slideInLeft 1s ease-out 0.5s forwards;
}

.pre-title-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.pre-title-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, transparent);
}

/* Enhanced Main Message */
.main-message {
  font-family: 'Inter', sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9;
  margin: 0 0 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ready-text {
  color: #1e293b;
  text-shadow: 0 2px 10px rgba(30, 41, 59, 0.1);
  opacity: 0;
  animation: slideInUp 1s ease-out 1s forwards;
}

.make-text {
  color: #3b82f6;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  opacity: 0;
  animation: slideInUp 1s ease-out 1.3s forwards;
}

.cash-text {
  color: #3b82f6;
  text-shadow: 0 4px 20px rgba(59, 130, 246, 0.8);
  font-size: 1.2em;
  opacity: 0;
  animation: slideInUp 1s ease-out 1.6s forwards;
  position: relative;
}

.cash-text::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 3px;
  opacity: 0;
  animation: expandWidth 1s ease-out 2.5s forwards;
}

/* Sub Message */
.sub-message {
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeInUp 1s ease-out 2s forwards;
}

.sub-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #475569;
  line-height: 1.6;
  max-width: 500px;
  margin: 0;
}

.highlight {
  color: #3b82f6;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.2);
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeInUp 1s ease-out 2.5s forwards;
}

.primary-cta {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 18px 36px;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
}

.secondary-cta {
  background: rgba(59, 130, 246, 0.1);
  color: #1e40af;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  padding: 16px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(10px);
}

.secondary-cta:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}

.cta-arrow,
.cta-icon {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.primary-cta:hover .cta-arrow {
  transform: translateX(5px);
}

.secondary-cta:hover .cta-icon {
  transform: scale(1.1);
}

/* Background Animations */
.bg-animations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  pointer-events: none;
}

.money-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.money-symbol {
  position: absolute;
  font-size: 2rem;
  color: #fbbf24;
  font-weight: bold;
  opacity: 0.3;
  animation: moneyFall 8s linear infinite;
}

.money-symbol:nth-child(1) { left: 10%; }
.money-symbol:nth-child(2) { left: 20%; }
.money-symbol:nth-child(3) { left: 30%; }
.money-symbol:nth-child(4) { left: 40%; }
.money-symbol:nth-child(5) { left: 60%; }
.money-symbol:nth-child(6) { left: 70%; }
.money-symbol:nth-child(7) { left: 80%; }
.money-symbol:nth-child(8) { left: 90%; }

@keyframes moneyFall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.pulse-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pulse-ring {
  position: absolute;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  animation: pulseExpand 4s ease-out infinite;
}

.ring-1 {
  width: 200px;
  height: 200px;
  margin: -100px 0 0 -100px;
  animation-delay: 0s;
}

.ring-2 {
  width: 400px;
  height: 400px;
  margin: -200px 0 0 -200px;
  animation-delay: 1s;
}

.ring-3 {
  width: 600px;
  height: 600px;
  margin: -300px 0 0 -300px;
  animation-delay: 2s;
}

@keyframes pulseExpand {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Animation Keyframes */
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
  opacity: 0;
    transform: translateY(20px);
  }
  100% {
  opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  0% {
  opacity: 0;
    transform: scaleX(0);
}
  100% {
  opacity: 1;
    transform: scaleX(1);
  }
}

/* Slide Up Animation */
.slide-up-element {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for different elements */
.slide-up-element[data-delay="0.2"] { transition-delay: 0.2s; }
.slide-up-element[data-delay="0.4"] { transition-delay: 0.4s; }
.slide-up-element[data-delay="0.6"] { transition-delay: 0.6s; }
.slide-up-element[data-delay="0.8"] { transition-delay: 0.8s; }
.slide-up-element[data-delay="1.0"] { transition-delay: 1.0s; }
.slide-up-element[data-delay="1.2"] { transition-delay: 1.2s; }

/* Responsive Design */
@media (max-width: 1024px) {
  .skyline-content {
    padding: 0 3rem;
    max-width: 700px;
  }
  
  .main-message {
    font-size: clamp(3rem, 6vw, 5rem);
  }
  
  .floating-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    height: 90vh;
    justify-content: center;
    align-items: center;
  }
  
  .skyline-content {
    padding: 0 2rem;
    max-width: 100%;
  }
  
  .message-container {
    text-align: center;
  }
  
  .main-message {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .primary-cta,
  .secondary-cta {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .floating-icon {
    display: none;
  }
  
  .sub-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .container {
    height: 80vh;
  }
  
  .skyline-content {
    padding: 0 1.5rem;
  }
  
  .main-message {
    font-size: clamp(2rem, 4vw, 3rem);
    gap: 5px;
  }
  
  .sub-text {
    font-size: 1rem;
  }
  
  .primary-cta,
  .secondary-cta {
    padding: 16px 28px;
    font-size: 1rem;
  }
  
  .money-symbol {
    font-size: 1.5rem;
  }
}
</style> 