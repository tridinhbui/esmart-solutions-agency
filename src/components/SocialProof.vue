<template>
  <section class="social-proof-testimonials">
    <h2>Social Media</h2>
    <div class="socials animate-slideIn">
      <div
        class="social-item animate-float"
        v-for="social in socialMedia"
        :key="social.name"
      >
        <img :src="getImageUrl(social.icon)" :alt="social.name" />
        <p>{{ social.description }}</p>
      </div>
    </div>
    <h2>Khách hàng nói gì về chúng tôi</h2>
    <div class="testimonials-container animate-fadeIn">
      <div
        class="testimonial-card animate-float"
        v-for="(testimonial, index) in testimonials"
        :key="index"
      >
        <img
          :src="getImageUrl(testimonial.image)"
          :alt="testimonial.name"
          class="avatar"
        />
        <h3>{{ testimonial.name }}</h3>
        <h4>{{ testimonial.title }}</h4>
        <div class="stars">
          <i class="fas fa-star" v-for="n in 5" :key="n"></i>
        </div>
        <p class="testimonial-text">{{ testimonial.text }}</p>
      </div>
    </div>
    <h2>ESmart Solutions - Dịch vụ hỗ trợ tối ưu</h2>
    <div class="toolkit animate-slideIn">
      <div
        class="toolkit-item animate-float"
        v-for="(item, index) in toolkit"
        :key="index"
        @click="openModal(item)"
      >
        <i :class="item.icon"></i>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>

    <!-- Modal for toolkit details -->
    <v-dialog v-model="isModalOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ selectedItem.title }}</v-card-title>
        <v-card-text>
          <p>{{ selectedItem.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isModalOpen = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: "SocialProofTestimonials",
  data() {
    return {
      isModalOpen: false,
      selectedItem: {},
      socialMedia: [
        {
          name: "Facebook",
          icon: "facebook.png",
          description: "Hơn 1,000,000 lượt tiếp cận Facebook",
        },
        {
          name: "Instagram",
          icon: "instagram.png",
          description: "Nội dung hấp dẫn trên Instagram",
        },
        {
          name: "LinkedIn",
          icon: "linkedin.png",
          description: "Kết nối chuyên nghiệp trên Linkedin ",
        },
        {
          name: "TikTok",
          icon: "tiktok.png",
          description: "Tạo xu hướng thịnh hành trên TikTok",
        },
      ],
      testimonials: [
        {
          name: "Lê Khánh Linh - Đối tác hợp tác toàn diện",
          title: "Nhà sáng lập thương hiệu thời trang xanh Mỵ",
          image: "testimonial2.jpg",
          text: "Tôi đã đồng ý lựa chọn sản phẩm hỗ trợ truyền thông đa kênh toàn diện ngay lần gặp mặt đầu tiên. Đội ngũ ESmart Solutions tuy trẻ tuổi nhưng có quy trình và cách thức làm việc rất chuyên nghiệp, rõ ràng. Ngoài ra, sản phẩm của ESmart mang ý nghĩa nhân văn và giá cả phải chăng.",
        },
        {
          name: "Tạ Việt Dũng",
          title: "Đối tác hợp tác toàn diện",
          image: "testimonial1.jpg",
          text: "Ban đầu, mục tiêu của chúng tôi là xuất khẩu sản phẩm sang Mỹ và châu Âu, ít quan tâm đến các kênh truyền thông tại Việt Nam. Tuy nhiên, sau khi xem xét hồ sơ hợp tác với ESmart Solutions, chúng tôi đã quyết định hợp tác vì sự rõ ràng trong kế hoạch truyền thông và giá cả hợp lý. Thông qua E-Boost, chúng tôi đặt mục tiêu đưa ống hút VietStraw đến các nhà hàng trên Châu Âu và Bắc Mỹ.",
        },
        {
          name: "Nguyễn Thu Huyền",
          title: "CEO Thời Trang Mimi Organic",
          image: "testimonial3.jpg",
          text: "Mimi - Doanh nghiệp thời trang hữu cơ đạt chứng nhận dệt may hữu cơ toàn cầu (GOTS) - đối tác lựa chọn hợp tác toàn diện cùng ESmart Solutions, sử dụng tất cả các dịch vụ từ truyền thông đa kênh, thương mại điện tử, công nghệ thông tin,…",
        },
        {
          name: "Bác sĩ My",
          title: "CEO -KinderHealth",
          image: "testimonial4.jpg",
          text: "ESmart Solutions là một đối tác trẻ, năng động và mang lại giá trị cho Kinderhealth. Hợp tác với ESmart trong việc quản lý và phát triển trang Facebook và hài lòng kết quả mà team đã đem lại.",
        },
        {
          name: "Phan Minh Tuấn",
          title: "Giám đốc Marketing tại Công ty Công Nghệ FTech",
          image: "testimonial4.jpg",
          text: "Chúng tôi đã rất ấn tượng với cách ESmart Solutions tiếp cận và giải quyết các vấn đề truyền thông của chúng tôi. Đội ngũ chuyên nghiệp và tận tâm, cùng với sự sáng tạo trong các giải pháp truyền thông đã giúp chúng tôi gia tăng hiệu quả quảng cáo và mở rộng thị trường. ESmart thực sự là một đối tác đáng tin cậy trong hành trình phát triển thương hiệu của chúng tôi.",
        },
        {
          name: "Hà Anh Thư",
          title: "Founder và Giám đốc điều hành Tinh Tế Café",
          image: "testimonial4.jpg",
          text: "Khi bắt đầu hợp tác với ESmart Solutions, chúng tôi mong muốn tạo ra một hình ảnh thương hiệu độc đáo và nổi bật cho Tinh Tế Café. Đội ngũ ESmart đã vượt qua mong đợi của chúng tôi với những ý tưởng sáng tạo và giải pháp truyền thông hiệu quả. Họ không chỉ giúp nâng cao nhận diện thương hiệu mà còn tăng cường sự kết nối với khách hàng mục tiêu. Chúng tôi rất hài lòng với kết quả đạt được.",
        },
      ],
      toolkit: [
        {
          title: "Giải pháp quản lý truyền thông số đa kênh",
          description:
            "Esmart Solutions cung cấp giải pháp quản lý truyền thông số đa kênh - Omnichannel Saving Digital Marketing - trên các nền tảng như Facebook, Instagram, Website, TikTok, Thương mại điện tử,...",
          icon: "fas fa-palette",
        },
        {
          title: "Xây dựng kế hoạch Marketing tích hợp",
          description:
            "Chúng tôi hỗ trợ bạn xây dựng kế hoạch Marketing tích hợp, triển khai đa kênh dựa theo hành trình khách hàng để tăng tỷ lệ chuyển đổi.",
          icon: "fas fa-tags",
        },
        {
          title: "Hỗ trợ đa kênh và quản lý mạng xã hội",
          description:
            "Esmart Solutions giúp bạn quản lý mạng xã hội và truyền thông số kênh một cách hiệu quả, tạo ra trải nghiệm khách hàng tốt nhất.",
          icon: "fas fa-heart",
        },
        {
          title: "Xây dựng từ 2 Năm Kinh nghiệm",
          description:
            "Esmart Solutions được xây dựng trên nền tảng trong lĩnh vực quảng cáo và quản lý truyền thông số kênh.",
          icon: "fas fa-cogs",
        },
      ],
    };
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
    openModal(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    });
    document
      .querySelectorAll(".animate-slideIn, .animate-fadeIn")
      .forEach((el) => {
        observer.observe(el);
      });
  },
};
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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

.social-proof-testimonials {
  background: linear-gradient(135deg, #1c1c4c, #0077b6);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.socials {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.social-item {
  margin: 0.5rem;
  text-align: center;
  flex: 1 1 20%;
}

.social-item img {
  height: 50px;
}

.social-item p {
  margin-top: 0.5rem;
}

.testimonials-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.testimonial-card {
  background: white;
  color: black; /* Ensure text is visible on white background */
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.testimonial-card img.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.stars {
  color: #ffd700;
  margin: 0.5rem 0;
}

.testimonial-text {
  margin-top: 0.5rem;
}

.toolkit {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.toolkit-item {
  background: white;
  color: black; /* Ensure text is visible on white background */
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
  cursor: pointer; /* Indicate that the cards are clickable */
}

.toolkit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.toolkit-item i {
  font-size: 2rem;
  color: #0077b6;
  margin-bottom: 0.5rem;
}

.toolkit-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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

@keyframes float {
  0% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.animate-slideIn {
  animation: slideIn 1s ease-in-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .social-item,
  .testimonial-card,
  .toolkit-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
