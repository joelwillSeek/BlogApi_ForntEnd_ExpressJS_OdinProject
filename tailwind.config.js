/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        big_banner: "url('../assets/bigbanner.jpg')",
      },
    },
  },
  plugins: [],
};
