---
title: Formatting Date and Time with Intl.DateTimeFormat
---

Formatting date and time has been a common problem for web developers because of several reasons:

1. Almost all kinds of website need to display date and time.
2. Most likely your back-end APIs can only provide date and time data in universal format, which is a timestamp.

There are many ways to format date and time depending on software or design requirement. However, normally we don't like to make an in-house module or function for it because it is quite a hassle.

The only way to format date and time via native Javascript's API is by messing around with `Date` class. To start formatting, we need to provide a timestamp from API as a parameter to `Date` and then call its constructor function to instantiate the object.

``` js
const datetime = new Date('2019-06-17T08:00:00Z'); // input date in ISO 8601 format
```

From the `datetime` variable, we can get date, month, year and time which can be useful for formatting. The thing is, we can't get a name of the day and month automatically so that we need to do mapping ourselves manually.

``` js
// getting date, month, year, hours, minutes and seconds
const date = datetime.getDate();
const month = datetime.getMonth(); // month start from 0
const year = datetime.getFullYear();
const hour = datetime.getHours();
const minute = datetime.getMinutes();
const second = datetime.getSeconds();

// simplest way to format date and time
console.log(`${date}-${month + 1}-${year} ${hour}:${minute}:${second}`);

// getting day in integer
const day = datetime.getDay() // 0 is Sunday, 1 is Monday etc..

// mapping for days and months
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

console.log(`${days[day]}, ${date} ${months[month]} ${year}`); // Monday, 17 June 2019
```

If we're only dealing with a single locale, perhaps it is an easy peasy. However if we need to supports multiple locales, it can be a bit complicated because we have to create a lot of different mappings. Now you know why adding [moment.js](https://momentjs.com) + internationalization as dependency can quite significantly increase our total Javascript size.

By using ES6, now we can use `Intl.DateTimeFormat` to format date and time without creating our own function or using external libraries.

``` js
const datetime = new Date('2019-06-17T08:00:00Z');

console.log(new Intl.DateTimeFormat('en').format(datetime)); // locale en return m/d/yyyy format as default

// customization
let options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

console.log(new Intl.DateTimeFormat('en', options).format(datetime)); // Monday, June 17, 2019

// full customization
options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
};

console.log(new Intl.DateTimeFormat('en', options).format(datetime));
// Monday, June 17, 2019, 3:00:00 PM GMT+7
// timezone will depend on your browser's locale configuration
```
Complete guidelines for `Intl.DateTimeFormat` customization can be read in [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

By using `Intl.DateTimeFormat`, we can reduce our Javascript size because we no longer need to make a function ourselves or using external library. Based on [caniuse](https://caniuse.com/#search=Intl), the API has covered more than 90% of global internet user. Therefore, suffice it to say that `Intl.DateTimeFormat` is safe to use in production at the moment.

The downside of `Intl.DateTimeFormat` is that we can't fully control over the shape of the format itself. We can only depend on the formats which have been standardized by ECMA. Take a look at the previous example. The returned value of our full customization is `Monday, June 17, 2019, 3:00:00 PM GMT+7`. If we want to remove the comma separator between the date and time, it is not possible to do it via the options. We need to edit the returned string from the API by hand to remove the comma. It is definitely not an ideal solution because we still have to manually reformat the date and time.

If you need to support browser such as IE 6-10, Opera Mini and UC Browser, you have to provide polyfill for this API becuase these browsers doesn't support `Intl.DateTimeFormat`. I recommend using polyfill from [Polyfill.io](https://polyfill.io/v3/) because it can smartly detect which browsers that need polyfill and only serve it when necessary.

``` html
<!-- Add script below for polyfill -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
```

I think I tend to choose `Intl.DateTimeFormat` rather than making the function myself or using library because it is the standard of the Javascript and I don't have to deal with all of possible formats for multiple locales. If later on there is a difference between my UI and the design, I guess I am ready to argue with the designer for the sake of saving every extra KB of Javascript which are invaluable for user. Hope that helps!
