<template>
  <section class="simple-social">
    <!-- Animated Background Elements -->
    <div class="animated-bg">
      <div class="parallax-layer" data-speed="0.1">
        <div class="floating-dots dot-1" />
        <div class="floating-dots dot-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.3">
        <div class="floating-dots dot-3" />
        <div class="connection-lines line-1" />
      </div>
      
      <div class="parallax-layer" data-speed="0.5">
        <div class="connection-lines line-2" />
      </div>
    </div>

    <div class="container">
      <!-- Section Header with Slide In Animation -->
      <div class="section-header slide-in-element">
        <h2 class="section-title fade-in-element">
          Our Clients
        </h2>
        <p
          class="section-subtitle fade-in-element"
          style="animation-delay: 0.3s;"
        >
          Những đối tác tin tưởng đã chọn ESmart Solutions
        </p>
      </div>

      <!-- Clients Banner with Slide In Animation -->
      <div class="clients-banner slide-in-up">
        <div class="clients-scroll">
          <div
            v-for="(client, index) in clients"
            :key="index"
            class="client-logo fade-in-element"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <img 
              :src="client.logo" 
              :alt="client.name"
              @error="handleImageError"
            >
            <span class="client-name">{{ client.name }}</span>
          </div>
        </div>
      </div>

      <!-- Trust Cards with Staggered Animation -->
      <div class="trust-cards">
        <div
          v-for="(card, index) in trustCards"
          :key="index"
          class="trust-card glass-card slide-in-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="card-icon fade-in-element">
            <i :class="card.icon" />
          </div>
          <h3 class="card-title slide-in-left">
            {{ card.title }}
          </h3>
          <p class="card-description slide-in-right">
            {{ card.description }}
          </p>
        </div>
      </div>

      <!-- Bộ Công Cụ Của Chúng Tôi Section -->
      <div class="toolkit-section">
        <div class="section-header slide-in-element">
          <h2 class="section-title fade-in-element">
            Bộ Công Cụ Của Chúng Tôi
          </h2>
          <p
            class="section-subtitle fade-in-element"
            style="animation-delay: 0.3s;"
          >
            Những giải pháp công nghệ tiên tiến giúp doanh nghiệp phát triển bền vững
          </p>
        </div>

        <div class="toolkit-grid">
          <div
            v-for="(tool, index) in toolkit"
            :key="index"
            class="toolkit-item glass-card slide-in-up"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="tool-icon fade-in-element">
              <i :class="tool.icon" />
            </div>
            <h3 class="tool-title slide-in-left">
              {{ tool.title }}
            </h3>
            <p class="tool-description slide-in-right">
              {{ tool.description }}
            </p>
            <div class="tool-hover-effect" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleSocialProof",
  data() {
    return {
      animatedElements: [],
      currentIndex: 0,
      autoTimer: null,
      
      // Clients Array for Our Clients Section
      clients: [
        {
          name: "VinPhuc Holdings",
          logo: "https://via.placeholder.com/120x60/1e3a8a/ffffff?text=VinPhuc",
          description: "B2B SaaS Partner since 2020"
        },
        {
          name: "Hoa Phat Tech",
          logo: "https://via.placeholder.com/120x60/3b82f6/ffffff?text=HoaPhat",
          description: "Fintech Partner since 2019"
        },
        {
          name: "NextGen Retail",
          logo: "https://via.placeholder.com/120x60/60a5fa/ffffff?text=NextGen",
          description: "Retail Partner since 2021"
        },
        {
          name: "SunPetro Services",
          logo: "https://via.placeholder.com/120x60/93c5fd/ffffff?text=SunPetro",
          description: "Industrial Services since 2022"
        },
        {
          name: "Mekong Logistics",
          logo: "https://via.placeholder.com/120x60/bfdbfe/ffffff?text=Mekong",
          description: "Logistics Partner since 2020"
        },
        {
          name: "AlphaEdu Group",
          logo: "https://via.placeholder.com/120x60/dbeafe/ffffff?text=AlphaEdu",
          description: "EdTech Partner since 2018"
        }
      ],

      // Trust Cards Array
      trustCards: [
        {
          icon: "fas fa-award",
          title: "Chất Lượng Đảm Bảo",
          description: "Cam kết chất lượng dịch vụ cao nhất với khách hàng"
        },
        {
          icon: "fas fa-clock",
          title: "Giao Hàng Đúng Hạn",
          description: "Đảm bảo hoàn thành dự án đúng thời gian cam kết"
        },
        {
          icon: "fas fa-users",
          title: "Đội Ngũ Chuyên Nghiệp",
          description: "Đội ngũ kỹ sư giàu kinh nghiệm và tâm huyết"
        },
        {
          icon: "fas fa-headset",
          title: "Hỗ Trợ 24/7",
          description: "Sẵn sàng hỗ trợ khách hàng mọi lúc, mọi nơi"
        }
      ],

      socialNetworks: [
        {
          name: "VinPhuc Holdings",
          icon: "linkedin.png",
          link: "#",
          followers: "Đối tác từ 2020 • CEO: Phạm Minh Khôi • Ngành: B2B SaaS",
          description: "Tăng 320% doanh thu online, mở rộng 12 thị trường, triển khai Growth Stack end‑to‑end trong 9 tháng"
        },
        {
          name: "Hoa Phat Tech JSC",
          icon: "facebook.png",
          link: "#",
          followers: "Đối tác từ 2019 • Founder: Trần Thu Hà • Ngành: Fintech",
          description: "5 triệu MAU, giảm 41% CAC, hệ thống CRM đa kênh và tự động hóa chăm sóc khách hàng"
        },
        {
          name: "NextGen Retail",
          icon: "instagram.png",
          link: "#",
          followers: "Đối tác từ 2021 • CEO: Lê Đức Nam • Ngành: Bán lẻ",
          description: "Mở rộng từ 48 lên 120 cửa hàng, chuẩn hóa omnichannel, nâng NPS từ 52 → 71"
        },
        {
          name: "SunPetro Services",
          icon: "linkedin.png", 
          link: "#",
          followers: "Đối tác từ 2022 • COO: Đặng Bảo Trân • Ngành: Dịch vụ công nghiệp",
          description: "Giảm 27% CPL, tăng 3.2x lead chất lượng, dashboard thời gian thực cho 7 vùng vận hành"
        },
        {
          name: "Mekong Logistics",
          icon: "tiktok.png",
          link: "#",
          followers: "Đối tác từ 2020 • CEO: Võ Quốc Khánh • Ngành: Logistics",
          description: "Tối ưu tuyến và định giá động, SLA đạt 99.95%, tiết kiệm 18% chi phí nhiên liệu"
        },
        {
          name: "AlphaEdu Group",
          icon: "facebook.png",
          link: "#",
          followers: "Đối tác từ 2018 • Chairwoman: Nguyễn Thảo Vy • Ngành: EdTech",
          description: "300K học viên hoạt động, giảm 42% CAC, tăng tỉ lệ hoàn thành khóa học +35%"
        }
      ],

      toolkit: [
        {
          icon: "fas fa-chart-line",
          title: "Phân Tích Dữ Liệu",
          description: "Công cụ phân tích chuyên sâu"
        },
        {
          icon: "fas fa-palette",
          title: "Thiết Kế Sáng Tạo",
          description: "Bộ công cụ thiết kế chuyên nghiệp"
        },
        {
          icon: "fas fa-code",
          title: "Phát Triển Web",
          description: "Framework và công nghệ hiện đại"
        },
        {
          icon: "fas fa-bullhorn",
          title: "Marketing Số",
          description: "Nền tảng quảng cáo đa kênh"
        }
      ]
    };
  },
  mounted() {
    this.startAuto();
    this.setupScrollAnimation();
    this.setupParallaxEffect();
  },
  beforeUnmount() {
    this.stopAuto();
  },
  methods: {
    getImageUrl(iconName) {
      try {
        return require(`@/assets/${iconName}`);
      } catch (error) {
        return 'https://via.placeholder.com/120x60.png?text=Client';
      }
    },
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/120x60.png?text=Client';
    },
    startAuto() {
      this.stopAuto();
      this.autoTimer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.socialNetworks.length;
      }, 3000);
    },
    stopAuto() {
      if (this.autoTimer) {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
      }
    },
    pauseAuto() { this.stopAuto(); },
    resumeAuto() { this.startAuto(); },
    goTo(i) { this.currentIndex = i; },
    
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
          const rotate = scrolled * 0.004;
          
          element.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotate}deg)`;
        });
      });
    }
  }
};
</script>

<style scoped>
/* Magical Social Proof Animations */
.simple-social {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.simple-social::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.02), transparent);
  animation: sectionSweep 8s ease-in-out infinite;
}

/* Animated Background Elements */
.animated-bg {
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

.animated-bg > * {
  position: absolute;
  pointer-events: none;
}

/* Container with proper z-index */
.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Section Spacing and Layout Improvements */
.simple-social {
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.section-subtitle {
  font-size: 1.3rem;
  color: #bfdbfe;
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Clients Banner Improvements */
.clients-banner {
  margin: 4rem 0;
  padding: 2rem 0;
}

.clients-scroll {
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.client-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.client-logo:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
}

.client-logo img {
  width: 80px;
  height: 40px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.client-logo:hover img {
  filter: grayscale(0%);
}

.client-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
}

/* Social Media Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.magical-social-card {
  background: rgba(30, 58, 138, 0.3);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: cardSlideIn 1s ease-out backwards;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
}

.magical-social-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  animation: cardRotate 15s linear infinite;
  z-index: -1;
}

.magical-social-card:hover {
  transform: translateY(-15px) rotateX(10deg) scale(1.03);
  box-shadow: 0 25px 50px rgba(96, 165, 250, 0.4);
  border-color: #60a5fa;
  background: rgba(30, 58, 138, 0.5);
}

.magical-social-card:hover .social-icon {
  transform: scale(1.2) rotate(360deg);
}

.social-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #93c5fd;
  transition: all 0.6s ease;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(147, 197, 253, 0.1));
  text-shadow: 0 2px 15px rgba(96, 165, 250, 0.5);
  position: relative;
}

.social-icon::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  z-index: -1;
  /* Removed infinite animation for stability */
}

.facebook-icon {
  background: #1877f2;
}

.instagram-icon {
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
}

.linkedin-icon {
  background: #0077b5;
}

.twitter-icon {
  background: #1da1f2;
}

.social-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
  animation: titleSlideIn 1s ease-out 0.3s backwards;
}

.social-description {
  font-size: 0.95rem;
  color: #93c5fd;
  margin-bottom: 1.5rem;
  animation: descSlideIn 1s ease-out 0.5s backwards;
}

.social-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  animation: statsCountUp 1.5s ease-out 1s backwards;
}

.stats-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e3a8a;
  animation: numberGlow 2s ease-in-out infinite;
}

.stats-label {
  font-size: 0.9rem;
  color: #93c5fd;
  font-weight: 500;
}

/* Toolkit Section Improvements */
.toolkit-section {
  margin-top: 8rem;
  padding-top: 5rem;
  border-top: 2px solid rgba(255, 255, 255, 0.15);
}

.toolkit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
}

.toolkit-card {
  background: white; border: 2px solid #1e3a8a;
  border: 2px solid #1e3a8a;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.toolkit-card:hover {
  border-color: #bfdbfe;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toolkit-icon {
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.toolkit-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.toolkit-card p {
  font-size: 0.9rem;
  color: #93c5fd;
  line-height: 1.5;
}

/* Trust & Commitments */
.trust-section, .commit-section { margin-top: 4rem; }
.trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.trust-badge { display: flex; gap: 0.75rem; align-items: center; border: 2px solid #1e3a8a; border-radius: 10px; padding: 0.75rem 1rem; background: white; border: 2px solid #1e3a8a; }
.badge-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #1e3a8a; border-radius: 8px; color: #1e3a8a; }
.badge-info h4 { margin: 0 0 2px; font-size: 1rem; color: #1e3a8a; }
.badge-info p { margin: 0; color: #93c5fd; font-size: 0.9rem; }
.commit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.commit-card { border: 2px solid #1e3a8a; border-radius: 10px; background: white; border: 2px solid #1e3a8a; padding: 1rem; }
.commit-card h3 { margin: 0 0 6px; color: #1e3a8a; font-size: 1.05rem; }
.commit-card p { margin: 0; color: #93c5fd; }

/* Contact Section */
.contact-section {
  margin-top: 4rem;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.contact-item {
  background: white; border: 2px solid #1e3a8a;
  border: 2px solid #1e3a8a;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}
.contact-item:hover {
  background: #f8fafc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #bfdbfe;
}
.contact-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}
.contact-item p {
  font-size: 0.9rem;
  color: #93c5fd;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-social {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .clients-banner {
    margin: 2rem 0;
    padding: 2rem 0;
  }
  
  .clients-scroll {
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .client-logo {
    min-width: 120px;
    padding: 1rem;
  }
  
  .trust-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .toolkit-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .toolkit-item,
  .trust-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .clients-scroll {
    flex-direction: column;
    gap: 1rem;
  }
  
  .client-logo {
    min-width: 100%;
  }
}

/* Animation Keyframes */
@keyframes sectionSweep {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: -100%; }
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateX(-50px) rotateY(-30deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0);
  }
}

@keyframes cardRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes titleSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes descSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes statsCountUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes numberGlow {
  0%, 100% { text-shadow: none; }
  50% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.3); }
}

/* Clients Banner - Horizontal Scrolling */
.clients-banner {
  margin: 4rem 0;
  padding: 3rem 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  border-radius: 20px;
  overflow: hidden;
}

.clients-banner-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e0f2fe;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.clients-marquee {
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.clients-track {
  display: inline-flex;
  animation: marqueeScroll 30s linear infinite;
  gap: 4rem;
  align-items: center;
}

.client-logo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 2px solid rgba(30, 58, 138, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 160px;
  height: 80px;
}

.client-logo-item:hover {
  transform: translateY(-5px) scale(1.05);
  border-color: #3b82f6;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
}

.client-logo-item img {
  max-width: 120px;
  max-height: 60px;
  object-fit: contain;
  filter: grayscale(0%);
  transition: all 0.3s ease;
}

.clients-marquee:hover .clients-track {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Trust Cards Improvements */
.trust-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin: 5rem 0;
}

.trust-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.trust-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
}

.card-icon {
  font-size: 3rem;
  color: #3b82f6;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.card-description {
  font-size: 1rem;
  color: #bfdbfe;
  line-height: 1.6;
}

/* Toolkit Section Styling */
.toolkit-section {
  margin-top: 6rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.toolkit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.toolkit-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.toolkit-item:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 25px 50px rgba(59, 130, 246, 0.3);
}

.tool-icon {
  font-size: 3rem;
  color: #3b82f6;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.toolkit-item:hover .tool-icon {
  transform: scale(1.1);
  color: #60a5fa;
}

.tool-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.tool-description {
  font-size: 1rem;
  color: #bfdbfe;
  line-height: 1.6;
}

.tool-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: skewX(-25deg);
  transition: left 0.8s ease;
  pointer-events: none;
}

.toolkit-item:hover .tool-hover-effect {
  left: 100%;
}

/* Enhanced Animation Classes */
.slide-in-element {
  animation: slideInElement 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.fade-in-element {
  animation: fadeInElement 0.8s ease-out forwards;
  opacity: 0;
}

.slide-in-up {
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
}

.slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
  opacity: 0;
  transform: translateX(-30px);
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
  opacity: 0;
  transform: translateX(30px);
}

/* Animation Keyframes */
@keyframes slideInElement {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInElement {
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Floating Dots Animation */
.floating-dots {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(59, 130, 246, 0.6);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.dot-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.dot-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.dot-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

/* Connection Lines Animation */
.connection-lines {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
  animation: connect 8s ease-in-out infinite;
}

.line-1 {
  top: 40%;
  left: 0;
  width: 100px;
  animation-delay: 0s;
}

.line-2 {
  bottom: 50%;
  right: 0;
  width: 80px;
  animation-delay: 4s;
}

@keyframes connect {
  0%, 100% {
    opacity: 0.3;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}
</style> 