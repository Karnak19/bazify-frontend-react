module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jx"],
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
