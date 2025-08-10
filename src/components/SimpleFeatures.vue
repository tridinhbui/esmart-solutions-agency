<template>
  <section class="simple-features">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Thành Tựu Nổi Bật</h2>
        <p class="section-subtitle">Những thành tựu và dịch vụ nổi bật của ESmart Solutions</p>
      </div>

      <!-- Magical Features Grid -->
      <div class="features-grid">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="magical-feature-card magical-hover stagger-1"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <div class="feature-icon icon-bounce">
            <i :class="feature.icon"></i>
          </div>
          <h3 class="feature-title magical-text">{{ feature.title }}</h3>
          <p class="feature-description fade-in-up">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="services-section">
        <h3 class="services-title magical-glow">Dịch Vụ Chuyên Nghiệp</h3>
        
        <div class="services-grid">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="service-card magical-card-enhanced"
            :style="{ animationDelay: (index * 0.1) + 's' }"
          >
            <div class="service-icon mystical-glow">
              <i :class="service.icon"></i>
            </div>
            <h4 class="service-name holographic-text">{{ service.name }}</h4>
            <p class="service-description">{{ service.description }}</p>
            <ul class="service-items">
              <li v-for="item in service.items" :key="item" class="ethereal-float">{{ item }}</li>
            </ul>
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
      features: [
        {
          title: "Đội Ngũ Chuyên Nghiệp",
          description: "Các ấn phẩm truyền thông của ESmart Solutions đã đạt được số lượng người tiếp cận lên tới 1,000,000+.",
          icon: "fas fa-users",
          number: "500+",
          unit: "Websites"
        },
        {
          title: "Đầu Tư Chiến Lược", 
          description: "Esmart Solution đã gây quỹ tài trợ và nhận được sự hợp tác chiến lược từ tổ chức Macalester Entrepreneurship and Innovation Fund có trụ sở tại Saint Paul, Minnesota.",
          icon: "fas fa-chart-line",
          number: "98%",
          unit: "Success Rate"
        },
        {
          title: "Tối Ưu Hiệu Quả",
          description: "Tăng cường khả năng tiếp cận và chuyển đổi khách hàng",
          icon: "fas fa-rocket",
          number: "300%",
          unit: "Traffic Boost"
        },
        {
          title: "Hỗ Trợ 24/7",
          description: "Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng",
          icon: "fas fa-headset",
          number: "24/7",
          unit: "Support"
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
          icon: "fas fa-analytics",
          items: ["On-page SEO", "Technical SEO", "Google Analytics", "Performance Tracking"]
        },
        {
          name: "Branding",
          description: "Xây dựng và phát triển thương hiệu",
          icon: "fas fa-palette",
          items: ["Logo Design", "Brand Identity", "Visual Guidelines", "Brand Strategy"]
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Magical Features Animations */
.simple-features {
  background: #f8f8f8;
  color: black;
  padding: 4rem 2rem;
  position: relative;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.magical-feature-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: featureSlideUp 1s ease-out backwards;
}

.magical-feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, black, #666, black);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.magical-feature-card:hover::before {
  transform: translateX(0);
}

.magical-feature-card:hover {
  transform: translateY(-20px) rotateX(5deg);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  background: black;
  position: relative;
  animation: iconBounce 2s ease-in-out infinite;
}

.feature-icon::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, black, #666, black);
  z-index: -1;
  animation: iconRotate 4s linear infinite;
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
  animation: titleTypewriter 1s ease-out 0.5s backwards;
}

.feature-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  animation: descFadeIn 1s ease-out 0.8s backwards;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.magical-service-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: serviceSlideIn 1s ease-out backwards;
}

.magical-service-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: black;
  transition: width 0.4s ease;
}

.magical-service-card:hover::after {
  width: 100%;
}

.magical-service-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
  animation: serviceIconSpin 3s ease-in-out infinite;
}

.service-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.service-tag {
  background: #f0f0f0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: tagPop 0.5s ease-out backwards;
}

.service-tag:hover {
  background: black;
  color: white;
  transform: scale(1.1);
}

/* Animation Keyframes */
@keyframes featureSlideUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes iconRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes titleTypewriter {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes descFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes serviceSlideIn {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes serviceIconSpin {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
}

@keyframes tagPop {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  color: black;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.feature-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.feature-number {
  font-size: 2rem;
  font-weight: 700;
  color: black;
}

.feature-unit {
  font-size: 0.8rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Services Section */
.services-section {
  margin-top: 4rem;
  text-align: center;
}

.services-title {
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 2rem;
}

.service-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: left;
  transition: all 0.2s ease;
}

.service-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.service-description {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  font-size: 0.85rem;
  color: #333;
  padding: 0.25rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.service-features li:last-child {
  border-bottom: none;
}

.service-features li::before {
  content: '✓';
  color: black;
  font-weight: bold;
  margin-right: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-features {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .services-title {
    font-size: 1.5rem;
  }
  
  .features-grid,
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-card,
  .service-card {
    padding: 1.5rem;
  }
  
  .feature-icon {
    font-size: 2.5rem;
  }
  
  .feature-number {
    font-size: 1.5rem;
  }
}
</style> 