/* eslint-disable */
<template>
  <div id="app">
    <!-- Render Navbar only if the current route is not DetailedBlog1 or EsmartCreatorAI or ContactUs -->
    <SimpleNavBar v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage" />
    <router-view v-if="shouldShowRouterView" />
    <!-- Render sections only if the current route is not DetailedBlog1 or EsmartCreatorAI -->
    <template v-if="shouldShowMainContent && !isCreatorAIPage">
      <section
        id="intro"
        class="simple-hero-section"
        style="padding-top: 6rem;"
      >
        <SimpleHeroSection />
      </section>
      <section
        id="social-proof"
        class="simple-section"
      >
        <SimpleSocialProof />
      </section>
      <section
        id="marketing-assessment"
        class="simple-section"
      >
        <SimpleMarketingAssessment />
      </section>
      <section
        id="features"
        class="simple-section"
      >
        <SimpleFeatures />
      </section>
      <section
        id="testimonials"
        class="simple-section"
      >
        <SimpleTestimonial />
      </section>
      <section
        id="process"
        class="simple-section"
      >
        <SimpleServiceSection />
      </section>
      <section
        id="project"
        class="simple-section"
      >
        <SimpleProject />
      </section>
      <section
        id="about-us"
        class="simple-section"
      >
        <SimpleAboutUs />
      </section>
      <section
        id="questions"
        class="simple-section"
      >
        <SimpleQuestions />
      </section>
      <section
        id="chat"
        class="simple-section"
      >
        <SimpleChat />
      </section>
    </template>
    <section
      v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage"
      id="footer"
      class="footer-section"
    >
      <SimpleFooter />
    </section>
    <!-- Chatbot -->
    <ChatBot />
    
    <GoToTopButton />
    
    <!-- Scroll to Top Button -->
    <transition name="scroll-fade">
      <button
        v-show="showScrollTop"
        class="scroll-to-top"
        aria-label="Scroll to top"
        @click="scrollToTop"
      >
        <i class="fas fa-chevron-up" />
      </button>
    </transition>
  </div>
</template>

<script>
import SimpleNavBar from "./components/SimpleNavBar.vue";
import SimpleHeroSection from "./components/SimpleHeroSection.vue";
import SimpleSocialProof from "./components/SimpleSocialProof.vue";
import SimpleFeatures from "./components/SimpleFeatures.vue";
import SimpleServiceSection from "./components/SimpleServiceSection.vue";
import SimpleAboutUs from "./components/SimpleAboutUs.vue";
import SimpleQuestions from "./components/SimpleQuestions.vue";
import SimpleFooter from "./components/SimpleFooter.vue";
import SimpleProject from "./components/SimpleProject.vue";
import SimpleChat from "./components/SimpleChat.vue";
import SimpleMarketingAssessment from "./components/SimpleMarketingAssessment.vue";
import SimpleTestimonial from "./components/SimpleTestimonial.vue";
import ChatBot from "@/components/ChatBot.vue";
import GoToTopButton from "./components/GoToTopButton.vue";

