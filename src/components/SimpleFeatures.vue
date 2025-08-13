<template>
  <section class="simple-features">
    <!-- Animated Background Elements -->
    <div class="animated-bg">
      <div class="parallax-layer" data-speed="0.1">
        <div class="floating-geometric geo-1" />
        <div class="floating-geometric geo-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.3">
        <div class="floating-geometric geo-3" />
        <div class="energy-wave wave-1" />
      </div>
      
      <div class="parallax-layer" data-speed="0.5">
        <div class="energy-wave wave-2" />
      </div>
    </div>

    <div class="container">
      <!-- Section Header with Slide In Animation -->
      <div class="section-header slide-in-element">
        <h2 class="section-title fade-in-element">
          {{ $t('sections.ourTools') }}
        </h2>
        <p
          class="section-subtitle fade-in-element"
          style="animation-delay: 0.3s;"
        >
          {{ $t('sections.ourToolsSubtitle') }}
        </p>
      </div>

      <!-- Features Grid with Staggered Animation -->
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="feature-item glass-card slide-in-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="feature-icon fade-in-element">
            <i :class="feature.icon" />
          </div>
          <h3 class="feature-title slide-in-left">
            {{ feature.title }}
          </h3>
          <p class="feature-description slide-in-right">
            {{ feature.description }}
          </p>
          
          <!-- Elegant Hover Effects -->
          <div class="feature-glow" />
          <div class="feature-shine" />
        </div>
      </div>

      <!-- Services Section with Move In Animation -->
      <div class="services-section move-in-element">
        <h3 class="services-title fade-in-element">
          {{ $t('sections.professionalServices') }}
        </h3>
        <div class="services-grid">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="service-card glass-card slide-in-up"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="service-icon fade-in-element">
              <i :class="service.icon" />
            </div>
            <h4 class="service-name slide-in-left">
              {{ service.name }}
            </h4>
            <p class="service-description slide-in-right">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Achievements Section with Staggered Animation -->
      <div class="achievements-section move-in-element">
        <h3 class="achievements-title fade-in-element">
          {{ $t('sections.achievements') }}
        </h3>
        <p
          class="achievements-subtitle fade-in-element"
          style="animation-delay: 0.2s;"
        >
          {{ $t('sections.achievementsSubtitle') }}
        </p>
        <div class="achievements-grid">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="achievement-card glass-card slide-in-up"
            :style="{ animationDelay: `${index * 0.25}s` }"
          >
            <div class="achievement-icon fade-in-element">
              <i :class="achievement.icon" />
            </div>
            <h4 class="achievement-title slide-in-left">
              {{ achievement.title }}
            </h4>
            <p class="achievement-description slide-in-right">
              {{ achievement.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleFeatures",
  data() {
    return {
      animatedElements: [],
      features: [
        {
          title: "Đội Ngũ Chuyên Nghiệp",
          description: "Đội ngũ kỹ sư và chuyên gia giàu kinh nghiệm, cam kết mang đến những giải pháp công nghệ chất lượng cao.",
          icon: "fas fa-users"
        },
        {
          title: "Đầu Tư Chiến Lược",
          description: "Tập trung vào việc đầu tư và phát triển các giải pháp công nghệ tiên tiến, đáp ứng nhu cầu thị trường.",
          icon: "fas fa-chart-line"
        },
        {
          title: "Tối Ưu Hiệu Quả",
          description: "Tăng cường khả năng tiếp cận và chuyển đổi khách hàng thông qua các giải pháp công nghệ hiện đại.",
          icon: "fas fa-rocket"
        }
      ],
      services: [
        {
          name: "Web Development",
          description: "Thiết kế và phát triển website hiện đại",
          icon: "fas fa-laptop-code",
          items: ["Responsive Design", "E-commerce", "CMS", "API Integration"]
        },
        {
          name: "Digital Marketing",
          description: "Chiến lược marketing toàn diện",
          icon: "fas fa-chart-line",
          items: ["Social Media", "Content Marketing", "Email Marketing", "PPC Ads"]
        },
        {
          name: "SEO & Analytics",
          description: "Tối ưu hóa và phân tích dữ liệu",
          icon: "fas fa-chart-bar",
          items: ["On-page SEO", "Technical SEO", "Google Analytics", "Performance Tracking"]
        },
        {
          name: "Branding",
          description: "Xây dựng và phát triển thương hiệu",
          icon: "fas fa-palette",
          items: ["Logo Design", "Brand Identity", "Visual Guidelines", "Brand Strategy"]
        }
      ],
      achievements: [
        {
          title: "Số Lượng Khách Hàng",
          description: "Đã hợp tác với hơn 500 doanh nghiệp trong nhiều lĩnh vực khác nhau.",
          icon: "fas fa-users"
        },
        {
          title: "Số Dự Án Hoàn Thành",
          description: "Đã hoàn thành hơn 1,500 dự án trong nhiều nền tảng và ngôn ngữ khác nhau.",
          icon: "fas fa-project-diagram"
        },
        {
          title: "Số Lượng Sản Phẩm",
          description: "Đã phát triển và triển khai hơn 2,000 sản phẩm trực tuyến.",
          icon: "fas fa-code"
        }
      ]
    };
  },
  mounted() {
    this.setupScrollAnimation();
    this.setupParallaxEffect();
  },
  methods: {
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
          const rotate = scrolled * 0.003;
          
          element.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotate}deg)`;
        });
      });
    }
  }
};
</script>

<style scoped>
/* Enhanced Features Section */
.simple-features {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
}

/* Animated Background Elements */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
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

.floating-geometric {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  animation: floatGeometric 8s ease-in-out infinite;
}

.geo-1 {
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.geo-2 {
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.geo-3 {
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.energy-wave {
  position: absolute;
  width: 200px;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.6), transparent);
  border-radius: 2px;
  animation: energyWave 6s ease-in-out infinite;
}

.wave-1 {
  top: 30%;
  left: -200px;
  animation-delay: 0s;
}

.wave-2 {
  top: 70%;
  right: -200px;
  animation-delay: 3s;
}

@keyframes floatGeometric {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes energyWave {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(400px);
    opacity: 0;
  }
}

.simple-features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Enhanced Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
}

/* Enhanced Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 5rem;
}

.feature-item {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: featureSlideUp 1s ease-out backwards;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.15);
}

.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.feature-item:hover::before {
  transform: translateX(0);
}

.feature-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(30, 58, 138, 0.3);
  border-color: #3b82f6;
}

.feature-icon {
  font-size: 3.5rem;
  color: #1e3a8a;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
}

.feature-item:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
  color: #3b82f6;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  font-weight: 400;
}

/* Elegant Hover Effects */
.feature-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.feature-item:hover .feature-glow {
  opacity: 1;
}

.feature-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 20%, transparent 60%);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.feature-item:hover .feature-shine {
  opacity: 1;
}

/* Enhanced Services Section */
.services-section {
  text-align: center;
}

.services-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.service-card {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  border: 2px solid #3b82f6;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #60a5fa, #93c5fd, #60a5fa);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(30, 58, 138, 0.4);
  border-color: #60a5fa;
}

.service-icon {
  font-size: 3.5rem;
  color: #60a5fa;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
  color: #93c5fd;
}

.service-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.service-description {
  font-size: 1.1rem;
  color: #bfdbfe;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 400;
}

.service-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.service-items li {
  background: rgba(255, 255, 255, 0.1);
  color: #e0f2fe;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.service-items li:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #60a5fa;
  transform: translateY(-2px);
}

/* Achievements Section */
.achievements-section {
  text-align: center;
  margin-top: 5rem;
}

.achievements-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.achievements-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  font-weight: 400;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.achievement-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: achievementSlideUp 1s ease-out backwards;
  backdrop-filter: blur(20px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.15);
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.achievement-card:hover::before {
  transform: translateX(0);
}

.achievement-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(30, 58, 138, 0.3);
  border-color: #3b82f6;
}

.achievement-icon {
  font-size: 3.5rem;
  color: #1e3a8a;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
}

.achievement-card:hover .achievement-icon {
  transform: scale(1.1) rotate(5deg);
  color: #3b82f6;
}

.achievement-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.achievement-description {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  font-weight: 400;
}

/* Animations */
@keyframes featureSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-1 {
  animation-delay: 0.1s;
}

.magical-hover {
  animation-fill-mode: both;
}

.icon-bounce {
  animation: iconBounce 2s ease-in-out infinite;
}

@keyframes iconBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.magical-glow {
  text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
}

.mystical-glow {
  text-shadow: 0 0 15px rgba(96, 165, 250, 0.4);
}

.holographic-text {
  background: linear-gradient(135deg, #ffffff, #e0f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ethereal-float {
  animation: etherealFloat 3s ease-in-out infinite;
}

@keyframes etherealFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes achievementSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

/* Responsive Design */
@media (max-width: 768px) {
  .simple-features {
    padding: 3rem 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .services-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .feature-item,
  .service-card {
    padding: 2.5rem 2rem;
  }
  
  .service-items {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .services-title {
    font-size: 1.6rem;
  }
  
  .feature-title,
  .service-name {
    font-size: 1.3rem;
  }
  
  .feature-item,
  .service-card {
    padding: 2rem 1.5rem;
  }
}
</style> 


