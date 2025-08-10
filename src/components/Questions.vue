<template>
  <!-- Revolutionary Quantum FAQ Zone -->
  <div class="quantum-faq-zone">
    <!-- Revolutionary Quantum Background -->
    <div class="faq-quantum-background">
      <!-- Quantum Orbs System -->
      <div class="quantum-orb orb-1" />
      <div class="quantum-orb orb-2" />
      <div class="quantum-orb orb-3" />
      <div class="quantum-orb orb-4" />

      <!-- Energy Grid System -->
      <div class="energy-matrix">
        <div class="matrix-grid">
          <div
            v-for="i in 12"
            :key="`grid-${i}`"
            class="grid-cell"
          />
        </div>
      </div>

      <!-- Floating Quantum Particles -->
      <div class="floating-faq-particles">
        <div
          v-for="i in 8"
          :key="`particle-${i}`"
          class="quantum-particle"
        />
      </div>
    </div>

    <!-- Revolutionary Title Zone -->
    <div class="faq-title-zone">
      <div class="quantum-badge">
        <span class="badge-text">❓ FAQ</span>
        <div class="badge-quantum-glow" />
      </div>

      <h1 class="faq-revolutionary-title">
        <span class="title-main">Câu Hỏi</span>
        <span class="title-secondary">Thường Gặp</span>
        <div class="title-quantum-beam" />
        <div class="title-energy-flow" />
      </h1>

      <div class="faq-subtitle">
        <p>
          Khám phá câu trả lời cho những thắc mắc thường gặp về dịch vụ của ESmart Solutions
        </p>
        <div class="subtitle-glow" />
      </div>
    </div>

    <!-- Revolutionary FAQ Container -->
    <div class="faq-quantum-container">
      <!-- Quantum FAQ Grid -->
      <div class="faq-quantum-grid">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="faq-quantum-card"
          :class="{ 'active-card': activeIndex === index }"
          @click="toggleItem(index)"
        >
          <!-- Quantum Card Shell -->
          <div class="faq-card-shell">
            <!-- Holographic Border -->
            <div class="holographic-border" />

            <!-- Question Portal -->
            <div class="question-portal">
              <!-- Question Number Portal -->
              <div class="question-number-portal">
                <div class="number-quantum-core">
                  <span class="quantum-number">{{ formatNumber(index + 1) }}</span>
                  <div class="number-energy-ring" />
                  <div class="number-plasma-glow" />
                </div>
              </div>

              <!-- Question Content -->
              <div class="question-content-zone">
                <div class="question-revolutionary-text-wrapper">
                  <h3 class="question-revolutionary-text">
                    {{ item.question }}
                    <div class="text-quantum-underline" />
                  </h3>
                </div>
              </div>

              <!-- Quantum Icon Portal -->
              <div class="icon-quantum-portal">
                <div
                  class="icon-shell"
                  :class="{ 'rotated': activeIndex === index }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="quantum-chevron"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <div class="icon-quantum-glow" />
                </div>
                <div class="icon-energy-rings">
                  <div class="energy-ring ring-1" />
                  <div class="energy-ring ring-2" />
                </div>
              </div>
            </div>

            <!-- Answer Quantum Portal -->
            <transition name="answer-portal">
              <div
                v-if="activeIndex === index"
                class="answer-quantum-portal"
              >
                <div class="answer-shell">
                  <div class="answer-content">
                    <p class="answer-revolutionary-text">
                      {{ item.answer }}
                    </p>
                    <div class="answer-magic-dust" />
                  </div>
                  <div class="answer-energy-flow" />
                </div>
              </div>
            </transition>

            <!-- Card Energy Effects -->
            <div class="card-energy-effects">
              <div class="energy-pulse pulse-1" />
              <div class="energy-pulse pulse-2" />
              <div class="energy-pulse pulse-3" />
            </div>

            <!-- Quantum Divider -->
            <div class="quantum-divider" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FaqAccordion',
    data() {
        return {
            activeIndex: null,
            faqItems: [
                {
                    question: 'eSmart Solutions cung cấp những dịch vụ gì?',
                    answer: 'Chúng tôi chuyên cung cấp các giải pháp công nghệ như phát triển phần mềm tùy chỉnh, chuyển đổi số, ứng dụng di động, và dịch vụ tư vấn CNTT để giúp doanh nghiệp tối ưu hóa hoạt động và tăng trưởng bền vững.'
                },
                {
                    question: 'Tôi có thể yêu cầu giải pháp riêng cho doanh nghiệp không?',
                    answer: 'Chắc chắn rồi! Chúng tôi thiết kế các giải pháp tùy chỉnh theo nhu cầu cụ thể của từng doanh nghiệp, đảm bảo phù hợp với mục tiêu và quy mô của bạn.'
                },
                {
                    question: 'Quy trình phát triển phần mềm của eSmart diễn ra thế nào?',
                    answer: 'Quy trình của chúng tôi gồm 5 bước: Phân tích yêu cầu, thiết kế giải pháp, phát triển sản phẩm, kiểm thử chất lượng, và triển khai. Chúng tôi luôn trao đổi chặt chẽ với khách hàng để đảm bảo kết quả tốt nhất.'
                },
                {
                    question: 'Mất bao lâu để hoàn thành một dự án?',
                    answer: 'Thời gian phụ thuộc vào độ phức tạp của dự án, nhưng trung bình từ 4 tuần đến 6 tháng. Chúng tôi sẽ cung cấp lộ trình chi tiết sau khi thảo luận yêu cầu của bạn.'
                },
                {
                    question: 'Chi phí cho một dự án là bao nhiều?',
                    answer: 'Chi phí được tính dựa trên phạm vi dự án, tính năng yêu cầu, và thời gian thực hiện. Vui lòng liên hệ chúng tôi để nhận báo giá chính xác.'
                },
                {
                    question: 'eSmart có hỗ trợ sau khi bàn giao sản phẩm không?',
                    answer: 'Có, chúng tôi cung cấp dịch vụ bảo trì, nâng cấp, và hỗ trợ kỹ thuật dài hạn để đảm bảo giải pháp của bạn luôn hoạt động hiệu quả.'
                },
                {
                    question: 'eSmart phù hợp với loại hình doanh nghiệp nào?',
                    answer: 'Chúng tôi phục vụ đa dạng khách hàng, từ doanh nghiệp nhỏ, startup đến các agency lớn trong nhiều lĩnh vực như bán lẻ, giáo dục, tài chính, và sản xuất.'
                },
                {
                    question: 'Tôi không rành về công nghệ, eSmart có hỗ trợ không?',
                    answer: 'Hoàn toàn có! Đội ngũ của chúng tôi sẽ tư vấn và đồng hành cùng bạn từ ý tưởng đến khi hoàn thiện, không cần bạn phải am hiểu sâu về công nghệ.'
                },
                {
                    question: 'Tại sao tôi nên chọn eSmart Solutions?',
                    answer: 'Chúng tôi mang đến giải pháp sáng tạo, đội ngũ giàu kinh nghiệm, và cam kết đồng hành cùng sự phát triển của bạn với chi phí hợp lý và chất lượng vượt trội.'
                },
                {
                    question: 'Chuyển đổi số với eSmart giúp gì cho doanh nghiệp của tôi?',
                    answer: 'Chuyển đổi số giúp bạn tối ưu hóa quy trình, giảm chi phí vận hành, tăng trải nghiệm khách hàng, và cạnh tranh mạnh mẽ hơn trên thị trường.'
                }
            ]
        };
    },

    mounted() {
        this.initQuantumAnimations();
    },
    methods: {
        toggleItem(index) {
            if (this.activeIndex === index) {
                this.activeIndex = null;
            } else {
                this.activeIndex = index;
            }

            // Add quantum ripple effect
            this.createQuantumRipple();
        },

        formatNumber(num) {
            return num < 10 ? `0${num}` : num;
        },

        createQuantumRipple() {
            if (typeof document !== 'undefined') {
                // Create quantum ripple effect on toggle
                const ripple = document.createElement('div');
                ripple.className = 'quantum-ripple-effect';
                const container = document.querySelector('.quantum-faq-zone');
                if (container) {
                    container.appendChild(ripple);
                }

                setTimeout(() => {
                    if (ripple && ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 1000);
            }
        },

        initQuantumAnimations() {
            if (typeof document !== 'undefined') {
                // Initialize quantum particle animations
                const particles = document.querySelectorAll('.quantum-particle');
                particles.forEach((particle, index) => {
                    particle.style.animationDelay = `${index * 0.8}s`;
                });

                // Initialize grid animations
                const gridCells = document.querySelectorAll('.grid-cell');
                gridCells.forEach((cell, index) => {
                    setTimeout(() => {
                        cell.classList.add('matrix-active');
                    }, index * 100);
                });
            }
        }
    }
};
</script>

<style scoped>
/* Revolutionary CSS Variables with Quantum Theme */
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
    --gradient-holographic: linear-gradient(45deg, rgba(255, 107, 53, 0.3) 0%, rgba(59, 130, 246, 0.3) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(34, 197, 94, 0.3) 75%, rgba(255, 107, 53, 0.3) 100%);
}

