---
title: Updating inset style via JS
slug: updating-inset-style-via-js
published_date: 2020-06-16
language: en
type: til
translations:
  id: /til/id/#mengubah-style-inset-via-js
---

Related to [this post](/blog/en/modifying-styles-with-setAttribute-is-bad/), I find that updating inset style is not always easy especially when it is involving two opposing sides, such as `top` vs `bottom`, or `left` vs `right`. If you need to update one side value and then later on you need to update the opposite side value, you may end up getting an inconsistent display if you don't set the default value for both sides.

``` js
// This is a no

document.querySelector('.container').style.top = 0
// ... later on the code
document.querySelector('.container').style.bottom = '200px'


// This is a yes

document.querySelector('.container').style.top = 0
document.querySelector('.container').style.bottom = 'unset'
// ... later on the code
document.querySelector('.container').style.top = 'unset'
document.querySelector('.container').style.bottom = '200px'
```


