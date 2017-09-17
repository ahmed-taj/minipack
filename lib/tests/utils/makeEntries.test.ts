// Packages
import test from 'ava'

// Ours
import { makeEntries } from '../../src/utils/entry'
import { dir, fs, mapFalse, mapTrue } from './helpers'

test('makes nothing when no entries', t => {
  t.deepEqual(makeEntries(dir, fs(mapTrue([]))), {})
})

test('makes both `glitch` & `static` when possible', t => {
  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['app.ext', 'index.ext']
  )))), ['glitch', 'static'])

  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['app.ext', 'style.ext']
  )))), ['glitch', 'static'])

  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['app.ext', 'index.ext', 'style.ext']
  )))), ['glitch', 'static'])
})

test('does not make `static` entry when no statics', t => {
  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['app.ext']
  )))), ['glitch'])
})

test('does not make `glitch` entry when no app.[ext] file', t => {
  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['index.ext']
  )))), ['static'])

  t.deepEqual(Object.keys(makeEntries(dir, fs(mapTrue(
    ['style.ext']
  )))), ['static'])
})
