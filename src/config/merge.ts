// Native
import { resolve } from 'path'

// Packages
import { Configuration } from 'webpack'

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
    app: `./${entry(config.context, options.fs)}`
  }

  // Output
  config.output.path = resolve(config.context, 'dist')

  return config
}

export { merge }
