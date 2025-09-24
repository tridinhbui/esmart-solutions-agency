<template>
  <header
    :class="['navbar', 'navbar-fixed', { 'navbar-scrolled': isScrolled }]"
  >
    <div class="navbar-content">
      <router-link to="/#intro" class="logo-link">
        <img
          src="@/assets/logo.png"
          :alt="$t('hero.logoAlt')"
          class="logo quantum-logo"
        />
        <span class="logo-text quantum-text">ESmart</span>
      </router-link>

      <ul :class="['main-nav-links', { open: isOpen }]">
        <li>
          <router-link
            to="/creator-ai"
            class="nav-item quantum-nav"
            @click="toggleMenu"
          >
            <span>{{ $t("navigation.aiCreator") }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/#marketing-assessment"
            class="nav-item quantum-nav"
            @click="toggleMenu"
          >
            <span>{{ $t("assessment") }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/detailed-blog-1"
            class="nav-item quantum-nav"
            @click="toggleMenu"
          >
            <span>{{ $t("navigation.blog") }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/#project"
            class="nav-item quantum-nav"
            @click="toggleMenu"
          >
            <span>{{ $t("products") }}</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/#about-us"
            class="nav-item quantum-nav"
            @click="toggleMenu"
          >
            <span>{{ $t("AboutUs.title") }}</span>
          </router-link>
        </li>

        <li class="language-switcher-item">
          <div class="language-switcher">
            <button
              class="lang-btn"
              :class="{ active: $i18n.locale === 'vi' }"
              @click="switchLanguage('vi')"
            >
              <img src="@/assets/vietnamese-flag.png" alt="Vietnamese" />
            </button>
            <button
              class="lang-btn"
              :class="{ active: $i18n.locale === 'en' }"
              @click="switchLanguage('en')"
            >
              <img src="@/assets/english-flag.png" alt="English" />
            </button>
          </div>
        </li>

        <li v-if="!authStore.user" class="sign-in-item">
          <router-link
            to="/sign-in"
            class="sign-in-link quantum-sign-in"
            @click="toggleMenu"
          >
            <i class="fas fa-user" />
            <span>{{ $t("signIn") }}</span>
          </router-link>
        </li>

        <li v-else class="user-avatar-wrapper">
          <div class="avatar-dropdown">
            <img
              :src="authStore.user.photoURL || defaultAvatar"
              class="user-avatar"
              @click="toggleDropdown"
              @error="handleImageError"
            />
            <transition name="fade">
              <div
                v-if="showDropdown"
                v-click-outside="() => (showDropdown = false)"
                class="avatar-menu"
              >
                <button class="logout-btn" @click="handleLogout">
                  <i class="fas fa-sign-out-alt" />
                  {{ $t("Sign Out") }}
                </button>
              </div>
            </transition>
          </div>
        </li>
      </ul>

      <div
        class="burger quantum-burger"
        :class="{ 'visible-on-scroll': isScrolled, active: isOpen }"
        @click="toggleMenu"
      >
        <span />
        <span />
        <span />
      </div>
    </div>

    <!-- Enhanced Quantum Energy Effects -->
    <div class="quantum-energy enhanced">
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
      <div class="energy-particle" />
    </div>

    <!-- Enhanced Neural Network Lines -->
    <div class="neural-network enhanced">
      <div class="neural-line neural-line-1" />
      <div class="neural-line neural-line-2" />
      <div class="neural-line neural-line-3" />
      <div class="neural-line neural-line-4" />
      <div class="neural-line neural-line-5" />
      <div class="neural-line neural-line-6" />
    </div>

    <!-- Enhanced Holographic Border -->
    <div class="holographic-border enhanced" />

    <!-- Quantum Signature -->
    <div class="quantum-signature">
      <div v-for="i in 8" :key="i" class="signature-particle" />
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  name: "NavBar",
  directives: {
    "click-outside": {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!el.contains(event.target)) {
            binding.value();
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      showDropdown: false, // Controls avatar dropdown visibility
      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Fallback avatar image
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    console.log("User data:", this.authStore.user);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 992;
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    toggleDropdown() {
      if (this.isMobile) {
        this.showDropdown = !this.showDropdown;
      }
    },
    switchLanguage(language) {
      this.$i18n.locale = language;
    },
    goToBlog() {
      this.$router.push({ name: "DetailedBlog1" });
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
      if (this.isScrolled && this.isOpen) {
        this.isOpen = false;
      }
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.$router.push("/sign-in");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    handleImageError(e) {
      e.target.src = this.defaultAvatar;
    },
  },
};
</script>

<style scoped>
/* Enhanced Quantum Navbar with Fixed Positioning */
.navbar {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 2px 20px rgba(59, 130, 246, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.navbar-fixed {
  position: fixed !important;
  top: 0 !important;
}

.navbar-scrolled {
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(20px);
  padding: 0.75rem 2rem;
  box-shadow: 0 5px 25px rgba(59, 130, 246, 0.3);
  border-bottom: 1px solid rgba(59, 130, 246, 0.4);
}

.navbar::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--primary-color),
    var(--secondary-color),
    transparent
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  filter: blur(2px);
}

.navbar-scrolled::before {
  opacity: 1;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
}

/* Enhanced Logo */
.logo-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  z-index: 10;
}

.logo-link::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-magical);
  border-radius: 50px;
  opacity: 0;
  z-index: -1;
  filter: blur(15px);
  transition: opacity 0.3s ease;
}

.logo-link:hover::before {
  opacity: 0.5;
}

.logo {
  height: 45px;
  width: auto;
  filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.5));
  transition: all 0.4s ease;
  animation: logoFloat 3s ease-in-out infinite;
}

