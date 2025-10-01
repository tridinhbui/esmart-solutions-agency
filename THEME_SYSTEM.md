# eSmart Solutions Agency - Theme System Documentation

## Overview

The eSmart Solutions Agency now features a robust theming system that supports both Light and Dark modes. The system is built using CSS custom properties (CSS variables) and provides seamless theme switching with persistence and system preference detection.

## Features

✅ **Light Theme (Default)** - Clean white background with blue accents  
✅ **Dark Theme** - Dark background with maintained blue accents and good contrast  
✅ **System Preference Detection** - Automatically detects `prefers-color-scheme`  
✅ **localStorage Persistence** - Remembers user's theme choice  
✅ **Smooth Transitions** - 0.3s ease transitions between themes  
✅ **CSS Variables** - Centralized theme management via CSS custom properties  
✅ **Existing Toggle Integration** - Uses the existing theme toggle in the user dropdown  

## Architecture

### 1. CSS Variables System (`src/assets/global.css`)

The theme system uses CSS custom properties defined in `:root` and `[data-theme="dark"]` selectors:

```css
:root {
  /* Light Theme Variables */
  --primary-blue: #3b82f6;
  --text-primary: #1e293b;
  --bg-primary: #ffffff;
  --navbar-bg: #ffffff;
  /* ... more variables */
}

[data-theme="dark"] {
  /* Dark Theme Variables */
  --text-primary: #f8fafc;
  --bg-primary: #0f172a;
  --navbar-bg: #1e293b;
  /* ... more variables */
}
```

### 2. Theme Service (`src/utils/themeService.js`)

A comprehensive service that handles:
- Theme initialization
- Theme switching
- localStorage persistence
- System preference detection
- Event dispatching for reactive components

```javascript
import themeService from '@/utils/themeService';

// Initialize theme system
themeService.init();

// Toggle theme
themeService.toggleTheme();

// Get current theme
const currentTheme = themeService.getTheme();

// Check if dark mode is active
const isDark = themeService.isDark();
```

### 3. Component Integration

The existing theme toggle in `SimpleNavBar.vue` has been updated to use the theme service:

```javascript
// Before
toggleDarkMode() {
  this.isDark = !this.isDark;
  document.documentElement.classList.toggle("dark", this.isDark);
  localStorage.setItem("theme", this.isDark ? "dark" : "light");
}

// After
toggleDarkMode() {
  const newTheme = themeService.toggleTheme();
  this.isDark = newTheme === 'dark';
}
```

## Usage

### For Users

1. **Theme Toggle**: Click on your avatar in the top-right corner and select "Dark mode" or "Light mode"
2. **Automatic Detection**: On first visit, the system respects your OS preference
3. **Persistence**: Your choice is remembered across browser sessions

### For Developers

#### Using CSS Variables in Components

```css
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
}

.my-component:hover {
  background: var(--bg-secondary);
  border-color: var(--primary-blue);
}
```

#### Listening to Theme Changes

```javascript
// In a Vue component
mounted() {
  window.addEventListener('themeChanged', this.onThemeChanged);
},

methods: {
  onThemeChanged(event) {
    const { theme, isDark } = event.detail;
    // Handle theme change
  }
}
```

#### Available CSS Variables

**Colors:**
- `--primary-blue`, `--primary-blue-dark`, `--primary-blue-light`
- `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-inverse`

**Borders:**
- `--border-light`, `--border-medium`, `--border-dark`, `--border-inverse`

**Shadows:**
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-blue`

**Component-specific:**
- `--navbar-bg`, `--navbar-border`, `--navbar-shadow`
- `--card-bg`, `--card-border`, `--card-hover-border`
- `--dropdown-bg`, `--dropdown-border`, `--dropdown-shadow`
- `--button-primary-bg`, `--button-primary-hover`
- `--button-secondary-bg`, `--button-secondary-border`, `--button-secondary-hover`

## Testing

### Theme Test Page

Visit `/theme-test` to see a comprehensive test of the theme system:
- Theme state display
- Button variations
- Text color examples
- Background color examples
- Interactive theme controls

### Manual Testing

1. **Theme Toggle**: Use the dropdown in the navbar to switch themes
2. **Persistence**: Refresh the page and verify theme is maintained
3. **System Preference**: Clear localStorage and verify system preference is respected
4. **Transitions**: Observe smooth transitions when switching themes

## Browser Support

- **CSS Custom Properties**: Supported in all modern browsers (IE11+ with polyfill)
- **prefers-color-scheme**: Supported in modern browsers
- **localStorage**: Supported in all modern browsers

## File Structure

```
src/
├── assets/
│   └── global.css              # CSS variables and global styles
├── utils/
│   └── themeService.js         # Theme management service
├── components/
│   ├── SimpleNavBar.vue        # Updated with theme service integration
│   └── ThemeTest.vue           # Theme system test component
├── main.js                     # Theme service initialization
└── App.vue                     # Updated with theme-aware styles
```

## Migration Notes

### Existing Components

Many components already use CSS variables in their scoped styles. These will automatically work with the new theme system. However, for full theme support, consider:

1. **Replace hardcoded colors** with CSS variables from the global theme
2. **Add transition properties** for smooth theme switching
3. **Test in both themes** to ensure proper contrast and readability

### Custom CSS Variables

Components with their own CSS variables (like `--primary-color`, `--quantum-blue`, etc.) will continue to work but won't automatically adapt to the theme system. Consider migrating these to use the global theme variables for consistency.

## Future Enhancements

Potential improvements for the theme system:

1. **More Theme Options**: Additional themes beyond light/dark
2. **Custom Color Schemes**: Allow users to customize accent colors
3. **Component-specific Themes**: Different themes for different sections
4. **Animation Preferences**: Respect `prefers-reduced-motion`
5. **Theme Preview**: Show preview before applying theme changes

## Troubleshooting

### Theme Not Persisting
- Check browser localStorage support
- Verify theme service initialization in `main.js`
- Check console for JavaScript errors

### Styles Not Updating
- Ensure CSS variables are used instead of hardcoded colors
- Check for CSS specificity issues
- Verify `data-theme` attribute is set on `<html>` element

### Performance Issues
- Minimize use of CSS transitions on theme change
- Consider using CSS containment for large components
- Profile theme switching performance in DevTools

## Conclusion

The theme system provides a solid foundation for light/dark mode support while maintaining the existing design aesthetic. The system is extensible and can be enhanced with additional themes or customization options in the future.

For questions or issues, refer to the theme test page at `/theme-test` or check the browser console for error messages.
