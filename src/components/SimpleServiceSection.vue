<template>
  <section class="simple-process">
    <!-- Sophisticated Glass Background Elements -->
    <div class="glass-bg">
      <div class="glass-orb orb-1" />
      <div class="glass-orb orb-2" />
      <div class="glass-orb orb-3" />
      <div class="glass-line line-1" />
      <div class="glass-line line-2" />
      <div class="glass-particles">
        <div class="particle" v-for="n in 12" :key="n" />
      </div>
    </div>

    <div class="container">
      <!-- Elegant Section Header -->
      <div class="section-header glass-header">
        <h2 class="section-title">
          {{ $t('sections.workProcess') }}
        </h2>
        <p class="section-subtitle">
          {{ $t('sections.workProcessSubtitle') }}
        </p>
        <div class="header-accent" />
      </div>

      <!-- Process Steps with Glass Cards -->
      <div class="process-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process-step glass-step-card"
          :style="{ '--delay': `${index * 0.2}s` }"
        >
          <div class="step-number">
            <span class="number-text">{{ index + 1 }}</span>
            <div class="number-glow" />
          </div>
          
          <div class="step-content">
            <div class="step-icon">
              <i :class="step.icon" />
              <div class="icon-glow" />
            </div>
            
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
          
          <!-- Glass Card Decorations -->
          <div class="card-reflection" />
          <div class="card-shine" />
          <div class="card-border-glow" />
        </div>
      </div>

      <!-- Benefits Section with Glass Cards -->
      <div class="benefits-section">
        <div class="benefits-header glass-header">
          <h3 class="benefits-title">
            {{ $t('sections.processBenefits') }}
          </h3>
          <p class="benefits-subtitle">
            {{ $t('sections.processBenefitsSubtitle') }}
          </p>
          <div class="header-accent" />
        </div>
        
        <div class="benefits-grid">
          <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="benefit-card glass-benefit-card"
            :style="{ '--delay': `${index * 0.15}s` }"
          >
            <div class="benefit-icon">
              <i :class="benefit.icon" />
              <div class="icon-aura" />
            </div>
            
            <h4 class="benefit-title">{{ benefit.title }}</h4>
            <p class="benefit-description">{{ benefit.description }}</p>
            
            <!-- Glass Card Effects -->
            <div class="card-ripple" />
            <div class="card-glow" />
            <div class="card-border" />
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
          description: "Tìm hiểu nhu cầu và phân tích yêu cầu của khách hàng một cách chi tiết và chuyên sâu",
          icon: "fas fa-search"
        },
        {
          title: "Lập Kế Hoạch",
          description: "Xây dựng chiến lược và lộ trình thực hiện chi tiết với timeline cụ thể",
          icon: "fas fa-clipboard-list"
        },
        {
          title: "Thực Hiện",
          description: "Triển khai dự án theo đúng kế hoạch với quy trình kiểm soát chất lượng",
          icon: "fas fa-cogs"
        },
        {
          title: "Kiểm Tra & Tối Ưu",
          description: "Kiểm tra chất lượng toàn diện và tối ưu hóa hiệu suất hệ thống",
          icon: "fas fa-check-circle"
        },
        {
          title: "Bàn Giao & Hỗ Trợ",
          description: "Bàn giao sản phẩm hoàn chỉnh và hỗ trợ vận hành dài hạn",
          icon: "fas fa-handshake"
        }
      ],
      benefits: [
        {
          title: "Tiết Kiệm Thời Gian",
          description: "Quy trình tối ưu giúp hoàn thành dự án nhanh chóng và hiệu quả",
          icon: "fas fa-clock"
        },
        {
          title: "Chất Lượng Cao",
          description: "Đảm bảo chất lượng sản phẩm đạt tiêu chuẩn quốc tế và vượt mong đợi",
          icon: "fas fa-award"
        },
        {
          title: "Hợp Tác Hiệu Quả",
          description: "Phối hợp chặt chẽ với khách hàng trong suốt quá trình thực hiện dự án",
          icon: "fas fa-users"
        },
        {
          title: "Đổi Mới Liên Tục",
          description: "Luôn cập nhật công nghệ và phương pháp mới nhất để tối ưu hóa kết quả",
          icon: "fas fa-lightbulb"
        },
        {
          title: "Hỗ Trợ 24/7",
          description: "Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng phục vụ mọi lúc, mọi nơi",
          icon: "fas fa-headset"
        },
        {
          title: "Bảo Mật Tuyệt Đối",
          description: "Đảm bảo thông tin và dữ liệu khách hàng được bảo vệ an toàn tuyệt đối",
          icon: "fas fa-shield-alt"
        }
      ]
    };
  },
  mounted() {
    this.initGlassAnimations();
  },
  methods: {
    initGlassAnimations() {
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

      // Observe all glass cards
      document.querySelectorAll('.glass-step-card, .glass-benefit-card').forEach(el => {
        observer.observe(el);
      });
    }
  }
};
</script>

<style scoped>
.simple-process {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #0ea5e9 50%, #1e3a8a 75%, #0f172a 100%);
  color: #e2e8f0;
  padding: 6rem 2rem 4rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* Sophisticated Glass Background */
.glass-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.glass-orb {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(30, 58, 138, 0.1) 50%, transparent 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(14, 165, 233, 0.2);
  animation: floatOrb 20s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 7s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 15%;
  animation-delay: 14s;
}

.glass-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.3), transparent);
  animation: flowLine 15s ease-in-out infinite;
}

.line-1 {
  width: 300px;
  top: 30%;
  left: -300px;
  animation-delay: 0s;
}

