<template>
  <section class="simple-questions">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2
          class="section-title slide-in-element"
          style="animation-delay: 0.1s;"
        >
          Câu Hỏi Thường Gặp
        </h2>
        <p
          class="section-subtitle fade-in-element"
          style="animation-delay: 0.3s;"
        >
          Những câu hỏi phổ biến về dịch vụ của chúng tôi
        </p>
      </div>

      <!-- Magical Questions List -->
      <div class="questions-list">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="magical-question-item"
          :class="{ active: activeQuestion === index }"
          :style="{ animationDelay: (index * 0.1) + 's' }"
          @click="toggleQuestion(index)"
        >
          <div class="question-header">
            <h3
              class="question-title"
              @click="toggleQuestion(index)"
            >
              {{ question.title }}
            </h3>
            <div class="question-icon">
              <i
                :class="question.isOpen ? 'fas fa-minus' : 'fas fa-plus'"
              />
            </div>
          </div>
          <div
            v-show="question.isOpen"
            class="question-answer"
          >
            <p
              class="answer-text"
            >
              {{ question.answer }}
            </p>
          </div>
        </div>
      </div>

      <!-- Magical Contact Section -->
      <div class="magical-contact-section">
        <h3
          class="contact-title"
        >
          Vẫn Còn Thắc Mắc?
        </h3>
        <p
          class="contact-description"
        >
          Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn miễn phí
        </p>
        <button class="modern-btn">
          Liên Hệ Ngay
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleQuestions",
  data() {
    return {
      activeQuestion: null,
      questions: [
        {
          title: "ESmart Solutions cung cấp những dịch vụ gì?",
          answer: "Chúng tôi cung cấp các dịch vụ marketing digital, phát triển website, SEO, quản lý mạng xã hội và tư vấn chiến lược kinh doanh."
        },
        {
          title: "Thời gian hoàn thành dự án là bao lâu?",
          answer: "Thời gian hoàn thành phụ thuộc vào quy mô dự án. Thường từ 2-8 tuần cho website và 1-3 tháng cho chiến dịch marketing hoàn chỉnh."
        },
        {
          title: "Chi phí dịch vụ như thế nào?",
          answer: "Chi phí được tính toán dựa trên yêu cầu cụ thể của từng dự án. Chúng tôi cung cấp báo giá miễn phí sau khi tư vấn."
        },
        {
          title: "ESmart có hỗ trợ sau khi hoàn thành dự án không?",
          answer: "Có, chúng tôi cung cấp hỗ trợ 24/7 và bảo hành dài hạn cho tất cả dự án. Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ."
        },
        {
          title: "Làm thế nào để bắt đầu làm việc với ESmart?",
          answer: "Bạn có thể liên hệ qua form trên website, email hoặc hotline. Chúng tôi sẽ tư vấn miễn phí và lập kế hoạch phù hợp."
        }
      ]
    };
  },
  methods: {
    toggleQuestion(index) {
      if (this.questions[index]) {
        this.questions[index].isOpen = !this.questions[index].isOpen;
      }
    },
    scrollToContact() {
      const element = document.getElementById('chat');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
/* Magical FAQ Animations */
.simple-questions {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.questions-list {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #e0f2fe);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.section-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #bfdbfe;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.magical-question-item {
  background: rgba(255, 255, 255, 0.98);
  border: 2px solid #1e3a8a;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.4s ease;
  animation: questionSlideIn 0.8s ease-out backwards;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(30, 58, 138, 0.15);
}

.magical-question-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.05), transparent);
  transition: width 0.6s ease;
}

.magical-question-item:hover::before {
  width: 100%;
}

.magical-question-item:hover {
  transform: translateX(10px) translateY(-2px);
  box-shadow: 0 12px 32px rgba(30, 58, 138, 0.25);
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 1);
}

.question-header {
  padding: 1.5rem 2rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.question-header:hover {
  background: rgba(0, 0, 0, 0.02);
}

.question-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e3a8a;
  flex: 1;
  animation: questionTextSlide 0.6s ease-out backwards;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.question-title:hover {
  color: #3b82f6;
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.question-icon {
  font-size: 1.2rem;
  color: #1e3a8a;
  transition: all 0.4s ease;
  animation: iconSpin 0.6s ease-out backwards;
}

.magical-question-item.active .question-icon {
  transform: rotate(180deg);
  color: #3b82f6;
}

.question-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: rgba(30, 58, 138, 0.05);
}

.magical-question-item.active .question-answer {
  max-height: 200px;
  animation: answerSlideDown 0.6s ease-out;
}

.answer-text {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid rgba(30, 58, 138, 0.1);
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

/* Contact Section */
.magical-contact-section {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.15);
  overflow: hidden;
  animation: contactFloat 1s ease-out;
}

.magical-contact-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 0, 0, 0.03), transparent);
  animation: contactRotate 25s linear infinite;
  z-index: -1;
}

.contact-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 1rem;
  animation: titleGlow 3s ease-in-out infinite;
}

.contact-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: descTypewriter 2s ease-out 0.5s backwards;
}

.magical-contact-btn {
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
  animation: btnMagicPulse 2s ease-in-out infinite;
}

.magical-contact-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.8s ease;
}

.magical-contact-btn:hover::after {
  width: 400px;
  height: 400px;
}

.magical-contact-btn:hover {
  transform: translateY(-8px) scale(1.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Animation Keyframes */
@keyframes questionSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes questionTextSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconSpin {
  from {
    opacity: 0;
    transform: rotate(-180deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
}

@keyframes answerSlideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contactFloat {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contactRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 5px rgba(30, 58, 138, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(30, 58, 138, 0.8);
  }
}

@keyframes descTypewriter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes btnMagicPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(30, 58, 138, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(30, 58, 138, 0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-questions {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .magical-question-item {
    margin-bottom: 0.8rem;
  }
  
  .question-header {
    padding: 1rem 1.5rem;
  }
  
  .question-title {
    font-size: 1rem;
  }
  
  .answer-text {
    padding: 1rem 1.5rem;
  }
  
  .magical-contact-section {
    padding: 2rem 1.5rem;
  }
  
  .contact-title {
    font-size: 1.5rem;
  }
}
</style> 