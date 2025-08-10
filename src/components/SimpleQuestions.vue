<template>
  <section class="simple-questions">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Câu Hỏi Thường Gặp</h2>
        <p class="section-subtitle">Tìm hiểu thêm về dịch vụ của chúng tôi</p>
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
            <h3 class="question-text">{{ question.question }}</h3>
            <i class="question-icon fas fa-chevron-down"></i>
          </div>
          <div class="question-answer">
            <div class="answer-content">
              {{ question.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Magical Contact Section -->
      <div class="magical-contact-section">
        <h3 class="contact-title">Vẫn Còn Thắc Mắc?</h3>
        <p class="contact-description">Liên hệ với đội ngũ chuyên gia của chúng tôi để được tư vấn miễn phí</p>
        <button class="magical-contact-btn">
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
          question: "ESmart Solutions cung cấp những dịch vụ gì?",
          answer: "Chúng tôi cung cấp các dịch vụ marketing digital, phát triển website, SEO, quản lý mạng xã hội và tư vấn chiến lược kinh doanh."
        },
        {
          question: "Thời gian hoàn thành dự án là bao lâu?",
          answer: "Thời gian hoàn thành phụ thuộc vào quy mô dự án. Thường từ 2-8 tuần cho website và 1-3 tháng cho chiến dịch marketing hoàn chỉnh."
        },
        {
          question: "Chi phí dịch vụ như thế nào?",
          answer: "Chi phí được tính toán dựa trên yêu cầu cụ thể của từng dự án. Chúng tôi cung cấp báo giá miễn phí sau khi tư vấn."
        },
        {
          question: "ESmart có hỗ trợ sau khi hoàn thành dự án không?",
          answer: "Có, chúng tôi cung cấp hỗ trợ 24/7 và bảo hành dài hạn cho tất cả dự án. Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ."
        },
        {
          question: "Làm thế nào để bắt đầu làm việc với ESmart?",
          answer: "Bạn có thể liên hệ qua form trên website, email hoặc hotline. Chúng tôi sẽ tư vấn miễn phí và lập kế hoạch phù hợp."
        }
      ]
    };
  },
  methods: {
    toggleQuestion(index) {
      this.activeQuestion = this.activeQuestion === index ? null : index;
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
  background: #f8f8f8;
  color: black;
  padding: 4rem 2rem;
  position: relative;
}

.questions-list {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.magical-question-item {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.4s ease;
  animation: questionSlideIn 0.8s ease-out backwards;
  position: relative;
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
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

.question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: black;
  flex: 1;
  animation: questionTextSlide 0.6s ease-out backwards;
}

.question-icon {
  font-size: 1.2rem;
  color: #333;
  transition: all 0.4s ease;
  animation: iconSpin 0.6s ease-out backwards;
}

.magical-question-item.active .question-icon {
  transform: rotate(180deg);
  color: black;
}

.question-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: rgba(0, 0, 0, 0.02);
}

.magical-question-item.active .question-answer {
  max-height: 200px;
  animation: answerSlideDown 0.6s ease-out;
}

.answer-content {
  padding: 1.5rem 2rem;
  color: #333;
  line-height: 1.6;
  animation: answerFadeIn 0.8s ease-out backwards;
}

/* Contact Section */
.magical-contact-section {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
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
  color: black;
  margin-bottom: 1rem;
  animation: titleGlow 3s ease-in-out infinite;
}

.contact-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 2rem;
  animation: descTypewriter 2s ease-out 0.5s backwards;
}

.magical-contact-btn {
  background: black;
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
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes iconSpin {
  from {
    opacity: 0;
    transform: rotate(-90deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
}

@keyframes answerSlideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes answerFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contactFloat {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes contactRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes titleGlow {
  0%, 100% { text-shadow: none; }
  50% { text-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }
}

@keyframes descTypewriter {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

@keyframes btnMagicPulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  50% { 
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
}

.simple-faq {
  background: white;
  color: black;
  padding: 4rem 2rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
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

/* FAQ List */
.faq-list {
  margin-bottom: 3rem;
}

.faq-item {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;
}

.faq-item:hover {
  border-color: #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: black;
  margin: 0;
  line-height: 1.4;
}

.faq-icon {
  color: #333;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
}

.faq-open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-open .faq-answer {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  color: #333;
  line-height: 1.6;
}

/* Contact CTA */
.faq-cta {
  text-align: center;
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
}

.faq-cta h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
}

.faq-cta p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.contact-btn {
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contact-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-faq {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .faq-question {
    padding: 1rem;
  }
  
  .faq-question h3 {
    font-size: 1rem;
  }
  
  .faq-answer p {
    padding: 0 1rem 1rem;
  }
  
  .faq-cta {
    padding: 1.5rem;
  }
}
</style> 