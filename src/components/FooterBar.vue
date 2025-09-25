<template>
  <section class="quantum-footer app-footer-root">
    <!-- Quantum Background System -->
    <div class="footer-quantum-field">
      <div class="quantum-orb orb-footer-1"></div>
      <div class="quantum-orb orb-footer-2"></div>
      <div class="quantum-orb orb-footer-3"></div>
      <div class="quantum-orb orb-footer-4"></div>
    </div>

    <!-- Energy Grid -->
    <div class="footer-energy-grid">
      <div v-for="i in 4" :key="'h-' + i" class="grid-line horizontal"></div>
      <div v-for="i in 6" :key="'v-' + i" class="grid-line vertical"></div>
    </div>

    <!-- Floating Particles -->
    <div class="footer-particles">
      <div v-for="i in 12" :key="i" class="quantum-particle"></div>
    </div>

    <!-- Quantum Lightning Effects -->
    <div class="footer-lightning-system">
      <div v-for="i in 3" :key="'lightning-' + i" class="lightning-bolt"></div>
    </div>

    <!-- Revolutionary Holographic Overlay -->
    <div class="holographic-overlay">
      <div class="holo-pattern"></div>
      <div class="holo-scanlines"></div>
    </div>

    <div class="footer-container">
      <!-- Revolutionary Brand Section -->
      <div class="quantum-brand-section">
        <div class="brand-hologram">
          <h3 class="quantum-brand-title">
            {{ $t("footer.brand") || "ESmart Solutions" }}
            <div class="title-energy-pulse"></div>
          </h3>
          <div class="brand-energy-field"></div>
          <div class="brand-quantum-glow"></div>
          <div class="brand-matrix-effect"></div>
        </div>
        <div class="quantum-description">
          {{
            $t("footer.description") ||
            "Revolutionizing digital experiences through quantum-powered solutions and breakthrough innovations."
          }}
          <div class="description-glow"></div>
        </div>

        <!-- Social Quantum Portals -->
        <div class="social-quantum-grid">
          <div
            v-for="social in socialLinks"
            :key="social.name"
            class="social-portal"
          >
            <div class="portal-frame">
              <div class="portal-energy-ring"></div>
              <a
                :href="social.url"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.name"
                :title="social.name"
              >
                <i :class="social.icon"></i>
                <div class="icon-quantum-field"></div>
              </a>
            </div>
            <div class="portal-plasma-trail"></div>
          </div>
        </div>
      </div>

      <!-- Quantum Subscription Portal -->
      <div class="quantum-subscription">
        <div class="subscription-hologram">
          <label class="quantum-label">
            {{ $t("footer.subscribe.label") || "Subscribe to Quantum Updates" }}
            <div class="label-energy-glow"></div>
          </label>
          <div class="quantum-input-portal">
            <div class="input-energy-frame">
              <input
                v-model="emailInput"
                class="quantum-input"
                type="email"
                :placeholder="
                  $t('footer.subscribe.placeholder') ||
                  'Enter your quantum coordinates...'
                "
              />
              <div class="input-quantum-glow"></div>
              <div class="input-hologram-layer"></div>
            </div>
            <button class="quantum-submit-btn" @click="handleSubscribe">
              <div class="btn-quantum-core">
                <span>{{ $t("footer.subscribe.submit") || "Launch" }}</span>
                <div class="btn-energy-burst"></div>
                <div class="btn-rocket-trail"></div>
              </div>
              <div class="btn-force-field"></div>
            </button>
          </div>
          <div class="subscription-quantum-effects">
            <div v-for="i in 3" :key="'wave-' + i" class="quantum-wave"></div>
          </div>
        </div>
      </div>

      <!-- Quantum Navigation Grid -->
      <div class="quantum-nav-grid">
        <div class="nav-quantum-column">
          <div class="nav-quantum-card">
            <div class="card-energy-border"></div>
            <div class="card-holographic-header">
              <h4 class="nav-section-title">
                Điều hướng chính
                <div class="title-quantum-dots"></div>
              </h4>
            </div>
            <ul class="quantum-nav-list">
              <li>
                <a href="/#intro" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.home") }}</span>
                  <div class="link-quantum-trail"></div>
                </a>
              </li>
              <li>
                <a href="/#about-us" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.aboutUs") }}</span>
                  <div class="link-quantum-trail"></div>
                </a>
              </li>
              <li>
                <a href="/#process" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.process") }}</span>
                  <div class="link-quantum-trail"></div>
                </a>
              </li>
            </ul>
            <div class="card-quantum-field"></div>
          </div>
        </div>

        <div class="nav-quantum-column">
          <div class="nav-quantum-card">
            <div class="card-energy-border"></div>
            <div class="card-holographic-header">
              <h4 class="nav-section-title">
                Dịch vụ
                <div class="title-quantum-dots"></div>
              </h4>
            </div>
            <ul class="quantum-nav-list">
              <li>
                <router-link to="/contact" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.contact") }}</span>
                  <div class="link-quantum-trail"></div>
                </router-link>
              </li>
              <li>
                <a href="/#social-proof" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.socialProof") }}</span>
                  <div class="link-quantum-trail"></div>
                </a>
              </li>
              <li>
                <a href="/#achievements" class="quantum-nav-link">
                  <div class="link-energy-core"></div>
                  <span>{{ $t("footer.links.socialProof") }}</span>
                  <div class="link-quantum-trail"></div>
                </a>
              </li>
            </ul>
            <div class="card-quantum-field"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quantum Footer Bottom -->
    <div class="quantum-footer-bottom">
      <div class="bottom-energy-line"></div>
      <div class="bottom-holographic-strip"></div>
      <div class="quantum-copyright">
        © 2024 ESmart Solutions Agency. All rights reserved.
        <div class="copyright-glow"></div>
        <div class="copyright-quantum-signature"></div>
      </div>
      <div class="footer-quantum-signature">
        <div v-for="i in 6" :key="'sig-' + i" class="signature-particle"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      emailInput: "",
      socialLinks: [
        {
          name: "facebook",
          icon: "fab fa-facebook-f",
          url: "https://www.facebook.com/esmartsolution.agency",
        },
        {
          name: "linkedin",
          icon: "fab fa-linkedin-in",
          url: "https://www.linkedin.com/company/e-smart-solutions-agency/",
        },
        {
          name: "instagram",
          icon: "fab fa-instagram",
          url: "https://instagram.com/esmart.agency",
        },
      ],
    };
  },
  methods: {
    handleSubscribe() {
      if (this.emailInput) {
        // Handle subscription logic
        console.log("Subscribing:", this.emailInput);
        this.emailInput = "";
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap");

/* CSS Variables */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --gradient-magical: linear-gradient(
    135deg,
    rgba(255, 107, 53, 0.9) 0%,
    rgba(245, 158, 11, 0.8) 50%,
    rgba(217, 119, 6, 0.9) 100%
  );
  --gradient-primary: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  --gradient-secondary: linear-gradient(
    135deg,
    var(--secondary-color) 0%,
    var(--tertiary-color) 100%
  );
  --gradient-tertiary: linear-gradient(
    135deg,
    var(--tertiary-color) 0%,
    var(--primary-color) 100%
  );
}

/* Revolutionary Quantum Footer */
.quantum-footer {
  position: relative;
  background: linear-gradient(135deg, #0a0d15 0%, #1a1d29 50%, #0f1419 100%);
  color: white;
  font-family: "Space Grotesk", sans-serif;
  overflow: hidden;
  min-height: 600px;
  padding: 4rem 0 2rem;
}

/* Quantum Background System */
.footer-quantum-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.quantum-orb {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-magical);
  filter: blur(40px);
  animation: orbitalFloat 8s ease-in-out infinite;
}

.orb-footer-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -100px;
  animation-delay: 0s;
}

.orb-footer-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -80px;
  animation-delay: 2s;
}

