<template>
  <section class="social-proof-testimonials">
    <h2>{{ $t("socialProof.mediaTitle") }}</h2>
    <div class="scroller" data-speed="fast">
      <div class="socials scroller__inner">
        <a
          v-for="social in socialMedia"
          :key="social.name"
          :href="social.link"
          target="_blank"
          class="social-item"
        >
          <img :src="getImageUrl(social.icon)" :alt="social.name" />
          <p class="description">
            {{ $t("socialProof." + social.name.toLowerCase()) }}
          </p>
        </a>
      </div>
    </div>
    <h2>{{ $t("socialProof.testimonialsTitle") }}</h2>
    <div class="testimonials-container animate-fadeIn">
      <div
        class="testimonial-card animate-float"
        v-for="(testimonial, index) in testimonials"
        :key="index"
      >
        <img
          :src="getImageUrl(testimonial.image)"
          :alt="testimonial.name"
          class="avatar"
        />
        <h3>{{ $t("socialProof.testimonial" + (index + 1) + ".name") }}</h3>
        <h4>{{ $t("socialProof.testimonial" + (index + 1) + ".title") }}</h4>
        <div class="stars">
          <i class="fas fa-star" v-for="n in 5" :key="n"></i>
        </div>
        <p class="testimonial-text">
          {{ $t("socialProof.testimonial" + (index + 1) + ".text") }}
        </p>
      </div>
    </div>
    <h2>{{ $t("socialProof.toolkitTitle") }}</h2>
    <div class="toolkit animate-slideIn">
      <div
        class="toolkit-item animate-float"
        v-for="(item, index) in toolkit"
        :key="index"
        @click="openModal(item)"
      >
        <i :class="item.icon"></i>
        <h3>{{ $t("socialProof.toolkit.item" + (index + 1) + ".title") }}</h3>
        <p>
          {{ $t("socialProof.toolkit.item" + (index + 1) + ".description") }}
        </p>
      </div>
    </div>

    <v-dialog v-model="isModalOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ selectedItem.title }}</v-card-title>
        <v-card-text>
          <p>{{ selectedItem.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isModalOpen = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: "SocialProofTestimonials",
  data() {
    return {
      isModalOpen: false,
      selectedItem: {},
      socialMedia: [
        {
          name: "Facebook",
          icon: "facebook.png",
          link: "https://www.facebook.com",
        },
        {
          name: "Instagram",
          icon: "instagram.png",
          link: "https://www.instagram.com",
        },
        {
          name: "LinkedIn",
          icon: "linkedin.png",
          link: "https://www.linkedin.com",
        },
        {
          name: "TikTok",
          icon: "tiktok.png",
          link: "https://www.tiktok.com",
        },
      ],
      testimonials: [
        { image: "testimonial1.jpg" },
        { image: "testimonial2.jpg" },
        { image: "testimonial3.jpg" },
        { image: "testimonial4.jpg" },
        { image: "testimonial5.jpg" },
        { image: "testimonial6.jpg" },
      ],
      toolkit: [
        { icon: "fas fa-palette" },
        { icon: "fas fa-tags" },
        { icon: "fas fa-heart" },
        { icon: "fas fa-cogs" },
      ],
    };
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
    openModal(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    });
    document
      .querySelectorAll(".animate-slideIn, .animate-fadeIn")
      .forEach((el) => {
        observer.observe(el);
      });

    const scroller = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scroller.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  },
};
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.social-proof-testimonials {
  background: linear-gradient(135deg, #1c1c4c, #0077b6);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.socials {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.social-item {
  margin: 0.5rem;
  text-align: center;
  flex: 1 1 20%;
}

.social-item p.description {
  color: white !important; /* Đảm bảo màu trắng */
}

.social-item img {
  height: 50px;
}

.social-item p {
  margin-top: 0.5rem;
}

.testimonials-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.testimonial-card {
  background: white;
  color: black; /* Ensure text is visible on white background */
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.testimonial-card img.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.stars {
  color: #ffd700;
  margin: 0.5rem 0;
}

.testimonial-text {
  margin-top: 0.5rem;
}

.toolkit {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.toolkit-item {
  background: white;
  color: black; /* Ensure text is visible on white background */
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
  cursor: pointer; /* Indicate that the cards are clickable */
}

.toolkit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.toolkit-item i {
  font-size: 2rem;
  color: #0077b6;
  margin-bottom: 0.5rem;
}

.toolkit-item h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: translateY(0) rotateX(0) rotateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.animate-slideIn {
  animation: slideIn 1s ease-in-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.animate-float {
  animation: float 5s ease-in-out infinite;
}

.scroller {
  max-width: 100%
}

.scroller__inner {
  padding-block: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.scroller[data-animated="true"] {
  overflow: hidden;
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll var(--_animation-duration, 40s)
    var(--_animation-direction, forwards) linear infinite;
}

.scroller[data-direction="right"] {
  --_animation-direction: reverse;
}

.scroller[data-direction="left"] {
  --_animation-direction: forwards;
}

.scroller[data-speed="fast"] {
  --_animation-duration: 20s;
}

.scroller[data-speed="slow"] {
  --_animation-duration: 60s;
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}

/* general styles */

:root {
  --clr-neutral-100: hsl(0, 0%, 100%);
  --clr-primary-100: hsl(205, 15%, 58%);
  --clr-primary-400: hsl(215, 25%, 27%);
  --clr-primary-800: hsl(217, 33%, 17%);
  --clr-primary-900: hsl(218, 33%, 9%);
}

html {
  color-scheme: dark;
}

body {
  display: grid;
  min-block-size: 100vh;
  place-content: center;
  font-family: system-ui;
  font-size: 1.125rem;
  background-color: var(--clr-primary-800);
}

.tag-list {
  margin: 0;
  padding-inline: 0;
  list-style: none;
}

.tag-list li {
  padding: 1rem;
  background: var(--clr-primary-400);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem -0.25rem var(--clr-primary-900);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .social-item,
  .testimonial-card,
  .toolkit-item {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
