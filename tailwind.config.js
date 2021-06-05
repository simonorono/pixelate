const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
