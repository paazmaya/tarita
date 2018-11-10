#!/usr/bin/env node

/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const path = require('path');

const fs = require('fs-extra'),
  optionator = require('optionator');

const tarita = require('../index'),
  listFiles = require('../lib/list-files');

let pkg;

try {
  const packageJson = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8');
  pkg = JSON.parse(packageJson);
}
catch (error) {
  console.error('Could not read/parse "package.json", quite strange...');
  console.error(error);
  process.exit(1);
}

const optsParser = optionator({
  prepend: `${pkg.name} [options] <file|directory>`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      default: false,
      description: 'Help and usage instructions'
    },
    {
      option: 'version',
      alias: 'V',
      type: 'Boolean',
      default: false,
      description: 'Version number'
    },
    {
      option: 'verbose',
      alias: 'v',
      type: 'Boolean',
      default: false,
      description: 'Verbose output, will print which file is currently being processed'
    },
    {
      option: 'output-dir',
      alias: 'o',
      type: 'String',
      default: '.',
      description: 'Output directory, which by default overwrites the original files'
    },
    {
      option: 'match',
      alias: 'M',
      type: 'String',
      default: '\\.js$',
      description: 'Regular expression for matching and filtering files'
    },
    {
      option: 'recursive',
      alias: 'r',
      type: 'Boolean',
      default: false,
      description: 'Recursively search matching files'
    }
  ]
});

let opts;

try {
  opts = optsParser.parse(process.argv);
}
catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (opts.version) {
  console.log((opts.verbose ?
    pkg.name + ' v' :
    '') + pkg.version);
  process.exit();
}

if (opts.help || opts._.length === 0) {
  console.log(optsParser.generateHelp());
  process.exit();
}

// List of files that will be processed
let fileList = [];

// Expression to match file paths against
const matcher = new RegExp(opts.match, 'u');

opts._.forEach((item) => {
  if (!fs.existsSync(item)) {
    console.error(`File (${item}) not found`);
  }
  else {
    // It is ok to enter the directory on the first level
    fileList = listFiles(item, {
      verbose: opts.verbose,
      matcher: matcher,
      recurse: opts.recursive
    });
  }
});

if (opts.verbose) {
  console.log(`Going to process total of ${fileList.length} files`);
}

const outdir = path.resolve(opts.outputDir);

if (opts.verbose) {
  console.log(`Outputting to directory: ${outdir}`);
}

if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir);
}

// Process then...
fileList.forEach((filepath) => {
  if (opts.verbose) {
    console.log(`Processing file ${filepath}`);
  }

  const input = fs.readFileSync(filepath, 'utf8');
  const output = tarita(input, opts);
  const outpath = path.join(outdir, filepath);

  fs.ensureDirSync(path.dirname(outpath));
  fs.writeFileSync(outpath, output, 'utf8');
});
