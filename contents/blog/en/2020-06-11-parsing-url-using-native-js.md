---
title: Parsing URL Using Native JS
summary: Native API is probably enough to cover most of your parsing url use cases
slug: parsing-url-using-native-js
published_date: 2020-06-12
language: en
type: blog
translations:
  id: /blog/id/parsing-url-menggunakan-native-js/
---

You might probably have used external libraries for parsing URL such as [url-parse](https://www.npmjs.com/package/url-parse) for browser or `url.parse` in Node.js. That is totally reasonable because back in the days, JS didn't have an native API for parsing URL.

It is pretty weird for a web-centric programming language like JS to not have such an API. Fortunately, JS have baked [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) and [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) into its language specification.

## URL

The usage is simple. The very basic use is by initializing the `URL` with a valid URL as a constructor parameter like this:

``` js
let url = new URL('https://example.com/path')

// Of course in browser env, we can supply parameter with window.location

url = new URL(window.location)

// We cannot supply URL with domain or path only as it will throw error
url = new URL('example.com') // TypeError: URL constructor: example.com is not a valid URL
url = new URL('/path') // TypeError: URL constructor: /path is not a valid URL
```

We can also initialize `URL` with two parameters. The first parameter is for the path, and the second parameter is for the origin URL.

``` js
let url = new URL('/new-path', 'https://example.com/path') // this is equal to new URL('https://example.com/new-path')

url = new URL('../new-path', 'https://example.com/path') // this is equal to new URL('https://example.com/new-path')
```

After initialization, we can use various attributes like path, host, and protocol from the assigned object variable.

``` js
let url = new URL('https://example.com/path?page=1&from=homepage')

console.log(url.href) // https://example.com/path
console.log(url.origin) // https://example.com
console.log(url.hostname) // example.com
console.log(url.host) // example.com
console.log(url.protocol) // https:
console.log(url.pathname) // /path
console.log(url.search) // ?page=1&from=homepage
```

The value of `url.hostname` and `url.host` will be the same if the URL doesn't have a port. If a URL has a port, it will become like this:

``` js
let url = new URL('http://127.0.0.1:5000')

console.log(url.hostname) // 127.0.0.1:5000
console.log(url.host) // 127.0.0.1
console.log(url.port) // 5000
```

Pretty neat, huh?

---

Now we have learned about parsing URL. What about search parameters?

## URLSearchParams


Parsing search or query parameters was also quite a hassle without using external library. With `URLSearchParams`, now we can easily build a valid search parameters. The initialization is quite similar with `URL`, except that now we have to supply a string of search parameters into the constructor.

``` js

let searchParams = new URLSearchParams('?page=1&from=homepage')

// we can also supply search params without question tag '?'
searchParams = new URLSearchParams('page=1&from=homepage')

searchParams.has('page') // true
searchParams.has('item[]') // false

searchParams.get('page') // 1
searchParams.get('from') // homepage


// if you have an array query, you need to use 'getAll' function
// because 'get' function will only return the value from the first occurence

searchParams = new URLSearchParams('item[]=banana&item[]=apple&item[]=orange')
searchParams.get('item[]') // banana
searchParams.getAll('item[]') // ['banana', 'apple', 'orange']
```

Modifying search params is easy thanks to its nice API.

``` js
let searchParams = new URLSearchParams('page=1&from=homepage')

searchParams.set('page', 2)
searchParams.toString() // page=2&from=homepage

searchParams.append('referral', true)
searchParams.toString() // page=2&from=homepage&referral=true

searchParams.delete('from')
searchParams.toString() // page=2&referral=true
```

> Be careful when updating an array query because `set` and `delete` function will modify search parameters recursively

Another cool thing about `URLSearchParams` is that we don't need to transform a string with special characters with `encodeURI` anymore because `URLSearchParams` will take care of it automatically when we supply the string to the `set` function.

``` js
let searchParams = new URLSearchParams('page=1&from=homepage')

// say we want to add a url to query param
searchParams.set('url', 'https://example.com/content?page=1')

// the 'url' query param will be automatically encoded
searchParams.toString() // page=1&from=homepage&url=https%3A%2F%2Fexample.com%2Fcontent%3Fpage%3D1
```

## Use Case

To make it interesting, let me give a practical example. Let's say that we want to increment the value of `page` search parameters because we are using a JS for updating a paginated content. The implementation would be something like this:

``` js
// window.location value is http://example.com/content?page=1

let url = new URL(window.location)
let searchParams = new URLSearchParams(url.search)
let currentPage = Number(searchParams.get('page'))

currentPage++

searchParams.set('page', currentPage)

// add new history without redirection
window.history.pushState({ page: currentPage }, '', searchParams.toString())
```

Actually, we don't have to initialize `URLSearchParams` because the `url` object already has a `searchParams` attribute which returns the `URLSearchParams` object. So, we can simplify our code like this:

``` js
// window.location value is http://example.com/content?page=1

let url = new URL(window.location)
let currentPage = Number(url.searchParams.get('page'))

currentPage++

url.searchParams.set('page', currentPage)

// add new history without redirection
window.history.pushState({ page: currentPage }, '', url.searchParams.toString())
```

## Compatibility

You cannot use `URL` and `URLSearchParams` natively if you need to support IE and Opera Mini browsers, or Node.js version below 10 (in Node.js v7, these APIs are still experimental). However, it is worth to use polyfill to support older generation browser because these APIs has become the standard of current JS.

