const { RemoveJunksPlugin } = require('../../../src')

module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    filename: 'index.bundle.js'
  },
  plugins: [
    new RemoveJunksPlugin(['index'])
  ]
}
