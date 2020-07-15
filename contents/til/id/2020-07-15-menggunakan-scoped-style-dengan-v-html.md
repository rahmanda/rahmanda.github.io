---
title: Menggunakan scoped style dengan v-html
slug: menggunakan-scoped-style-dengan-v-html
published_date: 2020-07-15
language: id
type: til
translations:
  en: /til/id/#using-scoped-style-with-v-html
---

Sayangnya gabisa.

Scoped style gak akan ter-apply meskipun kita sudah menulisnya di dalam komponen yang menggunakan `v-html`.

Hal ini disebabkan karena tag yang disuntikkan dengan `v-html` tidak memiliki scope identifier dalam atributnya. Oleh karena itu, scoped style tidak memiliki efek terhadap tag tersebut.

``` html
<!-- anggap kita punya komponen seperti ini -->
<template>
  <div class="container" v-html="htmlContent"/>
</template>

<script>
export default {
  data() {
    return {
      htmlContent: '<p>Tag yang ingin kamu tambahkan styling</p>',
    };
  },
};
</script>

<style scoped>
.container p {
  color: cornflowerblue;
}
</style>

<!-- setelah kita merender komponennya, tag html yang ter-generate akan seperti ini -->
<div class="container" data-v-r4nd0m1d>
  <p>Tag yang ingin kamu tambahkan styling</p>
</div>

<!-- dan style yang ter-generate akan terlihat seperti ini -->
<style>
.container p[data-v-r4nd0m1d] {
  color: cornflowerblue;
}
</style>
```
