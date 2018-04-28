import path from 'path';

import pkg from '../../package.json';

const isDebug = !process.argv.includes('--release');

const isVerbose = process.argv.includes('--verbose');

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------
//
// path.resolve() paths should be relative to this dir

export default {
  context: path.resolve(__dirname, '../..'),

  output: {
    path: path.resolve(__dirname, '../../build/public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../../src'),
        ],
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            ['env', {
              targets: {
                browsers: pkg.browserslist,
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }],
            // Experimental ECMAScript proposals
            // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            'stage-2',
            // JSX, Flow
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            'react',
            // Optimize React code for the production build
            // https://github.com/thejameskyle/babel-react-optimize
            ...isDebug ? [] : ['react-optimize'],
          ],
          plugins: [
            // Adds component stack to warning messages
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
            ...isDebug ? ['transform-react-jsx-source'] : [],
            // Adds __self attribute to JSX which React will use for some warnings
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
            ...isDebug ? ['transform-react-jsx-self'] : [],
          ],
        },
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
              discardComments: { removeAll: true },
            },
          },
        ],
      },
      {
        test: /theme.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${isDebug ? 'sourceMap&' : 'minimize&'}modules&localIdentName=[local]&importLoaders=2`,
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: [/theme.scss$/],
        use: [
          'isomorphic-style-loader',
          `css-loader?${isDebug ? 'sourceMap&' : 'minimize&'}modules&localIdentName=
          ${isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'}&importLoaders=2`,
          'sass-loader',
        ],
      },
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, '../lib/markdown-loader.js'),
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          limit: 10000,
        },
      },
    ],
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
};
