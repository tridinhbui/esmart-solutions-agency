<template>
  <section class="process">
    <!-- Revolutionary Quantum Background System -->
    <div class="process-quantum-background">
      <div class="quantum-orb orb-1" />
      <div class="quantum-orb orb-2" />
      <div class="quantum-orb orb-3" />
      <div class="quantum-orb orb-4" />
      <div class="energy-grid">
        <div
          v-for="i in 6"
          :key="'grid-'+i"
          class="grid-line"
        />
      </div>
      <div class="floating-particles">
        <div
          v-for="i in 8"
          :key="'particle-'+i"
          class="quantum-particle"
        />
      </div>
    </div>
    
    <!-- Revolutionary Title Section -->
    <div class="process-title-section">
      <div class="title-quantum-container">
        <div class="title-hologram-effect">
          <h2 class="quantum-process-title">
            Quy Trình Làm Việc Của Chúng Tôi
            <div class="title-energy-trail" />
          </h2>
          <div class="title-quantum-glow" />
        </div>
        <div class="title-matrix-lines">
          <div
            v-for="i in 3"
            :key="'line-'+i"
            class="matrix-line"
          />
        </div>
      </div>
    </div>
    
    <!-- Revolutionary Process Grid -->
    <div class="quantum-process-grid">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="quantum-process-card"
        :class="`process-card-${index + 1}`"
        @click="openModal(step)"
      >
        <!-- Card Quantum Background -->
        <div class="card-quantum-shell">
          <div class="quantum-border-energy" />
          <div class="card-holographic-layer" />
          <div class="card-plasma-field" />
        </div>
        
        <!-- Process Number -->
        <div class="process-quantum-number">
          <div class="number-energy-core">
            {{ index + 1 }}
          </div>
          <div class="number-quantum-ring" />
          <div class="number-plasma-glow" />
        </div>
        
        <!-- Content -->
        <div class="quantum-content">
          <h3 class="process-quantum-title">
            {{ step.title }}
            <div class="title-energy-underline" />
          </h3>
          <ul class="quantum-substeps">
            <li 
              v-for="(subStep, subIndex) in step.subsSteps" 
              :key="subIndex"
              class="quantum-substep"
              :style="{ animationDelay: `${subIndex * 0.1}s` }"
            >
              <div class="substep-quantum-marker" />
              <span class="substep-text">{{ subStep }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Interactive Elements -->
        <div class="card-interactive-zone">
          <div class="interaction-ripple" />
          <div class="quantum-hover-effect" />
        </div>
        
        <!-- Energy Connection Lines -->
        <div
          v-if="index < steps.length - 1"
          class="energy-connection"
        >
          <div class="connection-beam" />
          <div class="connection-particles">
            <div
              v-for="i in 3"
              :key="'beam-'+i"
              class="beam-particle"
            />
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="isModalOpen"
      max-width="600px"
    >
      <v-card>
        <v-card-title class="headline">
          {{ selectedStep.title }}
        </v-card-title>
        <v-card-text>
          <ul>
            <li
              v-for="(subStep, subIndex) in selectedStep?.subsSteps || []"
              :key="subIndex"
            >
              {{ subStep }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="isModalOpen = false"
          >
            Đóng
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: "ProcessInt",
  data() {
    return {
      isModalOpen: false,
      selectedStep: {
        title: "",
      subsSteps: []
      },
      steps: [
        {
          title: "Tư Vấn & Phân Tích",
          subsSteps: [
            "Khảo sát nhu cầu khách hàng",
            "Phân tích thị trường mục tiêu", 
            "Đánh giá đối thủ cạnh tranh"
          ],
        },
        {
          title: "Lập Kế Hoạch Chiến Lược",
          subsSteps: ["Xây dựng roadmap chi tiết"],
        },
        {
          title: "Triển Khai Thực Hiện",
          subsSteps: [
            "Phát triển sản phẩm/dịch vụ",
            "Kiểm tra chất lượng",
            "Tối ưu hóa hiệu suất"
          ],
        },
        {
          title: "Bàn Giao & Hỗ Trợ",
          subsSteps: ["Đào tạo sử dụng", "Hỗ trợ kỹ thuật 24/7"],
        },
      ],
    };
  },
  methods: {
    openModal(step) {
      this.selectedStep = step;
      this.isModalOpen = true;
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

.process {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Revolutionary Quantum Background */
.process-quantum-background {
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
  filter: blur(40px);
  animation: quantumFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  top: 70%;
  right: 15%;
  animation-delay: 2s;
  background: var(--gradient-quantum);
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
  background: var(--gradient-cyber);
}

.orb-4 {
  width: 250px;
  height: 250px;
  top: 30%;
  right: 40%;
  animation-delay: 6s;
}

.energy-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent 0%, var(--quantum-blue) 50%, transparent 100%);
  height: 1px;
  width: 100%;
  opacity: 0.3;
  animation: energyPulse 4s ease-in-out infinite;
}

.grid-line:nth-child(1) { top: 20%; animation-delay: 0s; }
.grid-line:nth-child(2) { top: 40%; animation-delay: 0.5s; }
.grid-line:nth-child(3) { top: 60%; animation-delay: 1s; }
.grid-line:nth-child(4) { top: 80%; animation-delay: 1.5s; }
.grid-line:nth-child(5) { top: 30%; animation-delay: 2s; }
.grid-line:nth-child(6) { top: 70%; animation-delay: 2.5s; }

.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: particleFloat 6s linear infinite;
}

.quantum-particle:nth-child(1) { top: 10%; left: 20%; animation-delay: 0s; }
.quantum-particle:nth-child(2) { top: 30%; right: 25%; animation-delay: 1s; }
.quantum-particle:nth-child(3) { bottom: 40%; left: 60%; animation-delay: 2s; }
.quantum-particle:nth-child(4) { top: 60%; right: 40%; animation-delay: 3s; }
.quantum-particle:nth-child(5) { bottom: 20%; right: 20%; animation-delay: 4s; }
.quantum-particle:nth-child(6) { top: 80%; left: 40%; animation-delay: 5s; }
.quantum-particle:nth-child(7) { top: 50%; left: 10%; animation-delay: 6s; }
.quantum-particle:nth-child(8) { bottom: 60%; right: 60%; animation-delay: 7s; }

/* Revolutionary Title Section */
.process-title-section {
  position: relative;
  z-index: 10;
  margin-bottom: 4rem;
}

.title-quantum-container {
  position: relative;
  display: inline-block;
}

.title-hologram-effect {
  position: relative;
}

.quantum-process-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 3;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  animation: titleGlow 3s ease-in-out infinite;
}

.title-energy-trail {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: var(--gradient-magical);
  border-radius: 3px;
  animation: energyTrail 2s ease-in-out infinite;
}

.title-quantum-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: var(--gradient-quantum);
  filter: blur(30px);
  opacity: 0.4;
  z-index: 1;
  animation: glowPulse 4s ease-in-out infinite;
}

