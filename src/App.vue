<template>
  <div id="app">
    <!-- Google Fonts Import -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    <!-- Render Navbar only if the current route is not DetailedBlog1 or EsmartCreatorAI or ContactUs -->
    <SimpleNavBar v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage" />
    <router-view v-if="shouldShowRouterView" />
    <!-- Render sections only if the current route is not DetailedBlog1 or EsmartCreatorAI -->
    <template v-if="shouldShowMainContent && !isCreatorAIPage">
      <!-- Hero Section -->
      <div class="hero-wrapper" style="padding-top: 0;">
        <SimpleHeroSection />
      </div>
      
      <!-- Sticky Sections Container -->
      <div class="sticky-sections-container">
        <!-- Social Proof Section -->
        <div class="sticky-section" data-section="social-proof">
          <SimpleSocialProof />
        </div>
        
        <!-- Marketing Assessment Section -->
        <div class="sticky-section" data-section="marketing-assessment">
          <SimpleMarketingAssessment />
        </div>
        
        <!-- Features Section -->
        <div class="sticky-section" data-section="features">
          <SimpleFeatures />
        </div>
        
        <!-- Testimonials Section -->
        <div class="sticky-section" data-section="testimonials">
          <SimpleTestimonial />
        </div>
        
        <!-- Service Section -->
        <div class="sticky-section" data-section="services">
          <SimpleServiceSection />
        </div>
        
        <!-- Projects Section -->
        <div class="sticky-section" data-section="projects">
          <SimpleProject />
        </div>
        
        <!-- About Us Section -->
        <div class="sticky-section" data-section="about-us">
          <SimpleAboutUs />
        </div>
        
        <!-- Questions Section -->
        <div class="sticky-section" data-section="questions">
          <SimpleQuestions />
        </div>
        
        <!-- Contact Section -->
        <div class="sticky-section" data-section="contact">
          <SimpleChat />
        </div>
      </div>
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
import SimpleTestimonial from "./components/SimpleTestimonial.vue";
import SimpleProject from "./components/SimpleProject.vue";
import SimpleMarketingAssessment from "./components/SimpleMarketingAssessment.vue";
import SimpleChat from "./components/SimpleChat.vue";
import SimpleFooter from "./components/SimpleFooter.vue";
import ChatBot from "./components/ChatBot.vue";
import GoToTopButton from "./components/GoToTopButton.vue";

