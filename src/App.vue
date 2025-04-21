<template>
  <div id="app">
    <!-- Render Navbar only if the current route is not DetailedBlog1 or EsmartCreatorAI -->
    <Navbar v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage" />
    <router-view v-if="shouldShowRouterView"></router-view>
    <!-- Render sections only if the current route is not DetailedBlog1 or EsmartCreatorAI -->
    <template v-if="shouldShowMainContent && !isCreatorAIPage">
      <section id="intro">
        <IntroSection />
      </section>
      <section id="social-proof">
        <SocialProof />
      </section>
      <section id="marketing-assessment">
        <MarketingAssessment />
      </section>
      <section id="features">
        <FeaturesPage />
      </section>
       <!-- TestimonialQuote section -->
       <section id="testimonials">
        <TestimonialQuote />
      </section>
      <section id="process">
        <ProcessInt />
      </section>
      <section id="blog">
        <BlogPost />
      </section>
      <section id="project">
        <Project />
      </section>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="service">
        <Service />
      </section>
      <section id="questions">
        <Questions />
      </section>
      <section id="chat">
        <Chat />
      </section>
    </template>
    <section
      id="footer"
      v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage"
    >
      <Footer />
    </section>
    <!-- Back to Top Button -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="back-to-top"
    >
      ↑ Top
    </button>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import IntroSection from "./components/IntroSection.vue";
import SocialProof from "./components/SocialProof.vue";
import FeaturesPage from "./components/FeaturesPage.vue";
import ProcessInt from "./components/ServiceSection.vue";
import BlogPost from "./components/BlogPost.vue";
import Footer from "./components/FooterBar.vue";
import Service from "./components/ServiceSection.vue";
import Project from "./components/ProjectSection.vue";
import AboutUs from "./components/AboutUs.vue";
import Questions from "./components/Questions.vue";
import Chat from "./components/Chat.vue";
import MarketingAssessment from "./components/MarketingAssessment.vue";
import TestimonialQuote from "./components/TestimonialQuote.vue";

export default {
  name: "App",
  components: {
    Navbar,
    IntroSection,
    MarketingAssessment,
    SocialProof,
    FeaturesPage,
    ProcessInt,
    BlogPost,
    Project,
    Footer,
    Service,
    AboutUs,
    Questions,
    Chat,
    TestimonialQuote,
  },
  data() {
    return {
      showBackToTop: true, // Set to true initially for testing
    };
  },
  computed: {
    isDetailedBlogPage() {
      return this.$route.name === "DetailedBlog1";
    },
    isAuthPage() {
      return ["SignIn", "SignUp"].includes(this.$route.name);
    },
    shouldShowRouterView() {
      return this.isAuthPage || this.isDetailedBlogPage || this.$route.name === "ContactUs";
    },
    isCreatorAIPage() {
      return this.$route.name === "EsmartCreatorAI";
    },
    shouldShowMainContent() {
      return !this.isAuthPage && !this.isDetailedBlogPage && this.$route.name !== "ContactUs";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    console.log("Scroll event listener added"); // Debug log
    this.handleScroll(); // Call initially to check state
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    console.log("Scroll event listener removed"); // Debug log
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY;
      console.log("Scroll position:", scrollY); // Debug log
      this.showBackToTop = scrollY > 300;
      console.log("showBackToTop:", this.showBackToTop); // Debug log
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: "Space Grotesk", sans-serif;
  background-color: #f3f4f6;
}
#app {
  text-align: center;
}

section {
  padding: 0; /* Adjust padding for better spacing */
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Back to Top Button Styles */
.back-to-top {
  position: fixed;
  bottom: 200px;
  right: 20px; /* Position on the right side */
  background-color: #007bff; /* Example color */
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s;
  opacity: 0.8;
  z-index: 1000; /* Ensure it’s above other elements */
}

.back-to-top:hover {
  opacity: 1;
}
</style>