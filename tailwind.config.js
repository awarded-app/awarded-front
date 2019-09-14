const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Asap", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: []
};
