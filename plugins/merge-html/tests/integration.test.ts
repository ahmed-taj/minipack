// Native
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

// Packages
import webpack = require('webpack')
import HTMLWebpackPlugin = require('html-webpack-plugin')
import CopyWebpackPlugin = require('copy-webpack-plugin')
import test from 'ava'

// Us
import { MergeHTMLPlugin } from '../src'

const webpackAsync = promisify(webpack)

const testCases = readdirSync(join(__dirname, 'integration'))

testCases.filter(tc => {

  test(tc, async t => {

    const testDir = join(__dirname, 'integration', tc)
    const expectDir = join(testDir, 'expected')
    const outDir = join(__dirname, 'actual', tc)
    const config = require(join(testDir, 'webpack.config.js'))

    // webpack options
    config.plugins = [
      new CopyWebpackPlugin([
        { from: join(testDir, 'index.html'), to: 'user.html' }
      ]),
      new HTMLWebpackPlugin({
        inject: false
      }),
      new MergeHTMLPlugin('user.html')
    ]
    config.context = testDir
    config.output.path = outDir

    // Bundle with webpack
    let stats = await webpackAsync(config)
    if (stats['hasErrors']()) {
      throw new Error(stats.toString())
    }

    // Assert output
    const indexExpected = readFileSync(join(expectDir, 'index.html'), 'utf-8')
      .trim()
    const indexActual = readFileSync(join(outDir, 'index.html'), 'utf-8')
      .trim()
    t.is(indexExpected, indexActual)
  })
})
