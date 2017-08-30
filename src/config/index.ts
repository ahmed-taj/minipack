// Packages
import { Configuration } from 'webpack'

/**
 * Constructs webpack configuration object
 *
 * @param root app directory
 */
const config = (root: string): Configuration => {
  return {
    context: root
  }
}

export default config
