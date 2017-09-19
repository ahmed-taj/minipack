# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="1.0.0"></a>
# 1.0.0 (2017-09-19)


### Bug Fixes

* **lib:** resolve entry files path to absolute paths ([ff3a3ea](https://github.com/glitchbook/glitchbook/commit/ff3a3ea))


### Code Refactoring

* **lib:** Rename exported function 'core' to 'prepare' ([7ef0d08](https://github.com/glitchbook/glitchbook/commit/7ef0d08))


### Features

* **lib:** A bundle for each entry file ([ec84713](https://github.com/glitchbook/glitchbook/commit/ec84713))
* **lib:** Auto generation of webpack entries based on dir contents ([00fc151](https://github.com/glitchbook/glitchbook/commit/00fc151))
* **lib:** Make "publicPath" available as configuration ([d70c59c](https://github.com/glitchbook/glitchbook/commit/d70c59c))
* **lib:** merge use HTML with our template ([ee34092](https://github.com/glitchbook/glitchbook/commit/ee34092))
* **lib:** remove 'index' bundle ([9536c3c](https://github.com/glitchbook/glitchbook/commit/9536c3c))
* **lib:** support .html files ([a1d9456](https://github.com/glitchbook/glitchbook/commit/a1d9456))


### BREAKING CHANGES

* **lib:** index.[ext] and style.[ext] now produce different bundles
* **lib:** Rename exported function `core` to `prepare`
