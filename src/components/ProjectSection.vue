<template>
  <section class="feats-section">
    <h2>{{ $t("feats.sectionTitle") }}</h2>
    <h1>{{ $t("feats.mainTitle") }}</h1>
    <div class="feats-container reveal">
      <div class="feat-item reveal" v-for="(feat, index) in features" :key="index">
        <div class="feat-icon reveal">
          <i :class="feat.icon"></i>
        </div>
        <p>{{ $t(`feats.items.${index}`) }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeatsSection",
  computed: {
    features() {
      // The titles are managed via the translation keys directly
      return [
        { icon: "fas fa-cogs" }, // Titles now managed via translations
        { icon: "fas fa-shopping-cart" },
        { icon: "fas fa-globe" },
        { icon: "fas fa-video" },
        { icon: "fas fa-paint-brush" },
      ];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.reveal);
    this.reveal(); // Ensure animation triggers on page load if elements are already in view
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.reveal);
  },
  methods: {
    reveal() {
      const reveals = document.querySelectorAll(".reveal");
      const windowHeight = window.innerHeight;
      const revealPoint = 200;

      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    },
  },
};
</script>

<style scoped>
.reveal {
  position: relative;
  transform: translateY(30px);
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease-in-out;
}

.reveal.active {
  transform: translateY(0);
  opacity: 1;
}
/* Adjust delay for each element */
.feat-icon {
  transition-delay: 0s; /* slightly earlier */
}

.feat-item {
  transition-delay: 0s; /* appears earlier */
}


.feats-section {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f8f9fa;
}

.feats-section h2 {
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.feats-section h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.feats-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  max-width: 150px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.feat-icon {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.feat-icon i {
  font-size: 2.5rem;
  color: #333;
}

.feat-item p {
  font-size: 1rem;
  color: #333;
  margin: 0;
}

.feat-item:hover .feat-icon {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.2);
}
</style>
``` In this example, I've replaced the image tags with Font Awesome icons using
the `i` tag and the class names provided by Font Awesome. I've also adjusted the
CSS to style the icons and add a 3D float effect on hover. You can customize the
icon classes and styles as needed for your project. -->