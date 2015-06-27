var util = require ('util');

// Setup
var iterations = '1000';
var expectNumber = '43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875';
var fibonacci = require ('./');

var eventResultEmitted = false;
var eventDoneEmitted = false;
var theResult = null;

// handle exits
var errors = 0;
process.on ('exit', function () {
  if (!eventDoneEmitted) {
    console.log ('\033[1m\033[31mFAIL\033[0m - event done (not emitted)');
    errors++;
  }

  if (theResult) {
    console.log ('\nINFO: it took '+ theResult.ms +' ms to find the '+ iterations +'th fibonacci number');
  }

  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
})

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest (passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ]);
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error ('\033[1m\033[31mFAIL\033[0m - '+ label +'\n');
    console.error (util.inspect(err, false, 10, true));
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if (testErrors.length === 0) {
      console.log ('\033[1m\033[32mgood\033[0m - '+ label);
    } else {
      console.error ('\033[1m\033[31mFAIL\033[0m - '+ label +' ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}

// METHODS
queue.push (function test_methods () {
  doTest (null, 'methods', [
    ['iterate', typeof fibonacci.iterate === 'function'],
    ['kill', typeof fibonacci.kill === 'function']
  ])
});

fibonacci.on ('result', function event_result (result) {
  eventResultEmitted = true;
});

// by iterations
fibonacci.on ('done', function event_done (result) {
  eventDoneEmitted = true;
  theResult = result;

  doTest (null, 'event result', [
    ['result emit', eventResultEmitted === true]
  ]);

  doTest (null, 'event done', [
    ['result number', typeof result.number === 'string'],
    ['result length', typeof result.length === 'number' && result.length >= 1],
    ['result iterations', result.iterations === iterations],
    ['result ms', typeof result.ms === 'number'],
    ['result value', result.number === expectNumber]
  ]);
});

// iterate
queue.push (function test_iterate () {
  var result = fibonacci.iterate (iterations);
  doTest (null, 'iterate return', [
    ['result type', result instanceof Object],
    ['result number', result.number === expectNumber]
  ]);
});

// Start the tests
queue [0] ();
