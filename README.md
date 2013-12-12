nodejs-fibonacci
================

Module for [Node.js](http://nodejs.org/) to calculate fibonacci numbers for one or endless iterations.

Using the [bignum](https://github.com/justmoon/node-bignum) module, it can return numbers of any size! Instead of being limited by the hardcoded JavaScript *Number.MAX_LIMIT*.


## Installation

### Build essentials

The 'bignum' dependency requires build essentials such as *gcc* and *make*. When you install this module with [NPM](http://npmjs.org/) it might fail, but at least it will tell you which build tools you are missing. Refer to your OS community to figure out how to get them, on Debian/Ubuntu systems simply run this command:

```
sudo apt-get install build-essential
```

On Mac OSX you need to install [Xcode](https://itunes.apple.com/en/app/xcode/id497799835?mt=12), only installing the Command Line Tools won't be enough.


### Module

To install the module with NPM:

```
sudo npm -g install fibonacci
```

## Usage

### Just one

Find one fibonacci number at 3000 iterations:

```js
var fibonacci = require('fibonacci');
var bigNumber = fibonacci.iterate( 3000 );
console.log( bigNumber )
```

Result:

```js
{ number: '410615886307971260333568378719267105220125108637369252408885430926905584274113403731330491660850044560830036835706942274588569362145476502674373045446852160486606292497360503469773453733196887405847255290082049086907512622059054542195889758031109222670849274793859539133318371244795543147611073276240066737934085191731810993201706776838934766764778739502174470268627820918553842225858306408301661862900358266857238210235802504351951472997919676524004784236376453347268364152648346245840573214241419937917242918602639810097866942392015404620153818671425739835074851396421139982713640679581178458198658692285968043243656709796000',
length: 627,
iterations: '3000',
ms: 208 }
```

### Many numbers

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

### stop ( reason )

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
