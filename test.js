/*
Name:           fibonacci - test.js
Source & docs:  https://github.com/fvdm/nodejs-fibonacci
Feedback:       https://github.com/fvdm/nodejs-fibonacci/issues
License:        Unlicense (public domain)
*/

'use strict';

const EventEmitter = require( 'events' ).EventEmitter;
const dotest = require( 'dotest' );
const app = require( './' );

let evResult = false;
let evDone = false;

const iterations = 1000;
const expNumber = '43466557686937456435688527675040625802564660517371780402481'
  + '7290895365554179490518904038798400792551692959225930803226347752096896232'
  + '3987332247116164299644090653318793829896964992851600370447613779516684922'
  + '8875';


// process events
app.on( 'result', result => {
  evResult = result;
} );

app.on( 'done', result => {
  evDone = result;
} );


// module basics
dotest.add( 'Module', test => {
  const isEE = ( app instanceof EventEmitter );

  test()
    .isObject( 'fail', 'exports', app )
    .isExactly( 'fail', 'interface is EventEmitter', isEE, true )
    .isFunction( 'fail', '.iterate', app && app.iterate )
    .isFunction( 'fail', '.kill', app && app.kill )
    .done();
} );


// iterate
dotest.add( 'Method .iterate - limit', test => {
  const result = app.iterate( iterations );

  test()
    .isObject( 'fail', '.iterate return', result )
    .isExactly( 'fail', '.iterate .number', result && result.number, expNumber )
    .done();
} );


// events
dotest.add( 'Events', test => {
  const ms = 1000;

  dotest.log( 'info', 'Waiting ' + ms + ' ms for event completion' );

  setTimeout( () => {
    test()
      .isObject( 'fail', 'Event result', evResult )
      .isObject( 'fail', 'Event done', evDone )
      .info( 'Number found in ' + dotest.colorStr( 'yellow', evDone.ms ) + ' ms' )
      .done();
  }, ms );
} );


// kill
dotest.add( 'Method .kill', test => {
  let result = {};
  let snapshot = {};

  app.on( 'result', res => {
    result = res;

    if ( res.ms >= 100 ) {
      app.kill();
      snapshot = result;

      test()
        .isExactly( 'fail', '.doWhile', app && app.doWhile, false )
        .isExactly( 'fail', 'unchanged result', result.number, snapshot.number )
        .done();
    }
  } );

  dotest.log( 'info', 'Calculating 10000 fibonacci numbers' );
  app.iterate( 10000 );
} );


// Start the tests
dotest.run();
