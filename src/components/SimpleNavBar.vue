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
          <span class="logo-subtitle">Marketing Agency</span>
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

      <!-- Auth Area: Login or Avatar + Dropdown -->
      <div class="nav-auth">
        <!-- Not logged in: Sign In button -->
        <button v-if="!authUser" class="login-btn" @click="goToSignIn">
          <i class="fas fa-sign-in-alt"></i>
          <span>Sign In</span>
        </button>

        <!-- Logged in: avatar + caret dropdown -->
        <div
          v-else
          class="profile-wrapper"
          @keydown.escape="showDropdown = false"
        >
          <img
            :src="avatarUrl"
            class="avatar"
            alt="Profile"
            @error="onAvatarError"
          />
          <button
            class="caret-btn"
            @click="toggleDropdown"
            aria-haspopup="menu"
            :aria-expanded="showDropdown ? 'true' : 'false'"
          >
            ▼
          </button>
          <div v-if="showDropdown" class="dropdown" role="menu">
            <button class="dropdown-item" @click="toggleDarkMode">
              <i class="fas fa-moon"></i>
              <span>{{ isDark ? "Light mode" : "Dark mode" }}</span>
            </button>
            <button class="dropdown-item" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>

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

      <!-- Mobile auth area -->
      <div class="mobile-auth">
        <button v-if="!authUser" class="mobile-login-btn" @click="goToSignIn">
          <i class="fas fa-sign-in-alt"></i>
          <span>Sign In</span>
        </button>
        <div v-else class="mobile-profile">
          <img
            :src="avatarUrl"
            class="avatar"
            alt="Profile"
            @error="onAvatarError"
          />
          <button
            class="mobile-caret"
            @click="toggleDropdown"
            aria-haspopup="menu"
            :aria-expanded="showDropdown ? 'true' : 'false'"
          >
            ▼
          </button>
          <div v-if="showDropdown" class="dropdown" role="menu">
            <button class="dropdown-item" @click="toggleDarkMode">
              <i class="fas fa-moon"></i>
              <span>{{ isDark ? "Light mode" : "Dark mode" }}</span>
            </button>
            <button class="dropdown-item" @click="handleLogout">
              <i class="fas fa-sign-out-alt"></i>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import themeService from "@/utils/themeService";

