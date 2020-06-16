---
title: Mengubah style inset via JS
slug: mengubah-style-inset-via-js
published_date: 2020-06-16
language: id
type: til
translations:
  en: /til/en/#updating-inset-style-via-js
---

Berkaitan dengan [postingan ini](/blog/id/memodifikasi-style-dengan-setAttribute-itu-buruk/), saya menemukan bahwa mengubah style inset itu tidak selalu mudah terutama kalau melibatkan dua sisi yang berlawanan, seperti `top` vs `bottom`, atau `left` vs `right`. Apabila kamu perlu meng-update nilai dari satu sisi lalu setelah itu kamu perlu mengupdate nilai dari sisi yang berlawanan, kamu akan mendapatkan tampilan yang tidak konsisten kalau kamu tidak mengeset nilai default untuk kedua sisi tersebut.

``` js
// Ini tidak konsisten

document.querySelector('.container').style.top = 0
// ... lalu pada kode setelahnya
document.querySelector('.container').style.bottom = '200px'


// Ini konsisten

document.querySelector('.container').style.top = 0
document.querySelector('.container').style.bottom = 'unset'
// ... lalu pada kode setelahnya
document.querySelector('.container').style.top = 'unset'
document.querySelector('.container').style.bottom = '200px'
```


