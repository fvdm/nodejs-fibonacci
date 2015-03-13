/*
Name:           fibonacci
Description:    This function calculates fibonacci numbers for one or endless iterations.
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-fibonacci
Contact:        https://github.com/fvdm/nodejs-fibonacci/issues
License:        Unlicense / Public Domain (see UNLICENSE FILE)
                <https://github.com/fvdm/nodejs-fibonacci/raw/master/UNLICENSE>
*/

var bignum = require ('bignum');
var EventEmitter = require ('events') .EventEmitter;
var app = new EventEmitter ();

app.iterate = function (limit) {
  var next = bignum (1);
  var cur = bignum (-1);
  var last = bignum (0);
  var loop = bignum (0);
  var start = new Date () .getTime ();

  app.doWhile = true;

  while (app.doWhile) {
    last = cur; // prev cur -> now last
    cur = next; // prev next -> now cur
    next = cur.add (last);

    var result = {
      number: next.toString (),
      length: next.toString () .length,
      iterations: loop.toString (),
      ms: new Date () .getTime () - start
    }

    app.emit ('result', result);

    // found the one
    if (limit !== undefined && loop == limit) {
      app.doWhile = false;
      app.emit ('done', result);
      return result;
    }

    // catch infinity
    if (next === 'Infinity') {
      app.doWhile = false;
      app.emit ('stop', {
        reason: 'infinity',
        max_limit: Number.MAX_LIMIT.toString (),
        last_result: result,
        iterations: loop.toString (),
        intended: limit ? limit : null
      });
      break;
    }

    // count
    loop = loop.add (1);
  }
}

app.kill = function () {
  app.doWhile = false;
}

// ready
module.exports = app;
