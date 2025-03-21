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
          question: 'What does a web design agency do?',
          answer: 'A web design agency grows your brand online by bringing a team of experts together to create a custom site that is optimized for SEO and drives higher conversions for more leads and increased sales. A custom website starts with a strategy and planning before going into design and development. The designs need to be responsive to ensure a good user experience on both mobile and desktop devices.'
        },
        {
          question: 'What is the difference between web design and web development?',
          answer: 'Web design focuses on the visual aspects of a website including layout, colors, typography, and user experience. Web development involves the actual coding and programming that makes the website function. Design is about how it looks and feels, while development is about how it works.'
        },
        {
          question: 'Why is responsive web design important?',
          answer: 'Responsive web design is crucial because it ensures your website looks and functions well on all devices, from desktops to smartphones. With mobile traffic accounting for over 50% of web traffic, having a responsive site improves user experience, boosts SEO rankings, and increases conversion rates.'
        },
        {
          question: 'How long does it take to design a website?',
          answer: 'The timeline for designing a website typically ranges from 4-12 weeks depending on the complexity, number of pages, and specific requirements. A simple informational website might take 4-6 weeks, while a complex e-commerce site could take 8-12 weeks or more.'
        },
        {
          question: 'How much should I expect to pay for web design?',
          answer: 'Web design costs vary widely based on project scope, complexity, and the expertise of the agency. Small business websites typically range from $5,000 to $15,000, while larger corporate sites or e-commerce platforms can cost $20,000 to $50,000+. Ongoing maintenance and updates are additional considerations.'
        },
        {
          question: 'How can you help me generate leads after my website is launched?',
          answer: 'After launch, we can help generate leads through search engine optimization (SEO), content marketing, paid advertising campaigns, email marketing, social media strategies, and conversion rate optimization. We also offer analytics tracking to measure performance and make data-driven improvements.'
        },
        {
          question: 'Do you offer website redesign services?',
          answer: 'Yes, we offer comprehensive website redesign services. This includes evaluating your current site, identifying areas for improvement, and implementing modern design principles, improved functionality, and better user experience while preserving your brand identity and SEO value.'
        },
        {
          question: 'Will my website be mobile-friendly?',
          answer: 'Absolutely. All websites we design are fully responsive and mobile-friendly by default. We test on multiple devices and screen sizes to ensure optimal performance and user experience across all platforms, from smartphones and tablets to desktop computers.'
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