.logo-link:hover .logo {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.8));
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #d97706 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  animation: textGlow 2s ease-in-out infinite alternate;
}

/* Enhanced Navigation */
.main-nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
  position: relative;
}

.main-nav-links li {
  position: relative;
}

.nav-item {
  position: relative;
  padding: 0.5rem 0;
  color: #eaeaea;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover,
.nav-item.router-link-exact-active {
  color: white;
  text-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--secondary-color);
  transform: translateY(-2px);
}

.nav-item:hover::after,
.nav-item.router-link-exact-active::after {
  width: 100%;
}

/* Special styling for creator AI link */
.creator-ai-link {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.5rem 1rem !important;
  backdrop-filter: blur(10px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.85rem;
}

.creator-ai-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Enhanced Language Switcher */
.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-btn {
  width: 35px;
  height: 35px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.lang-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.lang-btn.active {
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.5);
  transform: scale(1.1);
}

.lang-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Enhanced Sign In Link */
.sign-in-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--gradient-tertiary);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.4s ease;
  box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
}

.sign-in-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 107, 53, 0.5);
  background: var(--gradient-magical);
}

/* Enhanced User Avatar */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 107, 53, 0.5);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

.user-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.6);
}

.avatar-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 150px;
  z-index: 1000;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: var(--gradient-primary);
  color: white;
  transform: translateX(5px);
}

/* Enhanced Mobile Menu */
.burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  width: 35px;
  height: 35px;
  justify-content: space-around;
  position: relative;
  z-index: 1001;
}

.burger span {
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #ff6b35, #f59e0b);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.burger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* Quantum Energy Effects */
.quantum-energy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.energy-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
  border-radius: 50%;
  animation: quantumFloat 8s infinite ease-in-out;
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
}

.energy-particle:nth-child(1) {
  left: 5%;
  top: 20%;
  animation-delay: 0s;
  animation-duration: 6s;
}

.energy-particle:nth-child(2) {
  left: 15%;
  top: 70%;
  animation-delay: 1s;
  animation-duration: 8s;
}

.energy-particle:nth-child(3) {
  left: 30%;
  top: 30%;
  animation-delay: 2s;
  animation-duration: 7s;
}

.energy-particle:nth-child(4) {
  left: 50%;
  top: 80%;
  animation-delay: 3s;
  animation-duration: 9s;
}

.energy-particle:nth-child(5) {
  left: 70%;
  top: 15%;
  animation-delay: 1.5s;
  animation-duration: 6s;
}

.energy-particle:nth-child(6) {
  left: 85%;
  top: 60%;
  animation-delay: 4s;
  animation-duration: 8s;
}

.energy-particle:nth-child(7) {
  left: 90%;
  top: 40%;
  animation-delay: 2.5s;
  animation-duration: 7s;
}

.energy-particle:nth-child(8) {
  left: 95%;
  top: 90%;
  animation-delay: 5s;
  animation-duration: 6s;
}

/* Neural Network Lines */
.neural-network {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.3;
}

.neural-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff6b35, transparent);
  animation: neuralPulse 4s infinite ease-in-out;
}

.neural-line-1 {
  top: 20%;
  left: 10%;
  width: 30%;
  animation-delay: 0s;
}

.neural-line-2 {
  top: 50%;
  left: 40%;
  width: 25%;
  animation-delay: 1s;
}

.neural-line-3 {
  top: 70%;
  left: 20%;
  width: 40%;
  animation-delay: 2s;
}

.neural-line-4 {
  top: 30%;
  left: 60%;
  width: 35%;
  animation-delay: 3s;
}

