/*
Name:           fibonacci
Description:    This function calculates fibonacci numbers for endless iterations
Author:         Franklin (https://fvdm.com)
Source & docs:  https://github.com/fvdm/nodejs-fibonacci
Contact:        https://github.com/fvdm/nodejs-fibonacci/issues
License:        Unlicense (Public Domain, see LICENSE file)
*/

const bignum = require ('bn.js');
const { EventEmitter } = require ('events');

module.exports = new EventEmitter();
module.exports.doWhile = false;


/**
 * Start iteration
 *
 * @param   {number}  [limit=0]  Run fibonacci iterations
 * @return  {object}             result
 */

module.exports.iterate = function (limit = 0) {
  let next = new bignum (1);
  let cur = new bignum (-1);
  let last = new bignum (0);
  let loop = new bignum (0);
  let start = new Date().getTime();
  let result = {};

  limit = limit && new bignum (limit);
  module.exports.doWhile = true;

  while (module.exports.doWhile) {
    // prev cur -> now last
    // prev next -> now cur
    last = cur;
    cur = next;
    next = cur.add (last);

    result.number = next.toString();
    result.length = next.toString().length;
    result.iterations = loop.toString();
    result.ms = new Date().getTime() - start;

    module.exports.emit ('result', result);

    // found the one
    if (limit && loop.eq (limit)) {
      module.exports.doWhile = false;
      module.exports.emit ('done', result);
    }

    // count
    loop = loop.add (new bignum (1));
  }

  return result;
};


/**
 * Stop iteration
 *
 * @return {void}
 */

module.exports.kill = function () {
  module.exports.doWhile = false;
};
