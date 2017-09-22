// Packages
import { Configuration } from 'webpack-dev-server'

export const serverConfig: Configuration = {
  // Enable gzip compression of generated files.
  compress: true,
  // It is important to tell WebpackDevServer to use the same "root" path as we
  // specified in the config. By default we set it to "/" in "/lib" package.
  publicPath: '/',
  // WebpackDevServer is noisy by default so we emit custom message instead by
  // listening to the compiler events with `compiler.plugin` calls above.
  quiet: true,
  stats: 'none',
  watchOptions: {
    ignored: /node_modules/
  }
}
