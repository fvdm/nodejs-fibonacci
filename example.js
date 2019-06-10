/* eslint-disable */

const fibonacci = require ('fibonacci');

// Return last result object
fibonacci.on ('done', console.log);

// Run 1000 iterations
fibonacci.iterate (1000);
