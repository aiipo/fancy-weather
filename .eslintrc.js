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
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
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
  },
};
