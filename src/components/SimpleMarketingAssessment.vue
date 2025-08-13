<template>
  <section class="simple-assessment">
    <!-- Animated Background Elements -->
    <div class="animated-bg">
      <div class="floating-shape shape-1" />
      <div class="floating-shape shape-2" />
      <div class="floating-shape shape-3" />
      <div class="pulse-ring ring-1" />
      <div class="pulse-ring ring-2" />
    </div>

    <div class="container">
      <!-- Enhanced Header with Slide In Animation -->
      <div class="section-header slide-in-element">
        <div class="title-container">
          <h2 class="section-title fade-in-element">
            Đánh Giá Marketing Miễn Phí
          </h2>
          <div class="title-underline slide-in-right" />
        </div>
        <p
          class="section-subtitle fade-in-element"
          style="animation-delay: 0.3s;"
        >
          Khám phá tiềm năng marketing của doanh nghiệp bạn với công cụ đánh giá chuyên nghiệp
        </p>
      </div>

      <!-- Enhanced Assessment Form with Move In Animation -->
      <div class="assessment-form move-in-element">
        <div class="form-steps">
          <!-- Improved Step Indicator with Slide In Animation -->
          <div class="step-indicator slide-in-up">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step-dot"
              :class="{ active: currentStep === index, completed: currentStep > index }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <span
                v-if="currentStep > index"
                class="check-icon fade-in-element"
              >✓</span>
              <span
                v-else
                class="fade-in-element"
              >{{ index + 1 }}</span>
            </div>
            <div class="step-progress-bar">
              <div
                class="progress-fill slide-in-left"
                :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
              />
            </div>
          </div>
          
          <!-- Enhanced Step Content with Fade In Animation -->
          <div class="step-content fade-in-element">
            <div class="step-header">
              <h3 class="step-title slide-in-left">
                {{ steps[currentStep].title }}
              </h3>
              <p class="step-description slide-in-right">
                {{ steps[currentStep].description }}
              </p>
            </div>
            
            <div class="form-group">
              <label class="form-label fade-in-element">
                {{ steps[currentStep].question }}
              </label>
              
              <!-- Enhanced Radio Group with Staggered Animation -->
              <div
                v-if="steps[currentStep].type === 'radio'"
                class="radio-group"
              >
                <label
                  v-for="(option, optionIndex) in steps[currentStep].options"
                  :key="option.value"
                  class="radio-option slide-in-up"
                  :class="{ selected: answers[currentStep] === option.value }"
                  :style="{ animationDelay: `${optionIndex * 0.1}s` }"
                >
                  <input
                    v-model="answers[currentStep]"
                    type="radio"
                    :value="option.value"
                    @change="handleRadioChange"
                  >
                  <div class="radio-custom">
                    <div class="radio-dot" />
                  </div>
                  <span class="radio-text">
                    {{ option.label }}
                  </span>
                </label>
              </div>
              
              <!-- Enhanced Textarea with Slide In Animation -->
              <textarea
                v-else-if="steps[currentStep].type === 'textarea'"
                v-model="answers[currentStep]"
                class="form-textarea slide-in-up"
                :placeholder="steps[currentStep].placeholder"
                rows="4"
                @input="handleInput"
              />
              
              <!-- Enhanced Input with Slide In Animation -->
              <input
                v-else
                v-model="answers[currentStep]"
                :type="steps[currentStep].type || 'text'"
                class="form-input slide-in-up"
                :placeholder="steps[currentStep].placeholder"
                @input="handleInput"
              >
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button
                v-if="currentStep > 0"
                class="btn-secondary"
                @click="previousStep"
              >
                Quay Lại
              </button>
              <button
                v-if="currentStep < steps.length - 1"
                class="btn-primary"
                :disabled="!answers[currentStep]"
                @click="nextStep"
              >
                Tiếp Tục
              </button>
              <button
                v-else
                class="btn-primary"
                :disabled="!answers[currentStep]"
                @click="submitAssessment"
              >
                Hoàn Thành Đánh Giá
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Benefits -->
      <div class="assessment-benefits">
        <h3 class="benefits-title">
          Lợi Ích Khi Đánh Giá
        </h3>
        
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-chart-line" />
            </div>
            <h4>
              Phân Tích Chuyên Sâu
            </h4>
            <p>
              Đánh giá chi tiết hiện trạng marketing với báo cáo 360°
            </p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-lightbulb" />
            </div>
            <h4>
              Gợi Ý Cải Thiện
            </h4>
            <p>
              Nhận được lời khuyên cụ thể và kế hoạch hành động
            </p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-gift" />
            </div>
            <h4>
              Hoàn Toàn Miễn Phí
            </h4>
            <p>
              Dịch vụ đánh giá không tính phí, không ràng buộc
            </p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-clock" />
            </div>
            <h4>
              Kết Quả Nhanh Chóng
            </h4>
            <p>
              Nhận báo cáo chi tiết trong vòng 24 giờ
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleMarketingAssessment",
  data() {
    return {
      currentStep: 0,
      answers: {},
      steps: [
        {
          title: "Thông Tin Cơ Bản",
          description: "Cho chúng tôi biết về doanh nghiệp của bạn",
          question: "Tên agency/doanh nghiệp của bạn?",
          type: "text",
          placeholder: "VD: ABC Company"
        },
        {
          title: "Lĩnh Vực Kinh Doanh",
          description: "Lĩnh vực hoạt động chính của bạn",
          question: "Bạn đang hoạt động trong lĩnh vực nào?",
          type: "radio",
          options: [
            { value: "ecommerce", label: "Thương mại điện tử" },
            { value: "service", label: "Dịch vụ" },
            { value: "manufacturing", label: "Sản xuất" },
            { value: "technology", label: "Công nghệ" },
            { value: "other", label: "Khác" }
          ]
        },
        {
          title: "Mục Tiêu Marketing",
          description: "Mục tiêu bạn muốn đạt được",
          question: "Mục tiêu marketing chính của bạn là gì?",
          type: "radio",
          options: [
            { value: "awareness", label: "Tăng nhận diện thương hiệu" },
            { value: "leads", label: "Tạo leads/khách hàng tiềm năng" },
            { value: "sales", label: "Tăng doanh số bán hàng" },
            { value: "retention", label: "Giữ chân khách hàng" }
          ]
        },
        {
          title: "Ngân Sách Marketing",
          description: "Ngân sách dự kiến cho marketing",
          question: "Ngân sách marketing hàng tháng của bạn?",
          type: "radio",
          options: [
            { value: "under-5m", label: "Dưới 5 triệu" },
            { value: "5-15m", label: "5-15 triệu" },
            { value: "15-50m", label: "15-50 triệu" },
            { value: "over-50m", label: "Trên 50 triệu" }
          ]
        },
        {
          title: "Thông Tin Liên Hệ",
          description: "Để chúng tôi gửi kết quả đánh giá",
          question: "Email để nhận kết quả đánh giá",
          type: "email",
          placeholder: "example@company.com"
        }
      ]
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    handleInput() {
      // Trigger reactivity
      this.$forceUpdate();
    },
    handleRadioChange() {
      // Trigger reactivity
      this.$forceUpdate();
    },
    submitAssessment() {
      console.log("Assessment submitted:", this.answers);
      alert("Cảm ơn bạn! Chúng tôi sẽ gửi kết quả đánh giá trong 24h tới.");
      // Reset form
      this.currentStep = 0;
      this.answers = {};
    }
  }
};
</script>

