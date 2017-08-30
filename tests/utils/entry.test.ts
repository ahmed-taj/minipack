// Packages
import test from 'ava'

// Ours
import { FileSystem, entry } from '../../src/utils/entry'

test("returns only an entry that matches 'app.*'", (t) => {
  const fs = { readdirSync: dir => files }

  let files = ['app.ts', 'appp.ts', '.app.ts']
  t.is(entry('/fake/dir', fs), 'app.ts')
})

test("throws when no entry found", (t) => {
  const fs = { readdirSync: dir => files }

  let files = []
  t.throws(() => {
    entry('/fake/dir', fs)
  }, /No bundle entry/)
})

test("throws when multiple entries found", (t) => {
  const fs = { readdirSync: dir => files }

  let files = ['app', 'app.ts']
  t.throws(() => {
    entry('/fake/dir', fs)
  }, /Multiple bundle/)
})
