<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <span class="logo-text">ESmart</span>
        <span class="logo-subtitle">Solutions</span>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <a href="#home" class="nav-link">Trang chủ</a>
        <a href="#about" class="nav-link">Về chúng tôi</a>
        <a href="#services" class="nav-link">Dịch vụ</a>
        <a href="#projects" class="nav-link">Dự án</a>
        <a href="#contact" class="nav-link">Liên hệ</a>
      </div>

      <!-- Language Selector -->
      <div class="language-selector">
        <button 
          @click="toggleLanguage" 
          class="lang-btn"
          :class="{ 'active': currentLanguage === 'vi' }"
        >
          <i class="fas fa-globe"></i>
          {{ currentLanguage === 'vi' ? 'VI' : 'EN' }}
        </button>
      </div>

      <!-- CTA Button -->
      <button class="nav-cta">
        <i class="fas fa-phone"></i>
        Book a Call
      </button>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
      <a href="#home" class="mobile-menu-link" @click="closeMobileMenu">Trang chủ</a>
      <a href="#about" class="mobile-menu-link" @click="closeMobileMenu">Về chúng tôi</a>
      <a href="#services" class="mobile-menu-link" @click="closeMobileMenu">Dịch vụ</a>
      <a href="#projects" class="mobile-menu-link" @click="closeMobileMenu">Dự án</a>
      <a href="#contact" class="mobile-menu-link" @click="closeMobileMenu">Liên hệ</a>
      <button class="mobile-cta" @click="closeMobileMenu">
        <i class="fas fa-phone"></i>
        Book a Call
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SimpleNavBar",
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      isMobileMenuOpen: false,
      currentLanguage: 'vi' // Default to Vietnamese
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
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'vi' ? 'en' : 'vi';
      this.$i18n.locale = this.currentLanguage;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>

<style scoped>
/* Compact Ocean Theme Navigation */
.navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  height: 60px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 30px;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.navbar-scrolled {
  background: rgba(0, 0, 0, 0.95);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
}

.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
}

/* Logo */
.nav-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
}

.logo-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  animation: logoTextGlow 3s ease-in-out infinite;
}

.logo-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  color: #3B82F6;
  letter-spacing: 1px;
  margin-top: -2px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.4rem 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #3B82F6;
  transition: all 0.4s ease;
  transform: translateX(-50%);
}

.nav-link:hover {
  color: #93C5FD;
  transform: translateY(-1px);
}

.nav-link:hover::after {
  width: 100%;
}

/* Language Selector */
.language-selector {
  display: flex;
  align-items: center;
}

.lang-btn {
  background: transparent;
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #ffffff;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.lang-btn:hover {
  border-color: #3B82F6;
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.05);
}

.lang-btn.active {
  background: #3B82F6;
  color: #ffffff;
  border-color: #3B82F6;
}

.lang-btn i {
  font-size: 0.7rem;
}

/* CTA Button */
.nav-cta {
  background: #3B82F6;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.nav-cta:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.nav-cta i {
  font-size: 0.7rem;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  gap: 3px;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  transform: translateX(-50%) translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
  overflow: hidden;
}

.mobile-menu-open {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.mobile-menu-link {
  display: block;
  padding: 1rem 2rem;
  color: #ffffff;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.mobile-menu-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #93C5FD;
  padding-left: 2.5rem;
}

.mobile-cta {
  width: 100%;
  background: #3B82F6;
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.mobile-cta:hover {
  background: #2563EB;
}

.mobile-cta i {
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    top: 15px;
    width: 95%;
    height: 55px;
  }
  
  .nav-links,
  .language-selector,
  .nav-cta {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-subtitle {
    font-size: 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    top: 10px;
    width: 98%;
    height: 50px;
  }
  
  .mobile-menu {
    top: 70px;
  }
  
  .nav-container {
    padding: 0 1rem;
  }
  
  .logo-text {
    font-size: 1.1rem;
  }
  
  .logo-subtitle {
    font-size: 0.45rem;
  }
}

/* Animation Keyframes */
@keyframes logoTextGlow {
  0%, 100% { 
    text-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  }
  50% { 
    text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
  }
}
</style> 