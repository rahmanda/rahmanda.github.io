---
title: Modifying Styles with setAttribute is Bad
summary: Most of the time, you probably don't need to modify styles from JS. But when you do, don't use setAttribute.
slug: modifying-styles-with-setAttribute-is-bad
published_date: 2020-06-16
language: en
type: blog
translations:
  id: /blog/id/memodifikasi-style-dengan-setAttribute-itu-buruk/
---

Generally speaking, modifying styles from JS should be considered as a last resort because most of the time we can use class selectors to get by. However, it becomes a different story when we need to build something like a responsive svg chart, game, parallax effect etc. For those cases, there is no other way than using JS to get the job done.

When we want to modify styles from JS, we have two options: using `setAttribute` and style property. In this article, I will explain why I prefer to use the latter.

## Why setAttribute is bad?

Suppose we want to set a container with `width` is equal to 50% of the screen width and `height` is equal to screen height. Below is how we do it with `setAttribute`.

``` js

const containerWidth = window.innerWidth / 2
const containerHeight = window.innerHeight

document.querySelector('.container').setAttribute('style', `width: ${containerWidth}px; height: ${containerHeight}px`)

```

Now the container is rendered properly. Problem solved.

Let's say later on the code, we want to update the `height` style only with value `initial`. Can we do this?

``` js
document.querySelector('.container').setAttribute('style', 'height: initial')
```

The answer is, hell no!

When we set the container's height for the second time, the `setAttribute` will remove all of previous modification and replace it with a new one. Thus, we lose the `width` style which we have added before. To solve it, we need to apply the container's width again along with the new `height` value.

``` js
document.querySelector('.container').setAttribute('style', `width: ${containerWidth}px; height: initial`)
```

The problem is, this approach is not scalable if we have many styles on the same element. This is because it will be a horrible experience to keep track of all style modification with a string.


## Style property to the rescue

If I need to maintain a complex style modification with JS, I prefer to use DOM's style property. Unlike `setAttribute`, the style property will not flush the existing modification every time we add a new style. This is because with style property, we need to manually add the style attributes one by one. Below is how we can make the previous example to use style property.

``` js
const containerWidth = window.innerWidth / 2
const containerHeight = window.innerHeight

const $container = document.querySelector('.container')
$container.style.width = `${containerWidth}px`
$container.style.height = `${containerHeight}px`
```

And then when we need to update one style, we can target that one style only by still keeping the other modifications.

``` js
$container.style.height = 'initial'
```

We can also create a function to make it easier to modify multiple styles at once without repeatedly write style declaration like this:

``` js
function applyStyles(el, styleObj) {
  Object.keys(styleObj).forEach(styleProp => {
    el.style[styleObj] = styleObj[styleProp]
  })
}

const containerWidth = window.innerWidth / 2
const containerHeight = window.innerHeight

const $container = document.querySelector('.container')

applyStyles($container, { width: `${containerWidth}px`, height: `${containerHeight}px` })
```

This approach is way much better than using `setAttribute`.

One thing to note is when we need to add a style property which has more than one word like `background-color`, we should write it as `backgroundColor` and so on. This is exactly the same way as when we write styles in JSX because, well, JSX is compiled to JS.

``` js
// instead of background-color, we should write it as backgroundColor

document.querySelector('.container').style.backgroundColor = '#fefefe'
```

Hopefully that helps!
