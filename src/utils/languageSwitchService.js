/**
 * Language Switch Service
 * Handles language switching with proper cleanup to prevent race conditions
 * and text corruption during rapid language changes
 */

class LanguageSwitchService {
  constructor() {
    this.activeTimeouts = new Set();
    this.activeAnimations = new Set();
    this.isSwitching = false;
  }

  /**
   * Clear all active timeouts and animations
   */
  clearAllActiveOperations() {
    // Clear all timeouts
    this.activeTimeouts.forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
    this.activeTimeouts.clear();

    // Clear all animations
    this.activeAnimations.forEach(animationId => {
      cancelAnimationFrame(animationId);
    });
    this.activeAnimations.clear();

    // Reset switching state
    this.isSwitching = false;
  }

  /**
   * Track a timeout for cleanup
   * @param {number} timeoutId - The timeout ID to track
   */
  trackTimeout(timeoutId) {
    this.activeTimeouts.add(timeoutId);
  }

  /**
   * Track an animation frame for cleanup
   * @param {number} animationId - The animation frame ID to track
   */
  trackAnimation(animationId) {
    this.activeAnimations.add(animationId);
  }

  /**
   * Remove a timeout from tracking
   * @param {number} timeoutId - The timeout ID to remove
   */
  untrackTimeout(timeoutId) {
    this.activeTimeouts.delete(timeoutId);
  }

  /**
   * Remove an animation from tracking
   * @param {number} animationId - The animation frame ID to remove
   */
  untrackAnimation(animationId) {
    this.activeAnimations.delete(animationId);
  }

  /**
   * Safe setTimeout that tracks the timeout for cleanup
   * @param {Function} callback - The callback function
   * @param {number} delay - The delay in milliseconds
   * @returns {number} The timeout ID
   */
  safeSetTimeout(callback, delay) {
    if (this.isSwitching) {
      // Don't create new timeouts during language switching
      return null;
    }

    const timeoutId = setTimeout(() => {
      this.untrackTimeout(timeoutId);
      callback();
    }, delay);

    this.trackTimeout(timeoutId);
    return timeoutId;
  }

  /**
   * Safe requestAnimationFrame that tracks the animation for cleanup
   * @param {Function} callback - The callback function
   * @returns {number} The animation frame ID
   */
  safeRequestAnimationFrame(callback) {
    if (this.isSwitching) {
      // Don't create new animations during language switching
      return null;
    }

    const animationId = requestAnimationFrame(() => {
      this.untrackAnimation(animationId);
      callback();
    });

    this.trackAnimation(animationId);
    return animationId;
  }

  /**
   * Begin a language switch operation
   */
  beginLanguageSwitch() {
    this.isSwitching = true;
    this.clearAllActiveOperations();
  }

  /**
   * End a language switch operation
   * @param {number} delay - Optional delay before allowing new operations
   */
  endLanguageSwitch(delay = 100) {
    setTimeout(() => {
      this.isSwitching = false;
    }, delay);
  }

  /**
   * Check if language switching is in progress
   * @returns {boolean} True if switching is in progress
   */
  isLanguageSwitching() {
    return this.isSwitching;
  }
}

// Create a singleton instance
const languageSwitchService = new LanguageSwitchService();

export default languageSwitchService;
