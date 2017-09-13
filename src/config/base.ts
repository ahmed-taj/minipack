// Packages
import { Configuration } from 'webpack'
import CleanWebpackPlugin = require('clean-webpack-plugin')

// Us
import browserslist from './browserslist'

const Base: Configuration = {
  // Target environment
  target: "web",

  // Debugging
  devtool: "inline-source-map",

  // Output
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/'
  },

  // Rules
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 1 }
          },
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
      },

      // Support ES6 (and beyond) using Babel
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
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin('dist', { verbose: false })
  ],

  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
}

export { Base }
