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

const parseCode = require('./lib/parse-code');
const createCode = require('./lib/create-code');

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

  //console.log(expression);

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
 * Find the return statement for the define callback.
 *
 * @return {[type]} [description]
 */
const getLastReturn = (program) => {
  program.selectNodesByType('ReturnStatement').forEach(node => {
    console.log(node.name, node.value);
  });
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

  // Reverse in order to start finding a match from the original end
  body.reverse();

  const nameIndex = body.findIndex((item) => {
    return item.type && item.type === 'ReturnStatement';
  });

  console.log('nameIndex: ' + nameIndex);

  if (typeof nameIndex === 'number' && nameIndex > -1) {
    returnArgument = body[nameIndex].argument;
    body.splice(nameIndex, 1);
  }

  // Reverse again in order to return to the original order
  body.reverse();

  console.log('body.length: ' + body.length);

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

    return createCode.importName(key, name);
  });
};


/**
 * Process the AST in the hope of finding expression at the top
 *
 * @param {object} node AST for the CallExpression Node that has passed the requirements
 * @returns {array} Possibly modified AST as a list
 */
const processExpression = (node) => {

  console.log('node.type: ' + node.type);
  console.log('node.childElements.length: ' + node.childElements.length);

  // Imports should be placed at the top of the Program
  const program = node.getOwnerProgram();

  node.childElements.map((item) => {
    //console.log(item);
    //return item.remove();
  });

  //console.log(node.parentElement);

  let outputAst = [];

  console.log('expression keys: ' + Object.keys(node).length);

  const impr = defineToImports(node);


  const importList = addAstImports(impr);
  outputAst = outputAst.concat(importList);

  // Get the first block statement
  const blockArgument = node.arguments.find((item) => {
    return item.body && item.body.type === 'BlockStatement';
  });

  if (blockArgument) {

    // Main function body. Usually ends with ReturnStatement

    const divided = getNameAndContents(blockArgument.body.body);

    outputAst = outputAst.concat(divided.contents);

    if (divided.defaultExport) {
      const exportName = createCode.defaultExport(divided.defaultExport);
      outputAst = outputAst.concat(exportName);
    }
  }

  return node;
};

const MATCH_DEFINE = /^(define|require)$/;

/**
 * Process the AST in the hope of finding expression at the top
 *
 * @param {object} Program CST tree from parser
 * @returns {object} Possibly modified CST
 */
const process = (program) => {
  //console.dir(program);

  const requireNodes = program.selectNodesByType('CallExpression').filter((item) => {
    return item.callee &&
      item.callee.name &&
      MATCH_DEFINE.test(item.callee.name);
  }).map((item) => {
    console.log(item.childElements.length);

    return ''; //processExpression(item);
  });

  //console.dir(requireNodes);

  // TODO: Should somehow make sure that those Nodes end up in the tree

  return program;
};


/**
 * Convert the given input JavaScript code from Require.js to
 * use EcmaScript imports.
 *
 * @param {string} input JavaScript code
 * @param {Object} options Options passed, if any
 * @param {bool} options.verbose Shall the actions be printed out
 * @return {string|bool} JavaScript code or false when failed
 */
const convert = (input, options) => {
  this.options = options || {};
  this.options.verbose = typeof this.options.verbose === 'boolean' ? this.options.verbose : false;

  let program = parseCode(input);

  program = process(program);

  try {
    return program.getSourceCode();
  }
  catch (error) {
    console.error('Generating JavaScript failed');
    console.error(error);
  }

  return false;
};

module.exports = convert;

// Exported so that can be unit tested
module.exports._defineToImports = defineToImports;
module.exports._getNameAndContents = getNameAndContents;
module.exports._addAstImports = addAstImports;
module.exports._processExpression = processExpression;
module.exports._process = process;
