<template>
  <!-- Revolutionary Quantum News Section -->
  <div class="quantum-news-zone">
    <!-- Revolutionary Quantum Background System -->
    <div class="news-quantum-background">
      <!-- Quantum Orbs System -->
      <div class="news-quantum-orbs">
        <div class="quantum-orb orb-1" />
        <div class="quantum-orb orb-2" />
        <div class="quantum-orb orb-3" />
        <div class="quantum-orb orb-4" />
      </div>
      
      <!-- Energy Matrix System -->
      <div class="news-energy-matrix">
        <div
          v-for="i in 16"
          :key="'matrix-'+i"
          class="matrix-cell"
        />
      </div>
      
      <!-- Floating Quantum Particles -->
      <div class="news-floating-particles">
        <div
          v-for="i in 10"
          :key="'particle-'+i"
          class="quantum-particle"
        />
      </div>
    </div>

    <!-- Revolutionary Title Zone -->
    <div
      class="news-title-zone animate-fadeIn"
      data-aos="fade-down"
      data-aos-delay="100"
    >
      <!-- Quantum Badge -->
      <div
        class="news-quantum-badge animate-zoomIn"
        data-aos="zoom-in"
        data-aos-delay="150"
      >
        <div class="badge-energy-core" />
        <i class="fas fa-newspaper" />
        <span>Latest Updates</span>
        <div class="badge-quantum-ring" />
      </div>

      <!-- Revolutionary Title -->
      <h1
        class="news-revolutionary-title animate-slideIn"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <span class="title-main">Tin Tức & Cập Nhật</span>
        <div class="title-energy-beams">
          <div class="energy-beam beam-1" />
          <div class="energy-beam beam-2" />
          <div class="energy-beam beam-3" />
        </div>
        <div class="title-hologram-effect" />
      </h1>
    </div>

    <!-- Revolutionary Content Grid -->
    <div
      class="quantum-content-grid animate-fadeIn"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <!-- Revolutionary Main Articles Portal -->
      <div
        class="quantum-main-articles animate-slideIn"
        data-aos="fade-right"
        data-aos-delay="400"
      >
        <div
          class="section-quantum-header animate-fadeIn"
          data-aos="fade-down"
          data-aos-delay="420"
        >
          <h2 class="section-revolutionary-title">
            <span class="title-glow">Bài Viết Chính</span>
            <div class="title-energy-line" />
          </h2>
        </div>
        
        <div class="quantum-articles-grid">
          <div
            v-for="(post, index) in blogs.slice(0, 6)"
            :key="`article-${index}`"
            class="quantum-article-card animate-fadeIn"
            data-aos="zoom-in-up"
            :data-aos-delay="440 + index*60"
            @click="navigateToBlogPost(post.url)"
          >
            <!-- Article Quantum Shell -->
            <div class="article-quantum-shell">
              <div class="shell-energy-border" />
              
              <!-- Image Portal -->
              <div class="image-quantum-portal">
                <div class="image-energy-frame" />
                <img
                  :src="post.image || getDefaultImage()"
                  :alt="post.title"
                  @error="handleImageError"
                >
                <div class="image-hologram-overlay" />
              </div>

              <!-- Content Zone -->
              <div class="article-content-zone">
                <h3 class="article-title">
                  <span>{{ post.title }}</span>
                  <div class="title-quantum-underline" />
                </h3>
                
                <div class="quantum-author-row">
                  <div class="author-quantum-avatar">
                    <div class="avatar-energy-ring" />
                    <img
                      :src="post.authorImage || getDefaultAuthorImage()"
                      :alt="post.author"
                      @error="handleImageError"
                    >
                    <div class="avatar-quantum-glow" />
                  </div>
                  <span class="quantum-author-name">{{ post.author }}</span>
                  
                  <!-- Quantum Engagement System -->
                  <div class="quantum-engagement">
                    <div class="engagement-item">
                      <i class="fas fa-heart quantum-icon" />
                      <span>{{ post.likes }}</span>
                      <div class="engagement-glow" />
                    </div>
                    <div class="engagement-item">
                      <i class="fas fa-comment quantum-icon" />
                      <span>{{ post.comments }}</span>
                      <div class="engagement-glow" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card Magic Particles -->
              <div class="article-magic-particles">
                <div
                  v-for="i in 4"
                  :key="'article-particle-'+i"
                  class="magic-particle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revolutionary Editor's Picks Portal -->
      <div
        class="quantum-editors-picks animate-slideIn"
        data-aos="fade-left"
        data-aos-delay="500"
      >
        <div
          class="section-quantum-header animate-fadeIn"
          data-aos="fade-down"
          data-aos-delay="520"
        >
          <h2 class="section-revolutionary-title">
            <span class="title-glow">Editor's Picks</span>
            <div class="title-energy-line" />
          </h2>
        </div>
        
        <div class="quantum-picks-list">
          <div
            v-for="(post, index) in blogs.slice(0, 5)"
            :key="`pick-${index}`"
            class="quantum-pick-item animate-fadeIn"
            data-aos="zoom-in"
            :data-aos-delay="540 + index*60"
            @click="navigateToBlogPost(post.url)"
          >
            <div class="pick-quantum-shell">
              <div class="pick-image-portal">
                <div class="image-quantum-frame" />
                <img
                  :src="post.image || getDefaultImage()"
                  :alt="post.title"
                  @error="handleImageError"
                >
                <div class="image-energy-glow" />
              </div>
              <div class="pick-content-zone">
                <h3 class="pick-title">
                  {{ post.title }}
                </h3>
                <div class="pick-author-info">
                  <span class="quantum-author">{{ post.author }}</span>
                </div>
                <div class="pick-energy-trail" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revolutionary Authors Portal -->
      <div
        class="quantum-authors-section animate-zoomIn"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        <div
          class="section-quantum-header animate-fadeIn"
          data-aos="fade-down"
          data-aos-delay="620"
        >
          <h2 class="section-revolutionary-title">
            <span class="title-glow">Tác Giả Nổi Bật</span>
            <div class="title-energy-line" />
          </h2>
        </div>
        
        <div class="quantum-authors-list">
          <div
            v-for="(author, index) in getUniqueAuthors()"
            :key="`author-${index}`"
            class="quantum-author-card animate-fadeIn"
            data-aos="zoom-in"
            :data-aos-delay="640 + index*60"
          >
            <div class="author-quantum-shell">
              <div class="author-avatar-portal">
                <div class="avatar-energy-ring" />
                <img
                  :src="getAuthorImage(author)"
                  :alt="author"
                  @error="handleImageError"
                >
                <div class="avatar-hologram-glow" />
              </div>
              <div class="author-details-zone">
                <h3 class="quantum-author-name">
                  {{ author }}
                </h3>
                <p class="quantum-author-title">
                  Content Writer
                </p>
                <div class="author-energy-signature" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revolutionary Hot Articles Portal -->
      <div
        class="quantum-hot-articles animate-fadeIn"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <div
          class="section-quantum-header animate-fadeIn"
          data-aos="fade-down"
          data-aos-delay="720"
        >
          <h2 class="section-revolutionary-title">
            <span class="title-glow">Bài Hot Trong Tuần</span>
            <div class="title-energy-line" />
          </h2>
        </div>
        
        <div class="quantum-hot-list">
          <div
            v-for="(post, index) in blogs.slice(0, 5)"
            :key="`hot-${index}`"
            class="quantum-hot-item animate-fadeIn"
            data-aos="zoom-in-up"
            :data-aos-delay="740 + index*60"
            @click="navigateToBlogPost(post.url)"
          >
            <div class="hot-quantum-shell">
              <div class="hot-number-portal">
                <div class="number-energy-core" />
                <span class="quantum-number">#{{ index + 1 }}</span>
                <div class="number-quantum-ring" />
              </div>
              <div class="hot-content-zone">
                <h3 class="hot-title">
                  {{ post.title }}
                </h3>
                <div class="hot-author-info">
                  <span class="quantum-author">{{ post.author }}</span>
                </div>
                <div class="hot-energy-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Assuming blogs.json is correctly located relative to this component
