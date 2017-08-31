// Packages
import { Configuration } from 'webpack'

// Ours
import { CompilerOptions } from "./options";
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

  return config
}

export { merge }
