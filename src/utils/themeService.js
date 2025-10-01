/**
 * Theme Management Service
 * Handles theme switching, persistence, and system preference detection
 */

class ThemeService {
  constructor() {
    this.STORAGE_KEY = 'esmart-theme';
    this.THEMES = {
      LIGHT: 'light',
      DARK: 'dark'
    };
    
    // Bind methods to preserve context
    this.init = this.init.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.getTheme = this.getTheme.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.detectSystemPreference = this.detectSystemPreference.bind(this);
  }

  /**
   * Initialize theme service
   * Should be called on app startup
   */
  init() {
    const savedTheme = this.getStoredTheme();
    const systemPreference = this.detectSystemPreference();
    
    // Use saved theme if available, otherwise use system preference
    const initialTheme = savedTheme || systemPreference;
    
    this.setTheme(initialTheme, false); // false = don't save to localStorage yet
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? this.THEMES.DARK : this.THEMES.LIGHT, false);
        }
      });
    }
    
    return initialTheme;
  }

  /**
   * Set the current theme
   * @param {string} theme - Theme name ('light' or 'dark')
   * @param {boolean} save - Whether to save to localStorage
   */
  setTheme(theme, save = true) {
    if (!Object.values(this.THEMES).includes(theme)) {
      console.warn(`Invalid theme: ${theme}. Using light theme instead.`);
      theme = this.THEMES.LIGHT;
    }

    // Set data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save to localStorage if requested
    if (save) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
    
    // Dispatch custom event for components that need to react to theme changes
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme, isDark: theme === this.THEMES.DARK } 
    }));
    
    return theme;
  }

  /**
   * Get the current theme
   * @returns {string} Current theme name
   */
  getTheme() {
    const themeAttr = document.documentElement.getAttribute('data-theme');
    return themeAttr || this.THEMES.LIGHT;
  }

  /**
   * Toggle between light and dark themes
   * @returns {string} New theme name
   */
  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;
    return this.setTheme(newTheme);
  }

  /**
   * Detect system color scheme preference
   * @returns {string} System preference theme
   */
  detectSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return this.THEMES.DARK;
    }
    return this.THEMES.LIGHT;
  }

  /**
   * Get stored theme from localStorage
   * @returns {string|null} Stored theme or null
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return null;
    }
  }

  /**
   * Clear stored theme preference
   * This will make the system use system preference again
   */
  clearStoredTheme() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      // Revert to system preference
      const systemPreference = this.detectSystemPreference();
      this.setTheme(systemPreference, false);
      return systemPreference;
    } catch (error) {
      console.warn('Failed to clear theme from localStorage:', error);
      return this.getTheme();
    }
  }

  /**
   * Check if current theme is dark
   * @returns {boolean} True if dark theme is active
   */
  isDark() {
    return this.getTheme() === this.THEMES.DARK;
  }

  /**
   * Get theme constants
   * @returns {object} Theme constants
   */
  getThemes() {
    return { ...this.THEMES };
  }
}

// Create and export singleton instance
const themeService = new ThemeService();

export default themeService;
