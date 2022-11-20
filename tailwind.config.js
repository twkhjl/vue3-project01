/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        inset1: 'inset 6px 6px 6px #cbced1, inset -6px -6px 6px white',

        neumorphism_sm:
          '-3px -3px 7px #ffffff73, 3px 3px 5px rgba(94, 104, 121, 0.288)',
        neumorphism_md:
          '-5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3)',
        neumorphism_inset_sm:
          'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)',
        neumorphism_inset_md:
          ' inset -3px -3px 7px #ffffff73,inset 3px 3px 5px rgba(94, 104, 121, 0.288)',
      },
      transitionProperty: {
        'all-2': 'transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);',
      },
    },
  },
  plugins: [],
}
