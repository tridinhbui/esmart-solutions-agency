<template>
    <section class="blog-post">
      <div class="main-post">
        <img :src="mainPost.image" :alt="mainPost.title" class="main-post-image" />
        <div class="main-post-content">
          <h2>{{ mainPost.title }}</h2>
          <p>{{ mainPost.excerpt }}</p>
          <button>Read More</button>
        </div>
      </div>
      <div class="sidebar">
        <h3>More Posts</h3>
        <div class="sidebar-post" v-for="(post, index) in sidebarPosts" :key="index">
          <img :src="post.image" :alt="post.title" class="sidebar-post-image" />
          <div class="sidebar-post-content">
            <h4>{{ post.title }}</h4>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'BlogPost',
    data() {
      return {
        mainPost: {
          image: 'path/to/main-image.jpg',
          title: 'ECO TOUCH - A NEW JOURNEY OF VIET STRAW TO GO GLOBAL',
          excerpt: 'Joining forces with EcoSmart Solutions, ECO Touch embarks on an exhilarating journey alongside VietStraw...'
        },
        sidebarPosts: [
          {
            image: 'path/to/sidebar-image1.jpg',
            title: 'Check Your Mail!'
          },
          {
            image: 'path/to/sidebar-image2.jpg',
            title: 'Exciting news!'
          },
          {
            image: 'path/to/sidebar-image3.jpg',
            title: '1 Day Left for Registration'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .blog-post {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem 1rem;
  background-color: #fff;
  font-family: 'Poppins', sans-serif;
}

.main-post {
  flex: 3;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;
  position: relative;
}

.main-post:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.main-post-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  animation: image-zoom 0.8s ease-in-out;
}

.main-post-content {
  padding: 1rem;
  animation: content-slide 0.8s ease-in-out;
}

.main-post-content h2 {
  color: #1c1c4c;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.main-post-content p {
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.main-post-content button {
  background-color: #0077b6;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.main-post-content button:hover {
  background-color: #005f9e;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.sidebar {
  flex: 1;
  margin-left: 1rem;
}

.sidebar h3 {
  color: #1c1c4c;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.sidebar-post {
  display: flex;
  margin-bottom: 1rem;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.sidebar-post:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sidebar-post-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 1rem;
}

.sidebar-post-content {
  display: flex;
  align-items: center;
}

.sidebar-post-content h4 {
  font-size: 1rem;
  color: #1c1c4c;
}

@keyframes image-zoom {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes content-slide {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
  </style>
  