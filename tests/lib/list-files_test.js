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

const path = require('path');

const tape = require('tape'),
  listFiles = require('../../lib/list-files');

tape('does not crash with non existing filepath', (test) => {
  test.plan(1);

  const options = {
    recurse: false,
    matcher: /\.js$/
  };
  const list = listFiles('not-here', options);

  test.deepEqual(list, []);
});

tape('gets a list of first level in fixtures', (test) => {
  test.plan(1);

  const filepath = path.join(__dirname, '..', 'fixtures');
  const options = {
    recurse: false,
    matcher: /\.js$/
  };
  const list = listFiles(filepath, options);

  test.equal(list.length, 9);
});

tape('gets a list of test files recursively', (test) => {
  test.plan(1);

  const filepath = path.join(__dirname, '..');
  const options = {
    recurse: true,
    matcher: /_test\.js$/
  };
  const list = listFiles(filepath, options);

  test.equal(list.length, 5);
});

tape('lists a single given file', (test) => {
  test.plan(1);

  const filepath = path.join(__dirname, '..', 'index_test.js');
  const options = {
    recurse: true,
    matcher: /_test\.js$/
  };
  const list = listFiles(filepath, options);

  test.deepEqual(list, [filepath]);
});

tape('lists nothing when a single file given does not match', (test) => {
  test.plan(1);

  const filepath = path.join(__dirname, '..', 'index_test.js');
  const options = {
    recurse: true,
    matcher: /_tape\.js$/
  };
  const list = listFiles(filepath, options);

  test.deepEqual(list, []);
});
