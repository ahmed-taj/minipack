import { extname } from 'path'

// Packages
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import { Rule } from 'webpack'

export const HTML_RULES = (index: string): Rule[] => {
  const rules: Rule[] = [
    { test: /\.html$/, loader: require.resolve('html-loader') }
  ]
  // index.[ext] specific loader
  if (index) {
    rules.unshift({
      test: index,
      use: ExtractTextPlugin.extract({
        use: [require.resolve('html-loader')]
      })
    })
  }
  return rules
}
