// Packages
import test from 'ava'

// Ours
import { extractName } from '../../src/utils/entry'

test('extracts the path correctly', t => {
  t.is(
    extractName('sudo-entry?include[]=/path/to/app/folder/index.html!'),
    '/path/to/app/folder/index.html'
  )
})