import blogData from './crawl/blogs.json';

export default {
  name: "BlogPost",
  data() {
    return {
      // Initialize with data or empty array
      blogs: (blogData || []).map(blog => ({
          ...blog,
          // Use actual data if available, otherwise generate random (for display only)
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
    getDefaultImage() {
        return 'https://via.placeholder.com/300x160.png?text=Image+Not+Found';
    },
    getDefaultAuthorImage() {
      return 'https://via.placeholder.com/60.png?text=A'; // Adjusted size
    },
    handleImageError(event) {
        console.warn("Image failed to load:", event.target.src);
        // Use different placeholders based on context if possible
        if (event.target.closest('.author-avatar')) {
            event.target.src = this.getDefaultAuthorImage();
        } else {
            event.target.src = this.getDefaultImage();
        }
    },
    getUniqueAuthors() {
      if (!this.blogs || this.blogs.length === 0) return [];
      const authors = [...new Set(this.blogs.map(blog => blog.author).filter(author => !!author))];
      return authors.slice(0, 5);
    },
    getAuthorImage(authorName) {
      if (!this.blogs || this.blogs.length === 0) return this.getDefaultAuthorImage();
      const post = this.blogs.find(blog => blog.author === authorName);
      return post?.authorImage || this.getDefaultAuthorImage();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import "@fortawesome/fontawesome-free/css/all.css";

/* Enhanced CSS Variables with Quantum Theme */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --quantum-blue: rgba(59, 130, 246, 1);
  --quantum-purple: rgba(139, 92, 246, 1);
  --quantum-green: rgba(34, 197, 94, 1);
  --gradient-magical: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(217, 119, 6, 0.9) 100%);
  --gradient-primary: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--secondary-color) 0%, var(--tertiary-color) 100%);
  --gradient-tertiary: linear-gradient(135deg, var(--tertiary-color) 0%, var(--primary-color) 100%);
  --gradient-quantum: linear-gradient(135deg, var(--quantum-blue) 0%, var(--quantum-purple) 50%, var(--primary-color) 100%);
  --gradient-cyber: linear-gradient(135deg, var(--quantum-green) 0%, var(--quantum-blue) 100%);
  --success-color: var(--quantum-green);
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
}

/* Revolutionary Quantum News Zone */
.quantum-news-zone {
  position: relative;
  padding: 4rem 1rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  overflow: hidden;
  min-height: 80vh;
  font-family: 'Inter', sans-serif;
  color: var(--text-primary);
  width: 100%;
  box-sizing: border-box;
}

/* Revolutionary Quantum Background System */
.news-quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

/* Quantum Orbs System */
.news-quantum-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-magical);
  filter: blur(40px);
  animation: quantumOrbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 180px;
  height: 180px;
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 140px;
  height: 140px;
  top: 25%;
  right: 15%;
  background: var(--gradient-cyber);
  animation-delay: 2s;
}

.orb-3 {
  width: 160px;
  height: 160px;
  bottom: 20%;
  left: 20%;
  background: var(--gradient-quantum);
  animation-delay: 4s;
}

.orb-4 {
  width: 120px;
  height: 120px;
  bottom: 30%;
  right: 25%;
  animation-delay: 6s;
}

/* Energy Matrix System */
.news-energy-matrix {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 2px;
  opacity: 0.3;
}

.matrix-cell {
  border: 1px solid var(--quantum-blue);
  background: linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
  animation: matrixCellPulse 4s ease-in-out infinite;
}

.matrix-cell:nth-child(odd) {
  animation-delay: 0s;
}

.matrix-cell:nth-child(even) {
  animation-delay: 2s;
}

/* Floating Quantum Particles */
.news-floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: quantumParticleFloat 6s linear infinite;
  box-shadow: 0 0 10px var(--primary-color);
}

