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
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-mixed-operators': 'off',
  },
};
