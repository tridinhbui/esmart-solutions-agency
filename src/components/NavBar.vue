<template>
  <header class="navbar">
    <div class="navbar-content">
      <img src="@/assets/logo.png" alt="ESmart Logo" class="logo">
      <nav>
        <ul :class="{ open: isOpen }">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/social-proof">Our Achievement</router-link></li>
          <li><router-link to="/features">Features</router-link></li>
          <li><router-link to="/process">Process</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/pricing">Pricing</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/project">Project</router-link></li>
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
export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: white;
  /* padding: 1rem 1rem; */
  padding-right: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%; /* Ensures navbar stays within screen width */
  top: 0;
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  max-width: 6%;
  margin-left: 3rem;

}

nav ul {
  display: flex; /* Default display for larger screens */
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 1rem;
  cursor: pointer;
  color: #333;
  font-weight: bold;
}

nav ul li a {
  text-decoration: none;
  color: inherit;
}

nav ul li:hover {
  color: #0077b6;
}

.burger {
  display: none; /* Hidden initially for larger screens */
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

/* Enhanced animations for open/close menu */
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

/* Media query for phone screens (adjust breakpoint as needed) */
@media (max-width: 768px) {
  nav ul {
    display: none; /* Hidden initially on small screens */
    flex-direction: column;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 60px;
    left: 0;
    transition: transform 0.3s ease; /* Animation for menu slide-out */
  }

  nav ul.open {
    display: flex; /* Display menu when open on small screens */
    transform: translateX(0); /* Reset transform for open menu */
  }

  nav ul li {
    margin: 1rem 0;
    text-align: center;
  }

  .burger {
    display: flex; /* Show burger menu on small screens */
  }
}

</style>
