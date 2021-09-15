const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {

    historyApiFallback: {
      index: 'index.html',
    },
    proxy: {
      '/api/*': {
        target: 'https://mine-accountbook.herokuapp.com',
        secure: false,
        changeOrigin: true,

      },
    },
  },
};