.line-2 {
  width: 200px;
  bottom: 40%;
  right: -200px;
  animation-delay: 5s;
}

.glass-particles .particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(14, 165, 233, 0.6);
  border-radius: 50%;
  animation: particleFloat 12s ease-in-out infinite;
}

.glass-particles .particle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
.glass-particles .particle:nth-child(2) { top: 40%; left: 80%; animation-delay: 1s; }
.glass-particles .particle:nth-child(3) { top: 60%; left: 10%; animation-delay: 2s; }
.glass-particles .particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; }
.glass-particles .particle:nth-child(5) { top: 30%; left: 60%; animation-delay: 4s; }
.glass-particles .particle:nth-child(6) { top: 70%; left: 30%; animation-delay: 5s; }
.glass-particles .particle:nth-child(7) { top: 10%; left: 40%; animation-delay: 6s; }
.glass-particles .particle:nth-child(8) { top: 50%; left: 90%; animation-delay: 7s; }
.glass-particles .particle:nth-child(9) { top: 90%; left: 20%; animation-delay: 8s; }
.glass-particles .particle:nth-child(10) { top: 15%; left: 85%; animation-delay: 9s; }
.glass-particles .particle:nth-child(11) { top: 75%; left: 50%; animation-delay: 10s; }
.glass-particles .particle:nth-child(12) { top: 25%; left: 75%; animation-delay: 11s; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Elegant Glass Header */
.glass-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #0ea5e9 50%, #1e3a8a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
  opacity: 0;
  transform: translateY(30px);
  animation: slideInDown 0.8s ease-out 0.2s forwards;
}

.section-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0;
  transform: translateY(30px);
  animation: slideInDown 0.8s ease-out 0.4s forwards;
}

.header-accent {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.6), transparent);
  margin: 0 auto;
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0);
  animation: expandWidth 0.8s ease-out 0.6s forwards;
}

/* Process Steps with Glass Cards */
.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.glass-step-card {
  background: rgba(14, 165, 233, 0.05);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  animation: glassCardAppear 0.8s ease-out var(--delay) forwards;
}

.glass-step-card:hover {
  background: rgba(14, 165, 233, 0.1);
  border-color: rgba(14, 165, 233, 0.25);
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(14, 165, 233, 0.2);
}

.glass-step-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(30, 58, 138, 0.1));
  border: 2px solid rgba(14, 165, 233, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  position: relative;
}

.number-text {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  z-index: 2;
  position: relative;
}

.number-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite;
}

.step-content {
  margin-left: 80px;
}

.step-icon {
  font-size: 2.5rem;
  color: #60a5fa;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: iconPulse 3s ease-in-out infinite;
}

.step-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.step-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.6;
  max-width: 500px;
}

/* Glass Card Decorations */
.card-reflection {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transition: left 0.8s ease;
}

.glass-step-card:hover .card-reflection {
  left: 100%;
}

.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.glass-step-card:hover .card-shine {
  opacity: 1;
}

.card-border-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.glass-step-card:hover .card-border-glow {
  opacity: 1;
}

/* Benefits Section */
.benefits-section {
  margin-top: 6rem;
}

.benefits-header {
  margin-bottom: 4rem;
}

.benefits-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #0ea5e9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(14, 165, 233, 0.2);
}

.benefits-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.glass-benefit-card {
  background: rgba(14, 165, 233, 0.06);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(14, 165, 233, 0.12);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  transform: translateY(40px) scale(0.9);
  animation: glassCardAppear 0.8s ease-out var(--delay) forwards;
}

.glass-benefit-card:hover {
  background: rgba(14, 165, 233, 0.12);
  border-color: rgba(14, 165, 233, 0.2);
  transform: translateY(-10px) scale(1.03);
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.25),
    0 10px 40px rgba(14, 165, 233, 0.15);
}

.glass-benefit-card.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.benefit-icon {
  font-size: 3rem;
  color: #60a5fa;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.icon-aura {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: auraFloat 4s ease-in-out infinite;
}

.benefit-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.benefit-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.6;
  max-width: 280px;
  margin: 0 auto;
}

/* Glass Card Effects */
.card-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.glass-benefit-card:hover .card-ripple {
  width: 300px;
  height: 300px;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.glass-benefit-card:hover .card-glow {
  opacity: 1;
}

.card-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.6s ease;
}

.glass-benefit-card:hover .card-border {
  opacity: 1;
}

/* Sophisticated Animations */
@keyframes floatOrb {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes flowLine {
  0% { transform: translateX(0px); opacity: 0; }
  50% { transform: translateX(100vw); opacity: 1; }
  100% { transform: translateX(100vw); opacity: 0; }
}

@keyframes particleFloat {
  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
}

@keyframes slideInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes expandWidth {
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes glassCardAppear {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes iconPulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes auraFloat {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-process {
    padding: 4rem 1.5rem 3rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .benefits-title {
    font-size: 2.2rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .glass-step-card {
    padding: 2rem;
  }
  
  .step-content {
    margin-left: 60px;
  }
  
  .step-number {
    width: 50px;
    height: 50px;
    top: -15px;
    left: 20px;
  }
  
  .number-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .benefits-title {
    font-size: 1.8rem;
  }
  
  .glass-step-card {
    padding: 1.5rem;
  }
  
  .step-content {
    margin-left: 50px;
  }
  
  .step-number {
    width: 45px;
    height: 45px;
    top: -12px;
    left: 15px;
  }
  
  .number-text {
    font-size: 1.3rem;
  }
}
</style> 