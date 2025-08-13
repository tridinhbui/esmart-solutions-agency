<template>
  <footer class="simple-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Company Section -->
        <div class="company-section">
          <div class="footer-logo">
            <span class="logo-text">ESmart</span>
            <span class="logo-subtitle">Solutions</span>
          </div>
          <p class="footer-description">
            Tạo ra những giải pháp số sáng tạo cho doanh nghiệp hiện đại
          </p>
          <div class="social-links">
            <a
              href="#"
              class="social-link"
            >
              <i class="fab fa-facebook" />
            </a>
            <a
              href="#"
              class="social-link"
            >
              <i class="fab fa-instagram" />
            </a>
            <a
              href="#"
              class="social-link"
            >
              <i class="fab fa-linkedin" />
            </a>
          </div>
        </div>

        <!-- Links Grid -->
        <div class="links-grid">
          <div class="link-group">
            <h4>Dịch Vụ</h4>
            <ul>
              <li><a href="#web-dev">Web Development</a></li>
              <li><a href="#mobile">Mobile Apps</a></li>
              <li><a href="#marketing">Digital Marketing</a></li>
            </ul>
          </div>

          <div class="link-group">
            <h4>Tài Nguyên</h4>
            <ul>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#case-studies">Case Studies</a></li>
            </ul>
          </div>

          <div class="link-group">
            <h4>Liên Hệ</h4>
            <div class="contact-simple">
              <p>contact@esmart.vn</p>
              <p>+84 123 456 789</p>
              <p>Ho Chi Minh City</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2024 ESmart Solutions. All rights reserved.
        </p>
        <div class="bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
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
  background: linear-gradient(135deg, #0f1629 0%, #1e3a8a 100%);
  color: #ffffff;
  padding: 2rem 2rem 0;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-bottom: 0.5rem;
  align-items: start;
}

.company-section {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #93c5fd;
  letter-spacing: 2px;
  margin-top: 2px;
}

.footer-description {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #e2e8f0;
  line-height: 1.7;
  margin: 1.5rem 0;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.social-link {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  transform: translateY(-1px);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}

.link-group h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.25rem;
  letter-spacing: 0.3px;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-group ul li {
  margin-bottom: 0.75rem;
}

.link-group ul a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 400;
  line-height: 1.5;
}

.link-group ul a:hover {
  color: #ffffff;
  padding-left: 4px;
}

.contact-simple p {
  font-size: 0.95rem;
  color: #e2e8f0;
  font-weight: 400;
  margin-bottom: 0.75rem;
  line-height: 1.5;
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

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
}

.bottom-links {
  display: flex;
  gap: 2rem;
}

.bottom-links a {
  font-size: 0.9rem;
  color: #94a3b8;
  text-decoration: none;
  font-weight: 400;
  transition: all 0.3s ease;
}

.bottom-links a:hover {
  color: #ffffff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-footer {
    padding: 2rem 1.5rem 0;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
  
  .company-section {
    text-align: center;
  }
  
  .footer-description {
    max-width: none;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style> 