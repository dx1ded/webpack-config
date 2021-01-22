const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

module.exports = {
  target: 'web',
  devtool: isDev ? 'source-map' : false,
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? 'bundle.[hash].js' : 'bundle.js'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: isProd ? 'index.[hash].html' : 'index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets', to: 'assets', noErrorOnMissing: true }
      ]
    }),
    new MiniCSSExtractPlugin({
      filename: isProd ? 'main.[hash].css' : 'main.css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.(jpeg|png|jpg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './',
              useRelativePath: true
            }
          },

          {
            loader: 'webp-loader',
            options: {
              quality: 13
            }
          }
        ]
      }
    ]
  },

  devServer: {
    open: isDev,
    hot: isDev,
    compress: isDev,
    watchContentBase: isDev,
    contentBase: path.resolve(__dirname, 'src/index.html'),
    port: 3000
  }
}