export default {
  name: "App",
  components: {
    SimpleNavBar,
    SimpleHeroSection,
    SimpleSocialProof,
    SimpleMarketingAssessment,
    SimpleFeatures,
    SimpleTestimonial,
    SimpleServiceSection,
    SimpleProject,
    SimpleAboutUs,
    SimpleQuestions,
    SimpleChat,
    SimpleFooter,
    ChatBot,
    GoToTopButton,
  },
  data() {
    return {
      showScrollButton: false,
      cursorTrails: [],
      magicParticles: [],
      lastCursorTime: 0,
      showScrollTop: false,
      scrollY: 0,
    };
  },
  computed: {
    isDetailedBlogPage() {
      return this.$route.name === "DetailedBlog1";
    },
    isAuthPage() {
      return ["SignIn", "SignUp"].includes(this.$route.name);
    },
    shouldShowRouterView() {
      return (
        this.isAuthPage ||
        this.isDetailedBlogPage ||
        this.isCreatorAIPage ||
        this.$route.name === "ContactUs"
      );
    },
    isCreatorAIPage() {
      return this.$route.name === "EsmartCreatorAI";
    },
    shouldShowMainContent() {
      return (
        this.isHomePage ||
        (!this.isAuthPage &&
          !this.isDetailedBlogPage &&
          !this.isCreatorAIPage &&
          this.$route.name !== "ContactUs")
      );
    },
  },
  mounted() {
    // Add scroll event listener
    let lastScroll = 0;
    window.addEventListener('scroll', function throttledScrollHandler() {
      const now = Date.now();
      if (now - lastScroll > 50) {
        this.handleScroll();
        lastScroll = now;
      }
    }.bind(this));
    
    // Initialize magical effects
    this.initializePageEffects();
    this.initMagicalEffects();
    this.initScrollAnimations();
    this.initCursorTrail();
    this.initParallaxEffect();
    
    console.log("App mounted with magical effects");
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener('mousemove', this.createCursorTrail);
    console.log("App unmounted, event listeners cleaned up");
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
      
      // Parallax effect for floating shapes
      const scrollY = window.scrollY;
      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    },
    createCursorTrail(e) {
      const now = Date.now();
      if (now - this.lastCursorTime < 50) return; // Throttle trail creation
      this.lastCursorTime = now;
      
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);
      
      // Remove trail after animation
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 500);
    },
    createMagicParticles() {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'magic-particles';
      document.body.appendChild(particlesContainer);
      
      // Create 20 magic particles
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'magic-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 8 + 's';
          particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
          
          // Random colors for particles
          const colors = [
            'rgba(255, 107, 53, 0.8)',
            'rgba(255, 17, 68, 0.8)',
            'rgba(239, 30, 99, 0.8)',
            'rgba(255, 154, 0, 0.8)',
            'rgba(0, 230, 118, 0.8)'
          ];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
          
          particlesContainer.appendChild(particle);
          
          // Remove particle after animation
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 8000);
        }, i * 200); // Stagger particle creation
      }
    },
    addMoreFloatingShapes() {
      const bgDecoration = document.querySelector('.bg-decoration .floating-shapes');
      if (!bgDecoration) return;
      
      // Add more shapes
      for (let i = 5; i <= 6; i++) {
        const shape = document.createElement('div');
        shape.className = `shape shape-${i}`;
        bgDecoration.appendChild(shape);
      }
    },
    setupIntersectionObserver() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        }, { threshold: 0.1 });
        
        // Observe all sections
        document.querySelectorAll('.section-spacing').forEach(section => {
          observer.observe(section);
        });
      }
    },
    initializePageEffects() {
      // Add cursor trail effect
      document.addEventListener('mousemove', this.createCursorTrail);
      
      // Create magic particles periodically
      this.createMagicParticles();
      setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
          this.createMagicParticles();
        }
      }, 10000);
      
      // Add more floating shapes
      this.addMoreFloatingShapes();
      
      // Setup intersection observer for animations
      this.setupIntersectionObserver();
      
      // Add glow effects to interactive elements
      this.$nextTick(() => {
        const glowElements = document.querySelectorAll('.card, .primary-button, .secondary-button');
        glowElements.forEach(el => {
          el.classList.add('glow-effect');
        });
      });
    },
    initMagicalEffects() {
      // Add magical loader
      const loader = document.createElement('div');
      loader.className = 'magical-loader';
      loader.innerHTML = '<div class="loader-spinner"></div>';
      document.body.appendChild(loader);

      // Remove loader after 2 seconds
      setTimeout(() => {
        loader.remove();
      }, 2000);

      // Add Matrix Rain Effect
      this.createMatrixRain();
      
      // Add Quantum Particles
      this.createQuantumParticles();
    },

    createMatrixRain() {
      const matrixContainer = document.createElement('div');
      matrixContainer.className = 'matrix-rain';
      
      for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96);
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (2 + Math.random() * 8) + 's';
        char.style.animationDelay = Math.random() * 5 + 's';
        matrixContainer.appendChild(char);
      }
      
      document.body.appendChild(matrixContainer);
    },

    createQuantumParticles() {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'quantum-particles';
        
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'quantum-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 8 + 's';
          particle.style.animationDuration = (8 + Math.random() * 4) + 's';
          particlesContainer.appendChild(particle);
        }

        section.style.position = 'relative';
        section.style.zIndex = index + 1; // Use index
        section.appendChild(particlesContainer);
      });
    },
    
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, observerOptions);
      
      // Observe all elements with scroll-reveal classes
      setTimeout(() => {
        const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        scrollElements.forEach(el => observer.observe(el));
      }, 100);
    },
    
    initCursorTrail() {
      let mouseX = 0, mouseY = 0;
      let trail = []; // Declare trail
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create cursor trail effect
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.left = mouseX + 'px';
        trailElement.style.top = mouseY + 'px';
        
        document.body.appendChild(trailElement);
        trail.push(trailElement); // Use trail
        
        // Remove old trail elements
        if (trail.length > 10) {
          const oldElement = trail.shift();
          oldElement.remove();
        }
        
        setTimeout(() => {
          trailElement.remove();
        }, 1000);
      });
    },
    
    initParallaxEffect() {
      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY;
        
        // Apply parallax to elements
        const parallaxElements = document.querySelectorAll('.parallax-element');
        // eslint-disable-next-line no-unused-vars
        parallaxElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.1);
          const yPos = -(this.scrollY * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Scroll animations disabled
      });
    },
    
    updateScrollAnimations() {
      // Disabled to prevent any opacity/blur effects
      return;
    }
  },
};
</script>

