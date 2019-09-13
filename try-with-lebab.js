
const fs = require('fs');

const lebab = require('lebab');

const filepath = 'tests/fixtures/only-return.js';
const input = fs.readFileSync(filepath, 'utf8');

const output = lebab.transform(
  input,
  ['commonjs']
);

if (output.warnings.length > 0) {
  console.error('There were warnings!');
  console.error(output.warnings);
}
else {
  console.log(output.code);
}
