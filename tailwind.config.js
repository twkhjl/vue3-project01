/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'inset1':'inset 6px 6px 6px #cbced1, inset -6px -6px 6px white'
      },
      transitionProperty:{
        'all-2':'transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);'
      },
    },
  },
  plugins: [],
}