/* Revolutionary Quantum FAQ Zone */
.quantum-faq-zone {
    background:
        radial-gradient(circle at 25% 30%, rgba(255, 107, 53, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 75% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, rgba(15, 15, 40, 1) 0%, rgba(8, 8, 20, 0.98) 100%);
    color: white;
    padding: 120px 2rem;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
}

/* Revolutionary Quantum Background */
.faq-quantum-background {
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
    filter: blur(40px);
    animation: quantumFloat 20s ease-in-out infinite;
}

.orb-1 {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 15%;
    background: var(--gradient-magical);
    animation-delay: 0s;
}

.orb-2 {
    width: 240px;
    height: 240px;
    top: 60%;
    right: 10%;
    background: var(--gradient-quantum);
    animation-delay: 5s;
}

.orb-3 {
    width: 200px;
    height: 200px;
    bottom: 20%;
    left: 60%;
    background: var(--gradient-cyber);
    animation-delay: 10s;
}

.orb-4 {
    width: 160px;
    height: 160px;
    top: 30%;
    right: 50%;
    background: var(--gradient-magical);
    animation-delay: 7.5s;
}

.energy-matrix {
    position: absolute;
    width: 100%;
    height: 100%;
}

.matrix-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    height: 100%;
    gap: 2px;
}

