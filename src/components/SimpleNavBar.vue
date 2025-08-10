<template>
  <header class="simple-navbar">
    <div class="navbar-container">
      <router-link to="/" class="logo-link">
        <span class="logo-text">ESmart</span>
        <span class="logo-subtitle">Solutions</span>
      </router-link>

      <nav class="nav-menu" :class="{ 'nav-open': isOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">Trang Chủ</router-link>

        <router-link to="/#marketing-assessment" class="nav-link" @click="closeMenu">Đánh Giá</router-link>
        <router-link to="/blog" class="nav-link" @click="closeMenu">Blog</router-link>
        <router-link to="/#project" class="nav-link" @click="closeMenu">Sản Phẩm</router-link>
        <router-link to="/#about-us" class="nav-link" @click="closeMenu">Về Chúng Tôi</router-link>
      </nav>

      <!-- Language Switcher -->
      <div class="language-switcher">
        <button 
          class="lang-btn"
          :class="{ active: $i18n.locale === 'vi' }"
          @click="switchLanguage('vi')"
        >
          VI
        </button>
        <button 
          class="lang-btn"
          :class="{ active: $i18n.locale === 'en' }"
          @click="switchLanguage('en')"
        >
          EN
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-toggle"
        @click="toggleMenu"
        :class="{ 'menu-open': isOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "SimpleNavBar",
  data() {
    return {
      isOpen: false,
      isScrolled: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    switchLanguage(language) {
      this.$i18n.locale = language;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
      if (this.isScrolled && this.isOpen) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style scoped>
/* Magical Navigation Animations */
.simple-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e5e5;
  z-index: 1000;
  transition: all 0.4s ease;
  animation: navSlideDown 1s ease-out;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  animation: navGlow 0.6s ease-out;
}

.nav-logo {
  animation: logoSlideIn 1s ease-out;
}

.logo-text {
  animation: logoTextGlow 3s ease-in-out infinite;
}

.nav-links {
  animation: linksSlideIn 1s ease-out 0.3s backwards;
}

.nav-link {
  position: relative;
  transition: all 0.3s ease;
  animation: linkFadeIn 0.8s ease-out backwards;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  width: 0;
  height: 2px;
  background: black;
  transition: all 0.4s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  transform: translateY(-3px);
  color: black;
}

.language-selector {
  animation: selectorSlideIn 1s ease-out 0.6s backwards;
  transition: all 0.3s ease;
}

.language-selector:hover {
  transform: scale(1.05) rotate(2deg);
}

/* Mobile Menu Animations */
.mobile-menu {
  animation: mobileMenuSlideIn 0.5s ease-out;
}

.mobile-menu-link {
  animation: mobileItemSlideIn 0.4s ease-out backwards;
}

/* Animation Keyframes */
@keyframes navSlideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes navGlow {
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
}

@keyframes logoSlideIn {
  from {
    opacity: 0;
    transform: translateX(-50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes logoTextGlow {
  0%, 100% { text-shadow: none; }
  50% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.3); }
}

@keyframes linksSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes linkFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes selectorSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes mobileMenuSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mobileItemSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: black;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
  line-height: 1;
}

.logo-subtitle {
  font-size: 0.7rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: -2px;
}

/* Navigation */
.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: black;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: black;
  transition: width 0.2s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.elegant-link {
  background: #f8f8f8;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
}

.elegant-link:hover {
  background: #e8e8e8;
  border-color: #ccc;
}

/* Language Switcher */
.language-switcher {
  display: flex;
  gap: 0.5rem;
  background: #f8f8f8;
  padding: 0.25rem;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
}

.lang-btn {
  background: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  transition: all 0.2s ease;
}

.lang-btn.active,
.lang-btn:hover {
  background: white;
  color: black;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-toggle span {
  width: 25px;
  height: 2px;
  background: black;
  transition: all 0.2s ease;
}

.mobile-toggle.menu-open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-toggle.menu-open span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.menu-open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }
  
  .mobile-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-top: 1px solid #e5e5e5;
    flex-direction: column;
    gap: 0;
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
  }
  
  .nav-menu.nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    padding: 0.75rem 0;
    border-bottom: 1px solid #f0f0f0;
    width: 100%;
    text-align: left;
  }
  
  .language-switcher {
    margin-top: 1rem;
    justify-self: center;
  }
}
</style> 