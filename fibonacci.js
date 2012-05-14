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
var bigNumber = fibonacci( 5000 );
console.log( bigNumber );
*/

var bignum = require('bignum');

module.exports = function( limit ) {
	var	next = bignum(1),
		last = bignum(0),
		loop = bignum(0),
		start = new Date().getTime(),
		ok = true;
	
	while( ok ) {
		loop = loop.add(1);
		cur = last;
		last = next;
		next = next.add(cur);
		
		// found it
		if( loop == limit ) {
			ok = false;
			return {
				number:		next.toString(),
				length:		next.toString().length,
				iterations:	loop.toString(),
				ms:			new Date().getTime() - start
			}
		}
		
		// catch infinity
		if( next == 'Infinity' ) {
			ok = false;
			break;
		}
	}
}