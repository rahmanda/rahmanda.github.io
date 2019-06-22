---
title: Improving Javascript's Code Readability with Hoisting
summary: Unpopuler opinion towards hoisting and its usability
---

Many people don't like hoisting because of its confusing nature. Moreover, super populer style guide like [airbnb/javascript](https://github.com/airbnb/javascript#functions) recommends not to use hoisting at all. Why does it happen though?

To know the reason behind it, let's take a look at an example below.

``` js
add(1, 3);

function add(a, b) {
  return a + b;
}
```

What is the return value of `add` function call above?

The return value is `4` even though the `add` function is declared after its function call. Because Javascript has hoisting behaviour, this kind of function declaration will automatically be moved to the very top of a scope during the execution. That is why as long as we  declare the functions in the same scope, those function calls will not produce reference error.

This kind of behaviour is not common to find in other programming languages. Normally, we expect an error every time there is a call before the function declaration. Many programmers, especially people who have experience in other programming language, find hoisting confusing and decide to always declare functions early in the program. Some of them [even take it further](https://github.com/airbnb/javascript#functions--declarations) to use this kind of coding style to make sure that they won't encounter hoisting behaviour.

``` js
add(1, 3); // ReferenceError: can't access lexical declaration `add' before initialization

const add = function addFn(a, b) {
  return a + b;
}
```

In my opinion, above example just complicates things even more because it is now longer and we have to name our function twice. It doesn't clear the confusion issue that we have in hoisting because this pattern is uncommon in other programming languages as well.

## Readability on anti-hoisting vs hoisting-first code

Below example is a simple code which doesn't make use of *hoisting* (even though the *hoisting* behaviour is still there).

``` js
// anti-hoisting.js

import path from 'path';
import fs from 'fs';
import glob from 'glob';

function getFilename(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function readFile(filePath) {
  return {
    path: filePath,
    filename: getFilename(filePath),
    content: fs.readFileSync(filePath, 'utf-8'),
  };
}

function getAllFiles() {
  const globPattern = path.join(__dirname, 'src/*.md');
  const filePaths = glob.sync(globPattern);
  const files = filePaths.map(readFile);
  return files;
}

export default getAllFiles;
```

In my opinion, this kind of coding style is not readable because of several things:

**Hard to identify the main function and the exported functions**

The first things I always expect to know every time I dig into a Javascript code are the main function and the exported functions. However in our case above, we can't easily identify them because we need to read all of the code to the very bottom. On a very long lines of code, this will be even harder.

**Hard to follow the entire flow of the program**

Because every function needs to be declared early in a program, we can't easily follow how the program works.

Let say we want to know the entire process of the previous example and we have found our main function declaration, `getAllFiles` at the bottom of the program. As we read the body of the function, we know that there is a `readFile` function call. So, we have to move to the earlier code to find where it is being declared. After we find `readFile` declaration, there is another function call inside of it, which is `getFilename`. Then we have to look at the previous lines until there is no more function call aside from external functions.

So, to follow the entire process of the code, we need to read in reverse order from bottom to top. Of course this is not a common way for us to read because we are used to read from top to bottom.

One of the initial reasons to write all of the declarations on the very top was to know all of the available functions. However in reality, every time there is a function call, we still need to move again to where it is being declared in order to know how the function works.

Now, compare it with this example which make use of hoisting (or I like to call it *hoisting-first* method).

``` js
// hoisting-first.js

import path from 'path';
import fs from 'fs';
import glob from 'glob';

export default getAllFiles;

function getAllFiles() {
  const globPattern = path.join(__dirname, 'src/*.md');
  const filePaths = glob.sync(globPattern);
  const files = filePaths.map(readFile);
  return files;
}

function readFile(filePath) {
  return {
    path: filePath,
    filename: getFilename(filePath),
    content: fs.readFileSync(filePath, 'utf-8'),
  };
}

function getFilename(filePath) {
  return path.basename(filePath, path.extname(filePath));
}
```

What I did to the code was reordering the declaration of the functions from the previous code. This way, it is easier to find the main function because now the export declaration is located earlier in the code. In addition to that, it is easier to follow the flow of the program because every function declaration is placed immediately after the function that uses it. So, we only need to read naturally from top to bottom without every look back to the previous declarations.

The code which is written in hoisting-first method is also easier to read on a module which has a lot of functions. Even though I don't recommend to write a lot of code on a single module or file, I just want to explain that this coding style might be beneficial for certain situation.

## The downsides of hoisting-first

If you want to code in hoisting-first way and you are fond of using eslint on your text-editor, you may want to reconfigure your eslint settings. This is because some of the eslint preset, especially [airbnb config](https://www.npmjs.com/package/eslint-config-airbnb), set up a bunch of *anti-hoisting* rules. Therefore, these kind of rules need to be turned off so that there is no error when coding or doing a git commit.

However after the *anti-hoisting* rules have been turned off, it becomes more free to declare functions. Therefore, we need to restrain ourselves to not turn our code into a mess.

## Closing words

Because the nature of hoisting has been part of the Javascript, writing code with hoisting-first style should be understood for every aspiring Javascript coders. I don't try to argue that my method is the best of the best. All of this write up are solely for giving an insight from different perspective.

If you aren't convinced of using hoisting-first style after reading this article, it is entirely fine. At least, now you understand a little bit more about hoisting (hopefully).

## Extra

Because I was very curious about why hoisting nature was added on Javascript, I looked for articles about this matter and I found an interesting answer which came from [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), the creator of the Javascript himself. He stated something like this on twitter:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/DmitrySoshnikov?ref_src=twsrc%5Etfw">@DmitrySoshnikov</a> <a href="https://twitter.com/jashkenas?ref_src=twsrc%5Etfw">@jashkenas</a> yes, function declaration hoisting is for mutual recursion &amp; generally to avoid painful bottom-up ML-like order</p>&mdash; BrendanEich (@BrendanEich) <a href="https://twitter.com/BrendanEich/status/33403701100154880?ref_src=twsrc%5Etfw">February 4, 2011</a></blockquote>

Based on his tweet, I can say that my hoisting-first method has been well aligned with the real purpose of the hoisting itself from the very beginning.

What do you think?