.grid-cell {
    background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.08) 50%, transparent 70%);
    opacity: 0;
    animation: matrixPulse 6s ease-in-out infinite;
    transition: all 0.4s ease;
}

.grid-cell.matrix-active {
    opacity: 1;
}

.grid-cell:nth-child(odd) {
    animation-delay: 0.5s;
}

.grid-cell:nth-child(3n) {
    background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.08) 50%, transparent 70%);
    animation-delay: 1s;
}

.floating-faq-particles {
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
    animation: particleFloat 12s linear infinite;
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.6);
}

.quantum-particle:nth-child(1) {
    top: 10%;
    left: 20%;
    animation-delay: 0s;
}

.quantum-particle:nth-child(2) {
    top: 30%;
    right: 15%;
    animation-delay: 1.5s;
    background: var(--gradient-quantum);
}

.quantum-particle:nth-child(3) {
    top: 60%;
    left: 80%;
    animation-delay: 3s;
    background: var(--gradient-cyber);
}

.quantum-particle:nth-child(4) {
    bottom: 40%;
    right: 70%;
    animation-delay: 4.5s;
}

.quantum-particle:nth-child(5) {
    bottom: 20%;
    left: 40%;
    animation-delay: 6s;
    background: var(--gradient-quantum);
}

.quantum-particle:nth-child(6) {
    top: 80%;
    right: 40%;
    animation-delay: 7.5s;
}

