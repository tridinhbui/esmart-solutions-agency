<template>
  <section class="simple-projects">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Dự Án Nổi Bật</h2>
        <p class="section-subtitle">Khám phá những dự án thành công của chúng tôi</p>
      </div>

      <!-- Magical Projects Grid -->
      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="magical-project-card magical-card-enhanced ethereal-float"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <div class="project-image nebula-bg">
            <div class="project-overlay mystical-glow">
              <button class="view-project-btn enchanted-btn">
                Xem Chi Tiết
              </button>
            </div>
          </div>
          
          <div class="project-content spectral-shimmer">
            <div class="project-header">
              <span class="project-category holographic-text">{{ project.category }}</span>
              <span class="project-year cosmic-pulse">{{ project.year }}</span>
            </div>
            
            <h3 class="project-title dimensional-shift">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-tech">
              <span
                v-for="(tech, techIndex) in project.technologies"
                :key="techIndex"
                class="tech-tag astral-projection"
                :style="{ animationDelay: (techIndex * 0.1) + 's' }"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="magical-view-more">
        <button class="view-more-btn">
          Xem Tất Cả Dự Án
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleProject",
  data() {
    return {
      projects: [
        {
          title: "E-commerce Platform",
          description: "Nền tảng thương mại điện tử hiện đại với tích hợp thanh toán",
          category: "Web Development",
          year: "2024",
          image: "https://via.placeholder.com/400x250.png?text=E-commerce",
          technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"]
        },
        {
          title: "Digital Marketing Campaign",
          description: "Chiến dịch marketing tăng 300% lượt truy cập website",
          category: "Marketing",
          year: "2024",
          image: "https://via.placeholder.com/400x250.png?text=Marketing",
          technologies: ["Google Ads", "Facebook Ads", "SEO", "Analytics"]
        },
        {
          title: "Brand Identity Design",
          description: "Thiết kế nhận diện thương hiệu hoàn chỉnh cho startup",
          category: "Branding",
          year: "2023",
          image: "https://via.placeholder.com/400x250.png?text=Branding",
          technologies: ["Illustrator", "Photoshop", "Figma", "Brand Guide"]
        },
        {
          title: "Mobile App Development",
          description: "Ứng dụng di động với hơn 10K+ downloads",
          category: "Mobile",
          year: "2023",
          image: "https://via.placeholder.com/400x250.png?text=Mobile+App",
          technologies: ["React Native", "Firebase", "Redux", "Push Notifications"]
        },
        {
          title: "SEO Optimization Project",
          description: "Tối ưu SEO giúp website lên TOP 3 Google",
          category: "SEO",
          year: "2024",
          image: "https://via.placeholder.com/400x250.png?text=SEO",
          technologies: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"]
        },
        {
          title: "Corporate Website",
          description: "Website doanh nghiệp với CMS quản lý nội dung",
          category: "Corporate",
          year: "2023",
          image: "https://via.placeholder.com/400x250.png?text=Corporate",
          technologies: ["WordPress", "Custom Theme", "ACF", "WooCommerce"]
        }
      ]
    };
  },
  methods: {
    viewProject(project) {
      console.log("Viewing project:", project.title);
      // Implement project detail view
    },
    viewAllProjects() {
      console.log("View all projects");
      // Navigate to projects page
    },
    getDefaultImage() {
      return 'https://via.placeholder.com/400x250.png?text=Project+Image';
    },
    handleImageError(event) {
      event.target.src = this.getDefaultImage();
    }
  }
};
</script>

<style scoped>
/* Magical Project Animations */
.simple-projects {
  background: white;
  color: black;
  padding: 4rem 2rem;
  position: relative;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.magical-project-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  animation: projectSlideIn 1s ease-out backwards;
  perspective: 1000px;
}

.magical-project-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  animation: projectRotate 20s linear infinite;
  z-index: -1;
}

.magical-project-card:hover {
  transform: translateY(-25px) rotateX(15deg) rotateY(5deg) scale(1.05);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 100%;
  height: 250px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.project-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), transparent, rgba(0, 0, 0, 0.1));
  opacity: 0;
  transition: all 0.6s ease;
}

.magical-project-card:hover .project-image::after {
  opacity: 1;
  animation: imageShimmer 1s ease-in-out;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.magical-project-card:hover .project-overlay {
  opacity: 1;
}

.view-project-btn {
  background: white;
  color: black;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(20px);
  transition: all 0.4s ease;
  animation: btnBounce 0.6s ease-out 0.2s both;
}

.magical-project-card:hover .view-project-btn {
  transform: translateY(0);
}

.project-content {
  padding: 2rem;
  position: relative;
}

.project-category {
  background: black;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
  animation: categoryGlow 2s ease-in-out infinite;
}

.project-year {
  color: #333;
  font-size: 0.9rem;
  margin-left: 1rem;
  animation: yearFade 1s ease-out 0.5s backwards;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
  animation: titleWave 1s ease-out 0.3s backwards;
}

.project-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  animation: descFadeIn 1s ease-out 0.6s backwards;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #f0f0f0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: techTagPop 0.5s ease-out backwards;
}

.tech-tag:hover {
  background: black;
  color: white;
  transform: scale(1.1) rotate(5deg);
}

/* Animation Keyframes */
@keyframes projectSlideIn {
  from {
    opacity: 0;
    transform: translateY(60px) rotateX(-30deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes projectRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes imageShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes btnBounce {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes categoryGlow {
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); }
}

@keyframes yearFade {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes titleWave {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes descFadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes techTagPop {
  from {
    opacity: 0;
    transform: scale(0) rotate(180deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.project-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project-btn {
  background: white;
  color: black;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.view-project-btn:hover {
  background: #f0f0f0;
}

.project-content {
  padding: 1.5rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-category {
  font-size: 0.8rem;
  background: #f0f0f0;
  color: black;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.project-year {
  font-size: 0.8rem;
  color: #333;
}

.project-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.project-description {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-size: 0.7rem;
  background: #f8f8f8;
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
}

.projects-actions {
  text-align: center;
}

.view-all-btn {
  background: black;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-projects {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .project-content {
    padding: 1rem;
  }
  
  .project-image {
    height: 200px;
  }
}
</style> 