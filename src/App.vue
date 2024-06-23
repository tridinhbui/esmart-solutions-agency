<template>
  <div id="app">
    <Navbar />
    <HeroSection />
    <Service />
    <SocialProof />
    <FeaturesPage />
    <ProcessInt />
    <Project />
    <BlogPost />
    <NewFile/>
    <ContactUs />
    <Footer />

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
import NewFile from './components/NewFile.vue'


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
    NewFile
 
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
