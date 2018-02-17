module.exports = {
  themes: [
    {
      name: 'html5blank-stable',
      entry: 'client/scripts/index',
      sass: 'client/styles/index.scss',
      vendor: [
        'jquery'
      ],
      ignore: [
        'client/**/*'
      ]
    }
  ]
};