module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  plugins: [
    require('@tailwindcss/forms')
  ],
}
