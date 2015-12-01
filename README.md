fibonacci
=========

Module for [node.js](http://nodejs.org/) to calculate fibonacci numbers for one or endless iterations.

[![Codeship](https://codeship.com/projects/77d46fa0-838f-0132-73bd-3a0eca12b649/status?branch=master)](https://codeship.com/projects/58151)

Using the [bignum](https://github.com/justmoon/node-bignum) module it can return numbers of any size, instead of being limited by the hardcoded javascript `Number.MAX_LIMIT`.


Usage
-----

### Just one

Find one fibonacci number at 3000 iterations:

```js
var fibonacci = require ('fibonacci');
var bigNumber = fibonacci.iterate (3000);
console.log (bigNumber);
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

**WARNING: it is very important that you run the `iterate()` function AFTER the `.on('result')` event, otherwise the iteration will continue forever without emitting the events!**

```js
fibonacci.on ('result', function (num) {
  console.log (num.iterations +' / '+ num.number +'\n');
  if (num.ms > 4000) {
    console.log ('Done!');
    fibonacci.kill ();
  }
});

// run this AFTER everything
fibonacci.iterate ();
```

Here you see I use the **[result](#result--resultobject-)** event to catch each result,
the num.**ms** property to figure out how many milliseconds have passed
and finally **[kill()](#kill)** to stop the iteration.


Installation
------------

### Build essentials

The 'bignum' dependency requires build essentials such as *gcc* and *make*.
When you install this module with [npm](https://www.npmjs.com/) it might fail,
but at least it will tell you which build tools you are missing.
Refer to your OS community to figure out how to get them.

* Debian/Ubuntu systems: `sudo apt-get install build-essential`
* Mac OSX: install xCode Command Line Tools


### Module

`npm install fibonacci`


Functions
---------


### iterate ( [max_iterations] )

Run the iteration

**max_iterations** (optional) - limit the amount of iterations.
Without this argument it will continue untill **[kill()](#kill)** is called,
the process terminated or system ran out of memory.

**Returns:** the last result as object, with these elements:

property   | type    | description
:----------|:--------|:-----------------
number     | string  | calculated number
length     | string  | number of digits
iterations | string  | amount of iterations to find number
ms         | integer | duration in milliseconds


### kill()

Stop the iteration loop.

**Returns:** nothing


Events
------

### result ( resultObject )

Emitted when a result is found.

**Callback parameters:**

*resultObject* with these elements:

property   | type    | description
:----------|:--------|:-----------------
number     | string  | calculated number
length     | string  | number of digits
iterations | string  | amount of iterations to find number
ms         | integer | duration in milliseconds


### done ( resultObject )

Emitted when `max_itereations` is reached,
see *[result](#result--resultobject-)* event for details.


### stop ( reason )

Emitted when the iteration has stopped without user interaction. For now only used to catch *infinite* loops, if any.

**Returns:** object with these elements:

property    | type   | description
:-----------|:-------|:---------------------------
reason      | string | `infinity`
max_limit   | string | value of `Number.MAX_LIMIT`
last_result | object | [resultObject](#result--resultobject-) of last number
iterations  | number | total iterations ran
intended    | number | amount if iterations intended to run


License
-------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
