module.exports = {
  themes: [
    /**
     * each object in the array will be a theme that will compile into the build directory
     */
    {
      /**
       * name of the directory where your theme will live under /src/themes
       */
      name: 'html5blank-stable',
      /**
       *  the entry point for your JavaScript
       */
      entry: 'client/scripts/index',
      /**
       *  the entry point for your SASS
       */
      sass: 'client/styles/index.scss',
      /** 
       * specify any vendor libraries that should be compiled into vendor.js by default
       */
      vendor: [
        'jquery'
      ],
      /**
       * ignore pattern for ignoring files during the copy/file sync process
       * by default we ignore the client src files (js/ts/css), but you can add as many as you like here
       */
      ignore: [
        'client/**/*'
      ]
      /**
       * More webpack options will follow - rules, node object, plugins
       */
    }
  ]
};