/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */



// The tests in this file are to get to know internals of CST, not really to test it.

const tape = require('tape'),
  parseCode = require('../../lib/parse-code');

tape('variable definition', (test) => {

  const code = 'var i = 44;';

  const program = parseCode(code);

  test.equal(code, program.getSourceCode());
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

tape('import from set of things', (test) => {

  const code = 'import { A } from "b";';

  const program = parseCode(code);

  test.equal(code, program.getSourceCode());
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

  test.equal(program.body[0].specifiers[0].childElements.length, 1);

  test.deepEqual(program.body[0].specifiers[0], program.body[0].childElements[4]);

  test.equal(program.body[0].childElements[0].type, 'Keyword');
  test.notOk(program.body[0].childElements[0].name);
  test.equal(program.body[0].childElements[0].value, 'import');
  test.notOk(program.body[0].childElements[0].isNode);

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

  test.equal(program.body[0].childElements[4].childElements.length, 1);

  test.equal(program.body[0].childElements[4].childElements[0].type, 'Identifier');
  test.equal(program.body[0].childElements[4].childElements[0].name, 'A');
  test.notOk(program.body[0].childElements[4].childElements[0].value);

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

tape('import default', (test) => {

  const code = 'import A from "b";';

  const program = parseCode(code);

  test.equal(code, program.getSourceCode());
  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'ImportDeclaration');
  test.equal(program.body[0].childElements.length, 8);

  test.equal(program.body[0].specifiers.length, 1);
  test.equal(program.body[0].specifiers[0].type, 'ImportDefaultSpecifier');
  test.notOk(program.body[0].specifiers[0].name);
  test.notOk(program.body[0].specifiers[0].value);

  test.equal(program.body[0].specifiers[0].childElements.length, 1);

  test.deepEqual(program.body[0].specifiers[0], program.body[0].childElements[2]);

  test.equal(program.body[0].specifiers[0].local.type, 'Identifier');
  test.equal(program.body[0].specifiers[0].local.name, 'A');
  test.notOk(program.body[0].specifiers[0].local.value);

  test.equal(program.body[0].childElements[0].type, 'Keyword');
  test.notOk(program.body[0].childElements[0].name);
  test.equal(program.body[0].childElements[0].value, 'import');
  test.notOk(program.body[0].childElements[0].isNode);

  test.equal(program.body[0].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[1].name);
  test.equal(program.body[0].childElements[1].value, ' ');

  test.equal(program.body[0].childElements[2].type, 'ImportDefaultSpecifier');
  test.notOk(program.body[0].childElements[2].name);
  test.notOk(program.body[0].childElements[2].value);

  test.notOk(program.body[0].childElements[2].isToken);
  test.notOk(program.body[0].childElements[2].isWhitespace);
  test.ok(program.body[0].childElements[2].isCode);
  test.notOk(program.body[0].childElements[2].isComment);
  test.notOk(program.body[0].childElements[2].isNonCodeToken);
  test.ok(program.body[0].childElements[2].isNode);
  test.notOk(program.body[0].childElements[2].isStatement);
  test.notOk(program.body[0].childElements[2].isPattern);
  test.notOk(program.body[0].childElements[2].isAssignable);
  test.notOk(program.body[0].childElements[2].isFragment);
  test.ok(program.body[0].childElements[2].isModuleSpecifier);

  test.equal(program.body[0].childElements[2].childElements.length, 1);

  test.equal(program.body[0].childElements[2].childElements[0].type, 'Identifier');
  test.equal(program.body[0].childElements[2].childElements[0].name, 'A');
  test.notOk(program.body[0].childElements[2].childElements[0].value);

  test.notOk(program.body[0].childElements[2].childElements[0].isToken);
  test.notOk(program.body[0].childElements[2].childElements[0].isWhitespace);
  test.ok(program.body[0].childElements[2].childElements[0].isCode);
  test.notOk(program.body[0].childElements[2].childElements[0].isComment);
  test.notOk(program.body[0].childElements[2].childElements[0].isNonCodeToken);
  test.ok(program.body[0].childElements[2].childElements[0].isNode);
  test.notOk(program.body[0].childElements[2].childElements[0].isStatement);
  test.ok(program.body[0].childElements[2].childElements[0].isPattern);
  test.ok(program.body[0].childElements[2].childElements[0].isAssignable);
  test.notOk(program.body[0].childElements[2].childElements[0].isFragment);
  test.ok(program.body[0].childElements[2].childElements[0].isExpression);

  test.equal(program.body[0].childElements[3].type, 'Whitespace');
  test.notOk(program.body[0].childElements[3].name);
  test.equal(program.body[0].childElements[3].value, ' ');

  test.equal(program.body[0].childElements[4].type, 'Identifier');
  test.notOk(program.body[0].childElements[4].name);
  test.equal(program.body[0].childElements[4].value, 'from');

  test.equal(program.body[0].childElements[5].type, 'Whitespace');
  test.notOk(program.body[0].childElements[5].name);
  test.equal(program.body[0].childElements[5].value, ' ');

  test.equal(program.body[0].childElements[6].type, 'StringLiteral');
  test.notOk(program.body[0].childElements[6].name);
  test.equal(program.body[0].childElements[6].value, 'b');

  test.equal(program.body[0].childElements[6].childElements.length, 1);
  test.equal(program.body[0].childElements[6].childElements[0].type, 'String');
  test.equal(program.body[0].childElements[6].childElements[0].value, 'b');

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});

tape('export default named number assignment', (test) => {

  const program = parseCode('export default total = 5;');

  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'ExportDefaultDeclaration');
  test.equal(program.body[0].childElements.length, 6);

  test.notOk(program.body[0].specifiers);

  test.equal(program.body[0].firstChild.type, 'Keyword');
  test.notOk(program.body[0].firstChild.name);
  test.equal(program.body[0].firstChild.value, 'export');

  test.equal(program.body[0].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[1].name);
  test.equal(program.body[0].childElements[1].value, ' ');

  test.equal(program.body[0].childElements[2].type, 'Keyword');
  test.notOk(program.body[0].childElements[2].name);
  test.equal(program.body[0].childElements[2].value, 'default');

  test.equal(program.body[0].childElements[3].type, 'Whitespace');
  test.notOk(program.body[0].childElements[3].name);
  test.equal(program.body[0].childElements[3].value, ' ');

  test.equal(program.body[0].childElements[4].type, 'AssignmentExpression');
  test.notOk(program.body[0].childElements[4].name);
  test.notOk(program.body[0].childElements[4].value);
  test.equal(program.body[0].childElements[4].childElements.length, 5);

  test.equal(program.body[0].childElements[4].childElements[0].type, 'Identifier');
  test.equal(program.body[0].childElements[4].childElements[0].name, 'total');
  test.notOk(program.body[0].childElements[4].childElements[0].value);

  test.equal(program.body[0].childElements[4].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[4].childElements[1].name);
  test.equal(program.body[0].childElements[4].childElements[1].value, ' ');

  test.equal(program.body[0].childElements[4].childElements[2].type, 'Punctuator');
  test.notOk(program.body[0].childElements[4].childElements[2].name);
  test.equal(program.body[0].childElements[4].childElements[2].value, '=');

  test.equal(program.body[0].childElements[4].childElements[3].type, 'Whitespace');
  test.notOk(program.body[0].childElements[4].childElements[3].name);
  test.equal(program.body[0].childElements[4].childElements[3].value, ' ');

  test.equal(program.body[0].childElements[4].childElements[4].type, 'NumericLiteral');
  test.notOk(program.body[0].childElements[4].childElements[4].name);
  test.equal(program.body[0].childElements[4].childElements[4].value, 5);

  //console.log(program.body[0].childElements[4].childElements[4]);

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});

tape('export default named variable', (test) => {

  const program = parseCode('export default total;');

  test.equal(program.type, 'Program');
  test.equal(program.body.length, 1);

  test.equal(program.body[0].type, 'ExportDefaultDeclaration');
  test.equal(program.body[0].childElements.length, 6);

  test.notOk(program.body[0].specifiers);

  test.equal(program.body[0].firstChild.type, 'Keyword');
  test.notOk(program.body[0].firstChild.name);
  test.equal(program.body[0].firstChild.value, 'export');
  test.equal(program.body[0].firstChild.childElements.length, 0);

  test.equal(program.body[0].childElements[1].type, 'Whitespace');
  test.notOk(program.body[0].childElements[1].name);
  test.equal(program.body[0].childElements[1].value, ' ');
  test.equal(program.body[0].childElements[1].childElements.length, 0);

  test.equal(program.body[0].childElements[2].type, 'Keyword');
  test.notOk(program.body[0].childElements[2].name);
  test.equal(program.body[0].childElements[2].value, 'default');
  test.equal(program.body[0].childElements[2].childElements.length, 0);

  test.equal(program.body[0].childElements[3].type, 'Whitespace');
  test.notOk(program.body[0].childElements[3].name);
  test.equal(program.body[0].childElements[3].value, ' ');
  test.equal(program.body[0].childElements[3].childElements.length, 0);

  test.equal(program.body[0].childElements[4].type, 'Identifier');
  test.equal(program.body[0].childElements[4].name, 'total');
  test.notOk(program.body[0].childElements[4].value);
  test.equal(program.body[0].childElements[4].childElements.length, 1);

  test.equal(program.body[0].childElements[4].childElements[0].type, 'Identifier');
  test.notOk(program.body[0].childElements[4].childElements[0].name);
  test.equal(program.body[0].childElements[4].childElements[0].value, 'total');

  test.equal(program.body[0].lastChild.type, 'Punctuator');
  test.notOk(program.body[0].lastChild.name);
  test.equal(program.body[0].lastChild.value, ';');

  test.end();
});
