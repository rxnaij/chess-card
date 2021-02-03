const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Overpass', ...defaultTheme.fontFamily.sans],
        lichess: 'lichess',
      },
      colors: {
        'brand-black': '#212121',
        'brand-white': '#E5E5E5',
        'brand-red': '#FF5AF5',
        'brand-green': '#62C370',
        'brand-blue': '#008DD5',
        'brand-background': '#3A3A68',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/custom-forms')
  ],
}
