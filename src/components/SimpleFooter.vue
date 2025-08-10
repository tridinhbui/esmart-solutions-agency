<template>
  <footer class="simple-footer">
    <div class="footer-container">
      <!-- Footer Content -->
      <div class="footer-content">
        <!-- Company Info -->
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-text">ESmart</span>
            <span class="logo-subtitle">Solutions</span>
          </div>
          <p class="footer-description">
            ESmart Solutions - tập trung hỗ trợ các doanh nghiệp kinh doanh tăng cường khả năng tiếp cận và quảng bá sản phẩm đến khách hàng tiềm năng.
          </p>
          <div class="social-links">
            <a href="#" class="social-link">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="#" class="social-link">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Trang Chủ</router-link></li>
            <li><router-link to="/#about-us">Về Chúng Tôi</router-link></li>
            <li><router-link to="/#project">Sản Phẩm</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>

          </ul>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h3 class="footer-title">Services</h3>
          <ul class="footer-links">
            <li><a href="#marketing-assessment">Đánh Giá</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#process">Process</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>contact@esmart.vn</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <span>+84 123 456 789</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Ho Chi Minh City, Vietnam</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © 2024 ESmart Solutions. All rights reserved.
          </p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SimpleFooter"
};
</script>

<style scoped>
.simple-footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 3rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid #333;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* Footer Logo */
.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  line-height: 1;
}

.logo-subtitle {
  font-size: 0.8rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: -2px;
}

.footer-description {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Social Links */
.social-links {
  display: flex;
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

/* Footer Titles */
.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: black;
  transform: translateX(5px);
}

.debug-link {
  color: #ff6b6b !important;
  font-weight: bold;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.debug-link:hover {
  opacity: 1;
  color: #ff5252 !important;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}

.contact-item i {
  width: 16px;
  color: black;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 1.5rem;
  color: #888;
  font-size: 0.9rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.8rem;
  color: #333;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  font-size: 0.8rem;
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: black;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style> 