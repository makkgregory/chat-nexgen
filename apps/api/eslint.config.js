module.exports = {
  extends: ["@eslint/js", "typescript-eslint"],
  ignores: ["dist/**"],
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
