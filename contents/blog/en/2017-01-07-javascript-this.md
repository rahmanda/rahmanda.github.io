---
title: Javascript This
slug: javascript-this
published_date: 2017-01-07
language: en
type: blog
translations:
  id: /id/javascript-this/
---

It is often to use `this` operator when you want to implement a class or an object under object oriented programming language. Javascript doesn't have object oriented paradigm, however Javascript supports `this` keyword. Unlike other common programming language, in Javascript `this` will behave differently.

On normal condition, calling `this` will return __global__ object. Look at example below:

``` js
console.log(this === window); // output 'true'
function callingGlobal() {
    console.log(this === window);
}
callingGlobal(); // output 'true' (?)
```

As we can see above, we can access global object via `this` operator even though it is inside a function scope. However if we set `use strict` on the beginning of the function body, `this` operator will not refer to global object because currently it has a different context than outside of the function.

``` js
console.log(this == window); // output 'true'
function callingGlobal() {
    'use strict';
    console.log(this == window);
}
callingGlobal(); // output undefined
```

Some of native Javascript's functions set `this` to be a certain object just like what we have on `addEventListener`'s function.

``` js
function changeBodyBackground(e) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    this.style.backgroundColor = color;
}
var $body = document.getElementsByTagName('body')[0];
$body.addEventListener('click', changeBodyBackground, false); // body's background color change when it is clicked
```

In example above, `this` operator is referring to `body`'s DOM object which has been attached to an event handler. But we can also change `this` so it refers to an object that we define ourselves. Suppose instead of changing `body` background color, we want the `h1` to change its background color when a user clicks `body` element.

``` js
// changeBodyBackground
var $body = document.getElementsByTagName('body')[0];
var $h1 = document.getElementsByTagName('h1')[0];
$body.addEventListener('click', changeBodyBackground.bind($h1), false); // h1 will change color whenever we click the body
```

By using `bind`, we can apply the value of `this` according to the object which we input as parameter. Aside from `bind`, we can also use `call` and `apply` function. The difference is when `call` or `apply` is called, the corresponding function will be run.

``` js
var someObject = {
    arr: [2, 3, 5, 8, 13]
};

function multiplyWith(x, y) {
    for (var i = 0; i < this.arr.length; i++ ) {
        this.arr[i] = this.arr[i] * x * y;
    }
    return this.arr;
}

multiplyWith.call(someObject, 10, 2); // [40, 60, 100, 160, 260]
multiplyWith.apply(someObject, [10, 2]); // [40, 60, 100, 160, 260]
```

> There is a difference between `call` and `apply` when inserting function's parameters. In `call` case, it accepts parameter explicitly, whereas `apply` accepts parameter in array form.

In [previous articles](http://ambercat.rahmanda.net/code/2016/12/31/closure-javascript.html) i had explained about module pattern. By using `this` inside of a method, we can call object's methods or properties on the same module just like what the examples is shown below.

``` js
function Cat(type) {
    return {
        walking: function() {
            return type + ' is walking');
        },
        walkingWhileEating: function() {
            return this.walking() + 'while eating..';
        }
    };
}

var siamese = Cat('siamese');
siamese.walkingWhileEating(); // siamese is walking while eating
```

---

Dealing with `this` is indeed tricky, especially when it is used outside module pattern. Please always add `use strict` on your Javascript's code for the sake of consistency and to get off from modifying global object.

