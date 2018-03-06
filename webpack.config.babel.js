import 'babel-polyfill';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import WatchLiveReloadPlugin from 'webpack-watch-livereload-plugin';

import config from './config';

const buildEnv = process.env.BUILD_ENV || 'development';
const release = process.env.RELEASE || false;

const cwd = process.cwd();
const themesDir = `${ cwd }/src/themes`;

/**
 * This webpack configuration is designed to not be changed directly - customisations should be done on a per theme basis from config.js
 * Of course, you can mess around in here if you know what you're doing - don't let me stop you. However if you are pulling updates to future versions of this code
 * then you may end up with nasty conflicts
 */

/* build out dir depends on whether we're building for the local WP or building for a release */

let buildDir = release ? `${ cwd }/release` : `${ cwd }/build/wp-content/themes`; 

const webpackConfig = [];

/* set up the global defaults */

let uglifyOpts;

switch(buildEnv) {
  case 'production':
    uglifyOpts = {
      sourceMap: false,
      warningsFilter: true,
      uglifyOptions: {
        compress: {
          unused: true,
          dead_code: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          drop_console: true // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        },
        warnings: false
      }
    };
    break;
  case 'development':
    uglifyOpts = {
      sourceMap: false,
      warningsFilter: false,
      uglifyOptions: {
        warnings: true
      }
    };
    break;
}

const themes = config.themes;

themes.map((theme) => {
  /* prepare the theme config details */
  const name = theme.name;
  const entry = theme.entry;
  const vendor = theme.vendor;
  const sass = theme.sass;
  const ignore = theme.ignore;

  /* output path */

  const outputPath = `${ buildDir }/${ name }/bundled`;

  const contentBase = `${ name }/bundled`;

  /* manifest additions */

  const assets = {
    env: buildEnv,
    webpack: `http://localhost:5000/${ name }`
  };

  /* configure plugins */

  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin(uglifyOpts),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(buildEnv)
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: '.eslintrc.js',
          failOnError: true
        }
      }
    }),
    new CopyWebpackPlugin([
      { 
        from: `${ themesDir }/${ name }`, 
        to: `${ buildDir }/${ name }`,
        ignore
      }
    ]),
    new WriteFilePlugin({
      test: /^((?!hot-update).)*$/
    }),
    new WebpackAssetsManifest({
      assets,
      output: `${ buildDir }/${ name }/manifest.json`,
      writeToDisk: true
    })  
  ];

  if(buildEnv == 'development') {
    plugins.push(
      new WatchLiveReloadPlugin({
        files: [
          './build/wp-content/themes/**/*.css',
          './build/wp-content/themes/**/*.php'
        ]
      })
    );
  }

  /* generate the webpack config item */

  const entryConfig = {
    name: `entry-${ name }-client`,
    entry: {
      app: `${ themesDir }/${ name }/${ entry }`,
      vendor
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      publicPath: contentBase
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ['babel-loader?' + JSON.stringify({
            presets: [[ 'env', { modules: false } ], 'stage-0'],
            plugins: [
              [
                'transform-runtime',
                {
                    helpers: false,
                    polyfill: false,
                    regenerator: true
                }
              ],
              'transform-es2015-destructuring',
              'transform-object-rest-spread',
              'transform-async-to-generator',
              'transform-decorators-legacy'
            ]
          })]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      hotOnly: true,
      inline: true,
      contentBase: contentBase,
      headers: { 
        'Access-Control-Allow-Origin': '*'
      }
    },
    mode: buildEnv,
    node: {fs: 'empty'},
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            enforce: true
          }
        }
      }
    },  
    plugins
  };

  const sassConfig = {
    name: `entry-${ name }-sass`,
    entry: {
      main: `${ themesDir }/${ name }/${ sass }`
    },
    output: {
      path: outputPath,
      filename: '[name].css',
      publicPath: contentBase
    },
    mode: buildEnv,
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(['css-loader?-url', 'postcss-loader', 'sass-loader'])
        }
      ]
    },
    node: {fs: 'empty'},
    plugins: [
      new ExtractTextPlugin({
        allChunks: true,
        filename: '[name].css'
      }),
      new WriteFilePlugin({
        test: /^((?!hot-update).)*$/
      }),
      /* write out the manifest so we know which css/js we are working with */
      new WebpackAssetsManifest({
        assets,
        output: `${ buildDir }/${ name }/manifest.json`,
        writeToDisk: true
      })    
    ]
  };

  /* push to the array */

  webpackConfig.push(entryConfig);
  webpackConfig.push(sassConfig);

});

module.exports = webpackConfig;