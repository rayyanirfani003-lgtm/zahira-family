/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette from spec
        cream: {
          50: '#F8F5EF',  // Main background
          100: '#EFE9DE', // Secondary background
          200: '#E8E0D0',
          300: '#DDD5C2',
          400: '#CFC5B0',
        },
        brown: {
          50: '#F5F2ED',
          100: '#E8E0D0',
          200: '#D5C9B5',
          300: '#B8A890',
          400: '#968568',
          500: '#756F66', // Text secondary
          600: '#5A5349',
          700: '#3D3832',
          800: '#2C2925', // Text primary
          900: '#1A1815',
        },
        gold: {
          50: '#FBF8F3',
          100: '#F5F0E5',
          200: '#EBE0C8',
          300: '#DCC99E',
          400: '#C9AE6E',
          500: '#B5965A', // Gold accent
          600: '#9A7E45',
          700: '#7D6537',
        },
        dark: {
          50: '#3A3733',
          100: '#292722', // Dark section
          200: '#1F1D1A',
          300: '#151412',
        },
        sage: {
          50: '#F4F6F2',
          100: '#E8EDE3',
          200: '#D1DBC7',
          300: '#B5C4A4',
          400: '#94A87C',
          500: '#738C5A',
          600: '#5A7046',
          700: '#475838',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1320px',
      },
      borderRadius: {
        'xl': '18px',
        '2xl': '22px',
        '3xl': '28px',
      },
      boxShadow: {
        'subtle': '0 2px 16px rgba(44, 41, 37, 0.04)',
        'soft': '0 4px 24px rgba(44, 41, 37, 0.06)',
        'card': '0 8px 40px rgba(44, 41, 37, 0.08)',
        'card-hover': '0 16px 56px rgba(44, 41, 37, 0.12)',
        'gold': '0 4px 20px rgba(181, 150, 90, 0.15)',
      },
      letterSpacing: {
        'wider': '0.08em',
        'widest': '0.15em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
