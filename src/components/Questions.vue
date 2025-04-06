<template>
  <div class="faq-container">
    <h1 class="faq-title">Frequently Asked Questions</h1>
    
    <div class="faq-list">
      <div 
        v-for="(item, index) in faqItems" 
        :key="index"
        class="faq-item"
      >
        <div 
          class="faq-question" 
          @click="toggleItem(index)"
          :class="{ 'active': activeIndex === index }"
        >
          <div class="faq-question-content">
            <span class="faq-number">{{ formatNumber(index + 1) }}</span>
            <span class="faq-question-text">{{ item.question }}</span>
          </div>
          <div class="faq-icon">
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
              :class="{ 'rotate': activeIndex === index }"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div 
          class="faq-answer"
          v-show="activeIndex === index"
        >
          <p>{{ item.answer }}</p>
        </div>
        <div class="faq-divider"></div>
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
          question: 'Tôi có thể yêu cầu giải pháp riêng cho doanh nghiệp của mình không?',
          answer: 'Chắc chắn rồi! Chúng tôi thiết kế các giải pháp tùy chỉnh theo nhu cầu cụ thể của từng doanh nghiệp, đảm bảo phù hợp với mục tiêu và quy mô của bạn.'
        },
        {
          question: 'Quy trình phát triển phần mềm của eSmart diễn ra như thế nào?',
          answer: 'Quy trình của chúng tôi gồm 5 bước: Phân tích yêu cầu, thiết kế giải pháp, phát triển sản phẩm, kiểm thử chất lượng, và triển khai. Chúng tôi luôn trao đổi chặt chẽ với khách hàng để đảm bảo kết quả tốt nhất.'
        },
        {
          question: 'Mất bao lâu để hoàn thành một dự án?',
          answer: 'Thời gian phụ thuộc vào độ phức tạp của dự án, nhưng trung bình từ 4 tuần đến 6 tháng. Chúng tôi sẽ cung cấp lộ trình chi tiết sau khi thảo luận yêu cầu của bạn.'
        },
        {
          question: 'Chi phí cho một dự án là bao nhiêu?',
          answer: 'Chi phí được tính dựa trên phạm vi dự án, tính năng yêu cầu, và thời gian thực hiện. Vui lòng liên hệ chúng tôi qua [email/form liên hệ] để nhận báo giá chính xác.'
        },
        {
          question: 'eSmart có hỗ trợ sau khi bàn giao sản phẩm không?',
          answer: 'Có, chúng tôi cung cấp dịch vụ bảo trì, nâng cấp, và hỗ trợ kỹ thuật dài hạn để đảm bảo giải pháp của bạn luôn hoạt động hiệu quả."'
        },
        {
          question: 'eSmart phù hợp với loại hình doanh nghiệp nào?',
          answer: '"Chúng tôi phục vụ đa dạng khách hàng, từ doanh nghiệp nhỏ, startup đến các công ty lớn trong nhiều lĩnh vực như bán lẻ, giáo dục, tài chính, và sản xuất.'
        },
        {
          question: 'Tôi không rành về công nghệ, eSmart có hỗ trợ tôi không?',
          answer: 'Hoàn toàn có! Đội ngũ của chúng tôi sẽ tư vấn và đồng hành cùng bạn từ ý tưởng đến khi hoàn thiện, không cần bạn phải am hiểu sâu về công nghệ'
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
    }
  },
  methods: {
    toggleItem(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
    formatNumber(num) {
      return num < 10 ? `0${num}` : num;
    }
  }
}
</script>

<style scoped>
.faq-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.faq-title {
  text-align: center;
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-item {
  border-bottom: 1px solid #e2e8f0;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
  color: #2b3b69;
  font-weight: 600;
  font-size: 1.5rem;
}

.faq-question-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.faq-number {
  color: #4c74db;
  margin-right: 1rem;
  font-weight: 600;
}

.faq-question-text {
  color: #2d3748;
  font-weight: 600;
  font-size: 1.25rem;
}

.faq-icon svg {
  color: #4299e1;
  transition: transform 0.3s ease;
}

.faq-icon svg.rotate {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 0 2rem 4rem;
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
}

.faq-divider {
  height: 1px;
  background-color: #e2e8f0;
  width: 100%;
}

@media (max-width: 768px) {
  .faq-title {
    font-size: 2rem;
  }
  
  .faq-question-text {
    font-size: 1.1rem;
  }
  
  .faq-answer {
    padding: 0 0 1.5rem 2.5rem;
  }
}
</style>