export default {
  name: "App",
  components: {
    SimpleNavBar,
    SimpleHeroSection,
    SimpleSocialProof,
    SimpleFeatures,
    SimpleServiceSection,
    SimpleAboutUs,
    SimpleQuestions,
    SimpleTestimonial,
    SimpleProject,
    SimpleMarketingAssessment,
    SimpleChat,
    SimpleFooter,
    ChatBot,
    GoToTopButton,
  },
  data() {
    return {
      showScrollTop: false,
      scrollY: 0,
      lastCursorTime: 0,
    };
  },
  computed: {
    isAuthPage() {
      return this.$route.name === "Login" || this.$route.name === "Register";
    },
    isDetailedBlogPage() {
      return this.$route.name === "DetailedBlog1";
    },
    isCreatorAIPage() {
      return this.$route.name === "EsmartCreatorAI";
    },
    shouldShowRouterView() {
      return this.isAuthPage || this.isDetailedBlogPage || this.isCreatorAIPage;
    },
    shouldShowMainContent() {
      return !this.isAuthPage && !this.isDetailedBlogPage;
    },
  },
  mounted() {
    // Initialize page effects
    this.initializePageEffects();
    
    // Add more floating shapes
    this.addMoreFloatingShapes();
    
    // Setup intersection observer for animations
    this.setupIntersectionObserver();
    
    // Add sticky indicators
    this.addStickyIndicators();
    
    // Add glow effects to interactive elements
    this.$nextTick(() => {
      const glowElements = document.querySelectorAll('.card, .primary-button, .secondary-button');
      glowElements.forEach(el => {
        el.classList.add('glow-effect');
      });
    });
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
      }, 5000);
      
      // Initialize sticky scroll effects
      this.initStickyScroll();
    },
    
    initStickyScroll() {
      const sections = document.querySelectorAll('.sticky-section');
      let currentSection = null;
      
      // Create navigation dots
      this.createStickyNavigation(sections);
      
      // Handle scroll events
      window.addEventListener('scroll', () => {
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          
          // Check if section is in viewport and should be sticky
          if (sectionTop <= 0 && sectionTop > -sectionHeight) {
            // Only activate sticky for specific sections (e.g., work process)
            if (section.dataset.section === 'services' || section.dataset.section === 'features') {
              if (currentSection !== section) {
                // Deactivate previous sticky section
                if (currentSection) {
                  currentSection.classList.remove('active');
                }
                
                currentSection = section;
                section.classList.add('active');
                this.updateStickyNavigation(Array.from(sections).indexOf(section));
                
                // Prevent body scroll when sticky is active
                document.body.style.overflow = 'hidden';
              }
              
              // Update progress bar
              this.updateProgressBar(section);
            }
          } else {
            // Deactivate sticky when section is out of view
            if (section.classList.contains('active')) {
              section.classList.remove('active');
              currentSection = null;
              document.body.style.overflow = '';
            }
          }
        });
      });
      
      // Handle wheel events for smooth scrolling within sticky sections
      let isScrolling = false;
      window.addEventListener('wheel', (e) => {
        if (!currentSection || isScrolling) return;
        
        const activeSection = document.querySelector('.sticky-section.active');
        if (!activeSection) return;
        
        e.preventDefault();
        isScrolling = true;
        
        // Scroll within the sticky section content
        const sectionContent = activeSection.querySelector('*');
        if (sectionContent) {
          const currentScroll = sectionContent.scrollTop;
          const scrollAmount = e.deltaY > 0 ? 100 : -100;
          
          sectionContent.scrollTo({
            top: currentScroll + scrollAmount,
            behavior: 'smooth'
          });
        }
        
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }, { passive: false });
    },
    
    createStickyNavigation(sections) {
      const nav = document.createElement('div');
      nav.className = 'sticky-section-nav';
      
      sections.forEach((section) => {
        const navItem = document.createElement('div');
        navItem.className = 'sticky-section-nav-item';
        navItem.setAttribute('data-section', section.dataset.section);
        navItem.addEventListener('click', () => {
          this.scrollToSection(section);
        });
        nav.appendChild(navItem);
      });
      
      document.body.appendChild(nav);
    },
    
    updateStickyNavigation(activeIndex) {
      const navItems = document.querySelectorAll('.sticky-section-nav-item');
      Array.from(navItems).forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },
    
    scrollToSection(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    },
    
    updateProgressBar(section) {
      let progressBar = section.querySelector('.progress-bar');
      if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        section.appendChild(progressBar);
      }
      
      // Calculate progress based on section content scroll
      const sectionContent = section.querySelector('*');
      if (sectionContent && sectionContent.scrollTop !== undefined) {
        const maxScroll = sectionContent.scrollHeight - sectionContent.clientHeight;
        const progress = maxScroll > 0 ? (sectionContent.scrollTop / maxScroll) * 100 : 0;
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = progress + '%';
      }
    },
    
    // Add visual indicator for sticky sections
    addStickyIndicators() {
      const stickySections = document.querySelectorAll('.sticky-section[data-section="services"], .sticky-section[data-section="features"]');
      
      stickySections.forEach(section => {
        // Add sticky indicator
        const indicator = document.createElement('div');
        indicator.className = 'sticky-indicator';
        indicator.innerHTML = '<i class="fas fa-pin"></i> Sticky Section';
        section.appendChild(indicator);
        
        // Add scroll hint
        const hint = document.createElement('div');
        hint.className = 'scroll-hint';
        hint.innerHTML = '<i class="fas fa-mouse"></i> Scroll to explore content';
        section.appendChild(hint);
      });
    }
  },
};
</script>

<style>
/* eslint-disable */
@import './assets/css/hero-clean.css';
@import './assets/css/section-animations.css';

/* Global Font Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Typography System */
body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

