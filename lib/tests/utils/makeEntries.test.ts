// Packages
import test from 'ava'

// Ours
import { makeEntries } from '../../src/utils/makeEntries'
import { dir, fs, mapFalse, mapTrue } from '../helpers'

test('makes nothing when no entries', t => {
  t.deepEqual(makeEntries({ fs: fs(mapTrue([])), path: dir }), [])
})

test('makes `app`, `index` and `style` when possible', t => {
  t.is(
    makeEntries({
      fs: fs(mapTrue(['app.ext', 'index.ext', 'style.ext'])),
      path: dir
    }).length,
    3
  )
})

test('only makes necessary entries', t => {
  // Only app.[ext]
  t.is(makeEntries({ path: dir, fs: fs(mapTrue(['app.ext'])) }).length, 1)

  // Only index.[ext]
  t.is(makeEntries({ path: dir, fs: fs(mapTrue(['index.ext'])) }).length, 1)

  // Only style.[ext]
  t.is(makeEntries({ path: dir, fs: fs(mapTrue(['style.ext'])) }).length, 1)

  // Both app.[ext] & index.[ext]
  t.is(
    makeEntries({ path: dir, fs: fs(mapTrue(['app.ext', 'index.ext'])) })
      .length,
    2
  )

  // Both app.[ext] & style.[ext]
  t.is(
    makeEntries({ path: dir, fs: fs(mapTrue(['app.ext', 'style.ext'])) })
      .length,
    2
  )

  // Both index.[ext] & style.[ext]
  t.is(
    makeEntries({ path: dir, fs: fs(mapTrue(['style.ext', 'index.ext'])) })
      .length,
    2
  )
})

test('setups dev server', t => {
  t.deepEqual(
    makeEntries({
      dev: { client: 'myclient', url: 'example.com' },
      fs: fs(mapTrue([])),
      path: dir
    }),
    ['myclient?example.com']
  )
})
