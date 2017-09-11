// Native
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'
import HTMLWebpackPlugin = require('html-webpack-plugin')

// Ours
import { CompilerOptions } from "../types/options";
import { entry } from '../utils/entry'
import { Base } from './base'

/**
 * Constructs webpack configuration object
 *
 * @param options 
 */
const merge = (options: CompilerOptions): Configuration => {
  // Copy the Base configuration
  const config = Object.assign({}, Base)

  // The base directory (absolute path!) for resolving the entry option
  config.context = options.path

  // Entry module
  config.entry = {
    app: `./${entry('app', config.context, options.fs)}`
  }

  // Output
  config.output.path = resolve(config.context, 'dist')

  // Plugins
  // generate index.html for us
  config.plugins.push(new HTMLWebpackPlugin({
    title: 'Hack | enjoy!'
  }))

  // Let's not waste more time ;)
  return config
}

export { merge }
