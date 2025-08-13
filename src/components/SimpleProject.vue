<template>
  <section class="simple-projects">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">
          Dự Án Nổi Bật
        </h2>
        <p class="section-subtitle">
          Khám phá những dự án thành công của chúng tôi
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <div class="project-image">
            <img 
              :src="project.image" 
              :alt="project.title"
              @error="handleImageError"
            >
            <div class="project-overlay">
              <button class="modern-btn">
                Xem Chi Tiết
              </button>
            </div>
          </div>
          
          <div class="project-content">
            <div class="project-meta">
              <span class="project-category">{{ project.category }}</span>
              <span class="project-year">{{ project.year }}</span>
            </div>
            
            <h3 class="project-title">
              {{ project.title }}
            </h3>
            <p class="project-description">
              {{ project.description }}
            </p>
            
            <div class="project-tech">
              <span
                v-for="(tech, techIndex) in project.technologies"
                :key="techIndex"
                class="tech-tag"
                :style="{ animationDelay: (techIndex * 0.1) + 's' }"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="projects-actions">
        <button class="modern-btn secondary">
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
/* Clean Project Section */
.simple-projects {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  color: #e0f2fe;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 20px rgba(255, 255, 255, 0.3);
}

.section-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #bfdbfe;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #1e3a8a;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  animation: projectSlideIn 0.8s ease-out backwards;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(30, 58, 138, 0.2);
  border-color: #3b82f6;
}

.project-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
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
  background: rgba(30, 58, 138, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project-btn {
  background: #ffffff;
  color: #1e3a8a;
  border: 2px solid #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(20px);
}

.project-card:hover .view-project-btn {
  transform: translateY(0);
}

.view-project-btn:hover {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
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
  background: #1e3a8a;
  color: #ffffff;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.project-year {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.project-description {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  font-size: 0.75rem;
  background: #f1f5f9;
  color: #1e3a8a;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-weight: 500;
  transition: all 0.3s ease;
  animation: techTagPop 0.5s ease-out backwards;
}

.tech-tag:hover {
  background: #1e3a8a;
  color: #ffffff;
  transform: scale(1.05);
}

.projects-actions {
  text-align: center;
}

.view-all-btn {
  background: #ffffff;
  color: #1e3a8a;
  border: 2px solid #1e3a8a;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #1e3a8a;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
}

/* Animation Keyframes */
@keyframes projectSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes techTagPop {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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
    gap: 1.5rem;
  }
  
  .project-content {
    padding: 1.25rem;
  }
  
  .project-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .project-title {
    font-size: 1.1rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
}
</style> 