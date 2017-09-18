// Native
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'
import ExtractTextPlugin = require('extract-text-webpack-plugin')

// Ours
import { CompilerOptions } from "../types/options";
import { makeEntries, entry } from '../utils/entry'
import { Base } from './base'
import { BUILD_DIR, DEFAULT_PUBLIC_PATH } from './globals'

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

  // Entry module(s)
  config.entry = makeEntries(config.context, options.fs)

  // Output
  config.output.path = resolve(config.context, BUILD_DIR)
  config.output.publicPath = options.publicPath || DEFAULT_PUBLIC_PATH

  // Extract index.[ext] rule
  const index = entry('index', config.context, options.fs)
  if (index.length == 1) {
    config.module['rules'].unshift({
      test: resolve(config.context, index.pop()),
      use: ExtractTextPlugin.extract({
        use: [require.resolve('html-loader')]
      })
    })
  }

  // Let's not waste more time ;)
  return config
}

export { merge }
