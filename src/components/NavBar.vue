<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-content">
      <router-link to="/#intro" class="logo-link">
        <img src="@/assets/logo.png" alt="ESmart Logo" class="logo" />
        <span class="logo-text">ESmart</span>
      </router-link>

      <ul :class="['main-nav-links', { open: isOpen }]">
        <li>
          <router-link to="/#intro" @click="toggleMenu" class="nav-item">
            <span>{{ $t("home") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/creator-ai" @click="toggleMenu" class="nav-item">
            <span>{{ $t("aiCreator") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/#marketing-assessment" @click="toggleMenu" class="nav-item">
            <span>{{ $t("assessment") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/#social-proof" @click="toggleMenu" class="nav-item">
            <span>{{ $t("achievements") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/detailed-blog-1" @click="toggleMenu" class="nav-item">
            <span>Blog</span>
          </router-link>
        </li>
        <li>
          <router-link to="/#project" @click="toggleMenu" class="nav-item">
            <span>{{ $t("products") }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/#about-us" @click="toggleMenu" class="nav-item">
            <span>{{ $t("AboutUs.title") }}</span>
          </router-link>
        </li>
        
        <li class="language-switcher-item">
          <div class="language-switcher">
            <button @click="switchLanguage('vi')" class="lang-btn" :class="{ active: $i18n.locale === 'vi' }">
              <img src="@/assets/vietnamese-flag.png" alt="Vietnamese" />
            </button>
            <button @click="switchLanguage('en')" class="lang-btn" :class="{ active: $i18n.locale === 'en' }">
              <img src="@/assets/english-flag.png" alt="English" />
            </button>
          </div>
        </li>
        
        <li v-if="!authStore.user" class="sign-in-item">
          <router-link to="/sign-in" class="sign-in-link" @click="toggleMenu">
            <i class="fas fa-user"></i>
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
              <div v-if="showDropdown" class="avatar-menu" v-click-outside="() => showDropdown = false">
                <button @click="handleLogout" class="logout-btn">
                  <i class="fas fa-sign-out-alt"></i>
                  {{ $t("Sign Out") }}
                </button>
              </div>
            </transition>
          </div>
        </li>
      </ul>

      <div class="burger" :class="{ 'visible-on-scroll': isScrolled, 'active': isOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <!-- Floating Particles for Energy -->
    <div class="nav-particles">
      <div class="nav-particle"></div>
      <div class="nav-particle"></div>
      <div class="nav-particle"></div>
      <div class="nav-particle"></div>
      <div class="nav-particle"></div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      showDropdown: false, // Controls avatar dropdown visibility
      defaultAvatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Fallback avatar image
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    console.log("User data:", this.authStore.user);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!el.contains(event.target)) {
            binding.value();
          }
        };
        document.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    }
  },
};
</script>

<style scoped>
/* Enhanced NavBar Styles with magical animations */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: navShimmer 8s infinite;
  pointer-events: none;
}

nav.scrolled {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
}

/* Enhanced Logo with magical effects */
.navbar-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 900;
  background: var(--gradient-magical);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: none;
}

.navbar-brand::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--gradient-secondary);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.navbar-brand:hover::after {
  width: 100%;
}

.navbar-brand:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
}

.navbar-brand .logo-icon {
  margin-right: 0.75rem;
  font-size: 2rem;
  animation: logoRotate 8s linear infinite;
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3));
}

/* Enhanced Navigation Items */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
  border: 1px solid transparent;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.nav-link.router-link-active {
  background: var(--gradient-secondary);
  color: white;
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-link.router-link-active:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 12px 30px rgba(6, 182, 212, 0.4);
}

/* Enhanced Action Items */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Enhanced Language Switcher */
.language-switcher {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 0.25rem;
  gap: 0.25rem;
  position: relative;
  overflow: hidden;
}

.language-switcher::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  animation: switcherGlow 6s linear infinite;
  z-index: -1;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.875rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.lang-option.active {
  background: var(--gradient-tertiary);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
}

.lang-option:hover:not(.active) {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  transform: translateY(-1px);
}

.flag-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gradient-magical);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.lang-option:hover .flag-icon {
  transform: rotate(360deg) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Enhanced Sign In Button */
.sign-in-btn {
  background: var(--gradient-magical);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sign-in-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: buttonShimmer 3s infinite;
}

.sign-in-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
  background: var(--gradient-secondary);
}

.sign-in-btn:active {
  transform: translateY(-1px) scale(1.02);
}

.sign-in-btn .btn-icon {
  transition: transform 0.3s ease;
}

.sign-in-btn:hover .btn-icon {
  transform: translateX(3px);
}

/* Enhanced User Avatar Dropdown */
.user-avatar {
  position: relative;
  cursor: pointer;
}

.avatar-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.avatar-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, transparent, rgba(240, 171, 252, 0.1), transparent);
  animation: avatarGlow 8s linear infinite;
  z-index: -1;
}

.avatar-container:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.avatar-img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  background: var(--gradient-tertiary);
}

.avatar-container:hover .avatar-img {
  transform: scale(1.1) rotate(5deg);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.user-name {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.dropdown-icon {
  color: rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
  font-size: 12px;
}

.avatar-container:hover .dropdown-icon {
  transform: rotate(180deg);
  color: white;
}

/* Enhanced Dropdown Menu */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
  position: relative;
}

.user-dropdown::before {
  content: '';
  position: absolute;
  top: -10px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: none;
  border-right: none;
  transform: rotate(45deg);
  z-index: -1;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: var(--gradient-secondary);
  transition: width 0.3s ease;
}

.dropdown-item:hover {
  background: var(--gradient-secondary);
  color: white;
  transform: translateX(5px);
}

.dropdown-item:hover::before {
  width: 4px;
}

.dropdown-item i {
  font-size: 16px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.dropdown-item:hover i {
  opacity: 1;
  transform: scale(1.1);
}

/* Enhanced Mobile Menu */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.75rem;
  transition: all 0.3s ease;
  gap: 0.25rem;
  position: relative;
  overflow: hidden;
}

.mobile-menu-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(from 0deg, transparent, rgba(245, 158, 11, 0.1), transparent);
  animation: mobileGlow 4s linear infinite;
  z-index: -1;
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
  background: var(--accent-color);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
  background: var(--accent-color);
}

