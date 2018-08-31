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

const fs = require('fs'),
  path = require('path'),
  execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

tape('cli - should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (err, stdout) => {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli - should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('tarita [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli - should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('tarita [options] <file|directory>') !== -1, 'Help appeared');
  });

});

tape('cli - should create folder for output', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-o', 'tmp', 'tests/fixtures'], null, (err, stdout) => {
    test.ok(fs.existsSync('tmp'), 'Temporary folder exists');
  });

});

tape('cli - should use verbose messages', (test) => {
  test.plan(2);

  execFile('node', [pkg.bin, '-v', 'not-here'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('Going to process total of') !== -1, 'Verbose text seen for total');
    test.ok(stdout.trim().indexOf('Outputting to directory:') !== -1, 'Verbose text seen for output directory');
  });

});

tape('cli - should show current file when verbose', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-v', '-o', 'tmp', 'tests/fixtures/single-item.js'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('Processing file ') !== -1, 'Verbose text seen');
  });

});

tape('cli - should complain when package.json is gone', (test) => {
  test.plan(1);

  const nameFrom = 'package.json',
    nameTo = '_package.json';

  fs.renameSync(nameFrom, nameTo);

  execFile('node', [pkg.bin, '-h'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Could not read') !== -1, 'Complaint seen');
    fs.renameSync(nameTo, nameFrom);
  });

});

tape('cli - should complain when non existing option used', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-g'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Invalid option ') !== -1, 'Complaint seen');
  });

});

tape('cli - should use matches when given', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-v', '-o', 'tmp', '-M', '\\.jsx$', 'tests/fixtures'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('/react-component.jsx') !== -1, 'React component file seen via verbosity');
  });

});
