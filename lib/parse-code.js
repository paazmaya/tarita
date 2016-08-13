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

const cst = require('cst');

/**
 * Parse the given input via cst parser
 *
 * @param  {string} input JavaScript code
 * @return {object}       CST program returned from cst Parser
 * @see https://github.com/cst/cst/wiki/Parser-options
 */
const parseCode = (input) => {
  const parser = new cst.Parser({
    sourceType: 'module',
    strictMode: false,
    ecmaVersion: 6,
    experimentalFeatures: {
      flow: true,
      jsx: true,
      asyncFunctions: true,
      asyncGenerators: true,
      classConstructorCall: true,
      classProperties: true,
      decorators: true,
      doExpressions: true,
      exponentiationOperator: true,
      exportExtensions: true,
      functionBind: true,
      objectRestSpread: true,
      trailingFunctionCommas: true
    },
    languageExtensions: {
      jsx: true
    }
  });

  return parser.parse(input);
};

module.exports = parseCode;
