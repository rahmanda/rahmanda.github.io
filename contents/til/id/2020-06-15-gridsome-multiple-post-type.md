---
title: Menggunakan Gridsome dengan beberapa tipe post
slug: menggunakan-gridsome-dengan-beberapa-tipe-post
published_date: 2020-06-15
language: id
type: til
translations:
  en: /til/en/#using-gridsome-with-multiple-post-type
---

Sampai versi 0.7.17, satu-satunya cara untuk membuat tipe post lebih dari satu adalah dengan melakukan registrasi konfigurasi `@gridsome/source-filesystem` berkali-kali ke dalam nilai `plugins` pada file `gridsome.config.js`.

``` js
// gridsome.config.js

export default {
  // ...
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './contents/blog/**/*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Journal',
        path: './contents/journal/**/*.md'
      }
    }
  ]
}
```
