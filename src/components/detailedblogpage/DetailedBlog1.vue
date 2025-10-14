<template>
  <div class="detailed-blog-page">
    <!-- Enhanced Quantum Background -->
    <div class="quantum-universe">
      <!-- Atomic Particles Field -->
      <div class="atomic-field">
        <div
          v-for="i in 40"
          :key="`atomic-${i}`"
          class="atomic-particle"
        />
      </div>
      
      <!-- Universe Energy Streams -->
      <div class="universe-energy">
        <div
          v-for="i in 12"
          :key="`universe-${i}`"
          class="energy-stream"
        />
      </div>
      
      <!-- Quantum Cosmic Grid -->
      <div class="cosmic-grid">
        <div
          v-for="i in 20"
          :key="`grid-${i}`"
          class="grid-node"
        />
        <div
          v-for="i in 35"
          :key="`connection-${i}`"
          class="grid-connection"
        />
      </div>
    </div>

    <!-- Use the global NavBar component -->
    
    
    <!-- Blog Content -->
    <div class="blog-container">
      <div class="blog-main">
        <!-- Hero Section -->
        <section class="blog-hero">
          <div class="hero-background">
            <div class="quantum-orb orb-1" />
            <div class="quantum-orb orb-2" />
            <div class="quantum-orb orb-3" />
            <div class="hero-particles" />
          </div>
          <div class="hero-content">
            <div class="cosmic-badge">
              <div class="badge-icon">
                ✨
              </div>
              <span>{{ $t('blog.featured') || 'Bài viết nổi bật' }}</span>
            </div>
            <h1 class="hero-title">
              <span class="title-line quantum-text">{{ $t('blog.title') || 'ESmart Solutions' }}</span>
              <span class="gradient-text">{{ $t('blog.subtitle') || 'Blog & Thông tin' }}</span>
            </h1>
            <p class="hero-description">
              {{ $t('blog.description') || 'Khám phá những xu hướng mới nhất, thông tin chi tiết và chiến lược trong marketing số, phát triển kinh doanh và đổi mới công nghệ.' }}
            </p>
          </div>
        </section>

        <!-- Categories Container with Quantum Enhancement -->
        <div class="categories-container">
          <div
            v-for="(categoryPosts, category) in groupedPosts"
            :key="category"
            class="category-section"
          >
            <h2 class="category-title quantum-title">
              <span class="category-icon">{{ getCategoryIcon(category) }}</span>
              <span class="quantum-text">{{ $t(`blog.categories.${category.toLowerCase().replace(' ', '_')}`) || category }}</span>
              <div class="title-glow" />
            </h2>
            
            <!-- Posts Grid with Quantum Cards -->
            <div class="category-posts">
              <div
                v-for="post in categoryPosts"
                :key="post.id"
                class="blog-post quantum-card"
                :data-aos="'fade-up'"
                :data-aos-delay="post.id * 100"
              >
                <div class="quantum-border" />
                <div class="post-image-container">
                  <img
                    :src="post.image"
                    :alt="post.title"
                    class="post-image"
                  >
                  <div class="image-overlay">
                    <div class="category-badge">
                      {{ $t(`blog.categories.${category.toLowerCase().replace(' ', '_')}`) || category }}
                    </div>
                  </div>
                </div>
                <div class="post-content">
                  <h3 class="post-title quantum-title">
                    {{ getTranslatedTitle(post) }}
                  </h3>
                  <p class="post-excerpt">
                    {{ getTranslatedExcerpt(post) }}
                  </p>
                  <div class="post-meta">
                    <span class="post-date">{{ formatDate(post.date) }}</span>
                    <span class="post-read-time">{{ post.readTime || '5 phút đọc' }}</span>
                  </div>
                  <router-link
                    :to="`/blog/${post.id}`"
                    class="read-more-btn quantum-button"
                  >
                    <span class="button-glow" />
                    <span class="button-text">{{ $t('blog.readMore') || 'Xem thêm' }}</span>
                    <i class="fas fa-arrow-right" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Quantum Sidebar -->
      <aside class="sidebar quantum-sidebar">
        <!-- Categories Widget -->
        <div class="widget categories-widget quantum-widget">
          <div class="widget-border" />
          <h3 class="widget-title quantum-title">
            <i class="fas fa-folder quantum-icon" />
            {{ $t('blog.categories.title') || 'Danh mục' }}
          </h3>
          <ul class="categories-list">
            <li
              v-for="category in categories"
              :key="category"
              class="category-item"
            >
              <a
                href="#"
                class="category-link quantum-link"
                @click.prevent="filterByCategory(category)"
              >
                <span class="category-icon">{{ getCategoryIcon(category) }}</span>
                <span>{{ $t(`blog.categories.${category.toLowerCase().replace(' ', '_')}`) || category }}</span>
                <span class="post-count">{{ getCategoryCount(category) }}</span>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Row for Hot Posts and Authors -->
        <div class="sidebar-double-row">
          <!-- Recent Posts Widget -->
          <div class="widget recent-posts-widget quantum-widget half-width">
            <div class="widget-border" />
            <h3 class="widget-title quantum-title">
              <i class="fas fa-fire quantum-icon" />
              Bài Hot Trong Tuần
            </h3>
            <ul class="recent-posts-list">
              <li
                v-for="post in recentPosts.slice(0,3)"
                :key="post.id"
                class="recent-post-item compact"
              >
                <div class="recent-post-content">
                  <h4 class="recent-post-title">
                    {{ getTranslatedTitle(post) }}
                  </h4>
                  <span class="recent-post-date">{{ formatDate(post.date) }}</span>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- Authors Widget -->
          <div class="widget authors-widget quantum-widget half-width">
            <div class="widget-border" />
            <h3 class="widget-title quantum-title">
              <i class="fas fa-users quantum-icon" />
              Tác Giả Nổi Bật
            </h3>
            <ul class="authors-list">
              <li
                v-for="author in ['Tình Nguyễn', 'Kim Ngọc', 'Lý Tú Nhã']"
                :key="author"
                class="author-item compact"
              >
                <div class="author-content">
                  <h4
                    class="author-name"
                  >
                    {{ author }}
                  </h4>
                  <span class="author-title">Content Writer</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter Widget -->
        <div class="widget newsletter-widget quantum-widget">
          <div class="widget-border" />
          <h3 class="widget-title quantum-title">
            <i class="fas fa-envelope quantum-icon" />
            {{ $t('blog.newsletter.title') || 'Bản tin' }}
          </h3>
          <p class="newsletter-description">
            {{ $t('blog.newsletter.description') || 'Đăng ký để nhận những thông tin mới nhất được gửi đến hộp thư của bạn.' }}
          </p>
          <form
            class="newsletter-form"
            @submit.prevent="subscribeNewsletter"
          >
            <input 
              v-model="newsletterEmail" 
              type="email" 
              :placeholder="$t('blog.newsletter.placeholder') || 'Nhập email của bạn'"
              class="newsletter-input quantum-input"
              required
            >
            <button
              type="submit"
              class="newsletter-btn quantum-button"
            >
              <span class="button-glow" />
              <i class="fas fa-paper-plane" />
            </button>
          </form>
        </div>
      </aside>
    </div>

    <!-- Use the global Footer component -->
    <AppFooter />
  </div>
