/**
 * tarita (たりた)
 * https://github.com/paazmaya/tarita
 *
 * Convert Require.js define to EcmaScript imports
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://www.paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const fs = require('fs'),
  path = require('path'),
  execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')),
  cli = 'bin/tarita.js';

tape('cli should output version number', function (test) {
  test.plan(1);

  execFile('node', [cli, '-V'], null, function (err, stdout) {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', function (test) {
  test.plan(1);

  execFile('node', [cli], null, function (err, stdout) {
    test.ok(stdout.trim().indexOf('tarita [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli should create folders for output', function (test) {
  test.plan(1);

  execFile('node', [cli, '-o', 'tmp', 'tests/fixtures'], null, function (err, stdout) {
    test.ok(fs.existsSync('tmp'), 'Temporary folder exists');
  });

});
