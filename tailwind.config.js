const colors = require("tailwindcss/colors");

module.exports = {
  purge: [
    "./*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
    "./src/**/*.ts",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        chakra: ["Chakra Petch", "sans-serif"],
        cabin: ["Cabin", "sans-serif"],
      },
      height: {
        inh: "inherit",
      },
      fontSize: {
        xxs: "10px",
      },
      colors: {
        ...colors,
      },
      gridTemplateColumns: {
        "layout-md": "200px 1fr",
        "layout-xs": " 50px 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
