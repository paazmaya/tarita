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

/**
 * Find the return statement for the define callback.
 *
 * @return {[type]} [description]
 */
const getLastReturn = (program) => {
  program.selectNodesByType('ReturnStatement').forEach((node) => {
    console.log(node.name, node.value);
  });
};

module.exports = getLastReturn;
