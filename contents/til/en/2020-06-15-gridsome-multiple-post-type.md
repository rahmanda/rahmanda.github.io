---
title: Using Gridsome with multiple post type
slug: using-gridsome-with-multiple-post-type
published_date: 2020-06-15
language: en
type: til
translations:
  id: /til/id/#menggunakan-gridsome-dengan-beberapa-tipe-post
---

Until v0.7.17, the only way to enable multiple post type is by repeatedly registering bunch of `@gridsome/source-filesystem` configs on `gridsome.config.js` plugins value.

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
