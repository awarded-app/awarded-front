const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Asap", "Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: []
};
