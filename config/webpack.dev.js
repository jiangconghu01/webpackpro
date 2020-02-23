const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    index: 'proindex.html',
    compress: true,
    hot: true,
    host: 'localhost',
    port: 9000,
    proxy: {
      '/czxt': {
        target: 'http://39.105.122.153:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
