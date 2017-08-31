// Packages
import { Configuration } from 'webpack'
import CleanWebpackPlugin = require('clean-webpack-plugin')

const Base: Configuration = {
  // Target environment
  target: "web",

  // Debugging
  devtool: "inline-source-map",

  // Rules
  module: {
    rules: [
      // CSS
      { test: /\.css$/, loader: 'css-loader' }
    ]
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin('dist')
  ]
}

export { Base }
