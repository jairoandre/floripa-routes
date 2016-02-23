const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const ENV = require('./env');

console.log('Building [ENV=', ENV, ']');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'www'),
};

process.env.BABEL_ENV = ENV;

const common = {
  devtool: 'eval-source-map',
  entry: PATHS.app,
    output: {
        path: PATHS.build,
        filename: "bundle.js"
    },
  module: {
    loaders: [
    {
      test: /\.js?$/,
      loader: 'react-hot!babel',
      exclude: /node_modules/,
    },
    {
      test: /\.css?$/,
      loader: 'style!css?modules!postcss'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};

if (ENV === 'development') {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,
      colors: true,
      historyApiFallback: true,
      inline: true,
      host: process.env.HOST,
      port: process.env.PORT,
    }
  });
} else {
  module.exports = merge(common, {});
}