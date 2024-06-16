<template>
    <section class="services-section">
      <h1>Providing Global VIP Customer Care to our clients' most valuable asset: their customers</h1>
      <button class="services-button">Services</button>
      <div class="services-container">
        <div class="service-card" v-for="(service, index) in services" :key="index">
          <img :src="service.image" :alt="service.title">
          <div class="service-content">
            <h2>{{ service.title }}</h2>
            <p>{{ service.category }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesSection',
    data() {
      return {
        services: [
          { title: 'Customer Care & Technical Solutions', category: 'Services', image: '@/assets/customer-care.jpg' },
          { title: 'Email & Chat', category: 'Customer Service', image: '@/assets/email-chat.jpg' },
          { title: 'Social Media Customer Care', category: 'Services', image: '@/assets/social-media.jpg' },
          { title: 'Social Media Management', category: 'Services', image: '@/assets/social-media-management.jpg' },
          { title: 'Reputation & Crisis Management', category: 'Services', image: '@/assets/reputation-crisis.jpg' },
          { title: 'Consulting', category: 'Services', image: '@/assets/consulting.jpg' }
        ]
      };
    }
  }
  </script>

<style scoped>
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
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
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
  background: white;
  color: black;
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

.service-card:nth-child(1) {
  animation-delay: 0.2s;
}

.service-card:nth-child(2) {
  animation-delay: 0.4s;
}

.service-card:nth-child(3) {
  animation-delay: 0.6s;
}

.service-card:nth-child(4) {
  animation-delay: 0.8s;
}

.service-card:nth-child(5) {
  animation-delay: 1s;
}

.service-card:nth-child(6) {
  animation-delay: 1.2s;
}

.service-card img {
  width: 100%;
  height: auto;
}

.service-card .service-content {
  padding: 1.5rem;
}

.service-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.service-card p {
  color: #666;
  font-size: 1.1rem;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
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

  