.quantum-particle:nth-child(1) { top: 15%; left: 15%; animation-delay: 0s; }
.quantum-particle:nth-child(2) { top: 25%; right: 20%; animation-delay: 0.6s; }
.quantum-particle:nth-child(3) { top: 45%; left: 80%; animation-delay: 1.2s; }
.quantum-particle:nth-child(4) { bottom: 35%; right: 30%; animation-delay: 1.8s; }
.quantum-particle:nth-child(5) { bottom: 20%; left: 60%; animation-delay: 2.4s; }
.quantum-particle:nth-child(6) { top: 60%; right: 70%; animation-delay: 3s; }
.quantum-particle:nth-child(7) { bottom: 45%; left: 25%; animation-delay: 3.6s; }
.quantum-particle:nth-child(8) { top: 35%; left: 50%; animation-delay: 4.2s; }
.quantum-particle:nth-child(9) { bottom: 60%; right: 15%; animation-delay: 4.8s; }
.quantum-particle:nth-child(10) { top: 80%; left: 35%; animation-delay: 5.4s; }

/* Enhanced Compact Content Grid Layout */
.quantum-content-grid {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 3;
  width: 100%;
  box-sizing: border-box;
}

.quantum-main-articles {
  grid-column: 1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
}

.quantum-editors-picks {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
}

