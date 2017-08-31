// Packages
import test from 'ava'

// Ours
import { merge } from "../../src/config";
import { FakeFileSystem } from '../helpers'

test('Configuration', (t) => {
  const conf = merge({
    path: __dirname,
    fs: new FakeFileSystem('/fake/dir', [['app.js', true]])
  })
  t.is(conf.context, __dirname)
})
