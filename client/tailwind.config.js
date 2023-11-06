const withMaterialUI = require("@material-tailwind/react/utils/withMT");

module.exports = withMaterialUI({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
      }
    },
  },
  plugins: []
})