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
 * Create CST for default export declaration with the given name
 *
 * @param {string} name Variable name that is going to be exported as default
 * @returns {ExportDefaultDeclaration} CST for default export declaration
 * @see https://github.com/cst/cst/blob/master/src/elements/Element.js
 */
const defaultExport = (name) => {
  return new cst.types.ExportDefaultDeclaration([
    new cst.Token('Keyword', 'export'),
    new cst.Token('Whitespace', ' '),
    new cst.Token('Keyword', 'default'),
    new cst.Token('Whitespace', ' '),
    new cst.types.Identifier([new cst.Token('Identifier', name)]),
    new cst.Token('Punctuator', ';')
  ]);
};

module.exports = {
  defaultExport: defaultExport
};
