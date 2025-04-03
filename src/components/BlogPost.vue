<template>
  <div class="blog-container">
    <!-- Hero Banner Section -->
    <div class="hero-banner" v-if="blogs.length > 0">
      <img :src="blogs[0].image" alt="Hero Banner" class="hero-image" />
      <div class="hero-content">
        <h1>Startup</h1>
        <p>The startup stories from successful founders in a variety of fields inspire other people.</p>
        <button class="follow-btn">Theo dõi</button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-area">
      <!-- Main Articles Grid -->
      <div class="main-articles">
        <div class="articles-grid">
          <div v-for="(post, index) in blogs.slice(0, 3)" :key="`article-${index}`" class="article-card" @click="navigateToBlogPost(post.url)">
            <div class="card-image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="card-content">
              <h3>{{ post.title }}</h3>
              <div class="author-row">
                <div class="author-avatar">
                  <img :src="post.authorImage || getDefaultAuthorImage()" :alt="post.author" />
                </div>
                <span class="author-name">{{ post.author }}</span>
                <div class="engagement">
                  <span class="likes"><i class="icon-heart"></i> {{ Math.floor(Math.random() * 5) }}</span>
                  <span class="comments"><i class="icon-comment"></i> {{ Math.floor(Math.random() * 3) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Row Articles -->
        <div class="articles-grid">
          <div v-for="(post, index) in blogs.slice(3, 6)" :key="`second-${index}`" class="article-card" @click="navigateToBlogPost(post.url)">
            <div class="card-image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="card-content">
              <h3>{{ post.title }}</h3>
              <div class="author-row">
                <div class="author-avatar">
                  <img :src="post.authorImage || getDefaultAuthorImage()" :alt="post.author" />
                </div>
                <span class="author-name">{{ post.author }}</span>
                <div class="engagement">
                  <span class="likes"><i class="icon-heart"></i> {{ Math.floor(Math.random() * 5) }}</span>
                  <span class="comments"><i class="icon-comment"></i> {{ Math.floor(Math.random() * 3) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Editor's Picks -->
        <div class="editors-picks">
          <h2 class="section-title">Editor's Picks</h2>
          
          <div v-for="(post, index) in blogs.slice(0, 5)" :key="`pick-${index}`" class="pick-item" @click="navigateToBlogPost(post.url)">
            <div class="pick-image">
              <img :src="post.image" :alt="post.title" />
            </div>
            <div class="pick-content">
              <h3>{{ post.title }}</h3>
              <div class="author-info">
                <span class="author-name">{{ post.author }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hot Articles -->
        <div class="hot-articles">
          <div class="section-header">
            <h2 class="section-title">Bài hot trong tuần</h2>
          </div>
          
          <div class="hot-articles-list">
            <div v-for="(post, index) in blogs.slice(0, 5)" :key="`hot-${index}`" class="hot-article" @click="navigateToBlogPost(post.url)">
              <div class="hot-number">#{{ index + 1 }}</div>
              <div class="hot-content">
                <h3>{{ post.title }}</h3>
                <div class="author-info">
                  <span class="author-name">{{ post.author }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Authors Section -->
        <div class="authors-section">
          <div class="section-header">
            <h2 class="section-title">Tác giả nổi bật</h2>
          </div>
          
          <div class="authors-list">
            <div v-for="(author, index) in getUniqueAuthors()" :key="`author-${index}`" class="author-card">
              <div class="author-avatar large">
                <img :src="getAuthorImage(author)" :alt="author" />
              </div>
              <div class="author-details">
                <h3 class="author-name">{{ author }}</h3>
                <p class="author-title">Content Writer | Advertising Vietnam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogData from '../components/crawl/blogs.json';

export default {
  name: "BlogPost",
  data() {
    return {
      blogs: []
    };
  },
  created() {
    // Load all blogs from the JSON file
    this.blogs = blogData || [];
  },
  methods: {
    navigateToBlogPost(url) {
      if (url) {
        window.open(url, '_blank');
      }
    },
    getDefaultAuthorImage() {
      return 'https://advertisingvietnam.com/assets/image/user/avatar-default.jpg';
    },
    getUniqueAuthors() {
      const authors = [...new Set(this.blogs.map(blog => blog.author))];
      return authors.slice(0, 5);
    },
    getAuthorImage(authorName) {
      const post = this.blogs.find(blog => blog.author === authorName);
      return post?.authorImage || this.getDefaultAuthorImage();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Base Styles */
.blog-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
  padding: 0 10px;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  height: 350px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 80%;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 1.1rem;
  margin-bottom: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.follow-btn {
  background-color: white;
  color: #333;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.follow-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

/* Content Area */
.content-area {
  display: flex;
  gap: 20px;
}

.main-articles {
  flex: 2;
}

.sidebar {
  flex: 1;
}

/* Articles Grid */
.articles-grid {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.article-card {
  flex: 1;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.card-image {
  height: 160px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 12px;
}

.card-content h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.6em;
}

/* Author Row */
.author-row {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
}

.author-avatar.large {
  width: 40px;
  height: 40px;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

/* Engagement */
.engagement {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 0.75rem;
  color: #777;
}

.likes, .comments {
  margin-left: 8px;
  display: flex;
  align-items: center;
}

.icon-heart::before {
  content: '♥';
  margin-right: 2px;
}

.icon-comment::before {
  content: '💬';
  margin-right: 2px;
}

/* Section Titles */
.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #ff3e4d;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

/* Editor's Picks */
.editors-picks {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
}

.pick-item {
  display: flex;
  margin-bottom: 12px;
  cursor: pointer;
}

.pick-item:last-child {
  margin-bottom: 0;
}

.pick-image {
  width: 70px;
  height: 70px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 10px;
  flex-shrink: 0;
}

.pick-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pick-content h3 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pick-content .author-info {
  font-size: 0.75rem;
  color: #777;
}

/* Hot Articles */
.hot-articles {
  margin-bottom: 15px;
}

.hot-articles-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hot-article {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.hot-article:hover {
  background-color: #f0f0f0;
}

.hot-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff3e4d;
  margin-right: 10px;
  min-width: 40px;
  text-align: center;
}

.hot-content {
  flex: 1;
}

.hot-content h3 {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 3px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hot-content .author-info {
  font-size: 0.75rem;
  color: #777;
}

/* Authors Section */
.authors-section {
  margin-bottom: 15px;
}

.authors-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.author-card {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.author-details {
  margin-left: 10px;
  overflow: hidden;
}

.author-details h3 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-title {
  font-size: 0.75rem;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive Design */
@media (max-width: 992px) {
  .content-area {
    flex-direction: column;
  }
  
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .articles-grid {
    flex-direction: column;
  }
  
  .article-card {
    margin-bottom: 15px;
  }
  
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .hero-banner {
    height: 280px;
  }
  
  .author-name {
    max-width: 150px;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 1.6rem;
  }
  
  .hero-content p {
    font-size: 0.85rem;
  }
  
  .hero-banner {
    height: 220px;
  }
  
  .pick-image {
    width: 60px;
    height: 60px;
  }
  
  .hot-number {
    font-size: 1.5rem;
    min-width: 35px;
  }
  
  .card-content h3,
  .pick-content h3,
  .hot-content h3 {
    -webkit-line-clamp: 2;
  }
}
</style>