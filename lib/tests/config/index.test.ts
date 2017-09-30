// Packages
import test from 'ava'

// Ours
import { Config } from '../../src/config'
import { dir, fs } from '../helpers'

test('Configuration', t => {
  const conf = new Config({
    fs: fs([]),
    path: dir
  }).generate()

  t.is(conf.context, dir)
})
