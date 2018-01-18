var path = require('path')
var Webpack = require('webpack')
var baseConfig = require('./webpack.base')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, 'examples'),
    publicPath: '/'
  },

  resolve: {
    alias: {
      'verso': path.resolve(__dirname, '../src')
    }
  },

  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: `css/[name].css`
    })
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                loaders: 1
              }
            }
          ]
        })
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'examples'),
    publicPath: '/',
    port: 4000,
    quiet: false,
    noInfo: false
  }
})
