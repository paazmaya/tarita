/**
 * Require.js to ES7 import converter
 */
'use strict';

const fs = require('fs'),
  path = require('path');

const espree = require('espree'),
  escodegen = require('escodegen');

const readFile = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const ast = espree.parse(data, {
    ecmaVersion: 6, sourceType: 'module'
  });
  return ast;
};

const writeFile = (filepath, ast) => {
  const data = escodegen.generate(ast);

  return fs.writeFileSync(filepath, data, 'utf8');
};

