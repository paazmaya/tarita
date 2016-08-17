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
  path = require('path');

const tape = require('tape'),
  tarita = require('../index');

const fixtureDir = path.join(__dirname, 'fixtures'),
  expectedDir = path.join(__dirname, 'expected');

tape('all exported things are functions', (test) => {
  test.plan(2);

  test.equal(typeof tarita, 'function');
  test.equal(tarita.length, 2, 'takes two arguments');
});

tape('already has exports', (test) => {
  test.plan(2);

  const filepath = path.join(fixtureDir, 'already-exports.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const output = tarita(fixture);

  test.equal(typeof output, 'string');
  test.equal(output.substr(0, 20), fixture.substr(0, 20), 'output is about the same as input');
});

tape('already has imports', (test) => {
  test.plan(2);

  const filepath = path.join(fixtureDir, 'already-imports.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const output = tarita(fixture);

  test.equal(typeof output, 'string');
  test.equal(output.substr(0, 20), fixture.substr(0, 20), 'output is about the same as input');
});

tape('no function arguments', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'no-function-arguments.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'no-function-arguments.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('input contains only comments', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'only-comments.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-comments.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected);
});

tape('input contains only dependencies', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'only-dependencies.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-dependencies.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('input contains only return', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'only-return.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'only-return.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('react component should not produce any output', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'react-component.jsx');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const output = tarita(fixture);

  test.notOk(output);
});

tape('return an object of things', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'return-object.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'return-object.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('return a single item', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'return-single.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'return-single.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});

tape('single required item', (test) => {
  test.plan(1);

  const filepath = path.join(fixtureDir, 'single-item.js');
  const fixture = fs.readFileSync(filepath, 'utf8');
  const expected = fs.readFileSync(path.join(expectedDir, 'single-item.js'), 'utf8');
  const output = tarita(fixture);

  test.equal(output, expected.trim());
});
