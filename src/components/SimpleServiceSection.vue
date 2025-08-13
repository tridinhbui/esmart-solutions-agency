<template>
  <section class="simple-process">
    <!-- Elegant Background Elements -->
    <div class="elegant-bg">
      <div class="geometric-shape geo-1" />
      <div class="geometric-shape geo-2" />
      <div class="geometric-shape geo-3" />
      <div class="flowing-lines line-1" />
      <div class="flowing-lines line-2" />
      <div class="elegant-particles particle-1" />
      <div class="elegant-particles particle-2" />
      <div class="elegant-particles particle-3" />
    </div>

    <div class="container">
      <!-- Section Header with Elegant Slide In Animation -->
      <div class="section-header slide-in-element">
        <h2 class="section-title fade-in-element">
          Quy Trình Làm Việc
        </h2>
        <p
          class="section-subtitle fade-in-element"
          style="animation-delay: 0.3s;"
        >
          Phương pháp làm việc chuyên nghiệp của ESmart Solutions
        </p>
      </div>

      <!-- Process Steps with Elegant Staggered Animation -->
      <div class="process-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process-step elegant-card slide-in-up"
          :class="{ 'animate-in': true }"
          :style="{ animationDelay: index * 0.3 + 's' }"
        >
          <div class="step-number elegant-number fade-in-element">
            {{ index + 1 }}
          </div>
          <div class="step-content">
            <div class="step-icon elegant-icon fade-in-element">
              <i :class="step.icon" />
            </div>
            <h3 class="step-title slide-in-left">
              {{ step.title }}
            </h3>
            <p class="step-description slide-in-right">
              {{ step.description }}
            </p>
          </div>
          
          <!-- Elegant Decorative Elements -->
          <div class="card-decoration decoration-1" />
          <div class="card-decoration decoration-2" />
          <div class="card-decoration decoration-3" />
        </div>
      </div>

      <!-- Benefits Section with Elegant Animation -->
      <div class="benefits-section move-in-element">
        <h3 class="benefits-title fade-in-element">
          Lợi Ích Của Quy Trình
        </h3>
        <p
          class="benefits-subtitle fade-in-element"
          style="animation-delay: 0.2s;"
        >
          Những ưu điểm vượt trội khi làm việc với ESmart Solutions
        </p>
        
        <div class="benefits-grid">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="benefit-card elegant-card slide-in-up"
            :style="{ animationDelay: (index * 0.2) + 0.5 + 's' }"
          >
            <div class="benefit-icon elegant-icon fade-in-element">
              <i :class="benefit.icon" />
            </div>
            <h4 class="benefit-title slide-in-left">
              {{ benefit.title }}
            </h4>
            <p class="benefit-description slide-in-right">
              {{ benefit.description }}
            </p>
            
            <!-- Elegant Hover Effects -->
            <div class="card-glow" />
            <div class="card-shine" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleServiceSection",
  data() {
    return {
      steps: [
        {
          title: "Tư Vấn & Phân Tích",
          description: "Tìm hiểu nhu cầu và phân tích yêu cầu của khách hàng",
          icon: "fas fa-search"
        },
        {
          title: "Lập Kế Hoạch",
          description: "Xây dựng chiến lược và lộ trình thực hiện chi tiết",
          icon: "fas fa-clipboard-list"
        },
        {
          title: "Thực Hiện",
          description: "Triển khai dự án theo đúng kế hoạch đã đề ra",
          icon: "fas fa-cogs"
        },
        {
          title: "Kiểm Tra & Tối Ưu",
          description: "Kiểm tra chất lượng và tối ưu hóa hiệu suất",
          icon: "fas fa-check-circle"
        },
        {
          title: "Bàn Giao & Hỗ Trợ",
          description: "Bàn giao sản phẩm và hỗ trợ vận hành dài hạn",
          icon: "fas fa-handshake"
        }
      ],
      benefits: [
        {
          title: "Tiết Kiệm Thời Gian",
          description: "Quy trình tối ưu giúp hoàn thành dự án nhanh chóng",
          icon: "fas fa-clock"
        },
        {
          title: "Chất Lượng Cao",
          description: "Đảm bảo chất lượng sản phẩm đạt tiêu chuẩn quốc tế",
          icon: "fas fa-award"
        },
        {
          title: "Hợp Tác Hiệu Quả",
          description: "Phối hợp chặt chẽ với khách hàng trong suốt dự án",
          icon: "fas fa-handshake"
        },
        {
          title: "Đổi Mới Liên Tục",
          description: "Luôn cập nhật công nghệ và phương pháp mới nhất",
          icon: "fas fa-lightbulb"
        },
        {
          title: "Hỗ Trợ 24/7",
          description: "Đội ngũ hỗ trợ sẵn sàng phục vụ mọi lúc",
          icon: "fas fa-headset"
        },
        {
          title: "Bảo Mật Tuyệt Đối",
          description: "Đảm bảo thông tin và dữ liệu khách hàng an toàn",
          icon: "fas fa-shield-alt"
        }
      ]
    };
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.process-step, .benefit-item').forEach(el => {
        observer.observe(el);
      });
    }
  }
};
</script>

