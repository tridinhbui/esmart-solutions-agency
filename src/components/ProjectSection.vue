<template>
    <section class="features-section">
      <h2>Our Awesome Features</h2>
      <h1>Buy Choicy & Enjoy Some Exclusive Features</h1>
      <div class="features-container">
        <div class="feature-item" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon">
            <img :src="feature.icon" :alt="feature.title">
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
          { title: 'Elementor Page Builder', icon: '@/assets/elementor-icon.png' },
          { title: 'Woocommerce Ready', icon: '@/assets/woocommerce-icon.png' },
          { title: 'Support WPML Multilingual', icon: '@/assets/wpml-icon.png' },
          { title: 'Video Documentation', icon: '@/assets/video-icon.png' },
          { title: 'Unlimited Colors Option', icon: '@/assets/colors-icon.png' },
          // Add more features as needed
        ]
      };
    }
  }
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

.feature-icon img {
  width: 60%;
  height: auto;
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
