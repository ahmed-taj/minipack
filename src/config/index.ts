import { Configuration } from 'webpack'

const config = (root: string): Configuration => {
    return {
        context: root
    }
}

export default config