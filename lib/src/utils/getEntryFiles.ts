// Native
import { basename, dirname, extname, resolve } from 'path'

// Ours
import { FileSystem } from '../types/fs'

/**
 * Lookup suitable entry (name.*) file in a given directory
 * 
 * @param name 
 * @param dir 
 * @param fs 
 * @private
 */
const getEntryFiles = (name: string, dir: string, fs: FileSystem): string[] => {
  // We only care about name.* in the root dir
  return fs.readdirSync(dir).filter(f => {
    if (fs.statSync(resolve(dir, f)).isFile()) {
      return basename(f, extname(f)) === name && dirname(f) === '.'
    }
    return false
  })
}

export { getEntryFiles }
