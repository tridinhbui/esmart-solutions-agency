<template>
    <section class="media-blog-section">
      <h2>Ấn phẩm truyền thông</h2>
      <div class="carousel">
        <button class="carousel-nav left" @click="scrollLeft">❮</button>
        <div class="carousel-content">
          <div class="carousel-item" v-for="(item, index) in items" :key="index">
            <img :src="item.image" :alt="item.title">
            <p>{{ item.title }}</p>
          </div>
        </div>
        <button class="carousel-nav right" @click="scrollRight">❯</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'MediaBlogSection',
    data() {
      return {
        items: [
          { image: 'path/to/image1.jpg', title: 'Có thực sự đáng sống?' },
          { image: 'path/to/image2.jpg', title: 'Tình trạng hiện nay' },
          { image: 'path/to/image3.jpg', title: 'Thông điệp vũ trụ' },
          // Add more items as needed
        ]
      }
    },
    methods: {
      scrollLeft() {
        const carousel = this.$refs.carouselContent;
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      },
      scrollRight() {
        const carousel = this.$refs.carouselContent;
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  }
  </script>
  
  <style scoped>
  .media-blog-section {
    background-color: #1c1c4c;
    color: white;
    padding: 2rem 1rem;
    text-align: center;
  }
  
  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .carousel-content {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 1rem 0;
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 250px;
    margin: 0 1rem;
    background: white;
    color: #1c1c4c;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .carousel-item img {
    width: 100%;
    border-radius: 8px 8px 0 0;
  }
  
  .carousel-item p {
    margin: 1rem 0;
  }
  
  .carousel-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    z-index: 1;
  }
  
  .carousel-nav.left {
    left: 0;
  }
  
  .carousel-nav.right {
    right: 0;
  }
  </style>
  