/* Holographic Border */
.holographic-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #ff6b35 25%,
    #f59e0b 50%,
    #d97706 75%,
    transparent 100%
  );
  animation: holographicShift 3s infinite ease-in-out;
  filter: blur(1px);
}

/* Enhanced Holographic Effect on Scroll */
.navbar-scrolled .holographic-border {
  height: 3px;
  filter: blur(0.5px);
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
}

/* Enhanced Animations */
@keyframes navShimmer {
  0%,
  100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(2deg);
  }
}

@keyframes textGlow {
  0% {
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  }
  100% {
    text-shadow: 0 0 20px rgba(255, 107, 53, 0.8),
      0 0 30px rgba(245, 158, 11, 0.5);
  }
}

@keyframes quantumFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 0.4;
    filter: blur(0px);
  }
  25% {
    transform: translate(20px, -15px) scale(1.3) rotate(90deg);
    opacity: 0.8;
    filter: blur(0.5px);
  }
  50% {
    transform: translate(-10px, -25px) scale(0.8) rotate(180deg);
    opacity: 1;
    filter: blur(1px);
  }
  75% {
    transform: translate(30px, -10px) scale(1.1) rotate(270deg);
    opacity: 0.6;
    filter: blur(0.3px);
  }
}

@keyframes neuralPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scaleX(0.5);
  }
  50% {
    opacity: 0.8;
    transform: scaleX(1);
  }
}

@keyframes holographicShift {
  0%,
  100% {
    transform: translateX(0);
    opacity: 0.6;
  }
  33% {
    transform: translateX(10px);
    opacity: 0.9;
  }
  66% {
    transform: translateX(-5px);
    opacity: 0.7;
  }
}