/* Heading Fonts - Montserrat (Primary) */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  line-height: 1.2;
}

/* Special Emphasis - Playfair Display Italic */
.emphasized-text {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 500;
}

/* Body Text - Montserrat */
.body-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

/* Medium Weight - Montserrat */
.medium-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}

/* Semi Bold - Montserrat */
.semi-bold-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

/* Bold - Montserrat */
.bold-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

/* Extra Bold - Montserrat */
.extra-bold-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
}

/* Global Styles */
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

/* Sticky Sections Container */
.sticky-sections-container {
  position: relative;
  z-index: 1;
}

/* Sticky Section - Only for specific sections */
.sticky-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* Sticky Section Content - Only when active */
.sticky-section.active > * {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  z-index: 100;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.sticky-section.active > *::-webkit-scrollbar {
  display: none;
}

/* Sticky Section Background */
.sticky-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  z-index: -1;
}

/* Sticky Section Overlay */
.sticky-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 80%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Sticky Section Active State */
.sticky-section.active {
  z-index: 100;
}

/* Sticky Section Transition */
.sticky-section > * {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Sticky Section Hover Effect */
.sticky-section:hover > * {
  transform: scale(1.02);
}

/* Sticky Section Scroll Indicator */
.sticky-section .scroll-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  animation: bounce 2s infinite;
}

.scroll-indicator:hover {
  background: rgba(59, 130, 246, 1);
  transform: translateX(-50%) scale(1.1);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Sticky Section Progress Bar */
.sticky-section .progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(59, 130, 246, 0.2);
  z-index: 10;
}

.sticky-section .progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  width: 0%;
  transition: width 0.1s ease;
}

/* Sticky Section Navigation */
.sticky-section-nav {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sticky-section-nav-item {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.sticky-section-nav-item:hover {
  background: rgba(59, 130, 246, 0.6);
  transform: scale(1.2);
}

.sticky-section-nav-item.active {
  background: #3B82F6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.sticky-section-nav-item::before {
  content: attr(data-section);
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.sticky-section-nav-item:hover::before {
  opacity: 1;
}

/* Sticky Section Indicators */
.sticky-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.sticky-indicator i {
  font-size: 0.7rem;
}

/* Scroll Hint */
.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

.scroll-hint i {
  font-size: 0.8rem;
  color: #3B82F6;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.05);
  }
}

/* Global Modern Button Styles */
.modern-btn {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.modern-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.modern-btn:hover {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
}

.modern-btn:hover::before {
  left: 100%;
}

.modern-btn:active {
  transform: translateY(0) scale(0.98);
}

.modern-btn.secondary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modern-btn.secondary:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Glass Card Styles */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.glass-card.primary {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.glass-card.success {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
}

/* Parallax Layer Styles */
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
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.parallax-layer[data-speed="0.3"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.parallax-layer[data-speed="0.5"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.parallax-layer[data-speed="0.7"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.25) 0%, transparent 70%);
  pointer-events: none;
}

.parallax-layer[data-speed="0.9"]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, transparent 70%);
  pointer-events: none;
}

/* Cursor Trail Effect */
.cursor-trail {
  position: fixed;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #3B82F6, transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: cursorTrail 1s ease-out forwards;
}

@keyframes cursorTrail {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* Magic Particles */
.magic-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #3B82F6, transparent);
  border-radius: 50%;
  animation: magicFloat 8s ease-in-out infinite;
}

@keyframes magicFloat {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.8;
  }
  25% {
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translateY(-40px) translateX(-5px) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-20px) translateX(-15px) scale(1.1);
    opacity: 0.9;
  }
}

/* Scroll to Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.scroll-to-top:hover {
  background: linear-gradient(135deg, #2563EB, #1E40AF);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* Scroll Fade Transition */
.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: all 0.3s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Section Spacing Animations */
.section-spacing {
  animation: slideInUp 1s ease-out;
}

.section-spacing:nth-child(even) {
  animation: slideInLeft 1s ease-out;
}

.section-spacing:nth-child(odd) {
  animation: slideInRight 1s ease-out;
}

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