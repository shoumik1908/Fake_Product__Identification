/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C1D95',
        secondary: '#6D28D9',
        accent: '#8B5CF6',
        highlight: '#22D3EE',
        dark: '#020617',
        surface: '#0d0d1a',
        'light-bg': '#FFFFFF',
        'light-section': '#F8FAFC',
        'light-text': '#0F172A',
        'light-muted': '#64748B',
        'light-border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #020617 0%, #170d2b 40%, #2d1354 70%, #4C1D95 100%)',
        'purple-gradient': 'linear-gradient(135deg, #4C1D95, #6D28D9, #22D3EE)',
        'cta-gradient': 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(76,29,149,0.15), rgba(109,40,217,0.08))',
      },
      boxShadow: {
        'purple-glow': '0 0 30px rgba(139, 92, 246, 0.3)',
        'purple-glow-lg': '0 0 60px rgba(139, 92, 246, 0.4)',
        'cyan-glow': '0 0 20px rgba(34, 211, 238, 0.3)',
        'card-dark': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'card-light': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-light-hover': '0 12px 40px rgba(109, 40, 217, 0.12)',
        'step-card': '0 2px 16px rgba(0,0,0,0.06)',
        'step-card-hover': '0 8px 32px rgba(109,40,217,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-purple': 'pulsePurple 2s ease infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulsePurple: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 0 0 rgba(139,92,246,0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 0 8px rgba(139,92,246,0)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
