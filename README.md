nodejs-fibonacci
================

Module for [Node.js](http://nodejs.org/) to calculate fibonacci numbers for one or endless iterations.

Using the [bignum](https://github.com/justmoon/node-bignum) module, it can return numbers of any size! Instead of being limited by the hardcoded JavaScript *Number.MAX_LIMIT*.

[![Build Status](https://secure.travis-ci.org/fvdm/nodejs-fibonacci.png?branch=master)](http://travis-ci.org/fvdm/nodejs-fibonacci)

## Installation

#### Build essentials

The 'bignum' dependency requires build essentials such as *gcc* and *make*. When you install this module with [NPM](http://npmjs.org/) it might fail, but at least it will tell you which build tools you are missing. Refer to your OS community to figure out how to get them, on Debian/Ubuntu systems simply run this command:

```
sudo apt-get install build-essential
```

#### Module

To install the module with NPM:

```
npm install fibonacci
```

## Usage

#### Just one

Just find one fibonacci number at 3000 iterations:

```js
var fibonacci = require('fibonacci');
var bigNumber = fibonacci.iterate( 3000 );
console.log( bigNumber )
```

Result:

```js
{ number: '664390460366960072280217847866028384244163512452783259405579765542621214161219257396449810982999820391132226802809465132446349331994409434926019045342723749188530316994678473551320635101099619382973181622585687336939784373527897555489486841726131733814340129175622450421605101025897173235990662770203756438786517530547101123748849140252686120104032647025145598956675902135010566909783124959436469825558314289701354227151784602865710780624675107056569822820542846660321813838896275819753281371491809004412219124856375121694811728724213667814577326618521478357661859018967313354840178403197559969056510791709859144173304364898001',
  length: 627,
  iterations: '3000',
  ms: 169 }
```

#### Many numbers

Get all numbers up to 4 seconds.

**WARNING: it is very important that you run the *iterate()* function AFTER the *.on('result') event*, otherwise the iteration will continue forever without emitting the events!**

```js
fibonacci.on( 'result', function( num ) {
	console.log( num.iterations +' / '+ num.number +'\n' );
	if( num.ms > 4000 ) {
		console.log( 'Done!' );
		fibonacci.kill();
	}
});

// run this AFTER everything
fibonacci.iterate();
```

Here you see I use the **[result](#result--resultobject-)** event to catch each result, the num.**ms** property to figure out how many milliseconds have passed and finally **[kill()](#kill)** to stop the iteration.

## Functions

### iterate( [max_iterations] )

Run the iteration

**max_iterations** (optional) - limit the amount of iterations. Without this argument it will continue untill **[kill()](#kill)** is called or the process terminated.

**Returns:** the last result as object, with these elements:

* number - the number as string
* length - the number of digits
* iterations - how many iterations it took
* ms - duration in milliseconds

### kill()

Stop the iteration loop.

**Returns:** nothing

## Events

### result ( resultObject )

Emitted when a result is found.

**Callback parameters:**

*resultObject* with these elements:

* number     - the number as string
* length     - the number of digits
* iterations - how many iterations it took
* ms         - duration in milliseconds

### done ( resultObject )

Emitted when *max_itereations* is reached, see *[result](#result--resultobject-)* event for details

### stop( reason )

Emitted when the iteration has stopped without user interaction. For now only used to catch *infinite* loops, if any.

**Returns:** object with these elements:

* reason - string infinity,
* max_limit - string value of Number.MAX_LIMIT,
* last_result - [resultObject](#result--resultobject-) of last result,
* iterations - number of iterations ran,
* intended - numbers of iteratios intended to run, or false when none

## License

This module is **copyleft** meaning you can do anything you want except copyrighting it.
It would be nice to refer back to http://github.com/fvdm/nodejs-fibonacci for later reference, but this is not required.
