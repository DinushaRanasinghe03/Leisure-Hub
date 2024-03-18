/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A6C4D1",
        secondary: "#4990AE",
        selected: "#ffe58f",
        unavailable: "#ffadaf",
      },
    },
  },
  plugins: [],
};
