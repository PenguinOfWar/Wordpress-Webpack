import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import WatchLiveReloadPlugin from 'webpack-watch-livereload-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import config from './config';

const buildEnv = process.env.BUILD_ENV || 'development';
const isDevelopment = buildEnv === 'development';
const release = process.env.RELEASE || false;

const cwd = process.cwd();
const themesDir = `${cwd}/src/themes`;

/**
 * This webpack configuration is designed to not be changed directly -
 * customisations should be done on a per theme basis from config.js
 * Of course, you can mess around in here if you know what you're doing -
 * don't let me stop you. However if you are pulling updates to future
 * versions of this code then you may end up with nasty conflicts
 */

/**
 * build out dir depends on whether we're building
 * for the local WP or building for a release
 */

const buildDir = release ? `${cwd}/release` : `${cwd}/build/wp-content/themes`;

let webpackConfig = [];

/**
 * set up the global defaults
 */

const uglifyOpts = isDevelopment
  ? {
      sourceMap: false,
      uglifyOptions: {
        warnings: false
      }
    }
  : {
      sourceMap: false,
      uglifyOptions: {
        compress: {
          unused: true,
          dead_code: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          drop_console: true // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        },
        warnings: false
      }
    };

const themes = config.themes;

themes.map((theme = {}) => {
  /* prepare the theme config details */
  const name = theme.name;
  const entry = theme.entry;
  const vendor = theme.vendor;
  const sass = theme.sass;
  const ignore = theme.ignore;

  /* output path */

  const outputPath = `${buildDir}/${name}/bundled`;

  const contentBase = `${name}/bundled`;

  /* manifest additions */

  const assets = {
    env: buildEnv,
    webpack: `http://localhost:5000/${name}`
  };

  /* configure plugins */

  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin(uglifyOpts),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(buildEnv)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: '.eslintrc.js',
          failOnError: true
        }
      }
    }),
    new CopyPlugin([
      {
        from: `${themesDir}/${name}`,
        to: `${buildDir}/${name}`,
        ignore
      }
    ]),
    new WriteFilePlugin({
      test: /^((?!hot-update).)*$/
    }),
    new WebpackAssetsManifest({
      assets,
      output: `${buildDir}/${name}/manifest.json`,
      writeToDisk: true
    })
  ];

  if (buildEnv === 'development') {
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
    name: `entry-${name}-client`,
    entry: {
      app: `${themesDir}/${name}/${entry}`,
      vendor
    },
    output: {
      path: outputPath,
      filename: '[name].[hash:7].js',
      publicPath: contentBase
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.scss']
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
    node: { fs: 'empty' },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
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
    name: `entry-${name}-sass`,
    entry: {
      main: `${themesDir}/${name}/${sass}`
    },
    output: {
      path: outputPath,
      publicPath: contentBase
    },
    mode: buildEnv,
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          loader: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        }
      ]
    },
    node: { fs: 'empty' },
    plugins: [
      new MiniCssExtractPlugin({
        allChunks: true,
        filename: '[name].[hash:7].css'
      }),
      new WriteFilePlugin({
        test: /^((?!hot-update).)*$/
      }),
      /* write out the manifest so we know which css/js we are working with */
      new WebpackAssetsManifest({
        assets,
        output: `${buildDir}/${name}/manifest.json`,
        writeToDisk: true
      })
    ]
  };

  /* push to the array */

  webpackConfig.push(entryConfig);
  webpackConfig.push(sassConfig);

  return true;
});

export default webpackConfig;