.quantum-particle:nth-child(7) {
    top: 45%;
    left: 10%;
    animation-delay: 9s;
    background: var(--gradient-cyber);
}

.quantum-particle:nth-child(8) {
    bottom: 60%;
    right: 20%;
    animation-delay: 10.5s;
}

/* Revolutionary Title Zone */
.faq-title-zone {
    position: relative;
    z-index: 3;
    text-align: center;
    margin-bottom: 5rem;
}

.quantum-badge {
    position: relative;
    display: inline-block;
    background: var(--gradient-magical);
    color: white;
    padding: 0.8rem 2rem;
    border-radius: 50px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
    animation: badgeFloat 3s ease-in-out infinite;
}

.badge-quantum-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--gradient-quantum);
    border-radius: 50px;
    z-index: -1;
    filter: blur(8px);
    animation: quantumGlow 2s ease-in-out infinite;
}

.faq-revolutionary-title {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    margin: 0 0 2rem 0;
    position: relative;
    line-height: 1.1;
}

.title-main {
    display: block;
    background: var(--gradient-magical);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
    animation: titleGlow 3s ease-in-out infinite;
}

.title-secondary {
    display: block;
    background: var(--gradient-quantum);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    animation: titleGlow 3s ease-in-out infinite 0.5s;
}

.title-quantum-beam {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--gradient-magical);
    border-radius: 1px;
    transform: translateY(-50%) scaleX(0);
    animation: beamExpand 2s ease-out 1s forwards;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
}

.title-energy-flow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-holographic);
    opacity: 0.1;
    border-radius: 10px;
    animation: energyFlow 4s ease-in-out infinite;
}

.faq-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    position: relative;
}

.subtitle-glow {
    position: absolute;
    top: -5px;
    left: -10px;
    right: -10px;
    bottom: -5px;
    background: var(--gradient-magical);
    border-radius: 10px;
    z-index: -1;
    filter: blur(20px);
    opacity: 0.3;
    animation: subtitlePulse 4s ease-in-out infinite;
}

/* Revolutionary FAQ Container */
.faq-quantum-container {
    position: relative;
    z-index: 3;
    max-width: 900px;
    margin: 0 auto;
}

.faq-quantum-grid {
    display: grid;
    gap: 2rem;
}

/* Revolutionary FAQ Cards */
.faq-quantum-card {
    position: relative;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: cardReveal 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(30px);
}

.faq-quantum-card:nth-child(1) {
    animation-delay: 0.1s;
}

.faq-quantum-card:nth-child(2) {
    animation-delay: 0.2s;
}

.faq-quantum-card:nth-child(3) {
    animation-delay: 0.3s;
}

.faq-quantum-card:nth-child(4) {
    animation-delay: 0.4s;
}

.faq-quantum-card:nth-child(5) {
    animation-delay: 0.5s;
}

.faq-quantum-card:nth-child(6) {
    animation-delay: 0.6s;
}

.faq-quantum-card:nth-child(7) {
    animation-delay: 0.7s;
}

.faq-quantum-card:nth-child(8) {
    animation-delay: 0.8s;
}

.faq-quantum-card:nth-child(9) {
    animation-delay: 0.9s;
}

.faq-quantum-card:nth-child(10) {
    animation-delay: 1s;
}

.faq-card-shell {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
}

.faq-quantum-card:hover .faq-card-shell {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 53, 0.3);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 107, 53, 0.2);
}

.faq-quantum-card.active-card .faq-card-shell {
    background: rgba(255, 107, 53, 0.1);
    border-color: rgba(255, 107, 53, 0.5);
    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.3);
}

