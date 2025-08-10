<template>
  <section class="simple-about">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Về Chúng Tôi</h2>
      </div>

      <!-- About Content -->
      <div class="about-content">
        <div class="about-text">
          <div class="text-block">
            <p class="about-description">
              ESmart Solutions - tập trung hỗ trợ các doanh nghiệp kinh doanh tăng cường khả năng tiếp cận và quảng bá sản phẩm đến khách hàng tiềm năng.
            </p>
          </div>
          
          <div class="text-block">
            <p class="about-description">
              ESmart với tôn chỉ Tôn trọng - Hiệu quả - Chuyên nghiệp, đối tác của chúng tôi sẽ thường xuyên được cập nhật thông tin, chăm sóc và đảm bảo quyền lợi từ những điều khoản nhỏ nhất.
            </p>
          </div>
          
          <div class="text-block">
            <p class="about-description">
              Sản phẩm E-Boost của chúng tôi mang đến cơ hội cho doanh nghiệp không chỉ mở rộng và tối ưu hóa hoạt động kinh doanh, mà còn nâng cao thương hiệu, góp phần phát triển hệ sinh thái các doanh nghiệp phát triển bền vững.
            </p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-number">500+</span>
            <span class="stat-label">Dự Án</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-number">98%</span>
            <span class="stat-label">Hài Lòng</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Hỗ Trợ</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-number">5+</span>
            <span class="stat-label">Năm Kinh Nghiệm</span>
          </div>
        </div>
      </div>

      <!-- Values Section -->
      <div class="values-section">
        <h3 class="values-title">Giá Trị Cốt Lõi</h3>
        
        <div class="values-grid">
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h4>Tôn Trọng</h4>
            <p>Luôn tôn trọng và lắng nghe ý kiến của khách hàng</p>
          </div>
          
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h4>Hiệu Quả</h4>
            <p>Tối ưu hóa mọi quy trình để đạt hiệu quả cao nhất</p>
          </div>
          
          <div class="value-item">
            <div class="value-icon">
              <i class="fas fa-medal"></i>
            </div>
            <h4>Chuyên Nghiệp</h4>
            <p>Đội ngũ chuyên gia với kinh nghiệm dày dặn</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleAboutUs"
};
</script>

<style scoped>
.simple-about {
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
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1rem;
}

/* About Content */
.about-content {
  margin-bottom: 4rem;
}

.about-text {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.text-block {
  margin-bottom: 2rem;
}

.about-description {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.7;
  text-align: center;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.stat-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Values Section */
.values-section {
  text-align: center;
}

.values-title {
  font-size: 2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.value-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
}

.value-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.value-icon {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.value-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
}

.value-card p {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-about {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .values-title {
    font-size: 1.5rem;
  }
  
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card,
  .value-card {
    padding: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}
</style> 