.title-matrix-lines {
  position: absolute;
  top: -30px;
  left: -50px;
  right: -50px;
  bottom: -30px;
  z-index: 2;
}

.matrix-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--quantum-blue) 50%, transparent 100%);
  opacity: 0.6;
  animation: matrixScan 3s linear infinite;
}

.matrix-line:nth-child(1) {
  top: 0;
  width: 100%;
  animation-delay: 0s;
}

.matrix-line:nth-child(2) {
  top: 50%;
  width: 100%;
  animation-delay: 1s;
}

.matrix-line:nth-child(3) {
  bottom: 0;
  width: 100%;
  animation-delay: 2s;
}

/* Revolutionary Process Grid */
.quantum-process-grid {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  width: 100%;
}

/* Revolutionary Process Cards */
.quantum-process-card {
  position: relative;
  background: rgba(15, 15, 35, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  animation: cardReveal 1s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
}

.quantum-process-card.process-card-1 { animation-delay: 0.2s; }
.quantum-process-card.process-card-2 { animation-delay: 0.4s; }
.quantum-process-card.process-card-3 { animation-delay: 0.6s; }
.quantum-process-card.process-card-4 { animation-delay: 0.8s; }

.card-quantum-shell {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
}

.quantum-border-energy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 24px;
  background: linear-gradient(45deg, var(--primary-color), var(--quantum-blue), var(--quantum-purple), var(--primary-color)) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  animation: borderFlow 4s linear infinite;
}

