module.exports = {
  'env': {
      'browser': true,
      'es6': true,
      'node': true,
      'jasmine': true,
      'jquery': true
  },
  'extends': 'eslint:recommended',
  'parser': 'babel-eslint',
  'parserOptions': {
      'ecmaFeatures': {
          'experimentalObjectRestSpread': true,
          'jsx': true
      },
      'sourceType': 'module'
  },
  'rules': {
      'linebreak-style': [
          'error',
          'unix'
      ],
      'quotes': [
          'error',
          'single'
      ],
      'semi': [
          'error',
          'always'
      ],
      'no-console': [
        0
      ]
  }
};