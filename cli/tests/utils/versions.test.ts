// Packages
import test from 'ava'

// Ours
import { versions } from '../../src/utils/versions'

test('prints node version', t => {
  t.regex(
    versions(),
    new RegExp(`Node\.js[: ]+${process.version.replace('.', '\\.')}`)
  )
})
