module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['jsx-a11y', 'react'],
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended'],
  globals: {
    Promise: false
  },
  rules: {
    // core
    indent: ['error', 2],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 'warn',
    semi: ['error', 'always'],

    // react
    'react/boolean-prop-naming': 'warn',
    'react/jsx-key': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/prop-types': 'warn',
    'react/require-render-return': 'error'
  }
};
