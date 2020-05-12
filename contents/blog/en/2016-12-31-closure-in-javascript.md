---
title: Understanding Closure In Javascript
slug: understanding-closure-in-javascript
published_date: 2016-12-31
language: en
type: blog
---

Whenever we declare a variable, it is immediately given a scope. The scope which belongs to a variable depends to where it was declared on the code.

```
<?php
$foo = 'bar';
function printFooValue() {
    echo($foo);
}
printFooValue(); /* produce error 'Undefined variable' */
```

If we run the example, it will throw 'undeclared variable' error. Therefore we can conclude that whenever we make a function, it will make its own scope isolated from outside the function.

This behavior can be easily found in many other programming languages such as C, Java, or Ruby. However scope in Javascript behave differently.

``` js
var foo = 'bar';
function printFooValue() {
    console.log(foo);
}
printFooValue(); // produce output 'bar'
```

If we run example above, it will print out 'bar'. This shows us that even though we declare the variable outside a function, it is still recognized inside the function after we call out the function. Now look at the example below.

``` js
function printFooValue() {
    var bar = 'foo';
    console.log(bar);
}
printFooValue() // 'bar'
console.log(bar) // throw error 'Undefined variable'
```

Variable 'bar' which is declared inside a function is not recognized outside the function so it will throw an `unrecognized variable` error. Therefore we find that whenever we make a function in Javascript, it will create its own scope and a snapshot of enviroment outside. This particular scoping behavior is popularly known as __lexical scoping__.

## Closure

``` js
function multiplyBy(x) {
    function multipleByX(y) {
        return x * y;
    }
    return multipleByX;
}
var multiplyBy2 = multiplyBy(2);
var multiplyBy10 = multiplyBy(10);
console.log(multiplyBy2(3)); // 6
console.log(multiplyBy10(5)); // 50
```

In programming languages which do not support lexical scoping, local variable will be erased after function's call. But it is not applied in Javascript. In example above, `x` can still be accessed by `multipleByX` function despite `multipleBy` has been invoked. This happens because `multipleByX` still save a scope outside of it. This concept is known as a closure.

> _Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created._ - [Mozilla Developer Network](https://developer.mozilla.org/en/docs/Web/JavaScript/Closures)

## Private Method in Javascript
We already know that javascript has no OOP concept. But we can still emulate a private method by utilize closure. Look at example below:

``` js
function Giraffe() {
    var eatingObject = 'leaves';

    function eat() {
        console.log('Giraffe is eating ' + place);
    }

    return {
        eating: function() {
            eat();
        },
        changeFood: function(food) {
            eatingObject = food;
        }
    };
}
var babyGiraffe = Giraffe();
babyGiraffe.eat(); // error 'Undefined property'
babyGiraffe.eatingObject; // error 'Undefined property'
babyGiraffe.eating(); // output 'Giraffe is eating leaves'
babyGiraffe.changeFood('french fries');
babyGiraffe.eating(); // output 'Giraffe is eating french fries'
```

`Giraffe` function return an object which contains two properties, `eating` and `changeFood`. Because of lexical scoping, these two properties save scope from `Giraffe` which are `eatingObject` and `eat` function. Therefore when `babyGiraffe.eating` and `babyGiraffe.changeFood` were called, they can still be accessed. The example above also shows that `eatingObject` and `eat` can only be accessed via properties which were returned by `Giraffe` function. This kind of model is often be used to avoid __global scope pollution__, and is popularly known as __module pattern__.

---

Lexical scoping and closure are fundamental foundation of Javascript programming. The funny thing is, i often applied these kind of concept without knowing how it is working. So i think i should write more about Javascript basics on the future.

