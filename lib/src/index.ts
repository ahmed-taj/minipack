// Packages
import webpack = require('webpack')

// Ours
import { Config } from './config'
import { CompilerOptions } from './types/options'

/**
 * Generates a suitable webpack configuration object internally based on the 
 * given compiler options (`options`).
 * 
 * @example
 * 
 * const compiler = prepare({
 *    path: 'path/to/project/dir',
 *    fs: require('fs')
 * })
 * 
 * compiler.run((err, stats) => {
 *    // ...
 * })
 * 
 * @param {CompilerOptions} options 
 * @return {webpack.Compiler} instance
 */
const prepare = (options: CompilerOptions): webpack.Compiler => {
  return webpack(new Config(options).generate())
}

export { prepare }
