// Native
import { resolve } from 'path'

// Packages
import { MergeHTMLPlugin } from '@glitchapp/merge-html-plugin'
import { RemoveJunksPlugin } from '@glitchapp/remove-junks-plugin'
import CleanWebpackPlugin = require('clean-webpack-plugin')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import HTMLWebpackPlugin = require('html-webpack-plugin')
import { Configuration, Entry } from 'webpack'

// Ours
import { CompilerOptions } from '../types/options'
import { makeEntries } from '../utils/makeEntries'
import { BUILD_DIR, DEFAULT_PUBLIC_PATH, INDEX_TITLE } from './globals'
import { CSS_RULES } from './support/css'
import { HTML_RULES } from './support/html'
import { JS_RULES } from './support/js'

/**
 * Constructs webpack configuration object
 *
 * @private
 */
class Config {
  constructor(private options: CompilerOptions) {}

  // tslint:disable
  public generate(): Configuration {
    return {
      // Entries
      entry: makeEntries(this.options),

      // Output(s)
      output: {
        filename: 'bundle.[chunkhash].js',
        path: resolve(this.options.path, BUILD_DIR),
        publicPath: this.options.publicPath || DEFAULT_PUBLIC_PATH
      },

      // Target environment
      target: 'web',

      // Debugging
      devtool: 'inline-source-map',

      // Rules
      module: {
        rules: [
          {
            oneOf: [
              ...HTML_RULES(this.options.path),
              ...CSS_RULES(),
              ...JS_RULES()
            ]
          }
        ]
      },

      // Plugins
      plugins: [
        // First of all, let's remove the build dir
        new CleanWebpackPlugin(resolve(this.options.path, BUILD_DIR), {
          verbose: false
        }),

        // Save extracted index.[ext] for later use
        new ExtractTextPlugin('USER.html'),

        // generate 'index.html' for us
        new HTMLWebpackPlugin({
          template: resolve(__dirname, '..', 'template', 'index.ejs'),
          title: INDEX_TITLE
        }),

        // Merge 'USER.html' to the generated 'index.html'
        new MergeHTMLPlugin('USER.html')

        // Remove 'index' bundle, we don't need it anymore
        // TODO: modify RemoveJunksPlugin to remove files instead of chunks
        // new RemoveJunksPlugin(['index'])
      ],

      // Turn off performance hints during development because we don't do any
      // splitting or minification in interest of speed. These warnings become
      // cumbersome.
      performance: {
        hints: false
      },

      // The base directory (absolute path!) for resolving the entry option
      context: this.options.path
    }
  }
}

export { Config }
