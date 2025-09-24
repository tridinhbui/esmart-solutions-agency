<template>
  <section class="simple-testimonial">
    <!-- Background Pattern -->
    <div class="flat-background">
      <div class="geometric-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <!-- Header Icon -->
        <div class="header-icon slide-up-element" data-delay="0.05">
          <i class="fas fa-quote-right"></i>
        </div>

        <!-- Section Title -->
        <h2 class="section-title slide-up-element" data-delay="0.1">
          {{ $t("sections.whatCustomersSay") }}
        </h2>

        <!-- Section Subtitle -->
        <p class="section-subtitle slide-up-element" data-delay="0.15">
          {{ $t("sections.whatCustomersSaySubtitle") }}
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card flat-card slide-up-element"
          :data-delay="0.8 + index * 0.1"
        >
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-right"></i>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4 class="author-name">{{ testimonial.name }}</h4>
                <p class="author-position">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SimpleTestimonial",
  computed: {
    testimonials() {
      // Force reactivity by accessing $i18n.locale
      const currentLocale = this.$i18n.locale;
      console.log("Current locale:", currentLocale);

      // Get testimonials from translation data using a more specific approach
      try {
        // Try to access the testimonials directly from the messages
        const messages = this.$i18n.messages[currentLocale];
        console.log("Messages available:", !!messages);

        if (
          messages &&
          messages.simpleComponents &&
          messages.simpleComponents.testimonials
        ) {
          const testimonials = messages.simpleComponents.testimonials;
          console.log("Direct testimonials access:", testimonials);
          console.log("Is array:", Array.isArray(testimonials));
          console.log("Length:", testimonials?.length);

          if (Array.isArray(testimonials) && testimonials.length > 0) {
            return testimonials;
          }
        }

        // Fallback to $t method
        const translatedTestimonials = this.$t("simpleComponents.testimonials");
        console.log("$t testimonials:", translatedTestimonials);

        if (
          Array.isArray(translatedTestimonials) &&
          translatedTestimonials.length > 0
        ) {
          return translatedTestimonials;
        }
      } catch (error) {
        console.error("Error getting testimonials from translations:", error);
      }

      // Fallback to hardcoded data if translation not available
      console.log("Using fallback testimonials");
      return this.fallbackTestimonials;
    },
  },
  watch: {
    // Watch for language changes and force re-render
    "$i18n.locale"() {
      console.log("Language changed, testimonials should update");
      this.$forceUpdate();
    },
  },
  data() {
    return {
      fallbackTestimonials: [
        {
          text: "ESmart Solutions helped us increase website traffic by 300% and online revenue by 150%. The team is extremely professional!",
          name: "John Smith",
          position: "CEO",
        },
        {
          text: "ESmart's SEO service is truly effective. Our website reached TOP 3 on Google in just 3 months.",
          name: "Sarah Johnson",
          position: "Marketing Manager",
        },
        {
          text: "Beautiful, modern website design with optimized user experience. Very satisfied with the results!",
          name: "Michael Brown",
          position: "Founder",
        },
        {
          text: "ESmart's marketing campaign helped our brand become more widely recognized.",
          name: "Emily Davis",
          position: "Brand Manager",
        },
        {
          text: "ESmart's customized CRM system optimized our sales process, increasing efficiency by 200%.",
          name: "David Wilson",
          position: "Sales Director",
        },
        {
          text: "The marketing automation project saved us 60% time and increased quality leads by 180%.",
          name: "Lisa Anderson",
          position: "Marketing Head",
        },
      ],
    };
  },
  mounted() {
    this.initSlideUpAnimations();
  },
  methods: {
    initSlideUpAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = parseFloat(entry.target.dataset.delay) || 0;
              setTimeout(() => {
                entry.target.classList.add("animate-in");
              }, delay * 1000);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      // Observe all slide-up elements
      const slideUpElements = document.querySelectorAll(".slide-up-element");
      slideUpElements.forEach((el) => observer.observe(el));
    },
  },
};
</script>

<style scoped>
/* Flat Design Testimonials - White Background with Blue Accents */
.simple-testimonial {
  position: relative;
  padding: 120px 0;
  background: #ffffff;
  overflow: hidden;
}

.flat-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.geometric-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(59, 130, 246, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(59, 130, 246, 0.03) 0%,
      transparent 50%
    ),
    linear-gradient(
      45deg,
      transparent 48%,
      rgba(59, 130, 246, 0.02) 50%,
      transparent 52%
    );
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: #ffffff;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.section-title {
  font-family: "Inter", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.section-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  padding: 40px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.testimonial-card:hover::before {
  transform: scaleX(1);
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
  border-color: #3b82f6;
}

.testimonial-content {
  position: relative;
  padding-top: 25px; /* Add padding to prevent overlap with quote icon */
  padding-right: 25px; /* Add padding to prevent overlap on the right */
}

.quote-icon {
  position: absolute;
  top: 0px; /* Adjust to stay within the padding area */
  right: 0px; /* Adjust to stay within the padding area */
  width: 40px; /* Slightly smaller to reduce overlap */
  height: 40px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 16px; /* Smaller font size */
  z-index: 1; /* Keep it above other content */
  opacity: 0.7; /* Slightly more transparent */
}

.testimonial-text {
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  margin: 0 0 30px 0;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
}

.author-info {
  flex: 1;
}

.author-name {
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 5px 0;
}

.author-position {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* Slide Up Element Animations */
.slide-up-element {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease-out;
}

.slide-up-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered Animation Delays */
.slide-up-element[data-delay="0.05"] {
  transition-delay: 0.05s;
}
.slide-up-element[data-delay="0.1"] {
  transition-delay: 0.1s;
}
.slide-up-element[data-delay="0.15"] {
  transition-delay: 0.15s;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .testimonials-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .testimonial-card {
    padding: 35px;
  }
}

@media (max-width: 768px) {
  .simple-testimonial {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .testimonial-card {
    padding: 30px;
  }

  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .simple-testimonial {
    padding: 60px 0;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .testimonial-card {
    padding: 25px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .author-name {
    font-size: 1rem;
  }

  .author-position {
    font-size: 0.8rem;
  }
}
</style>
