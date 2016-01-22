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

const espree = require('espree'),
  escodegen = require('escodegen');

module.exports = (input) => {
  const ast = espree.parse(input, {
    ecmaVersion: 6, sourceType: 'module'
  });


  const output = escodegen.generate(ast);
  return output;
};
