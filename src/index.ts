// Packages
import webpack = require('webpack')

// Ours
import { merge, CompilerOptions } from './config'

const core = (options: CompilerOptions): webpack.Compiler => {
  return webpack(merge(options))
}

export { core }
