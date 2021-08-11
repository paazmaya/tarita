/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */


const fs = require('fs'),
  path = require('path');

const tape = require('tape');
const espree = require('espree');

//const fixtureDir = path.join(__dirname, 'fixtures');
const expectedDir = path.join(__dirname, 'expected');

/**
 * Parse the given input via espree parser
 *
 * @param  {string} input JavaScript code
 * @return {object}       AST returned from espree
 */
const parseEspree = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const ast = espree.parse(data, {
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

  return ast;
};

/*
tape('', (test) => {
  const MATCH_JS = /\.js$/;
  const files = fs.readdirSync(fixtureDir)
    .filter((item) => {
      return MATCH_JS.test(item);
    }).map((item) => {
      console.log(item);
      return path.join(fixtureDir, item);
    });

  files.forEach((filepath) => {
    console.log(filepath);
    const ast = parseEspree(filepath);
    console.log(ast.body);

    //test.ok(ast.body, 'Has body, as should');
  });

  test.end();
});
*/

tape('espree - file: expected/no-function-arguments.js', (test) => {
  // export default Object.freeze({ pi: 3.14 });
  const filepath = path.join(expectedDir, 'no-function-arguments.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 1);

  test.equal(ast.body[0].type, 'ExportDefaultDeclaration');
  test.equal(ast.body[0].declaration.type, 'CallExpression');
  test.equal(ast.body[0].declaration.callee.type, 'MemberExpression');
  test.equal(ast.body[0].declaration.arguments[0].type, 'ObjectExpression');
  test.equal(ast.body[0].declaration.arguments[0].properties[0].type, 'Property');
  test.equal(ast.body[0].declaration.arguments[0].properties[0].key.type, 'Identifier');
  test.equal(ast.body[0].declaration.arguments[0].properties[0].key.name, 'pi');
  test.equal(ast.body[0].declaration.arguments[0].properties[0].value.type, 'Literal');
  test.equal(ast.body[0].declaration.arguments[0].properties[0].value.value, 3.14);

  test.end();
});

tape('espree - file: expected/only-comments.js', (test) => {
  const filepath = path.join(expectedDir, 'only-comments.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 0);

  test.equal(ast.comments.length, 6);
  test.equal(ast.comments[0].type, 'Block');
  test.equal(ast.comments[1].type, 'Line');
  test.equal(ast.comments[2].type, 'Block');
  test.equal(ast.comments[3].type, 'Line');
  test.equal(ast.comments[4].type, 'Block');
  test.equal(ast.comments[5].type, 'Line');
  test.end();
});

tape('espree - file: expected/only-dependencies.js', (test) => {
  // import underscore from 'underscore';
  // import jquery from 'jquery';
  const filepath = path.join(expectedDir, 'only-dependencies.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 2);

  test.equal(ast.body[0].type, 'ImportDeclaration');
  test.equal(ast.body[0].specifiers[0].type, 'ImportDefaultSpecifier');
  test.equal(ast.body[0].specifiers[0].local.type, 'Identifier');
  test.equal(ast.body[0].specifiers[0].local.name, 'underscore');

  test.equal(ast.body[1].type, 'ImportDeclaration');
  test.equal(ast.body[1].specifiers[0].type, 'ImportDefaultSpecifier');
  test.equal(ast.body[1].specifiers[0].local.type, 'Identifier');
  test.equal(ast.body[1].specifiers[0].local.name, 'jquery');

  test.end();
});

tape('espree - file: expected/only-return.js', (test) => {
  const filepath = path.join(expectedDir, 'only-return.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 1);

  test.equal(ast.body[0].type, 'ExportDefaultDeclaration');
  test.equal(ast.body[0].declaration.type, 'ObjectExpression');
  test.equal(ast.body[0].declaration.properties[0].type, 'Property');
  test.equal(ast.body[0].declaration.properties[0].key.type, 'Identifier');
  test.equal(ast.body[0].declaration.properties[0].key.name, 'semver');
  test.equal(ast.body[0].declaration.properties[0].value.type, 'ObjectExpression');
  test.equal(ast.body[0].declaration.properties[0].value.properties.length, 3);
  test.equal(ast.body[0].declaration.properties[0].value.properties[0].type, 'Property');
  test.equal(ast.body[0].declaration.properties[0].value.properties[0].key.name, 'major');
  test.equal(ast.body[0].declaration.properties[0].value.properties[1].type, 'Property');
  test.equal(ast.body[0].declaration.properties[0].value.properties[1].key.name, 'minor');
  test.equal(ast.body[0].declaration.properties[0].value.properties[2].type, 'Property');
  test.equal(ast.body[0].declaration.properties[0].value.properties[2].key.name, 'patch');

  test.end();
});

tape('espree - file: expected/return-object.js', (test) => {
  const filepath = path.join(expectedDir, 'return-object.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 5);

  test.equal(ast.body[0].type, 'ImportDeclaration');
  test.equal(ast.body[0].specifiers[0].type, 'ImportDefaultSpecifier');
  test.equal(ast.body[0].specifiers[0].local.type, 'Identifier');
  test.equal(ast.body[0].specifiers[0].local.name, '_');

  test.equal(ast.body[1].type, 'ImportDeclaration');
  test.equal(ast.body[1].specifiers[0].type, 'ImportDefaultSpecifier');


  test.equal(ast.body[2].type, 'ExpressionStatement');
  test.equal(ast.body[2].expression.type, 'Literal');
  test.equal(ast.body[2].expression.value, 'use strict');

  test.equal(ast.body[3].type, 'VariableDeclaration');
  test.equal(ast.body[3].declarations[0].type, 'VariableDeclarator');
  test.equal(ast.body[3].declarations[0].id.name, 'GreenLantern');
  test.equal(ast.body[3].declarations[0].init.arguments.length, 1);

  test.equal(ast.body[4].type, 'ExportDefaultDeclaration');
  test.equal(ast.body[4].declaration.type, 'ObjectExpression');
  test.equal(ast.body[4].declaration.properties.length, 3);

  test.equal(ast.body[4].declaration.properties[0].type, 'Property');
  test.equal(ast.body[4].declaration.properties[0].key.name, 'jqueryVer');
  test.equal(ast.body[4].declaration.properties[0].value.type, 'MemberExpression');
  test.equal(ast.body[4].declaration.properties[0].value.property.name, 'version');

  test.end();
});

tape('espree - file: expected/return-single.js', (test) => {
  const filepath = path.join(expectedDir, 'return-single.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 3);

  test.equal(ast.body[0].type, 'ImportDeclaration');
  test.equal(ast.body[0].specifiers[0].type, 'ImportDefaultSpecifier');

  test.equal(ast.body[1].type, 'VariableDeclaration');
  test.equal(ast.body[2].type, 'ExportDefaultDeclaration');
  test.end();
});

tape('espree - file: expected/single-item.js', (test) => {
  const filepath = path.join(expectedDir, 'single-item.js');
  const ast = parseEspree(filepath);

  test.equal(ast.body.length, 1);
  test.equal(ast.body[0].type, 'ImportDeclaration');
  test.equal(ast.body[0].specifiers[0].type, 'ImportDefaultSpecifier');

  test.end();
});
