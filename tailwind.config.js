const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Basier Circle", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        0: "0rem",
        jumbo: "3.25rem",
      },
      colors: {
        gray: colors.trueGray,
        cyan: colors.cyan,
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
};
