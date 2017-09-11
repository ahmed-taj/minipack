// Packages
import { Configuration } from 'webpack'
import CleanWebpackPlugin = require('clean-webpack-plugin')

const Base: Configuration = {
  // Target environment
  target: "web",

  // Debugging
  devtool: "inline-source-map",

  // Output
  output: {
    filename: '[name].[chunkhash].js'
  },

  // Rules
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        loader: require.resolve('css-loader')
      },
      // Support ES6 (and beyond) using Babel
      {
        test: /\.(js|jsx|es)$/,
        loader: require.resolve('babel-loader'),
        exclude: /(node_modules|bower_components)/,
        options: {
          babelrc: false,
          presets: [
            require.resolve('babel-preset-env'),
            require.resolve('babel-preset-react')
          ],
          // Enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true
        }
      }
    ]
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin('dist')
  ]
}

export { Base }
