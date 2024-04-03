/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      scoreboard: ["score-board", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        
      }
    },
  },
  plugins: [],
}