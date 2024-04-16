/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      width:{
        '1/7':'70%'
      }
    },
  },
  plugins: [],
}

