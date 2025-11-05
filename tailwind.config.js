/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 10%, 4%)',
        text: 'hsl(0, 0%, 98%)',
        accent: 'hsl(142, 76%, 45%)',
        border: 'hsl(240, 6%, 20%)',
        danger: 'hsl(0, 84%, 60%)',
        primary: 'hsl(271, 91%, 65%)',
        surface: 'hsl(240, 9%, 9%)',
        warning: 'hsl(38, 92%, 50%)',
        textMuted: 'hsl(240, 5%, 64%)',
        surfaceHover: 'hsl(240, 8%, 14%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 0%, 0.4)',
        'glow': '0 0 24px hsla(271, 91%, 65%, 0.3)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 24px hsla(271, 91%, 65%, 0.3)' },
          '50%': { boxShadow: '0 0 32px hsla(271, 91%, 65%, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}