<style scoped>
.simple-process {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
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
  text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3);
}

.section-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Process Steps */
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.process-step.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.step-number {
  width: 60px;
  height: 60px;
  background: #ffffff;
  color: #1e3a8a;
  border: 3px solid #1e3a8a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
}

.step-number:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
}

.step-content {
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.2);
}

.step-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
}

.step-icon {
  font-size: 2rem;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.75rem;
}

.step-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
}

.step-connector {
  position: absolute;
  left: 29px;
  top: 60px;
  width: 3px;
  height: 40px;
  background: linear-gradient(to bottom, #1e3a8a, #3b82f6);
  border-radius: 2px;
}

/* Process Benefits */
.process-benefits {
  text-align: center;
}

.benefits-title {
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 0 2px 15px rgba(255, 255, 255, 0.3);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.benefit-item {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.2);
}

.benefit-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.benefit-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.3);
}

.benefit-icon {
  font-size: 2.5rem;
  color: #1e3a8a;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.benefit-item:hover .benefit-icon {
  transform: scale(1.1);
  color: #3b82f6;
}

.benefit-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.75rem;
}

.benefit-item p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
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

.geometric-shape {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: elegantFloat 12s ease-in-out infinite;
}

.geo-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.geo-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
}

.geo-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation-delay: 8s;
}

.flowing-lines {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: elegantFlow 8s ease-in-out infinite;
}

.line-1 {
  width: 400px;
  top: 30%;
  left: -200px;
  transform: rotate(15deg);
  animation-delay: 0s;
}

.line-2 {
  width: 300px;
  top: 70%;
  right: -150px;
  transform: rotate(-15deg);
  animation-delay: 4s;
}

.elegant-particles {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: elegantParticle 6s ease-in-out infinite;
}

.particle-1 {
  top: 25%;
  left: 30%;
  animation-delay: 0s;
}

.particle-2 {
  top: 55%;
  right: 25%;
  animation-delay: 2s;
}

.particle-3 {
  bottom: 35%;
  left: 60%;
  animation-delay: 4s;
}

/* Elegant Card Design */
.elegant-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
  transition: transform 0.6s ease;
}

.elegant-card:hover::before {
  transform: translateX(0);
}

.elegant-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(30, 58, 138, 0.3);
  border-color: #3b82f6;
}

/* Card Decorative Elements */
.card-decoration {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  filter: blur(15px);
  animation: elegantPulse 4s ease-in-out infinite;
}

.decoration-1 {
  width: 100px;
  height: 100px;
  top: -20px;
  right: -20px;
  animation-delay: 0s;
}

.decoration-2 {
  width: 60px;
  height: 60px;
  bottom: -15px;
  left: -15px;
  animation-delay: 2s;
}

.decoration-3 {
  width: 80px;
  height: 80px;
  top: 50%;
  right: -25px;
  animation-delay: 4s;
}

/* Elegant Number Styling */
.elegant-number {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  border: 3px solid #60a5fa;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
}

.elegant-number::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, #60a5fa, #93c5fd);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.elegant-card:hover .elegant-number::after {
  opacity: 1;
}

/* Elegant Icon Styling */
.elegant-icon {
  font-size: 2.5rem;
  color: #1e3a8a;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
  position: relative;
}

.elegant-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.4s ease;
}

.elegant-card:hover .elegant-icon::before {
  transform: translate(-50%, -50%) scale(1);
}

.elegant-card:hover .elegant-icon {
  transform: scale(1.1) rotate(5deg);
  color: #3b82f6;
}

/* Benefits Section */
.benefits-section {
  margin-top: 5rem;
  text-align: center;
}

.benefits-title {
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

.benefits-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  font-weight: 400;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.benefit-card {
  text-align: center;
  padding: 2.5rem 2rem;
}

.benefit-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.benefit-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  font-weight: 400;
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
  transition: opacity 0.3s ease;
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
  transition: left 0.6s ease;
  pointer-events: none;
}

.elegant-card:hover .card-shine {
  left: 100%;
}

/* Animation Keyframes */
@keyframes elegantFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes elegantFlow {
  0%, 100% {
    transform: translateX(-100%) rotate(15deg);
    opacity: 0;
  }
  50% {
    transform: translateX(100%) rotate(15deg);
    opacity: 1;
  }
}

@keyframes elegantParticle {
  0%, 100% {
    transform: scale(1) translateY(0);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5) translateY(-10px);
    opacity: 0.8;
  }
}

@keyframes elegantPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-process {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .benefits-title {
    font-size: 1.5rem;
  }
  
  .process-step {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
  
  .step-connector {
    display: none;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .step-content,
  .benefit-item {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .step-content,
  .benefit-item {
    padding: 1rem;
  }
}
</style> 