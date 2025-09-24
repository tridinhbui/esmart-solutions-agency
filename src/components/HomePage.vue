<template>
  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero-wrapper" style="padding-top: 0">
      <SimpleHeroSection />
    </div>

    <!-- Main Sections -->
    <div class="main-sections-container">
      <!-- Social Proof Section -->
      <SimpleSocialProof />

      <!-- Marketing Assessment Ssection -->
      <SimpleMarketingAssessment />

      <!-- Features Section -->
      <SimpleFeatures />

      <!-- Testimonials Section -->
      <SimpleTestimonial />

      <!-- About Us Section -->
      <SimpleAboutUs />
    </div>

    <!-- Footer -->
    <section id="footer" class="footer-section">
      <SimpleFooter />
    </section>

    <!-- Chat Bot -->
    <ChatBot />

    <!-- Go To Top Button -->
    <GoToTopButton v-if="showScrollTop" />
  </div>
</template>

<script>
import SimpleHeroSection from "./SimpleHeroSection.vue";
import SimpleSocialProof from "./SimpleSocialProof.vue";
import SimpleFeatures from "./SimpleFeatures.vue";
import SimpleAboutUs from "./SimpleAboutUs.vue";
import SimpleTestimonial from "./SimpleTestimonial.vue";
import SimpleMarketingAssessment from "./SimpleMarketingAssessment.vue";
import SimpleFooter from "./SimpleFooter.vue";
import ChatBot from "./ChatBot.vue";
import GoToTopButton from "./GoToTopButton.vue";

export default {
  name: "HomePage",
  components: {
    SimpleHeroSection,
    SimpleSocialProof,
    SimpleFeatures,
    SimpleAboutUs,
    SimpleTestimonial,
    SimpleMarketingAssessment,
    SimpleFooter,
    ChatBot,
    GoToTopButton,
  },
  data() {
    return {
      showScrollTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
    },
  },
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-wrapper {
  position: relative;
}

.main-sections-container {
  position: relative;
  z-index: 2;
}

.footer-section {
  position: relative;
  z-index: 2;
}
</style>
