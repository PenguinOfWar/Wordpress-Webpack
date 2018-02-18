import 'babel-polyfill';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';

import config from './config';

const buildEnv = process.env.BUILD_ENV || 'development';
const release = process.env.RELEASE || false;

const cwd = process.cwd();
const themesDir = `${ cwd }/src/themes`;

/* build out dir depends on whether we're building for the local WP or building for a release */

let buildDir = release ? `${ cwd }/release` : `${ cwd }/build/wp-content/themes`; 

const webpackConfig = [];

/* set up the global defaults */

let sourceMapConfig;
let uglifyOpts;

switch(buildEnv) {
  case 'production':
    sourceMapConfig = 'source-map';
    uglifyOpts = {
      comments: false,
      minimize: true,
      warningsFilter: true,
      compress: {
        dead_code: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        warnings: false,
        drop_console: true // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers,
      }
    };
    break;
  case 'development':
    sourceMapConfig = 'eval';
    uglifyOpts = {
      minimize: false,
      warningsFilter: true,
      compress: {
        screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        warnings: false
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

  /* generate the webpack config item */

  const entryConfig = {
    name: `entry-${ name }-client`,
    devtool: sourceMapConfig,
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
      inline: true,
      contentBase: contentBase,
      headers: { 
        'Access-Control-Allow-Origin': '*'
      }
    },
    node: {fs: 'empty'},
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new UglifyJsPlugin(uglifyOpts),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(buildEnv)
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename:  'vendor.js'
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
      })
    ]
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
        filename: '[name].css'
      }),
      new WriteFilePlugin({
        test: /^((?!hot-update).)*$/
      })
    ]
  };

  /* push to the array */

  webpackConfig.push(entryConfig);
  webpackConfig.push(sassConfig);

});

module.exports = webpackConfig;