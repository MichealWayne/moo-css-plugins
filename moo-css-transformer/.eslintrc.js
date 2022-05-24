module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-useless-escape': [0],
  },
};
