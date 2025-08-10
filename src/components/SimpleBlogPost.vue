<template>
  <section class="simple-blog">
    <div class="container">
      <!-- Simple Title -->
      <div class="section-header">
        <h2 class="section-title">Tin Tức & Blog</h2>
        <p class="section-subtitle">Cập nhật những thông tin mới nhất về digital marketing</p>
      </div>

      <!-- Simple Blog Grid -->
      <div class="blog-grid">
        <article
          v-for="(blog, index) in blogs.slice(0, 6)"
          :key="index"
          class="blog-card"
          @click="navigateToBlogPost(blog.url)"
        >
          <div class="blog-image">
            <img
              :src="blog.image || getDefaultImage()"
              :alt="blog.title"
              @error="handleImageError"
            >
          </div>
          
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-date">{{ formatDate(blog.publishedAt) }}</span>
              <span class="blog-category">{{ blog.category || "News" }}</span>
            </div>
            
            <h3 class="blog-title">{{ blog.title }}</h3>
            <p class="blog-excerpt">{{ blog.excerpt || blog.description }}</p>
            
            <div class="blog-footer">
              <div class="blog-author">
                <img
                  :src="blog.authorImage || getDefaultAuthorImage()"
                  :alt="blog.author"
                  class="author-avatar"
                  @error="handleImageError"
                >
                <span class="author-name">{{ blog.author || "ESmart Team" }}</span>
              </div>
              
              <div class="blog-stats">
                <span class="blog-likes">
                  <i class="fas fa-heart"></i>
                  {{ blog.likes || 0 }}
                </span>
                <span class="blog-comments">
                  <i class="fas fa-comment"></i>
                  {{ blog.comments || 0 }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- View More Button -->
      <div class="blog-actions">
        <button class="view-more-btn" @click="navigateToBlogPost('/blog')">
          Xem Thêm Bài Viết
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import blogData from './crawl/blogs.json';
import { ImageMixin } from '@/utils/imageUtils';

export default {
  name: "SimpleBlogPost",
  mixins: [ImageMixin],
  data() {
    return {
      blogs: (blogData || []).map(blog => ({
        ...blog,
        likes: blog.likes !== undefined ? blog.likes : Math.floor(Math.random() * 5),
        comments: blog.comments !== undefined ? blog.comments : Math.floor(Math.random() * 3)
      }))
    };
  },
  methods: {
    navigateToBlogPost(url) {
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    
    handleImageError(event) {
      if (event.target.closest('.author-avatar')) {
        this.handleImageError(event, 'avatar');
      } else {
        this.handleImageError(event, 'blog');
      }
    },
    
    getDefaultImage() {
      return this.getFallbackImage('blog', '300x160');
    },
    
    getDefaultAuthorImage() {
      return this.getFallbackImage('avatar');
    },
    
    // Preload blog images
    async preloadBlogImages() {
      const imageUrls = this.blogs.slice(0, 6)
        .map(blog => blog.image)
        .filter(Boolean);
      
      if (imageUrls.length > 0) {
        await this.preloadImages(imageUrls);
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Recent';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    }
  },
  
  async mounted() {
    // Preload blog images for better performance
    await this.preloadBlogImages();
  }
};
</script>

<style scoped>
/* Magical Blog Animations */
.simple-blog {
  background: #f8f8f8;
  color: black;
  padding: 4rem 2rem;
  position: relative;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.magical-blog-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  animation: blogCardSlide 1s ease-out backwards;
}

.magical-blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  transition: left 0.8s ease;
  z-index: 1;
}

.magical-blog-card:hover::before {
  left: 100%;
}

.magical-blog-card:hover {
  transform: translateY(-20px) rotateX(10deg) scale(1.03);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.blog-image {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.blog-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.magical-blog-card:hover .blog-image::after {
  opacity: 1;
}

.blog-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.blog-category {
  background: black;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
  animation: categoryPulse 2s ease-in-out infinite;
}

.blog-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: black;
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.magical-blog-card:hover .blog-title {
  color: #333;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  animation: metaSlideIn 1s ease-out 0.3s backwards;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e5e5e5;
  animation: avatarRotate 4s linear infinite;
}

.blog-stats {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #333;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.stat-item:hover {
  color: black;
  transform: scale(1.1);
}

/* View More Button */
.magical-view-more {
  text-align: center;
  margin-top: 3rem;
}

.view-more-btn {
  background: black;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: buttonFloat 3s ease-in-out infinite;
}

.view-more-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.view-more-btn:hover::before {
  width: 300px;
  height: 300px;
}

.view-more-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* Animation Keyframes */
@keyframes blogCardSlide {
  from {
    opacity: 0;
    transform: translateX(-50px) rotateY(-15deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotateY(0);
  }
}

@keyframes categoryPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes metaSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes avatarRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes buttonFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.simple-blog {
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

.section-subtitle {
  font-size: 1.1rem;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.blog-card:hover {
  border-color: #ccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.blog-date {
  font-size: 0.8rem;
  color: #333;
}

.blog-category {
  font-size: 0.8rem;
  background: #f0f0f0;
  color: black;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.blog-excerpt {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 0.8rem;
  color: #333;
  font-weight: 500;
}

.blog-stats {
  display: flex;
  gap: 1rem;
}

.blog-likes,
.blog-comments {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #333;
}

.blog-actions {
  text-align: center;
}

.view-more-btn {
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

.view-more-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-blog {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .blog-content {
    padding: 1rem;
  }
}
</style> 