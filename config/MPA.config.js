const glob = require('glob')
const path = require('path')
const entryFile = glob.sync(path.join(__dirname,'../src/*.js'))

const HtmlWebpackPlugin=require('html-webpack-plugin');

const entry = {}
const htmlWebpackPlugins = []
entryFile.forEach(file => {
  const filename = path.basename(file.split('/').pop(), '.js')
  entry[filename] = [file],
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      title: filename,
      chunks:['vendors','commons',filename],
      template: path.resolve(__dirname,`../template/${filename}.html`),
      filename: `${filename}.html`
    })
  )
})
console.log(entry)
module.exports = {
  entry,
  plugins:htmlWebpackPlugins
}
