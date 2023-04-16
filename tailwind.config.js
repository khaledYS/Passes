/** @type {import('tailwindcss').Config} */
const mirrorful = require("./src/mirrorful/mirrorful.cjs")
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./src/*.{html,tsx}"],
  theme: {
    extend: {
      colors: mirrorful.Tokens.colors,
      fontSize: mirrorful.Tokens.fontSizes
    },
  },
  plugins: [],
}
