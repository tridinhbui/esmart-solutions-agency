<!-- <template>
  <div>
    <h1>See How Your Business Stacks Up</h1>
    <p>
      Gain insights into your Facebook performance and elevate it with NexGen's
      social media check-up. Assess your call center's operations and receive
      tailored recommendations and statistics through a brief questionnaire for
      an operational analysis.
    </p>
    <button @click="goToSocialMediaCheckup">Click Here</button>
  </div>
</template>

<script>
export default {
  name: "DetailedBlog1",
  methods: {
    goToSocialMediaCheckup() {
      // Add logic to navigate to the social media checkup page
    },
  },
};
</script>

<style scoped></style> -->

<template>
  <section class="about">
    <h2>Về chúng tôi</h2>
    <p>
      ESmart Solutions - tập trung hỗ trợ các doanh nghiệp kinh doanh tăng cường
      khả năng tiếp cận và quảng bá sản phẩm đến khách hàng tiềm năng.
    </p>

    <p>
      ESmart với tôn chỉ Tôn trọng - Hiệu quả - Chuyên nghiệp, đối tác của chúng
      tôi sẽ thường xuyên được cập nhật thông tin, chăm sóc và đảm bảo quyền lợi
      từ những điều khoản nhỏ nhất.
    </p>
    <p>
      Sản phẩm E-Boost của chúng tôi mang đến cơ hội cho doanh nghiệp không chỉ
      mở rộng và tối ưu hóa hoạt động kinh doanh, mà còn nâng cao thương hiệu,
      góp phần phát triển hệ sinh thái các doanh nghiệp phát triển bền vững.
    </p>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about {
  background-color: #1c1c4c;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
}

.about::after {
  content: "";
  /* background-image: url("@/assets/about-pattern.png"); */
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.key-values {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: key-value-pop 0.5s ease-in-out forwards;
}

@keyframes key-value-pop {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.key-value {
  text-align: center;
  padding: 1rem;
}

.key-value h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.key-value p {
  font-size: 14px;
  color: #ccc;
}
</style>
