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
      // Make sure these alt texts are defined in your locale files
      images: [
        { src: require("@/assets/esmart_end.jpg"), alt: this.$t("AboutUs.imageAlt", "Esmart End Image") },
        { src: require("@/assets/esmart_start.jpg"), alt: this.$t("AboutUs.imageAlt1", "Esmart Start Image") },
        { src: require("@/assets/logo.png"), alt: this.$t("AboutUs.imageAlt2", "Logo Image") },
      ],
      // Add default values for alt text just in case translation fails
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
  overflow: hidden; /* Added to contain potential pseudo-element overflow */
}

/* Keep pseudo-element if desired, ensure it doesn't interfere */
.about::after {
  content: "";
  /* background-image: url(...); */ /* Add your pattern here if needed */
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.1; /* Reduced opacity further */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* Ensure it's behind content */
}

/* Ensure content is above the pseudo-element */
h2, p, .slideshow-container {
  position: relative;
  z-index: 1;
}


h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 1.5rem; /* Slightly reduced margin */
  max-width: 800px; /* Limit paragraph width for readability */
  margin-left: auto;
  margin-right: auto;
}

.slideshow-container {
  position: relative;
  /* Use a max-width for better control than percentage */
  max-width: 900px;
  width: 90%; /* Use width percentage for responsiveness */
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 15px; /* Optional: round the container corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Optional: add shadow */
}

.slideshow {
  position: relative;
  width: 100%;
  height: 400px;
  /* Control height using aspect-ratio instead of fixed pixels */
  aspect-ratio: 16 / 9; /* Adjust (e.g., 4 / 3, 1 / 1) based on your image shapes */
  /* Remove fixed height: height: 1000px; */
  background-color: #333; /* Add a background for loading/transition */
}

.about-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.6s ease-in-out, transform 0.5s ease;
  filter: brightness(1.1);
  opacity: 0;
  z-index: 0;
}

.about-image.active {
  opacity: 1;
  z-index: 1;
}

.about-image.active:hover {
  transform: scale(1.05);
}

/* Removed the hover effect that shrinks the image as it might be distracting */
/* .about-image:hover { ... } */

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  color: white;
  border: none;
  padding: 0.6rem 1.1rem; /* Slightly adjusted padding */
  cursor: pointer;
  font-size: 1.8rem; /* Slightly larger arrows */
  border-radius: 50%;
  transition: background-color 0.3s ease;
  z-index: 2; /* Ensure arrows are above images */
}

.arrow:hover {
  background-color: rgba(0, 0, 0, 0.8); /* Darker on hover */
}

.left-arrow {
  left: 15px; /* Adjusted position */
}

.right-arrow {
  right: 15px; /* Adjusted position */
}

/* Add media query for smaller screens if needed */
@media (max-width: 600px) {
  .slideshow-container {
    width: 95%;
  }
  .arrow {
    font-size: 1.5rem;
    padding: 0.4rem 0.9rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  p {
    font-size: 15px;
  }
}
</style>