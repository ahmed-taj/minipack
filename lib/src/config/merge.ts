// Native
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'
import HTMLWebpackPlugin = require('html-webpack-plugin')

// Ours
import { CompilerOptions } from "../types/options";
import { makeEntries } from '../utils/entry'
import { Base } from './base'

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
  config.output.path = resolve(config.context, 'dist')
  config.output.publicPath = options.publicPath || '/assets/'

  // Plugins
  // generate 'index.html' for us
  config.plugins.push(new HTMLWebpackPlugin({
    template: resolve(__dirname, '..', 'template', 'index.html'),
    title: 'Glitch Book | enjoy!'
  }))

  // Let's not waste more time ;)
  return config
}

export { merge }