<style>
/* eslint-disable */
@import './assets/css/hero-clean.css';
@import './assets/css/section-animations.css';

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #1e40af 100%);
  color: #e0f2fe;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
  width: 100vw;
}

#app {
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #1e40af 100%);
  color: #e0f2fe;
  min-height: 100vh;
  text-align: center;
  position: relative;
  backdrop-filter: none;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* Hide all background effects */
body::before,
.bg-decoration,
.magic-particles,
.cursor-trail,
.section-spacing::before,
.floating-shapes,
.shape,
.quantum-orb,
.energy-grid,
.quantum-particle,
.background-effects,
.particles-container {
  display: none !important;
}

/* Floating Elements - Disabled to prevent blur */
.floating-particles {
  display: none !important;
}

.morphing-shapes {
  display: none !important;
}

/* Remove all blur and backdrop filters */
* {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Add fallback image styles */
.fallback-image {
  border: 2px dashed #ddd !important;
  background-color: #f8f9fa !important;
}

.fallback-image::after {
  content: '⚠️ Image not found';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #6c757d;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Simple Section Styles - Remove overrides to allow component styling */
.simple-section {
  padding: 4rem 2rem;
}

/* Simple footer */
.footer-section {
  background: #f8f8f8 !important;
  color: black !important;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

/* Simple Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll-to-top:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Global Glassmorphism and Parallax Styles */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
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

/* Enhanced glassmorphism for different contexts */
.glass-card.primary {
  background: rgba(30, 58, 138, 0.1);
  border-color: rgba(30, 58, 138, 0.3);
}

.glass-card.accent {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.glass-card.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.parallax-layer[data-speed="0.1"] { 
  z-index: 1; 
  filter: blur(0px);
}
.parallax-layer[data-speed="0.3"] { 
  z-index: 2; 
  filter: blur(0.5px);
}
.parallax-layer[data-speed="0.5"] { 
  z-index: 3; 
  filter: blur(1px);
}
.parallax-layer[data-speed="0.7"] { 
  z-index: 4; 
  filter: blur(1.5px);
}
.parallax-layer[data-speed="0.9"] { 
  z-index: 5; 
  filter: blur(2px);
}

/* Depth-based shadows for 3D effect */
.parallax-layer[data-speed="0.1"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
}

.parallax-layer[data-speed="0.9"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

/* Remove all animations */
@keyframes fadeIn {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes slideIn {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes zoomIn {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes pulse {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes float {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes glow {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes shimmer {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes quantum-pulse {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes energy-flow {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

@keyframes particle-float {
  from, to { 
    transform: none;
    opacity: 1;
  }
}

/* Disable all AOS animations */
[data-aos] {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

/* Simple transitions only */
* {
  transition: all 0.2s ease !important;
}

/* Remove scroll fade transition */
.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: opacity 0.2s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
}

/* CSS Variables for consistent theming - Enhanced energetic color palette */
:root {
  --primary-color: #ff6b35;
  --primary-dark: #e55100;
  --primary-light: #ff8a65;
  --secondary-color: #ff1744;
  --secondary-light: #ff6584;
  --accent-color: #ff9500;
  --accent-light: #ffb74d;
  --accent-dark: #ef6c00;
  --tertiary-color: #e91e63;
  --tertiary-light: #f8bbd9;
  --success-color: #00e676;
  --success-light: #69f0ae;
  --warning-color: #ffa726;
  --text-primary: #1a1a1a;
  --text-secondary: #424242;
  --text-light: #757575;
  --background-light: #ffffff;
  --background-gray: #f5f5f5;
  --background-dark: #1a1a1a;
  --border-color: #e0e0e0;
  --shadow-light: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-medium: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-heavy: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-magical: 0 20px 40px rgba(255, 107, 53, 0.15);
  --gradient-primary: linear-gradient(135deg, #ff6b35 0%, #ff1744 100%);
  --gradient-secondary: linear-gradient(135deg, #ff1744 0%, #e91e63 100%);
  --gradient-tertiary: linear-gradient(135deg, #ff9500 0%, #ffa726 100%);
  --gradient-magical: linear-gradient(135deg, #ff6b35 0%, #ff1744 50%, #e91e63 100%);
  --gradient-aurora: linear-gradient(135deg, #ff6b35 0%, #ff1744 25%, #e91e63 50%, #ff9500 75%, #00e676 100%);
  --gradient-energy: linear-gradient(45deg, #ff6b35, #ff1744, #e91e63, #ff9500, #00e676);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

* {
  box-sizing: border-box;
}

/* Global Magical Effects */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 50%, #1e40af 100%);
  color: #e0f2fe;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* Disable overlay effects to prevent blur */
body::before,
body::after {
  display: none !important;
}

@keyframes sparkle {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-100px) rotate(360deg); }
}

/* Disable scroll animations to prevent opacity issues */
.scroll-reveal,
.scroll-reveal-left,
.scroll-reveal-right {
  opacity: 1 !important;
  transform: none !important;
}

/* Magical Cursor Trail */
.cursor-trail {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 9999;
  animation: cursorPulse 2s ease-in-out infinite;
  transition: all 0.1s ease;
}

@keyframes cursorPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0.1; }
}

/* Enhanced Card Animations */
.magical-card {
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.magical-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  transition: left 0.8s ease;
  z-index: 1;
}

.magical-card:hover::before {
  left: 100%;
}

.magical-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 0, 0, 0.03), transparent);
  animation: magicalRotate 15s linear infinite;
  z-index: -1;
}

@keyframes magicalRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Magical Button Effects */
.magical-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
}

.magical-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.magical-btn:hover::before {
  width: 300px;
  height: 300px;
}

/* Magical Text Effects */
.magical-text {
  background: linear-gradient(45deg, black, #333, black);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShimmer 3s ease-in-out infinite;
}

@keyframes textShimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Magical Hover Zones */
.hover-zone {
  transition: all 0.4s ease;
}

.hover-zone:hover {
  transform: translateY(-5px);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

/* Parallax Scroll Effect */
.parallax-element {
  transform: translateY(0);
  transition: transform 0.1s ease-out;
}

/* Magical Loading Animation */
.magical-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: loaderFadeOut 1s ease-out 2s forwards;
}

.loader-spinner {
  width: 60px;
  height: 60px;
  border: 3px solid #e5e5e5;
  border-top: 3px solid black;
  border-radius: 50%;
  animation: loaderSpin 1s linear infinite;
}

@keyframes loaderSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes loaderFadeOut {
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Magical Section Transitions */
.section-transition {
  position: relative;
}

.section-transition::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, black, transparent);
  animation: sectionDivider 3s ease-in-out infinite;
}

@keyframes sectionDivider {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

/* Enhanced Card Styles with more magic */
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  margin: 1rem;
  box-shadow: var(--shadow-magical);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--glass-border);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(255, 107, 53, 0.1), transparent);
  animation: cardRotate 10s linear infinite;
  z-index: -1;
}

@keyframes cardRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.card:hover {
  transform: translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02);
  box-shadow: var(--shadow-heavy), 0 0 50px rgba(255, 107, 53, 0.3);
}

.card:hover::before {
  left: 100%;
}

/* Enhanced Background Decorative Elements */
.bg-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.floating-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  animation: magicalFloat 25s infinite ease-in-out;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 15%;
  left: 8%;
  animation-delay: 0s;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent);
}

.shape-2 {
  width: 180px;
  height: 180px;
  top: 55%;
  right: 5%;
  animation-delay: 8s;
  background: radial-gradient(circle, rgba(255, 17, 68, 0.3), transparent);
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 35%;
  left: 75%;
  animation-delay: 16s;
  background: radial-gradient(circle, rgba(239, 30, 99, 0.3), transparent);
}

.shape-4 {
  width: 150px;
  height: 150px;
  bottom: 15%;
  left: 25%;
  animation-delay: 24s;
  background: radial-gradient(circle, rgba(255, 154, 0, 0.3), transparent);
}

/* Add more magical floating elements */
.shape-5 {
  width: 60px;
  height: 60px;
  top: 70%;
  left: 60%;
  animation-delay: 4s;
  background: radial-gradient(circle, rgba(0, 230, 118, 0.3), transparent);
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 25%;
  right: 30%;
  animation-delay: 12s;
  background: radial-gradient(circle, rgba(255, 17, 68, 0.3), transparent);
}

@keyframes magicalFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0.6;
  }
  16% {
    transform: translateY(-40px) rotate(60deg) scale(1.1);
    opacity: 0.8;
  }
  33% {
    transform: translateY(-20px) rotate(120deg) scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-60px) rotate(180deg) scale(1.2);
    opacity: 0.9;
  }
  66% {
    transform: translateY(-30px) rotate(240deg) scale(0.8);
    opacity: 0.6;
  }
  83% {
    transform: translateY(-45px) rotate(300deg) scale(1.05);
    opacity: 0.8;
  }
}

/* Magic particle system enhancement */
.magic-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.8), transparent);
  border-radius: 50%;
  animation: magicParticleFloat 8s infinite ease-in-out;
}

@keyframes magicParticleFloat {
  0% {
    transform: translateY(100vh) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) translateX(20px) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) translateX(-20px) scale(1);
  }
  100% {
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
}

/* Add magical floating particles background */
.magical-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
  overflow: hidden;
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: floatParticle 15s infinite linear;
}

