// Native
import fs = require('fs')
import path = require('path')
import { promisify } from 'util'

// Packages
import webpack = require('webpack')
import test from 'ava'

const webpackAsync = promisify(webpack)

const testCases = fs.readdirSync(path.join(__dirname, 'cases'))

testCases.filter(tc => {

  test(tc, async t => {

    const testDir = path.join(__dirname, 'cases', tc)
    const expectDir = path.join(testDir, 'expected')
    const outDir = path.join(__dirname, 'actual', tc)
    const config = require(path.join(testDir, 'webpack.config.js'))

    // webpack options
    config.context = testDir
    config.output.path = outDir

    // Bundle with webpack
    let stats = await webpackAsync(config)
    if (stats['hasErrors']()) {
      throw new Error(stats.toString())
    }

    // Assert output
    // We ignore .gitkeep files because we only add them to make sure they get
    // committed even if they are empty
    const expected = fs.readdirSync(expectDir).filter(f => f != '.gitkeep')
    const actual = fs.readdirSync(outDir)
    t.deepEqual(expected, actual)
  })
})

