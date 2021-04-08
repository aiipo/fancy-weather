module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'react-hooks',
    'jest',
  ],
  rules: {
    'max-len': ['error', 120],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-one-expression-per-line": "off",
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "always-multiline",
      "functions": "never",
    }],
    "camelcase": ["error", {
      "ignoreDestructuring": true
    }],
  },
};