/* Transition Effects */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Design */
@media (max-width: 992px) {
  .burger {
    display: flex;
  }

  .main-nav-links {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100vw;
    height: 100vh;
    background: rgba(10, 10, 20, 0.98);
    backdrop-filter: blur(30px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 2rem;
    z-index: 1000;
  }

  .main-nav-links.open {
    left: 0;
  }

  .main-nav-links li {
    opacity: 0;
    transform: translateX(-50px);
    animation: slideInNav 0.5s ease forwards;
  }

  .main-nav-links.open li {
    animation-delay: calc(var(--i) * 0.1s);
  }

  .nav-item {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    width: 100%;
    max-width: 300px;
    text-align: center;
    justify-content: center;
  }

  .language-switcher-item,
  .sign-in-item,
  .user-avatar-wrapper {
    margin-top: 2rem;
  }
}

@keyframes slideInNav {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Enhanced Quantum Effects */
.quantum-energy.enhanced {
  opacity: 0.8;
}

.quantum-energy.enhanced .energy-particle {
  width: 8px;
  height: 8px;
  background: radial-gradient(
    circle,
    #ff6b35 0%,
    #f59e0b 50%,
    transparent 100%
  );
  box-shadow: 0 0 25px rgba(255, 107, 53, 0.8), 0 0 50px rgba(245, 158, 11, 0.4);
  animation-duration: 10s;
}

.quantum-energy.enhanced .energy-particle:nth-child(9) {
  left: 25%;
  top: 10%;
  animation-delay: 6s;
  animation-duration: 12s;
}

.quantum-energy.enhanced .energy-particle:nth-child(10) {
  left: 75%;
  top: 85%;
  animation-delay: 7s;
  animation-duration: 9s;
}

.quantum-energy.enhanced .energy-particle:nth-child(11) {
  left: 45%;
  top: 50%;
  animation-delay: 8s;
  animation-duration: 11s;
}

.quantum-energy.enhanced .energy-particle:nth-child(12) {
  left: 95%;
  top: 25%;
  animation-delay: 9s;
  animation-duration: 13s;
}

.neural-network.enhanced {
  opacity: 0.5;
}

.neural-network.enhanced .neural-line-5 {
  top: 80%;
  left: 50%;
  width: 20%;
  animation-delay: 4s;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.neural-network.enhanced .neural-line-6 {
  top: 10%;
  left: 75%;
  width: 25%;
  animation-delay: 5s;
  background: linear-gradient(90deg, transparent, #10b981, transparent);
}

.holographic-border.enhanced {
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #ff6b35 15%,
    #3b82f6 25%,
    #f59e0b 40%,
    #10b981 55%,
    #d97706 70%,
    #ff6b35 85%,
    transparent 100%
  );
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.6),
    0 -2px 10px rgba(59, 130, 246, 0.3);
  animation: holographicShift 2s infinite ease-in-out;
}

.quantum-signature {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.signature-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  border-radius: 50%;
  animation: signatureFloat 15s infinite ease-in-out;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

.signature-particle:nth-child(1) {
  left: 10%;
  top: 25%;
  animation-delay: 0s;
}
.signature-particle:nth-child(2) {
  left: 20%;
  top: 75%;
  animation-delay: 2s;
}
.signature-particle:nth-child(3) {
  left: 35%;
  top: 45%;
  animation-delay: 4s;
}
.signature-particle:nth-child(4) {
  left: 55%;
  top: 65%;
  animation-delay: 6s;
}
.signature-particle:nth-child(5) {
  left: 75%;
  top: 35%;
  animation-delay: 8s;
}
.signature-particle:nth-child(6) {
  left: 85%;
  top: 80%;
  animation-delay: 10s;
}
.signature-particle:nth-child(7) {
  left: 90%;
  top: 15%;
  animation-delay: 12s;
}
.signature-particle:nth-child(8) {
  left: 5%;
  top: 90%;
  animation-delay: 14s;
}

.signature-particle:nth-child(odd) {
  background: radial-gradient(circle, #10b981 0%, transparent 70%);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  animation-duration: 18s;
}

/* Enhanced Logo and Text Effects */
.quantum-logo {
  filter: drop-shadow(0 0 25px rgba(255, 107, 53, 0.6));
  animation: quantumLogoFloat 4s ease-in-out infinite;
}

.logo-link:hover .quantum-logo {
  transform: scale(1.15) rotate(8deg);
  filter: drop-shadow(0 0 40px rgba(255, 107, 53, 0.9));
}

.quantum-text {
  background: linear-gradient(
    135deg,
    #ff6b35 0%,
    #f59e0b 25%,
    #3b82f6 50%,
    #10b981 75%,
    #d97706 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: quantumTextShift 3s ease-in-out infinite;
}

/* Enhanced Navigation Items */
.quantum-nav {
  position: relative;
  overflow: hidden;
}

.quantum-nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 107, 53, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.quantum-nav:hover::before {
  left: 100%;
}

.quantum-nav:hover {
  text-shadow: 0 0 15px rgba(255, 107, 53, 0.8),
    0 0 30px rgba(59, 130, 246, 0.4), 0 0 45px rgba(16, 185, 129, 0.3);
  transform: translateY(-3px) scale(1.05);
}

/* Enhanced Sign In Button */
.quantum-sign-in {
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #3b82f6 100%);
  background-size: 200% 200%;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2);
  animation: quantumSignIn 4s ease-in-out infinite;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quantum-sign-in:hover {
  background-position: 100% 100%;
  transform: translateY(-5px) scale(1.08);
  box-shadow: 0 15px 40px rgba(255, 107, 53, 0.6),
    0 0 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(16, 185, 129, 0.2);
}

/* Enhanced Burger Menu */
.quantum-burger span {
  background: linear-gradient(90deg, #ff6b35, #f59e0b, #3b82f6);
  box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  animation: burgerGlow 2s ease-in-out infinite alternate;
}

/* Enhanced Animations */
@keyframes quantumLogoFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    filter: drop-shadow(0 0 25px rgba(255, 107, 53, 0.6));
  }
  33% {
    transform: translateY(-3px) rotate(2deg);
    filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.6));
  }
  66% {
    transform: translateY(-1px) rotate(-1deg);
    filter: drop-shadow(0 0 35px rgba(16, 185, 129, 0.6));
  }
}

@keyframes quantumTextShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes quantumSignIn {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes signatureFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 0.3;
  }
  25% {
    transform: translate(15px, -10px) scale(1.2) rotate(90deg);
    opacity: 0.7;
  }
  50% {
    transform: translate(-8px, -20px) scale(0.9) rotate(180deg);
    opacity: 1;
  }
  75% {
    transform: translate(25px, -5px) scale(1.1) rotate(270deg);
    opacity: 0.5;
  }
}

@keyframes burgerGlow {
  0% {
    box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  }
  100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.7);
  }
}

/* CSS Custom Properties for Magic Effects */
:root {
  --gradient-magical: linear-gradient(
    135deg,
    #ff6b35 0%,
    #f59e0b 25%,
    #d97706 50%,
    #ff6b35 75%,
    #f59e0b 100%
  );
  --gradient-primary: linear-gradient(135deg, #ff6b35 0%, #f59e0b 100%);
  --gradient-secondary: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  --gradient-tertiary: linear-gradient(135deg, #d97706 0%, #ff6b35 100%);
  --gradient-energy: linear-gradient(45deg, #ff6b35, #f59e0b, #d97706, #ff6b35);
  --accent-color: #ff6b35;
  --primary-color: #f59e0b;
  --secondary-color: #d97706;
  --success-color: #10b981;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}
</style>
