# tarita (たりた)

> Convert Require.js define to EcmaScript imports

[![Dependency Status](https://gemnasium.com/paazmaya/tarita.svg)](https://gemnasium.com/paazmaya/tarita)
[![Build Status](https://travis-ci.org/paazmaya/tarita.svg?branch=master)](https://travis-ci.org/paazmaya/tarita)
[![codecov.io](https://codecov.io/github/paazmaya/tarita/coverage.svg?branch=master)](https://codecov.io/github/paazmaya/tarita?branch=master)

Parsing to [AST](https://github.com/estree/estree) happens with
[`espree`](https://github.com/eslint/espree) and generating code back to JavaScript with
[`escodegen`](https://github.com/estools/escodegen).

Next release will be using the [JavaScript Concrete Syntax Tree](https://github.com/cst/cst) that should make the conversion a bit simpler.

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

Please note that this tool requires the minimum [Node.js](https://nodejs.org/en/)
version to be `4.2.0`, which is the Long Term Support (LTS) version.

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

## Version history

* `v0.5.0` (2016-06)
    - Using `cst` for code parsing, conversion and stringifying
* `v0.4.0` (2016-01-28)
    - Do not break the existing structure outside `define` statement
* `v0.3.0` (2016-01-28)
    - Also convert cases when there are no dependencies or there is only dependencies
    - Preserve comments
* `v0.2.0` (2016-01-28)
    - Unit testing and automation for it
    - Using [`nyc`](https://www.npmjs.com/package/nyc) for code coverage
    - Anything that was originally `return` should be the `export default`
* `v0.1.0` (2016-01-25)
    - Initial conversion ability from a `define` to `import` and `export default`


## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](./LICENSE).
