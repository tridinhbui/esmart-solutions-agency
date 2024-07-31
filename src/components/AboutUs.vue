<template>
  <section class="about">
    <h2>Về chúng tôi</h2>
    <p>
ESmart Solutions, với sứ mệnh tập trung hỗ trợ các doanh nghiệp kinh doanh tăng cường khả năng tiếp cận và quảng bá sản phẩm của mình đến khách hàng tiềm năng. Với đội ngũ hơn 20 thành viên đến từ trên 7 tỉnh thành, ESmart Solutions đã tiếp cận gần 600.000 người thông qua hơn 200+ ấn phẩm kể từ lúc bắt đầu triển khai các chiến dịch truyền thông. ESmart Solutions còn được rót vốn đầu tư và trực tiếp tư vấn, hỗ trợ chiến lược bởi quỹ đầu tư Doanh nhân và Sáng tạo Macalester, Macalester Entrepreneurship and Innovation Fund, tới từ thành phố Saint Paul, bang Minnesota, Hoa Kỳ.

Đội ngũ thành viên của ESmart luôn đặt tôn chỉ Tôn trọng - Hiệu quả - Chuyên nghiệp lên hàng đầu khi làm việc. Vì vậy, đối tác của chúng tôi sẽ thường xuyên được cập nhật thông tin, chăm sóc và đảm bảo quyền lợi từ những điều khoản nhỏ nhất. Chúng tôi tin rằng sản phẩm E-Boost của chúng tôi là cơ hội để Quý Doanh nghiệp không chỉ mở rộng và tối ưu hoạt động kinh doanh mà còn có thể nâng tầm thương hiệu của chính mình và góp phần chung tay xây dựng hệ sinh thái các doanh nghiệp đang phát triển.
</p>
    <p>Chúng tôi tin rằng sản phẩm E-Boost của chúng tôi mang đến cơ hội cho doanh nghiệp quý giá của bạn không chỉ mở rộng và tối ưu hóa hoạt động kinh doanh mà còn nâng cao thương hiệu của bạn và góp phần phát triển hệ sinh thái kinh doanh đang phát triển.</p>
  </section>
</template>

<script>
export default {
  name: 'AboutUs'
}
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