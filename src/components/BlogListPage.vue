<template>
  <div class="blog-list-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="hero-content">
        <h1 class="hero-title">Our Blog</h1>
        <p class="hero-subtitle">Insights, News, and Updates from Esmart Solutions</p>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-wrapper">
          <!-- Search Bar -->
          <div class="search-box">
            <i class="fas fa-search" />
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search blogs..."
              @input="debouncedSearch"
            >
          </div>

          <!-- Category Filter -->
          <select
            v-model="filters.category"
            class="filter-select"
            @change="fetchBlogs"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>

          <!-- Tag Filter -->
          <select
            v-model="filters.tag"
            class="filter-select"
            @change="fetchBlogs"
          >
            <option value="">All Tags</option>
            <option
              v-for="tag in popularTags"
              :key="tag.tag"
              :value="tag.tag"
            >
              {{ tag.tag }} ({{ tag.count }})
            </option>
          </select>

          <!-- Sort Options -->
          <select
            v-model="filters.sortBy"
            class="filter-select"
            @change="fetchBlogs"
          >
            <option value="publishedAt">Latest</option>
            <option value="views">Most Viewed</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Blog Grid -->
    <section class="blogs-section">
      <div class="container">
        <!-- Loading State -->
        <div
          v-if="loading"
          class="loading-state"
        >
          <div class="spinner" />
          <p>Loading blogs...</p>
        </div>

        <!-- Error State -->
        <div
          v-else-if="error"
          class="error-state"
        >
          <i class="fas fa-exclamation-circle" />
          <p>{{ error }}</p>
          <button
            class="retry-btn"
            @click="fetchBlogs"
          >
            Try Again
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="blogs.length === 0"
          class="empty-state"
        >
          <i class="fas fa-inbox" />
          <p>No blogs found</p>
          <button
            class="clear-filters-btn"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>

        <!-- Blog Cards -->
        <div
          v-else
          class="blog-grid"
        >
          <article
            v-for="blog in blogs"
            :key="blog.id"
            class="blog-card"
            @click="goToBlog(blog.slug)"
          >
            <div class="blog-image">
              <img
                :src="blog.coverImage || '/default-blog-image.jpg'"
                :alt="blog.title"
              >
              <div
                v-if="blog.category"
                class="blog-category"
              >
                {{ blog.category }}
              </div>
            </div>

            <div class="blog-content">
              <div class="blog-meta">
                <span class="blog-author">
                  <i class="fas fa-user" />
                  {{ blog.author }}
                </span>
                <span class="blog-date">
                  <i class="fas fa-calendar" />
                  {{ formatDate(blog.publishedAt) }}
                </span>
                <span class="blog-views">
                  <i class="fas fa-eye" />
                  {{ blog.views }}
                </span>
              </div>

              <h2 class="blog-title">
                {{ blog.title }}
              </h2>

              <p class="blog-excerpt">
                {{ blog.excerpt || truncateContent(blog.content) }}
              </p>

              <div
                v-if="blog.tags && blog.tags.length > 0"
                class="blog-tags"
              >
                <span
                  v-for="tag in blog.tags.slice(0, 3)"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>

              <button class="read-more-btn">
                Read More
                <i class="fas fa-arrow-right" />
              </button>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination.totalPages > 1"
          class="pagination"
        >
          <button
            class="pagination-btn"
            :disabled="pagination.page === 1"
            @click="changePage(pagination.page - 1)"
          >
            <i class="fas fa-chevron-left" />
            Previous
          </button>

          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              class="page-btn"
              :class="{ active: page === pagination.page }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="pagination-btn"
            :disabled="pagination.page === pagination.totalPages"
            @click="changePage(pagination.page + 1)"
          >
            Next
            <i class="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      v-if="stats"
      class="stats-section"
    >
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fas fa-blog" />
            <h3>{{ stats.publishedBlogs }}</h3>
            <p>Published Blogs</p>
          </div>
          <div class="stat-card">
            <i class="fas fa-eye" />
            <h3>{{ formatNumber(stats.totalViews) }}</h3>
            <p>Total Views</p>
          </div>
          <div class="stat-card">
            <i class="fas fa-tags" />
            <h3>{{ categories.length }}</h3>
            <p>Categories</p>
          </div>
          <div class="stat-card">
            <i class="fas fa-hashtag" />
            <h3>{{ popularTags.length }}</h3>
            <p>Tags</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BlogListPage',
  data() {
    return {
      blogs: [],
      categories: [],
      popularTags: [],
      stats: null,
      loading: false,
      error: null,
      filters: {
        search: '',
        category: '',
        tag: '',
        sortBy: 'publishedAt',
      },
      pagination: {
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 0,
      },
      searchTimeout: null,
    };
  },
  computed: {
    visiblePages() {
      const pages = [];
      const current = this.pagination.page;
      const total = this.pagination.totalPages;
      
      // Show max 5 pages
      let start = Math.max(1, current - 2);
      let end = Math.min(total, current + 2);
      
      // Adjust if at the beginning or end
      if (current <= 3) {
        end = Math.min(5, total);
      }
      if (current >= total - 2) {
        start = Math.max(1, total - 4);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    },
    apiBaseUrl() {
      return process.env.VUE_APP_API_BASE_URL || 'http://localhost:3001';
    },
  },
  mounted() {
    this.fetchBlogs();
    this.fetchCategories();
    this.fetchTags();
    this.fetchStats();
  },
  methods: {
    async fetchBlogs() {
      this.loading = true;
      this.error = null;

      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          status: 'published',
          sortBy: this.filters.sortBy,
          sortOrder: 'DESC',
        };

        if (this.filters.search) params.search = this.filters.search;
        if (this.filters.category) params.category = this.filters.category;
        if (this.filters.tag) params.tag = this.filters.tag;

        const response = await axios.get(`${this.apiBaseUrl}/api/blog`, { params });

        if (response.data.success) {
          this.blogs = response.data.data;
          this.pagination = {
            ...this.pagination,
            ...response.data.pagination,
          };
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        this.error = 'Failed to load blogs. Please try again later.';
      } finally {
        this.loading = false;
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
          this.popularTags = response.data.data.slice(0, 10); // Top 10 tags
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },

    async fetchStats() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}/api/blog/stats`);
        if (response.data.success) {
          this.stats = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },

    debouncedSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.pagination.page = 1;
        this.fetchBlogs();
      }, 500);
    },

    changePage(page) {
      this.pagination.page = page;
      this.fetchBlogs();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    clearFilters() {
      this.filters = {
        search: '',
        category: '',
        tag: '',
        sortBy: 'publishedAt',
      };
      this.pagination.page = 1;
      this.fetchBlogs();
    },

    goToBlog(slug) {
      this.$router.push(`/blog/${slug}`);
    },

    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },

    formatNumber(num) {
      if (!num) return '0';
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
    },

    truncateContent(content) {
      const maxLength = 150;
      if (!content) return '';
      if (content.length <= maxLength) return content;
      return content.substring(0, maxLength) + '...';
    },
  },
};
</script>

<style scoped>
.blog-list-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.blog-hero {
  padding: 100px 20px 60px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
}

.filters-section {
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.filters-wrapper {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 15px;
  color: #667eea;
}

.search-box input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-select {
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.blogs-section {
  padding: 60px 20px;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state i,
.empty-state i {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.retry-btn,
.clear-filters-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover,
.clear-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.blog-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.blog-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.1);
}

.blog-category {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.blog-content {
  padding: 25px;
}

.blog-meta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: #666;
}

.blog-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.blog-meta i {
  color: #667eea;
}

.blog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.3;
}

.blog-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.blog-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tag {
  background: #f0f0f0;
  color: #667eea;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
}

.read-more-btn {
  background: #667eea;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.read-more-btn:hover {
  background: #764ba2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 60px;
}

.pagination-btn,
.page-btn {
  padding: 10px 20px;
  background: white;
  color: #667eea;
  border: 2px solid white;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn:hover:not(:disabled),
.page-btn:hover {
  background: #667eea;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: #667eea;
  color: white;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.stats-section {
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.stat-card {
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-card i {
  font-size: 3rem;
  margin-bottom: 15px;
  opacity: 0.9;
}

.stat-card h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .filters-wrapper {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>
