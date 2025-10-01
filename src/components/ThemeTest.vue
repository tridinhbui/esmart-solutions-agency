<template>
  <div class="theme-test">
    <h2>Theme System Test</h2>
    <p>Current theme: <strong>{{ currentTheme }}</strong></p>
    <p>Is dark mode: <strong>{{ isDark ? 'Yes' : 'No' }}</strong></p>
    
    <div class="test-cards">
      <div class="test-card">
        <h3>Primary Button</h3>
        <button class="flat-btn flat-btn-primary">Primary Button</button>
      </div>
      
      <div class="test-card">
        <h3>Secondary Button</h3>
        <button class="flat-btn flat-btn-secondary">Secondary Button</button>
      </div>
      
      <div class="test-card">
        <h3>Text Colors</h3>
        <p class="text-primary">Primary text</p>
        <p class="text-secondary">Secondary text</p>
        <p class="text-muted">Muted text</p>
        <p class="text-blue">Blue text</p>
      </div>
      
      <div class="test-card">
        <h3>Background Colors</h3>
        <div class="bg-primary">Primary background</div>
        <div class="bg-secondary">Secondary background</div>
        <div class="bg-tertiary">Tertiary background</div>
      </div>
    </div>
    
    <div class="theme-controls">
      <button @click="toggleTheme" class="flat-btn flat-btn-primary">
        Switch to {{ isDark ? 'Light' : 'Dark' }} Mode
      </button>
      <button @click="clearTheme" class="flat-btn flat-btn-secondary">
        Use System Preference
      </button>
    </div>
  </div>
</template>

<script>
import themeService from '@/utils/themeService';

export default {
  name: 'ThemeTest',
  data() {
    return {
      currentTheme: 'light',
      isDark: false,
    };
  },
  mounted() {
    this.updateThemeState();
    window.addEventListener('themeChanged', this.onThemeChanged);
  },
  beforeUnmount() {
    window.removeEventListener('themeChanged', this.onThemeChanged);
  },
  methods: {
    toggleTheme() {
      const newTheme = themeService.toggleTheme();
      this.currentTheme = newTheme;
      this.isDark = newTheme === 'dark';
    },
    clearTheme() {
      const newTheme = themeService.clearStoredTheme();
      this.currentTheme = newTheme;
      this.isDark = newTheme === 'dark';
    },
    updateThemeState() {
      this.currentTheme = themeService.getTheme();
      this.isDark = themeService.isDark();
    },
    onThemeChanged(event) {
      this.currentTheme = event.detail.theme;
      this.isDark = event.detail.isDark;
    },
  },
};
</script>

<style scoped>
.theme-test {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.test-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.test-card {
  background: var(--card-bg);
  border: 2px solid var(--card-border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.test-card:hover {
  border-color: var(--card-hover-border);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.test-card h3 {
  margin-top: 0;
  color: var(--text-primary);
}

.test-card p {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
}

.test-card div {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  color: var(--text-primary);
}

.theme-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .theme-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .test-cards {
    grid-template-columns: 1fr;
  }
}
</style>
