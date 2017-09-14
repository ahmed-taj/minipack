const { RemoveJunksPlugin } = require('../../../src')

module.exports = {
  entry: {
    index: './index.js',
    index2: './index2.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  plugins: [
    new RemoveJunksPlugin(['index'])
  ]
}
