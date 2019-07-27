const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'import/no-cycle': 'off',
    'react/prop-types': [2, { ignore: ['children'] }],
    'consistent-return': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [['src', './src']],
    },
  },
};
