---
title: Using Vue's Prototype for Shared Utilities
slug: using-vue-prototype-for-shared-utilities
published_date: 2020-05-27
language: en
type: blog
---

There are several ways to create a utility function in a Vue application. However, I think Vue's prototype is the best if you want to provide shared utilities in your app. In this article, I will give several pros and cons for some approaches and explain why I choose prototype for this case.

Creating a JS module is probably the easiest way to provide a utility function. Simply write a function inside of a JS file, and then import it to your other JS file that want to use it. Below is a short example of how we can use JS module in a component.

``` js
// asset-utility.js

export function imageUrl(path) {
  return `https://cdn.com/${path}`;
}
```
``` html
<template>
  <div>
    <img :src="logoUrl">
  </div>
</template>

<script>
// then in your component
import { imageUrl } from './asset-utility';

export default {
  data() {
    return {
      logoUrl: imageUrl('/your-logo.png'),
    };
  },
};
</script>
```

Above example shows that our function can only be used once with fixed parameter. If I want to use the function again but with a different parameter, I probably need to create another `data` or `computed` with the similar code.

To make it simpler, how about calling the function directly inside the component's template? This way, we don't have to repeatedly create `data` or `computed` for every path. To do that, I need to make our function to be accessible within our component's object context.

``` html
<template>
  <!-- collection of images -->
  <div>
    <img :src="imageUrl('/poster-image-1.jpg')">
    <img :src="imageUrl('/poster-image-2.jpg')">
    <img :src="imageUrl('/poster-image-3.jpg')">
  </div>
</template>

<script>
import { imageUrl } from './asset-utility';

export default {
  methods: {
    imageUrl,
  },
};
</script>
```

Now our component is better, but this approach will get cumbersome quickly. Using this code style means that I have to write an import reference and methods every time I want to use the utility function across multiple components.

Since we need to make our function accessible from component's context object, why don't we use mixins anyway?

``` js
// refactor our utility into a mixin
// mixins/asset-utility.js
export default {
  methods: {
    imageUrl(path) {
      return `https://cdn.com/${path}`;
    },
  },
};
```

``` html
<template>
  <!-- collection of images -->
  <div>
    <img :src="imageUrl('/poster-image-1.jpg')">
    <img :src="imageUrl('/poster-image-2.jpg')">
    <img :src="imageUrl('/poster-image-3.jpg')">
  </div>
</template>

<script>
import assetUtility from './mixins/asset-utility';

export default {
  mixins: [assetUtility],
};
</script>
```

By using mixins, I don't need to write methods on our component anymore. It saves me a couple of lines, but I still need to write the mixin's import reference and declare the mixins property into the component.

There are two things that bothers me when transforming the code into a mixin. Can you find what they are?

One is a reference clarity. When I refactor the code into a mixin, I can't immediately know what function is available on the mixin just by looking at the component's code. This happens because to make a mixin, I need to export a bulk of code from the module.

Two is I give a broad access into the utility. Even if we want it or not, now our utility function can get a full access to the component's context. For example, I can change a state inside of the mixin to update some behaviour. This kinds of practice is bad because it can add unnecessary complexity and potentially leads to many bugs in the future.

---

To avoid getting troubles from previous approaches, thankfully we can use prototype for creating a utility function. Take a look at this example.


``` js
// our main js file
// main.js
import Vue from 'vue';
import { imageUrl } from './asset-utility';

Vue.prototype.$imageUrl = imageUrl;

const app = new Vue({
 // our vue config...
});

app.$mount('#app');
```

``` html
<template>
  <!-- collection of images -->
  <div>
    <img :src="$imageUrl('/poster-image-1.jpg')">
    <img :src="$imageUrl('/poster-image-2.jpg')">
    <img :src="$imageUrl('/poster-image-3.jpg')">
  </div>
</template>
```

This implementation gives us the power of mixin without giving a broad access to our utility. Because every component inherits a context from a Vue object, the utility is accessible from component's context too. However, our utility cannot access the component's context, which is very neat. I just need to write once in `main.js`, and then the utility becomes available across components in my application.

If you look closely to the component's code, now we don't need to write anything on the script tag. However if you wish for it, you can simply call `this.$imageUrl` function on your component's script.

You can also write a plugin for it to reduce prototype initialization in `main.js` file.

``` js
// plugins/asset.js
import { imageUrl } from './asset-utility';

export default {
  install(Vue) {
    Vue.prototype.$imageUrl = imageUrl;
  },
};

// main.js
import Vue from 'vue';
import assetPlugin from './plugins/asset';

Vue.use(assetPlugin);

const app = new Vue({
 // our vue config...
});

app.$mount('#app');
```

---


Now that we have reviewed several approaches of shared utilities. In my experience, shared utilities are the best way to be implemented as a Vue's prototype. By using Vue's prototype, we can reduce duplication while still give a limitation to access the component's context.