export default {
  name: "SimpleNavBar",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      currentLanguage: "en",
      showDropdown: false,
      isDark: false,
      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      forceDefaultAvatar: false,
    };
  },
  computed: {
    authUser() {
      const uRef = this.authStore?.user;
      return uRef && typeof uRef === "object" && "value" in uRef
        ? uRef.value
        : uRef;
    },
    avatarUrl() {
      // Prefer auth user photoURL; unwrap Pinia/Vue ref if needed
      const u = this.authUser;
      if (this.forceDefaultAvatar) return this.defaultAvatar;
      const direct = u?.photoURL;
      // Some providers store photo in providerData
      const providerPhoto = u?.providerData?.[0]?.photoURL;
      // Fallback to cached localStorage user (set by auth store)
      let cachedPhoto = null;
      try {
        const raw = localStorage.getItem("user");
        if (raw) cachedPhoto = JSON.parse(raw)?.photoURL || null;
      } catch (e) {
        // Ignore JSON or storage errors and keep cachedPhoto as null
        cachedPhoto = null;
      }
      return direct || providerPhoto || cachedPhoto || this.defaultAvatar;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    
    // Initialize theme state from theme service
    this.isDark = themeService.isDark();
    
    // Listen for theme changes
    window.addEventListener('themeChanged', this.onThemeChanged);
    
    document.addEventListener("click", this.onDocClick);
    // Reset avatar fallback when auth user changes (simple polling fallback)
    this.$watch(
      () => this.authUser && this.authUser.uid,
      () => {
        this.forceDefaultAvatar = false;
      }
    );
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener('themeChanged', this.onThemeChanged);
    document.removeEventListener("click", this.onDocClick);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    goToSignIn() {
      // preserve redirect back to current route if desired
      const { name, fullPath } = this.$route || {};
      const query = name ? { redirect: fullPath } : undefined;
      this.$router.push({ name: "SignIn", query });
      this.isMobileMenuOpen = false;
      this.showDropdown = false;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    onDocClick(e) {
      const desktop = this.$el?.querySelector?.(".profile-wrapper");
      const mobile = this.$el?.querySelector?.(".mobile-profile");
      if (this.showDropdown) {
        const insideDesktop = desktop && desktop.contains(e.target);
        const insideMobile = mobile && mobile.contains(e.target);
        if (!insideDesktop && !insideMobile) {
          this.showDropdown = false;
        }
      }
    },
    toggleDarkMode() {
      const newTheme = themeService.toggleTheme();
      this.isDark = newTheme === 'dark';
    },
    onThemeChanged(event) {
      this.isDark = event.detail.isDark;
    },
    async handleLogout() {
      try {
        await this.authStore.logout();
        this.showDropdown = false;
        this.isMobileMenuOpen = false;
      } catch (e) {
        console.error("Logout failed", e);
      }
    },
    onAvatarError() {
      this.forceDefaultAvatar = true;
    },
    setLanguage(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style scoped>
/* Theme-aware Navigation */
.simple-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 70px;
  background: var(--navbar-bg);
  border: 2px solid var(--navbar-border);
  border-radius: 16px;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: var(--navbar-shadow);
}

.simple-navbar.scrolled {
  background: var(--navbar-bg);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-blue);
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
  color: var(--text-primary);
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

.logo-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  margin-top: -2px;
  transition: color 0.3s ease;
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
  color: var(--text-secondary);
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
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-blue);
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

.nav-link:hover i {
  color: var(--primary-blue);
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
  background: var(--button-secondary-bg);
  border: 2px solid var(--button-secondary-border);
  color: var(--text-secondary);
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
  border-color: var(--primary-blue);
  background: var(--primary-blue-bg);
  color: var(--primary-blue);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: var(--primary-blue);
  color: var(--text-inverse);
  border-color: var(--primary-blue);
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

/* Auth area styles */
.nav-auth {
  display: flex;
  align-items: center;
}

.login-btn {
  background: var(--button-primary-bg);
  color: var(--text-inverse);
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-blue);
}
.login-btn:hover {
  background: var(--button-primary-hover);
  transform: translateY(-2px);
}

.profile-wrapper {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  object-fit: cover;
  transition: border-color 0.3s ease;
}

.caret-btn {
  margin-left: 6px;
  background: var(--button-secondary-bg);
  border: 2px solid var(--button-secondary-border);
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.caret-btn:hover {
  background: var(--button-secondary-hover);
}

.dropdown {
  position: absolute;
  top: 48px;
  right: 0;
  min-width: 180px;
  background: var(--dropdown-bg);
  border: 1px solid var(--dropdown-border);
  border-radius: 12px;
  box-shadow: var(--dropdown-shadow);
  padding: 8px;
  z-index: 20;
}
.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.dropdown-item:hover {
  background: var(--bg-secondary);
}

@media (max-width: 1100px) {
  .cta-project {
    display: none;
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
  background: var(--text-secondary);
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
  background: var(--navbar-bg);
  border: 2px solid var(--navbar-border);
  border-radius: 16px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
  overflow: hidden;
  box-shadow: var(--navbar-shadow);
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
  color: var(--text-secondary);
  text-decoration: none;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.mobile-menu-link:hover {
  background: var(--bg-secondary);
  color: var(--primary-blue);
}

.mobile-menu-link i {
  font-size: 16px;
  color: var(--text-muted);
  width: 20px;
  text-align: center;
}

/* Mobile Auth */
.mobile-auth {
  width: 100%;
  padding: 12px 16px;
  border-top: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile-login-btn {
  width: 100%;
  background: var(--button-primary-bg);
  color: var(--text-inverse);
  border: none;
  padding: 14px 16px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: var(--shadow-blue);
}
.mobile-login-btn:hover {
  background: var(--button-primary-hover);
}
.mobile-profile {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}
.mobile-caret {
  background: var(--button-secondary-bg);
  border: 2px solid var(--button-secondary-border);
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: 10px;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .simple-navbar {
    top: 15px;
    width: 95%;
    height: 65px;
  }

  .nav-links,
  .language-selector {
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