/* Enhanced Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.show {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(30px);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-menu.show {
  right: 0;
}

.mobile-nav-item {
  padding: 1rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.mobile-nav-item:hover {
  background: var(--gradient-secondary);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(-5px);
}

.mobile-nav-item .nav-link {
  color: var(--text-primary);
  font-weight: 700;
  padding: 0;
  border-radius: 0;
  background: none;
  border: none;
  text-transform: none;
  letter-spacing: normal;
}

.mobile-nav-item:hover .nav-link {
  color: white;
}

.mobile-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-lang-switcher {
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 0.5rem;
}

.mobile-sign-in {
  width: 100%;
  justify-content: center;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 15px;
}

/* Animation Keyframes */
@keyframes navShimmer {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes logoRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes switcherGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes buttonShimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes avatarGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes mobileGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-nav {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
    height: 70px;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .navbar-brand .logo-icon {
    font-size: 1.8rem;
    margin-right: 0.5rem;
  }
  
  .navbar-nav {
    display: none;
  }
  
  .language-switcher {
    display: none;
  }
  
  .sign-in-btn {
    display: none;
  }
  
  .user-avatar {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
    height: 65px;
  }
  
  .navbar-brand {
    font-size: 1.3rem;
  }
  
  .navbar-brand .logo-icon {
    font-size: 1.6rem;
  }
  
  .mobile-menu {
    width: 280px;
    padding: 1.5rem;
  }
}

/* Loading animation for navigation items */
.nav-item {
  animation: navItemFadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.2s; }
.nav-item:nth-child(3) { animation-delay: 0.3s; }
.nav-item:nth-child(4) { animation-delay: 0.4s; }
.nav-item:nth-child(5) { animation-delay: 0.5s; }
.nav-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes navItemFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhance focus states for accessibility */
.nav-link:focus,
.sign-in-btn:focus,
.lang-option:focus {
  outline: 3px solid var(--accent-color);
  outline-offset: 2px;
}

/* Ensure high contrast for readability */
@media (prefers-contrast: high) {
  .nav-link {
    color: white;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .nav-link:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}

/* Enhanced Floating Elements for Energy */
.nav-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.nav-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: navParticleFloat 8s infinite ease-in-out;
}

.nav-particle:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
  background: var(--primary-color);
}

.nav-particle:nth-child(2) {
  left: 25%;
  animation-delay: 2s;
  background: var(--secondary-color);
}

.nav-particle:nth-child(3) {
  left: 40%;
  animation-delay: 4s;
  background: var(--tertiary-color);
}

.nav-particle:nth-child(4) {
  left: 60%;
  animation-delay: 6s;
  background: var(--accent-color);
}

.nav-particle:nth-child(5) {
  left: 80%;
  animation-delay: 1s;
  background: var(--success-color);
}

@keyframes navParticleFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-30px) scale(0.8);
    opacity: 0.5;
  }
  75% {
    transform: translateY(-15px) scale(1.1);
    opacity: 0.9;
  }
}

/* Enhanced Navigation Items with Energy Effects */
.nav-item {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-energy);
  border-radius: 25px;
  transition: left 0.5s ease;
  z-index: -1;
}

.nav-item:hover::before {
  left: 0;
}

.nav-item:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
  color: white;
}

.nav-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
  z-index: -1;
}

.nav-item:hover::after {
  width: 150px;
  height: 150px;
}

/* Enhanced Language Switcher with Dynamic Effects */
.language-switcher {
  position: relative;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.language-switcher::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--tertiary-color), var(--accent-color), var(--primary-color));
  border-radius: 50%;
  animation: languageRotate 4s linear infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-switcher:hover::before {
  opacity: 0.7;
}

.language-switcher:hover {
  transform: translateY(-3px) scale(1.1) rotate(2deg);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
  border-color: var(--accent-color);
}

@keyframes languageRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Enhanced Logo with Pulsing Energy */
.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.4s ease;
  cursor: pointer;
}

.logo-container::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-energy);
  border-radius: 50%;
  z-index: -1;
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.3s ease;
  animation: logoPulse 3s ease-in-out infinite;
}

.logo-container:hover::before {
  opacity: 0.5;
}

.logo-container:hover {
  transform: scale(1.1) rotate(-2deg);
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
}

/* Enhanced Sign In Button with Dynamic Gradient */
.auth-btn {
  background: var(--gradient-magical);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.auth-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.auth-btn:hover::before {
  left: 100%;
}

.auth-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: var(--gradient-secondary);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
  z-index: -1;
}

.auth-btn:hover::after {
  width: 300px;
  height: 300px;
}

.auth-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 107, 53, 0.5);
  color: white;
}

.auth-btn:active {
  transform: translateY(-1px) scale(1.02);
}

/* Enhanced Avatar with Magnetic Effect */
.avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.avatar-container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-aurora);
  border-radius: 25px;
  z-index: -1;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.avatar-container:hover::before {
  opacity: 0.8;
}

.avatar-container:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
  border-color: var(--accent-color);
}
</style>