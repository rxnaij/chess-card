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
        'brand-background': '#2E2E2E',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#EFEFEF'
            },
            h2: {
              color: '#EFEFEF'
            },
            h3: {
              color: '#EFEFEF'
            },
            p: {
              color: '#EFEFEF'
            },
            a: {
              color: '#EFEFEF',
              '&hover': {
                color: '#008DD5'
              }
            }
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
