/**
 * Elegant Layout Performance Utilities
 * Optimized for fast loading and smooth animations
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = function() { this.rel = 'stylesheet'; };
  document.head.appendChild(fontLink);
  
  // Preload Font Awesome
  const faLink = document.createElement('link');
  faLink.rel = 'preload';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
  faLink.as = 'style';
  faLink.onload = function() { this.rel = 'stylesheet'; };
  document.head.appendChild(faLink);
};

// Optimized scroll handler with RAF
export const createOptimizedScrollHandler = (callback) => {
  let ticking = false;
  
  const update = () => {
    callback();
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  
  return requestTick;
};

// Intersection Observer for lazy animations
export const createAnimationObserver = (options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, defaultOptions);
};

// Debounced resize handler
export const createResizeHandler = (callback, delay = 250) => {
  let timeoutId;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

// Image lazy loading with placeholder
export const setupLazyImages = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Critical CSS injection
export const injectCriticalCSS = () => {
  const criticalCSS = `
    /* Critical above-the-fold styles */
    .elegant-minimal-layout {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #000000;
      background-color: #ffffff;
    }
    
    .minimal-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid #e4e4e7;
      z-index: 1000;
    }
    
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 8rem 0 4rem;
      background: #ffffff;
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Performance monitoring
export const monitorPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      const metrics = {
        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
      };
      
      console.log('Performance Metrics:', metrics);
      
      // Send to analytics if needed
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          custom_parameter: metrics.loadTime
        });
      }
    });
  }
};

// Accessibility enhancements
export const enhanceAccessibility = () => {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 z-50';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Enhanced focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // ARIA live region for dynamic content
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = 'live-region';
  document.body.appendChild(liveRegion);
};

// Form validation utilities
export const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Announce to screen readers
export const announceToScreenReader = (message) => {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};

// Theme detection and adaptation
export const adaptToSystemPreferences = () => {
  // High contrast mode detection
  if (window.matchMedia('(prefers-contrast: high)').matches) {
    document.documentElement.classList.add('high-contrast');
  }
  
  // Reduced motion detection
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Color scheme detection (for future dark mode support)
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark-mode-preferred');
  }
};

// Initialize all performance optimizations
export const initializeElegantPerformance = () => {
  // Run immediately
  injectCriticalCSS();
  enhanceAccessibility();
  adaptToSystemPreferences();
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      setupLazyImages();
    });
  } else {
    preloadCriticalResources();
    setupLazyImages();
  }
  
  // Run on load
  window.addEventListener('load', monitorPerformance);
};

// Export default initialization function
export default {
  preloadCriticalResources,
  createOptimizedScrollHandler,
  createAnimationObserver,
  createResizeHandler,
  setupLazyImages,
  injectCriticalCSS,
  monitorPerformance,
  enhanceAccessibility,
  validateForm,
  announceToScreenReader,
  adaptToSystemPreferences,
  initializeElegantPerformance
}; 