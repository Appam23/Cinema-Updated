module.exports = {
  files: ["**/*.js", "**/*.html"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: {
    html: require("eslint-plugin-html")
  },
  rules: {
    // Add custom rules here
  },
};
