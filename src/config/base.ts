// Packages
import { Configuration } from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const Base: Configuration = {
  // Target environment
  target: "web",

  // Debugging
  devtool: "inline-source-map",

  // Plugins
  plugins: [
    new CleanWebpackPlugin('dist')
  ]
}

export { Base }
