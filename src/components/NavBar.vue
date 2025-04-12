<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-content">
      <router-link to="#intro" class="logo-link">
  <img src="@/assets/logo.png" alt="ESmart Logo" class="logo" />
</router-link>

      <ul :class="['main-nav-links', { open: isOpen }]">
        <li>
          <router-link to="#intro">{{ $t("home") }}</router-link>
        </li>
        <li>
          <router-link to="/creator-ai">{{ $t("aiCreator") }}</router-link>
        </li>
        <li>
          <router-link to="#marketing-assessment">{{
            $t("assessment")
          }}</router-link>
        </li>
        <li>
          <router-link to="#social-proof">{{ $t("achievements") }}</router-link>
        </li>
        <li class="dropdown">
          <router-link to="#blog">{{ $t("blog") }}</router-link>
          <ul class="dropdown-menu">
            <li>
              <a
                href="/detailed-blog-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>{{ $t("blogPage1") }}</button>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="#project">{{ $t("products") }}</router-link>
        </li>
        <li class="dropdown">
          <router-link to="#about-us">{{ $t("About Us") }}</router-link>
          <ul class="dropdown-menu">
            <li>
              <router-link to="#intro">{{ $t("home") }}</router-link>
            </li>
            <li>
              <router-link to="#social-proof">{{
                $t("achievements")
              }}</router-link>
            </li>
            <li>
              <router-link to="#process">{{ $t("Process") }}</router-link>
            </li>
            <li>
              <router-link to="#blog">{{ $t("blog") }}</router-link>
            </li>
            <li>
              <router-link to="#project">{{ $t("products") }}</router-link>
            </li>
          </ul>
        </li>
      </ul>

      <div class="right-nav-items">
        <div class="language-switcher">
          <button @click="switchLanguage('vi')">
            <img src="@/assets/vietnamese-flag.png" alt="Vietnamese" />
          </button>
          <button @click="switchLanguage('en')">
            <img src="@/assets/english-flag.png" alt="English" />
          </button>
        </div>

        <div v-if="!authStore.user" class="sign-in-btn">
          <router-link to="/sign-in" class="sign-in-link">
            {{ $t("signIn") }}
          </router-link>
        </div>
        <div v-else class="user-avatar-wrapper">
  <div
    class="avatar-dropdown"
    @mouseenter="!isMobile && (showDropdown = true)"
    @mouseleave="!isMobile && (showDropdown = false)"
    @click="isMobile && (showDropdown = !showDropdown)"
  >
    <img
      :src="authStore.user.photoURL || defaultAvatar"
      class="user-avatar"
      @error="handleImageError"
    />
    <transition name="fade">
      <div 
        v-if="showDropdown"
        class="avatar-menu"
        v-click-outside="() => showDropdown = false"
      >
        <button @click="handleLogout" class="logout-btn">
          {{ $t("Sign Out") }}
        </button>
      </div>
    </transition>
  </div>
</div>
      </div>

      <div class="burger" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
// Script content remains the same
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
      // Toggle needs to target .main-nav-links now
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
/* Keep existing styles, add/modify the following */

.navbar {
  background-color: transparent;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.navbar-scrolled {
  background-color: white;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  position: relative;
  display: flex;
  /* Removed justify-content: space-between; */
  align-items: center;
  width: 100%;
  padding: 0 1.5rem; /* Increased padding slightly */
  box-sizing: border-box;
  height: 65px; /* Increased height slightly */
}

.logo {
  height: 45px; /* Adjusted */
  width: auto;
  max-width: 160px; /* Adjusted */
  flex-shrink: 0;
  /* Removed margin-right, handled by nav margin */
}

/* Removed .main-nav container styles */
/* .main-nav { ... } */

/* Styles for the main navigation links list (now direct child) */
.main-nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  margin-left: auto; /* Push this list and subsequent items to the right */
  margin-right: 1.5rem; /* Space BEFORE the right-nav-items */
}

.main-nav-links li {
  margin: 0 1rem; /* Increased spacing between links */
  cursor: pointer;
  color: inherit;
  font-weight: 600; /* Slightly bolder */
  position: relative;
  white-space: nowrap;
}

