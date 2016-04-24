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

const fs = require('fs'),
  path = require('path');

const tape = require('tape'),
  tarita = require('../index');

const fixtureDir = path.join(__dirname, 'fixtures'),
  expectedDir = path.join(__dirname, 'expected');

tape('all exported things are functions', (test) => {
  test.plan(10);

  test.equal(typeof tarita, 'function');
  test.equal(tarita.length, 2, 'takes two arguments');

  test.equal(typeof tarita._defineToImports, 'function');
  test.equal(typeof tarita._getNameAndContents, 'function');
  test.equal(typeof tarita._addAstImports, 'function');
  test.equal(typeof tarita._addAstExport, 'function');
  test.equal(typeof tarita._processExpression, 'function');
  test.equal(typeof tarita._process, 'function');
  test.equal(typeof tarita._parseCst, 'function');
  test.equal(typeof tarita._generateCst, 'function');

});

tape('already has exports', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'already-exports.js'), 'utf8');
  const output = tarita(fixture);

  test.ok(output);
});

tape('already has imports', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'already-imports.js'), 'utf8');
  const output = tarita(fixture);

  test.ok(output);
});

tape('no function arguments', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'no-function-arguments.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'no-function-arguments.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('input contains only comments', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'only-comments.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-comments.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected);
});

tape('input contains only dependencies', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'only-dependencies.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-dependencies.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('input contains only return', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'only-return.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-return.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('react component should not produce any output', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'react-component.jsx'), 'utf8');
  const output = tarita(fixture);

  test.not(output);
});

tape('return an object of things', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'return-object.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'return-object.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('return a single item', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'return-single.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'return-single.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('single required item', (test) => {
  test.plan(1);

  const fixture = fs.readFileSync(path.join(fixtureDir, 'single-item.js'), 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'single-item.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});
