/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Colores personalizados para BrandKit (Dark Mode)
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        dark: {
          bg: '#0B0C10',
          card: '#15161E',
          border: '#2A2B35'
        },
        // Colores oscuros específicos para BrandKit
        brandkit: {
          'darkest': '#080816',
          'dark-bg': '#0B0B1E',
          'dark-card': '#0f1021',
          'sidebar': '#14152A',
          'card-light': '#1A1C30',
          'header': '#1E2035',
          'ui-dark': '#111',
          'ui-medium': '#222',
          'ui-light': '#333',
        }
      }
    },
  },
  plugins: [],
}