.quantum-authors-section {
  grid-column: 2;
  grid-row: 2;
  margin-top: 0;
}

.quantum-hot-articles {
  grid-column: 3;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
}

/* Enhanced Responsive Grid */
@media (max-width: 1200px) {
  .quantum-content-grid {
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 0.5rem;
  }
}

@media (max-width: 1024px) {
  .quantum-content-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 1.5rem;
    max-width: 100%;
    padding: 0 0.5rem;
  }
  
  .quantum-main-articles {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  
  .quantum-editors-picks {
    grid-column: 1;
    grid-row: 2;
  }
  
  .quantum-hot-articles {
    grid-column: 2;
    grid-row: 2;
  }
  
  .quantum-authors-section {
    grid-column: 1 / -1;
    grid-row: 3;
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  .quantum-news-zone {
    padding: 2rem 1rem 1rem;
  }
  
  .news-title-zone {
    margin-bottom: 2rem;
  }
  
  .quantum-content-grid {
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
}

/* Revolutionary Title Zone */
.news-title-zone {
  position: relative;
  z-index: 3;
  text-align: center;
  margin-bottom: 3rem;
}

/* Ensure ALL text elements are white */
.quantum-news-zone * {
  color: white !important;
}

.quantum-news-zone .section-title,
.quantum-news-zone .section-revolutionary-title,
.quantum-news-zone .title-glow,
.quantum-news-zone .title-main,
.quantum-news-zone h1,
.quantum-news-zone h2,
.quantum-news-zone h3,
.quantum-news-zone h4,
.quantum-news-zone .article-title,
.quantum-news-zone .pick-title,
.quantum-news-zone .author-details h3,
.quantum-news-zone .author-title,
.quantum-news-zone .quantum-author,
.quantum-news-zone .quantum-author-name,
.quantum-news-zone .news-revolutionary-title {
  color: rgba(255, 255, 255, 0.95) !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.quantum-news-zone .author-info,
.quantum-news-zone .author-row,
.quantum-news-zone .engagement {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Quantum Badge */
.news-quantum-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 50px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  overflow: hidden;
}

.badge-energy-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  border-radius: 50px;
  opacity: 0.2;
  animation: badgeEnergyPulse 3s ease-in-out infinite;
}

.badge-quantum-ring {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid var(--quantum-blue);
  border-radius: 50px;
  animation: badgeRingRotate 4s linear infinite;
  opacity: 0.8;
}

/* Revolutionary Title */
.news-revolutionary-title {
  position: relative;
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,0.45), 0 0 8px #ff6b35;
  letter-spacing: 0.01em;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-align: center;
  background: linear-gradient(90deg, var(--bg-primary) 60%, #ff6b35 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px #ff6b35);
}

.title-main {
  position: relative;
  z-index: 2;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.5));
}

.title-energy-beams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.energy-beam {
  position: absolute;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--quantum-blue) 50%, transparent 100%);
  animation: energyBeamPulse 2s ease-in-out infinite;
}

.beam-1 {
  top: 20%;
  left: -50px;
  animation-delay: 0s;
}

.beam-2 {
  bottom: 20%;
  right: -50px;
  animation-delay: 0.7s;
}

.beam-3 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  animation-delay: 1.4s;
}

.title-hologram-effect {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-cyber);
  border-radius: 10px;
  filter: blur(30px);
  opacity: 0.3;
  /* animation: hologramFlicker 3s ease-in-out infinite; */
  z-index: -1;
}

/* Revolutionary Content Grid */
.quantum-content-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}

.grid-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 25px; /* Increased base padding */
  border: 1px solid #eee;
  min-width: 0;
  display: flex;
  flex-direction: column;
  /* Remove fixed min-height, let content or specific rules define height */
}

/* --- Grid Item Specific Styles --- */