.orb-footer-3 {
  width: 250px;
  height: 250px;
  bottom: -120px;
  left: 30%;
  animation-delay: 4s;
}

.orb-footer-4 {
  width: 180px;
  height: 180px;
  top: 20%;
  left: 70%;
  animation-delay: 6s;
}

/* Energy Grid */
.footer-energy-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.grid-line {
  position: absolute;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 107, 53, 0.3) 50%,
    transparent 100%
  );
  animation: energyPulse 3s ease-in-out infinite;
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
}

.grid-line.horizontal:nth-child(1) {
  top: 25%;
  animation-delay: 0s;
}
.grid-line.horizontal:nth-child(2) {
  top: 50%;
  animation-delay: 0.5s;
}
.grid-line.horizontal:nth-child(3) {
  top: 75%;
  animation-delay: 1s;
}
.grid-line.horizontal:nth-child(4) {
  bottom: 10%;
  animation-delay: 1.5s;
}

.grid-line.vertical:nth-child(5) {
  left: 16.66%;
  animation-delay: 0.3s;
}
.grid-line.vertical:nth-child(6) {
  left: 33.33%;
  animation-delay: 0.8s;
}
.grid-line.vertical:nth-child(7) {
  left: 50%;
  animation-delay: 1.3s;
}
.grid-line.vertical:nth-child(8) {
  left: 66.66%;
  animation-delay: 1.8s;
}
.grid-line.vertical:nth-child(9) {
  left: 83.33%;
  animation-delay: 2.3s;
}

