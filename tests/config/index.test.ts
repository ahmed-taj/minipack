// Packages
import test from 'ava'

// Ours
import { merge } from "../../src/config";

test('Configuration', (t) => {
  const conf = merge({ path: __dirname })
  t.is(conf.context, __dirname)
})
