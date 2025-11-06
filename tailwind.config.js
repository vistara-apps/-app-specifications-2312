/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pixelBg: '#1a1a1a', // Dark background for retro feel
        pixelText: '#00ff00', // Bright green text
        pixelAccent: '#ff00ff', // Bright magenta for accents
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'], // Pixelated font
      },
    },
  },
  plugins: [],
}