/* Floating Particles */
.footer-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.quantum-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: particleFloat 6s linear infinite;
}

.quantum-particle:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
}
.quantum-particle:nth-child(2) {
  left: 20%;
  animation-delay: 0.5s;
}
.quantum-particle:nth-child(3) {
  left: 30%;
  animation-delay: 1s;
}
.quantum-particle:nth-child(4) {
  left: 40%;
  animation-delay: 1.5s;
}
.quantum-particle:nth-child(5) {
  left: 50%;
  animation-delay: 2s;
}
.quantum-particle:nth-child(6) {
  left: 60%;
  animation-delay: 2.5s;
}
.quantum-particle:nth-child(7) {
  left: 70%;
  animation-delay: 3s;
}
.quantum-particle:nth-child(8) {
  left: 80%;
  animation-delay: 3.5s;
}
.quantum-particle:nth-child(9) {
  left: 90%;
  animation-delay: 4s;
}
.quantum-particle:nth-child(10) {
  left: 25%;
  animation-delay: 4.5s;
}
.quantum-particle:nth-child(11) {
  left: 65%;
  animation-delay: 5s;
}
.quantum-particle:nth-child(12) {
  left: 85%;
  animation-delay: 5.5s;
}

/* Lightning Effects */
.footer-lightning-system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}

.lightning-bolt {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(
    0deg,
    transparent 0%,
    var(--secondary-color) 50%,
    transparent 100%
  );
  animation: lightningStrike 4s ease-in-out infinite;
  opacity: 0;
}

.lightning-bolt:nth-child(1) {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
  transform: rotate(15deg);
}

.lightning-bolt:nth-child(2) {
  top: 60%;
  right: 20%;
  animation-delay: 1.5s;
  transform: rotate(-20deg);
}

.lightning-bolt:nth-child(3) {
  bottom: 30%;
  left: 70%;
  animation-delay: 3s;
  transform: rotate(25deg);
}

/* Holographic Overlay */
.holographic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

.holo-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 107, 53, 0.05) 2px,
    rgba(255, 107, 53, 0.05) 4px
  );
  animation: holoShift 8s linear infinite;
}

.holo-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 4px,
    rgba(245, 158, 11, 0.1) 4px,
    rgba(245, 158, 11, 0.1) 6px
  );
  animation: scanlineMove 3s linear infinite;
}

/* Footer Container */
.footer-container {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 3rem 2rem;
  align-items: start;
  z-index: 10;
}

.quantum-brand-section {
  grid-column: 1;
  grid-row: 1;
}

.quantum-subscription {
  grid-column: 2;
  grid-row: 1;
}

.quantum-nav-grid {
  grid-column: 1 / -1;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

/* Revolutionary Brand Section */
.quantum-brand-section {
  position: relative;
}

.brand-hologram {
  position: relative;
  margin-bottom: 2rem;
}

.quantum-brand-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  position: relative;
  animation: titlePulse 3s ease-in-out infinite;
}

.title-energy-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  filter: blur(10px);
  opacity: 0.3;
  animation: energyPulse 2s ease-in-out infinite;
}

.brand-energy-field {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-magical);
  border-radius: 10px;
  filter: blur(15px);
  opacity: 0.2;
  animation: fieldPulse 4s ease-in-out infinite;
}

.brand-quantum-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  border-radius: 8px;
  filter: blur(8px);
  opacity: 0.4;
  animation: quantumGlow 3s ease-in-out infinite;
}

.brand-matrix-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    rgba(255, 107, 53, 0.1) 10px,
    rgba(255, 107, 53, 0.1) 12px
  );
  animation: matrixScroll 5s linear infinite;
}

.quantum-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  position: relative;
}

.description-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  filter: blur(20px);
  opacity: 0.1;
  animation: textGlow 4s ease-in-out infinite;
}