</template>

<script>

import AppFooter from '@/components/FooterBar.vue';

export default {
  name: "DetailedBlog1",
  components: {
    AppFooter
  },
  data() {
    return {
      isMenuOpen: false,
      newsletterEmail: '',
      selectedCategory: null,
      posts: [
        {
          id: 1,
          category: "Digital Marketing",
          title: "Top 5 Digital Marketing Trends in 2025",
          excerpt: "Discover the cutting-edge digital marketing strategies that will dominate 2025 and beyond.",
          image: "https://via.placeholder.com/600x400?text=Digital+Marketing+Trends",
          date: new Date('2025-01-15'),
          readTime: '8 min read',
          translations: {
            vi: {
              title: "Top 5 Xu Hướng Marketing Số Năm 2025",
              excerpt: "Khám phá những chiến lược marketing số tiên tiến sẽ thống trị năm 2025 và sau này."
            }
          }
        },
        {
          id: 2,
          category: "Digital Marketing",
          title: "How to Optimize Your SEO Strategy for Maximum Impact",
          excerpt: "Learn advanced SEO techniques that will boost your search engine rankings and drive organic traffic.",
          image: "https://via.placeholder.com/600x400?text=SEO+Strategy",
          date: new Date('2025-01-12'),
          readTime: '12 min read',
          translations: {
            vi: {
              title: "Cách Tối Ưu Chiến Lược SEO Để Đạt Hiệu Quả Tối Đa",
              excerpt: "Học các kỹ thuật SEO nâng cao giúp tăng thứ hạng công cụ tìm kiếm và thu hút lưu lượng tự nhiên."
            }
          }
        },
        {
          id: 3,
          category: "Business Growth",
          title: "Scaling Your Business in a Competitive Market",
          excerpt: "Strategic approaches to sustainable business growth in today's challenging marketplace.",
          image: "https://via.placeholder.com/600x400?text=Business+Growth",
          date: new Date('2025-01-10'),
          readTime: '10 min read',
          translations: {
            vi: {
              title: "Mở Rộng Doanh Nghiệp Trong Thị Trường Cạnh Tranh",
              excerpt: "Các phương pháp chiến lược cho tăng trưởng bền vững trong thị trường đầy thách thức ngày nay."
            }
          }
        },
        {
          id: 4,
          category: "Business Growth",
          title: "Effective Leadership Strategies for Modern Teams",
          excerpt: "Master the art of leading diverse, remote, and hybrid teams in the digital age.",
          image: "https://via.placeholder.com/600x400?text=Leadership+Strategies",
          date: new Date('2025-01-08'),
          readTime: '7 min read',
          translations: {
            vi: {
              title: "Chiến Lược Lãnh Đạo Hiệu Quả Cho Đội Nhóm Hiện Đại",
              excerpt: "Thành thạo nghệ thuật lãnh đạo các đội nhóm đa dạng, từ xa và lai trong kỷ nguyên số."
            }
          }
        },
        {
          id: 5,
          category: "Technology",
          title: "The Rise of AI in Everyday Business Applications",
          excerpt: "Explore how artificial intelligence is revolutionizing business operations across industries.",
          image: "https://via.placeholder.com/600x400?text=AI+Business",
          date: new Date('2025-01-05'),
          readTime: '15 min read',
          translations: {
            vi: {
              title: "Sự Phát Triển Của AI Trong Ứng Dụng Kinh Doanh Hàng Ngày",
              excerpt: "Khám phá cách trí tuệ nhân tạo đang cách mạng hóa hoạt động kinh doanh trên các ngành."
            }
          }
        },
        {
          id: 6,
          category: "Technology",
          title: "Blockchain Technology: Beyond Cryptocurrency",
          excerpt: "Understanding the broader applications of blockchain in supply chain, healthcare, and more.",
          image: "https://via.placeholder.com/600x400?text=Blockchain+Tech",
          date: new Date('2025-01-03'),
          readTime: '11 min read',
          translations: {
            vi: {
              title: "Công Nghệ Blockchain: Vượt Ra Ngoài Tiền Điện Tử",
              excerpt: "Hiểu về các ứng dụng rộng lớn hơn của blockchain trong chuỗi cung ứng, chăm sóc sức khỏe và nhiều hơn nữa."
            }
          }
        },
      ],
    };
  },
  computed: {
    groupedPosts() {
      const filtered = this.selectedCategory 
        ? this.posts.filter(post => post.category === this.selectedCategory)
        : this.posts;
      
      return filtered.reduce((acc, post) => {
        if (!acc[post.category]) {
          acc[post.category] = [];
        }
        acc[post.category].push(post);
        return acc;
      }, {});
    },
    categories() {
      return [...new Set(this.posts.map(post => post.category))];
    },
    recentPosts() {
      return this.posts
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    }
  },
  mounted() {
    this.initializeQuantumEffects();
    this.initializeAOS();
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    getCategoryIcon(category) {
      const icons = {
        'Digital Marketing': '📈',
        'Business Growth': '🚀',
        'Technology': '💻',
        'Strategy': '🎯',
        'Innovation': '💡'
      };
      return icons[category] || '📝';
    },
    getCategoryCount(category) {
      return this.posts.filter(post => post.category === category).length;
    },
    getTranslatedTitle(post) {
      const currentLang = this.$i18n?.locale || 'en';
      return post.translations?.[currentLang]?.title || post.title;
    },
    getTranslatedExcerpt(post) {
      const currentLang = this.$i18n?.locale || 'en';
      return post.translations?.[currentLang]?.excerpt || post.excerpt;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    filterByCategory(category) {
      this.selectedCategory = this.selectedCategory === category ? null : category;
    },
    subscribeNewsletter() {
      if (this.newsletterEmail) {
        // Handle newsletter subscription
        console.log('Newsletter subscription:', this.newsletterEmail);
        this.newsletterEmail = '';
        // Show success message
      }
    },
    initializeQuantumEffects() {
      this.createAtomicParticles();
      this.createEnergyStreams();
      this.createCosmicGrid();
    },
    
    createAtomicParticles() {
      const atomicField = document.querySelector('.atomic-field');
      if (!atomicField) return;
      
      for (let i = 0; i < 40; i++) {
        const particle = document.querySelector(`.atomic-particle:nth-child(${i + 1})`);
        if (particle) {
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 15 + 's';
        }
      }
    },
    
    createEnergyStreams() {
      const universeEnergy = document.querySelector('.universe-energy');
      if (!universeEnergy) return;
      
      for (let i = 0; i < 12; i++) {
        const stream = document.querySelector(`.energy-stream:nth-child(${i + 1})`);
        if (stream) {
          stream.style.left = (i * 8.33) + '%';
          stream.style.animationDelay = Math.random() * 8 + 's';
        }
      }
    },
    
    createCosmicGrid() {
      const cosmicGrid = document.querySelector('.cosmic-grid');
      if (!cosmicGrid) return;
      
      // Position grid nodes randomly
      for (let i = 0; i < 20; i++) {
        const node = document.querySelector(`.grid-node:nth-child(${i + 1})`);
        if (node) {
          node.style.left = Math.random() * 100 + '%';
          node.style.top = Math.random() * 100 + '%';
          node.style.animationDelay = Math.random() * 4 + 's';
        }
      }
      
      // Position grid connections
      for (let i = 0; i < 35; i++) {
        const connection = document.querySelector(`.grid-connection:nth-child(${i + 21})`);
        if (connection) {
          connection.style.top = Math.random() * 100 + '%';
          connection.style.width = (Math.random() * 30 + 20) + '%';
          connection.style.left = Math.random() * 70 + '%';
          connection.style.animationDelay = Math.random() * 6 + 's';
        }
      }
    },
    initializeAOS() {
      // Initialize AOS (Animate On Scroll) if available
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100
        });
      }
    }
  },
};
</script>

