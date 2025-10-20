<template>
  <footer
    class="footer-bg-light bg-white border-t border-gray-200"
    style="padding-top: 20px; padding-bottom: 60px"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-row justify-around lg:flex-row gap-8">
        <!-- LEFT COLUMN (5/12 width) - Logo, Contact, Buttons -->
        <div class="lg:w-5/12">
          <!-- Phone -->
          <div class="mb-4">
            <p class="text-white">
              <i class="fa fa-phone text-blue-500 mr-2"></i>
              <strong>Phone</strong>
            </p>
            <ul class="text-white mt-2">
              <li>
                <strong>Call:</strong>
                <a href="tel:+84868885505" class="text-white hover:underline"
                  >868-885-505</a
                >
              </li>
            </ul>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <p class="text-white">
              <i class="fa fa-envelope text-blue-500 mr-2"></i>
              <strong>Email</strong>
            </p>
            <ul class="text-white mt-2">
              <li>
                <strong>Support:</strong>
                <a
                  href="mailto:esmartsolutions.agency@gmail.com"
                  class="text-white hover:underline"
                  >esmartsolutions.agency@gmail.com</a
                >
              </li>
            </ul>
          </div>

          <!-- Address -->
          <div class="mb-6">
            <p class="text-white">
              <i class="fa fa-map-marker mr-2 text-blue-600"></i>
              <strong>Address</strong>
            </p>
            <ul class="text-white mt-2">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=140+Nguyen+Xien+st%2C+Thanh+Xuan+dist"
                  target="_blank"
                  rel="noopener"
                  class="text-white hover:underline"
                >
                  140 Nguyen Xien St, Thanh Xuan dist
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
                background-color: #2563eb !important;
                color: white !important;
              "
            >
              <span>Support</span>
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
              <!-- Insurance Marketing -->
              <div class="mb-8">
                <h4 class="text-white font-bold mb-4">Marketing</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/insurance-agency-websites/"
                      class="text-white hover:underline"
                      >Websites</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-automation/"
                      class="text-white hover:underline"
                      >Marketing Automation</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-agency-marketing-and-websites/"
                      class="text-white hover:underline"
                      >Marketing + Websites</a
                    >
                  </li>
                  <li>
                    <a href="/enterprise/" class="text-white hover:underline"
                      >Enterprise</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Digital Features -->
              <div>
                <h4 class="text-white font-bold mb-4">Digital Features</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/insurance-marketing-tools/business-texting/"
                      class="text-white hover:underline"
                      >Business Texting</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/do-it-for-me-marketing/"
                      class="text-white hover:underline"
                      >Do It For Me Marketing</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/local-listings/"
                      class="text-white hover:underline"
                      >Local Listings</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/reputation-management/"
                      class="text-white hover:underline"
                      >Reputation Management</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-tools/social-media/"
                      class="text-white hover:underline"
                      >Social Media</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 2 -->
            <div>
              <!-- Resources -->
              <div class="mb-13">
                <h4 class="text-white font-bold mb-4">Resources</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/blog/" class="text-white hover:underline">Blog</a>
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-resources/"
                      class="text-white hover:underline"
                      >Resources</a
                    >
                  </li>
                  <li>
                    <a
                      href="/insurance-marketing-webinars/"
                      class="text-white hover:underline"
                      >Webinars</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Support -->
              <div>
                <h4 class="text-white font-bold mb-4">Support</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/support/" class="text-white hover:underline"
                      >Get Support</a
                    >
                  </li>
                  <li>
                    <a
                      href="/support/#additional-support"
                      class="text-white hover:underline"
                      >Live Training</a
                    >
                  </li>
                  <li>
                    <a
                      href="/support/#additional-support/"
                      class="text-white hover:underline"
                      >Help Center</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <!-- Column 3 -->
            <div>
              <!-- Who We Are -->
              <div class="mb-13">
                <h4 class="text-white font-bold mb-4">Who We Are</h4>
                <ul class="space-y-2">
                  <li>
                    <a href="/about-us/" class="text-white hover:underline"
                      >About Us</a
                    >
                  </li>
                  <li>
                    <a
                      href="/about-us/leadership/"
                      class="text-white hover:underline"
                      >Leadership</a
                    >
                  </li>
                  <li>
                    <a
                      href="/about-us/careers/"
                      class="text-white hover:underline"
                      >Careers</a
                    >
                  </li>
                </ul>
              </div>

              <!-- Who We Serve -->
              <div>
                <h4 class="text-white font-bold mb-4">Who We Serve</h4>
                <ul class="space-y-2">
                  <li>
                    <a
                      href="/independent-insurance-agencies/"
                      class="text-white hover:underline"
                      >Professionals</a
                    >
                  </li>
                  <li>
                    <a href="/enterprise/" class="text-white hover:underline"
                      >Enterprises</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Text -->
      <div class="mt-12 pt-8 text-white text-sm border-t border-gray-400">
        <p style="font-size: 13px; line-height: 23px">
          ESmart Solutions provides insurance marketing automation and digital
          marketing tools to independent insurance agents and brokers throughout
          the nation including Oregon, California, New York, Texas, Florida,
          Pennsylvania, Illinois, Ohio, Georgia, North Carolina, Michigan, New
          Jersey, Virginia, Washington, Arizona and others in the United States.
          <a href="#" class="text-white border-none hover:underline"
            >Do not sell my personal information.</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default { name: "SimpleFooter" };
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-bg-light {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .grid {
    gap: 1.5rem;
  }
}
</style>
