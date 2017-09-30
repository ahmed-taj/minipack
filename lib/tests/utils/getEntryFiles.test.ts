// Packages
import test from 'ava'

// Ours
import { getEntryFiles } from '../../src/utils/entry'
import { dir, fs, mapFalse, mapTrue } from '../helpers'

const name = 'app'

test("returns only an entry that matches 'name.*'", t => {
  t.deepEqual(
    getEntryFiles(
      name,
      dir,
      fs(mapTrue(['app.ts', 'appp.ts', '.app.ts', 'src/app.ts', '../app.ts']))
    ),
    ['app.ts']
  )
})

test('returns empty array when no entry found', t => {
  // Empty dir
  t.deepEqual(getEntryFiles(name, dir, fs([])), [])

  // No files
  t.deepEqual(
    getEntryFiles(name, dir, fs(mapFalse(['app', 'app.ts', 'app.js', '.app']))),
    []
  )
})

test('returns a list when multiple entries found', t => {
  t.deepEqual(getEntryFiles(name, dir, fs(mapTrue(['app', 'app.ts']))), [
    'app',
    'app.ts'
  ])
})
