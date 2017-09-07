// Ours
import { FileSystem } from './fs'

interface CompilerOptions {
  // The home directory for webpack (absolute path!)
  path: string

  // The file system to be used for reading
  fs: FileSystem
}

export { CompilerOptions }
