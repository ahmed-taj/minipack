<div align="center">
  <img width="128" height="128"
    src="./logo.svg">
  <h1>Minipack</h1>
  <p>A webpack-based, local playground for the modern web technologies.</p>
  
  <a href="https://npm.im/@glitchapp/cli">
    <img src="https://img.shields.io/npm/v/@glitchapp/cli.svg?style=flat-square" >
  </a>
  <a href="https://travis-ci.org/glitchapp/glitch">
    <img src="https://img.shields.io/travis/glitchapp/glitch.svg?style=flat-square" >
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" >
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/npm/l/@glitchapp/cli.svg?style=flat-square">
  </a>
</div>

> **NOTE:** This project is currently in beta, if you find any issues please report it [here](https://github.com/ahmed-taj/minipack/issues)


## How it works

Internally, the playground is just a set of [webpack](https://webpack.js.org) plugins/loaders. We use the same, good, official webpack-dev-server to serve the final JavaScript bundle.

It works by walking through the current directory contents to determine suitable entry point files for webpack. An entry point file can be:

#### 1. index.[ext]: 

Used to customize the HTML output (it will be transpiled if necessary). 

**Example:**

```HTML
<!-- index.html -->
<div id="root"></div>
```

#### 2. app.[ext]:

Used as a start point for your JavaScript (it will be transpiled if necessary) 
code, you should import all your scripts here.

**Example:**

```JavaScript
// app.js
console.log('Hello world');
```

#### 3. style.[ext]:

Used as a start point for your stylesheets (it will be transpiled if necessary). 
You should import all your other styles here. Otherwise, you need import them in
your `app.[ext]` as you would normally do when using webpack.

**Example:**

```CSS
/* style.css */
body {
  color: green;
}
```

You can think of these entry points as the HTML/CSS/JS tabs you would see in any
online playground such as [Codepen](https://codepen.io), [JSFiddle](https://jsfiddle.net/).
All of these files are optional.

### Extensions mapping

We use the file extensions as a source of truth in order to determine whether we need to perform transpilation or not.

| Extensions    | Loader                                                        | Notes                                               |
| :------------ | :------------------------------------------------------------ | :-------------------------------------------------- |
| **js,jsx,es** | [babel-loader](https://github.com/babel/babel-loader)         | Using `preset-env` and `preset-react`               |
| **html**      | [html-loader](https://github.com/webpack-contrib/html-loader) |                                                     |
| **css**       | [css-loader](https://github.com/webpack-contrib/css-loader)   | In addition to `postcss-cssnext` and `autoprefixer` |

## Installation

```sh
$ npm install -g @glitchapp/cli
```

## Usage

```
Usage:  glitch [command] [options]

Commands:
  start [options]  Start a dev server in the current path

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

If you have any problems, do not hesitate to file an issue:
  https://github.com/glitchapp/glitch/issues/new

```

## Prerequisites

* **Node.js:** v8.4.0 (or later)
* **npm:** v5.4.0 (or later)

## Contributing

We value and appreciate your help, please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/12673605?v=4" width="100px;"/><br /><sub>Ahmed T. Ali</sub>](https://github.com/ahmed-taj)<br />[📝](#blog-ahmed-taj "Blogposts") [💻](https://github.com/glitchapp/glitch/commits?author=ahmed-taj "Code") [🎨](#design-ahmed-taj "Design") [📖](https://github.com/glitchapp/glitch/commits?author=ahmed-taj "Documentation") [🤔](#ideas-ahmed-taj "Ideas, Planning, & Feedback") [🔌](#plugin-ahmed-taj "Plugin/utility libraries") [👀](#review-ahmed-taj "Reviewed Pull Requests") [⚠️](https://github.com/glitchapp/glitch/commits?author=ahmed-taj "Tests") |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Acknowledgments

Inspired by the awesome work of Facebook in their [create-react-app](https://github.com/facebookincubator/create-react-app) package.

This project would not have been possible without these great projects:

* [Node.js](https://nodejs.org)
* [webpack](https://webpack.js.org)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

## License

This project is licensed under the [MIT License](./LICENSE) terms
