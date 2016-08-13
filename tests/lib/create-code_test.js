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
  createCode = require('../../lib/create-code');

tape('export default named assumed variable', (test) => {

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
