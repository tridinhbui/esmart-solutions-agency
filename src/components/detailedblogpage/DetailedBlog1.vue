<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="hamburger" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
      <div class="navbar-logo">
        <router-link to="/" class="logo-text">
          <span class="logo-the">the</span> <span class="logo-main">ESMART SOLUTION AGENCY</span>blog
          <span class="logo-icon">🎯</span>
        </router-link>
        <p class="tagline">Shaken & Stirred - Influential Brand Profiling and Positioning</p>
      </div>
      <div class="social-icons">
        <a href="#" class="social-icon"><span class="icon">🔍</span></a>
        <a href="#" class="social-icon"><span class="icon">📘</span></a>
        <a href="#" class="social-icon"><span class="icon">🐦</span></a>
      </div>
    
    </nav>

    <!-- Blog Content -->
    <div class="blog-container">
      <div class="blog-main">
        <!-- Loop through each category -->
        <div v-for="(categoryPosts, category) in groupedPosts" :key="category" class="category-section">
          <h2 class="category-title">{{ category }}</h2>
          <!-- Loop through posts in this category -->
          <div class="category-posts">
            <div v-for="post in categoryPosts" :key="post.id" class="blog-post">
              <img :src="post.image" :alt="post.title" class="post-image" />
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <router-link :to="`/blog/${post.id}`" class="read-more">Read More</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="widget">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Digital Marketing</a></li>
            <li><a href="#">Business</a></li>
            <li><a href="#">Tech</a></li>
          </ul>
        </div>
        <div class="widget">
          <h3>Recent Posts</h3>
          <ul>
            <li><a href="#">Post Title 1</a></li>
            <li><a href="#">Post Title 2</a></li>
            <li><a href="#">Post Title 3</a></li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-links">
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <router-link to="/privacy">Privacy Policy</router-link>
      </div>
      <p>© 2025 ESmart Solutions. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "SimpleBlog",
  data() {
    return {
      isMenuOpen: false,
      posts: [
        {
          id: 1,
          category: "Digital Marketing",
          title: "Top 5 Digital Marketing Trends in 2025",
          excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://via.placeholder.com/600x400?text=Digital+Marketing+1",
        },
        {
          id: 2,
          category: "Digital Marketing",
          title: "How to Optimize Your SEO Strategy",
          excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://via.placeholder.com/600x400?text=Digital+Marketing+2",
        },
        {
          id: 3,
          category: "Business",
          title: "Scaling Your Business in a Competitive Market",
          excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          image: "https://via.placeholder.com/600x400?text=Business+1",
        },
        {
          id: 4,
          category: "Business",
          title: "Effective Leadership Strategies for 2025",
          excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          image: "https://via.placeholder.com/600x400?text=Business+2",
        },
        {
          id: 5,
          category: "Tech",
          title: "The Rise of AI in Everyday Applications",
          excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          image: "https://via.placeholder.com/600x400?text=Tech+1",
        },
        {
          id: 6,
          category: "Tech",
          title: "Blockchain Technology: Beyond Cryptocurrency",
          excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
          image: "https://via.placeholder.com/600x400?text=Tech+2",
        },
      ],
    };
  },
  computed: {
    groupedPosts() {
      return this.posts.reduce((acc, post) => {
        if (!acc[post.category]) {
          acc[post.category] = [];
        }
        acc[post.category].push(post);
        return acc;
      }, {});
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
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