.main-nav-links li a {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: color 0.2s ease;
  font-size: 1.05rem; /* Increased font size */
  padding: 5px 0; /* Add some vertical padding */
}
.main-nav-links li a:hover,
.main-nav-links li a.router-link-exact-active {
  /* Style active link */
  color: #00aaff; /* Example hover/active color */
  /* Add underline or other indicator if desired */
  /* border-bottom: 2px solid #00aaff; */
}

/* Styles for the right-side items container */
.right-nav-items {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  /* Removed margin-left */
}

.language-switcher {
  display: flex;
  align-items: center;
  margin-right: 1.5rem; /* Increased space before auth items */
}

.language-switcher button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 4px; /* Adjusted */
}

.language-switcher img {
  width: 30px; /* Adjusted */
  height: auto;
  display: block;
}
.language-switcher button:hover {
  opacity: 0.8;
}

.sign-in-link {
  text-decoration: none;
  background-color: #275de1;
  color: white !important;
  padding: 7px 15px; /* Adjusted */
  border-radius: 5px; /* Adjusted */
  transition: background-color 0.3s;
  white-space: nowrap;
  font-weight: 500; /* Adjusted */
}
.sign-in-link:hover {
  background-color: #1a4abd;
  text-decoration: none;
}

.user-avatar-wrapper {
  position: relative;
  padding: 0 5px;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  display: block;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} /* Increased size */
.user-avatar:hover {
  transform: scale(1.05);
}
.avatar-dropdown {
  position: relative;
  display: inline-block;
}

/* Thay thế cả 2 khối .avatar-menu bằng */
.avatar-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  min-width: 100px;
  padding: 6px 0 !important;
  right: 50% !important;
  transform: translateX(50%) !important;
  top: calc(100% + 8px) !important;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1001;
  /* Reset các thuộc tính nguy hiểm */
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.avatar-menu::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 50% !important;
  left: auto;
  transform: translateX(50%) !important;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
}
.avatar-dropdown:hover .avatar-menu {
  opacity: 1;
  visibility: visible;
}

.logout-btn {
  width: auto;
  padding: 6px 12px;
  margin: 0 auto;
  border-radius: 4px;
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.logout-btn:hover {
  background: #ffeeee;
}

/* Burger and Mobile Styles */
.burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  flex-shrink: 0;
  margin-left: 1rem; /* Space from right items */
}
.burger div {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px;
  transition: all 0.3s ease;
}
.navbar-scrolled .burger div {
  background-color: #333;
}

/* Dropdown Menu Styles */
.dropdown {
  position: relative;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 160px;
  border-radius: 4px;
}
.dropdown-menu li {
  padding: 0;
  margin: 0;
  text-align: center;
  color: #333;
}
.dropdown-menu li button,
.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 9px 18px;
  font-size: 1rem;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.dropdown-menu li button:hover,
.dropdown-menu li a:hover {
  background-color: #f0f0f0;
}
.dropdown:hover .dropdown-menu {
  display: block;
}

/* Mobile Styles */
@media (max-width: 992px) {
  /* Tablet and below */
  /* Target the main links list directly for mobile menu */
  .main-nav-links {
    display: none; /* Hide by default */
    position: absolute;
    top: 65px; /* Position below navbar height */
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column; /* Stack vertically */
    padding: 1rem 0;
    margin-left: 0; /* Reset margin */
    margin-right: 0; /* Reset margin */
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
  }

  .main-nav-links.open {
    display: flex; /* Show when open */
    transform: translateX(0); /* Slide in */
  }

  .main-nav-links li {
    margin: 1rem 0;
    text-align: center;
    width: 100%;
    color: #333;
  }
  .main-nav-links li a {
    padding: 0.5rem 0;
    display: block;
    width: 100%;
    color: #333; /* Ensure color for mobile */
    font-size: 1.1rem; /* Slightly larger for mobile tap */
  }
  .main-nav-links li a:hover {
    background-color: #f0f0f0;
    color: #0077b6; /* Example hover color */
  }

  .right-nav-items {
    display: none; /* Hide right items on mobile (or move them into menu) */
  }

  .burger {
    display: flex; /* Show burger */
    margin-left: auto; /* Push burger right */
  }
}
</style>
