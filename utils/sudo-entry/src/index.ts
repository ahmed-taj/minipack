// Packages
import { getOptions, stringifyRequest } from 'loader-utils'

/**
 * A webpack loader that generates an entry by requiring the given resources. 
 * Useful when your entry isn't a JavaScript module.
 */
function sudoEntry() {
  // which files to include?
  let { include } = Object.assign({ include: [] }, getOptions(this))

  // Make sure it's an array
  include = Array.isArray(include) ? include : [include]

  // let's require them. That's all!
  return include.map(f => `require(${stringifyRequest(this, f)});`).join('\n')
}

module.exports = sudoEntry
