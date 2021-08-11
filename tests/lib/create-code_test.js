/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */


const tape = require('tape'),
  createCode = require('../../lib/create-code');

tape('"defaultExport" - export default named assumed variable', (test) => {

  const expectedCode = 'export default total;';

  const decl = createCode.defaultExport('total');

  const actualCode = decl.getSourceCode();

  test.equal(expectedCode, actualCode);
  test.equal(decl.type, 'ExportDefaultDeclaration');
  test.equal(decl.childElements.length, 6);

  test.equal(decl.firstChild.type, 'Keyword');
  test.notOk(decl.firstChild.name);
  test.equal(decl.firstChild.value, 'export');

  test.equal(decl.childElements[1].type, 'Whitespace');
  test.notOk(decl.childElements[1].name);
  test.equal(decl.childElements[1].value, ' ');

  test.equal(decl.childElements[2].type, 'Keyword');
  test.notOk(decl.childElements[2].name);
  test.equal(decl.childElements[2].value, 'default');

  test.equal(decl.childElements[3].type, 'Whitespace');
  test.notOk(decl.childElements[3].name);
  test.equal(decl.childElements[3].value, ' ');

  test.equal(decl.declaration.type, 'Identifier');
  test.equal(decl.declaration.name, 'total');
  test.notOk(decl.declaration.value);

  test.deepEqual(decl.declaration, decl.childElements[4]);

  test.equal(decl.childElements[4].type, 'Identifier');
  test.equal(decl.childElements[4].name, 'total');
  test.notOk(decl.childElements[4].value);
  test.equal(decl.childElements[4].childElements.length, 1);

  test.equal(decl.childElements[4].childElements[0].type, 'Identifier');
  test.equal(decl.childElements[4].childElements[0].name);
  test.equal(decl.childElements[4].childElements[0].value, 'total');

  test.equal(decl.lastChild.type, 'Punctuator');
  test.notOk(decl.lastChild.name);
  test.equal(decl.lastChild.value, ';');

  test.end();
});

tape('"importName" - import single thing', (test) => {

  const expectedCode = 'import $ from "jquery";';

  const decl = createCode.importName('$', 'jquery');

  const actualCode = decl.getSourceCode();

  test.equal(actualCode, expectedCode);
  test.equal(decl.type, 'ImportDeclaration');
  test.equal(decl.childElements.length, 7);

  test.equal(decl.specifiers.length, 1);
  test.equal(decl.specifiers[0].type, 'ImportDefaultSpecifier');
  test.notOk(decl.specifiers[0].name);
  test.notOk(decl.specifiers[0].value);

  test.equal(decl.specifiers[0].local.type, 'Identifier');
  test.equal(decl.specifiers[0].local.name, '$');
  test.notOk(decl.specifiers[0].local.value);

  test.equal(decl.childElements[0].type, 'Keyword');
  test.notOk(decl.childElements[0].name);
  test.equal(decl.childElements[0].value, 'import');

  test.equal(decl.childElements[1].type, 'Whitespace');
  test.notOk(decl.childElements[1].name);
  test.equal(decl.childElements[1].value, ' ');

  test.equal(decl.childElements[2].type, 'ImportDefaultSpecifier');
  test.notOk(decl.childElements[2].name);
  test.notOk(decl.childElements[2].value);

  test.equal(decl.childElements[2].childElements.length, 1);

  test.equal(decl.childElements[2].childElements[0].type, 'Identifier');
  test.equal(decl.childElements[2].childElements[0].name, '$');
  test.notOk(decl.childElements[2].childElements[0].value);

  test.equal(decl.childElements[3].type, 'Whitespace');
  test.notOk(decl.childElements[3].name);
  test.equal(decl.childElements[3].value, ' ');

  test.equal(decl.childElements[4].type, 'Identifier');
  test.notOk(decl.childElements[4].name);
  test.equal(decl.childElements[4].value, 'from');

  test.equal(decl.childElements[5].type, 'Whitespace');
  test.notOk(decl.childElements[5].name);
  test.equal(decl.childElements[5].value, ' ');

  test.equal(decl.childElements[6].type, 'StringLiteral');
  test.notOk(decl.childElements[6].name);
  test.equal(decl.childElements[6].value, 'jquery');

  test.equal(decl.childElements[6].childElements[0].type, 'String');
  test.equal(decl.childElements[6].childElements[0].value, 'jquery');

  test.equal(decl.lastChild.type, 'Punctuator');
  test.notOk(decl.lastChild.name);
  test.equal(decl.lastChild.value, ';');

  test.end();
});
