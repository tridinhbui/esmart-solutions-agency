<template>
  <section class="social-proof-testimonials">
    <h2>Social Proof</h2>
    <div class="socials animate-slideIn">
      <div class="social-item" v-for="social in socialMedia" :key="social.name">
        <img :src="social.icon" :alt="social.name">
        <p>{{ social.description }}</p>
      </div>
    </div>
    <h2>What Customers Are Saying About Our Support Team</h2>
    <div class="testimonials-container animate-fadeIn">
      <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
        <img :src="testimonial.image" :alt="testimonial.name" class="avatar">
        <h3>{{ testimonial.name }}</h3>
        <h4>{{ testimonial.title }}</h4>
        <div class="stars">
          <i class="fas fa-star" v-for="n in 5" :key="n"></i>
        </div>
        <p class="testimonial-text">{{ testimonial.text }}</p>
      </div>
    </div>
    <h2>ESmart Solutions Offers The Ultimate Toolkit</h2>
    <div class="toolkit animate-slideIn">
      <div class="toolkit-item" v-for="(item, index) in toolkit" :key="index">
        <i :class="item.icon"></i>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SocialProofTestimonials',
  data() {
    return {
      socialMedia: [
        { name: 'Facebook', icon: '@/assets/facebook.png', description: 'Over 1,000,000 followers on Facebook' },
        { name: 'Instagram', icon: '@/assets/instagram.png', description: 'Engaging content on Instagram' },
        { name: 'LinkedIn', icon: '@/assets/linkedin.png', description: 'Professional connections on LinkedIn' },
        { name: 'TikTok', icon: '@/assets/tiktok.png', description: 'Viral trends on TikTok' }
      ],
      testimonials: [
        {
          name: 'Krishnam Raju',
          title: 'CEO of XYZ',
          image: '@/assets/testimonial1.jpg',
          text: 'The best WordPress framework ever. No doubt about it. You will shout with joy. Get it and you\'ll become a lifelong fan.'
        },
        {
          name: 'Zamir Gomeh',
          title: 'Marketing Head',
          image: '@/assets/testimonial2.jpg',
          text: 'Without a doubt the best service and support. Elegant Themes is without a doubt the best service and support I\'ve ever met. The level of willingness to crack and solve problems that arise is above and beyond all expectations. They do this professionally until the customer is fully satisfied. Highly recommend.'
        },
        {
          name: 'Howard Blount',
          title: 'Web Developer',
          image: '@/assets/testimonial3.jpg',
          text: 'Elegant Themes Support ROCKS! I own a website, but I am not a developer and know nothing about coding. Whenever I have a Divi update or customization need, Elegant Themes support always helps me and resolves my issues. I have worked with some of the support techs for so long that we feel like we know each other.'
        },
        {
          name: 'Christiane Weigel',
          title: 'Product Manager',
          image: '@/assets/testimonial4.jpg',
          text: 'Perfect in product and support. The Themes Divi and Extra are really professional and easy to use. But simply the best is the support. Always friendly, highest quality solutions and fast in requests. Perfect to work with. Thanks.'
        }
      ],
      toolkit: [
        { title: 'Complete Design System', description: 'You have complete control using Divi\'s Visual Builder and Theme Builder, enhanced by many workflow-boosting design features.', icon: 'fas fa-palette' },
        { title: 'Unbeatable Pricing', description: 'Build unlimited websites with a single Divi membership and give access to your team members for a fraction of the cost.', icon: 'fas fa-tags' },
        { title: 'Hundreds Of Extensions', description: 'Extend the power of Divi with hundreds of free and premium extensions from the Divi Marketplace.', icon: 'fas fa-puzzle-piece' },
        { title: 'Your Clients Will Love It', description: 'Hand off websites to your clients that are easy to manage and edit, with full control over client permissions.', icon: 'fas fa-heart' },
        { title: 'Cloud-Based Collaboration', description: 'All of your team’s design assets are available in Divi Cloud so new websites take shape in no time.', icon: 'fas fa-cloud' },
        { title: 'Built With 16 Years Of Experience', description: 'Divi is built on a foundation of 16 years of WordPress theme building experience. It’s the most reliable and complete toolkit.', icon: 'fas fa-cogs' }
      ]
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });
    document.querySelectorAll('.animate-slideIn, .animate-fadeIn').forEach((el) => {
      observer.observe(el);
    });
  }
}
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.social-proof-testimonials {
  background: linear-gradient(135deg, #1c1c4c, #0077b6);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.socials {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideIn 1.5s ease-in-out;
  margin-bottom: 2rem;
}

.social-item {
  margin: 0.5rem;
  text-align: center;
  flex: 1 1 20%;
}

.social-item img {
  height: 50px;
}

.social-item p {
  margin-top: 0.5rem;
}

.testimonials-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1.5s ease-in-out;
}

.testimonial-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 20%;
  max-width: 20%;
  text-align: left;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.testimonial-card img.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.stars {
  color: #ffd700;
  margin: 0.5rem 0;
}

.testimonial-text {
  margin-top: 0.5rem;
}

.toolkit {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  animation: slideIn 1.5s ease-in-out;
}

.toolkit-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 30%;
  max-width: 30%;
  text-align: left;
}

.toolkit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.toolkit-item i {
  font-size: 2rem;
  color: #0077b6;
  margin-bottom: 0.5rem;
}

.toolkit-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .social-item, .testimonial-card, .toolkit-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
