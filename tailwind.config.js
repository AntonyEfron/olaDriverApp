/** @type {import('tailwindcss').Config} */
// All color values are mirrored from src/theme.ts — keep in sync.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
      '5xl': '3840px',
    },
    extend: {
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },
      colors: {
        // ── Brand ─────────────────────────────────────────────────────────
        lime: {
          DEFAULT: '#D2EE00',
          dark: '#b8cc00',
          light: '#e1ff00',
        },
        brand: {
          black: '#0A0A0A',
          dark: '#111111',
          accent: '#D2EE00',
        },
        // ── Surfaces ──────────────────────────────────────────────────────
        dark: {
          bg: '#0A0A0A',
          card: '#151515',
          border: '#222222',
        },
        light: {
          bg: '#FFFFFF',
          border: '#F0F0F0',
        },
        // ── Semantic ──────────────────────────────────────────────────────
        alert: '#FF3B30',
        warning: '#FF9500',
        muted: '#8E8E93',

        // Keep legacy aliases so existing classes still compile
        primary: {
          DEFAULT: '#D2EE00',
          light: '#e1ff00',
          dark: '#b8cc00',
        },
        secondary: {
          DEFAULT: '#1C1C1C',
          light: '#2A2A2A',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── Animations ──────────────────────────────────────────────────────
      animation: {
        'fadeInUp': 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'fadeInDown': 'fadeInDown 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'slideInRight': 'slideInRight 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'slideInLeft': 'slideInLeft 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'slideUp': 'slideUp 0.3s ease forwards',
        'chatSlideUp': 'chatSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'floatY': 'floatY 4s ease-in-out infinite',
        'pulseGlow': 'pulseGlow 2.5s ease-in-out infinite',
        'pulseGlowLime': 'pulseGlowLime 2.5s ease-in-out infinite',
        'spinSlow': 'spin 12s linear infinite',
        'bounceDot': 'bounceDot 1.2s ease-in-out infinite',
        'scaleIn': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'revealCard': 'revealCard 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradientShift': 'gradientShift 6s ease infinite',
        'marquee': 'marquee 25s linear infinite',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        chatSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,230,0,0)' },
          '50%': { boxShadow: '0 0 30px 8px rgba(200,230,0,0.3)' },
        },
        pulseGlowLime: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200,230,0,0.4)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(200,230,0,0.15)' },
        },
        bounceDot: {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        revealCard: {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};
