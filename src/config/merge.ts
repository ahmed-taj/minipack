// Packages
import { Configuration } from 'webpack'

// Ours
import { CompilerOptions } from "./options";

/**
 * Constructs webpack configuration object
 *
 * @param options 
 */
const merge = (options: CompilerOptions): Configuration => {
  return {
    context: options.path
  }
}

export { merge }