.card-holographic-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(255, 107, 53, 0.1) 0%, 
    rgba(59, 130, 246, 0.05) 25%, 
    rgba(139, 92, 246, 0.1) 50%, 
    rgba(34, 197, 94, 0.05) 75%, 
    rgba(255, 107, 53, 0.1) 100%);
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card-plasma-field {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg at 50% 50%, 
    transparent 0deg, 
    var(--primary-color) 60deg, 
    transparent 120deg, 
    var(--quantum-blue) 180deg, 
    transparent 240deg, 
    var(--quantum-purple) 300deg, 
    transparent 360deg);
  filter: blur(60px);
  opacity: 0;
  animation: plasmaRotate 8s linear infinite;
  transition: opacity 0.5s ease;
}

/* Process Number */
.process-quantum-number {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.number-energy-core {
  position: relative;
  width: 60px;
  height: 60px;
  background: var(--gradient-magical);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  z-index: 3;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  animation: numberPulse 3s ease-in-out infinite;
}

.number-quantum-ring {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 80px;
  height: 80px;
  border: 2px solid var(--quantum-blue);
  border-radius: 50%;
  animation: ringRotate 4s linear infinite;
}

.number-plasma-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 90px;
  height: 90px;
  background: var(--gradient-quantum);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.6;
  z-index: 1;
  animation: plasmaGlow 2s ease-in-out infinite;
}

/* Quantum Content */
.quantum-content {
  position: relative;
  z-index: 5;
  text-align: center;
}

.process-quantum-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.title-energy-underline {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: var(--gradient-magical);
  border-radius: 2px;
  animation: underlineGlow 2s ease-in-out infinite;
}

.quantum-substeps {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quantum-substep {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  opacity: 0;
  animation: substepReveal 0.8s ease-out forwards;
  transition: all 0.3s ease;
}

.quantum-substep:nth-child(1) { animation-delay: 0.8s; }
.quantum-substep:nth-child(2) { animation-delay: 1s; }
.quantum-substep:nth-child(3) { animation-delay: 1.2s; }

.substep-quantum-bullet {
  width: 8px;
  height: 8px;
  background: var(--gradient-magical);
  border-radius: 50%;
  margin-right: 1rem;
  flex-shrink: 0;
  position: relative;
  animation: bulletPulse 2s ease-in-out infinite;
}

.substep-quantum-bullet::after {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  width: 16px;
  height: 16px;
  border: 1px solid var(--quantum-blue);
  border-radius: 50%;
  opacity: 0.5;
  animation: bulletRing 3s ease-in-out infinite;
}

.substep-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: left;
}

/* Interactive Elements */
.card-interactive-zone {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  pointer-events: none;
}

.interaction-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.quantum-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  opacity: 0;
  transition: opacity 0.5s ease;
  border-radius: 24px;
  filter: blur(30px);
}

/* Hover Effects */
.quantum-process-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 
    0 25px 50px rgba(255, 107, 53, 0.3),
    0 0 100px rgba(59, 130, 246, 0.2);
}

.quantum-process-card:hover .card-holographic-layer {
  opacity: 1;
}

.quantum-process-card:hover .card-plasma-field {
  opacity: 0.3;
}

.quantum-process-card:hover .interaction-ripple {
  width: 300px;
  height: 300px;
}

.quantum-process-card:hover .quantum-hover-effect {
  opacity: 0.1;
}

.quantum-process-card:hover .quantum-substep {
  transform: translateX(10px);
}

.quantum-process-card:hover .number-energy-core {
  transform: scale(1.1);
  box-shadow: 0 0 40px rgba(255, 107, 53, 0.8);
}



/* Revolutionary Keyframe Animations */
@keyframes quantumFloat {
  0%, 100% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.6; 
  }
  33% { 
    transform: translateY(-30px) scale(1.1); 
    opacity: 0.8; 
  }
  66% { 
    transform: translateY(20px) scale(0.9); 
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
    transform: translateY(-20px) translateX(10px); 
    opacity: 1; 
  }
  50% { 
    transform: translateY(-40px) translateX(-10px); 
    opacity: 0.7; 
  }
  75% { 
    transform: translateY(-20px) translateX(15px); 
    opacity: 0.9; 
  }
  100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.5; 
  }
}

