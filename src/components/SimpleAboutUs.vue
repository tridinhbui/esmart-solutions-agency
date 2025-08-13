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
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title typing-text" data-text="Về Chúng Tôi">
          Về Chúng Tôi
        </h2>
        <p class="section-subtitle sequential-text" data-delay="0.5">
          Đội ngũ chuyên gia giàu kinh nghiệm với tầm nhìn đổi mới
        </p>
      </div>

      <!-- About Content -->
      <div class="about-content">
        <div class="about-text">
          <div class="text-block sequential-text" data-delay="0.8">
            <p class="about-description">
              Chúng tôi là ESmart Solutions Agency - đối tác tin cậy trong lĩnh vực công nghệ và chuyển đổi số. Với kinh nghiệm hơn 10 năm, chúng tôi đã giúp hàng trăm doanh nghiệp tối ưu hóa quy trình và tăng hiệu suất hoạt động.
            </p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat-card sequential-appear"
            :data-delay="1.2 + (index * 0.2)"
          >
            <div class="stat-number sequential-text" :data-delay="1.4 + (index * 0.2)">
              {{ stat.number }}
            </div>
            <div class="stat-label sequential-text" :data-delay="1.6 + (index * 0.2)">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="values-section">
          <h3 class="values-title typing-text" data-text="Giá trị cốt lõi">
            Giá trị cốt lõi
          </h3>
          <div class="values-grid">
            <div
              v-for="(value, index) in values"
              :key="index"
              class="value-card sequential-appear"
              :data-delay="2.0 + (index * 0.2)"
            >
              <h4 class="value-title sequential-text" :data-delay="2.2 + (index * 0.2)">
                {{ value.title }}
              </h4>
              <p class="value-description sequential-text" :data-delay="2.4 + (index * 0.2)">
                {{ value.description }}
              </p>
            </div>
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
    this.initSequentialAnimations();
    this.setupScrollAnimation();
    this.setupParallaxEffect();
  },
  methods: {
    handleImageError(event) {
      event.target.src = "https://via.placeholder.com/150x150/1e3a8a/ffffff?text=Avatar";
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
.simple-about {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 1rem;
}

/* About Content */
.about-content {
  margin-bottom: 2rem;
}

.about-text {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.text-block {
  margin-bottom: 2rem;
}

.about-description {
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.7;
  text-align: center;
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
  background: white; border: 2px solid #1e3a8a;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Values Section */
.values-section {
  text-align: center;
}

.values-title {
  font-size: 2rem;
  font-weight: 600;
  color: #e0f2fe;
  margin-bottom: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.value-card {
  background: white; border: 2px solid #1e3a8a;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.value-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2.5rem;
  color: #e0f2fe;
  margin-bottom: 1rem;
}

.value-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.value-card p {
  font-size: 0.9rem;
  color: #1e3a8a;
  line-height: 1.5;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-about {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .values-title {
    font-size: 1.5rem;
  }
  
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card,
  .value-card {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

/* Animation Classes */
.slide-in-element {
  opacity: 0;
  transform: translateX(-80px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(5px);
}

.fade-in-element {
  opacity: 0;
  transform: scale(0.8);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(3px);
}

.slide-in-up {
  opacity: 0;
  transform: translateY(80px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(5px);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-60px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(4px);
}

.slide-in-right {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(4px);
}

.move-in-element {
  opacity: 0;
  transform: translateY(60px) scale(0.9);
  transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: blur(4px);
}

/* Animate when visible */
.slide-in-element.animate-in,
.fade-in-element.animate-in,
.slide-in-up.animate-in,
.slide-in-left.animate-in,
.slide-in-right.animate-in,
.move-in-element.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  filter: blur(0px);
}

/* Enhanced hover effects */
.slide-in-element.animate-in:hover,
.fade-in-element.animate-in:hover,
.slide-in-up.animate-in:hover,
.slide-in-left.animate-in:hover,
.slide-in-right.animate-in:hover,
.move-in-element.animate-in:hover {
  transform: translate(0, 0) scale(1.02);
  transition: all 0.3s ease;
}

/* Animation Keyframes */
@keyframes slideInElement {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInElement {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes moveInElement {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Elegant Background Elements */
.elegant-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
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

/* Glassmorphism Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.geometric-pattern {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  animation: elegantFloat 15s ease-in-out infinite;
}

.pattern-1 {
  width: 400px;
  height: 400px;
  top: 5%;
  left: -100px;
  animation-delay: 0s;
}

.pattern-2 {
  width: 300px;
  height: 300px;
  top: 50%;
  right: -50px;
  animation-delay: 5s;
}

.pattern-3 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: 20%;
  animation-delay: 10s;
}

.flowing-waves {
  position: absolute;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: elegantFlow 12s ease-in-out infinite;
}

.wave-1 {
  width: 500px;
  top: 25%;
  left: -250px;
  transform: rotate(20deg);
  animation-delay: 0s;
}

.wave-2 {
  width: 400px;
  top: 75%;
  right: -200px;
  transform: rotate(-20deg);
  animation-delay: 6s;
}

.elegant-dots {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: elegantParticle 8s ease-in-out infinite;
}

.dot-1 {
  top: 15%;
  left: 40%;
  animation-delay: 0s;
}

.dot-2 {
  top: 65%;
  right: 30%;
  animation-delay: 3s;
}

.dot-3 {
  bottom: 25%;
  left: 60%;
  animation-delay: 6s;
}

/* Elegant Card Design */
.elegant-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.15);
}

.elegant-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa);
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.elegant-card:hover::before {
  transform: translateX(0);
}

.elegant-card:hover {
  transform: translateY(-15px) scale(1.03);
  box-shadow: 0 30px 60px rgba(30, 58, 138, 0.3);
  border-color: #3b82f6;
}

/* Company Story Section */
.company-story {
  margin-bottom: 4rem;
}

.story-card {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.story-icon {
  font-size: 4rem;
  color: #1e3a8a;
  margin-bottom: 2rem;
  transition: all 0.5s ease;
}

.story-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.story-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.8;
  font-weight: 400;
}

/* Company Values Section */
.company-values {
  margin-bottom: 5rem;
  text-align: center;
}

.values-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.value-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.value-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  font-weight: 400;
}

/* Company Stats Section */
.company-stats {
  margin-bottom: 5rem;
  text-align: center;
}

.stats-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.stat-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.stat-progress {
  width: 100%;
  height: 6px;
  background: rgba(30, 58, 138, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6);
  border-radius: 3px;
  transition: width 2s ease-in-out;
}

/* Team Section */
.team-section {
  text-align: center;
}

.team-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.team-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  font-weight: 400;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.team-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem auto;
  position: relative;
  overflow: hidden;
  border: 4px solid #1e3a8a;
  transition: all 0.4s ease;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(59, 130, 246, 0.2));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.team-card:hover .member-avatar {
  transform: scale(1.1);
  border-color: #3b82f6;
}

.team-card:hover .avatar-overlay {
  opacity: 1;
}

.member-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.member-position {
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.member-description {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  font-weight: 400;
  margin-bottom: 1.5rem;
}

.member-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link:hover::before {
  opacity: 1;
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 10px 20px rgba(30, 58, 138, 0.3);
}

.social-link i {
  position: relative;
  z-index: 1;
  font-size: 1rem;
}

/* Card Decorative Elements */
.card-decoration {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  filter: blur(20px);
  animation: elegantPulse 6s ease-in-out infinite;
}

.decoration-1 {
  width: 120px;
  height: 120px;
  top: -30px;
  right: -30px;
  animation-delay: 0s;
}

.decoration-2 {
  width: 80px;
  height: 80px;
  bottom: -20px;
  left: -20px;
  animation-delay: 3s;
}

/* Card Glow and Shine Effects */
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.elegant-card:hover .card-glow {
  opacity: 1;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-25deg);
  transition: left 0.8s ease;
  pointer-events: none;
}

.elegant-card:hover .card-shine {
  left: 100%;
}

/* Animation Keyframes */
@keyframes elegantFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
    opacity: 0.4;
  }
}

@keyframes elegantFlow {
  0%, 100% {
    transform: translateX(-100%) rotate(20deg);
    opacity: 0;
  }
  50% {
    transform: translateX(100%) rotate(20deg);
    opacity: 1;
  }
}

@keyframes elegantParticle {
  0%, 100% {
    transform: scale(1) translateY(0);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.5) translateY(-15px);
    opacity: 0.6;
  }
}

@keyframes elegantPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-about {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .values-title {
    font-size: 1.5rem;
  }
  
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card,
  .value-card {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

/* Typing Effect */
.typing-text {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #3B82F6;
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

.typing-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(40, end) forwards;
}

/* Sequential Text Appearance */
.sequential-text {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sequential-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Sequential Appear for Cards */
.sequential-appear {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.sequential-appear.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Typing Animation Keyframes */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #3B82F6; }
}
</style> 