.particle:nth-child(odd) {
  background: rgba(0, 0, 0, 0.05);
  animation-duration: 20s;
}

.particle:nth-child(3n) {
  width: 6px;
  height: 6px;
  animation-duration: 25s;
}

.particle:nth-child(5n) {
  background: rgba(0, 0, 0, 0.15);
  animation-duration: 12s;
}

@keyframes floatParticle {
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

/* Magical morphing shapes */
.morphing-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.morph-shape {
  position: absolute;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.05));
  border-radius: 50%;
  animation: morphFloat 20s infinite ease-in-out;
}

.morph-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.morph-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 7s;
}

.morph-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

@keyframes morphFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
    border-radius: 50%;
  }
  25% {
    transform: translateY(-30px) rotate(90deg) scale(1.1);
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }
  50% {
    transform: translateY(-20px) rotate(180deg) scale(0.9);
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }
  75% {
    transform: translateY(-40px) rotate(270deg) scale(1.05);
    border-radius: 40% 60% 60% 40% / 60% 40% 40% 60%;
  }
}

/* Responsive Design Enhanced */
@media (max-width: 768px) {
  .section-spacing {
    padding: 80px 0;
  }
  
  .gradient-section-reverse,
  .blog-section,
  .testimonial-section,
  .faq-section {
    clip-path: none;
    transform: none;
    padding: 80px 0;
  }
  
  .gradient-section-reverse > *,
  .blog-section > * {
    transform: none;
  }
  
  .card {
    margin: 0.5rem;
    padding: 2rem;
    border-radius: 20px;
  }
  
  .scroll-to-top {
    width: 55px;
    height: 55px;
    font-size: 20px;
    bottom: 20px;
    right: 20px;
  }
  
  .shape {
    opacity: 0.3;
  }
  
  .shape-5, .shape-6 {
    display: none;
  }
}

/* Smooth scroll enhancement */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Loading animations enhanced */
@keyframes slideInUp {
  from {
    transform: translateY(60px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-60px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(60px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.section-spacing {
  animation: slideInUp 1s ease-out;
}

.section-spacing:nth-child(even) {
  animation: slideInLeft 1s ease-out;
}

.section-spacing:nth-child(odd) {
  animation: slideInRight 1s ease-out;
}

/* Enhanced focus states for accessibility */
.scroll-to-top:focus {
  outline: 3px solid var(--accent-color);
  outline-offset: 3px;
}

/* Custom scrollbar enhanced */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--background-gray);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-magical);
  border-radius: 6px;
  border: 2px solid var(--background-gray);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gradient-secondary);
}

/* Text selection enhancement */
::selection {
  background: rgba(255, 107, 53, 0.3);
  color: white;
}

::-moz-selection {
  background: rgba(255, 107, 53, 0.3);
  color: white;
}

/* Magic glow effects */
.glow-effect {
  position: relative;
}

.glow-effect::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  border-radius: inherit;
  z-index: -1;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.glow-effect:hover::before {
  opacity: 0.7;
}
</style>