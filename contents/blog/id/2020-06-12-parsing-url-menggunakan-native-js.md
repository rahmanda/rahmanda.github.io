---
title: Parsing URL Menggunakan Native JS
summary: Hanya dengan native API sudah cukup untuk menyelesaikan hampir semua keperluan parsing URL kamu
slug: parsing-url-menggunakan-native-js
published_date: 2020-06-12
language: id
type: blog
translations:
  en: /blog/en/parsing-url-using-native-js/
---

Kamu mungkin sudah pernah menggunakan library eksternal seperti [url-parse](https://www.npmjs.com/package/url-parse) atau `url.parse` di Node.js untuk kebutuhan parsing URL. Hal ini sungguh sangat beralasan karena sebelumnya JS belum punya native API untuk parsing URL.

Emang agak aneh untuk sebuah bahasa pemrograman web tidak mempunyai API untuk itu. Untungnya, sekarang JS telah memasukkan [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) dan [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) ke dalam standar bahasanya.

## URL

Penggunaannya sangat sederhana, yaitu dengan melakukan inisialisasi `URL` dengan menggunakan string URL yang valid sebagai parameter constructor seperti berikut ini:


``` js
let url = new URL('https://contoh.com/path')

// Tentu saja kalau di browser, kita bisa memasukkan parameter dengan window.location

url = new URL(window.location)

// Kita tidak bisa memasukkan parameter dengan domain atau path saja karena akan menimbulkan error
url = new URL('contoh.com') // TypeError: URL constructor: contoh.com is not a valid URL
url = new URL('/path') // TypeError: URL constructor: contoh.com is not a valid URL
```

Kita juga bisa menginisialisasi `URL` dengan menggunakan dua parameter. Parameter pertama untuk path, dan parameter kedua untuk origin URL.

``` js
let url = new URL('/path-baru', 'https://contoh.com/path') // hasilnya sama dengan new URL('https://contoh.com/path-baru')

url = new URL('../path-baru', 'https://contoh.com/path') // hasilnya sama dengan new URL('https://contoh.com/path-baru')
```

Setelah inisialisasi, kita dapat menggunakan berbagai macam atribut seperti path, host, dan protocol dari objek yang telah diassign ke variable.

``` js
let url = new URL('https://contoh.com/path?page=1&from=homepage')

console.log(url.href) // https://contoh.com/path
console.log(url.origin) // https://contoh.com
console.log(url.hostname) // contoh.com
console.log(url.host) // contoh.com
console.log(url.protocol) // https:
console.log(url.pathname) // /path
console.log(url.search) // ?page=1&from=homepage
```

Nilai dari `url.hostname` dan `url.host` akan sama apabila URL tidak memiliki port. Apabila sebuah URL memiliki port, hasilnya akan seperti dibawah ini.

``` js
let url = new URL('http://127.0.0.1:5000')

console.log(url.hostname) // 127.0.0.1:5000

console.log(url.host) // 127.0.0.1

console.log(url.port) // 5000
```

Gampang, kan?

---

Sekarang kita sudah belajar mengenai parsing URL. Bagaimana dengan parameter kueri.

## URLSearchParams

Melakukan parsing parameter kueri juga termasuk pekerjaan yang kurang mengenakan tanpa menggunakan librari eksternal. Dengan `URLSearchParams`, kita bisa membuat parameter kueri yang valid. Inisialisasinya juga kurang lebih sama dengan `URL`. Hanya saja kita sekarang harus memasukkan sebuah string parameter kueri ke dalam fungsi constructor.

``` js

let searchParams = new URLSearchParams('?page=1&from=homepage')

// kita juga bisa memasukkan parameter kueri tanpa tanda tanya di depan '?'
searchParams = new URLSearchParams('page=1&from=homepage')

searchParams.has('page') // true
searchParams.has('item[]') // false

searchParams.get('page') // 1
searchParams.get('from') // homepage


// kalau kamu punya kueri berbentuk array, kamu perlu menggunakan fungsi 'getAll'
// karena fungsi 'get' hanya mengembalikan nilai dari pencarian pertama saja

searchParams = new URLSearchParams('item[]=pisang&item[]=apel&item[]=jeruk')
searchParams.get('item[]') // pisang
searchParams.getAll('item[]') // ['pisang', 'apel', 'jeruk']
```

Memodifikasi parameter kueri juga mudah berkat API yang sangat cantik.

``` js
let searchParams = new URLSearchParams('page=1&from=homepage')

searchParams.set('page', 2)
searchParams.toString() // page=2&from=homepage

searchParams.append('referral', true)
searchParams.toString() // page=2&from=homepage&referral=true

searchParams.delete('from')
searchParams.toString() // page=2&referral=true
```

> Hati-hati saat memodifikasi kueri array karena fungsi `set` dan `delete` akan melakukan perubahan kueri parameter secara rekursif

## Studi Kasus

Agar lebih menarik, saya akan memberikan sebuah studi kasus penggunaan `URL` dan `URLSearchParams`. Anggap saja kita perlu menambahkan nilai dari parameter `page` karena kita menggunakan JS untuk mengubah konten pagination. Implementasinya mungkin akan seperti di bawah ini.

``` js
// anggap nilai dari window.location adalah http://contoh.com/content?page=1

let url = new URL(window.location)
let searchParams = new URLSearchParams(url.search)
let currentPage = Number(searchParams.get('page'))

currentPage++

searchParams.set('page', currentPage)

// tambah history baru tanpa melakukan redirection
window.history.pushState({ page: currentPage }, '', searchParams.toString())
```

Sebenarnya, kita tidak perlu menginisialisasi `URLSearchParams` karena objek `url` sudah memiliki atribut `searchParams` yang isinya merupakan sebuah objek `URLSearchParams`. Oleh karena itu, kita bisa menyederhanakan kodenya menjadi seperti ini:

``` js
// anggap nilai dari window.location adalah http://contoh.com/content?page=1

let url = new URL(window.location)
let currentPage = Number(url.searchParams.get('page'))

currentPage++

url.searchParams.set('page', currentPage)

// tambah history baru tanpa melakukan redirection
window.history.pushState({ page: currentPage }, '', url.searchParams.toString())
```

## Kompatibilitas

Kamu tidak bisa menggunakan `URL` dan `URLSearchParams` secara native apabila kamu perlu mendukung browser IE dan Opera Mini, atau menggunakan Node.js di bawah versi 10 (di Node.js v7, API ini masih eksperimental). Tetapi, penggunaan polyfill untuk mendukung browser lama sangat patut untuk dilakukan karena API ini telah menjadi standar JS saat ini.

