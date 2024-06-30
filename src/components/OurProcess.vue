<template>
  <section class="process">
    <h2>Our Process</h2>
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="content">
          <h3>{{ step.title }}</h3>
          <ul>
            <li v-for="(subStep, subIndex) in step.subsSteps" :key="subIndex">
              {{ subStep.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ProcessInt',
  data() {
    return {
      steps: [
        { 
          title: 'Bước 1: Tư vấn và lập kế hoạch ',
          subsSteps: [
            {title: 'Phân tích chuyên sâu: Khám phá chi tiết về sản phẩm/dịch vụ, xác định thông tin khách hàng mục tiêu và đánh giá thị trường cạnh tranh.'},
            {title: 'Xây dựng customer insight: Tạo ra những hiểu biết sâu sắc về khách hàng mục tiêu.'},
            {title: 'Lên kế hoạch triển khai: Thiết lập chiến lược triển khai theo tháng, đảm bảo mỗi bước đều có mục tiêu rõ ràng.'},
          ]
        },
        { 
          title: 'Bước 2: Ký kết hợp đồng',
          subsSteps: [
            {title: 'Chốt thỏa thuận: Ký kết hợp đồng với gói dịch vụ phù hợp đã chọn, đảm bảo mọi điều khoản đều minh bạch và rõ ràng.'},
          ]
        },
        { 
          title: 'Bước 3: Triển khai chăm sóc Fanpage',
          subsSteps: [
            {title: 'Khởi tạo dự án: Sử dụng công cụ Google Sheets để quản lý dự án, thêm các thành viên và khách hàng vào nhóm nhằm dễ dàng trao đổi và giám sát công việc.'},
            {title: 'Xây dựng timeline nội dung: Lên kế hoạch chi tiết nội dung hàng tháng và trình khách hàng phê duyệt.'},
            {title: 'Sản xuất nội dung: Thiết kế hình ảnh, sản xuất video và triển khai các chiến dịch quảng cáo nhằm phủ sóng thương hiệu và tăng doanh số bán hàng trên Fanpage.'},
          ]
        },
        { 
          title: 'Bước 4: Báo cáo và đánh giá',
          subsSteps: [
            {title: 'Báo cáo chi tiết: Cung cấp báo cáo chi tiết về các hạng mục đã triển khai vào cuối tháng, giúp khách hàng đánh giá hiệu quả và đưa ra những điều chỉnh cần thiết cho các chiến lược tiếp theo.'},
            {title: 'Chăm sóc: Thu thập phản hồi khách hàng để cải thiện dịch vụ, hỗ trợ khách hàng tận tâm trong suốt quá trình sử dụng.'},
          ]
        },
      ]
    }
  }
}

</script>

<style scoped>
.process {
  background-color: #f3f4f6;
  color: #1c1c4c;
  padding: 3rem 1rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.process h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 45%;
  background-color: #3222c3; /* Dark purple-blue background */
  color: white;
  margin: 0.5rem;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: fadeIn 0.8s ease-in-out;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation-fill-mode: forwards;
}

.step:nth-child(1) {
  animation-delay: 0s;
}

.step:nth-child(2) {
  animation-delay: 0.2s;
}

.step:nth-child(3) {
  animation-delay: 0.4s;
}

.step:nth-child(4) {
  animation-delay: 0.6s;
}

.step:nth-child(5) {
  animation-delay: 0.8s;
}

.step::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.step:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.step:hover::before {
  opacity: 1;
}

.step h3 {
  margin: 0; /* Remove all margins */
  padding: 0; /* Remove all paddings */
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1s steps(30, end) forwards;
}

.step p {
  margin: 0;
  position: relative;
  z-index: 2;
}

.step-number {
  font-size: 2rem;
  color: #3222c3;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.content li {
  text-align: left; /* Align substep text to the left for better readability */
  margin-bottom: 5px;
}


/* Animation in CSS */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
/* Component-specific media queries */
@media (max-width: 768px) {
  .step {
    flex: 1 1 100%;
    margin: 0.5rem 0;
    padding: 1rem;
  }

  .responsive-step-title {
    font-size: 1.2rem;
  }

  .responsive-step-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .step {
    padding: 0.5rem;
  }

  .responsive-step-title {
    font-size: 1rem;
  }

  .responsive-step-text {
    font-size: 0.8rem;
  }
}

</style>

