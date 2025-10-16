<template>
  <footer
    class="simple-footer"
    style="padding-top: 20px; padding-bottom: 60px"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-row justify-around lg:flex-row gap-8">
        <!-- LEFT COLUMN (5/12 width) - Logo, Contact, Buttons -->
        <div class="lg:w-5/12">
          <!-- Phone -->
          <div class="mb-4">
            <p class="footer-text-primary">
              <i class="fa fa-phone text-blue-500 mr-2"></i>
              <strong>{{ $t("footerbar.phone") }}</strong>
            </p>
            <ul class="footer-text-secondary mt-2">
              <li>
                <strong>{{ $t("footerbar.call") }}:</strong>
                <a href="tel:+84868885505" class="footer-text-secondary hover:underline"
                  >868-885-505</a
                >
              </li>
            </ul>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <p class="footer-text-primary">
              <i class="fa fa-envelope text-blue-500 mr-2"></i>
              <strong>{{ $t("footerbar.email") }}</strong>
            </p>
            <ul class="footer-text-secondary mt-2">
              <li>
                <strong>{{ $t("footerbar.support") }}:</strong>
                <a
                  href="mailto:esmartsolutions.agency@gmail.com"
                  class="footer-text-secondary hover:underline"
                  >esmartsolutions.agency@gmail.com</a
                >
              </li>
            </ul>
          </div>

          <!-- Address -->
          <div class="mb-6">
            <p class="footer-text-primary">
              <i class="fa fa-map-marker mr-2 text-blue-600"></i>
              <strong>{{ $t("footerbar.address") }}</strong>
            </p>
            <ul class="footer-text-secondary mt-2">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=140+Nguyen+Xien+st%2C+Thanh+Xuan+dist"
                  target="_blank"
                  rel="noopener"
                  class="hover:underline"
                >
                  140 Nguyen Xien st, Thanh Xuan dist
                </a>
              </li>
            </ul>
          </div>
          <!-- Buttons -->
          <div class="flex flex-col gap-3">
            <a
              href="/contact/"
              class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-fit"
              style="
                display: inline-flex !important;
                background-color: var(--primary-blue-dark) !important;
                color: white !important;
              "
            >
              <span>{{ $t("footerbar.supportButton") }}</span>
              <span class="ml-2">→</span>
            </a>
          </div>
        </div>

        <!-- RIGHT COLUMN (7/12 width) - Navigation Links in 3 columns -->
        <div class="lg:w-7/12">
          <div
            class="flex flex-row sm:grid-cols-2 justify-between lg:grid-cols-3 gap-8"
          >
            <!-- Column 1 -->
            <div>
              <!-- Marketing -->
              <div class="mb-8">
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.marketing") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/insurance-agency-websites/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.websites") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-automation/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.marketingAutomation") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-agency-marketing-and-websites/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.marketingWebsites") }}</a
                    >
                  </li>
                  <li>
                    <a href="/enterprise/" class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.enterprise") }}</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Digital Features -->
              <div>
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.digitalFeatures") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/insurance-marketing-tools/business-texting/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.businessTexting") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/do-it-for-me-marketing/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.doItForMeMarketing") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/local-listings/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.localListings") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/reputation-management/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.reputationManagement") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/social-media/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.socialMedia") }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 2 -->
            <div>
              <!-- Resources -->
              <div class="mb-13">
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.resources") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/blog/" class="footer-text-secondary hover:underline">{{ $t("footerbar.blog") }}</a>
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-resources/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.resourcesLink") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-webinars/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.webinars") }}</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Support -->
              <div>
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.supportSection") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/support/" class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.getSupport") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/support/#additional-support"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.liveTraining") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/support/#additional-support/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.helpCenter") }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 3 -->
            <div>
              <!-- Who We Are -->
              <div class="mb-13">
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.whoWeAre") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/about-us/" class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.aboutUs") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/about-us/leadership/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.leadership") }}</a
                    >
                  </li>
                  <li>
                    <a
                      href="/about-us/careers/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.careers") }}</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Who We Serve -->
              <div>
                <h4 class="footer-text-primary font-bold mb-4">{{ $t("footerbar.whoWeServe") }}</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/independent-insurance-agencies/"
                      class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.professionals") }}</a
                    >
                  </li>
                  <li>
                    <a href="/enterprise/" class="footer-text-secondary hover:underline"
                      >{{ $t("footerbar.enterprises") }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Text -->
      <div class="mt-12 pt-8 text-gray-600 text-sm border-t border-gray-200">
        <p style="font-size: 13px; line-height: 23px">
          {{ $t("footerbar.bottomDescription") }}
          <a href="#" class="text-gray-600 border-none hover:underline"
            >{{ $t("footerbar.doNotSell") }}</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default { 
  name: "SimpleFooter",
  // Option 1: If you want to receive language as a prop
  props: {
    currentLanguage: {
      type: String,
      default: "en"
    }
  },
  // Option 2: If you want to watch for global language changes
  watch: {
    "$i18n.locale"(newLang) {
      // React to language changes if needed
      console.log("Language changed to:", newLang);
    }
  }
};
</script>

<style scoped>
.footer-bg-light {
  position: relative;
  background-color: var(--bg-primary);
  color: black;
  z-index: 110;
}

.container {
  position: relative;
  z-index: 1;
}

/* Icon styling */
.fa {
  font-family: FontAwesome;
}

.fa-phone:before {
  content: "📞";
}

.fa-envelope:before {
  content: "✉️";
}

.fa-caret-right:before {
  content: "▶";
}

/* Button hover states */
a:hover {
  transition: all 0.3s ease;
}

/* Text styling */
h4 {
  font-weight: 600;
}

h5 {
  font-weight: 600;
}

ul li {
  font-size: 14px;
  line-height: 1.5;
}

/* Links */
a {
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  text-decoration: underline;
}

/* Button styling */
.inline-flex {
  display: inline-flex;
  align-items: center;
  text-align: center;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Theme-aware Footer Styles */
.simple-footer {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-text-primary {
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.footer-text-secondary {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.footer-text-secondary a {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.footer-text-secondary a:hover {
  color: var(--primary-blue);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .simple-footer {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .grid {
    gap: 1.5rem;
  }
}
</style>