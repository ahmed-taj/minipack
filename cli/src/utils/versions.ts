// Packages
import { sync as findup } from 'find-up'
import * as webpack from 'webpack'

const webpackPackage = require(findup('package.json', {
  cwd: require.resolve('webpack')
}))
const { version } = require(findup('package.json', { cwd: __dirname }))

/**
 * Determine the app versions(inc. node version)
 * 
 * @return {string} formated version
 */
export const versions = (): string => {
  return (
    `Glitch : v${version}\n` +
    `Webpack: v${webpackPackage.version}\n` +
    `Node.js: ${process.version}`
  )
}