.holographic-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background: var(--gradient-holographic);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.faq-quantum-card:hover .holographic-border {
    opacity: 0.6;
}

.faq-quantum-card.active-card .holographic-border {
    opacity: 0.8;
    animation: holographicPulse 2s ease-in-out infinite;
}

/* Question Portal */
.question-portal {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: relative;
}

.question-number-portal {
    flex-shrink: 0;
    position: relative;
}

.number-quantum-core {
    width: 50px;
    height: 50px;
    background: var(--gradient-magical);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
}

.quantum-number {
    font-weight: 900;
    font-size: 1.1rem;
    color: white;
    position: relative;
    z-index: 2;
}

.number-energy-ring {
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid var(--quantum-blue);
    border-radius: 50%;
    animation: ringRotate 3s linear infinite;
    opacity: 0.7;
}

.number-plasma-glow {
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: var(--gradient-quantum);
    border-radius: 50%;
    z-index: -1;
    filter: blur(10px);
    animation: plasmaGlow 2s ease-in-out infinite;
    opacity: 0.6;
}

.question-content-zone {
    flex: 1;
    min-width: 0;
}

.question-revolutionary-text {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
    color: white;
    line-height: 1.4;
    position: relative;
    transition: all 0.3s ease;
}

.faq-quantum-card:hover .question-revolutionary-text {
    color: rgba(255, 107, 53, 1);
}

.text-quantum-underline {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-magical);
    border-radius: 1px;
    transition: width 0.4s ease;
}

.faq-quantum-card:hover .text-quantum-underline {
    width: 100%;
}

.icon-quantum-portal {
    flex-shrink: 0;
    position: relative;
}

.icon-shell {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    position: relative;
    backdrop-filter: blur(10px);
}

.icon-shell.rotated {
    transform: rotate(180deg);
    background: var(--gradient-magical);
}

.quantum-chevron {
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.8);
}

.icon-shell.rotated .quantum-chevron {
    color: white;
}

.icon-quantum-glow {
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: var(--gradient-magical);
    border-radius: 50%;
    z-index: -1;
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.faq-quantum-card:hover .icon-quantum-glow {
    opacity: 0.7;
}

.icon-energy-rings {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.energy-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 107, 53, 0.3);
    border-radius: 50%;
    animation: energyRingExpand 2s ease-out infinite;
}

.ring-1 {
    width: 60px;
    height: 60px;
    animation-delay: 0s;
}

.ring-2 {
    width: 80px;
    height: 80px;
    animation-delay: 0.5s;
}

/* Answer Portal */
.answer-quantum-portal {
    margin-top: 2rem;
    position: relative;
}

.answer-shell {
    background: rgba(255, 107, 53, 0.1);
    border: 1px solid rgba(255, 107, 53, 0.2);
    border-radius: 15px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.answer-content {
    position: relative;
    z-index: 2;
}

.answer-revolutionary-text {
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
}

.answer-magic-dust {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-holographic);
    opacity: 0.1;
    border-radius: 15px;
    animation: magicDustFloat 3s ease-in-out infinite;
}

.answer-energy-flow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.2), transparent);
    animation: energyFlowSweep 2s ease-in-out;
}

/* Card Energy Effects */
.card-energy-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.energy-pulse {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--gradient-magical);
    border-radius: 50%;
    opacity: 0;
    animation: energyPulseFloat 4s ease-in-out infinite;
}

.pulse-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.pulse-2 {
    top: 60%;
    right: 15%;
    animation-delay: 1.5s;
    background: var(--gradient-quantum);
}

.pulse-3 {
    bottom: 30%;
    left: 80%;
    animation-delay: 3s;
    background: var(--gradient-cyber);
}

.quantum-divider {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 1px;
    background: var(--gradient-magical);
    transform: translateX(-50%);
    transition: width 0.4s ease;
}

