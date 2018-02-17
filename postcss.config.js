module.exports = {
  plugins: {
    'postcss-easy-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
      warnForDuplicates: false
    },
    'cssnano': {}
  }
};