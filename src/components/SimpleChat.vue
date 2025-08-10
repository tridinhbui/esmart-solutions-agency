<template>
  <section class="simple-contact">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Liên Hệ Với Chúng Tôi</h2>
        <p class="section-subtitle">Sẵn sàng hỗ trợ bạn 24/7. Hãy để lại thông tin để được tư vấn miễn phí!</p>
      </div>

      <div class="contact-content">
        <!-- Magical Contact Form -->
        <div class="contact-form magical-card magical-3d-hover">
          <h3 class="form-title magical-text magical-glow">Gửi Tin Nhắn</h3>
          
          <form @submit.prevent="submitForm" class="form">
            <div class="form-row">
              <div class="form-group slide-in-left stagger-1">
                <label class="form-label">Họ và tên</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-input magical-input"
                  placeholder="Nhập họ và tên"
                  required
                >
              </div>
              
              <div class="form-group slide-in-right stagger-2">
                <label class="form-label">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-input magical-input"
                  placeholder="Nhập email"
                  required
                >
              </div>
            </div>
            
            <div class="form-group fade-in-up stagger-3">
              <label class="form-label">Số điện thoại</label>
              <input
                v-model="form.phone"
                type="tel"
                class="form-input magical-input"
                placeholder="Nhập số điện thoại"
              >
            </div>
            
            <div class="form-group scale-in stagger-4">
              <label class="form-label">Chủ đề</label>
              <select v-model="form.subject" class="form-select magical-select" required>
                <option value="">Chọn chủ đề</option>
                <option value="consultation">Tư vấn dịch vụ</option>
                <option value="quote">Báo giá dự án</option>
                <option value="support">Hỗ trợ kỹ thuật</option>
                <option value="partnership">Hợp tác kinh doanh</option>
                <option value="other">Khác</option>
              </select>
            </div>
            
            <div class="form-group flip-in stagger-5">
              <label class="form-label">Tin nhắn</label>
              <textarea
                v-model="form.message"
                class="form-textarea magical-textarea"
                rows="5"
                placeholder="Nhập tin nhắn của bạn..."
                required
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn magical-btn magical-pulse ripple" :disabled="!isFormValid">
              <span>Gửi Tin Nhắn</span>
            </button>
          </form>
        </div>

        <!-- Magical Contact Info -->
        <div class="contact-info magical-card bounce-in">
          <h3 class="info-title magical-text">Thông Tin Liên Hệ</h3>
          
          <div class="info-items">
            <div class="info-item slide-in-left stagger-1" v-for="(info, index) in contactInfo" :key="index">
              <div class="info-icon magical-glow">
                <i :class="info.icon"></i>
              </div>
              <div class="info-content">
                <h4>{{ info.title }}</h4>
                <p>{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Magical Social Links -->
          <div class="contact-social">
            <h4 class="social-title magical-text">Theo Dõi Chúng Tôi</h4>
            <div class="social-links">
              <a href="#" class="social-link magical-hover rotate-in stagger-1">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="social-link magical-hover rotate-in stagger-2">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-link magical-hover rotate-in stagger-3">
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="#" class="social-link magical-hover rotate-in stagger-4">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleChat",
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      contactInfo: [
        {
          icon: 'fas fa-map-marker-alt',
          title: this.$t?.("contact.address") || "Địa chỉ",
          value: this.$t?.("contact.addressValue") || "123 Nguyễn Văn A, Quận 1, TP.HCM"
        },
        {
          icon: 'fas fa-phone',
          title: this.$t?.("contact.phoneTitle") || "Điện thoại", 
          value: this.$t?.("contact.phoneValue") || "+84 123 456 789"
        },
        {
          icon: 'fas fa-envelope',
          title: this.$t?.("contact.emailTitle") || "Email",
          value: this.$t?.("contact.emailValue") || "contact@esmart.vn"
        },
        {
          icon: 'fas fa-clock',
          title: this.$t?.("contact.hours") || "Giờ làm việc",
          value: this.$t?.("contact.hoursValue") || "T2-T6: 8:00-18:00, T7: 8:00-12:00"
        }
      ]
    };
  },
  computed: {
    isFormValid() {
      return this.form.name && this.form.email && this.form.subject && this.form.message;
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        console.log("Form submitted:", this.form);
        
        // Add magical success animation
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.classList.add('magical-success');
        
        setTimeout(() => {
          alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.");
          submitBtn.classList.remove('magical-success');
          
          // Reset form with animation
          this.form = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          };
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
.simple-contact {
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

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Contact Form */
.contact-form {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
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
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: black;
}

.submit-btn {
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #333;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Contact Info */
.contact-info {
  background: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  margin-bottom: 2rem;
  text-align: center;
}

.info-items {
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-icon {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  flex-shrink: 0;
}

.info-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.25rem;
}

.info-content p {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
}

/* Social Links */
.contact-social {
  text-align: center;
}

.social-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: black;
  color: white;
  border-color: black;
}

/* Magical Form Animations */
.magical-input,
.magical-select,
.magical-textarea {
  position: relative;
  transition: all 0.4s ease;
  border: 2px solid #e5e5e5;
}

.magical-input:focus,
.magical-select:focus,
.magical-textarea:focus {
  border-color: black;
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: inputGlow 0.6s ease-out;
}

@keyframes inputGlow {
  0% { box-shadow: 0 0 0 rgba(0, 0, 0, 0); }
  50% { box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
  100% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); }
}

.magical-success {
  animation: successPulse 1s ease-out;
  background: #28a745 !important;
}

@keyframes successPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Enhanced Contact Info */
.info-item {
  animation: infoSlideIn 0.8s ease-out backwards;
}

@keyframes infoSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-contact {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-form,
  .contact-info {
    padding: 1.5rem;
  }
}
</style> 