// Packages
import test from 'ava'

// Ours
import { makeEntries } from '../../src/utils/entry'
import { dir, fs, mapFalse, mapTrue } from '../helpers'

test('makes nothing when no entries', t => {
  t.deepEqual(makeEntries({ fs: fs(mapTrue([])), path: dir }), {})
})

test('makes `app`, `index` and `style` when possible', t => {
  t.deepEqual(
    Object.keys(
      makeEntries({
        fs: fs(mapTrue(['app.ext', 'index.ext', 'style.ext'])),
        path: dir
      })
    ),
    ['app', 'index', 'style']
  )
})

test('only makes necessary entries', t => {
  // Only app.[ext]
  t.deepEqual(
    Object.keys(makeEntries({ path: dir, fs: fs(mapTrue(['app.ext'])) })),
    ['app']
  )

  // Only index.[ext]
  t.deepEqual(
    Object.keys(makeEntries({ path: dir, fs: fs(mapTrue(['index.ext'])) })),
    ['index']
  )

  // Only style.[ext]
  t.deepEqual(
    Object.keys(makeEntries({ path: dir, fs: fs(mapTrue(['style.ext'])) })),
    ['style']
  )

  // Both app.[ext] & index.[ext]
  t.deepEqual(
    Object.keys(
      makeEntries({ path: dir, fs: fs(mapTrue(['app.ext', 'index.ext'])) })
    ),
    ['app', 'index']
  )

  // Both app.[ext] & style.[ext]
  t.deepEqual(
    Object.keys(
      makeEntries({ path: dir, fs: fs(mapTrue(['app.ext', 'style.ext'])) })
    ),
    ['app', 'style']
  )

  // Both index.[ext] & style.[ext]
  t.deepEqual(
    Object.keys(
      makeEntries({ path: dir, fs: fs(mapTrue(['index.ext', 'style.ext'])) })
    ),
    ['index', 'style']
  )
})
