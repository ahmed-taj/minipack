// Packages
import { sync as findup } from 'find-up'

// Ours
const { version } = require(findup('package.json'))

/**
 * Determine the app versions(inc. node version)
 * 
 * @return {string} formated version
 */
export const versions = (): string => {
  return `Glitch book: v${version}\n` + `Node.js    : ${process.version}`
}
