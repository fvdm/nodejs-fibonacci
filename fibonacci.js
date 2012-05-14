/* 
This file is copyleft.
You can do whatever you want, just don't copyright it.

Source: https://github.com/fvdm/nodejs-fibonacci
Update: 2012-05-14T23:34:00+0100

Description:
This function calculates a fibonacci nummber after given iterations.
Using the 'bignum' module, it can return numbers of any size! Istead of
being limited by the hardcoded JavaScript 'Number.MAX_LIMIT'.

It returns an object with these elements:

* number     - the number as string
* length     - the number of digits
* iterations - how many iterations it took
* ms         - duration in milliseconds

Usage:
var fibonacci = require('fibonacci');
var bigNumber = fibonacci.iterate( 3000 );
console.log( bigNumber );

Get all numbers:
WARNING: THIS CONTINUES FOREVER !!!
         Kill with fibonacci.kill();

fibonacci.on( 'result', function( number ) {
	console.log( number.iterations +') '+ number.number );
	if( number.ms > 10000 ) {
		fibonacci.kill();
	}
});
fibonacci.iterate();
*/

var	bignum = require('bignum'),
	EventEmitter = require('events').EventEmitter;

var app = new EventEmitter();

app.iterate = function( limit ) {
	var	next = bignum(1),
		last = bignum(0),
		loop = bignum(0),
		start = new Date().getTime();
	
	app.doWhile = true;
	
	while( app.doWhile ) {
		loop = loop.add(1);
		cur = last;
		last = next;
		next = next.add(cur);
		
		var result = {
			number:		next.toString(),
			length:		next.toString().length,
			iterations:	loop.toString(),
			ms:			new Date().getTime() - start
		}
		
		app.emit( 'result', result );
		
		// found the one
		if( limit !== undefined && loop == limit ) {
			app.doWhile = false;
			return result;
		}
		
		// catch infinity
		if( next == 'Infinity' ) {
			app.doWhile = false;
			app.emit( 'stop', {
				reason:			'infinity',
				max_limit:		Number.MAX_LIMIT,
				last_result:	result,
				iterations:		loop.toString(),
				intended:		limit ? limit : false
			});
			break;
		}
	}
}

app.kill = function() {
	app.doWhile = false;
}

// ready
module.exports = app;