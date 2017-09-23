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

test('setup dev server', t => {
  const conf = new Config({
    dev: {
      client: 'myclient',
      url: 'example.com'
    },
    fs: fs([]),
    path: dir
  }).generate()

  // tslint:disable:no-string-literal
  t.is(conf.entry['dev'], 'myclient?example.com')
})
