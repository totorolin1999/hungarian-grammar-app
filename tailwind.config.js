/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hungarian: {
          red: '#CE2939',
          white: '#FFFFFF',
          green: '#477050',
          darkRed: '#9e1b27',
          darkGreen: '#2e4934'
        }
      }
    },
  },
  plugins: [],
}
