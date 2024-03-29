# tarita (たりた)

> Convert Require.js define to EcmaScript imports

[![Build Status](https://app.travis-ci.com/paazmaya/tarita.svg?branch=master)](https://app.travis-ci.com/paazmaya/tarita)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/5chh43ed57icvv33/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/tarita)
[![Node.js v14 CI](https://github.com/paazmaya/tarita/actions/workflows/linting-and-unit-testing.yml/badge.svg)](https://github.com/paazmaya/tarita/actions/workflows/linting-and-unit-testing.yml)
[![codecov.io](https://codecov.io/github/paazmaya/tarita/coverage.svg?branch=master)](https://codecov.io/github/paazmaya/tarita?branch=master)

Parsing to [Abstract Syntax Tree (AST)](https://github.com/estree/estree) happens with
[`espree`](https://github.com/eslint/espree) and generating code back to JavaScript with
[`escodegen`](https://github.com/estools/escodegen).

## Background for the project name

The name of the project is for honouring the legacy of
[Mrs Sonobe Hideo (園部 秀雄)](https://ja.wikipedia.org/wiki/%E5%9C%92%E9%83%A8%E7%A7%80%E9%9B%84),
who was the 15th head master of
[Jikishinkageryu Naginatajutsu (直心影流薙刀術)](http://naginata.fi/en/koryu),
which is an ancient Japanese martial art, focusing the handling of a long pole like weapon
called naginata.
During her childhood she was called by the name Tarita, hence the name of this project.

## Getting started

Install the `tarita` command line utility globally with [npm](https://www.npmjs.com/).
Elevated privileges might be needed via `sudo`, depending on the platform. In most cases just:

```sh
npm install --global tarita
```

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `14.15.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

Basic use case would be to have a single file containing:

```js
define([
  'jquery'
], function($) {

  var SuperMan = {
    power: $.fn.version
  };

  return SuperMan;
});
```

Which would be converted with the command:

```sh
tarita input-file.js
```

The contents of that file would be after the conversion:

```js
import $ from 'jquery';
var SuperMan = { power: $.fn.version };
export default SuperMan;
```

Please note that the given file will be overwritten, unless the `--output-dir` option is not used.

## Command line options

The output of `tarita --help` pretty much covers all the options:

```sh
tarita [options] <file|directory>

  -h, --help               Help and usage instructions
  -V, --version            Version number
  -v, --verbose            Verbose output, will print which file is currently being processed
  -o, --output-dir String  Output directory, which by default overwrites the original files -
                           default: .
  -M, --match String       Regular expression for matching and filtering files - default: \.js$
  -r, --recursive          Recursively search matching files

Version 0.5.0
```

## Contributing

["A Beginner's Guide to Open Source: The Best Advice for Making your First Contribution"](http://www.erikaheidi.com/blog/a-beginners-guide-to-open-source-the-best-advice-for-making-your-first-contribution/).

[Also there is a blog post about "45 Github Issues Dos and Don’ts"](https://davidwalsh.name/45-github-issues-dos-donts).

Linting is done with [ESLint](http://eslint.org) and can be executed with `npm run lint`.
There should be no errors appearing after any JavaScript file changes.

Please note that any features or changed will not be merged without working unit tests.

Unit tests are written with [`tape`](https://github.com/substack/tape) and can be executed with `npm test`.
Code coverage is inspected with [`nyc`](https://github.com/istanbuljs/nyc) and
can be executed with `npm run coverage` after running `npm test`.
Please make sure it is over 90% at all times.

## Version history

[Changes happening across different versions and upcoming changes are tracked in the `CHANGELOG.md` file.](CHANGELOG.md)

## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).
