/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Citadel (Multiverse Dossier) - semánticos en index.css @theme
        'space-black': '#24282f',
        'card-gray': '#3c3e44',
        'portal-green': '#97ce4c',
        'toxic-yellow': '#e4a788',
      },
      fontFamily: {
        'display': ['Metal Mania', 'system-ui'],
        'body': ['Winky Rough', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(151, 206, 76, 0.5), 0 0 20px rgba(151, 206, 76, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Para el portal
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}