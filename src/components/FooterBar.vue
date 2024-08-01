<template>
  <nav class="footer-bar">
    <div class="footer-content">
      <div class="footer-brand">ESmart Solutions</div>
      <div class="description">Hiệu quả - Tôn trọng - Chuyên nghiệp.</div>
    </div>
    <div class="subscribe">
      <label for="Email-4" class="subscribetous">Đăng kí với chúng tôi</label>
      <div class="subscribe-box">
        <input class="footer-text-field w-input" maxlength="256" name="Email-4" data-name="Email 4" placeholder="Đăng nhập bằng email" type="email" id="Email-4" required="">
        <input type="submit" data-wait="Please wait..." class="button footer-form-button w-button" value="Đăng kí">
      </div>
    </div>
    <div class="footer-items">
      <ul class="footer-items2">  <!-- First column -->
        <li><a href="#intro">Trang chủ</a></li>
        <li><a href="#about-us">Về chúng tôi</a></li>
        <li><a href="#process">Sản phẩm</a></li>
      </ul>
      <ul class="footer-items2">  <!-- Second column -->
        <li><a href="#contact">Liên hệ</a></li>
        <li><a href="#social-proof">Thành tựu</a></li>
        <li><a href="#blog">Blog</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'FooterBar',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap');

.footer-bar {
  background-color: #0F1F3D;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  flex-wrap: wrap;
  font-family: 'Space Grotesk', sans-serif;
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
}

.footer-brand {
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.description {
  font-size: 1rem;
  color: gray;
}

.subscribe {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;
}

.subscribetous {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.subscribe-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.footer-text-field {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #000;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-right: 0.5rem;
}

.footer-form-button {
  background-color: #145aff;
  color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.footer-form-button:hover {
  background-color: #0a47c3;
}

.footer-items {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.footer-items2 {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 0;
}

.footer-items2 li {
  padding: 0.5rem 0;
}

.footer-items2 li a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-items2 li a:hover {
  color: #145aff;
}

@media (max-width: 985px) {
  .footer-bar {
    flex-direction: column;
    align-items: center;
  }

  .footer-content, .subscribe, .footer-items {
    width: 100%;
  }

  .subscribe-box {
    flex-direction: column;
    align-items: center;
  }

  .footer-text-field, .footer-form-button {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 768px) {
  .footer-bar {
    padding: 1rem;
  }

  .footer-brand {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .footer-bar {
    padding: 1rem;
  }

  .footer-brand {
    font-size: 1.25rem;
  }

  .description {
    font-size: 0.75rem;
  }
}
</style>
