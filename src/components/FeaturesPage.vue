<template>
  <section class="features">
    <!-- Revolutionary Quantum Background System -->
    <div class="achievements-quantum-background">
      <div class="quantum-orb orb-1" />
      <div class="quantum-orb orb-2" />
      <div class="quantum-orb orb-3" />
      <div class="quantum-orb orb-4" />
      <div class="energy-grid">
        <div
          v-for="i in 8"
          :key="'line-'+i"
          class="grid-line"
        />
      </div>
      <div class="floating-achievements-particles">
        <div
          v-for="i in 10"
          :key="'particle-'+i"
          class="quantum-particle"
        />
      </div>
    </div>
    
    <!-- Revolutionary Title Section -->
    <div class="achievements-title-zone">
      <div class="title-quantum-frame">
        <div class="quantum-badge">
          <div class="badge-energy-core" />
          <i class="fas fa-trophy" />
          <span>Thành Tựu Nổi Bật</span>
          <div class="badge-quantum-trail" />
        </div>
        <h2 class="quantum-achievements-title">
          Thành Tựu Nổi Bật
          <div class="title-energy-beam" />
          <div class="title-matrix-scan" />
        </h2>
        <div class="title-quantum-glow" />
      </div>
    </div>

    <!-- Revolutionary Achievements Grid -->
    <div class="quantum-achievements-grid">
      <div
        v-for="(item, index) in achievements"
        :key="index"
        class="quantum-achievement-card"
        :data-achievement="index"
      >
        <div class="achievement-quantum-shell">
          <div class="achievement-energy-border" />
          
          <!-- Quantum Icon Section -->
          <div class="achievement-icon-portal">
            <div class="icon-quantum-core">
              <i :class="item.icon" />
              <div class="icon-energy-ring ring-1" />
              <div class="icon-energy-ring ring-2" />
              <div class="icon-energy-ring ring-3" />
            </div>
            <div class="icon-plasma-glow" />
          </div>
          
          <!-- Revolutionary Number Display -->
          <div class="achievement-number-zone">
            <div class="number-quantum-display">
              <span class="quantum-number">{{ item.currentValue }}</span>
              <div class="number-energy-particles">
                <div
                  v-for="i in 6"
                  :key="'num-particle-'+i"
                  class="energy-particle"
                />
              </div>
            </div>
            <div class="number-hologram-effect" />
          </div>
          
          <!-- Quantum Content -->
          <div class="achievement-quantum-content">
            <h3 class="achievement-title">
              {{ achievements[index].title }}
              <div class="title-energy-underline" />
            </h3>
            <p class="achievement-description">
              {{ achievements[index].description }}
            </p>
          </div>
          
          <div class="achievement-quantum-field" />
        </div>
      </div>
    </div>

    <!-- Revolutionary Features Portal -->
    <div class="features-quantum-portal">
      <div class="portal-title-section">
        <div class="portal-badge">
          <i class="fas fa-rocket" />
          <span>Dịch Vụ Chuyên Nghiệp</span>
        </div>
        <h3 class="portal-title">
          Dịch Vụ Chuyên Nghiệp
          <div class="portal-title-glow" />
        </h3>
      </div>
      
      <div class="quantum-features-container">
        <div
          v-for="(feature, index) in quantumFeatures"
          :key="'feature-'+index"
          class="quantum-feature-card"
        >
          <div class="feature-quantum-frame">
            <div class="feature-icon-core">
              <i :class="feature.icon" />
              <div class="feature-icon-glow" />
            </div>
            <h4 class="feature-quantum-title">
              {{ feature.title }}
            </h4>
            <p class="feature-quantum-description">
              {{ feature.description }}
            </p>
            <div class="feature-energy-trail" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturesPage",
  data() {
    return {
      achievements: [
        {
          icon: "fas fa-users",
          value: 20,
          currentValue: 0,
          title: "Đội Ngũ Chuyên Nghiệp",
          description: "Chuyên gia giàu kinh nghiệm trong lĩnh vực"
        },
        {
          icon: "fas fa-shopping-cart",
          value: 5000,
          currentValue: 0,
          title: "Dự Án Thành Công",
          description: "Dự án đã hoàn thành với chất lượng cao"
        },
        {
          icon: "fas fa-globe",
          value: 10,
          currentValue: 0,
          title: "Thị Trường Quốc Tế",
          description: "Mở rộng ra thị trường toàn cầu"
        },
        {
          icon: "fas fa-bullhorn",
          value: 1000000,
          currentValue: 0,
          title: "Lượt Tiếp Cận",
          description: "Người dùng được tiếp cận qua các kênh"
        },
      ],
      quantumFeatures: [
        {
          icon: "fas fa-users-cog",
          title: "Đội Ngũ Chuyên Nghiệp",
          description: "Các ấn phẩm truyền thông của ESmart Solutions đã đạt được số lượng người tiếp cận lên tới 1,000,000+."
        },
        {
          icon: "fas fa-chart-line",
          title: "Đầu Tư Chiến Lược",
          description: "Esmart Solution đã gây quỹ tài trợ và nhận được sự hợp tác chiến lược từ tổ chức Macalester Entrepreneurship."
        },
        {
          icon: "fas fa-rocket",
          title: "Tăng Trưởng Vượt Trội",
          description: "Tăng 300% lượt truy cập và chuyển đổi khách hàng hiệu quả."
        },
        {
          icon: "fas fa-headset",
          title: "Hỗ Trợ 24/7",
          description: "Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng phục vụ."
        }
      ]
    };
  },
  mounted() {
    this.achievements.forEach((achievement, index) => {
      this.animateValue(index, achievement.value, 3000);
    });
  },
  methods: {
    animateValue(index, end, duration) {
      let start = this.achievements[index].currentValue;
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
        current += increment;
        this.achievements[index].currentValue = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    },
  },
};
</script>

