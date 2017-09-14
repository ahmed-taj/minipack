const { join } = require('path')

const root = join(__dirname, '..', '..', '..')
const { RemoveJunksPlugin } = require(join(root, 'src'))

module.exports = {
  entry: {
    index: ['./index.js', './index2.js']
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new RemoveJunksPlugin(['index'])
  ]
}
