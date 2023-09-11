module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-console": ["warn", { allow: ["info", "error"] }],
    "arrow-body-style": ["error", "always"],
    "accessor-pairs": "error",
    "block-scoped-var": "error",
    camelcase: "error",
    "class-methods-use-this": "error",
    complexity: "error",
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "default-param-last": "error",
    "dot-notation": "error",
    eqeqeq: ["error", "smart"],
    "func-name-matching": "error",
    "func-names": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "id-denylist": ["error", "data", "err", "e", "cb", "callback"],
    "id-length": ["error", { min: 2, max: 30 }],
    "max-classes-per-file": "error",
    "max-depth": ["error", 4],
    "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
    "max-lines-per-function": ["error", { max: 50, skipBlankLines: true, skipComments: true }],
    "max-nested-callbacks": ["error", 3],
    "max-params": ["error", 4],
    "multiline-comment-style": "error",
    // Style
    "array-bracket-newline": ["error", "consistent"],
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", "consistent"],
    "arrow-parens": "error",
    "arrow-spacing": ["error", { before: true, after: true }],

    // typescript-eslint
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error"
  }
};
