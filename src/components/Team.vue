<template>
  <section class="team-section">
    <div class="team-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h1 class="team-title">Our team</h1>
          </div>
          <div class="col-md-6">
            <div class="team-description">
              <p>
                The power behind our performance marketing prowess is our people; our leaders leverage a unique 
                combination of skills, experience, <br/>
                and creative problem solving to keep innovating, think bigger, 
                and provide the very best service to our partners and clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Categories -->
    <div class="team-categories">
      <div class="container">
        <h2 class="category-title">LEADERSHIP</h2>
        
        <div class="team-members">
          <div class="team-grid">
            <!-- Team Member Card (repeated for each member) -->
            <div class="team-member-card" v-for="member in teamMembers" :key="member.id">
              <div class="member-image">
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="card-image"
                />
              </div>
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-title">{{ member.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeamSection',
  data() {
    return {
      teamMembers: [
        {
          id: 1,
          name: 'Random Person',
          title: 'Head of Influencer & Affiliate',
          image: require('@/assets/testimonial1.jpg')
        },
        {
          id: 2,
          name: 'Random Person',
          title: 'Managing Director, VP Client Services',
          image: require('@/assets/testimonial2.jpg')
        },
        {
          id: 3,
          name: 'Random Person',
          title: 'CEO',
          image: require('@/assets/testimonial3.jpg')
        },
        {
          id: 4,
          name: 'Random Person',
          title: 'Senior Director | IT',
          image: require('@/assets/testimonial4.jpg')
        },
        {
          id: 5,
          name: 'Random Person',
          title: 'Senior Director | IT',
          image: require('@/assets/testimonial5.jpg')
        },
        {
          id: 6,
          name: 'Random Person',
          title: 'Senior Director | IT',
          image: require('@/assets/testimonial6.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

.team-section {
  padding: 60px 0;
  font-family: "Poppins", sans-serif;
  background: #f0f2f5;
}

.team-header {
  margin-bottom: 60px;
  padding: 0 15px;
  animation: fadeInUp 0.8s ease-in-out;
}

.team-title {
  font-size: 48px;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.2;
}

.team-description {
  font-size: 18px;
  line-height: 1.6;
  color: #4a5568;
}

.team-categories {
  padding: 40px 0;
}

.category-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  position: relative;
  letter-spacing: 1px;
}

.category-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: #007bff;
  margin: 15px auto 0;
}

.team-members {
  margin-top: 40px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.team-member-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 1s ease-in-out;
  animation-fill-mode: both;
}

.member-image {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}

.member-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.member-info {
  padding: 20px;
  text-align: left;
}

.member-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #2d3748;
}

.member-title {
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.4;
}

.card-image {
  height: 100%;
  object-fit: cover;
  width: 100%;
  object-position: 0 0;
}

.card-image:hover {
  transform: translateY(-5px);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .team-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .team-title {
    font-size: 36px;
  }
  
  .team-description {
    font-size: 16px;
  }
  
  .category-title {
    font-size: 20px;
  }
  
  .member-info {
    padding: 15px;
  }
}

@media (max-width: 576px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .team-section {
    padding: 40px 0;
  }
  
  .team-header {
    margin-bottom: 40px;
  }
}
</style>