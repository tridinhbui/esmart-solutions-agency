<template>
  <div class="detailed-blog-page">
    <!-- Use the global NavBar component -->
    <NavBar />
    
    <!-- Blog Content -->
    <div class="blog-container">
      <div class="blog-main">
        <!-- Hero Section -->
        <section class="blog-hero">
          <div class="hero-background">
            <div class="gradient-orb orb-1"></div>
            <div class="gradient-orb orb-2"></div>
            <div class="particles"></div>
          </div>
          <div class="hero-content">
            <div class="badge">
              <div class="badge-icon">📚</div>
              <span>{{ $t('blog.featured') || 'Featured Blog' }}</span>
            </div>
            <h1 class="hero-title">
              <span class="title-line">{{ $t('blog.title') || 'ESmart Solutions' }}</span>
              <span class="gradient-text">{{ $t('blog.subtitle') || 'Blog & Insights' }}</span>
            </h1>
            <p class="hero-description">
              {{ $t('blog.description') || 'Discover the latest trends, insights, and strategies in digital marketing, business growth, and technology innovation.' }}
            </p>
          </div>
        </section>

        <!-- Loop through each category -->
        <div class="categories-container">
          <div v-for="(categoryPosts, category) in groupedPosts" :key="category" class="category-section">
            <h2 class="category-title">
              <span class="category-icon">{{ getCategoryIcon(category) }}</span>
              <span>{{ $t(`blog.categories.${category.toLowerCase().replace(' ', '_')}`) || category }}</span>
            </h2>
            <!-- Loop through posts in this category -->
            <div class="category-posts">
              <div v-for="post in categoryPosts" :key="post.id" class="blog-post" :data-aos="'fade-up'" :data-aos-delay="post.id * 100">
                <div class="post-image-container">
                  <img :src="post.image" :alt="post.title" class="post-image" />
                  <div class="post-overlay">
                    <div class="post-category-badge">{{ category }}</div>
                  </div>
                </div>
                <div class="post-content">
                  <h3 class="post-title">{{ getTranslatedTitle(post) }}</h3>
                  <p class="post-excerpt">{{ getTranslatedExcerpt(post) }}</p>
                  <div class="post-meta">
                    <span class="post-date">{{ formatDate(post.date) }}</span>
                    <span class="post-read-time">{{ post.readTime || '5 min read' }}</span>
                  </div>
                  <router-link :to="`/blog/${post.id}`" class="read-more-btn">
                    <span>{{ $t('blog.readMore') || 'Read More' }}</span>
                    <i class="fas fa-arrow-right"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Sidebar -->
      <aside class="sidebar">
        <div class="widget categories-widget">
          <h3 class="widget-title">
            <i class="fas fa-folder"></i>
            {{ $t('blog.categories.title') || 'Categories' }}
          </h3>
          <ul class="categories-list">
            <li v-for="category in categories" :key="category" class="category-item">
              <a href="#" @click.prevent="filterByCategory(category)" class="category-link">
                <span class="category-icon">{{ getCategoryIcon(category) }}</span>
                <span>{{ $t(`blog.categories.${category.toLowerCase().replace(' ', '_')}`) || category }}</span>
                <span class="post-count">{{ getCategoryCount(category) }}</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="widget recent-posts-widget">
          <h3 class="widget-title">
            <i class="fas fa-clock"></i>
            {{ $t('blog.recentPosts') || 'Recent Posts' }}
          </h3>
          <ul class="recent-posts-list">
            <li v-for="post in recentPosts" :key="post.id" class="recent-post-item">
              <div class="recent-post-image">
                <img :src="post.image" :alt="post.title" />
              </div>
              <div class="recent-post-content">
                <h4 class="recent-post-title">{{ getTranslatedTitle(post) }}</h4>
                <span class="recent-post-date">{{ formatDate(post.date) }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="widget newsletter-widget">
          <h3 class="widget-title">
            <i class="fas fa-envelope"></i>
            {{ $t('blog.newsletter.title') || 'Newsletter' }}
          </h3>
          <p class="newsletter-description">
            {{ $t('blog.newsletter.description') || 'Subscribe to get the latest insights delivered to your inbox.' }}
          </p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <input 
              type="email" 
              v-model="newsletterEmail" 
              :placeholder="$t('blog.newsletter.placeholder') || 'Enter your email'"
              class="newsletter-input"
              required
            />
            <button type="submit" class="newsletter-btn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </aside>
    </div>

    <!-- Use the global Footer component -->
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/FooterBar.vue';

export default {
  name: "DetailedBlog1",
  components: {
    NavBar,
    Footer
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
    this.createParticles();
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
    createParticles() {
      const particlesContainer = document.querySelector('.particles');
      if (!particlesContainer) return;
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particlesContainer.appendChild(particle);
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
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

/* Navigation Bar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('https://via.placeholder.com/1200x200?text=World+Map+Background') center/cover no-repeat;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 100px; /* Increased height to accommodate logo and tagline */
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

/* Sidebar Styles */
.sidebar {
  flex: 1;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
}

.widget {
  margin-bottom: 2rem;
}

.widget h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.widget ul {
  list-style: none;
}

.widget ul li {
  margin-bottom: 0.5rem;
}

.widget ul li a {
  color: #333;
  text-decoration: none;
}

.widget ul li a:hover {
  color: #007bff;
  text-decoration: underline;
}

/* Footer Styles */
.footer {
  background: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

.footer-links {
  margin-bottom: 1rem;
}

.footer-links a {
  color: #fff;
  margin: 0 1rem;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (min-width: 769px) {
  .navbar {
    justify-content: space-between;
    align-items: center;
  }

  .hamburger {
    display: none;
  }

  .navbar-logo {
    flex: none;
    text-align: left;
  }

  .navbar-menu {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .social-icons {
    flex: none;
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    height: auto;
    padding: 1rem;
  }

  .navbar-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .navbar-menu.active {
    display: flex;
  }

  .nav-link {
    padding: 0.5rem 0;
    font-size: 1rem;
  }

  .blog-container {
    margin-top: 140px; /* Adjusted for mobile navbar height */
  }

  .category-posts {
    grid-template-columns: 1fr;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .logo-the {
    font-size: 1rem;
  }

  .logo-main {
    font-size: 1.8rem;
  }

  .logo-icon {
    font-size: 1.2rem;
  }

  .tagline {
    font-size: 0.8rem;
  }

  .social-icon {
    width: 25px;
    height: 25px;
  }

  .social-icon .icon {
    font-size: 0.9rem;
  }
}
</style>