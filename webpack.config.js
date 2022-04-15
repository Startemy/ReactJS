const path = require('path');
const Html = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    extensions: ['.jsx', '.js'],
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCss.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              limit: 8192,
              outputPath: 'img',
              esModule: false,
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new Html({
      template: './public/index.html'
    }),
    new MiniCss({
      attributes: {
        filename: 'style.css'
      },

    }),
  ],
}