<template>
  <nav class="simple-navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <div class="nav-logo">
        <div class="logo-icon">
          <i class="fas fa-rocket"></i>
        </div>
        <div class="logo-text-container">
          <span class="logo-text">ESmart Solutions</span>
          <span class="logo-subtitle">Digital Agency</span>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <i class="fas fa-home"></i>
          <span>{{ $t("navigation.home") }}</span>
        </router-link>
        <router-link to="/features" class="nav-link">
          <i class="fas fa-cogs"></i>
          <span>{{ $t("navigation.services") }}</span>
        </router-link>
        <router-link to="/about-us" class="nav-link">
          <i class="fas fa-info-circle"></i>
          <span>{{ $t("navigation.aboutUs") }}</span>
        </router-link>
        <router-link to="/contact" class="nav-link">
          <i class="fas fa-envelope"></i>
          <span>{{ $t("navigation.contact") }}</span>
        </router-link>
      </div>

      <!-- Language Selector -->
      <div class="language-selector">
        <button
          class="lang-btn"
          :class="{ active: currentLanguage === 'en' }"
          @click="setLanguage('en')"
        >
          <img
            src="@/assets/english-flag.png"
            alt="English"
            class="flag-icon"
          />
          <span>EN</span>
        </button>
        <button
          class="lang-btn"
          :class="{ active: currentLanguage === 'vi' }"
          @click="setLanguage('vi')"
        >
          <img
            src="@/assets/vietnamese-flag.png"
            alt="Vietnamese"
            class="flag-icon"
          />
          <span>VI</span>
        </button>
      </div>

      <!-- CTA Button -->
      <button class="nav-cta">
        <i class="fas fa-play"></i>
        <span>{{ $t("navigation.start") }}</span>
        <span class="cta-project">{{ $t("navigation.project") }}</span>
      </button>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
      <router-link to="/" class="mobile-menu-link" @click="closeMobileMenu">
        <i class="fas fa-home"></i>
        <span>{{ $t("navigation.home") }}</span>
      </router-link>
      <router-link
        to="/features"
        class="mobile-menu-link"
        @click="closeMobileMenu"
      >
        <i class="fas fa-cogs"></i>
        <span>{{ $t("navigation.services") }}</span>
      </router-link>
      <router-link
        to="/about-us"
        class="mobile-menu-link"
        @click="closeMobileMenu"
      >
        <i class="fas fa-info-circle"></i>
        <span>{{ $t("navigation.aboutUs") }}</span>
      </router-link>
      <router-link
        to="/contact"
        class="mobile-menu-link"
        @click="closeMobileMenu"
      >
        <i class="fas fa-envelope"></i>
        <span>{{ $t("navigation.contact") }}</span>
      </router-link>
      <button class="mobile-cta" @click="startProject">
        <i class="fas fa-play"></i>
        <span>Start Project</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SimpleNavBar",
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      currentLanguage: "en", // Default to English
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        this.closeMobileMenu();
      }
    },
    startProject() {
      const contactSection = document.querySelector(".simple-footer");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    setLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang; // ✅ Correct way in Options API
      console.log(`Language set to: ${lang}`);
    },
  },
};
</script>

<style scoped>
/* Flat Design Navigation - White Background with Blue Accents */
.simple-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 70px;
  background: #ffffff;
  border: 2px solid #e1e5e9;
  border-radius: 16px;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.simple-navbar.scrolled {
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6;
}

.nav-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
}

.logo-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  white-space: nowrap;
}

@media (min-width: 768px) and (max-width: 1015px) {
  .logo-text-container {
    display: none;
  }
}

.logo-text {
  font-family: "Inter", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
}

.logo-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.5px;
  margin-top: -2px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: auto;
  align-items: center;
}

.nav-link {
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  position: relative;
}

.nav-link i {
  font-size: 16px;
  color: #64748b;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
  background: #f8fafc;
  transform: translateY(-1px);
}

.nav-link:hover i {
  color: #3b82f6;
}

.nav-link span {
  font-weight: 500;
}

/* Language Selector */
.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lang-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  color: #475569;
  padding: 8px 12px; /* vertical + horizontal padding */
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px; /* space between flag and text */
  min-height: 48px;
  line-height: 1;
}

.lang-btn:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  color: #3b82f6;
  transform: translateY(-1px);
}

.lang-btn.active {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.lang-btn i {
  font-size: 14px;
}

.flag-icon {
  width: 20px;
  height: 15px;
  object-fit: contain;
  border-radius: 2px;
  flex-shrink: 0;
}

@media (max-width: 1100px) {
  .lang-btn span {
    display: none; /* hide text */
  }

  .lang-btn {
    gap: 8; /* remove text gap */
  }
  .flag-icon {
    width: 28px;
    height: 21px;
    object-fit: contain;
    border-radius: 2px;
    flex-shrink: 0;
  }
}

/* CTA Button */
.nav-cta {
  background: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.nav-cta:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.35);
}

.nav-cta i {
  font-size: 14px;
}

@media (max-width: 1100px) {
  .cta-project {
    display: none;
  }
  .nav-cta {
    gap: 6px;
  }
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  gap: 4px;
}

.hamburger-line {
  width: 24px;
  height: 3px;
  background: #475569;
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  width: 90%;
  max-width: 400px;
  background: #ffffff;
  border: 2px solid #e1e5e9;
  border-radius: 16px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.mobile-menu.mobile-menu-open {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.mobile-menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  color: #475569;
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.3s ease;
}

.mobile-menu-link:hover {
  background: #f8fafc;
  color: #3b82f6;
  padding-left: 28px;
}

.mobile-menu-link i {
  font-size: 16px;
  color: #64748b;
  width: 20px;
  text-align: center;
}

.mobile-cta {
  width: 100%;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 16px 24px;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.mobile-cta:hover {
  background: #2563eb;
}

.mobile-cta i {
  font-size: 16px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-navbar {
    top: 15px;
    width: 95%;
    height: 65px;
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
    font-size: 1.3rem;
  }

  .logo-subtitle {
    font-size: 0.65rem;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .simple-navbar {
    top: 10px;
    width: 98%;
    height: 60px;
  }

  .mobile-menu {
    top: 80px;
  }

  .nav-container {
    padding: 0 1rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logo-subtitle {
    font-size: 0.6rem;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
}
</style>
