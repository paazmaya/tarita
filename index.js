/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license
 */
'use strict';

const espree = require('espree'),
  cst = require('cst'),
  escodegen = require('escodegen');

/**
 * Read the values used in define array and map to the function arguments.
 * There might be cases when only the array is defined, without the function,
 * since the files that are converted might be in the middle of development.
 *
 * @param {object} expression Top level expression object
 * @returns {object|bool} Map to be used for defining import statements
 */
const defineToImports = (expression) => {

  if (this.options.verbose) {
    console.log('callee.name: ' + expression.callee.name); // Should be define or require
  }

  const nameList = expression.arguments.find((item) => {
    return item.type === 'ArrayExpression';
  });

  const variableList = expression.arguments.find((item) => {
    return item.type === 'FunctionExpression';
  });

  if (nameList) {
    const identifiers = nameList.elements.map((item) => {
      return item.value;
    });

    // the first item should be array of file identifiers, when more than one
    // the second a function

    let locals;
    if (variableList) {
      locals = variableList.params.map((item) => item.name);
    }
    else {
      locals = nameList.elements.map((item) => item.value);
    }

    // FunctionExpression params are then mapped to the identifiers
    const imports = {};
    locals.forEach((item, index) => {
      imports[item] = identifiers[index];
    });

    return imports;
  }

  return false;
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
 * @param {object} ast AST for the ExpressionStatement that has passed the requirements
 * @returns {array} Possibly modified AST as a list
 */
const processExpression = (ast) => {
  let outputAst = [];

  const impr = defineToImports(ast);
  const importList = addAstImports(impr);
  outputAst = outputAst.concat(importList);

  // Get the first block statement
  const blockArgument = ast.arguments.find((item) => {
    return item.body && item.body.type === 'BlockStatement';
  });

  if (blockArgument) {

    // Main function body. Usually ends with ReturnStatement

    const divided = getNameAndContents(blockArgument.body.body);

    outputAst = outputAst.concat(divided.contents);

    if (divided.defaultExport) {
      const exportName = addAstExport(divided.defaultExport);
      outputAst = outputAst.concat(exportName);
    }
  }

  return outputAst;
};

/**
 * Process the AST in the hope of finding expression at the top
 *
 * @param {object} ast AST program
 * @returns {object} Possibly modified AST
 */
const process = (ast) => {

  // Please note that 'use strict'; is an expression statement,
  // so find the first expression statement that contains CallExpression
  // of which the name is "define" or "require"
  const bodyIndex = ast.body.findIndex((item) => {
    return item.type === 'ExpressionStatement' &&
      item.expression && item.expression.type === 'CallExpression' &&
      item.expression.callee && item.expression.callee.name &&
      item.expression.callee.name.match(/(define|require)/);
  });

  if (typeof bodyIndex === 'number' && bodyIndex !== -1) {
    const body = processExpression(ast.body[bodyIndex].expression);
    body.unshift(bodyIndex, 1); // Position, remove count

    // Remove the previous body item and replace with others
    Array.prototype.splice.apply(ast.body, body);

    ast.sourceType = 'module';
  }

  return ast;
};

/**
 * Parse the given input via espree parser
 *
 * @param  {string} input JavaScript code
 * @return {object}       AST returned from espree
 */
const parseEspree = (input) => {
  return espree.parse(input, {
    attachComment: true,
    comment: true,
    tolerant: true,
    loc: true,
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  });
};

/**
 * Parse the given input via cst parser
 *
 * @param  {string} input JavaScript code
 * @return {object}       AST returned from espree
 * @see https://github.com/cst/cst/wiki/Parser-options
 */
const parseCst = (input) => {
  const parser = new cst.Parser({
    sourceType: 'module',
    strictMode: true,
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

/**
 * Generate JavaScript code from the input AST via escodegen
 *
 * @param  {object} ast AST
 * @return {string}     JavaScript code
 */
const generateEscodegen = (ast) => {
  return escodegen.generate(ast, {
    comment: true,
    format: {
      indent: {
        style: '  ',
        base: 0,
        adjustMultilineComment: true
      },
      quotes: 'single',
      preserveBlankLines: true
    }
  });
};

/**
 * Generate JavaScript code from the input AST via cst
 *
 * @param  {object} ast AST
 * @return {string}     JavaScript code
 */
const generateCst = (ast) => {
  return ast.getSourceCode();
};

module.exports = (input, options) => {
  this.options = options || {};
  this.options.verbose = typeof this.options.verbose === 'boolean' ?
    this.options.verbose : false;

  let ast = parseEspree(input);
  //let ast = parseCst(input);

  ast = process(ast);

  try {
    return generateEscodegen(ast);
  }
  catch (error) {
    console.error('Generating JavaScript with escodegen failed');
    console.error(error);
  }
  return false;
  //return generateCst(ast);
};

// Exported so that can be unit tested
module.exports._defineToImports = defineToImports;
module.exports._getNameAndContents = getNameAndContents;
module.exports._addAstImports = addAstImports;
module.exports._addAstExport = addAstExport;
module.exports._processExpression = processExpression;
module.exports._process = process;
module.exports._parseCst = parseCst;
module.exports._generateCst = generateCst;
