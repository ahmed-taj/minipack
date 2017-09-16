// Native
import { promisify } from 'util'
import { resolve } from 'path'

// Packages
import test from 'ava'
import { runLoaders } from 'loader-runner'

// Helper
const run = async files => {
  return promisify(runLoaders)({
    resource: null, context: null, readResource: null,
    loaders: [{
      loader: resolve(__dirname, '..', 'src'), options: { include: files }
    }],
  })
}

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
