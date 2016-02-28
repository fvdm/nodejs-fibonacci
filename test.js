/*
Name:           fibonacci - test.js
Source & docs:  https://github.com/fvdm/nodejs-fibonacci
Feedback:       https://github.com/fvdm/nodejs-fibonacci/issues
License:        Unlicense (public domain)
*/

var path = require ('path');
var dir = path.dirname (module.filename);

var EventEmitter = require ('events').EventEmitter;
var pkg = require (path.join (dir, 'package.json'));
var app = require (path.join (dir));

var eventResultEmitted = false;
var eventDoneEmitted = false;
var errors = 0;
var warnings = 0;
var queue = [];
var next = 0;

var queueLength = 4;


// Setup
var iterations = 1000;
var expectNumber = '43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875';


/**
 * ANSI colorize a string
 *
 * @param color {String} - The color to add
 * @param str {String} - The string to alter
 * @returns {String}
 */

function colorStr (color, str) {
  var colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    yellow: '\u001b[33m',
    blue: '\u001b[34m',
    magenta: '\u001b[35m',
    cyan: '\u001b[36m',
    gray: '\u001b[37m',
    bold: '\u001b[1m',
    plain: '\u001b[0m'
  };

  return colors [color] + str + colors.plain;
}


/**
 * console.log with style
 *
 * @param [type] {String=plain} - Formatting style
 * @param str {String} - The string to alter
 * @returns {void}
 */

function log (type, str) {
  var types = {
    fail: ['red', 'FAIL'],
    good: ['green', 'good'],
    warn: ['yellow', 'warn'],
    info: ['cyan', 'info']
  };

  if (!str) {
    str = type;
    type = 'plain';
  }

  switch (type) {
    case 'error': console.log (colorStr ('red', colorStr ('bold', 'ERROR   ')) + str + '\n'); break;
    case 'note': console.log (colorStr ('bold', str)); break;
    case 'plain': console.log (str); break;
    default:
      console.log (colorStr (types[type][0], types[type][1]) + '    ' + str);
      break;
  }
}


/**
 * Detect and wrap string type
 *
 * @param str {String} - The string
 * @returns {String}
 */

function typeStr (str) {
  if (typeof str === 'string') {
    str = '"' + str + '"';
  } else if (str instanceof Object) {
    str = 'Object';
  } else if (str instanceof Array) {
    str = 'Array';
  } else if (str instanceof Error) {
    str = 'Error';
  }

  return colorStr ('magenta', str);
}

// handle exits
process.on ('exit', function processExit () {
  console.log ();
  log ('info', errors + ' errors');
  log ('info', warnings + ' warnings');
  console.log ();

  if (errors) {
    process.exit (1);
  } else {
    process.exit (0);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function uncaughtException (err) {
  console.log (err);
  console.log ();
  console.log (err.stack);
  console.log ();
  errors++;
});


/**
 * Queue to prevent flooding
 *
 * @returns {void}
 */

function doNext () {
  next++;
  console.log();
  if (queue [next]) {
    console.log ();
    queue [next] ();
  }
}


/**
 * doTest checks for error
 * else runs specified tests
 *
 * @param {Error} err
 * @param {String} label
 * @param {Array} tests
 * @returns {void}
 *
 * doTest(err, 'label text', [
 *   ['fail', 'feeds', typeof feeds, 'object'],
 *   ['warn', 'music', music instanceof Array, true],
 *   ['info', 'tracks', music.length]
 * ]);
 */

function doTest (err, label, tests) {
  var level = 'good';
  var test;
  var i;

  if (err instanceof Error) {
    log ('error', label);
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.log (err.stack);
    console.log ();
    errors++;

    doNext ();
    return;
  }

  log ('note', colorStr ('blue', '(' + (next + 1) + '/' + queueLength + ') ') + label);

  for (i = 0; i < tests.length; i++) {
    test = {
      level: tests [i] [0],
      label: tests [i] [1],
      result: tests [i] [2],
      expect: tests [i] [3]
    };

    if (test.result === test.expect) {
      log ('good', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is exactly ' + typeStr (test.expect));
    }

    if (test.level === 'fail' && test.result !== test.expect) {
      errors++;
      level = 'fail';
      log ('fail', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'warn' && test.result !== test.expect) {
      warnings++;
      level = level !== 'fail' && 'warn';
      log ('warn', colorStr ('blue', test.label) + ': ' + typeStr (test.result) + ' is not ' + typeStr (test.expect));
    }

    if (test.level === 'info') {
      log ('info', colorStr ('blue', test.label) + ': ' + typeStr (test.result));
    }
  }

  doNext ();
}


// module basics
queue.push (function () {
  doTest (null, 'module', [
    ['fail', 'exports', typeof app, 'object'],
    ['fail', 'instance', app instanceof EventEmitter, true],
    ['fail', '.iterate', app && app.iterate instanceof Function, true],
    ['fail', '.kill', app && app.kill instanceof Function, true]
  ]);
});

// process events
app.on ('result', function () {
  eventResultEmitted = true;
});

app.on ('done', function (result) {
  eventDoneEmitted = true;

  doTest (null, 'event result', [
    ['fail', 'result emit', eventResultEmitted, true]
  ]);

  doTest (null, 'event done', [
    ['fail', 'result number', result && typeof result.number, 'string'],
    ['fail', 'result length', result && typeof result.length, 'number'],
    ['fail', 'result iterations', result && result.iterations, String (iterations)],
    ['fail', 'result ms', result && typeof result.ms, 'number'],
    ['info', 'result ms', result && result.ms],
    ['fail', 'result value', result && result.number, expectNumber]
  ]);
});

// iterate
queue.push (function () {
  var result = app.iterate (iterations);

  doTest (null, 'iterate return', [
    ['fail', 'result type', result instanceof Object, true],
    ['fail', 'result number', result && result.number, expectNumber]
  ]);
});


// Start the tests
log ('note', 'Running tests...\n');
log ('note', 'Node.js:       ' + process.versions.node);
log ('note', 'Module:        ' + pkg.version);
console.log ();

queue [0] ();
