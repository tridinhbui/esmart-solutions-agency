<template>
  <v-app>
    <section class="services-section">
      <h1>Chúng tôi cung cấp dịch vụ chăm sóc khách hàng toàn cầu, giúp đối tác xây dựng và duy trì mối quan hệ với khách hàng của mình.
</h1>
      
      <div class="services-container">
        <v-card
          v-for="(service, index) in services"
          :key="index"
          class="service-card"
        >
          <v-icon class="service-icon">{{ service.icon }}</v-icon>
          <v-card-title>{{ service.title }}</v-card-title>
          <v-card-subtitle>{{ service.category }}</v-card-subtitle>
        </v-card>
      </div>
    </section>
  </v-app>
</template>

<script>
export default {
  name: 'ServicesSection',
  data() {
    return {
      services: [
        { title: 'Chăm sóc khách hàng & Giải pháp kỹ thuật', category: 'Services', icon: 'mdi-headset' },
        { title: 'Email & Trò chuyện trực tuyến', category: 'Customer Service', icon: 'mdi-email' },
        { title: 'Chăm sóc khách hàng trên mạng xã hội', category: 'Services', icon: 'mdi-twitter' },
        { title: 'Quản lý mạng xã hội', category: 'Services', icon: 'mdi-instagram' },
        { title: 'Quản lý thương hiệu & Xử lý khủng hoảngt', category: 'Services', icon: 'mdi-shield' },
        { title: 'Dịch vụ tư vấn chiến lược', category: 'Services', icon: 'mdi-lightbulb' }
      ]
    };
  }
};
</script>

<style scoped>
@import '~vuetify/styles';

.services-section {
  background: url('@/assets/bg.jpg') no-repeat center center fixed; 
  background-size: cover;
  color: white;
  text-align: center;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
}

.services-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.services-section h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: heading-slide-up 1s ease-in-out;
}

.services-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff4b5c;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: button-slide-up 1s ease-in-out;
  text-align: center;
}

.services-button:hover {
  background-color: #e03e4e;
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.services-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.service-card {
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #1a3263, #6f4a8e); /* Gradient of blue ocean and purple */
  color: white;
  border-radius: 25px;
  overflow: hidden;
  margin: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 350px;
  height: 125px; /* Adjust height as needed */
  opacity: 0;
  transform: translateY(50px);
  animation: card-slide-up 1s ease-in-out forwards;
}

.service-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.service-card img {
  width: 100%;
  height: auto;
}

@keyframes heading-slide-up {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes button-slide-up {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes card-slide-up {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .services-section h1 {
    font-size: 2rem;
  }

  .services-button {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  .service-card {
    width: 100%;
    margin: 1rem 0;
  }
  .service-card .service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}
  
}
</style>

