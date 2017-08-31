// Packages
import test from 'ava'

// Ours
import { entry } from '../../src/utils/entry'
import { FakeFileSystem, FakeEntry } from '../helpers'

// Helpers 
const dir = '/fake/dir'
const fs = list => new FakeFileSystem(dir, list)
const mapTrue = list => list.map(e => [e, true])
const mapFalse = list => list.map(e => [e, false])

test("returns only an entry that matches 'app.*'", (t) => {
  const files: FakeEntry[] = mapTrue(['app.ts', 'appp.ts', '.app.ts'])
  t.is(entry(dir, fs(files)), 'app.ts')
})

test("throws when no entry found", (t) => {
  let files: FakeEntry[] = []
  t.throws(() => entry(dir, fs(files)), /No bundle entry/)

  // Not files!
  files = mapFalse(['app', 'app.ts', 'app.js', '.app'])
  t.throws(() => entry(dir, fs(files)), /No bundle entry/)
})

test("throws when multiple entries found", (t) => {
  const files: FakeEntry[] = mapTrue(['app', 'app.ts'])
  t.throws(() => entry(dir, fs(files)), /Multiple bundle/)
})
