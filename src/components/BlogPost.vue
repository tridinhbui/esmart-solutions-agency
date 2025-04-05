<template>
  <div class="blog-container">
    <div class="content-grid">
      <div class="grid-item main-articles">
         <h2 class="section-title visually-hidden">Main Articles</h2> <div class="articles-grid">
          <div
            v-for="(post, index) in blogs.slice(0, 4)" :key="`article-${index}`"
            class="article-card"
            @click="navigateToBlogPost(post.url)"
          >
            <div class="card-image">
              <img :src="post.image || getDefaultImage()" :alt="post.title" @error="handleImageError" />
            </div>
            <div class="card-content">
              <h3>{{ post.title }}</h3>
              <div class="author-row">
                <div class="author-avatar">
                  <img :src="post.authorImage || getDefaultAuthorImage()" :alt="post.author" @error="handleImageError"/>
                </div>
                <span class="author-name">{{ post.author }}</span>
                <div class="engagement">
                  <span class="likes"><i class="icon-heart"></i> {{ post.likes }}</span>
                  <span class="comments"><i class="icon-comment"></i> {{ post.comments }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-item editors-picks">
        <h2 class="section-title">Editor's Picks</h2>
        <div class="picks-list"> <div
              v-for="(post, index) in blogs.slice(0, 5)" :key="`pick-${index}`"
              class="pick-item"
              @click="navigateToBlogPost(post.url)"
            >
            <div class="pick-image">
              <img :src="post.image || getDefaultImage()" :alt="post.title" @error="handleImageError"/>
            </div>
            <div class="pick-content">
              <h3>{{ post.title }}</h3>
              <div class="author-info">
                <span class="author-name">{{ post.author }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-item authors-section">
        <div class="section-header">
          <h2 class="section-title">Tác giả nổi bật</h2>
        </div>
        <div class="authors-list">
          <div
            v-for="(author, index) in getUniqueAuthors()"
            :key="`author-${index}`"
            class="author-card" >
            <div class="author-avatar large">
              <img :src="getAuthorImage(author)" :alt="author" @error="handleImageError"/>
            </div>
            <div class="author-details">
              <h3 class="author-name">{{ author }}</h3>
              <p class="author-title">Content Writer</p> </div>
          </div>
        </div>
      </div>

      <div class="grid-item hot-articles">
        <div class="section-header">
          <h2 class="section-title">Bài hot trong tuần</h2>
        </div>
        <div class="hot-articles-list">
          <div
            v-for="(post, index) in blogs.slice(0, 5)" :key="`hot-${index}`"
            class="hot-article"
            @click="navigateToBlogPost(post.url)"
          >
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

    </div> </div>
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

/* Base Styles */
.blog-container {
  font-family: 'Inter', sans-serif;
  max-width: 1280px;
  margin: 2rem auto;
  color: #333;
  padding: 0 15px;
}

/* Content Grid (2x2) */
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 equal columns */
  /* Let rows size automatically based on content */
  grid-template-rows: auto auto;
  gap: 30px;
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
  background-color: #fff;
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
  background-color: #fff;
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

/* Responsive Design */
@media (max-width: 992px) { /* Tablet */
  .content-grid {
    grid-template-columns: 1fr 1fr;
  }
  .articles-grid {
    grid-template-columns: repeat(1, 1fr); /* Switch main articles to 1 col */
  }
  .authors-list {
      /* Adjust grid for authors on tablet */
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 768px) { /* Mobile Large */
  .content-grid {
    grid-template-columns: 1fr; /* Stack all sections */
    gap: 25px;
  }
  .articles-grid {
     grid-template-columns: repeat(2, 1fr); /* Can go back to 2 cols when stacked */
  }
  .grid-item {
      max-height: none;
      overflow-y: visible;
      padding: 20px;
  }
   .authors-list {
      /* Adjust grid for authors on mobile */
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
   .author-card {
       min-height: 200px; /* Adjust height for mobile */
   }
}

@media (max-width: 576px) { /* Mobile Small */
  .blog-container { padding: 0 10px; margin: 1rem auto; }
  .content-grid { gap: 20px; }
  .grid-item { padding: 15px; }
  .articles-grid {
    grid-template-columns: 1fr; /* Single column */
    gap: 15px;
  }
  .authors-list {
     grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* Smaller cards */
     gap: 10px;
  }
  .author-card { min-height: 180px; padding: 15px 8px;}
  .author-avatar.large { width: 60px; height: 60px; }
  .author-details h3 { font-size: 0.9rem; }
  .pick-image { width: 50px; height: 50px; }
  .hot-number { font-size: 1.4rem; }
}

</style>