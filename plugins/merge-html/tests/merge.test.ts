// Packages
import test from 'ava'

// Ours
import { merge } from '../src/merge'

test('replaces target <body> with given string', t => {
  const target = '<body></body>'
  t.is(merge('hello', target), '<body>hello</body>')
})