<style scoped>
/* Enhanced Quantum Blog Page */
.detailed-blog-page {
  min-height: 100vh;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow-x: hidden;
}

/* Quantum Universe Background */
.quantum-universe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

/* Atomic Particles Field */
.atomic-field {
  position: absolute;
  width: 100%;
  height: 100%;
}

.atomic-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: radial-gradient(circle, #3C34B5 0%, #5A52C7 50%, transparent 100%);
  border-radius: 50%;
  animation: atomicFloat 15s infinite linear;
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
}

.atomic-particle:nth-child(2n) {
  background: radial-gradient(circle, #5A52C7 0%, #837FFF 50%, transparent 100%);
  animation-duration: 18s;
}

.atomic-particle:nth-child(3n) {
  background: radial-gradient(circle, #837FFF 0%, #3C34B5 50%, transparent 100%);
  animation-duration: 12s;
}

/* Universe Energy Streams */
.universe-energy {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-stream {
  position: absolute;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #3C34B5, transparent);
  animation: energyFlow 8s infinite linear;
  opacity: 0.2;
}

.energy-stream:nth-child(odd) {
  animation-duration: 10s;
  background: linear-gradient(180deg, transparent, #5A52C7, transparent);
}

/* Cosmic Grid */
.cosmic-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}

.grid-node {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #3C34B5;
  border-radius: 50%;
  animation: gridPulse 4s infinite ease-in-out;
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.5);
}

.grid-connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.2), transparent);
  animation: connectionFlow 6s infinite linear;
}

