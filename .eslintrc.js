module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-console": ["error"],
    semi: ["error", "never"],
    indent: ["error", 2, {SwitchCase: 1}],
    "quote-props": ["error", "as-needed"],
    "comma-dangle": ["error", "always-multiline"],
    "array-element-newline": ["error", "consistent"],
    "array-bracket-newline": ["error", "consistent"],
    "max-len": ["error", {code: 120}],
    "max-statements-per-line": ["error", {max: 1}],
    "array-bracket-spacing": ["error", "never"],
    "object-curly-spacing": ["error", "never"],
    "comma-spacing": ["error", {before: false, after: true}],
    "keyword-spacing": "error",
    "space-infix-ops": ["error", {int32Hint: true}],
  },
}
