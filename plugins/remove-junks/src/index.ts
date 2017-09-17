// Packages
import { Plugin } from 'webpack'

/**
 * A webpack plugin to remove junk chunk's files
 */
class RemoveJunksPlugin implements Plugin {
  constructor(private chunks: string[]) { }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {

      // filter chunks
      compilation.chunks.filter(chunk => this.chunks.includes(chunk.name))
        .forEach(chunk => {
          // Remove chunk's files
          chunk.files.map(f => delete compilation.assets[f])
        })

      callback()
    })
  }
}

export { RemoveJunksPlugin }
