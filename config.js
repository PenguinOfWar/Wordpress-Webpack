module.exports = {
  themes: [
    /**
     * each object in the array will be a theme that will compile into the build directory
     * you can add as many as you want but a minimum of one is required
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
       * glob pattern for ignoring files during copy/file sync
       * by default we ignore the client src files (js/ts/css) in your theme src, but you can add as many as you like here
       * relative to your theme root
       */
      ignore: [
        'client/**/*'
      ]
      /**
       * More webpack options will follow - webpack rules, node object properties, plugin definitions, copy rules
       */
    }
  ]
};