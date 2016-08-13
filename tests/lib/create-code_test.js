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
  const code = createCode.defaultExport('total');

  test.equal(code.type, 'ExportDefaultDeclaration');
  test.equal(code.childElements.length, 6);

  test.equal(code.firstChild.type, 'Keyword');
  test.notOk(code.firstChild.name);
  test.equal(code.firstChild.value, 'export');

  test.equal(code.childElements[1].type, 'Whitespace');
  test.notOk(code.childElements[1].name);
  test.equal(code.childElements[1].value, ' ');

  test.equal(code.childElements[2].type, 'Keyword');
  test.notOk(code.childElements[2].name);
  test.equal(code.childElements[2].value, 'default');

  test.equal(code.childElements[3].type, 'Whitespace');
  test.notOk(code.childElements[3].name);
  test.equal(code.childElements[3].value, ' ');

  test.equal(code.declaration.type, 'Identifier');
  test.equal(code.declaration.name, 'total');
  test.notOk(code.declaration.value);

  test.deepEqual(code.declaration, code.childElements[4]);

  test.equal(code.childElements[4].type, 'Identifier');
  test.equal(code.childElements[4].name, 'total');
  test.notOk(code.childElements[4].value);
  test.equal(code.childElements[4].childElements.length, 1);

  test.equal(code.childElements[4].childElements[0].type, 'Identifier');
  test.equal(code.childElements[4].childElements[0].name);
  test.equal(code.childElements[4].childElements[0].value, 'total');

  test.equal(code.lastChild.type, 'Punctuator');
  test.notOk(code.lastChild.name);
  test.equal(code.lastChild.value, ';');

  test.end();
});
