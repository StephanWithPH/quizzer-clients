module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': ['warn', 175],
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
  },
};
