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

const tape = require('tape'),
  parseCode = require('../../lib/parse-code');

tape('variable definition', (test) => {

  const program = parseCode('var i = 44;');

  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'VariableDeclaration');
  test.equal(program.body[0].childElements.length, 4);

  test.equal(program.body[0].firstChild.type, 'Keyword');
  test.equal(program.body[0].firstChild.value, 'var');

  test.equal(program.body[0].childElements[0].type, 'Keyword');
  test.notOk(program.body[0].childElements[0].name);
  test.equal(program.body[0].childElements[0].value, 'var');

  test.equal(program.body[0].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[1].name);
  test.equal(program.body[0].childElements[1].value, ' ');

  test.equal(program.body[0].childElements[2].type, 'VariableDeclarator');
  test.notOk(program.body[0].childElements[2].name);
  test.notOk(program.body[0].childElements[2].value);

  test.equal(program.body[0].childElements[2].firstChild.type, 'Identifier');
  test.equal(program.body[0].childElements[2].firstChild.name, 'i');
  test.notOk(program.body[0].childElements[2].firstChild.value);

  test.equal(program.body[0].childElements[2].lastChild.type, 'NumericLiteral');
  test.notOk(program.body[0].childElements[2].lastChild.name);
  test.equal(program.body[0].childElements[2].lastChild.value, 44);

  test.equal(program.body[0].childElements[3].type, 'Punctuator');
  test.notOk(program.body[0].childElements[3].name);
  test.equal(program.body[0].childElements[3].value, ';');

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});

tape('import from', (test) => {

  const program = parseCode('import { A } from "b";');

  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'ImportDeclaration');
  test.equal(program.body[0].childElements.length, 12);

  test.equal(program.body[0].specifiers.length, 1);
  test.equal(program.body[0].specifiers[0].type, 'ImportSpecifier');
  test.notOk(program.body[0].specifiers[0].name);
  test.notOk(program.body[0].specifiers[0].value);

  test.equal(program.body[0].specifiers[0].local.type, 'Identifier');
  test.equal(program.body[0].specifiers[0].local.name, 'A');
  test.notOk(program.body[0].specifiers[0].local.value);

  test.equal(program.body[0].specifiers[0].imported.type, 'Identifier');
  test.equal(program.body[0].specifiers[0].imported.name, 'A');
  test.notOk(program.body[0].specifiers[0].imported.value);

  test.equal(program.body[0].childElements[0].type, 'Keyword');
  test.notOk(program.body[0].childElements[0].name);
  test.equal(program.body[0].childElements[0].value, 'import');

  test.equal(program.body[0].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[1].name);
  test.equal(program.body[0].childElements[1].value, ' ');

  test.equal(program.body[0].childElements[2].type, 'Punctuator');
  test.notOk(program.body[0].childElements[2].name);
  test.equal(program.body[0].childElements[2].value, '{');

  test.equal(program.body[0].childElements[3].type, 'Whitespace');
  test.notOk(program.body[0].childElements[3].name);
  test.equal(program.body[0].childElements[3].value, ' ');

  test.equal(program.body[0].childElements[4].type, 'ImportSpecifier');
  test.notOk(program.body[0].childElements[4].name);
  test.notOk(program.body[0].childElements[4].value);

  //console.log(program.body[0].childElements[4]);

  test.equal(program.body[0].childElements[5].type, 'Whitespace');
  test.notOk(program.body[0].childElements[5].name);
  test.equal(program.body[0].childElements[5].value, ' ');

  test.equal(program.body[0].childElements[6].type, 'Punctuator');
  test.notOk(program.body[0].childElements[6].name);
  test.equal(program.body[0].childElements[6].value, '}');

  test.equal(program.body[0].childElements[7].type, 'Whitespace');
  test.notOk(program.body[0].childElements[7].name);
  test.equal(program.body[0].childElements[7].value, ' ');

  test.equal(program.body[0].childElements[8].type, 'Identifier');
  test.notOk(program.body[0].childElements[8].name);
  test.equal(program.body[0].childElements[8].value, 'from');

  test.equal(program.body[0].childElements[9].type, 'Whitespace');
  test.notOk(program.body[0].childElements[9].name);
  test.equal(program.body[0].childElements[9].value, ' ');

  test.equal(program.body[0].childElements[10].type, 'StringLiteral');
  test.notOk(program.body[0].childElements[10].name);
  test.equal(program.body[0].childElements[10].value, 'b');

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});

tape('export default named number', (test) => {

  const program = parseCode('export default total = 5;');

  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'ExportDefaultDeclaration');
  test.equal(program.body[0].childElements.length, 6);

  test.notOk(program.body[0].specifiers);

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});
