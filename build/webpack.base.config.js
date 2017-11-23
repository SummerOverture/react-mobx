const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  output: {
    filename: './static/js/[name].[chunkhash].js',
    chunkFilename: './static/js/[name].[chunkhash].js',
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
  module: {
    rules: [
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
};
