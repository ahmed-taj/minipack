// Native
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'
import HTMLWebpackPlugin = require('html-webpack-plugin')

// Ours
import { CompilerOptions } from "../types/options";
import { makeEntries } from '../utils/entry'
import { Base } from './base'
import { BUILD_DIR, DEFAULT_PUBLIC_PATH, INDEX_TITLE } from './globals'

/**
 * Constructs webpack configuration object
 *
 * @param options 
 * @private
 */
const merge = (options: CompilerOptions): Configuration => {
  // Copy the Base configuration
  const config = Object.assign({}, Base)

  // The base directory (absolute path!) for resolving the entry option
  config.context = options.path

  // Entry module
  config.entry = makeEntries(config.context, options.fs)

  // Output
  config.output.path = resolve(config.context, BUILD_DIR)
  config.output.publicPath = options.publicPath || DEFAULT_PUBLIC_PATH

  // Plugins
  config.plugins.concat([
    // generate 'index.html' for us
    new HTMLWebpackPlugin({
      template: resolve(__dirname, '..', 'template', 'index.html'),
      title: INDEX_TITLE
    })
  ])

  // Let's not waste more time ;)
  return config
}

export { merge }
