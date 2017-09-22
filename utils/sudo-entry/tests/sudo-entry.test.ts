// Native
import { resolve } from 'path'
import { promisify } from 'util'

// Packages
import test from 'ava'
import { runLoaders } from 'loader-runner'

// Helper
const run = async files => {
  return promisify(runLoaders)({
    context: null,
    loaders: [
      {
        loader: resolve(__dirname, '..', 'src'),
        options: { include: files }
      }
    ],
    readResource: null,
    resource: null
  })
}

test('generates an empty string if no files', async t => {
  const { result } = await run([])
  t.is(result.toString(), '')
})

test('generates an entry from a single file', async t => {
  const { result } = await run('./index.html')
  t.is(result.toString(), 'require("./index.html");')
})

test('generates an entry using multiple files', async t => {
  const files = ['./index.html', 'assets/logo.png']
  const { result } = await run(files)

  const output = result.toString().split('\n')

  files.forEach((f, i) => {
    t.is(output[i], `require("${f}");`)
  })
})
