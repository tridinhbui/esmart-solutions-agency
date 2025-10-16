/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      // Typography System
      fontFamily: {
        serif: ["Playfair Display", "Times New Roman", "serif"],
        sans: [
          "SF Pro Text",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        text: [
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        compact: [
          "SF Compact",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "Monaco",
          "Cascadia Code",
          "Roboto Mono",
          "monospace",
        ],
      },

      // Enhanced Color Palette - WCAG AA+ Optimized
      colors: {
        black: "#000000",
        white: "#ffffff",
        primary: {
          50: '#F0EFFF',
          100: '#E0DFFF',
          200: '#C1BFFF',
          300: '#A29FFF',
          400: '#837FFF',
          500: '#3C34B5',
          600: '#2A2480',
          700: '#1F1A5C',
          800: '#141037',
          900: '#0A0613',
        },
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563", // WCAG AA: 7.0:1
          700: "#374151", // WCAG AA: 10.7:1
          800: "#1f2937", // WCAG AAA: 15.3:1
          900: "#111827", // WCAG AAA: 18.7:1
        },
      },

      // Spacing System - Elegant Proportions
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },

      // Typography Scale - Harmonious Ratios
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },

      // Content Width System
      maxWidth: {
        reading: "65ch",
        content: "800px",
        wide: "1400px",
      },

      // Enhanced Transitions - 60fps Optimized
      transitionDuration: {
        150: "150ms",
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },

      transitionTimingFunction: {
        elegant: "cubic-bezier(0.4, 0, 0.2, 1)",
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        smooth: "cubic-bezier(0.4, 0, 0.6, 1)",
      },

      // Shadow System - Luxury Feel
      boxShadow: {
        elegant:
          "0 20px 25px rgba(0, 0, 0, 0.1), 0 25px 50px rgba(0, 0, 0, 0.25)",
        luxury: "0 25px 50px rgba(0, 0, 0, 0.15)",
        subtle: "0 1px 2px rgba(0, 0, 0, 0.05)",
        soft: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 15px rgba(0, 0, 0, 0.1)",
      },

      // Animation System
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-right": "fadeInRight 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "rotate-slow": "rotate 8s linear infinite",
        "pulse-elegant": "pulseElegant 3s ease-in-out infinite",
        shine: "shine 2s ease-in-out infinite",
        "underline-expand": "underlineExpand 1.5s ease-out 0.5s both",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseElegant: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        underlineExpand: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },

      // Grid System - Elegant Layouts
      gridTemplateColumns: {
        "elegant-2": "repeat(2, minmax(0, 1fr))",
        "elegant-3": "repeat(3, minmax(0, 1fr))",
        "elegant-4": "repeat(4, minmax(0, 1fr))",
        hero: "1fr 1fr",
        contact: "1fr 1fr",
        footer: "1fr auto auto",
      },

      // Backdrop Blur
      backdropBlur: {
        elegant: "20px",
        luxury: "40px",
      },

      // Letter Spacing
      letterSpacing: {
        elegant: "0.025em",
        luxury: "0.05em",
        wide: "0.1em",
      },

      // Border Radius - Minimal Design
      borderRadius: {
        elegant: "2px",
        soft: "4px",
      },

      // Z-Index System
      zIndex: {
        nav: "1000",
        modal: "2000",
        tooltip: "3000",
      },
    },
  },
  plugins: [
    // Custom Plugin for Elegant Components
    function ({ addComponents, theme }) {
      addComponents({
        ".btn-elegant": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${theme("spacing.4")} ${theme("spacing.8")}`,
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.base")[0], // ✅ use first element
          lineHeight: theme("fontSize.base")[1].lineHeight,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          "&:focus": {
            outline: "none",
            boxShadow: `0 0 0 3px ${theme("colors.black")}40`,
          },
        },
        ".btn-primary": {
          backgroundColor: theme("colors.black"),
          color: theme("colors.white"),
          "&:hover": {
            backgroundColor: theme("colors.gray.900"),
            transform: "translateY(-2px)",
            boxShadow: theme("boxShadow.luxury"),
          },
        },
        ".btn-secondary": {
          backgroundColor: "transparent",
          color: theme("colors.black"),
          border: `1px solid ${theme("colors.gray.300")}`,
          "&:hover": {
            borderColor: theme("colors.black"),
            transform: "translateY(-1px)",
            boxShadow: theme("boxShadow.soft"),
          },
        },
        ".card-elegant": {
          backgroundColor: theme("colors.white"),
          border: `1px solid ${theme("colors.gray.200")}`,
          padding: theme("spacing.8"),
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme("boxShadow.luxury"),
            borderColor: theme("colors.gray.400"),
          },
        },
        ".input-elegant": {
          width: "100%",
          padding: `${theme("spacing.4")} ${theme("spacing.4")}`,
          border: `1px solid ${theme("colors.gray.300")}`,
          backgroundColor: theme("colors.white"),
          fontSize: theme("fontSize.base")[0],
          lineHeight: theme("fontSize.base")[1].lineHeight,
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:focus": {
            outline: "none",
            borderColor: theme("colors.black"),
            boxShadow: `0 0 0 3px ${theme("colors.black")}20`,
          },
        },
        ".link-elegant": {
          color: theme("colors.black"),
          textDecoration: "none",
          position: "relative",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "inline-block",
          "&::after": {
            content: "''",
            position: "absolute",
            bottom: "-2px",
            left: "0",
            width: "0",
            height: "1px",
            backgroundColor: theme("colors.black"),
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          "&:hover::after": { width: "100%" },
        },
        ".section-elegant": {
          paddingTop: theme("spacing.32"),
          paddingBottom: theme("spacing.32"),
        },
        ".container-elegant": {
          maxWidth: theme("maxWidth.wide"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.8"),
          paddingRight: theme("spacing.8"),
        },
        ".title-elegant": {
          fontFamily: theme("fontFamily.serif"),
          fontSize: theme("fontSize.5xl")[0],
          lineHeight: theme("fontSize.5xl")[1].lineHeight,
          fontWeight: theme("fontWeight.semibold"),
          color: theme("colors.black"),
        },
        ".subtitle-elegant": {
          fontSize: theme("fontSize.lg")[0],
          lineHeight: theme("fontSize.lg")[1].lineHeight,
          color: theme("colors.gray.700"),
          maxWidth: theme("maxWidth.reading"),
        },
        ".sr-only": {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: "0",
        },
        ".focus-elegant:focus": {
          outline: `3px solid ${theme("colors.black")}`,
          outlineOffset: "3px",
          boxShadow: `0 0 0 6px ${theme("colors.black")}20`,
        },
      });
    },

    // ✅ Fixed Responsive Typography Plugin
    function ({ addUtilities, theme }) {
      const fs = (key) => {
        const [size, options] = theme(`fontSize.${key}`);
        return {
          fontSize: size,
          lineHeight: options?.lineHeight ?? "1.5",
        };
      };

      addUtilities({
        "@media (max-width: 768px)": {
          ".text-responsive-xl": fs("lg"),
          ".text-responsive-2xl": fs("xl"),
          ".text-responsive-3xl": fs("2xl"),
          ".text-responsive-4xl": fs("3xl"),
          ".text-responsive-5xl": fs("4xl"),
        },
      });
    },
  ],

  safelist: [
    "animate-fade-in-up",
    "animate-fade-in-right",
    "animate-float",
    "animate-float-delayed",
    "gpu-accelerated",
    "smooth-rendering",
    {
      pattern:
        /(bg|text|border)-(gray|black|white)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    { pattern: /animate-(pulse|bounce|spin|ping)/ },
  ],

  variants: {
    extend: {
      backgroundColor: ["active", "group-hover"],
      textColor: ["active", "group-hover"],
      transform: ["active", "group-hover"],
      scale: ["active", "group-hover"],
      translate: ["active", "group-hover"],
      opacity: ["active", "group-hover"],
      boxShadow: ["active", "group-hover"],
    },
  },

  corePlugins: {
    container: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
  },

  darkMode: "class",
};