<style scoped>
/* Revolutionary CSS Variables */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --quantum-blue: rgba(59, 130, 246, 1);
  --quantum-purple: rgba(139, 92, 246, 1);
  --quantum-green: rgba(34, 197, 94, 1);
  --gradient-magical: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(217, 119, 6, 0.9) 100%);
  --gradient-quantum: linear-gradient(135deg, var(--quantum-blue) 0%, var(--quantum-purple) 50%, var(--primary-color) 100%);
  --gradient-cyber: linear-gradient(135deg, var(--quantum-green) 0%, var(--quantum-blue) 100%);
}

/* Revolutionary Achievements Section */
.features {
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.15) 0%, transparent 60%),
    radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 60%),
    linear-gradient(135deg, rgba(28, 28, 76, 1) 0%, rgba(15, 15, 30, 0.95) 100%);
  color: white;
  padding: 120px 2rem;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Revolutionary Quantum Background */
.achievements-quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-magical);
  filter: blur(50px);
  animation: quantumFloat 12s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: 10%;
  animation-delay: 4s;
  background: var(--gradient-quantum);
}

.orb-3 {
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 40%;
  animation-delay: 8s;
  background: var(--gradient-cyber);
}

.orb-4 {
  width: 180px;
  height: 180px;
  top: 30%;
  right: 30%;
  animation-delay: 6s;
}

.energy-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.3) 50%, transparent 100%);
  height: 1px;
  width: 100%;
  animation: energyPulse 4s ease-in-out infinite;
}

.grid-line:nth-child(1) { top: 15%; animation-delay: 0s; }
.grid-line:nth-child(2) { top: 25%; animation-delay: 0.5s; }
.grid-line:nth-child(3) { top: 45%; animation-delay: 1s; }
.grid-line:nth-child(4) { top: 65%; animation-delay: 1.5s; }
.grid-line:nth-child(5) { top: 75%; animation-delay: 2s; }
.grid-line:nth-child(6) { top: 85%; animation-delay: 2.5s; }
.grid-line:nth-child(7) { 
  top: 0; 
  left: 20%; 
  width: 1px; 
  height: 100%; 
  background: linear-gradient(0deg, transparent 0%, rgba(245, 158, 11, 0.3) 50%, transparent 100%);
  animation-delay: 3s; 
}
.grid-line:nth-child(8) { 
  top: 0; 
  right: 20%; 
  width: 1px; 
  height: 100%; 
  background: linear-gradient(0deg, transparent 0%, rgba(217, 119, 6, 0.3) 50%, transparent 100%);
  animation-delay: 3.5s; 
}

.floating-achievements-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: particleFloat 8s linear infinite;
}

.quantum-particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.quantum-particle:nth-child(2) { top: 40%; left: 80%; animation-delay: 1s; }
.quantum-particle:nth-child(3) { bottom: 30%; right: 15%; animation-delay: 2s; }
.quantum-particle:nth-child(4) { top: 70%; left: 60%; animation-delay: 3s; }
.quantum-particle:nth-child(5) { top: 15%; right: 40%; animation-delay: 4s; }
.quantum-particle:nth-child(6) { bottom: 20%; left: 30%; animation-delay: 5s; }
.quantum-particle:nth-child(7) { top: 50%; right: 70%; animation-delay: 6s; }
.quantum-particle:nth-child(8) { bottom: 60%; left: 70%; animation-delay: 7s; }
.quantum-particle:nth-child(9) { top: 80%; right: 50%; animation-delay: 1.5s; }
.quantum-particle:nth-child(10) { bottom: 10%; right: 20%; animation-delay: 2.5s; }

