// Packages
import { Rule } from 'webpack'

export const HTML_RULES: Rule[] = [
  // HTML
  {
    test: /\.html$/,
    loader: require.resolve('html-loader')
  }
]
