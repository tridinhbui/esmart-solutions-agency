<template>
  <div id="app">
    <!-- Google Fonts Import -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />

    <!-- Render Navbar only if the current route is not DetailedBlog1 or EsmartCreatorAI or ContactUs -->
    <SimpleNavBar
      v-if="!isAuthPage && !isDetailedBlogPage && !isCreatorAIPage"
    />

    <!-- Router View for all pages -->
    <router-view />
    <ContactFooter />
  </div>
</template>

<script>
import SimpleNavBar from "./components/SimpleNavBar.vue";
import ContactFooter from "./components/ContactFooter.vue";

export default {
  name: "App",
  components: {
    SimpleNavBar,
    ContactFooter,
  },
  computed: {
    isAuthPage() {
      return this.$route.name === "SignIn" || this.$route.name === "SignUp";
    },
    isDetailedBlogPage() {
      return this.$route.name === "DetailedBlog1";
    },
    isCreatorAIPage() {
      return this.$route.name === "EsmartCreatorAI";
    },
  },
};
</script>

<style>
/* eslint-disable */
@import "./assets/css/elegant-utilities.css";

/* Global Font Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Typography System */
body {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 1.6;
}

/* Heading Fonts - Inter (Primary) */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

/* Body Text - Inter */
.body-text {
  font-family: "Inter", sans-serif;
  font-weight: 400;
}

/* Medium Weight - Inter */
.medium-text {
  font-family: "Inter", sans-serif;
  font-weight: 500;
}

/* Semi Bold - Inter */
.semi-bold-text {
  font-family: "Inter", sans-serif;
  font-weight: 600;
}

/* Bold - Inter */
.bold-text {
  font-family: "Inter", sans-serif;
  font-weight: 700;
}

/* Extra Bold - Inter */
.extra-bold-text {
  font-family: "Inter", sans-serif;
  font-weight: 800;
}

/* Main Sections Container */
.main-sections-container {
  position: relative;
  z-index: 1;
}

/* Scroll Fade Transition */
.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: opacity 0.3s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-sections-container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .main-sections-container {
    padding: 0 0.5rem;
  }
}
</style>
