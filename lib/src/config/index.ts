// Native 
import { resolve } from 'path'

// Packages
import { Configuration, Entry } from 'webpack'
import CleanWebpackPlugin = require('clean-webpack-plugin')
import HTMLWebpackPlugin = require('html-webpack-plugin')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import { MergeHTMLPlugin } from '@glitchbook/merge-html-plugin'
import { RemoveJunksPlugin } from '@glitchbook/remove-junks-plugin'

// Us
import { CompilerOptions } from "../types/options";
import { BUILD_DIR, INDEX_TITLE, DEFAULT_PUBLIC_PATH } from './globals'
import { CSS_RULES } from './support/css'
import { HTML_RULES } from './support/html'
import { JS_RULES } from './support/js'
import { entry, makeEntries, extractName } from '../utils/entry'

/**
 * Constructs webpack configuration object
 *
 * @private
 */
class Config {
  private entries: Entry
  private indexFile: string

  constructor(private options: CompilerOptions) {
    // webpack entries
    this.entries = makeEntries(this.options.path, this.options.fs)

    // Do we have index.[ext] template?
    this.indexFile = null
    if (this.entries['index']) {
      this.indexFile = extractName(this.entries['index'] as string)
    }
  }

  generate(): Configuration {
    return {
      // Entries
      entry: this.entries,

      // Output(s)
      output: {
        filename: '[name].[chunkhash].js',
        publicPath: this.options.publicPath || DEFAULT_PUBLIC_PATH
      },

      // Target environment
      target: "web",

      // Debugging
      devtool: "inline-source-map",

      // Rules
      module: {
        rules: [{
          oneOf: [
            ...HTML_RULES(this.indexFile),
            ...CSS_RULES(),
            ...JS_RULES()
          ]
        }]
      },

      // Plugins
      plugins: [
        // First of all, let's remove the build dir
        new CleanWebpackPlugin(BUILD_DIR, { verbose: false }),

        // Save extracted index.[ext] for later use
        new ExtractTextPlugin('USER.html'),

        // generate 'index.html' for us
        new HTMLWebpackPlugin({
          template: resolve(__dirname, '..', 'template', 'index.ejs'),
          title: INDEX_TITLE,
          chunks: ['app', 'style']
        }),

        // Merge 'USER.html' to the generated 'index.html'
        new MergeHTMLPlugin('USER.html'),

        // Remove 'index' bundle, we don't need it anymore
        new RemoveJunksPlugin(['index'])
      ],

      // Turn off performance hints during development because we don't do any
      // splitting or minification in interest of speed. These warnings become
      // cumbersome.
      performance: {
        hints: false,
      },

      // The base directory (absolute path!) for resolving the entry option
      context: this.options.path
    }
  }
}

export { Config }
