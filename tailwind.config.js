<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
=======
﻿/** @type {import('tailwindcss').Config} */
>>>>>>> 919c478c0c15e43df7f628bb7cf3a126fbf1c158
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
<<<<<<< HEAD
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#181818',
          950: '#0a0a0a',
        },
        soft: {
          light: '#fafafa',
          dark: '#0a0a0a',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.08), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 20px 60px -15px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(0, 0, 0, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 0, 0, 0.25)',
        'glow-invert': '0 0 20px rgba(255, 255, 255, 0.15)',
      },
      borderRadius: {
        'soft': '1rem',
        'soft-lg': '1.5rem',
        'soft-xl': '2rem',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
=======
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          'container-lowest': '#ffffff',
          'container-low': '#eff4ff',
          container: '#e5eeff',
          'container-high': '#dce9ff',
          'container-highest': '#d3e4fe',
        },
        'on-surface': {
          DEFAULT: '#0b1c30',
          variant: '#464554',
        },
        'inverse-surface': {
          DEFAULT: '#213145',
          'on': '#eaf1ff',
        },
        outline: {
          DEFAULT: '#767586',
          variant: '#c7c4d7',
        },
        'surface-tint': '#494bd6',
        primary: {
          DEFAULT: '#4648d4',
          on: '#ffffff',
          container: '#6063ee',
          'on-container': '#fffbff',
          fixed: '#e1e0ff',
          'fixed-dim': '#c0c1ff',
          'on-fixed': '#07006c',
          'on-fixed-variant': '#2f2ebe',
        },
        'inverse-primary': '#c0c1ff',
        secondary: {
          DEFAULT: '#6b38d4',
          on: '#ffffff',
          container: '#8455ef',
          'on-container': '#fffbff',
          fixed: '#e9ddff',
          'fixed-dim': '#d0bcff',
          'on-fixed': '#23005c',
          'on-fixed-variant': '#5516be',
        },
        tertiary: {
          DEFAULT: '#006577',
          on: '#ffffff',
          container: '#008096',
          'on-container': '#f9fdff',
          fixed: '#acedff',
          'fixed-dim': '#4cd7f6',
          'on-fixed': '#001f26',
          'on-fixed-variant': '#004e5c',
        },
        error: {
          DEFAULT: '#ba1a1a',
          on: '#ffffff',
          container: '#ffdad6',
          'on-container': '#93000a',
        },
        background: {
          DEFAULT: '#f8f9ff',
          on: '#0b1c30',
        },
        'surface-variant': '#d3e4fe',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0em' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0em' }],
        'label-md': ['14px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }],
        'label-sm': ['12px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.04em' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'xs': '4px',
        'sm-custom': '12px',
        'md-custom': '24px',
        'lg-custom': '48px',
        'xl-custom': '80px',
        'gutter': '24px',
        'margin-safe': '32px',
      },
      borderRadius: {
        'sm-custom': '0.25rem',
        'base-custom': '0.5rem',
        'md-custom': '0.75rem',
        'lg-custom': '1rem',
        'xl-custom': '1.5rem',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'glass-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        'glass-elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glass-glow': '0 0 20px rgba(70, 72, 212, 0.15)',
      },
      transitionProperty: {
        'lift': 'transform, box-shadow',
>>>>>>> 919c478c0c15e43df7f628bb7cf3a126fbf1c158
      },
    },
  },
  plugins: [],
}
