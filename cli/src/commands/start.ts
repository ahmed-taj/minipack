// Native
import * as fs from 'fs'

// Packages
import { prepare } from '@glitchapp/lib'
import { bold, cyan } from 'chalk'
import * as DevServer from 'webpack-dev-server'
import { CommandBuilder } from 'yargs'

// Ours
import { serverConfig } from '../config/server'

// String (or array of strings) that executes this command when given on the
// command line, first string may contain positional args
const command = 'start [options]'

// Array of strings (or a single string) representing aliases of `command`,
// positional args defined in an alias are ignored
const aliases = []

// String used as the description for the command in help text, use false for
// a hidden command
const desc = 'Starts a dev server in the current path'

// Object declaring the options the command accepts, or a function accepting
// and returning a yargs instance
const builder: CommandBuilder = {
  host: {
    alias: 'h',
    default: '0.0.0.0',
    desc: 'The hostname'
  },
  port: {
    alias: 'p',
    default: '8080',
    desc: 'The port number'
  }
}

// A function which will be passed the parsed argv
const handler = argv => {
  const url = `http://${argv.host}:${argv.port}`

  // Prepare returns an instance of webpack.Compiler
  const compiler = prepare({
    dev: { client: require.resolve('webpack-dev-server/client'), url },
    fs,
    path: process.cwd()
  })

  // Create an instance of webpack-dev-server
  const server = new DevServer(compiler, serverConfig)

  server.listen(argv.port, argv.host, err => {
    if (err) {
      return console.log(err)
    }

    console.log(cyan(`Starting in ${url}\n`))
    console.log(cyan('Use CTRL-C to stop the server'))
  })
}

export { command, aliases, desc, builder, handler }
