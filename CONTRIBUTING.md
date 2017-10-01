First of all, I really appreciate your consideration for contributing to the Glitch project.

Read the following sections in order to know what and how to work on something. If you get stuck at any point you can create an [issue] on GitHub.

All contributors are expected to follow our [Code of Conduct]. Please make sure you are welcoming and friendly in all of our spaces.

Here are some ways **you** can contribute:

* by using alpha, beta, and prerelease versions
* by reporting bugs
* by suggesting new features
* by writing or editing documentation
* by writing specifications
* by writing code ( **no patch is too small** : fix typos, add comments, clean up inconsistent whitespace )
* by refactoring code
* by closing [issues][issues]
* by reviewing patches

[issues]: https://github.com/glitchapp/glitch/issues

## Project setup

You are going to need the following dependencies installed:

- [Node.js](https://nodejs.org) (v8.4.x or later)
- [npm](https://npmjs.com/) (v5.3.x or later)
- [Git](https://git-scm.com)

### Installing dependencies

Then install npm packages using:

```
$ npm install
```

## Development

### Commit Message Format

All commits on the Glitch App repository follow the
[Conventional Changelog standard](https://github.com/conventional-changelog/conventional-changelog-eslint/blob/master/convention.md).
It is a very simple format so you can still write commit messages by hand. It extends the git command and will make writing commit 
messages very cool. This repository is preconfigured with [Commitizen], to commit your changes simply run.

```bash

$ npm run git
```

Below is an example of Commitizen in action. It replaces your usual `git commit` command
with `git cz` instead. The new command takes all the same arguments however it leads you
through an interactive process to generate the commit message.

![commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

Commit messages are used to automatically generate our changelogs, and to ensure
commits are searchable in a useful way. So please use the Commitizen tool and adhere to
the commit message standard or else we cannot accept Pull Requests without editing
them first.

Below is an example of a properly formated commit message.

```
chore(lib): fix a typo
```

### Running tests

```
$ npm test
```

### Linting

```
$ npm run lint
```

### Format your code

```
$ npm run format
```

## Submitting an Issue
We use the [GitHub issue tracker][issues] to track bugs and features. Before
submitting a bug report or feature request, check to make sure it hasn't
already been submitted.

## Submitting a Pull Request
1. [Fork the repository.][fork]
2. [Create a topic branch.][branch]
3. Implement your feature or bug fix.
4. Add yourself as a [contributor](#add-yourself-as-a-contributor)
5. Add, commit, and push your changes.
6. [Submit a pull request.][pr]

## Add yourself as a contributor

This project follows the [all contributors](https://github.com/kentcdodds/all-contributors) specification. To add yourself to the
table of contributors on README.md, please run:

```
$ npm run add-contrib
```

Follow the prompt. If you've already added yourself to the list and are making
a new type of contribution, you can run it again and select the added
contribution type.

## Notes
* Please add tests if you changed code. Contributions without tests won't be accepted.
* If you don't know how to add tests, please put in a PR and leave a comment
  asking for help. We'd love to help!

Thank you!

[fork]: http://help.github.com/fork-a-repo/
[Commitizen]: https://github.com/commitizen
[issue]: https://github.com/glitchapp/glitch/issues/new
[Code of Conduct]: https://github.com/glitchapp/glitch/tree/master/CODE_OF_CONDUCT.md
[branch]: http://learn.github.com/p/branching.html
[pr]: http://help.github.com/send-pull-requests/