/* Revolutionary Title Zone */
.achievements-title-zone {
  position: relative;
  z-index: 10;
  text-align: center;
  margin-bottom: 6rem;
}

.title-quantum-frame {
  position: relative;
  display: inline-block;
}

.quantum-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.badge-energy-core {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: energyCorePulse 2s ease-in-out infinite;
}

.badge-quantum-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: badgeShimmer 3s infinite;
}

.quantum-achievements-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;
  text-shadow: 0 0 50px rgba(255, 107, 53, 0.5);
}

.title-energy-beam {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 2px;
  animation: beamGlow 3s ease-in-out infinite;
}

.title-matrix-scan {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 30%, rgba(139, 92, 246, 0.3) 70%, transparent 100%);
  animation: matrixScan 4s infinite;
}

.title-quantum-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: var(--gradient-quantum);
  filter: blur(30px);
  opacity: 0.3;
  z-index: -1;
  animation: titleGlowPulse 4s ease-in-out infinite;
}

/* Revolutionary Achievements Grid */
.quantum-achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto 8rem;
  position: relative;
  z-index: 5;
}

.quantum-achievement-card {
  position: relative;
  animation: cardReveal 1s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
}

.quantum-achievement-card:nth-child(1) { animation-delay: 0.2s; }
.quantum-achievement-card:nth-child(2) { animation-delay: 0.4s; }
.quantum-achievement-card:nth-child(3) { animation-delay: 0.6s; }
.quantum-achievement-card:nth-child(4) { animation-delay: 0.8s; }

.achievement-quantum-shell {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.achievement-quantum-shell:hover {
  transform: translateY(-15px) scale(1.05);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.3),
    0 0 50px rgba(255, 107, 53, 0.3);
  border-color: rgba(255, 107, 53, 0.5);
}

.achievement-energy-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--tertiary-color), var(--primary-color));
  border-radius: 24px;
  z-index: -1;
  animation: borderRotate 6s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.achievement-quantum-shell:hover .achievement-energy-border {
  opacity: 1;
}

.achievement-icon-portal {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.icon-quantum-core {
  position: relative;
  width: 100px;
  height: 100px;
  background: var(--gradient-magical);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  z-index: 3;
  animation: iconFloat 4s ease-in-out infinite;
}

.icon-energy-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: ringPulse 3s ease-in-out infinite;
}

.ring-1 {
  width: 120px;
  height: 120px;
  border-color: rgba(255, 107, 53, 0.6);
  animation-delay: 0s;
}

.ring-2 {
  width: 140px;
  height: 140px;
  border-color: rgba(245, 158, 11, 0.4);
  animation-delay: 0.5s;
}

.ring-3 {
  width: 160px;
  height: 160px;
  border-color: rgba(217, 119, 6, 0.3);
  animation-delay: 1s;
}

.icon-plasma-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: var(--gradient-quantum);
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.4;
  animation: plasmaGlow 4s ease-in-out infinite;
  z-index: 1;
}

.achievement-number-zone {
  position: relative;
  margin-bottom: 2rem;
}

.number-quantum-display {
  position: relative;
  display: inline-block;
}

.quantum-number {
  font-size: 4rem;
  font-weight: 900;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  animation: numberGlow 3s ease-in-out infinite;
}

.number-energy-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.energy-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: particleOrbit 4s linear infinite;
}

.energy-particle:nth-child(1) { animation-delay: 0s; }
.energy-particle:nth-child(2) { animation-delay: 0.6s; }
.energy-particle:nth-child(3) { animation-delay: 1.2s; }
.energy-particle:nth-child(4) { animation-delay: 1.8s; }
.energy-particle:nth-child(5) { animation-delay: 2.4s; }
.energy-particle:nth-child(6) { animation-delay: 3s; }

.number-hologram-effect {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-cyber);
  filter: blur(20px);
  opacity: 0;
  animation: hologramFlicker 5s ease-in-out infinite;
}

.achievement-quantum-content {
  position: relative;
  z-index: 5;
}

.achievement-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  position: relative;
}

.title-energy-underline {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: var(--gradient-magical);
  border-radius: 2px;
  animation: underlineGlow 3s ease-in-out infinite;
}

.achievement-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

.achievement-quantum-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.achievement-quantum-shell:hover .achievement-quantum-field {
  opacity: 1;
}

/* Revolutionary Features Portal */
.features-quantum-portal {
  position: relative;
  z-index: 5;
  text-align: center;
}

.portal-title-section {
  margin-bottom: 4rem;
}

.portal-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 50px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  color: var(--quantum-blue);
  font-weight: 600;
}

