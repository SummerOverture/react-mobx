const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/entry.js',
    vendor: ['babel-polyfill', 'react-dom', 'react-router', 'mobx'],
  },
  output: {
    filename: './static/js/[name].[chunkhash].js',
    chunkFilename: './static/js/[chunkhash].js',
    path: resolve('/dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      STYLE: resolve('src/style'),
      CONSTANTS: resolve('constants'),
    },
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|dist/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader'],
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|dist/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve(''),
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // Specify the common bundle's name.
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor', 'common'],
    }),
    new ExtractTextPlugin('static/css/styles.css'),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('dist'),
      },
    ]),
    process.env.REPORT ? new BundleAnalyzerPlugin({
      analyzerPort: 8899,
    }) : '',
  ],
};
