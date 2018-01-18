var fs = require('fs')
var path = require('path')
var merge = require('webpack-merge')
var Webpack = require('webpack')
var baseConfig = require('./webpack.examples.base')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1)

var examples = fs
  .readdirSync(path.resolve(__dirname, '../examples'))
  .filter(name =>
    fs.lstatSync(path.resolve(__dirname, `../examples/${name}`)).isDirectory()
  )

module.exports = examples.map((name, i) =>
  merge(baseConfig, {
    context: path.resolve(__dirname, `../examples/${name}`),
    entry: './index.js',
    output: {
      filename: `${name}.js`
    },
    plugins: [
      new Webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new HtmlWebpackPlugin({
        inject: true,
        allChunks: true,
        title: `${capitalize(name)} Example`,
        template: path.resolve(__dirname, '../examples/example.html.ejs'),
        filename: `${name}.html`
      })
    ].concat(
      i == 0
        ? [
            new HtmlWebpackPlugin({
              chunks: [],
              inject: false,
              examples: examples,
              template: '../index.html.ejs',
              filename: `index.html`
            })
          ]
        : []
    ),
    devServer: {
      historyApiFallback: {
        rewrites: examples.map(name => ({
          from: new RegExp('^/' + name + '/'),
          to: `/${name}.html`
        }))
      }
    }
  })
)
