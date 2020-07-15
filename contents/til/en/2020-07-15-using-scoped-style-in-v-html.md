---
title: Using scoped style with v-html
slug: using-scoped-style-with-v-html
published_date: 2020-07-15
language: en
type: til
translations:
  id: /til/id/#menggunakan-scoped-style-dengan-v-html
---

No, you can't.

The scoped style won't be applied even if we have written it inside of the component that uses `v-html`.

The reason is that the tags injected with `v-html` don't have scope identifiers in their attributes and therefore the scoped style will have no effect on those tags.

``` html
<!-- let say we have a component like this -->
<template>
  <div class="container" v-html="htmlContent"/>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: '<p>Tags that you want to style</p>',
    };
  },
};
</script>

<style scoped>
.container p {
  color: cornflowerblue;
}
</style>

<!-- when we render those component, the html tags will be generated like this -->
<div class="container" data-v-r4nd0m1d>
  <p>Tags that you want to style</p>
</div>

<!-- and the generated style will look like this -->
<style>
.container p[data-v-r4nd0m1d] {
  color: cornflowerblue;
}
</style>
```
