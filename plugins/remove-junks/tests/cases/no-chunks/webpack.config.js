const { RemoveJunksPlugin } = require('../../../src')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.bundle.js'
  },
  plugins: [
    new RemoveJunksPlugin([])
  ]
}
