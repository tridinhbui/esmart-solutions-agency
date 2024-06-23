<template>
  <section class="blog-post">
    <div class="main-post">
      <img :src="require(`@/assets/${mainPost.image}`)" :alt="mainPost.title" class="main-post-image" />
      <div class="main-post-content">
        <h2>{{ mainPost.title }}</h2>
        <p>{{ mainPost.excerpt }}</p>
        <button>Read More</button>
      </div>
    </div>
    <div class="sidebar">
      <h3>More Posts</h3>
      <div class="sidebar-post" v-for="(post, index) in sidebarPosts" :key="index">
        <img :src="require(`@/assets/${post.image}`)" :alt="post.title" class="sidebar-post-image" />
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
        image: 'image1.jpg',
        title: 'ECO TOUCH - A NEW JOURNEY OF VIET STRAW TO GO GLOBAL',
        excerpt: 'Joining forces with EcoSmart Solutions, ECO Touch embarks on an exhilarating journey alongside VietStraw...'
      },
      sidebarPosts: [
        {
          image: 'image1.jpg',
          title: 'Check Your Mail!'
        },
        {
          image: 'image2.jpg',
          title: 'Exciting news!'
        },
        {
          image: 'image1.jpg',
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
  justify-content: center;
}

.main-post {
  flex: 1 1 70%;
  max-width: 70%;
  margin-right: 20px;
}

.sidebar {
  flex: 1 1 30%;
  max-width: 30%;
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  .main-post {
    flex: 1 1 100%;
    max-width: 100%;
    margin-right: 0;
  }

  .sidebar {
    flex: 1 1 100%;
    max-width: 100%;
    margin-top: 20px;
  }
}

/* Styles for images */
img {
  max-width: 100%;
  height: auto;
}
</style>
