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
