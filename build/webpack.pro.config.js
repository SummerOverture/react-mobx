const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const commonLazyChunkName = [
  'antd',
  'moment',
  'rc',
];

const webpackProConfig = merge(baseConfig, {
  entry: {
    app: './src/entry.js',
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|dist/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"',
      ENABLE_API_PROXY: false,
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(''),
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'asyncCommon',
      minChunks: ({ resource }, count) => (
        resource &&
        resource.includes('node_modules') &&
        commonLazyChunkName.find((item) => resource.includes(item))) || count >= 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new ExtractTextPlugin({
      filename: 'static/css/style.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('dist'),
      },
    ]),
  ],
});

if (process.env.REPORT) {
  webpackProConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: 8899,
  }));
}

module.exports = webpackProConfig;