/* Social Quantum Portals */
.social-quantum-grid {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-portal {
  position: relative;
  width: 50px;
  height: 50px;
}

.portal-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.portal-energy-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: ringRotate 3s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link {
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.icon-quantum-field {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-magical);
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portal-plasma-trail {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--gradient-magical);
  border-radius: 50%;
  filter: blur(5px);
  transition: all 0.5s ease;
  pointer-events: none;
}

.social-portal:hover .portal-frame {
  transform: scale(1.1);
  border-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
}

.social-portal:hover .portal-energy-ring {
  opacity: 1;
}

.social-portal:hover .icon-quantum-field {
  opacity: 0.6;
}

.social-portal:hover .portal-plasma-trail {
  width: 80px;
  height: 80px;
  margin: -40px 0 0 -40px;
  opacity: 0.3;
}

/* Quantum Subscription Portal */
.quantum-subscription {
  position: relative;
}

.subscription-hologram {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 20px;
  padding: 2rem;
}

.quantum-label {
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  position: relative;
}

.label-energy-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  filter: blur(10px);
  opacity: 0.2;
  animation: labelGlow 3s ease-in-out infinite;
}

.quantum-input-portal {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-energy-frame {
  position: relative;
  flex: 1;
}

.quantum-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(255, 107, 53, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.quantum-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.quantum-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

.input-quantum-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  border-radius: 15px;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.quantum-input:focus + .input-quantum-glow {
  opacity: 0.4;
}

.input-hologram-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(255, 107, 53, 0.1) 5px,
    rgba(255, 107, 53, 0.1) 7px
  );
  border-radius: 15px;
  pointer-events: none;
  animation: holoShimmer 4s linear infinite;
}

.quantum-submit-btn {
  position: relative;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  background: var(--gradient-magical);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-quantum-core {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-energy-burst {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.btn-rocket-trail {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.btn-force-field {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 2px solid var(--secondary-color);
  border-radius: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quantum-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
}

.quantum-submit-btn:hover .btn-energy-burst {
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
}

.quantum-submit-btn:hover .btn-rocket-trail {
  left: 100%;
}

.quantum-submit-btn:hover .btn-force-field {
  opacity: 1;
}

.subscription-quantum-effects {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 40px;
}

.quantum-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-magical);
  animation: waveMove 3s ease-in-out infinite;
}

.quantum-wave:nth-child(1) {
  animation-delay: 0s;
  opacity: 0.7;
}
.quantum-wave:nth-child(2) {
  animation-delay: 1s;
  opacity: 0.5;
}
.quantum-wave:nth-child(3) {
  animation-delay: 2s;
  opacity: 0.3;
}

/* Quantum Navigation Grid */
.quantum-nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.nav-quantum-column {
  position: relative;
}

.nav-quantum-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 0;
  box-shadow: 0 2px 12px #ff6b3533, 0 1.5px 8px #1e293b33;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card-energy-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid var(--gradient-magical);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--secondary-color)
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

.card-holographic-header {
  margin-bottom: 1.5rem;
}

.nav-section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-quantum-dots {
  display: flex;
  gap: 4px;
}

.title-quantum-dots::before,
.title-quantum-dots::after {
  content: "";
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: dotPulse 2s ease-in-out infinite;
}

.title-quantum-dots::after {
  animation-delay: 0.5s;
}

.quantum-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quantum-nav-list li {
  margin-bottom: 1rem;
}

.quantum-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem;
  border-radius: 10px;
}

.link-energy-core {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: coreGlow 2s ease-in-out infinite;
}

.link-quantum-trail {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-magical);
  transition: width 0.3s ease;
}

.quantum-nav-link:hover {
  color: white;
  background: rgba(255, 107, 53, 0.1);
  transform: translateX(10px);
}

.quantum-nav-link:hover .link-energy-core {
  box-shadow: 0 0 15px var(--primary-color);
}

.quantum-nav-link:hover .link-quantum-trail {
  width: 100%;
}

.card-quantum-field {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-magical);
  border-radius: 20px;
  filter: blur(20px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-quantum-card:hover {
  box-shadow: 0 8px 32px #ff6b35cc, 0 2px 12px #1e293b99;
  transform: translateY(-4px) scale(1.03);
}

.nav-quantum-card:hover .card-energy-border {
  opacity: 0.3;
}

.nav-quantum-card:hover .card-quantum-field {
  opacity: 0.1;
}

/* Quantum Footer Bottom */
.quantum-footer-bottom {
  position: relative;
  margin-top: 4rem;
  padding-top: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 107, 53, 0.2);
}

.bottom-energy-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--gradient-magical);
  animation: energyFlow 3s ease-in-out infinite;
}

.bottom-holographic-strip {
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  height: 10px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 20px,
    rgba(255, 107, 53, 0.1) 20px,
    rgba(255, 107, 53, 0.1) 22px
  );
  animation: stripMove 5s linear infinite;
}

