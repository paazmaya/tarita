#!/usr/bin/env node

/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to ES7 imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const fs = require('fs'),
  path = require('path');

const optionator = require('optionator');

const tarita = require('../index');

/**
 * Read the given file and return a string
 *
 * @param {string} filepath
 * @returns {string} Contents of the file
 */
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

/**
 * Write the string contents to a file
 *
 * @param {string} filepath
 * @param {string} content
 */
const writeFile = (filepath, content) => fs.writeFileSync(filepath, content, 'utf8');

let pkg;

try {
  const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
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
  console.log((opts.verbose ? pkg.name + ' v' : '') + pkg.version);
  process.exit();
}

if (opts.help || opts._.length === 0) {
  console.log(optsParser.generateHelp());
  process.exit();
}

// List of files that will be processed
const fileList = [];

// Expression to match file paths against
const matcher = new RegExp(opts.match);

/**
 * Determine if the given existing filepath is a file or directory
 * and continue with filtering and recursive when needed.
 *
 * @param {string} filepath Resolved filepath that exists
 * @param {bool} recurse Should a directory be entered
 * @returns {void}
 */
const handleFilepath = (filepath, recurse) => {
  const stat = fs.statSync(filepath);
  if (stat.isDirectory() && recurse) {
    const list = fs.readdirSync(filepath);

    list.forEach((item) => {
      handleFilepath(path.join(filepath, item), opts.recursive);
    });
  }
  else if (filepath.match(matcher) && stat.isFile()) {
    fileList.push(filepath);
  }
};

opts._.forEach((item) => {
  console.log(item);
  const filepath = path.resolve(item);
  if (!fs.existsSync(filepath)) {
    console.error(`File (${filepath}) not found`);
  }
  else {
    // It is ok to enter the directory on the first level
    handleFilepath(filepath, true);
  }
});

console.log(`Going to process total of ${fileList.length} files`);

// Process then...