/* Quantum Animations */
@keyframes atomicFloat {
  0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
}

@keyframes energyFlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.5); }
}

@keyframes connectionFlow {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateX(100%); opacity: 0; }
}

/* Blog Container */
.blog-container {
  display: flex;
  max-width: 1400px;
  margin: 120px auto 2rem;
  padding: 0 2rem;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.blog-main {
  flex: 2;
  min-width: 0;
}

/* Blog Hero Section */
.blog-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.quantum-orb {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(60px);
  animation: quantumPulse 6s infinite ease-in-out;
}

.orb-1 {
  top: 10%;
  left: 10%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%);
  animation-delay: 0s;
}

.orb-2 {
  top: 60%;
  right: 10%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%);
  animation-delay: 2s;
}

.orb-3 {
  bottom: 20%;
  left: 50%;
  background: radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%);
  animation-delay: 4s;
}

.hero-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="10" r="1" fill="%23ff6b35" opacity="0.3"/><circle cx="30" cy="20" r="0.5" fill="%23f59e0b" opacity="0.5"/><circle cx="60" cy="40" r="1.5" fill="%23d97706" opacity="0.2"/></svg>') repeat;
  animation: particlesDrift 20s infinite linear;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.cosmic-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 107, 53, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 107, 53, 0.3);
  color: #3C34B5;
  font-weight: 600;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.1);
}

