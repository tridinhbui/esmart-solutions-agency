<template>
  <section class="simple-social-proof">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Khách Hàng Tin Tưởng</h2>
        <p class="section-subtitle">Hơn 500+ doanh nghiệp đã tin tưởng và hợp tác cùng ESmart Solutions</p>
      </div>

      <!-- Clients Slideshow -->
      <div class="clients-slider" @mouseenter="pauseAuto" @mouseleave="resumeAuto">
        <div class="slider-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="client-slide" v-for="client in socialNetworks" :key="client.name">
            <div class="client-logo">
              <img :src="getImageUrl(client.icon)" :alt="client.name" @error="handleImageError" />
            </div>
            <div class="client-info">
              <h3>{{ client.name }}</h3>
              <p class="client-meta">{{ client.followers }}</p>
              <p class="client-desc">{{ client.description }}</p>
            </div>
          </div>
        </div>
        <div class="slider-dots">
          <button v-for="(c, i) in socialNetworks" :key="i" :class="['dot', { active: i === currentIndex }]" @click="goTo(i)" />
        </div>
      </div>

      <!-- Trust Badges Section -->
      <div class="trust-section">
        <h2 class="section-title">Chứng Nhận & Đối Tác</h2>
        <div class="trust-grid">
          <div class="trust-badge" v-for="badge in certifications" :key="badge.title">
            <div class="badge-icon"><i :class="badge.icon"></i></div>
            <div class="badge-info">
              <h4>{{ badge.title }}</h4>
              <p>{{ badge.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Commitments Section -->
      <div class="commit-section">
        <h2 class="section-title">Cam Kết Dịch Vụ</h2>
        <div class="commit-grid">
          <div class="commit-card" v-for="c in commitments" :key="c.title">
            <h3>{{ c.title }}</h3>
            <p>{{ c.description }}</p>
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="contact-section">
        <h2 class="section-title">Thông Tin Liên Hệ</h2>
        <div class="contact-grid">
          <div class="contact-item">
            <h4>{{ contact.address }}</h4>
            <p>{{ contact.addressValue }}</p>
          </div>
          <div class="contact-item">
            <h4>{{ contact.phoneTitle }}</h4>
            <p>{{ contact.phoneValue }}</p>
          </div>
          <div class="contact-item">
            <h4>{{ contact.emailTitle }}</h4>
            <p>{{ contact.emailValue }}</p>
          </div>
          <div class="contact-item">
            <h4>{{ contact.hours }}</h4>
            <p>{{ contact.hoursValue }}</p>
          </div>
        </div>
      </div>

      <!-- Simple Toolkit Section -->
      <div class="toolkit-section">
        <h2 class="section-title">Bộ Công Cụ Của Chúng Tôi</h2>
        
        <div class="toolkit-grid">
          <div
            v-for="(item, index) in toolkit"
            :key="index"
            class="toolkit-card"
          >
            <div class="toolkit-icon">
              <i :class="item.icon" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
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
      currentIndex: 0,
      autoTimer: null,
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
      certifications: [
        { icon: 'fas fa-shield-check', title: 'ISO 9001:2015', subtitle: 'Hệ thống quản lý chất lượng' },
        { icon: 'fas fa-shield-heart', title: 'ISO 27001', subtitle: 'An toàn thông tin doanh nghiệp' },
        { icon: 'fas fa-handshake', title: 'Google Partner', subtitle: 'Đối tác quảng cáo chính thức' },
        { icon: 'fas fa-certificate', title: 'Meta Business Partner', subtitle: 'Đối tác Meta' }
      ],
      commitments: [
        { title: 'SLA 99.9%', description: 'Cam kết thời gian phản hồi và chất lượng triển khai' },
        { title: 'Bàn giao minh bạch', description: 'Dashboard realtime, báo cáo KPI/OKR định kỳ' },
        { title: 'Bảo mật tuyệt đối', description: 'Quy trình bảo mật nhiều lớp, phân quyền chặt chẽ' },
        { title: 'Đồng hành dài hạn', description: 'Đào tạo, chuyển giao, tối ưu liên tục theo mục tiêu' }
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
      ],
      contact: {
        address: "Địa chỉ",
        addressValue: "Số 123, Đường ABC, Quận 1, TP.HCM",
        phoneTitle: "Điện thoại",
        phoneValue: "(028) 123 4567",
        emailTitle: "Email",
        emailValue: "info@example.com",
        hours: "Giờ làm việc",
        hoursValue: "Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 12:00"
      }
    };
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
    goTo(i) { this.currentIndex = i; }
  },
  mounted() {
    this.startAuto();
  },
  beforeUnmount() {
    this.stopAuto();
  }
};
</script>

<style scoped>
/* Magical Social Proof Animations */
.simple-social-proof {
  background: #121212;
  color: #ffffff;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

.simple-social-proof::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.02), transparent);
  animation: sectionSweep 8s ease-in-out infinite;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

/* Social Media Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.magical-social-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: cardSlideIn 1s ease-out backwards;
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
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border-color: #ffffff;
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
  color: #ffffff;
  transition: all 0.6s ease;
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
  color: #ffffff;
  margin-bottom: 0.5rem;
  animation: titleSlideIn 1s ease-out 0.3s backwards;
}

.social-description {
  font-size: 0.95rem;
  color: #999;
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
  color: #ffffff;
  animation: numberGlow 2s ease-in-out infinite;
}

.stats-label {
  font-size: 0.9rem;
  color: #999;
  font-weight: 500;
}

/* Toolkit Section */
.toolkit-section {
  margin-top: 4rem;
}

.toolkit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.toolkit-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.toolkit-card:hover {
  border-color: #555;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.toolkit-icon {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.toolkit-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.toolkit-card p {
  font-size: 0.9rem;
  color: #999;
  line-height: 1.5;
}

/* Trust & Commitments */
.trust-section, .commit-section { margin-top: 4rem; }
.trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.trust-badge { display: flex; gap: 0.75rem; align-items: center; border: 1px solid #333; border-radius: 10px; padding: 0.75rem 1rem; background: #1a1a1a; }
.badge-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid #555; border-radius: 8px; color: #ffffff; }
.badge-info h4 { margin: 0 0 2px; font-size: 1rem; color: #ffffff; }
.badge-info p { margin: 0; color: #999; font-size: 0.9rem; }
.commit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.commit-card { border: 1px solid #333; border-radius: 10px; background: #1a1a1a; padding: 1rem; }
.commit-card h3 { margin: 0 0 6px; color: #ffffff; font-size: 1.05rem; }
.commit-card p { margin: 0; color: #999; }

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
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}
.contact-item:hover {
  background: #2a2a2a;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #555;
}
.contact-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}
.contact-item p {
  font-size: 0.9rem;
  color: #999;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-social-proof {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .social-grid,
  .toolkit-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .social-card,
  .toolkit-card,
  .contact-item {
    padding: 1.5rem;
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

/* Clients Slider */
.clients-slider { overflow: hidden; position: relative; }
.slider-track { display: flex; transition: transform 0.5s ease; }
.client-slide { min-width: 100%; display: flex; align-items: center; gap: 1.5rem; justify-content: center; }
.client-logo img { max-height: 60px; object-fit: contain; filter: grayscale(100%); }
.client-info h3 { margin: 0 0 0.25rem; color: #ffffff; }
.client-meta { margin: 0 0 0.25rem; color: #999; font-weight: 500; }
.client-desc { margin: 0; color: #999; }
.slider-dots { display: flex; gap: 8px; justify-content: center; margin-top: 1rem; }
.dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid #999; background: transparent; }
.dot.active { background: #999; }
</style> 