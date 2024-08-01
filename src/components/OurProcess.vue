<template>
  <section class="process">
    <h2>Quy trình của chúng tôi</h2>
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index" @click="openModal(step)">
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

    <!-- Modal for step details -->
    <v-dialog v-model="isModalOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ selectedStep.title }}</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="(subStep, subIndex) in selectedStep.subsSteps" :key="subIndex">
              {{ subStep.title }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isModalOpen = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: 'ProcessInt',
  data() {
    return {
      isModalOpen: false,
      selectedStep: {},
      steps: [
        { 
          title: 'Bước 1: Tư vấn và lập kế hoạch',
          subsSteps: [
            {title: 'Phân tích thị trường - khách hàng mục tiêu.'},
            {title: 'Xây dựng customer insight'},
            {title: 'Lên kế hoạch triển khai theo tháng, có mục tiêu rõ ràng.'},
          ]
        },
        { 
          title: 'Bước 2: Ký kết hợp đồng',
          subsSteps: [
            {title: 'Ký hợp đồng với gói dịch vụ phù hợp, đảm bảo điều khoản đều minh bạch, rõ ràng.'},
          ]
        },
        { 
          title: 'Bước 3: Triển khai Dịch vụ',
          subsSteps: [
            {title: 'Tạo nhóm trao đổi và giám sát công việc.'},
            {title: 'Lên kế hoạch nội dung hàng tháng, trình khách hàng phê duyệt.'},
            {title: 'Thiết kế hình ảnh, sản xuất video, triển khai các chiến dịch quảng cáo'},
          ]
        },
        { 
          title: 'Bước 4: Báo cáo và đánh giá',
          subsSteps: [
            {title: 'Báo cáo kết quả cuối tháng, đưa ra điều chỉnh cần thiết'},
            {title: 'Thu thập phản hồi khách hàng, hỗ trợ khách hàng trong quá trình sử dụng.'},
          ]
        },
      ]
    }
  },
  methods: {
    openModal(step) {
      this.selectedStep = step;
      this.isModalOpen = true;
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
  cursor: pointer; /* Add cursor pointer to indicate clickability */
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
  padding: 0 15px; /* Ensure padding inside cards */
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
    font-size: 1rem;
  }

  .responsive-step-text {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .step {
    padding: 0.4rem;
  }

  .responsive-step-title {
    font-size: 0.8rem;
  }

  .responsive-step-text {
    font-size: 0.6rem;
  }
}
</style>
