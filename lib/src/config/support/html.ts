import { join } from 'path'

// Packages
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import { Rule } from 'webpack'

export const HTML_RULES = (path: string): Rule[] => {
  const rules: Rule[] = [
    {
      test: join(path, 'index.html'),
      use: ExtractTextPlugin.extract({
        use: [require.resolve('html-loader')]
      })
    },
    { test: /\.html$/, loader: require.resolve('html-loader') }
  ]
  return rules
}
