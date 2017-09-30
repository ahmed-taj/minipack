// Native
import { resolve } from 'path'

// Packages
import { Entry } from 'webpack'

// Ours
import { CompilerOptions } from '../types/options'
import { getEntryFiles } from './getEntryFiles'

/**
 * Generates webpack entries based on directory contents
 * 
 * @param dir 
 * @return {Entry}
 * @private
 */
const makeEntries = (options: CompilerOptions): Entry => {
  // The options we need
  const { path, fs, dev = null } = options

  // NOTE: names are case-sensitive
  const names = ['app', 'index', 'style']
  const files = {}
  const entries = {}

  // Our sudo entry loader :)
  const sudo = require.resolve('@glitchapp/sudo-entry')

  // Get entry for each name
  names.forEach(name => {
    files[name] = getEntryFiles(name, path, fs)
    if (files[name].length > 1) {
      return new Error(`Multiple ${name}.[ext] entries found in '${path}' root`)
    }

    // Determine which bundles we need
    if (files[name].length === 1) {
      // tslint:disable:prefer-conditional-expression
      if (name === 'app') {
        entries[name] = [resolve(path, files[name].pop())]
      } else {
        // Use sudo-entry loader here to generate a suitable code dynamically
        entries[name] = `${sudo}?include[]=${resolve(path, files[name].pop())}!`
      }
    }
  })

  // Setup dev server (if any)
  if (dev) {
    // Where to put dev server string
    const devPoint = 'app'
    // Dev server string
    const devServer = [`${dev.client}?${dev.url}`]

    entries[devPoint] = entries[devPoint]
      ? [...entries[devPoint], ...devServer]
      : devServer
  }

  return entries
}

export { makeEntries }
