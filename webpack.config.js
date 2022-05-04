const path = require('path');
const Html = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './build'),
  },

  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    alias: {
      images: path.resolve(__dirname, 'src/asset/resource/images'),
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },

  devtool: 'eval-source-map',

  devServer: {
    compress: true,
    port: 8080,
    client: {
      logging: 'info',
    },
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
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
        test: /\.(png|svg|jpg|jpeg|gif)$/,
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
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      },

    }),
  ],
}