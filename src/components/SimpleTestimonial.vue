<template>
  <section class="simple-testimonials">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Khách Hàng Nói Gì</h2>
        <p class="section-subtitle">Những phản hồi tích cực từ khách hàng của chúng tôi</p>
      </div>

      <!-- Magical Testimonials Grid -->
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="magical-testimonial-card magical-3d-hover"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <div class="testimonial-content shimmer">
            {{ testimonial.content }}
          </div>
          
          <div class="testimonial-author slide-in-right">
            <img
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="author-avatar magical-glow"
              @error="handleImageError"
            >
            <div class="author-info">
              <h4 class="magical-text">{{ testimonial.name }}</h4>
              <p class="position">{{ testimonial.position }}</p>
              <p class="company">{{ testimonial.company }}</p>
            </div>
          </div>
        </div>
      </div>



      <!-- Contact Information Section -->
      <div class="contact-section">
        <h3 class="section-title">Thông Tin Liên Hệ</h3>
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
    </div>
  </section>
</template>

<script>
import { ImageMixin } from '@/utils/imageUtils';

export default {
  name: "SimpleTestimonial",
  mixins: [ImageMixin],
  data() {
    return {
      testimonials: [
        {
          content: "ESmart Solutions đã giúp chúng tôi tăng 300% lượt truy cập website và 150% doanh thu online. Đội ngũ rất chuyên nghiệp!",
          name: "Nguyễn Văn A",
          position: "CEO",
          company: "ABC Company",
          rating: 5,
          avatar: require("@/assets/testimonial1.jpg")
        },
        {
          content: "Dịch vụ SEO của ESmart thực sự hiệu quả. Website của chúng tôi đã lên TOP 3 Google chỉ sau 3 tháng.",
          name: "Trần Thị B",
          position: "Marketing Manager",
          company: "XYZ Corp",
          rating: 5,
          avatar: require("@/assets/testimonial2.jpg")
        },
        {
          content: "Thiết kế website đẹp, hiện đại và tối ưu trải nghiệm người dùng. Rất hài lòng với kết quả!",
          name: "Lê Văn C",
          position: "Founder",
          company: "StartupC",
          rating: 5,
          avatar: require("@/assets/testimonial3.jpg")
        },
        {
          content: "Chiến dịch marketing của ESmart đã giúp thương hiệu chúng tôi được biết đến rộng rãi hơn.",
          name: "Phạm Thị D",
          position: "Brand Manager",
          company: "Brand D",
          rating: 5,
          avatar: require("@/assets/testimonial4.jpg")
        },
        {
          content: "Hệ thống CRM tùy chỉnh của ESmart đã tối ưu hóa quy trình bán hàng của chúng tôi, tăng 200% hiệu quả.",
          name: "Hoàng Minh E",
          position: "Sales Director",
          company: "TechViet",
          rating: 5,
          avatar: require("@/assets/testimonial1.jpg")
        },
        {
          content: "Dự án automation marketing đã giúp chúng tôi tiết kiệm 60% thời gian và tăng 180% lead chất lượng.",
          name: "Vũ Thị F",
          position: "Marketing Head",
          company: "InnovateCorp",
          rating: 5,
          avatar: require("@/assets/testimonial2.jpg")
        }
      ],

      contact: {
        address: "Địa chỉ",
        addressValue: "Tầng 15, Tòa nhà Bitexco Financial, 2 Hải Triều, Quận 1, TP.HCM",
        phoneTitle: "Điện thoại",
        phoneValue: "(028) 3821 8888",
        emailTitle: "Email",
        emailValue: "contact@esmart-solutions.vn",
        hours: "Giờ làm việc",
        hoursValue: "Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 12:00"
      }
    };
  },
  methods: {
    getDefaultAvatar() {
      return this.getFallbackImage('testimonial');
    },
    getDefaultLogo() {
      return this.getFallbackImage('logo');
    },
    handleImageError(event) {
      if (event.target.closest('.author-avatar')) {
        this.handleImageError(event, 'testimonial');
      } else {
        this.handleImageError(event, 'logo');
      }
    },
    
    // Preload testimonial images
    async preloadTestimonialImages() {
      const imageUrls = this.testimonials.map(t => t.avatar);
      await this.preloadImages(imageUrls);
    }
  },
  
  async mounted() {
    // Preload testimonial images
    await this.preloadTestimonialImages();
  }
};
</script>

<style scoped>
/* Magical Testimonial Animations */
.simple-testimonials {
  background: #121212;
  color: #ffffff;
  padding: 4rem 2rem;
  position: relative;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.magical-testimonial-card {
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: testimonialFadeIn 1s ease-out backwards;
}

.magical-testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent, rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.magical-testimonial-card:hover::before {
  opacity: 1;
}

.magical-testimonial-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border-color: #555;
}

.testimonial-content {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e0e0e0;
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.testimonial-content::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: -20px;
  font-size: 4rem;
  color: #e5e5e5;
  font-family: serif;
  /* Removed infinite animation for stability */
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: authorSlideIn 1s ease-out 0.6s backwards;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #e5e5e5;
  transition: all 0.4s ease;
  /* Removed infinite animation for stability */
}

.magical-testimonial-card:hover .author-avatar {
  border-color: black;
  transform: scale(1.1);
}

.author-info h4 {
  color: #ffffff;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.position {
  color: #b0b0b0;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.company {
  color: #888;
  font-size: 0.85rem;
  margin: 0;
}



/* Animation Keyframes */
@keyframes testimonialFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes contentSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes quoteFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes authorSlideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes avatarPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes clientFadeIn {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes logoRotate {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

.simple-testimonials {
  background: #121212;
  color: #ffffff;
  padding: 4rem 2rem;
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
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  text-align: center;
  margin-bottom: 3rem;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.testimonial-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.2s ease;
}

.testimonial-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.quote-icon {
  font-size: 1.5rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.25rem;
}

.author-position {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 0.25rem;
}

.author-company {
  font-size: 0.8rem;
  color: #555;
}

.testimonial-rating {
  text-align: center;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.stars i {
  color: #ddd;
  font-size: 0.9rem;
}

.stars i.filled {
  color: #ffc107;
}

/* Clients Section */
.clients-section {
  text-align: center;
}



.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.client-logo {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  height: 80px;
}

.client-logo:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.client-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  transition: filter 0.2s ease;
}

.client-logo:hover img {
  filter: grayscale(0%);
}

/* Contact Section */
.contact-section {
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: #1a1a1a;
  border-radius: 20px;
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.contact-item p {
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
      .contact-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
}
</style> 