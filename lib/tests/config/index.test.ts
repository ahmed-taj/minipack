// Packages
import test from 'ava'

// Ours
import { Config } from '../../src/config'
import { FakeFileSystem } from '../helpers'

test('Configuration', t => {
  const conf = new Config({
    fs: new FakeFileSystem('/fake/dir', [['app.js', true]]),
    path: __dirname
  }).generate()

  t.is(conf.context, __dirname)
})
