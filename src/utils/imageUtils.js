// Image utilities for better error handling and loading
export const ImageUtils = {
  // Preload images with promise support
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  },

  // Preload multiple images
  async preloadImages(imageUrls) {
    const results = await Promise.allSettled(
      imageUrls.map(url => this.preloadImage(url))
    );
    
    const loaded = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;
    
    console.log(`Images loaded: ${loaded}/${imageUrls.length}, Failed: ${failed}`);
    
    return results;
  },

  // Get fallback image based on type
  getFallbackImage(type = 'default', size = '300x200') {
    const fallbacks = {
      avatar: `https://via.placeholder.com/60x60/007bff/white?text=👤`,
      testimonial: `https://via.placeholder.com/60x60/28a745/white?text=⭐`,
      blog: `https://via.placeholder.com/${size}/f8f9fa/6c757d?text=ESmart+News`,
      logo: `https://via.placeholder.com/120x60/000000/white?text=LOGO`,
      social: `https://via.placeholder.com/60x60/6c757d/white?text=📱`,
      default: `https://via.placeholder.com/${size}/e9ecef/6c757d?text=No+Image`
    };
    
    return fallbacks[type] || fallbacks.default;
  },

  // Handle image error with automatic fallback
  handleImageError(event, type = 'default') {
    const img = event.target;
    const originalSrc = img.src;
    
    console.warn(`Image failed to load: ${originalSrc}`);
    
    // Set fallback image
    img.src = this.getFallbackImage(type);
    
    // Add visual indicator
    img.classList.add('fallback-image');
    img.title = `Original image not found: ${originalSrc}`;
    
    // Prevent infinite error loops
    img.onerror = null;
  },

  // Check if image exists before loading
  async imageExists(url) {
    try {
      await this.preloadImage(url);
      return true;
    } catch {
      return false;
    }
  },

  // Get optimized image URL
  getOptimizedImageUrl(url) {
    if (!url) return this.getFallbackImage();
    
    // If it's already a placeholder or data URL, return as is
    if (url.includes('placeholder.com') || url.startsWith('data:')) {
      return url;
    }
    
    // For local assets, ensure proper path
    if (url.startsWith('@/assets/')) {
      try {
        return require(url);
      } catch (error) {
        console.warn(`Asset not found: ${url}`);
        return this.getFallbackImage();
      }
    }
    
    return url;
  }
};

// Vue mixin for easy use in components
export const ImageMixin = {
  methods: {
    handleImageError(event, type = 'default') {
      ImageUtils.handleImageError(event, type);
    },
    
    getFallbackImage(type, size) {
      return ImageUtils.getFallbackImage(type, size);
    },
    
    async preloadImages(urls) {
      return ImageUtils.preloadImages(urls);
    }
  }
};

export default ImageUtils; 