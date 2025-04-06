<template>
  <section class="about">
    <h2>{{ $t("AboutUs.title") }}</h2>
    <p>{{ $t("AboutUs.description1") }}</p>
    <p>{{ $t("AboutUs.description2") }}</p>
    <p>{{ $t("AboutUs.description3") }}</p>

    <div class="slideshow-container">
      <div class="slideshow">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          class="about-image"
          :class="{ active: currentIndex === index }"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      currentIndex: 0,
      images: [
        { src: require("@/assets/esmart_end.jpg"), alt: "Team working at Esmart Solutions office" },
        { src: require("@/assets/esmart_start.jpg"), alt: "Esmart Solutions team collaborating on a project" },
        { src: require("@/assets/logo.png"), alt: "Esmart Solutions logo" },
      ],
      slideInterval: null, // To store the interval ID
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoSlide() {
      // Start the interval to call nextSlide every 2 seconds (2000 milliseconds)
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 2000);
    },
  },
  mounted() {
    // Start the auto-slide when the component is mounted
    this.startAutoSlide();
  },
  beforeUnmount() { // Replaced beforeDestroy with beforeUnmount
    // Clear the interval when the component is unmounted to prevent memory leaks
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  },
};
</script>

<style scoped>
.about {
  background-color: #1c1c4c;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
}

.about::after {
  content: "";
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.slideshow-container {
  position: relative;
  max-width: 80%;
  margin: 2rem auto;
  overflow: hidden;
}

.slideshow {
  position: relative;
  width: 100%;
  height: 400px;
}

.about-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: opacity 0.5s ease, transform 0.5s ease, filter 0.5s ease;
  filter: brightness(1.2);
  opacity: 0;
}

.about-image.active {
  opacity: 1;
}

.about-image:hover {
  transform: scale(0.9) translateZ(-10px);
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.arrow:hover {
  background-color: #333;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>
