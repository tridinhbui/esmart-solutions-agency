<template>
  <v-app>
    <section class="services-section">
      <h1>Providing Global VIP Customer Care to our clients' most valuable asset: their customers</h1>
      <v-btn class="services-button" color="primary">Services</v-btn>
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
        { title: 'Customer Care & Technical Solutions', category: 'Services', icon: 'mdi-headset' },
        { title: 'Email & Chat', category: 'Customer Service', icon: 'mdi-email' },
        { title: 'Social Media Customer Care', category: 'Services', icon: 'mdi-twitter' },
        { title: 'Social Media Management', category: 'Services', icon: 'mdi-instagram' },
        { title: 'Reputation & Crisis Management', category: 'Services', icon: 'mdi-shield' },
        { title: 'Consulting', category: 'Services', icon: 'mdi-lightbulb' }
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
  background: linear-gradient(135deg, #1a3263, #6f4a8e); /* Gradient of blue ocean and purple */
  color: white;
  border-radius: 15px;
  overflow: hidden;
  margin: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 350px;
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
}
</style>
