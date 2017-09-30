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
 * @return {string[]}
 * @private
 */
const makeEntries = ({ path, fs, dev = null }: CompilerOptions): string[] => {
  // NOTE: names are case-sensitive
  const entries = []

  // Our sudo entry loader :)
  const sudo = require.resolve('@glitchapp/sudo-entry')

  // Setup dev server (if enabled)
  if (dev) {
    entries.push(`${dev.client}?${dev.url}`)
  }

  // NOTE: file names are case-sensitive
  for (const name of ['app', 'index', 'style']) {
    const files = getEntryFiles(name, path, fs)
    if (files.length > 1) {
      throw new Error(`Multiple ${name}.[ext] entries found in '${path}' root`)
    }

    // Add chunk files
    if (files.length === 1) {
      const file =
        name === 'app'
          ? resolve(path, files.pop())
          : `${sudo}?include[]=${resolve(path, files.pop())}!`

      entries.push(file)
    }
  }

  return entries
}

export { makeEntries }
