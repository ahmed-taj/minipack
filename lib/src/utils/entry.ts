// Native
import { basename, extname, resolve, dirname } from 'path'

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
      if (fs.statSync(resolve(dir, f)).isFile()) {
        return (basename(f, extname(f)) == name) && (dirname(f) == '.')
      }
      return false
    })
}

/**
 * Generates webpack entries based on directory contents
 * 
 * @param dir 
 * @return {Entry}
 * @private
 */
const makeEntries = (dir: string, fs: FileSystem): Entry => {
  // NOTE: names are case-sensitive
  const names = ['app', 'index', 'style']
  const files = {}
  const entries = {}

  // Our sudo entry loader :)
  const sudo = require.resolve('@glitchbook/sudo-entry')

  // Get entry for each name
  names.forEach(name => {
    files[name] = entry(name, dir, fs)
    if (files[name].length > 1) {
      return new Error(`Multiple ${name}.[ext] entries found in '${dir}' root`)
    }

    // Determine which bundles we need
    if (files[name].length == 1) {
      if (name == 'app') {
        // Just point to the entry file as usual webpack config
        entries[name] = resolve(dir, files['app'].pop())
      } else {
        // Use sudo-entry loader here to generate a suitable code dynamically
        entries[name] = `${sudo}?include[]=${resolve(dir, files[name].pop())}!`
      }
    }
  })

  return entries
}

/**
 * Extract file name from sudo-entry loader string
 * 
 * @param str 
 * @private
 */
const extractName = (str: string) => {
  return str.substring(str.indexOf('?include[]=') + 11, str.length - 1)
}

export { entry, makeEntries, extractName }
