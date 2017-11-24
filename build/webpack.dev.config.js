const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const PORT = parseInt(process.env.PORT) || 9011;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackDevConfig = merge.smart(baseConfig, {
  entry: {
    app: ['react-hot-loader/patch', './src/entry.js'],
  },
  output: {
    filename: './static/js/[name].js',
    chunkFilename: './static/js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?modules', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true,
    },
    contentBase: resolve('/static'),
    compress: true,
    port: PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:9010',
        pathRewrite: { '^/api': '' },
      },
    },
    open: true,
    stats: 'minimal',
    overlay: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"',
      ENABLE_API_PROXY: true,
    }),
    new HtmlWebpackPlugin({
      template: resolve('src/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

module.exports = webpackDevConfig;
