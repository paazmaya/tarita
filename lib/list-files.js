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

const fs = require('fs'),
  path = require('path');

/**
 * Determine if the given existing filepath is a file or directory
 * and continue with filtering and recursive when needed.
 *
 * If the initial filepath is a directory and the recursion is false,
 * the given directory is still being read.
 *
 * @param {string} filepath Relative filepath that exists
 * @param {Object} options Options passed
 * @param {bool} options.recurse Should a directory be entered
 * @param {RegExp} options.matcher Regular expression used to match file names
 * @param {bool} isNotFirstIteration Way to indicate whether a directory should be listed
 * @returns {void}
 */
const listFiles = (filepath, options, isNotFirstIteration) => {
  let list = [];

  if (!fs.existsSync(filepath)) {
    return list;
  }

  const stat = fs.statSync(filepath);
  if ((options.recurse || !isNotFirstIteration) && stat.isDirectory()) {
    const items = fs.readdirSync(filepath);

    items.forEach((item) => {
      list = list.concat(listFiles(path.join(filepath, item), options, true));
    });
  }
  else if (stat.isFile() && options.matcher.test(filepath)) {
    list.push(filepath);
  }

  return list;
};

module.exports = listFiles;
