// Ours
import { FileSystem } from './fs'

interface CompilerOptions {
  // The home directory for webpack (absolute path!)
  path: string

  fs: FileSystem
}

export { CompilerOptions }
