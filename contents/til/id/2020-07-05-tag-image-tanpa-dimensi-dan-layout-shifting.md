---
title: Tag image tanpa dimensi dan layout shifting
slug: tag-image-tanpa-dimensi-dan-layout-shifting
published_date: 2020-07-05
language: id
type: til
translations:
  en: /til/id/#image-tag-without-dimension-and-layout-shifting
---

Saya baru sadar kalau tag image yang tidak memiliki atribut dimensi (`width` dan `height`) ternyata dapat memengaruhi layout shifting secara signifikan setelah saya menonton [video ini oleh Addy Osmani](https://www.youtube.com/watch?list=PLNYkxOF6rcIDC0-BiwSL52yQ0n9rNozaF&v=AQqFZ5t8uNc&feature=emb_logo). Dan saat ini, cumulative layout shifts (CLS) termasuk ke dalam salah satu Core Web Vitals yang berpengaruh terhadap search ranking halaman kita di Google. Sekarang saya harus lebih hati-hati saat ingin menambahkan image pada layout yang responsif.