.quantum-copyright {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  position: relative;
}

.copyright-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  filter: blur(10px);
  opacity: 0.1;
  animation: copyrightGlow 4s ease-in-out infinite;
}

.copyright-quantum-signature {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 10px;
  background: var(--gradient-magical);
  filter: blur(5px);
  opacity: 0.3;
  animation: signatureShimmer 3s ease-in-out infinite;
}

.footer-quantum-signature {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
}

.signature-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--gradient-magical);
  border-radius: 50%;
  animation: signatureFloat 4s ease-in-out infinite;
}

.signature-particle:nth-child(1) {
  left: 20%;
  animation-delay: 0s;
}
.signature-particle:nth-child(2) {
  left: 30%;
  animation-delay: 0.5s;
}
.signature-particle:nth-child(3) {
  left: 50%;
  animation-delay: 1s;
}
.signature-particle:nth-child(4) {
  left: 60%;
  animation-delay: 1.5s;
}
.signature-particle:nth-child(5) {
  left: 70%;
  animation-delay: 2s;
}
.signature-particle:nth-child(6) {
  left: 80%;
  animation-delay: 2.5s;
}

/* Animations */
@keyframes orbitalFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
  }
}

@keyframes energyPulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10px) scale(1);
    opacity: 0;
  }
}

@keyframes lightningStrike {
  0%,
  90%,
  100% {
    opacity: 0;
  }
  5%,
  15% {
    opacity: 1;
  }
}

@keyframes holoShift {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

@keyframes scanlineMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100px);
  }
}

@keyframes titlePulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes fieldPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

@keyframes quantumGlow {
  0%,
  100% {
    opacity: 0.4;
    filter: hue-rotate(0deg);
  }
  50% {
    opacity: 0.6;
    filter: hue-rotate(180deg);
  }
}

@keyframes matrixScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(50px);
  }
}

@keyframes textGlow {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes ringRotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes labelGlow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes holoShimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes waveMove {
  0%,
  100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

@keyframes coreGlow {
  0%,
  100% {
    box-shadow: 0 0 10px var(--primary-color);
  }
  50% {
    box-shadow: 0 0 20px var(--secondary-color);
  }
}

@keyframes energyFlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes stripMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(40px);
  }
}

@keyframes copyrightGlow {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes signatureShimmer {
  0%,
  100% {
    opacity: 0.3;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1.1);
  }
}

@keyframes signatureFloat {
  0%,
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 1;
  }
}

/* Responsive Design - Improved */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  .quantum-nav-grid {
    grid-template-columns: 1fr;
    grid-column: span 2;
  }
}

@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }

  .quantum-nav-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    grid-column: span 1;
  }

  .social-quantum-grid {
    justify-content: center;
  }

  .quantum-subscription {
    order: 1;
  }

  .quantum-brand-section {
    order: 2;
  }

  .quantum-nav-grid {
    order: 3;
  }
}

@media (max-width: 768px) {
  .quantum-footer {
    padding: 3rem 0 2rem;
  }

  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.5rem;
    text-align: center;
  }

  .quantum-brand-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .quantum-description {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .quantum-input-portal {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    max-width: 350px;
    margin: 0 auto;
  }

  .quantum-input {
    width: 100%;
  }

  .quantum-submit-btn {
    width: 100%;
    max-width: 200px;
  }

  .social-quantum-grid {
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .quantum-nav-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .nav-quantum-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .quantum-footer {
    padding: 2rem 0 1.5rem;
  }

  .footer-container {
    padding: 0 1rem;
    gap: 1.5rem;
  }

  .quantum-brand-title {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }

  .quantum-description {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1.25rem;
  }

  .subscription-hologram,
  .nav-quantum-card {
    padding: 1.25rem 0.75rem;
  }

  .quantum-input-portal {
    gap: 0.75rem;
    max-width: 300px;
  }

  .social-quantum-grid {
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .social-portal {
    width: 42px;
    height: 42px;
  }

  .social-link {
    font-size: 0.95rem;
  }

  .quantum-footer-bottom {
    margin-top: 2.5rem;
    padding-top: 1.25rem;
  }

  .quantum-copyright {
    font-size: 0.85rem;
    line-height: 1.3;
  }

  .nav-section-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .quantum-nav-link {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .quantum-footer {
    background: #000;
  }

  .quantum-nav-link,
  .quantum-description {
    color: white;
  }

  .quantum-input {
    border-color: white;
  }
}
</style>
