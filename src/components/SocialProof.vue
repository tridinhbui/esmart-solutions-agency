<template>
  <section class="social-proof-testimonials">
    <!-- Enhanced background with particles -->
    <div class="background-effects">
      <div class="particles-container"></div>
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>

    <!-- Enhanced title with animation -->
    <div class="section-header" data-aos="fade-down">
      <div class="title-badge">
        <i class="fas fa-star"></i>
        <span>{{ $t("socialProof.badge") || "Trusted Partners" }}</span>
      </div>
      <h2 class="section-title">
        <span class="title-main">{{ $t("socialProof.mediaTitle") || "Our Social Media Presence" }}</span>
        <div class="title-underline"></div>
      </h2>
    </div>

    <!-- Enhanced social media scroller -->
    <div class="scroller" data-speed="fast" data-aos="fade-up" data-aos-delay="200">
      <div class="socials scroller__inner">
        <a
          v-for="social in socialMedia"
          :key="social.name"
          :href="social.link"
          target="_blank"
          class="social-item magical-card"
        >
          <div class="social-icon-container">
            <img :src="getImageUrl(social.icon)" :alt="social.name" />
            <div class="icon-glow"></div>
          </div>
          <p class="description">
            {{ $t("socialProof." + social.name.toLowerCase()) || social.name }}
          </p>
          <div class="social-stats">
            <span class="followers-count">{{ social.followers || '10K+' }}</span>
            <span class="followers-label">{{ $t("socialProof.followers") || "Followers" }}</span>
          </div>
          <div class="card-shimmer"></div>
        </a>
      </div>
    </div>

    <!-- Enhanced toolkit section -->
    <div class="toolkit-section">
      <div class="section-header" data-aos="fade-down" data-aos-delay="400">
        <div class="title-badge">
          <i class="fas fa-tools"></i>
          <span>{{ $t("socialProof.toolkitBadge") || "Our Toolkit" }}</span>
        </div>
        <h2 class="section-title">
          <span class="title-main">{{ $t("socialProof.toolkitTitle") || "Professional Tools & Services" }}</span>
          <div class="title-underline"></div>
        </h2>
      </div>
      
      <div class="toolkit animate-slideIn" data-aos="fade-up" data-aos-delay="600">
        <div
          class="toolkit-item magical-card"
          v-for="(item, index) in toolkit"
          :key="index"
          @click="openModal(item)"
          :data-aos="'zoom-in'"
          :data-aos-delay="800 + (index * 100)"
        >
          <div class="toolkit-icon-container">
            <i :class="item.icon"></i>
            <div class="icon-pulse"></div>
          </div>
          <h3>{{ $t("socialProof.toolkit.item" + (index + 1) + ".title") || `Tool ${index + 1}` }}</h3>
          <p>
            {{ $t("socialProof.toolkit.item" + (index + 1) + ".description") || "Professional tool description" }}
          </p>
          <div class="toolkit-cta">
            <span>{{ $t("socialProof.learnMore") || "Learn More" }}</span>
            <i class="fas fa-arrow-right"></i>
          </div>
          <div class="card-glow"></div>
        </div>
      </div>
    </div>

    <!-- Enhanced modal -->
    <v-dialog v-model="isModalOpen" max-width="500px">
      <v-card class="magical-modal">
        <v-card-title class="headline">{{ selectedItem.title }}</v-card-title>
        <v-card-text>
          <p>{{ selectedItem.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isModalOpen = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: "SocialProofTestimonials",
  data() {
    return {
      isModalOpen: false,
      selectedItem: {},
      translateX: 0,
      slideInterval: null,
      socialMedia: [
        {
          name: "Facebook",
          icon: "facebook.png",
          link: "https://www.facebook.com",
          followers: "25K+"
        },
        {
          name: "Instagram",
          icon: "instagram.png",
          link: "https://www.instagram.com",
          followers: "18K+"
        },
        {
          name: "LinkedIn",
          icon: "linkedin.png",
          link: "https://www.linkedin.com",
          followers: "12K+"
        },
        {
          name: "TikTok",
          icon: "tiktok.png",
          link: "https://www.tiktok.com",
          followers: "30K+"
        },
        {
          name: "SnapChat",
          icon: "snapchat.png",
          link: "https://www.snapchat.com/",
          followers: "8K+"
        },
        {
          name: "WhatsApp",
          icon: "whatsapp.png",
          link: "https://www.whatsapp.com/",
          followers: "15K+"
        },
      ],
      testimonials: [
        { image: "testimonial1.jpg" },
        { image: "testimonial2.jpg" },
        { image: "testimonial3.jpg" },
        { image: "testimonial4.jpg" },
        { image: "testimonial5.jpg" },
        { image: "testimonial6.jpg" },
      ],
      toolkit: [
        { icon: "fas fa-palette", title: "Design Tools", description: "Professional design and branding solutions" },
        { icon: "fas fa-tags", title: "Marketing Tools", description: "Advanced marketing and analytics platform" },
        { icon: "fas fa-heart", title: "Customer Care", description: "24/7 customer support and engagement" },
        { icon: "fas fa-cogs", title: "Technical Solutions", description: "Custom development and integration services" },
      ],
    };
  },
  computed: {
    trackWidth() {
      return this.testimonials.length * 320;
    },
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
    openModal(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
    createParticles() {
      const container = document.querySelector('.particles-container');
      if (!container) return;
      
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(particle);
      }
    },
    initializeAnimations() {
      // Initialize intersection observer for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            
            // Add staggered animation to toolkit items
            if (entry.target.classList.contains('toolkit')) {
              const items = entry.target.querySelectorAll('.toolkit-item');
              items.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('animate-in');
                }, index * 150);
              });
            }
          }
        });
      }, { threshold: 0.1 });

      // Observe all animatable elements
      document.querySelectorAll(".animate-slideIn, .animate-fadeIn, .toolkit").forEach((el) => {
        observer.observe(el);
      });
    },
    setupScrollerAnimation() {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.addScrollerAnimation();
      }
    },
    addScrollerAnimation() {
      const scroller = document.querySelectorAll(".scroller");
      scroller.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    },
    startAutoSlide() {
      this.slideInterval = setInterval(() => {
        this.translateX += 1;
        if (this.translateX >= this.trackWidth) {
          this.translateX = 0;
        }
      }, 16);
    },
  },
  mounted() {
    this.createParticles();
    this.initializeAnimations();
    this.setupScrollerAnimation();
  },
};
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

