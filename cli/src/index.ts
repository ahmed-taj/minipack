#!/usr/bin/env node

// Packages
import * as yargs from 'yargs'

// Ours
import { versions } from './utils/versions'

// tslint:disable:no-unused-expression
yargs
  .usage(`Usage:  glitch [command] [options]`)
  .version(versions())
  .commandDir('./commands')
  .epilogue(
    `If you have any problems, do not hesitate to file an issue:\n` +
      `  https://github.com/glitchapp/glitch/issues/new`
  )
  .help().argv
