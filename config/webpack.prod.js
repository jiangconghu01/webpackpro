const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const  { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, { 
  mode: 'production',
  devtool:"cheap-module-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({  // 显示进度
      format: chalk.green('Progressing') +  '[:bar]' + chalk.green(':percent') + '(:elapsed seconds)',
      clear: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].style.css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.style\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      canPrint: true
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: 'bundle_analyzer_report.html'
    })
  ]
})
