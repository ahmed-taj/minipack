// Native
import * as fs from 'fs'

// Packages
import { prepare } from '@glitchbook/lib'
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
const aliases = ['s']

// String used as the description for the command in help text, use false for
// a hidden command
const desc = 'Starts a live server in the current path'

// Object declaring the options the command accepts, or a function accepting
// and returning a yargs instance
const builder: CommandBuilder = {
  host: {
    default: '0.0.0.0',
    desc: 'The hostname'
  },
  port: {
    default: '8080',
    desc: 'The port number'
  }
}

// A function which will be passed the parsed argv
const handler = argv => {
  try {
    // Prepare returns an instance of webpack.Compiler
    const compiler = prepare({ fs, path: process.cwd() })

    // Create an instance of webpack-dev-server
    const server = new DevServer(compiler, serverConfig)

    server.listen(argv.port, argv.host, err => {
      if (err) {
        return console.log(err)
      }

      console.log(cyan(`Starting in http://${argv.host}:${argv.port}\n`))
      console.log(cyan('Use CTRL-C to stop the server'))
    })
  } catch (error) {
    if (error.name === 'WebpackOptionsValidationError') {
      // This probably due to no entry error
      console.log(
        `Nothing to run in '${cyan(process.cwd())}', ${bold('aborting!')}\n`
      )
    }
  }
}

export { command, aliases, desc, builder, handler }
