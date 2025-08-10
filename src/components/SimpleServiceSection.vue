<template>
  <section class="simple-process">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Quy Trình Làm Việc</h2>
        <p class="section-subtitle">Phương pháp làm việc chuyên nghiệp của ESmart Solutions</p>
      </div>

      <!-- Simple Process Steps -->
      <div class="process-steps">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
          </div>
          <div v-if="index < steps.length - 1" class="step-connector"></div>
        </div>
      </div>

      <!-- Process Benefits -->
      <div class="process-benefits">
        <h3 class="benefits-title">Lợi Ích Của Quy Trình</h3>
        
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-clock"></i>
            </div>
            <h4>Tiết Kiệm Thời Gian</h4>
            <p>Quy trình tối ưu giúp hoàn thành dự án nhanh chóng</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-award"></i>
            </div>
            <h4>Chất Lượng Cao</h4>
            <p>Đảm bảo chất lượng sản phẩm đạt tiêu chuẩn quốc tế</p>
          </div>
          
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h4>Hợp Tác Hiệu Quả</h4>
            <p>Phối hợp chặt chẽ với khách hàng trong suốt dự án</p>
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
      ]
    };
  }
};
</script>

<style scoped>
.simple-process {
  background: white;
  color: black;
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
}

.step-number {
  width: 60px;
  height: 60px;
  background: black;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.2s ease;
}

.step-content:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-icon {
  font-size: 2rem;
  color: black;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.step-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}

.step-connector {
  position: absolute;
  left: 29px;
  top: 60px;
  width: 2px;
  height: 40px;
  background: #e5e5e5;
}

/* Process Benefits */
.process-benefits {
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
  max-width: 900px;
  margin: 0 auto;
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
    gap: 1rem;
  }
  
  .step-content,
  .benefit-item {
    padding: 1.5rem;
  }
}
</style> 