.portal-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  background: var(--gradient-quantum);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;
}

.portal-title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: var(--gradient-quantum);
  filter: blur(25px);
  opacity: 0.4;
  z-index: -1;
  animation: portalGlow 4s ease-in-out infinite;
}

.quantum-features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.quantum-feature-card {
  position: relative;
}

.feature-quantum-frame {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
}

.feature-quantum-frame:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.feature-icon-core {
  position: relative;
  width: 80px;
  height: 80px;
  background: var(--gradient-cyber);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: white;
  animation: featureIconFloat 3s ease-in-out infinite;
}

.feature-icon-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-cyber);
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.6;
  z-index: -1;
  animation: featureGlow 3s ease-in-out infinite;
}

.feature-quantum-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.feature-quantum-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.feature-energy-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  animation: energyTrail 4s infinite;
}

/* Revolutionary Keyframe Animations */
@keyframes quantumFloat {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1); 
    opacity: 0.6; 
  }
  33% { 
    transform: translateY(-40px) translateX(20px) scale(1.1); 
    opacity: 0.8; 
  }
  66% { 
    transform: translateY(30px) translateX(-15px) scale(0.9); 
    opacity: 0.7; 
  }
}

@keyframes energyPulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: scaleX(1); 
  }
  50% { 
    opacity: 0.8; 
    transform: scaleX(1.05); 
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.5; 
  }
  25% { 
    transform: translateY(-30px) translateX(15px); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-20px) translateX(-10px); 
    opacity: 0.7; 
  }
  75% { 
    transform: translateY(-40px) translateX(20px); 
    opacity: 0.9; 
  }
  100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.5; 
  }
}

@keyframes energyCorePulse {
  0%, 100% { 
    transform: translateY(-50%) scale(1); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-50%) scale(1.2); 
    opacity: 0.8; 
  }
}

@keyframes badgeShimmer {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes beamGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5); 
    transform: translateX(-50%) scaleX(1); 
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 107, 53, 0.8); 
    transform: translateX(-50%) scaleX(1.1); 
  }
}

@keyframes matrixScan {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes titleGlowPulse {
  0%, 100% { 
    opacity: 0.3; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: translate(-50%, -50%) scale(1.1); 
  }
}

@keyframes cardReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes borderRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes iconFloat {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
}

@keyframes ringPulse {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1); 
    opacity: 0.6; 
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.1); 
    opacity: 1; 
  }
}

@keyframes plasmaGlow {
  0%, 100% { 
    opacity: 0.4; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.1); 
  }
}

@keyframes numberGlow {
  0%, 100% { 
    text-shadow: 0 0 30px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    text-shadow: 0 0 50px rgba(255, 107, 53, 0.8); 
  }
}

@keyframes particleOrbit {
  0% { 
    transform: translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg); 
  }
  100% { 
    transform: translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg); 
  }
}

@keyframes hologramFlicker {
  0%, 90%, 100% { opacity: 0; }
  5%, 15% { opacity: 0.3; }
}

@keyframes underlineGlow {
  0%, 100% { 
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.8); 
  }
}

@keyframes portalGlow {
  0%, 100% { 
    opacity: 0.4; 
    transform: translate(-50%, -50%) scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: translate(-50%, -50%) scale(1.05); 
  }
}

@keyframes featureIconFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(5deg); }
}

@keyframes featureGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}

@keyframes energyTrail {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

/* Revolutionary Responsive Design */
@media (max-width: 1200px) {
  .quantum-achievements-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem;
  }
  
  .quantum-achievements-title {
    font-size: 4rem;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 80px 1.5rem;
  }
  
  .quantum-achievements-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .quantum-achievements-title {
    font-size: 3rem;
  }
  
  .achievement-quantum-shell {
    padding: 2rem 1.5rem;
  }
  
  .icon-quantum-core {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .quantum-number {
    font-size: 3rem;
  }
  
  .quantum-features-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .feature-quantum-frame {
    padding: 2rem 1.5rem;
  }
  
  .orb-2, .orb-3, .orb-4 {
    display: none;
  }
}

@media (max-width: 480px) {
  .features {
    padding: 60px 1rem;
  }
  
  .quantum-achievements-title {
    font-size: 2.5rem;
  }
  
  .achievement-quantum-shell {
    padding: 1.5rem 1rem;
  }
  
  .icon-quantum-core {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }
  
  .quantum-number {
    font-size: 2.5rem;
  }
  
  .achievement-title {
    font-size: 1.3rem;
  }
  
  .feature-icon-core {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}

/* Animation states */
.animate-fadeIn {
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .achievement-quantum-shell {
    border: 2px solid;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .quantum-badge {
    border: 2px solid;
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
