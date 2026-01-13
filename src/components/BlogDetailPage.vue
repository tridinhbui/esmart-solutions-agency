<template>
  <div class="blog-detail-page">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="loading-container"
    >
      <div class="spinner" />
      <p>Loading blog...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="error-container"
    >
      <i class="fas fa-exclamation-circle" />
      <h2>{{ error }}</h2>
      <button
        class="back-btn"
        @click="$router.push('/blog')"
      >
        <i class="fas fa-arrow-left" />
        Back to Blogs
      </button>
    </div>

    <!-- Blog Content -->
    <article
      v-else-if="blog"
      class="blog-article"
    >
      <!-- Hero Section -->
      <div class="blog-hero">
        <div class="hero-overlay" />
        <div
          v-if="blog.coverImage"
          class="hero-image"
          :style="{ backgroundImage: `url(${blog.coverImage})` }"
        />
        
        <div class="hero-content">
          <div class="breadcrumb">
            <router-link to="/blog">
              <i class="fas fa-home" /> Blog
            </router-link>
            <span>/</span>
            <span
              v-if="blog.category"
              class="category-badge"
            >
              {{ blog.category }}
            </span>
          </div>

          <h1 class="blog-title">
            {{ blog.title }}
          </h1>

          <div class="blog-meta">
            <div class="meta-item">
              <i class="fas fa-user" />
              <span>{{ blog.author }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-calendar" />
              <span>{{ formatDate(blog.publishedAt) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye" />
              <span>{{ blog.views }} views</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock" />
              <span>{{ readingTime }} min read</span>
            </div>
          </div>

          <div
            v-if="blog.tags && blog.tags.length > 0"
            class="blog-tags"
          >
            <span
              v-for="tag in blog.tags"
              :key="tag"
              class="tag"
            >
              <i class="fas fa-tag" />
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="blog-container">
        <div class="blog-content">
          <!-- Excerpt -->
          <div
            v-if="blog.excerpt"
            class="blog-excerpt"
          >
            <i class="fas fa-quote-left" />
            <p>{{ blog.excerpt }}</p>
          </div>

          <!-- Content -->
          <div
            class="blog-body"
            v-html="formatContent(blog.content)"
          />

          <!-- Author Info -->
          <div class="author-card">
            <div class="author-avatar">
              <i class="fas fa-user-circle" />
            </div>
            <div class="author-info">
              <h3>About the Author</h3>
              <h4>{{ blog.author }}</h4>
              <p v-if="blog.authorEmail">
                <i class="fas fa-envelope" />
                {{ blog.authorEmail }}
              </p>
            </div>
          </div>

          <!-- Share Section -->
          <div class="share-section">
            <h3>Share this article</h3>
            <div class="share-buttons">
              <button
                class="share-btn facebook"
                @click="shareOnFacebook"
              >
                <i class="fab fa-facebook-f" />
                Facebook
              </button>
              <button
                class="share-btn twitter"
                @click="shareOnTwitter"
              >
                <i class="fab fa-twitter" />
                Twitter
              </button>
              <button
                class="share-btn linkedin"
                @click="shareOnLinkedIn"
              >
                <i class="fab fa-linkedin-in" />
                LinkedIn
              </button>
              <button
                class="share-btn copy"
                @click="copyLink"
              >
                <i class="fas fa-link" />
                {{ copied ? 'Copied!' : 'Copy Link' }}
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="blog-navigation">
            <button
              v-if="previousBlog"
              class="nav-btn prev"
              @click="navigateToBlog(previousBlog.slug)"
            >
              <i class="fas fa-chevron-left" />
              <div class="nav-content">
                <span class="nav-label">Previous</span>
                <span class="nav-title">{{ previousBlog.title }}</span>
              </div>
            </button>
            <button
              v-if="nextBlog"
              class="nav-btn next"
              @click="navigateToBlog(nextBlog.slug)"
            >
              <div class="nav-content">
                <span class="nav-label">Next</span>
                <span class="nav-title">{{ nextBlog.title }}</span>
              </div>
              <i class="fas fa-chevron-right" />
            </button>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="blog-sidebar">
          <!-- Related Posts -->
          <div
            v-if="relatedBlogs.length > 0"
            class="sidebar-card"
          >
            <h3>Related Articles</h3>
            <div class="related-posts">
              <article
                v-for="relatedBlog in relatedBlogs"
                :key="relatedBlog.id"
                class="related-post"
                @click="navigateToBlog(relatedBlog.slug)"
              >
                <img
                  v-if="relatedBlog.coverImage"
                  :src="relatedBlog.coverImage"
                  :alt="relatedBlog.title"
                >
                <div class="related-content">
                  <h4>{{ relatedBlog.title }}</h4>
                  <p class="related-date">
                    <i class="fas fa-calendar" />
                    {{ formatDate(relatedBlog.publishedAt) }}
                  </p>
                </div>
              </article>
            </div>
          </div>

          <!-- Categories -->
          <div
            v-if="categories.length > 0"
            class="sidebar-card"
          >
            <h3>Categories</h3>
            <div class="category-list">
              <button
                v-for="category in categories"
                :key="category"
                class="category-item"
                @click="filterByCategory(category)"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Popular Tags -->
          <div
            v-if="popularTags.length > 0"
            class="sidebar-card"
          >
            <h3>Popular Tags</h3>
            <div class="tags-list">
              <button
                v-for="tag in popularTags"
                :key="tag.tag"
                class="tag-item"
                @click="filterByTag(tag.tag)"
              >
                {{ tag.tag }}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BlogDetailPage',
  data() {
    return {
      blog: null,
      relatedBlogs: [],
      categories: [],
      popularTags: [],
      previousBlog: null,
      nextBlog: null,
      loading: false,
      error: null,
      copied: false,
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    readingTime() {
      if (!this.blog || !this.blog.content) return 0;
      const wordsPerMinute = 200;
      const wordCount = this.blog.content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    },
    apiBaseUrl() {
      return process.env.VUE_APP_API_BASE_URL || 'http://localhost:3001';
    },
  },
  watch: {
    '$route.params.slug'(newSlug) {
      if (newSlug) {
        this.fetchBlog();
      }
    },
  },
  mounted() {
    this.fetchBlog();
    this.fetchCategories();
    this.fetchTags();
  },
  methods: {
    async fetchBlog() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(
          `${this.apiBaseUrl}/api/blog/${this.slug}?incrementViews=true`
        );

        if (response.data.success) {
          this.blog = response.data.data;
          this.fetchRelatedBlogs();
          this.fetchAdjacentBlogs();
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        if (error.response?.status === 404) {
          this.error = 'Blog not found';
        } else {
          this.error = 'Failed to load blog. Please try again later.';
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchRelatedBlogs() {
      if (!this.blog) return;

      try {
        const params = {
          status: 'published',
          limit: 3,
          sortBy: 'publishedAt',
          sortOrder: 'DESC',
        };

        // Try to get blogs with same category or tags
        if (this.blog.category) {
          params.category = this.blog.category;
        }

        const response = await axios.get(`${this.apiBaseUrl}/api/blog`, { params });

        if (response.data.success) {
          // Filter out current blog
          this.relatedBlogs = response.data.data.filter(
            b => b.id !== this.blog.id
          ).slice(0, 3);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    },

    async fetchAdjacentBlogs() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/blog`, {
          params: {
            status: 'published',
            sortBy: 'publishedAt',
            sortOrder: 'DESC',
            limit: 100,
          },
        });

        if (response.data.success) {
          const blogs = response.data.data;
          const currentIndex = blogs.findIndex(b => b.id === this.blog.id);
          
          if (currentIndex > 0) {
            this.previousBlog = blogs[currentIndex - 1];
          }
          if (currentIndex < blogs.length - 1) {
            this.nextBlog = blogs[currentIndex + 1];
          }
        }
      } catch (error) {
        console.error('Error fetching adjacent blogs:', error);
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/blog/categories`);
        if (response.data.success) {
          this.categories = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    async fetchTags() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/blog/tags`);
        if (response.data.success) {
          this.popularTags = response.data.data.slice(0, 10);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },

    formatContent(content) {
      if (!content) return '';
      // Convert line breaks to paragraphs
      return content
        .split('\n\n')
        .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
        .join('');
    },

    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    navigateToBlog(slug) {
      this.$router.push(`/blog/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    filterByCategory(category) {
      this.$router.push({
        path: '/blog',
        query: { category },
      });
    },

    filterByTag(tag) {
      this.$router.push({
        path: '/blog',
        query: { tag },
      });
    },

    shareOnFacebook() {
      const url = window.location.href;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    },

    shareOnTwitter() {
      const url = window.location.href;
      const text = this.blog.title;
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    },

    shareOnLinkedIn() {
      const url = window.location.href;
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    },
  },
};
</script>

<style scoped>
.blog-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container i {
  font-size: 4rem;
  color: #e74c3c;
  margin-bottom: 20px;
}

.back-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #764ba2;
  transform: translateY(-2px);
}

.blog-hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 0.95rem;
}

.breadcrumb a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.breadcrumb a:hover {
  opacity: 0.8;
}

.category-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.blog-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.blog-tags .tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 5px;
}

.blog-container {
  max-width: 1400px;
  margin: -80px auto 0;
  padding: 0 20px 80px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.blog-content {
  background: white;
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.blog-excerpt {
  position: relative;
  padding: 30px;
  margin-bottom: 40px;
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  border-radius: 10px;
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  line-height: 1.8;
}

.blog-excerpt i {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  color: #667eea;
  opacity: 0.2;
}

.blog-excerpt p {
  margin: 0;
  padding-left: 40px;
}

.blog-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 60px;
}

.blog-body :deep(p) {
  margin-bottom: 20px;
}

.blog-body :deep(h2),
.blog-body :deep(h3) {
  margin: 40px 0 20px;
  color: #667eea;
}

.blog-body :deep(img) {
  max-width: 100%;
  border-radius: 10px;
  margin: 30px 0;
}

.author-card {
  display: flex;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  margin-bottom: 40px;
}

.author-avatar {
  flex-shrink: 0;
}

.author-avatar i {
  font-size: 4rem;
}

.author-info h3 {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 5px;
}

.author-info h4 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.author-info p {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
}

.share-section {
  padding: 30px 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 40px;
}

.share-section h3 {
  margin-bottom: 20px;
  color: #333;
}

.share-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.share-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  color: white;
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.share-btn.facebook { background: #1877f2; }
.share-btn.twitter { background: #1da1f2; }
.share-btn.linkedin { background: #0077b5; }
.share-btn.copy { background: #667eea; }

.blog-navigation {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.nav-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.nav-btn.next {
  justify-content: flex-end;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-label {
  font-size: 0.85rem;
  opacity: 0.7;
  text-transform: uppercase;
  font-weight: 600;
}

.nav-title {
  font-weight: 600;
  font-size: 1rem;
}

.blog-sidebar {
  position: sticky;
  top: 20px;
  height: fit-content;
}

.sidebar-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.sidebar-card h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
}

.related-post {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.related-post:hover {
  background: #f8f9fa;
}

.related-post img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.related-content h4 {
  font-size: 0.95rem;
  margin-bottom: 8px;
  color: #333;
  line-height: 1.3;
}

.related-date {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.category-list,
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-item,
.tag-item {
  padding: 8px 16px;
  background: #f0f0f0;
  color: #667eea;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover,
.tag-item:hover {
  background: #667eea;
  color: white;
}

@media (max-width: 1024px) {
  .blog-container {
    grid-template-columns: 1fr;
  }

  .blog-sidebar {
    position: static;
  }

  .blog-content {
    padding: 40px 30px;
  }
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }

  .blog-meta {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .blog-content {
    padding: 30px 20px;
  }

  .blog-navigation {
    flex-direction: column;
  }

  .share-buttons {
    flex-direction: column;
  }

  .share-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
