module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:mocha/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier", "mocha"],
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    mocha: true,
  },
};
