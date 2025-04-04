<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-content">
      <img src="@/assets/logo.png" alt="ESmart Logo" class="logo" />
      <nav>
        <ul :class="{ open: isOpen }">
          <li>
            <div class="language-switcher">
              <button @click="switchLanguage('vi')">
                <img src="@/assets/vietnamese-flag.png" alt="Vietnamese" />
              </button>
              <button @click="switchLanguage('en')">
                <img src="@/assets/english-flag.png" alt="English" />
              </button>
            </div>
          </li>
          <!-- <li><router-link to="#intro">Trang chủ</router-link></li> -->
          <li>
            <router-link to="#intro">{{ $t("home") }}</router-link>
          </li>
          <li>
            <router-link to="#marketing-assessment">{{
              $t("Assessment")
              }}</router-link>
          </li>
          <li>
            <router-link to="#social-proof">{{
              $t("achievements")
              }}</router-link>
          </li>
          <li class="dropdown">
            <router-link to="#blog">{{ $t("blog") }}</router-link>
            <ul class="dropdown-menu">
              <li>
                <a href="/detailed-blog-1" target="_blank" rel="noopener noreferrer">
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
          <li><router-link to="#service"></router-link></li>
          <li v-if="!authStore.user" class="sign-in-btn">
            <router-link to="/sign-in" class="sign-in-link">
            {{ $t("signIn") }}
            </router-link>
            </li>
          <li v-else class="user-avatar-wrapper">
            <div class="avatar-dropdown" 
              @mouseenter="showDropdown = true" 
              @mouseleave="showDropdown = false">
              <img :src="authStore.user.photoURL || defaultAvatar" 
              class="user-avatar" 
              alt="User Avatar">
              <div v-if="showDropdown" class="dropdown-menu avatar-menu">
                <button @click="handleLogout" class="logout-btn">
                  {{ $t("Sign Out") }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="burger" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

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
  // Composition API setup function
  setup() {
    const authStore = useAuthStore(); // Initialize auth store
    return { authStore }; // Make it available in template
  },
  methods: {
    // Toggles mobile menu
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    // Changes application language
    switchLanguage(language) {
      this.$i18n.locale = language;
    },
    // Navigates to blog page
    goToBlog() {
      this.$router.push({ name: "DetailedBlog1" });
    },
    // Handles scroll event for navbar styling
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    // Handles user logout
    async handleLogout() {
      try {
        await signOut(auth); // Firebase sign out
        this.$router.push('/sign-in'); // Redirect to sign-in page
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  // Lifecycle hook - adds scroll listener
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.sign-in-btn {
  margin-left: 1rem;
}

.sign-in-link {
  background-color: #275de1;
  color: white !important;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sign-in-link:hover {
  background-color: #275de1;
  text-decoration: none;
}

.user-avatar-wrapper {
  position: relative;
  margin-left: 1.5rem;
}

.avatar-dropdown {
  display: inline-block;
  position: relative;
}

.avatar-dropdown:hover .avatar-menu {
  display: block !important;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

/* Dropdown menu */
.avatar-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  min-width: 80px;
  padding: 4px 8px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 8px 0;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 100;
}

.avatar-menu::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid white;
}

.avatar-dropdown:hover .avatar-menu {
  opacity: 1;
  visibility: visible;
}

.logout-btn {
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #ffeeee;
}

.language-switcher {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.language-switcher button {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.language-switcher img {
  width: 30px;
  /* Adjust size as needed */
  height: auto;
}

.language-switcher button:hover {
  opacity: 0.8;
}

.navbar {
  background-color: transparent;
  color: white;
  padding-right: 2rem;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  max-width: 6%;
  margin-left: 3rem;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 1rem;
  cursor: pointer;
  color: inherit;
  font-weight: bold;
  position: relative;
}

nav ul li a {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

nav ul li:hover {
  color: #0077b6;
}

.burger {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 4px;
  transition: all 0.3s ease;
}

nav ul.open {
  animation: slide-in 0.3s ease-in-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-80%);
  }

  to {
    transform: translateX(0);
  }
}

nav ul.open .burger div:nth-child(1) {
  transform: rotate(45deg) translateX(8px);
}

nav ul.open .burger div:nth-child(2) {
  opacity: 0;
}

nav ul.open .burger div:nth-child(3) {
  transform: rotate(-45deg) translateX(-8px);
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .sign-in-btn {
    margin: 1rem 0;
    text-align: center;
  }

  .sign-in-link {
    display: block;
    padding: 10px;
  }
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .user-avatar {
    width: 32px;
    height: 32px;
  }
  
  .user-avatar-wrapper {
    margin: 0.5rem 0;
  }
  
  .avatar-menu {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  .avatar-menu {
    right: auto;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
  }
  
  .avatar-dropdown:hover .avatar-menu {
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  nav ul {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 60px;
    left: 0;
    transition: transform 0.3s ease;
  }

  nav ul.open {
    display: flex;
    transform: translateX(0);
  }

  nav ul li {
    margin: 1rem 0;
    text-align: center;
  }

  .burger {
    display: flex;
  }
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
  min-width: 150px;
}

.dropdown-menu li {
  padding: 8px 16px;
  text-align: center;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
  font-size: 16px;
}

.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
