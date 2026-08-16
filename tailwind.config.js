/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030712', // Core Dark Obsidian background
        surface: {
          DEFAULT: '#09090B',
          lighter: '#121216',
          card: 'rgba(15, 23, 42, 0.4)',
        },
        brand: {
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          indigo: '#6366F1',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Syne', 'Cal Sans', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glow-hero': 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.18), rgba(6, 182, 212, 0.08) 50%, transparent 80%)',
        'glow-purple': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25), transparent 70%)',
        'glow-cyan': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.25), transparent 70%)',
      },
      boxShadow: {
        'glass-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.5)',
        'violet-glow': '0 0 25px -5px rgba(139, 92, 246, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
};
