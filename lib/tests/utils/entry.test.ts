// Packages
import test from 'ava'

// Ours
import { entry } from '../../src/utils/entry'
import { FakeFileSystem, FakeEntry } from '../helpers'

// Helpers 
const name = 'app'
const dir = '/fake/dir'
const fs = list => new FakeFileSystem(dir, list)
const mapTrue = list => list.map(e => [e, true])
const mapFalse = list => list.map(e => [e, false])

test("returns only an entry that matches 'name.*'", (t) => {
  t.is(entry(name, dir, fs(mapTrue(
    ['app.ts', 'appp.ts', '.app.ts', 'src/app.ts', '../app.ts']
  ))), 'app.ts')
})

test("throws when no entry found", (t) => {
  // Empty dir
  t.throws(() => entry(name, dir, fs([])), /No bundle entry/)

  // No files
  t.throws(() => entry(name, dir, fs(mapFalse(
    ['app', 'app.ts', 'app.js', '.app']
  ))), /No bundle entry/)
})

test("throws when multiple entries found", (t) => {
  t.throws(() => entry(name, dir, fs(mapTrue(
    ['app', 'app.ts']
  ))), /Multiple bundle/)
})
