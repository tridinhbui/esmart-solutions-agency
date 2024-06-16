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
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  max-width: 5%;
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

@media (max-width: 768px) {
  nav ul {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 60px;
    left: 0;
  }

  nav ul.open {
    display: flex;
  }

  nav ul li {
    margin: 1rem 0;
    text-align: center;
  }

  .burger {
    display: flex;
  }
}
</style>
