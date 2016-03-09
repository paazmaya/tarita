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

const tape = require('tape'),
  tarita = require('../index');

tape('function is exported', (test) => {
  test.plan(1);

  test.equal(typeof tarita, 'function');
});

