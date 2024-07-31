<template>
  <div id="app">
    <Navbar />
    <section id="Trang chủ">
      <HeroSection />
    </section>
    <section id="social-proof">
      <SocialProof />
    </section>
    <section id="features">
      <FeaturesPage />
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
    <section id="contact">
      <ContactUs />
    </section>
    <section id="footer">
      <Footer />
    </section>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'
import HeroSection from './components/IntroSection.vue'
import SocialProof from './components/SocialProof.vue'
import FeaturesPage from './components/FeaturesPage.vue'
import ProcessInt from './components/OurProcess.vue'
import BlogPost from './components/BlogPost.vue'
import ContactUs from './components/ContactUs.vue'
import Footer from './components/FooterBar.vue'
import Service from './components/ServiceSection.vue'
import Project from './components/ProjectSection.vue'
import AboutUs from './components/AboutUs.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    HeroSection,
    SocialProof,
    FeaturesPage,
    ProcessInt,
    BlogPost,
    ContactUs,
    Project,
    Footer,
    Service,
    AboutUs
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  background-color: #f3f4f6;
}
#app {
  text-align: center;
  padding-top: 70px; /* Adjust padding to avoid navbar overlap */
}

section {
  padding:  0; /* Adjust padding for better spacing */
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
</style>