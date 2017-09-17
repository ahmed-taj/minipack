// Native
import { basename, extname, join, dirname } from 'path'

// Packages
import { Entry } from 'webpack'

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
const entry = (name: string, dir: string, fs: FileSystem): string[] => {
  // We only care about name.* in the root dir
  return fs.readdirSync(dir)
    .filter(f => {
      if (fs.statSync(join(dir, f)).isFile()) {
        return (basename(f, extname(f)) == name) && (dirname(f) == '.')
      }
      return false
    })
}

/**
 * Generates webpack entries based on directory contents
 * 
 * Scenarios:
 * 1. `app.[ext]`   => glitch entry only
 * 2. `index.[ext]` => assets entry only
 * 3. `style.[ext]` => assets entry only
 * 
 * 4. `index.[ext]` + `style.[ext]` => assets entry only
 * 5. `app.[ext]` + `index.[ext]`   => glitch + assets entries
 * 6. `app.[ext]` + `style.[ext]`   => glitch + assets entries
 * 
 * 7. `app.[ext]` + `index.[ext]` + `style.[ext]` => glitch + assets entries
 * 8. none => none
 * 
 * @param dir 
 * @return {Entry}
 * @private
 */
const makeEntries = (dir: string, fs: FileSystem): Entry => {
  // NOTE: names are case-sensitive
  const names = ['app', 'index', 'style']
  const files = {}

  // Get entry for each name
  names.forEach(name => {
    files[name] = entry(name, dir, fs)
    if (files[name].length > 1) {
      return new Error(`Multiple ${name}.[ext] entries found in '${dir}' root`)
    }
  })

  const entries = {}
  // Do we need `glitch` bundle?
  if (files['app'].length == 1) {
    entries['glitch'] = `./${files['app'].pop()}`
  }
  // eg: ('a','b') => 'include[]=./a,include[]=./b'
  const query = files['index']
    .concat(files['style'])
    .map(f => `include[]=./${f}`)
    .join(',')

  if (query) {
    // Use sudo-entry loader to generate an entry code
    entries['static'] = `${require.resolve('@glitchbook/sudo-entry')}?${query}!`
  }
  return entries
}

export { makeEntries, entry }
