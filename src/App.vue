<template>
  <div id="app">
    <!-- Render Navbar only if the current route is not DetailedBlog1 or EsmartCreatorAI or ContactUs -->
    <Navbar v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage" />
    <router-view v-if="shouldShowRouterView" />
    <!-- Render sections only if the current route is not DetailedBlog1 or EsmartCreatorAI -->
    <template v-if="shouldShowMainContent && !isCreatorAIPage">
      <section
        id="intro"
        class="hero-section"
        style="padding-top: 6rem;"
      >
        <IntroSection />
      </section>
      <section
        id="social-proof"
        class="section-spacing"
      >
        <SocialProof />
      </section>
      <section
        id="marketing-assessment"
        class="section-spacing gradient-section"
      >
        <MarketingAssessment />
      </section>
      <section
        id="features"
        class="section-spacing"
      >
        <FeaturesPage />
      </section>
      <!-- TestimonialQuote section -->
      <section
        id="testimonials"
        class="section-spacing testimonial-section"
      >
        <TestimonialQuote />
      </section>
      <section
        id="process"
        class="section-spacing"
      >
        <ProcessInt />
      </section>
      <section
        id="blog"
        class="section-spacing blog-section"
      >
        <BlogPost />
      </section>
      <section
        id="project"
        class="section-spacing"
      >
        <Project />
      </section>
      <section
        id="about-us"
        class="section-spacing gradient-section-reverse"
      >
        <AboutUs />
      </section>
      <section
        id="service"
        class="section-spacing"
      >
        <Service />
      </section>
      <section
        id="questions"
        class="section-spacing faq-section"
      >
        <Questions />
      </section>
      <section
        id="chat"
        class="section-spacing"
      >
        <Chat />
      </section>
    </template>
    <section
      v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage"
      id="footer"
      class="footer-section"
    >
      <AppFooter />
    </section>
    <!-- Chatbot -->
    <ChatBot />
    
    <!-- Background decorative elements -->
    <div class="bg-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1" />
        <div class="shape shape-2" />
        <div class="shape shape-3" />
        <div class="shape shape-4" />
      </div>
    </div>
    <GoToTopButton />
    
    <!-- Scroll to Top Button -->
    <transition name="scroll-fade">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="scroll-to-top"
        aria-label="Scroll to top"
      >
        <i class="fas fa-chevron-up"></i>
      </button>
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import IntroSection from "./components/IntroSection.vue";
import SocialProof from "./components/SocialProof.vue";
import FeaturesPage from "./components/FeaturesPage.vue";
import ProcessInt from "./components/ServiceSection.vue";
import BlogPost from "./components/BlogPost.vue";
import AppFooter from "./components/FooterBar.vue";
import Project from "./components/ProjectSection.vue";
import AboutUs from "./components/AboutUs.vue";
import Questions from "./components/Questions.vue";
import Chat from "./components/Chat.vue";
import MarketingAssessment from "./components/MarketingAssessment.vue";
import TestimonialQuote from "./components/TestimonialQuote.vue";
import ChatBot from "@/components/ChatBot.vue";
import GoToTopButton from "./components/GoToTopButton.vue";

export default {
  name: "App",
  components: {
    Navbar,
    IntroSection,
    MarketingAssessment,
    SocialProof,
    FeaturesPage,
    ProcessInt,
    BlogPost,
    Project,
    AppFooter,
    AboutUs,
    Questions,
    Chat,
    TestimonialQuote,
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
    }
  },
};
</script>

<style>
/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ff6b35, #f59e0b);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.scroll-to-top:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.5);
}

.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: all 0.3s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
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

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--gradient-aurora);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
  width: 100vw;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-aurora);
  animation: gradientShift 15s ease infinite;
  z-index: -2;
}

@keyframes gradientShift {
  0%, 100% {
    background: var(--gradient-aurora);
  }
  25% {
    background: var(--gradient-primary);
  }
  50% {
    background: var(--gradient-secondary);
  }
  75% {
    background: var(--gradient-tertiary);
  }
}

#app {
  text-align: center;
  position: relative;
  min-height: 100vh;
  backdrop-filter: blur(0.5px);
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* Magic cursor trail effect */
.cursor-trail {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.8), transparent);
  pointer-events: none;
  z-index: 9999;
  animation: trailFade 0.5s ease-out forwards;
}

@keyframes trailFade {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}

/* Section Spacing and Styling - Enhanced */
.section-spacing {
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}

.section-spacing::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%);
  animation: sectionShimmer 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sectionShimmer {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--gradient-magical);
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  animation: grainMove 20s linear infinite;
  pointer-events: none;
}

@keyframes grainMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-100px, -100px); }
}

.gradient-section {
  background: var(--gradient-secondary);
  color: white;
  position: relative;
}

.gradient-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  animation: waveEffect 6s ease-in-out infinite;
  pointer-events: none;
}

@keyframes waveEffect {
  0%, 100% { transform: translateX(-50%) skewX(0deg); }
  50% { transform: translateX(50%) skewX(5deg); }
}

.gradient-section-reverse {
  background: var(--gradient-tertiary);
  color: white;
  transform: skewY(-2deg);
  padding: 80px 0;
}

.gradient-section-reverse > * {
  transform: skewY(2deg);
}

.testimonial-section {
  background: var(--background-gray);
  position: relative;
  clip-path: polygon(0 10%, 100% 0%, 100% 90%, 0% 100%);
  padding: 80px 0;
}

.blog-section {
  background: var(--background-light);
  position: relative;
  transform: skewY(1deg);
  padding: 80px 0;
}

.blog-section > * {
  transform: skewY(-1deg);
}

.faq-section {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  position: relative;
  clip-path: polygon(0 0%, 100% 10%, 100% 100%, 0% 90%);
  padding: 80px 0;
}

.footer-section {
  background: var(--background-dark);
  color: white;
  position: relative;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
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

/* Parallax scrolling effect */
.parallax-element {
  transform: translateZ(0);
  will-change: transform;
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