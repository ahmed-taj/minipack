#!/usr/bin/env node

// Packages
import * as yargs from 'yargs'

// Ours
import { versions } from './utils/versions'

// tslint:disable:no-unused-expression
yargs
  .usage(`Usage:  glb [command] [options]`)
  .version(versions())
  .epilogue(
    `If you have any problems, do not hesitate to file an issue:\n` +
      `  https://github.com/glitchbook/glitchbook/issues/new`
  )
  .help().argv