@keyframes titleGlow {
  0%, 100% { 
    text-shadow: 0 0 30px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    text-shadow: 0 0 50px rgba(255, 107, 53, 0.8), 0 0 70px rgba(59, 130, 246, 0.5); 
  }
}

@keyframes energyTrail {
  0%, 100% { 
    opacity: 0.6; 
    transform: translateX(-50%) scaleX(1); 
  }
  50% { 
    opacity: 1; 
    transform: translateX(-50%) scaleX(1.2); 
  }
}

@keyframes glowPulse {
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.05); 
  }
}

@keyframes matrixScan {
  0% { 
    transform: translateX(-100%); 
    opacity: 0; 
  }
  50% { 
    opacity: 1; 
  }
  100% { 
    transform: translateX(200%); 
    opacity: 0; 
  }
}

@keyframes cardReveal {
  from {
    opacity: 0;
    transform: translateY(50px) rotateX(15deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

@keyframes borderFlow {
  0% { 
    background-position: 0% 50%; 
  }
  100% { 
    background-position: 100% 50%; 
  }
}

@keyframes plasmaRotate {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

@keyframes numberPulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    transform: scale(1.05); 
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.8); 
  }
}

@keyframes ringRotate {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

@keyframes plasmaGlow {
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.9; 
    transform: scale(1.1); 
  }
}

@keyframes underlineGlow {
  0%, 100% { 
    opacity: 0.6; 
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    opacity: 1; 
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.8); 
  }
}

@keyframes substepReveal {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bulletPulse {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5); 
  }
  50% { 
    transform: scale(1.2); 
    box-shadow: 0 0 15px rgba(255, 107, 53, 0.8); 
  }
}

@keyframes bulletRing {
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.5; 
  }
  50% { 
    transform: scale(1.3); 
    opacity: 0.8; 
  }
}

/* Revolutionary Responsive Design */
@media (max-width: 1200px) {
  .quantum-process-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
  }
  
  .quantum-process-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .process {
    padding: 4rem 1.5rem;
    min-height: auto;
  }
  
  .quantum-process-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .quantum-process-title {
    font-size: 2.5rem;
  }
  
  .quantum-process-card {
    padding: 2rem;
  }
  
  .process-quantum-number {
    width: 70px;
    height: 70px;
    margin-bottom: 1.5rem;
  }
  
  .number-energy-core {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
  
  .number-quantum-ring {
    width: 70px;
    height: 70px;
    top: -10px;
    left: -10px;
  }
  
  .process-quantum-title {
    font-size: 1.3rem;
  }
  
  .substep-text {
    font-size: 0.9rem;
  }
  
  /* Reduce animation intensity on mobile */
  .quantum-orb {
    filter: blur(20px);
  }
  
  .orb-1 {
    width: 200px;
    height: 200px;
  }
  
  .orb-2 {
    width: 150px;
    height: 150px;
  }
  
  .orb-3 {
    width: 100px;
    height: 100px;
  }
  
  .orb-4 {
    width: 180px;
    height: 180px;
  }
}

@media (max-width: 480px) {
  .process {
    padding: 3rem 1rem;
  }
  
  .quantum-process-title {
    font-size: 2rem;
  }
  
  .quantum-process-card {
    padding: 1.5rem;
  }
  
  .process-quantum-number {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }
  
  .number-energy-core {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .number-quantum-ring {
    width: 60px;
    height: 60px;
  }
  
  .number-plasma-glow {
    width: 70px;
    height: 70px;
  }
  
  .process-quantum-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  .substep-text {
    font-size: 0.85rem;
  }
  
  .substep-quantum-bullet {
    width: 6px;
    height: 6px;
    margin-right: 0.8rem;
  }
  
  .quantum-process-card:hover {
    transform: translateY(-8px) scale(1.01);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .quantum-process-card {
    border: 2px solid white;
  }
  
  .quantum-border-energy {
    border: 3px solid var(--primary-color);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .quantum-process-card:hover {
    transform: none;
  }
}
</style>