<style scoped>
.simple-assessment {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
}

.simple-assessment::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  pointer-events: none;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Enhanced Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.title-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.title-underline {
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd);
  border-radius: 2px;
  margin: 0 auto;
  width: 80px;
  animation: slideIn 1s ease-out;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #bfdbfe;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 400;
}

/* Assessment Form - No Large Card Wrapper */
.assessment-form {
  margin-top: 3rem;
  position: relative;
  z-index: 2;
}

.form-steps {
  max-width: 800px;
  margin: 0 auto;
}

/* Step Indicator - Direct on Background */
.step-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 1rem 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #ffffff;
  margin: 0 1rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.step-dot.active {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-color: #60a5fa;
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
}

.step-dot.completed {
  background: linear-gradient(135deg, #059669, #10b981);
  border-color: #34d399;
}

.check-icon {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.step-progress-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  transform: translateY(-50%);
  z-index: 1;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e3a8a, #3b82f6);
  border-radius: 2px;
  transition: width 0.6s ease;
}

/* Step Content - Direct on Background */
.step-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step-header {
  margin-bottom: 2.5rem;
}

.step-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.step-description {
  font-size: 1.1rem;
  color: #bfdbfe;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Form Elements - Direct on Background */
.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: left;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Radio Options - Direct on Background */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.radio-option:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.radio-option.selected {
  background: rgba(59, 130, 246, 0.2);
  border-color: #3b82f6;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.radio-option input[type="radio"] {
  display: none;
}

.radio-custom {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
  transition: all 0.3s ease;
}

.radio-option.selected .radio-custom {
  border-color: #3b82f6;
  background: #3b82f6;
}

.radio-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.radio-option.selected .radio-dot {
  transform: translate(-50%, -50%) scale(1);
}

.radio-text {
  color: #ffffff;
  font-weight: 500;
  flex: 1;
  text-align: left;
}

/* Form Actions - Direct on Background */
.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: white;
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* Benefits Section - Direct on Background */
.assessment-benefits {
  margin-top: 4rem;
  text-align: center;
}

.benefits-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.benefit-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.benefit-icon {
  font-size: 2.5rem;
  color: #3b82f6;
  margin-bottom: 1rem;
}

.benefit-item h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.benefit-item p {
  color: #bfdbfe;
  line-height: 1.6;
}

/* Animations */
@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80px;
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Advanced Animation Classes */
.slide-in-element {
  animation: slideInFromBottom 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
}

.slide-in-up {
  animation: slideInFromBottom 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.slide-in-left {
  animation: slideInFromLeft 0.6s ease-out forwards;
  opacity: 0;
  transform: translateX(-30px);
}

.slide-in-right {
  animation: slideInFromRight 0.6s ease-out forwards;
  opacity: 0;
  transform: translateX(30px);
}

.move-in-element {
  animation: moveInFromCenter 1s ease-out forwards;
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.fade-in-element {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

/* Animated Background Elements */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%);
  filter: blur(20px);
  animation: floatShape 8s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.pulse-ring {
  position: absolute;
  border: 2px solid rgba(96, 165, 250, 0.2);
  border-radius: 50%;
  animation: pulseRing 4s ease-in-out infinite;
}

.ring-1 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.ring-2 {
  width: 200px;
  height: 200px;
  top: 30%;
  right: 20%;
  animation-delay: 2s;
}

/* Animation Keyframes */
@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes moveInFromCenter {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes floatShape {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

@keyframes pulseRing {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
}

/* Hover Effects with Animations */
.radio-option:hover {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.form-input:focus,
.form-textarea:focus {
  transform: scale(1.02);
  transition: all 0.3s ease;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px) scale(1.05);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Staggered Animation Delays */
.section-header .fade-in-element:nth-child(2) {
  animation-delay: 0.2s;
}

.section-header .fade-in-element:nth-child(3) {
  animation-delay: 0.4s;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-assessment {
    padding: 3rem 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .assessment-form {
    padding: 2rem 1.5rem;
  }
  
  .step-indicator {
    gap: 1rem;
  }
  
  .step-dot {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .benefit-item {
    padding: 2rem 1.5rem;
  }
  
  .radio-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .step-title {
    font-size: 1.5rem;
  }
  
  .benefits-title {
    font-size: 2rem;
  }
}
</style> 