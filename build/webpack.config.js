const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = parseInt(process.env.PORT) || 9011;

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', './src/entry.js'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: './static/js/[name].chunk.js',
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
  devtool: '#cheap-module-source-map',
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
      {
        test: /\.js(x)?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.js(x)?$/,
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
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: resolve('/static'),
    compress: true,
    port: PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:9010',
        pathRewrite: { '^/api': '' },
      },
    },
    stats: 'minimal',
    overlay: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"',
      ENABLE_API_PROXY: JSON.stringify(true),
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
};
