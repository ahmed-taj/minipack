// Native 
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'
import CleanWebpackPlugin = require('clean-webpack-plugin')
import HTMLWebpackPlugin = require('html-webpack-plugin')

// Us
import { BUILD_DIR, INDEX_TITLE } from './globals'
import { CSS_RULES } from './support/css'
import { HTML_RULES } from './support/html'
import { JS_RULES } from './support/js'

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
      ...CSS_RULES,
      ...HTML_RULES,
      ...JS_RULES
    ]
  },

  // Plugins
  plugins: [
    // First of all, let's remove the build dir
    new CleanWebpackPlugin(BUILD_DIR, { verbose: false }),

    // generate 'index.html' for us
    new HTMLWebpackPlugin({
      template: resolve(__dirname, '..', 'template', 'index.html'),
      title: INDEX_TITLE
    })
  ],

  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
}

export { Base }
