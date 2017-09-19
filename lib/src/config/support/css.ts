// Packages
import { Rule } from 'webpack'

// Ours
import browserslist from '../browserslist'

const baseRule = [
  require.resolve('style-loader'),
  { loader: require.resolve('css-loader'), options: { importLoaders: 1 } }
]

export const CSS_RULES = (): Rule[] => [
  // CSS
  {
    test: /\.css$/,
    use: [
      ...baseRule,
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: 'inline',
          plugins: () => [
            require('postcss-import'),
            require('postcss-cssnext')({
              browsers: browserslist
            })
          ]
        }
      }
    ]
  }
]
