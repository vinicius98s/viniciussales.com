module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react'],
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
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'import/no-cycle': 'off',
    'react/prop-types': [2, { ignore: ['children', 'theme'] }],
    'consistent-return': 'off',
  },
  globals: {
    window: true,
    document: true,
  },
  settings: {
    'import/resolver': {
      alias: [['src', './src']],
    },
  },
  env: {
    jest: true,
  },
};
