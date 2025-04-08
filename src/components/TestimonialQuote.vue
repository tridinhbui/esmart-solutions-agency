<template>
  <section id="testimonials">
    <h2>{{ $t("socialProof.testimonialsTitle") }}</h2>
    <div class="testimonials-container scroller" data-speed="slow">
      <div class="testimonials-track scroller__inner" :style="{ transform: `translateX(-${translateX}px)` }">
        <!-- First set of testimonials -->
        <div
          class="testimonial-card"
          v-for="(testimonial, index) in testimonials"
          :key="'first-' + index"
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
        <!-- Second set of testimonials for seamless looping -->
        <div
          class="testimonial-card"
          v-for="(testimonial, index) in testimonials"
          :key="'second-' + index"
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
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialQuote",
  data() {
    return {
      translateX: 0,
      testimonials: [
        { image: "testimonial1.jpg" },
        { image: "testimonial2.jpg" },
        { image: "testimonial3.jpg" },
        { image: "testimonial4.jpg" },
        { image: "testimonial5.jpg" },
        { image: "testimonial6.jpg" },
      ],
    };
  },
  computed: {
    trackWidth() {
      return this.testimonials.length * 320; // 320px is the width of each card (300px + 20px margin)
    },
  },
  methods: {
    getImageUrl(image) {
      return require(`@/assets/${image}`);
    },
    startAutoSlide() {
      setInterval(() => {
        this.translateX += 1;
        if (this.translateX >= this.trackWidth) {
          this.translateX = 0;
        }
      }, 16); // ~60fps
    },
  },
  mounted() {
    this.startAutoSlide();

    const scroller = this.$el.querySelector(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scroller.setAttribute("data-animated", true);
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  },
};
</script>

<style scoped>
@import "@fortawesome/fontawesome-free/css/all.css";

#testimonials {
  padding: 3rem 2rem;
  background: #f4f4f4;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.testimonials-container {
  overflow: hidden;
  width: 100%;
  margin: 2rem 0;
}

.testimonials-track {
  display: flex;
  transition: transform 0.1s linear;
}

.testimonial-card {
  background: white;
  color: black;
  border-radius: 8px;
  padding: 1rem;
  margin: 0 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  flex-shrink: 0;
  text-align: left;
}

.testimonial-card img.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.testimonial-card h3 {
  font-size: 1.2rem;
  margin: 0.5rem 0 0.2rem;
  color: #333;
}

.testimonial-card h4 {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stars {
  color: #ffd700;
  margin: 0.5rem 0;
}

.testimonial-text {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
}

.scroller {
  max-width: 100%;
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

@media (max-width: 768px) {
  .testimonials-track {
    display: flex;
  }

  .testimonial-card {
    width: 250px;
  }

  h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .testimonial-card {
    width: 200px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }
}
</style>