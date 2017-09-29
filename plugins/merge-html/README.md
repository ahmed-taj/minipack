# Merge HTML Plugin

[![npm (scoped)](https://img.shields.io/npm/v/@glitchapp/merge-html-plugin.svg?style=flat-square)]()
[![Travis](https://img.shields.io/travis/glitchapp/glitch.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/@glitchapp/merge-html-plugin.svg?style=flat-square)]()
[![engines](https://img.shields.io/badge/engines-node%3E%3D8.4.0%2Cnpm%3E%3D5.3.0-blue.svg?style=flat-square)]()
> This package is part of [Glitch](https://github.com/glitchapp) project

An extension plugin for [html-webpack-plugin] to enable injection of custom HTML string

## Installation

```sh
$ npm install @glitchapp/merge-html-plugin
```

## Usage

```javascript
// File: webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // NOTE: This is just for this example purpose, you DON'T need copy-webpack-plugin
    new CopyWebpackPlugin([
        { from: join(testDir, 'index.html'), to: 'custom.html' }
    ]),
    new HTMLWebpackPlugin({
        // ... HTMLWebpackPlugin options
    }),
    new MergeHTMLPlugin('custom.html')
  ]
}
```

```html
<!-- File: user.html -->
<h1>Hello world!</h1>
```

The above configurations output something like:
```html
<!-- File: dist/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
```

## Options

```javascript
new MergeHTMLPlugin(file)
```

| Name              | Type     | Description                 |
| :---------------: | :------: | :-------------------------: |
| `file` (required) | `string` | The asset file to be merged |

## Contributing

We value and appreciate your help, please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Running the tests

```sh
$ npm test
```

## Acknowledgments

Special thanks to Jan Nicklas for their awesome work in [html-webpack-plugin]

[html-webpack-plugin]: https://github.com/jantimon/html-webpack-plugin

## License

This project is licensed under the [MIT License](./LICENSE) terms
