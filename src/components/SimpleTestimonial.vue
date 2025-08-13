<template>
  <section class="simple-testimonial">
    <!-- Animated Background Elements -->
    <div class="animated-bg">
      <div class="parallax-layer" data-speed="0.1">
        <div class="floating-quotes quote-1" />
        <div class="floating-quotes quote-2" />
      </div>
      
      <div class="parallax-layer" data-speed="0.3">
        <div class="floating-quotes quote-3" />
        <div class="testimonial-particles particle-1" />
      </div>
      
      <div class="parallax-layer" data-speed="0.5">
        <div class="testimonial-particles particle-2" />
      </div>
    </div>

    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title typing-text" data-text="Khách hàng nói gì">
          Khách hàng nói gì
        </h2>
        <p class="section-subtitle sequential-text" data-delay="0.5">
          Những phản hồi chân thực từ khách hàng đã tin tưởng chúng tôi
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-item sequential-appear"
          :data-delay="1.0 + (index * 0.2)"
        >
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-text sequential-text" :data-delay="1.2 + (index * 0.2)">
              {{ testimonial.content }}
            </p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </div>
              <div class="author-info">
                <h4 class="author-name sequential-text" :data-delay="1.4 + (index * 0.2)">
                  {{ testimonial.name }}
                </h4>
                <p class="author-position sequential-text" :data-delay="1.6 + (index * 0.2)">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
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
      animatedElements: [],
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
  
  async   mounted() {
    // Preload testimonial images
    await this.preloadTestimonialImages();
    // Setup scroll animation
    this.setupScrollAnimation();
    this.setupParallaxEffect();
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
    },
    
    // Setup scroll animation
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
          const rotate = scrolled * 0.002;
          
          element.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${rotate}deg)`;
        });
      });
    }
  }
};
</script>

<style scoped>
/* Magical Testimonial Animations */
.simple-testimonial {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 4rem 2rem 2rem;
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

.floating-quotes {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 50%;
  animation: floatQuotes 10s ease-in-out infinite;
}

.quote-1 {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.quote-2 {
  top: 65%;
  right: 15%;
  animation-delay: 3s;
}

.quote-3 {
  bottom: 25%;
  left: 20%;
  animation-delay: 6s;
}

.testimonial-particles {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(96, 165, 250, 0.6);
  border-radius: 50%;
  animation: particleFloat 8s ease-in-out infinite;
}

.particle-1 {
  top: 30%;
  left: 5%;
  animation-delay: 0s;
}

.particle-2 {
  top: 70%;
  right: 10%;
  animation-delay: 4s;
}

@keyframes floatQuotes {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.testimonial-item {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: testimonialFadeIn 1s ease-out backwards;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.15);
}

.testimonial-item::before {
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

.testimonial-item:hover::before {
  opacity: 1;
}

.testimonial-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(30, 58, 138, 0.25);
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 1);
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #1e3a8a;
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
  color: #93c5fd;
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

.testimonial-item:hover .author-avatar {
  border-color: #e0f2fe;
  transform: scale(1.1);
}

.author-name {
  color: #1e3a8a;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.author-position {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.author-company {
  color: #64748b;
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
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
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
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
}

.section-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  margin-bottom: 3rem;
}

/* Testimonials Grid - Direct on Background */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.testimonial-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.testimonial-content {
  position: relative;
  z-index: 2;
}

.quote-icon {
  font-size: 2.5rem;
  color: #3B82F6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.testimonial-text {
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-style: italic;
  text-align: center;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
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
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.author-position {
  font-size: 0.9rem;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.author-company {
  font-size: 0.8rem;
  color: #bfdbfe;
  font-weight: 400;
}

/* Elegant Hover Effects */
.testimonial-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.testimonial-item:hover .testimonial-glow {
  opacity: 1;
}

.testimonial-shine {
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

.testimonial-item:hover .testimonial-shine {
  left: 100%;
}

/* Services Section */
.services-section {
  text-align: center;
  margin-top: 4rem;
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
  transform: scale(1.1) rotate(5deg);
  color: #93c5fd;
}

.service-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.service-description {
  font-size: 1.1rem;
  color: #bfdbfe;
  line-height: 1.7;
  font-weight: 400;
}

/* Achievements Section */
.achievements-section {
  text-align: center;
  margin-top: 4rem;
}

.achievements-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #e0f2fe;
  margin-bottom: 1rem;
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
  margin: 0 auto 3rem;
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
  background: white; border: 2px solid #1e3a8a;
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
  background: white; border: 2px solid #1e3a8a;
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

/* Animate when visible */
.slide-in-element.animate-in,
.fade-in-element.animate-in,
.slide-in-up.animate-in,
.slide-in-left.animate-in,
.slide-in-right.animate-in {
  opacity: 1;
  transform: translate(0, 0) scale(1);
  filter: blur(0px);
}

/* Enhanced hover effects */
.slide-in-element.animate-in:hover,
.fade-in-element.animate-in:hover,
.slide-in-up.animate-in:hover,
.slide-in-left.animate-in:hover,
.slide-in-right.animate-in:hover {
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