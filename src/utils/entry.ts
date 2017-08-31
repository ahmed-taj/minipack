// Native
import { basename, extname, join } from 'path'

/**
 * General File System interface
 */
export interface FileSystem {
  readdirSync: (dir: string) => string[]

  statSync(path: string): {
    isFile: () => boolean
  }
}

/**
 * Lookup suitable entry (app.*) file in a given directory
 * 
 * @param dir 
 * @param fs 
 */
const entry = (dir: string, fs: FileSystem): string => {
  // We only care about app.*
  const list = fs.readdirSync(dir)
    .filter(f => {
      if (fs.statSync(join(dir, f)).isFile()) {
        return basename(f, extname(f)) == 'app'
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
