// Packages
import { Compiler } from 'webpack'

/**
 * A webpack plugin to remove junk chunk's files
 */
class RemoveJunksPlugin {
  constructor(private chunks: string[]) { }

  apply(compiler: Compiler) {
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
