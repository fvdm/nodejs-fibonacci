/*
Name:           fibonacci - test.js
Source & docs:  https://github.com/fvdm/nodejs-fibonacci
Feedback:       https://github.com/fvdm/nodejs-fibonacci/issues
License:        Unlicense (public domain)
*/

var EventEmitter = require ('events').EventEmitter;
var dotest = require ('dotest');
var app = require ('./');


var eventResult = false;
var eventDone = false;

var iterations = 1000;
var expectNumber = '43466557686937456435688527675040625802564660517371780402481729089536555417949051890403879840079255169295922593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875';


// process events
app.on ('result', function (result) {
  eventResult = result;
});

app.on ('done', function (result) {
  eventDone = result;
});


// module basics
dotest.add ('Module', function (test) {
  test ()
    .isObject ('fail', 'exports', app)
    .isExactly ('fail', 'interface is EventEmitter', app instanceof EventEmitter, true)
    .isFunction ('fail', '.iterate', app && app.iterate)
    .isFunction ('fail', '.kill', app && app.kill)
    .done ();
});


// iterate
dotest.add ('Method .iterate', function (test) {
  var result = app.iterate (iterations);

  test ()
    .isObject ('fail', '.iterate return', result)
    .isExactly ('fail', '.iterate .number', result && result.number, expectNumber)
    .done ();
});


// events
dotest.add ('Events', function (test) {
  dotest.onExit (function () {
    test ()
      .isObject ('fail', 'Event result', eventResult)
      .isObject ('fail', 'Event done', eventDone)
      .info ('Number found in ' + dotest.colorStr ('yellow', eventDone.ms) + ' ms')
      .done ();
  });
});


// Start the tests
dotest.run ();

