/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const espree = require('espree'),
  escodegen = require('escodegen');


/**
 * Read the values used in define array and map to the function arguments
 *
 * @param {object} expression Top level expression object
 * @returns {object} Map to be used for defining import statements
 */
const defineToImports = (expression) => {
  const imports = {};

  if (expression.type === 'CallExpression') {
    console.log('callee.name: ' + expression.callee.name); // Should be define or require

    if (expression.arguments[0].type === 'ArrayExpression') {
      const identifiers = expression.arguments[0].elements.map((item) => {
        return item.value;
      });

      // the first item should be array of file identifiers
      // the second a function

      const locals = expression.arguments[1].params.map((item) => item.name);

      // FunctionExpression params are then mapped to the identifiers
      locals.forEach((item, index) => {
        imports[item] = identifiers[index];
      });

    }
  }
  return imports;
};

/**
 * Search for the return statement from the end of the main function body
 *
 * @param {array} body Contents of the main function body
 * @returns {object} Name of the function that should be exported and rest of the body
 */
const getNameAndContents = (body) => {
  // Starting from end, look for ReturnStatement

  let returnArgument = false;
  body.reverse();
  const nameIndex = body.findIndex((item) => {
    return item.type && item.type === 'ReturnStatement';
  });
  if (typeof nameIndex === 'number' && nameIndex > -1) {
    returnArgument = body[nameIndex].argument;
    body.splice(nameIndex, 1);
  }
  body.reverse();

  return {
    defaultExport: returnArgument,
    contents: body
  };
};

/**
 * Create AST for import rules
 *
 * @param {object} imports Map for import statements
 * @returns {array} AST for import declarations
 */
const addAstImports = (imports) => {
  return Object.keys(imports).map((key) => {
    const name = imports[key];
    return {
      type: 'ImportDeclaration',
      specifiers: [
        {
          type: 'ImportDefaultSpecifier',
          local: {
            type: 'Identifier',
            name: key
          }
        }
      ],
      source: {
        type: 'Literal',
        value: name
      }
    };
  });
};

/**
 * Create AST for default export declaration
 *
 * @param {object} ast AST of the returned argument
 * @returns {array} AST for default export declaration
 */
const addAstExport = (ast) => {
  return [{
    type: 'ExportDefaultDeclaration',
    declaration: ast
  }];
};

/**
 * Process the AST in the hope of finding expression at the top
 *
 * @param {object} ast AST
 * @returns {object} Possibly modified AST
 */
const process = (ast) => {

  // body is array, which is require.js format should contain only one item

  if (ast.body[0].type === 'ExpressionStatement') {
    const impr = defineToImports(ast.body[0].expression);

    if (ast.body[0].expression.arguments[1].body.type === 'BlockStatement') {
      let outputAst = [];

      // Main function body. Usually ends with ReturnStatement

      const divided = getNameAndContents(ast.body[0].expression.arguments[1].body.body);

      const importList = addAstImports(impr);
      outputAst = importList.concat(divided.contents);

      if (divided.defaultExport) {
        const exportName = addAstExport(divided.defaultExport);
        outputAst = outputAst.concat(exportName);
      }
      ast.body = outputAst;

      ast.sourceType = 'module';
    }

  }
  return ast;
};

module.exports = (input) => {
  let ast = espree.parse(input, {
    ecmaVersion: 6,
    sourceType: 'module'
  });

  ast = process(ast);

  const output = escodegen.generate(ast);
  return output;
};
