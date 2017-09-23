// Ours
import { FileSystem } from './fs'

interface CompilerOptions {
  // The home directory for webpack (absolute path!)
  path: string

  // The file system to be used for reading
  fs: FileSystem

  // Public path
  publicPath?: string

  // Dev server config
  dev?: {
    client: string
    url: string
  }
}

export { CompilerOptions }
