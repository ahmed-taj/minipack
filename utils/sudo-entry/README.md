# Sudo entry

[![npm (scoped)](https://img.shields.io/npm/v/@glitchapp/sudo-entry.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/glitchapp/glitch.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/@glitchapp/sudo-entry.svg?style=flat-square)]()

> This package is part of [Glitch](https://github.com/glitchapp) project

A webpack loader that generates an entry by requiring the given resources. Useful when your entry isn't a JavaScript module.

## Installation

```sh
$ npm install @glitchapp/sudo-entry
```

## Usage

#### Single file
```javascript
// File: webpack.config.js

module.exports = {
  // This generates a code similar to:
  //
  //    require('index.html');
  //
  entry: '@glitchapp/sudo-entry?include=index.html!',
  output: {
    filename: 'bundle.js'
  },
  ...
}
```

#### Multiple files

```javascript
// File: webpack.config.js

module.exports = {
  // This generates a code similar to:
  //
  //    require('index.html');
  //    require('style.css');
  //
  entry: '@glitchapp/sudo-entry?include[]=index.html,include[]=style.css!',
  output: {
    filename: 'bundle.js'
  },
  ...
}
```

## Contributing

We value and appreciate your help, please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Running the tests

```sh
$ npm test
```

## License

This project is licensed under the [MIT License](./LICENSE) terms
