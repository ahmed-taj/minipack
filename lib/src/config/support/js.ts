// Packages
import { Rule } from 'webpack'

// Us
import browserslist from '../browserslist'

export const JS_RULES = (): Rule[] => [
  // ES6 (and beyond) support
  {
    test: /\.(js|jsx|es)$/,
    loader: require.resolve('babel-loader'),
    exclude: /(node_modules|bower_components)/,
    options: {
      babelrc: false,
      presets: [
        [require.resolve('babel-preset-env'), {
          targets: {
            browsers: browserslist
          }
        }],
        require.resolve('babel-preset-react')
      ],
      // Enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true
    }
  }
]