/* 1. Main Articles (Top-Left) */
.main-articles {
  background-color: transparent;
  padding: 0;
  border: none;
}
.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Keep 2 columns */
  gap: 20px;
  width: 100%;
}
.article-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
}
.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.12);
}
.card-image { aspect-ratio: 16 / 9; overflow: hidden; width: 100%; }
.card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.article-card:hover .card-image img { transform: scale(1.05); }
.card-content { padding: 15px; flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between; }
.card-content h3 { font-size: 1rem; font-weight: 600; margin-bottom: 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.author-row { display: flex; align-items: center; margin-top: auto; padding-top: 8px; border-top: 1px solid #f0f0f0; }
.author-avatar { width: 28px; height: 28px; border-radius: 50%; overflow: hidden; margin-right: 8px; flex-shrink: 0; }
.author-name { font-size: 0.85rem; font-weight: 500; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.engagement { display: flex; align-items: center; margin-left: auto; font-size: 0.8rem; color: #777; flex-shrink: 0; }
.likes, .comments { margin-left: 10px; display: flex; align-items: center; }
.icon-heart::before { content: '♥'; margin-right: 4px; color: #ff6b6b;}
.icon-comment::before { content: '💬'; margin-right: 4px; }

/* 2. Editor's Picks (Top-Right) - Taller */
.editors-picks {
   /* Styles inherited from .grid-item */
   /* Remove max-height to allow it to grow taller based on content */
   /* max-height: 500px; */
   /* Optional: Add min-height if you want it to be at least a certain height */
   min-height: 450px; /* Example: ensure it's reasonably tall */
   overflow-y: auto; /* Keep scroll if content exceeds min-height or available space */
}
.picks-list { margin-top: 15px; }
.pick-item { display: flex; align-items: center; margin-bottom: 15px; cursor: pointer; padding: 5px; border-radius: 4px; transition: background-color 0.2s ease; }
.pick-item:hover { background-color: #e0e0e0; }
.pick-item:last-child { margin-bottom: 0; }
.pick-image { width: 65px; height: 65px; border-radius: 6px; overflow: hidden; margin-right: 12px; flex-shrink: 0; }
.pick-image img { width: 100%; height: 100%; object-fit: cover; }
.pick-content h3 { font-size: 0.9rem; font-weight: 600; margin-bottom: 4px; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pick-content .author-info { font-size: 0.8rem; color: #777; }

/* 3. Authors Section (Bottom-Left) - Cards fill the square */
.authors-section {
  /* Styles inherited from .grid-item */
  /* Let flex-grow handle height within grid row */
  /* min-height: 450px; */ /* Match Editor's picks min-height if desired */
}
.authors-list {
  /* Change from horizontal flex scroll to a wrapping grid */
  display: grid;
  /* Auto-fill columns with min width, letting them wrap */
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 20px; /* Gap between author cards */
  /* Remove horizontal scroll styles */
  /* overflow-x: auto; */
  /* padding-bottom: 10px; */
  margin-top: 15px; /* Space below header */
  width: 100%; /* Ensure grid uses full width */
  flex-grow: 1; /* Allow list to fill vertical space */
}
/* Remove scrollbar styling */
/* .authors-list::-webkit-scrollbar { ... } */
/* .authors-list::-webkit-scrollbar-thumb { ... } */

/* --- Taller, Bigger Author Card --- */
.author-card {
  /* Remove flex-shrink, width - grid handles sizing */
  /* flex-shrink: 0; */
  /* width: 150px; */
  padding: 20px 15px; /* Increased padding */
  border-radius: 8px;
  background-color: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #e0e0e0;
  min-height: 220px; /* Increased min-height */
  box-shadow: 0 1px 4px rgba(0,0,0,0.06); /* Add subtle shadow */
  transition: box-shadow 0.3s ease;
}
.author-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* Enhance shadow on hover */
}

.author-avatar.large {
  width: 75px; /* Increased avatar size */
  height: 75px;
  margin-bottom: 15px; /* Increased space below avatar */
}
.author-details {
  margin-left: 0;
  overflow: hidden;
  width: 100%;
  display: flex; /* Use flex to push title down if needed */
  flex-direction: column;
  flex-grow: 1; /* Allow details to fill remaining space */
  justify-content: center; /* Center text block vertically */
}
.author-details h3 {
  font-size: 1.05rem; /* Increased name size */
  font-weight: 600;
  margin-bottom: 6px; /* Increased space below name */
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}
.author-title {
  font-size: 0.8rem;
  color: #666;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4; /* Improved line height */
}

/* 4. Hot Articles (Bottom-Right) */
.hot-articles {
  /* Styles inherited from .grid-item */
  /* overflow-y: auto; */ /* Keep scroll */
  /* max-height: 500px; */
  /* Match min-height if desired */
   min-height: 450px; /* Example: ensure it's reasonably tall */
   overflow-y: auto;
}
.hot-articles-list { display: flex; flex-direction: column; gap: 12px; margin-top: 15px; }
.hot-article { display: flex; align-items: flex-start; padding: 12px; border-radius: 6px; background-color: #fff; border: 1px solid #eee; transition: background-color 0.3s ease; cursor: pointer; }
.hot-article:hover { background-color: #f0f0f0; }
.hot-number { font-size: 1.6rem; font-weight: 700; color: #ff3e4d; margin-right: 15px; min-width: 35px; text-align: center; line-height: 1; padding-top: 2px; }
.hot-content { flex: 1; }
.hot-content h3 { font-size: 0.9rem; font-weight: 600; margin-bottom: 4px; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hot-content .author-info { font-size: 0.8rem; color: #777; }


/* Shared Section Headers/Titles */
.section-title {
  font-size: 1.3rem; /* Slightly larger */
  font-weight: 700;
  margin-bottom: 0;
  position: relative;
  display: inline-block;
  color: #1a1a1a;
}
.section-title.visually-hidden { /* Keep hidden style */
    position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;
}
.section-title::after {
  content: ''; position: absolute; bottom: -5px; left: 0; width: 35px; height: 3px; background-color: #ff3e4d;
}
.section-header {
  display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e0e0e0; padding-bottom: 12px; /* Increased padding */
}

/* Enhanced Article Titles and Author Names with White Text */
.article-title, .pick-title, .hot-title {
  color: #ffffff !important;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.quantum-author, .quantum-author-name {
  color: #ffffff !important;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  background: linear-gradient(135deg, #ff6b35, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.6));
}

/* Enhanced contrast for content */
.article-content, .pick-content-zone, .hot-content-zone {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.article-content h3, .pick-content-zone h3, .hot-content-zone h3 {
  color: #ffffff !important;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

/* Revolutionary Quantum Articles Grid */
.quantum-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Quantum Editor's Picks List */
.quantum-picks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

/* Quantum Hot Articles List */
.quantum-hot-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
}

/* Quantum Authors Grid */
.quantum-authors-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .quantum-content-grid {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .quantum-main-articles, .quantum-editors-picks, .quantum-authors-section, .quantum-hot-articles {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    margin: 0 auto;
  }
  .quantum-articles-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 1rem;
  }
  
  .quantum-picks-list, .quantum-hot-list {
    display: flex !important;
    flex-direction: column;
    gap: 1rem;
  }
  
  .quantum-authors-list {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }
}
@media (max-width: 768px) {
  .quantum-news-zone {
    padding: 3.5rem 0.5rem;
  }
  .news-title-zone {
    margin-bottom: 2rem;
  }
  .news-revolutionary-title {
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }
  .section-revolutionary-title {
    font-size: 1.1rem;
    padding: 0 0.5rem;
  }
  .quantum-content-grid {
    flex-direction: column;
    gap: 1.5rem;
  }
  .quantum-articles-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem;
  }
  
  .quantum-picks-list, .quantum-hot-list {
    display: flex !important;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .quantum-authors-list {
    grid-template-columns: 1fr !important;
    gap: 0.8rem;
  }
  .quantum-article-card, .quantum-pick-item, .quantum-author-card, .quantum-hot-item {
    min-width: 0;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 0.98rem;
  }
  .article-title, .pick-title, .hot-title, .quantum-author-name {
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .news-revolutionary-title {
    font-size: 1.1rem;
  }
  .section-revolutionary-title {
    font-size: 0.95rem;
  }
  .quantum-article-card, .quantum-pick-item, .quantum-author-card, .quantum-hot-item {
    padding: 0.7rem 0.5rem;
    font-size: 0.93rem;
  }
  .article-title, .pick-title, .hot-title, .quantum-author-name {
    font-size: 0.93rem;
  }
}

</style>