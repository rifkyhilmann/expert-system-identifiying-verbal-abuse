/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playwrite: ['Playwrite SK', 'sans-serif'],
      },
      colors: {
        DarkContent: {
          800: '#404040',
          900: '#262626',
        },
        DarkBg: {
          300: '#1f1f1f',
          400: '#1a1a1a',
          500: '#151515',
          600: '#101010',
        },
        primary: '#405D72',
        second : '#6e7a8497'
      }
    },
  },
  plugins: [],
}
