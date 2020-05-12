---
title: Berkenalan dengan Sass + Gulp
slug: berkenalan-dengan-sass-gulp
published_date: 2015-05-05
language: id
type: blog
---

Sass adalah *tools* yang biasa digunakan oleh para *front-end developer* masa kini untuk membuat CSS yang mudah untuk dikembangkan, dirawat serta dimodifikasi. Dalam istilah teknisnya, Sass tergolong kedalam *preprocessor CSS* (baca: [mengapa kita butuh *preprocessor* CSS](/mengapa-kita-butuh-preprocessor-css.html)). Dengan Sass, kita dapat menggunakan beberapa fungsi yang memudahkan kita untuk membuat CSS.

Program Sass pada awalnya ditulis dalam bahasa Ruby, sehingga untuk menggunakannya kita harus menginstal Ruby pada komputer kita. Namun saat ini kita dapat menggunakan Sass tanpa harus menginstal Ruby. Pada artikel ini, saya akan menjelaskan bagaimana cara menggunakan Sass dengan Gulp. Gulp sendiri adalah program *task runner* yang berbasis NodeJS. Pada Gulp terdapat *plugin* untuk Sass (gulp-sass) yang kinerjanya jauh lebih cepat dibandingkan dengan Sass yang dijalankan dengan Ruby.

