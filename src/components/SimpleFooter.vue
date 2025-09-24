<template>
  <footer class="simple-footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Footer Left - Company Info -->
        <div class="footer-left">
          <h2 class="main-title slide-up-element" data-delay="0.05">
            {{ $t("simpleComponents.hero.allStartsWith") }}
            {{ $t("simpleComponents.hero.conversation") }}
          </h2>
          <p class="subtitle slide-up-element" data-delay="0.1">
            {{ $t("hero.readyToTransform") }}
          </p>
        </div>

        <!-- Footer Center - Contact Form -->
        <div class="footer-center">
          <div class="contact-form-section">
            <h3 class="form-title slide-up-element" data-delay="0.15">
              {{ $t("simpleComponents.footer.getInTouch") }}
            </h3>
            <form
              class="contact-form slide-up-element"
              data-delay="0.2"
              @submit.prevent="submitForm"
            >
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t("simpleComponents.footer.form.name") }}</label>
                  <input
                    type="text"
                    v-model="formData.name"
                    :placeholder="
                      $t('simpleComponents.footer.form.namePlaceholder')
                    "
                    required
                  />
                </div>
                <div class="form-group">
                  <label>{{ $t("simpleComponents.footer.form.email") }}</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    :placeholder="
                      $t('simpleComponents.footer.form.emailPlaceholder')
                    "
                    required
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t("simpleComponents.footer.form.phone") }}</label>
                  <input
                    type="tel"
                    v-model="formData.phone"
                    :placeholder="
                      $t('simpleComponents.footer.form.phonePlaceholder')
                    "
                  />
                </div>
                <div class="form-group">
                  <label>{{
                    $t("simpleComponents.footer.form.channel")
                  }}</label>
                  <input
                    type="url"
                    v-model="formData.channelLink"
                    :placeholder="
                      $t('simpleComponents.footer.form.channelPlaceholder')
                    "
                  />
                </div>
              </div>
              <div class="form-group full-width">
                <label>{{ $t("simpleComponents.footer.form.message") }}</label>
                <textarea
                  v-model="formData.message"
                  :placeholder="
                    $t('simpleComponents.footer.form.messagePlaceholder')
                  "
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" class="submit-btn">
                {{ $t("simpleComponents.footer.form.sendMessage") }}
                <i class="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Footer Right - CTA -->
        <div class="footer-right">
          <div class="cta-section">
            <h3 class="cta-title slide-up-element" data-delay="0.2">
              {{ $t("simpleComponents.footer.readyToStart") }}
            </h3>
            <p class="cta-subtitle slide-up-element" data-delay="0.3">
              {{ $t("simpleComponents.footer.makeYourDreams") }}
            </p>
            <button
              class="cta-button slide-up-element"
              data-delay="0.4"
              @click="startConversation"
            >
              {{ $t("simpleComponents.hero.startYourDream") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">{{ $t("simpleComponents.footer.copyright") }}</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SimpleFooter",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        channelLink: "",
        phone: "",
        message: "",
      },
    };
  },
  mounted() {
    this.initSlideUpAnimations();
  },
  methods: {
    startConversation() {
      // Scroll to contact form or redirect to contact page
      const contactSection = document.querySelector(".simple-about");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback: scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    submitForm() {
      console.log("Form submitted:", this.formData);
      // In a real application, you would send this data to a backend API
      alert("Thank you for your message! We will get back to you soon.");
      this.formData = {
        name: "",
        email: "",
        channelLink: "",
        phone: "",
        message: "",
      };
    },

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
.simple-footer {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 80px 0 40px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 4rem;
  margin-bottom: 60px;
}

/* Footer Left */
.footer-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-title {
  font-family: "Inter", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
  margin: 0;
}

.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Footer Center - Contact Form */
.footer-center {
  display: flex;
  justify-content: center;
}

.contact-form-section {
  width: 100%;
  max-width: 500px;
}

.form-title {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
  margin-bottom: 30px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #ffffff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.submit-btn i {
  font-size: 14px;
}

/* Footer Right */
.footer-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.cta-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.cta-title {
  font-family: "Inter", sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.cta-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.cta-button {
  padding: 16px 32px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid #e2e8f0;
  padding-top: 30px;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  color: #64748b;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #3b82f6;
  color: #ffffff;
  transform: translateY(-2px);
}

.social-link i {
  font-size: 16px;
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
.slide-up-element[data-delay="0.2"] {
  transition-delay: 0.2s;
}
.slide-up-element[data-delay="0.3"] {
  transition-delay: 0.3s;
}
.slide-up-element[data-delay="0.4"] {
  transition-delay: 0.4s;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 3rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .form-title,
  .cta-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .simple-footer {
    padding: 60px 0 30px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .footer-left {
    align-items: center;
  }

  .main-title {
    font-size: 2rem;
  }

  .form-title,
  .cta-title {
    font-size: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .simple-footer {
    padding: 50px 0 25px;
  }

  .footer-container {
    padding: 0 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .form-title,
  .cta-title {
    font-size: 1.4rem;
  }

  .contact-form {
    gap: 15px;
  }

  .form-group input,
  .form-group textarea {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  .submit-btn,
  .cta-button {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}
</style>
