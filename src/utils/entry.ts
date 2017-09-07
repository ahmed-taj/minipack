// Native
import { basename, extname, join } from 'path'

// Ours
import { FileSystem } from '../types/fs'

/**
 * Lookup suitable entry (name.*) file in a given directory
 * 
 * @param name 
 * @param dir 
 * @param fs 
 */
const entry = (name: string, dir: string, fs: FileSystem): string => {
  // We only care about name.*
  const list = fs.readdirSync(dir)
    .filter(f => {
      if (fs.statSync(join(dir, f)).isFile()) {
        return basename(f, extname(f)) == name
      }
      return false
    })

  // We don't support multiple entries
  if (list.length > 1) {
    throw new Error(`Multiple bundle enteries [${list}]`)
  }
  // And we need have an entry
  if (list.length == 0) {
    throw new Error(`No bundle entry found in "${dir}"`)
  }

  return list.pop()
}

export { entry }
