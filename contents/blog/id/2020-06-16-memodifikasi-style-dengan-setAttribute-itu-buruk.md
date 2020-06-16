---
title: Memodifikasi style dengan setAttribute itu buruk

summary: Kamu mungkin jarang banget butuh memodifikasi style dengan JS. Tapi kalaupun kamu butuh, jangan pakai element.setAttribute.
slug: memodifikasi-style-dengan-setAttribute-itu-buruk
published_date: 2020-06-16
language: id
type: blog
translations:
  en: /blog/en/modifying-styles-with-setAttribute-is-bad/
---

Pada umumnya, memodifikasi style menggunakan JS sebaiknya dianggap sebagai solusi yang paling terakhir karena biasanya kita bisa menyelesaikan berbagai kasus styling cukup dengan menggunakan class selector. Namun akan menjadi lain ceritanya kalau kita perlu membuat semacam diagram svg yang responsif, game, efek parallax dsb. Untuk hal-hal demikian, tidak ada cara selain menggunakan JS untuk membuatnya.

Apabila kita ingin mengubah style lewat JS, kita punya dua opsi: menggunakan `setAttribute` dan properti style. Pada artikel ini, saya akan menjelaskan mengapa saya lebih suka menggunakan opsi kedua.

## Mengapa setAttribute itu buruk?

Anggap saja kita ingin mengeset lebar suatu container dengan `width` sama dengan setengah dari lebar layar, dan `height` sama dengan tinggi layar. Beginilah cara kita mengimplementasikannya dengan menggunakan `setAttribute`.

``` js

const containerWidth = window.innerWidth / 2
const containerHeight = window.innerHeight

document.querySelector('.container').setAttribute('style', `width: ${containerWidth}px; height: ${containerHeight}px`)

```

Sekarang container-nya telah ter-render dengan baik. Masalah selesai.

Anggap saja setelah ini kita ingin meng-update `height`-nya saja dengan nilai `initial`. Bisa gak kalau kita tulis seperti ini?

``` js
document.querySelector('.container').setAttribute('style', 'height: initial')
```

Jawabannya adalah, enggak!

Saat kita mengeset tinggi container untuk yang kedua kalinya, fungsi `setAttribute` akan menghapus semua modifikasi yang kita buat sebelumnya dan menggantikannya dengan yang baru. Akibatnya, kita kehilangan style `width` yang sudah kita tambahkan. Untuk menyelesaikannya, kita perlu menambahkan style width lagi bersamaan dengan nilai `height` yang baru.

``` js
document.querySelector('.container').setAttribute('style', `width: ${containerWidth}px; height: initial`)
```

Masalahnya adalah, metode ini tidak scalable kalau kita punya banyak style dalam satu element karena akan menjadi pekerjaan yang sulit untuk melakukan tracking untuk semua modifikasi style dengan sebuah string.

## Style property to the rescue

Apabila saya perlu me-maintain sebuah modifikasi style yang kompleks dengan JS, saya lebih suka menggunakan properti style dari DOM. Berbeda dengan `setAttribute`, properti style tidak akan menghapus modifikasi yang sudah ada setiap kali kita menambahkan style baru. Hal ini dikarenakan dengan properti style, kita perlu menambahkan attribut style satu per satu. Di bawah ini adalah cara kita mengerjakan contoh sebelumnya dengan menggunakan properti style.

``` js
const containerWidth = window.innerWidth / 2
const containerHeight = window.innerHeight

const $container = document.querySelector('.container')
$container.style.width = `${containerWidth}px`
$container.style.height = `${containerHeight}px`
```

Lalu saat kita perlu meng-update satu style, kita bisa menargetkan satu style saja dengan tetap mendapatkan style dari modifikasi sebelumnya.

``` js
$container.style.height = 'initial'
```

Kita juga bisa membuat sebuah fungsi untuk memudahkan melakukan modifikasi beberapa style sekaligus tanpa menulis deklarasi style secara berulang-ulang seperti berikut:

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

Pendekatan ini jauh lebih baik dibandingkan menggunakan `setAttribute`.

Satu hal yang perlu dicatat adalah saat kita perlu menambahkan properti style yang mempunyai lebih dari satu kata seperti `background-color`, kita perlu menulisnya sebagai `backgroundColor`. Hal ini benar-benar sama dengan cara kita menulis style di JSX karena, ya JSX itu pada akhirnya juga dikompilasi menjadi JS.

``` js
document.querySelector('.container').style.backgroundColor = '#fefefe'
```

Semoga membantu!
