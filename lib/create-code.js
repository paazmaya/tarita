/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */


const cst = require('cst');

/**
 * Create CST for default export declaration with the given name.
 * Something along the lines of:
 *   export default total;
 *
 * @param {string} name Variable name that is going to be exported as default
 * @returns {ExportDefaultDeclaration} CST for default export declaration
 * @see https://github.com/cst/cst/blob/master/src/elements/Element.js
 */
const defaultExport = (name) => {

  // Should have structure something that produces this:
  // ExportDefaultDeclaration
  //   Keyword
  //   Whitespace
  //   Keyword
  //   Whitespace
  //   Identifier
  //     Identifier
  //   Punctuator

  return new cst.types.ExportDefaultDeclaration([
    new cst.Token('Keyword', 'export'),
    new cst.Token('Whitespace', ' '),
    new cst.Token('Keyword', 'default'),
    new cst.Token('Whitespace', ' '),
    new cst.types.Identifier([new cst.Token('Identifier', name)]),
    new cst.Token('Punctuator', ';')
  ]);
};

/**
 * Create CST for import rules.
 * Something along the lines of:
 *   import A from "b";
 *
 * @param {string} key Local imported variable
 * @param {string} name Module name from the imported
 * @returns {array} AST for import declarations
 */
const importName = (key, name) => {

  // Should have structure something that produces this:
  // ImportDeclaration
  //   Keyword
  //   Whitespace
  //   ImportSpecifier
  //     Identifier
  //   Whitespace
  //   Identifier
  //   Whitespace
  //   StringLiteral
  //   Punctuator

  return new cst.types.ImportDeclaration([
    new cst.Token('Keyword', 'import'),
    new cst.Token('Whitespace', ' '),
    new cst.types.ImportDefaultSpecifier([new cst.types.Identifier([new cst.Token('Identifier', key)])]),
    new cst.Token('Whitespace', ' '),
    new cst.Token('Identifier', 'from'),
    new cst.Token('Whitespace', ' '),
    new cst.types.StringLiteral([new cst.Token('String', `"${name}"`)]),
    new cst.Token('Punctuator', ';')
  ]);
};

module.exports = {
  defaultExport: defaultExport,
  importName: importName
};