.badge-icon {
  font-size: 1.2rem;
  animation: badgeGlow 2s infinite ease-in-out;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.title-line {
  display: block;
  margin-bottom: 0.5rem;
}

.quantum-text {
  background: linear-gradient(135deg, #3C34B5 0%, #5A52C7 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
  animation: quantumGlow 3s infinite ease-in-out;
}

.gradient-text {
  background: linear-gradient(135deg, #5A52C7 0%, #837FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9); /* White overlay with slight transparency */
  z-index: -1;
}

.navbar-logo {
  text-align: center;
  flex: 1;
}

.logo-text {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-the {
  font-size: 1.2rem;
  font-weight: 400;
  color: #333;
}

.logo-main {
  font-size: 2.2rem;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
}

.logo-icon {
  font-size: 1.5rem;
  color: #ff0000; /* Red target icon */
  margin-left: 0.3rem;
}

.tagline {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background: #333;
  transition: all 0.3s ease;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.social-icons {
  display: flex;
  gap: 0.5rem;
}

.social-icon {
  width: 30px;
  height: 30px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.social-icon .icon {
  font-size: 1rem;
}

.social-icon:nth-child(1) .icon {
  color: #333; /* Search icon */
}

.social-icon:nth-child(2) .icon {
  color: #3b5998; /* Facebook icon */
}

.social-icon:nth-child(3) .icon {
  color: #1da1f2; /* Twitter icon */
}

.navbar-menu {
  display: none; /* Hidden by default, shown on desktop */
  gap: 1.8rem;
}

.nav-link {
  color: #333;
  font-size: 0.95rem;
  font-weight: 400;
  text-decoration: none;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
  text-decoration: underline;
}

/* Blog Content Styles */
.blog-container {
  display: flex;
  max-width: 1200px;
  margin: 120px auto 2rem; /* Adjusted for taller navbar */
  padding: 0 1rem;
  gap: 2rem;
}

.blog-main {
  flex: 3;
}

.category-section {
  margin-bottom: 3rem;
}

.category-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #007bff;
}

.category-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.blog-post {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.blog-post:hover {
  transform: translateY(-5px);
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.post-excerpt {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}



/* Categories and Posts */
.categories-container {
  margin-top: 2rem;
}

.category-section {
  margin-bottom: 4rem;
}

.category-title {
  position: relative;
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  padding: 1rem 0;
  text-align: center;
  overflow: hidden;
}

.category-title .quantum-text {
  position: relative;
  z-index: 2;
}

.category-icon {
  font-size: 2rem;
  margin-right: 1rem;
  filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 50px;
  background: rgba(255, 107, 53, 0.2);
  filter: blur(20px);
  border-radius: 50px;
  animation: titleGlow 3s infinite ease-in-out;
}

.category-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.quantum-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid rgba(255, 107, 53, 0.2);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.quantum-card:hover {
  transform: translateY(-10px);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.2),
    0 0 40px rgba(255, 107, 53, 0.2);
}

.quantum-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #3C34B5, #5A52C7, #837FFF, #3C34B5);
  border-radius: 22px;
  z-index: -1;
  opacity: 0;
  animation: borderGlow 3s infinite linear;
}

.quantum-card:hover .quantum-border {
  opacity: 1;
}

.post-image-container {
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.quantum-card:hover .post-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1rem;
}

.category-badge {
  background: rgba(255, 107, 53, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.post-content {
  color: white;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: white;
}

.post-excerpt {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.post-date, .post-read-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantum-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: rgba(255, 107, 53, 0.1);
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 50px;
  color: #3C34B5;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.quantum-button:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: #3C34B5;
  color: white;
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.quantum-button:hover .button-glow {
  left: 100%;
}

.button-text {
  position: relative;
  z-index: 2;
}

/* Quantum Sidebar */
.quantum-sidebar {
  flex: 1;
  max-width: 350px;
  min-width: 300px;
}

.quantum-widget {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 107, 53, 0.2);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.widget-border {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #3C34B5, #5A52C7, #837FFF, #3C34B5);
  border-radius: 21px;
  z-index: -1;
  opacity: 0.5;
  animation: borderGlow 4s infinite linear;
}

.widget-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.quantum-icon {
  color: #3C34B5;
  filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 0.75rem;
}

.quantum-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 107, 53, 0.1);
}

.quantum-link:hover {
  background: rgba(255, 107, 53, 0.1);
  color: white;
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.1);
}

.post-count {
  background: #3C34B5;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 25px;
  text-align: center;
}

.recent-posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-post-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 107, 53, 0.1);
}

.recent-post-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.recent-post-image {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.recent-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
}

.recent-post-content {
  flex: 1;
  min-width: 0;
}

.recent-post-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-post-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Double Row Layout for Sidebar */
.sidebar-double-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.half-width {
  flex: 1;
}

.recent-post-item.compact {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.recent-post-item.compact:last-child {
  border-bottom: none;
}

.author-item.compact {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
}

.author-item.compact:last-child {
  border-bottom: none;
}

.authors-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.author-content {
  text-align: left;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.author-title {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-description {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
}

.quantum-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.quantum-input:focus {
  outline: none;
  border-color: #3C34B5;
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.2);
}

.quantum-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-btn {
  padding: 0.75rem 1rem;
  border: none;
  cursor: pointer;
}

/* Additional Quantum Animations */
@keyframes quantumPulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
}

@keyframes quantumGlow {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
  50% { text-shadow: 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(245, 158, 11, 0.4); }
}

@keyframes badgeGlow {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.2); }
}

@keyframes titleGlow {
  0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes borderGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes particlesDrift {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-100px) translateY(-100px); }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .blog-container {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .blog-container {
    flex-direction: column;
    gap: 2rem;
    margin-top: 100px;
  }
  
  .quantum-sidebar {
    max-width: 100%;
    min-width: auto;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .category-posts {
    grid-template-columns: 1fr;
  }
  
  .quantum-card {
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .blog-container {
    padding: 0 0.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .quantum-card {
    padding: 1rem;
  }
  
  .quantum-widget {
    padding: 1.5rem;
  }
}
</style>