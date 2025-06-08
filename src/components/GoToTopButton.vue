<template>
  <transition name="fade">
    <button v-if="visible" class="go-to-top-btn" @click="scrollToTop" aria-label="Go to top">
      <i class="fas fa-arrow-up"></i>
    </button>
  </transition>
</template>
<script>
export default {
  name: 'GoToTopButton',
  data() {
    return { visible: false };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.visible = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>
<style scoped>
.go-to-top-btn {
  position: fixed;
  bottom: 8rem;
  right: 2rem;
  z-index: 99997;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35 60%, #f59e0b 100%);
  color: #fff;
  border: none;
  box-shadow: 0 4px 16px #ff6b3533, 0 1.5px 8px #1e293b33;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  outline: none;
}
.go-to-top-btn:hover {
  background: linear-gradient(135deg, #f59e0b 60%, #ff6b35 100%);
  box-shadow: 0 8px 32px #ff6b35cc, 0 2px 12px #1e293b99;
  transform: translateY(-4px) scale(1.08);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .go-to-top-btn {
    right: 1rem;
    bottom: 9rem;
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
    z-index: 99996;
  }
}
@media (max-width: 480px) {
  .go-to-top-btn {
    right: 0.75rem;
    bottom: 8.5rem;
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
    z-index: 99996;
  }
}
</style> 