.faq-quantum-card:hover .quantum-divider {
    width: 80%;
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

/* Transitions */
.answer-portal-enter-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.answer-portal-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.answer-portal-enter-from {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
}

.answer-portal-enter-to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
}

.answer-portal-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
}

.answer-portal-leave-to {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
}

/* Quantum Ripple Effect */
.quantum-ripple-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: quantumRippleExpand 1s ease-out;
    pointer-events: none;
    z-index: 5;
}

/* Animation Keyframes */
@keyframes quantumFloat {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    25% {
        transform: translateY(-20px) rotate(90deg);
    }

    50% {
        transform: translateY(-10px) rotate(180deg);
    }

    75% {
        transform: translateY(-30px) rotate(270deg);
    }
}

@keyframes matrixPulse {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 0.8;
    }
}

@keyframes particleFloat {
    0% {
        transform: translateY(0) translateX(0);
    }

    25% {
        transform: translateY(-20px) translateX(10px);
    }

    50% {
        transform: translateY(-10px) translateX(-5px);
    }

    75% {
        transform: translateY(-30px) translateX(15px);
    }

    100% {
        transform: translateY(0) translateX(0);
    }
}

@keyframes badgeFloat {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-5px);
    }
}

@keyframes quantumGlow {

    0%,
    100% {
        opacity: 0.5;
        filter: blur(8px);
    }

    50% {
        opacity: 0.8;
        filter: blur(12px);
    }
}

@keyframes titleGlow {

    0%,
    100% {
        text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
    }

    50% {
        text-shadow: 0 0 50px rgba(255, 107, 53, 0.8), 0 0 70px rgba(255, 107, 53, 0.3);
    }
}

@keyframes beamExpand {
    0% {
        transform: translateY(-50%) scaleX(0);
    }

    100% {
        transform: translateY(-50%) scaleX(1);
    }
}

@keyframes energyFlow {

    0%,
    100% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(100%);
    }
}

@keyframes subtitlePulse {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 0.6;
    }
}

@keyframes cardReveal {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes holographicPulse {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }
}

@keyframes ringRotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes plasmaGlow {

    0%,
    100% {
        opacity: 0.6;
        filter: blur(10px);
    }

    50% {
        opacity: 0.9;
        filter: blur(15px);
    }
}

@keyframes energyRingExpand {
    0% {
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.5);
    }
}

@keyframes magicDustFloat {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-5px) rotate(180deg);
    }
}

@keyframes energyFlowSweep {
    0% {
        left: -100%;
    }

    100% {
        left: 100%;
    }
}

@keyframes energyPulseFloat {

    0%,
    100% {
        opacity: 0;
        transform: translateY(0);
    }

    50% {
        opacity: 1;
        transform: translateY(-10px);
    }
}

@keyframes quantumRippleExpand {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }

    100% {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .quantum-faq-zone {
        padding: 80px 1rem;
    }

    .faq-revolutionary-title {
        font-size: clamp(2rem, 6vw, 3rem);
    }

    .faq-card-shell {
        padding: 1.5rem;
    }

    .question-portal {
        gap: 1rem;
    }

    .question-revolutionary-text {
        font-size: 1.1rem;
    }

    .number-quantum-core {
        width: 40px;
        height: 40px;
    }

    .quantum-number {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .quantum-faq-zone {
        padding: 60px 1rem;
    }

    .faq-quantum-grid {
        gap: 1.5rem;
    }

    .faq-card-shell {
        padding: 1.2rem;
    }

    .question-portal {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .question-revolutionary-text {
        font-size: 1rem;
    }

    .answer-revolutionary-text {
        font-size: 0.9rem;
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

@media (prefers-contrast: high) {
    .faq-card-shell {
        border: 2px solid;
        background: rgba(255, 255, 255, 0.1);
    }

    .question-revolutionary-text {
        color: white;
    }
}

/* Focus styles for accessibility */
.faq-quantum-card:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.faq-quantum-card:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
</style>