> Sebelum mengikuti artikel ini lebih lanjut, unduh dan instal terlebih dahulu [NodeJS](http://nodejs.org/download/) sesuai dengan spesifikasi komputer kamu.

## Instalasi gulp dan gulp-sass

Untuk menginstal Gulp, sebelumnya `cd` ke direktori tempat menyimpan projek html kamu. Setelah itu, masukkan perintah di bawah ini pada terminal kamu (mungkin butuh akses root):

```
npm install --save-dev gulp
```

Pasang `gulp-sass` dengan memasukkan perintah ini:

```
npm install --save-dev gulp-sass
```

Setelah proses pengunduhan selesai, gulp-sass akan terinstal pada folder node_modules.

## Membuat folder scss dan css

Buat folder `scss` dan `css` di dalam folder projek kamu. Pada folder `scss`, buatlah *file* berekstensi `.scss` yang digunakan untuk menuliskan kode-kode Sass. *File* CSS yang dihasilkan dari program Sass nantinya akan tersimpan pada folder `css`.

## Membuat gulpfile.js

Buat *file* `gulpfile.js` pada folder projek kamu, lalu buka *file* tersebut pada aplikasi *text editor* yang kamu miliki. Salin kode di bawah ini ke dalam `gulpfile.js`.

``` js
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss') // direktori tempat menyimpan file sass
    .pipe(sass())
    .pipe(gulp.dest('./css')); // direktori tempat menyimpan file css
});

gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', // direktori tempat menyimpan file sass
    ['sass']);
});

gulp.task('default', ['watch']);
```

Pada kode diatas, kita membuat dua *task*. *Task* 'sass' digunakan untuk menjalankan program sass, sedangkan *task* 'watch' digunakan untuk melihat setiap kali ada perubahan pada kode sass yang kita buat. Jadi apabila kita membuat perubahan pada kode sass, *task* watch akan membuat ulang *file* css yang baru.

## Jalankan gulp

Masukkan perintah `gulp` untuk menjalankan program Gulp dengan konfigurasi yang sudah kita atur sebelumnya pada *file* `gulpfile.js`. Berikut tampilan terminal saat menjalankan program Gulp:

```
[19:04:21] Using gulpfile ~/Projects/contoh/gulpfile.js
[19:04:21] Starting 'watch'...
[19:04:21] Finished 'watch' after 7.78 ms
[19:04:21] Starting 'default'...
[19:04:21] Finished 'default' after 9.02 μs
```

## Variabel

Saat program Gulp berjalan, tulis sintaks dibawah ini pada *file* .scss.

``` css
$dark-blue: #0A276C;

body {
  color: $dark-blue;
}
```

Pada kode di atas, kita mendeklarasikan variabel `$dark-blue` yang menyimpan nilai warna dalam format hex. Variabel tersebut kita gunakan untuk mengisi atribut `color` pada tag `body`.

Saat kamu menyimpan *file* di atas, program Gulp akan menerjemahkan sintaks Sass dan membuat *file* CSS pada folder `css`. Contoh keluarannya akan seperti di bawah ini.

``` css
body {
  color: #0A276C; }
```

Semua *style* yang menggunakan variabel `$dark-blue` akan diubah secara otomatis sesuai dengan nilai atau string yang dimasukkan pada variabel tersebut.

## Nesting

Selain variabel, kita juga dapat menggunakan sistem *nesting* untuk menulis *selector*. Hal ini dapat memudahkan kita untuk menulis *style* dengan bentuk yang sama dengan hierarki tag HTML yang kita buat. Di bawah ini adalah contoh penggunaannya.

``` css
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

Contoh di atas menunjukkan bahwa kita dapat menulis *selector* `ul`, `li`, dan `a` di dalam *selector* `nav`. Tentu saja kita juga bisa menulis *selector* di dalam *selector* `ul`, `li`, atau `a`. Meskipun kita dapat membuat *nested selector* sedalam dan sebanyak mungkin, namun hal ini dapat menyebabkan kode Sass akan sulit di-*maintain*. Di bawah ini adalah CSS yang merupakan hasil penerjemahan sintaks Sass:

``` css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li {
  display: inline-block;
}

nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

## Import

Mungkin kamu telah mengenal fungsi `@import` yang terdapat pada CSS. Pada Sass terdapat pula fungsi `@import` dan kegunaannya pun sama, yaitu untuk memisahkan beberapa bagian dari kode CSS menjadi *file* dengan ukuran yang lebih kecil sehingga lebih mudah dibaca dan di-*maintain*. Pada CSS, semakin banyak fungsi `@import` akan menyebabkan semakin banyak HTTP *request* yang terjadi pada aplikasi web. Tentu saja hal ini akan menghabiskan kuota *bandwith* server atau *hosting* kamu. Pada Sass, semua *file* yang diinisialisasi menggunakan `@import` digabungkan dengan *file* yang memanggil fungsi `@import`. Sehingga kita dapat memperoleh satu *file* CSS saja untuk digunakan pada *production*.

Sebagai contoh, misalkan kita memiliki dua *file* Sass, `_reset.scss` dan `base.scss`. Kita ingin mengimpor `_reset.scss` ke dalam `base.scss`.

``` css
// _reset.scss

html,
body,
ul,
ol {
   margin: 0;
  padding: 0;
}
```

``` css
/* base.scss */

@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

Pada contoh di atas, kita menggunakan `@import 'reset'` pada `base.scss`. Oleh program Sass, kode pada `_reset.scss` dapat digabungkan dengan kode pada `base.scss` sehingga menjadi seperti di bawah ini:

``` css
html, body, ul, ol {
  margin: 0;
  padding: 0;
}

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

## Mixin

Sass memiliki fungsi `@mixin` yang penggunaannya mirip dengan `function` seperti pada bahasa pemograman. Karena sifatnya seperti `function`, kita dapat mengunakannya berulang-ulang pada kode Sass yang kita miliki sesuai kebutuhan. Di bawah ini adalah contoh penggunaannya untuk membuat `border-radius` yang biasanya membutuhkan banyak penulisan `vendor prefixes`.

``` css
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```

Hasil CSS akan terlihat seperti di bawah ini:

``` css
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

## Extend

Dengan `@extend`, kita dapat membagikan suatu set dari properti CSS dari satu *selector* ke *selector* yang lain. Berikut adalah contoh penggunaannya:

``` css
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}

.warning {
  @extend .message;
  border-color: yellow;
}
```

Pada contoh di atas, *selector* `.success`, `.error` dan `.warning` akan memiliki *style* yang sama dengan *selector* `.message`.  Hasilnya akan seperti di bawah ini:

``` css
.message, .success, .error, .warning {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```

## Operator

Kita juga dapat melakukan operasi matematika seperti `+`, `-`, `*`, `/`, dan `%` pada Sass. Contoh penggunaannya dapat dilihat di bawah ini.

``` css
.container { width: 100%; }

article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complimentary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

CSS yang dihasilkan akan terlihat seperti di bawah ini.

``` css
.container {
  width: 100%;
}

article[role="main"] {
  float: left;
  width: 62.5%;
}

aside[role="complimentary"] {
  float: right;
  width: 31.25%;
}
```

## Penutup

Contoh-contoh penggunaan Sass yang terdapat pada artikel ini saya ambil dari situs asli [Sass](http://sass-lang.com/guide). Meskipun begitu, masih banyak lagi fungsi-fungsi pada Sass yang belum dijelaskan dalam artikel ini. Untuk mengetahui lebih lanjut tentang Sass, kamu dapat melihat dokumentasi lengkap Sass di [sini](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).
