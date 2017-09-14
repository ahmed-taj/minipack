// Packages
import webpack = require('webpack')

// Ours
import { CompilerOptions } from './types/options'
import { merge } from './config'

const core = (options: CompilerOptions): webpack.Compiler => {
  return webpack(merge(options))
}

export { core }
