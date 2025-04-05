<template>
  <header :class="['navbar', { 'navbar-scrolled': isScrolled }]">
    <div class="navbar-content">
      <img src="@/assets/logo.png" alt="ESmart Logo" class="logo" />

      <nav class="main-nav">
        <ul :class="['main-nav-links', { open: isOpen }]">
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
          <li>
            <router-link to="#about-us">{{ $t("About Us") }}</router-link>
          </li>
           </ul>
      </nav>

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
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    switchLanguage(language) {
      this.$i18n.locale = language;
    },
    goToBlog() {
      // Consider if this is still needed if link works directly
      this.$router.push({ name: "DetailedBlog1" });
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    async handleLogout() {
      try {
        await signOut(auth);
        this.$router.push('/sign-in');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
/* Keep existing styles, add/modify the following */

.navbar {
  background-color: transparent;
  color: white;
  /* padding-right: 2rem; Remove default padding, handle spacing with flex */
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
  justify-content: space-between; /* Keeps logo left, right items right */
  align-items: center;
  width: 100%;
  padding: 0 1rem; /* Add some padding */
  box-sizing: border-box; /* Include padding in width */
  height: 60px; /* Example fixed height */
}

.logo {
  /* Adjust size as needed, flex-shrink prevents it from shrinking */
  height: 40px; /* Example height */
  width: auto;
  max-width: 150px; /* Limit logo width */
  flex-shrink: 0;
  margin-right: 1rem; /* Space between logo and nav */
}

/* Styles for the middle navigation container */
.main-nav {
  display: flex; /* Changed from default */
  justify-content: center; /* Center the ul inside */
  flex-grow: 1; /* Allow it to take up available space */
  overflow: hidden; /* Hide overflow if links are too many */
}

/* Styles for the main navigation links list */
.main-nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center; /* Align items vertically */
}

.main-nav-links li {
  margin: 0 0.8rem; /* Adjust spacing between links */
  cursor: pointer;
  color: inherit;
  font-weight: bold;
  position: relative;
  white-space: nowrap; /* Prevent links from wrapping */
}

.main-nav-links li a {
  text-decoration: none; /* Removes underline */
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* Add transition for smooth color change if you have hover effects */
  transition: color 0.2s ease;
}

/* Styles for the right-side items container */
.right-nav-items {
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Prevent shrinking */
  margin-left: 1rem; /* Space between nav and right items */
}

.language-switcher {
  display: flex;
  align-items: center;
  /* Removed margin-left: auto; as it's now positioned by the parent */
  margin-right: 1rem; /* Add space before auth items */
}

.language-switcher button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0; /* Remove padding if image is the only content */
  margin: 0 3px; /* Fine-tune spacing */
}

.language-switcher img {
  width: 28px; /* Slightly adjusted size */
  height: auto;
  display: block; /* Prevents extra space below image */
}

.language-switcher button:hover {
  opacity: 0.8;
}


/* Keep other styles like .dropdown, .sign-in-btn, .user-avatar-wrapper, .burger etc. */
/* Ensure mobile styles correctly target the new structure if needed */



.sign-in-link {
  text-decoration: none; /* Removes underline */
  background-color: #275de1;
  color: white !important;
  padding: 6px 14px;
  border-radius: 4px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.sign-in-link:hover {
  background-color: #1a4abd; /* Darker shade on hover */
  text-decoration: none;
}

.user-avatar-wrapper {
  position: relative;
  /* margin-left: 1.5rem; Adjusted - now spacing controlled by parent */
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
  display: block;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.avatar-dropdown {
  display: inline-block;
  position: relative;
}

.avatar-menu {
  position: absolute;
  top: calc(100% + 8px); /* Position below avatar */
  right: 0; /* Align to the right edge of the wrapper */
  left: auto; /* Override previous centering */
  transform: translateX(0); /* Override previous centering */
  /* Other styles remain */
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
  right: 10px; /* Position arrow near the right */
  left: auto;
  transform: translateX(0);
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
  font-size: 0.9rem; /* Slightly smaller font */
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.logout-btn:hover {
  background: #ffeeee;
}


/* Burger and Mobile Styles need careful review */
.burger {
  display: none; /* Hidden by default */
  flex-direction: column;
  cursor: pointer;
  flex-shrink: 0; /* Prevent shrinking */
}

.burger div {
  width: 25px;
  height: 3px;
  /* Background color should adapt based on scroll */
  background-color: white; /* Default for transparent */
  margin: 4px;
  transition: all 0.3s ease;
}

.navbar-scrolled .burger div {
  background-color: #333; /* Color when scrolled */
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
  border-radius: 4px; /* Added */
}

.dropdown-menu li {
  padding: 0; /* Remove padding here */
  margin: 0; /* Remove margin here */
  text-align: center; /* Keep text centered if needed */
  color: #333; /* Ensure text color is set */
}

.dropdown-menu li a {
  text-decoration: none; /* Removes underline */
  color: #333;
  display: block;
  padding: 8px 16px;
  font-size: 1rem;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-menu li button,
.dropdown-menu li a { /* Style buttons and links similarly */
  text-decoration: none;
  color: #333;
  display: block;
  padding: 8px 16px; /* Add padding here */
  font-size: 1rem; /* Match other links */
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
@media (max-width: 992px) { /* Adjust breakpoint as needed */
  .main-nav {
    /* Hide main nav, show burger */
    position: absolute; /* Take it out of flow */
    top: 60px; /* Position below navbar */
    left: 0;
    width: 100%;
    background-color: white; /* Background for mobile menu */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%); /* Hide off-screen */
    transition: transform 0.3s ease-in-out;
    z-index: 999; /* Below navbar but above content */
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .main-nav-links {
    flex-direction: column; /* Stack links vertically */
    width: 100%;
  }

  .main-nav-links li {
    margin: 0.8rem 0; /* Vertical spacing */
    text-align: center;
    width: 100%;
    color: #333; /* Ensure text color is visible on white */
  }

   .main-nav-links li a { /* Ensure links take full width */
     padding: 0.5rem 0;
     display: block;
     width: 100%;
     color: #333; /* Explicit color */
   }
   .main-nav-links li a:hover {
      background-color: #f0f0f0; /* Hover effect */
   }

  .main-nav-links.open { /* Renamed from nav ul.open */
    transform: translateX(0); /* Slide in */
  }

  .right-nav-items {
    /* Decide if these stay visible or hide */
    /* Option 1: Keep visible */
     /* margin-left: auto; Push to right */
    /* Option 2: Hide and move to burger menu - More complex */
     display: none; /* Example: Hide */
  }

  .burger {
    display: flex; /* Show burger */
    margin-left: auto; /* Push burger to the right */
  }

  /* You'll need to adjust the .open class toggling and potentially move
     the right-nav-items into the main-nav when it's open on mobile */

}


</style>