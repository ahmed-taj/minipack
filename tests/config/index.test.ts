// Packages
import test from 'ava'

// Ours
import config from "../../src/config";

test('Configuration', (t) => {
  const conf = config(__dirname)
  t.is(conf.context, __dirname)
})
