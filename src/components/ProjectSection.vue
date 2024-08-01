
<template>
  <section class="features-section">
    <h2>Phát triển website</h2>
    <h1>Cùng Esmart trải nghiệm những tính năng đặc biệt</h1>
    <div class="features-container">
      <div class="feature-item" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <i :class="feature.icon"></i>
        </div>
        <p>{{ feature.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection',
  data() {
    return {
      features: [
        { title: 'Trình tạo trang Elementor', icon: 'fas fa-cogs' },
        { title: 'Tích hợp sẵn Woocommerce', icon: 'fas fa-shopping-cart' },
        { title: 'Hỗ trợ WPML Đa ngôn ngữ', icon: 'fas fa-globe' },
        { title: 'Tài liệu hướng dẫn bằng video', icon: 'fas fa-video' },
        { title: 'Tùy chọn màu sắc không giới hạn', icon: 'fas fa-paint-brush' },
        // Add more features as needed
      ]
    };
  }
};
</script>

<style scoped>
.features-section {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f8f9fa;
}

.features-section h2 {
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.features-section h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.features-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  max-width: 150px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.feature-icon {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.feature-icon i {
  font-size: 2.5rem;
  color: #333;
}

.feature-item p {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.feature-item:hover .feature-icon {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2), 0 12px 24px rgba(0,0,0,0.2);
}
</style>
```

In this example, I've replaced the image tags with Font Awesome icons using the `i` tag and the class names provided by Font Awesome. I've also adjusted the CSS to style the icons and add a 3D float effect on hover. You can customize the icon classes and styles as needed for your project.