/* Enhanced base styles */
.social-proof-testimonials {
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

/* Background effects */
.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
  border-radius: 50%;
  animation: magicParticleFloat infinite linear;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  backdrop-filter: blur(10px);
  animation: floatingShapes 20s infinite ease-in-out;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 10%;
  animation-delay: 7s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

/* Enhanced section headers */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.title-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(10px);
  animation: badgeGlow 3s ease-in-out infinite;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--text-primary);
  margin: 0;
  position: relative;
}

.title-main {
  display: block;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-underline {
  width: 80px;
  height: 4px;
  background: var(--gradient-secondary);
  margin: 1rem auto 0;
  border-radius: 2px;
  animation: underlineGrow 1s ease-out 0.5s both;
}

/* Enhanced scroller styles */
.scroller {
  max-width: 100%;
  margin: 0 auto 6rem;
  position: relative;
  z-index: 2;
}

.scroller[data-animated="true"] {
  overflow: hidden;
  -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s) var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-speed="fast"] {
  --_animation-duration: 20s;
}

.scroller[data-speed="slow"] {
  --_animation-duration: 60s;
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

/* Enhanced social item cards */
.social-item {
  flex: none;
  width: 280px;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.magical-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
}

.magical-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  border-radius: inherit;
  animation: cardRotate 10s linear infinite;
  z-index: -1;
}

.magical-card:hover {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(99, 102, 241, 0.2);
}

.social-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.social-icon-container img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(99, 102, 241, 0.2);
  transition: all 0.3s ease;
}

.icon-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: var(--gradient-magical);
  border-radius: 50%;
  z-index: -1;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.magical-card:hover .icon-glow {
  opacity: 0.6;
}

.description {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.social-stats {
  margin-top: 1rem;
}

.followers-count {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.followers-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 3s infinite;
}

/* Toolkit section enhancements */
.toolkit-section {
  margin-top: 6rem;
  position: relative;
  z-index: 2;
}

.toolkit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.toolkit-item {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
}

.toolkit-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.toolkit-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.toolkit-icon-container i {
  font-size: 3rem;
  color: var(--primary-color);
  display: block;
  animation: iconFloat 3s ease-in-out infinite;
}

.icon-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: iconPulse 2s ease-in-out infinite;
}

.toolkit-item h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.toolkit-item p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.toolkit-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.toolkit-item:hover .toolkit-cta {
  transform: translateX(5px);
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  border-radius: inherit;
  z-index: -1;
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toolkit-item:hover .card-glow {
  opacity: 0.5;
}

/* Enhanced modal styles */
.magical-modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

/* Animation keyframes */
@keyframes magicParticleFloat {
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
    transform: translateY(-100px) translateX(30px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes floatingShapes {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-15px) rotate(270deg);
    opacity: 0.7;
  }
}

@keyframes badgeGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
  }
}

@keyframes underlineGrow {
  from {
    width: 0;
  }
  to {
    width: 80px;
  }
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 1rem));
  }
}

@keyframes cardRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes iconPulse {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

/* Enhanced responsive design */
@media (max-width: 1024px) {
  .social-proof-testimonials {
    padding: 80px 0;
  }
  
  .toolkit {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .social-proof-testimonials {
    padding: 60px 0;
  }
  
  .section-header {
    margin-bottom: 3rem;
  }
  
  .title-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .social-item {
    width: 240px;
  }
  
  .magical-card {
    padding: 1.5rem;
  }
  
  .toolkit {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
  }
  
  .toolkit-section {
    margin-top: 4rem;
  }
  
  .shape-2,
  .shape-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .social-proof-testimonials {
    padding: 40px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .social-item {
    width: 200px;
  }
  
  .magical-card {
    padding: 1rem;
    border-radius: 16px;
  }
  
  .social-icon-container img {
    width: 50px;
    height: 50px;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .followers-count {
    font-size: 1.3rem;
  }
  
  .toolkit-icon-container i {
    font-size: 2.5rem;
  }
  
  .icon-pulse {
    width: 60px;
    height: 60px;
  }
}

/* Animation states */
.animate-slideIn {
  animation: slideIn 1s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate {
  opacity: 1;
  transform: translateY(0);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .scroller[data-animated="true"] .scroller__inner {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .magical-card {
    border: 2px solid;
    background: white;
  }
  
  .title-badge {
    border: 2px solid;
    background: white;
  }
}
</style>
