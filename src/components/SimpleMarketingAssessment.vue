<template>
  <section class="simple-assessment">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Đánh Giá Marketing Miễn Phí</h2>
        <p class="section-subtitle">Khám phá tiềm năng marketing của doanh nghiệp bạn</p>
      </div>

      <!-- Assessment Form -->
      <div class="assessment-form">
        <div class="form-steps">
          <div class="step-indicator">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step-dot"
              :class="{ active: currentStep === index }"
            >
              {{ index + 1 }}
            </div>
          </div>
          
          <div class="step-content">
            <h3 class="step-title">{{ steps[currentStep].title }}</h3>
            <p class="step-description">{{ steps[currentStep].description }}</p>
            
            <div class="form-group">
              <label class="form-label">{{ steps[currentStep].question }}</label>
              <div v-if="steps[currentStep].type === 'radio'" class="radio-group">
                <label
                  v-for="option in steps[currentStep].options"
                  :key="option.value"
                  class="radio-option"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[currentStep]"
                  >
                  <span class="radio-text">{{ option.label }}</span>
                </label>
              </div>
              
              <textarea
                v-else-if="steps[currentStep].type === 'textarea'"
                v-model="answers[currentStep]"
                class="form-textarea"
                :placeholder="steps[currentStep].placeholder"
                rows="4"
              ></textarea>
              
              <input
                v-else
                v-model="answers[currentStep]"
                :type="steps[currentStep].type || 'text'"
                class="form-input"
                :placeholder="steps[currentStep].placeholder"
              >
            </div>
          </div>
          
          <div class="form-actions">
            <button
              v-if="currentStep > 0"
              @click="previousStep"
              class="btn-secondary"
            >
              Quay Lại
            </button>
            
            <button
              v-if="currentStep < steps.length - 1"
              @click="nextStep"
              class="btn-primary"
              :disabled="!answers[currentStep]"
            >
              Tiếp Theo
            </button>
            
            <button
              v-else
              @click="submitAssessment"
              class="btn-primary"
              :disabled="!answers[currentStep]"
            >
              Hoàn Thành
            </button>
          </div>
        </div>
      </div>

      <!-- Benefits -->
      <div class="assessment-benefits">
        <h3 class="benefits-title">Lợi Ích Khi Đánh Giá</h3>
        
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-chart-bar"></i>
            </div>
            <h4>Phân Tích Chuyên Sâu</h4>
            <p>Đánh giá chi tiết hiện trạng marketing của bạn</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h4>Gợi Ý Cải Thiện</h4>
            <p>Nhận được lời khuyên cụ thể để tối ưu hiệu quả</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-gift"></i>
            </div>
            <h4>Hoàn Toàn Miễn Phí</h4>
            <p>Dịch vụ đánh giá không tính phí, không ràng buộc</p>
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
          question: "Tên công ty/doanh nghiệp của bạn?",
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

/* Assessment Form */
.assessment-form {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.step-indicator {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.step-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.2s ease;
}

.step-dot.active {
  background: black;
  color: white;
}

.step-content {
  text-align: center;
  margin-bottom: 2rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
}

.step-description {
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: black;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-option:hover {
  border-color: #ccc;
  background: #f8f8f8;
}

.radio-option input[type="radio"] {
  margin: 0;
}

.radio-text {
  font-size: 0.9rem;
  color: black;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: black;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #333;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: white;
  color: black;
  border: 1px solid #e5e5e5;
}

.btn-secondary:hover {
  background: #f8f8f8;
  border-color: #ccc;
}

/* Benefits */
.assessment-benefits {
  text-align: center;
}

.benefits-title {
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.benefit-item {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.benefit-item:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.benefit-item h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.benefit-item p {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-assessment {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .assessment-form {
    padding: 1.5rem;
  }
  
  .step-indicator {
    gap: 0.5rem;
  }
  
  .step-dot {
    width: 35px;
    height: 35px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .benefit-item {
    padding: 1.5rem;
  }
}
</style> 