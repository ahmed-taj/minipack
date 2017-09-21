// Packages
import { Plugin } from 'webpack'

// Ours
import { merge } from './merge'

/**
 * An extension plugin for html-webpack-plugin to enable injection of custom 
 * HTML string from an asset
 */
class MergeHTMLPlugin implements Plugin {
  constructor(private file: string) {}

  public apply(compiler) {
    compiler.plugin('compilation', compilation => {
      // Before HTML processing is the prefect time for us, because we won't
      // worry:
      //
      // 1. about template language being used. HWP takes care of it in the
      //    previous step.
      //
      // 2. where to inject our string due the emptiness of <body> element at
      //    this stage.
      //
      // NOTE: we assume a default like HTML template, which means the <body>
      //       must be empty
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        (htmlPluginData, callback) => {
          // Make sure the asset actually exists
          if (this.file in compilation.assets) {
            // Get asset file source code
            const src = compilation.assets[this.file].source()

            // Inject the source then replace the original HTML
            htmlPluginData.html = merge(src, htmlPluginData.html)
          } else {
            compilation.errors.push(
              new Error(
                `No such asset: '${this.file}'
                You probably have mistyped the file name or misconfigured the plugins ordering!`
              )
            )
          }

          callback(null, htmlPluginData)
        }
      )
    })
  }
}

export { MergeHTMLPlugin }
