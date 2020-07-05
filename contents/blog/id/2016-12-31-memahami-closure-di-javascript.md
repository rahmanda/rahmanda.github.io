---
title: Memahami Closure di Javascript
summary: Saya menjelaskan konsep scope dan closure di Javascript dan bagaimana contoh penggunaannya
slug: memahami-closure-di-javascript
published_date: 2016-12-31
language: id
type: blog
translations:
  en: /blog/en/understanding-closure-in-javascript/
---

Ketika kita membuat suatu variabel, variabel tersebut otomatis memiliki sebuah scope. Scope yang dimiliki oleh variabel bergantung kepada dimana posisi variabel tersebut dibuat.

```
<?php
$foo = 'bar';
function printFooValue() {
    echo($foo);
}
printFooValue(); /* menghasilkan error 'Undefined variable' */
```

Pada contoh program PHP di atas, variabel `$foo` terletak di luar fungsi `printFooValue`. Apabila kita jalankan, program tersebut akan menghasilkan error 'Undefined variable'. Hal ini disebabkan variabel `$foo` terletak di luar scope fungsi `printFooValue`. Sehingga dapat kita simpulkan bahwa saat kita membuat suatu fungsi, fungsi tersebut membuat scope-nya sendiri yang terisolasi dari luar.

Sifat `scope` yang seperti itu dapat kita temui juga di bahasa pemograman lain seperti C, Java dan Ruby. Akan tetapi pada bahasa pemograman Javascript, sifat `scope`-nya agak berbeda.

``` js
var foo = 'bar';
function printFooValue() {
    console.log(foo);
}
printFooValue(); // menghasilkan output 'bar'
```

Apabila contoh program di atas dijalankan, program tersebut mengeluarkan output 'bar'. Hal ini menunjukkan bahwa fungsi `printFooValue` dapat mengetahui scope di luar. Sekarang perhatikan contoh berikut:

``` js
function printFooValue() {
    var bar = 'foo';
    console.log(bar);
}
printFooValue() // menghasilkan output 'bar'
console.log(bar) // menghasilkan error 'Undefined variable'
```

Variabel 'bar' yang dideklarasikan di dalam fungsi `printFooValue` ternyata tidak dikenali di luar fungsinya yang mengakibatkan error 'Undefined variable' saat di-print. Sehingga dapat kita simpulkan bahwa saat kita membuat fungsi di Javascript, fungsi tersebut membuat scope-nya sendiri dan menyimpan scope dari luar. Sifat `scope` yang demikian dikenal dengan istilah lexical scoping.

## Closure

``` js
function multiplyBy(x) {
    function multipleByX(y) {
        return x * y;
    }
    return multipleByX;
}
var multiplyBy2 = multiplyBy(2);
var multiplyBy10 = multiplyBy(10);
console.log(multiplyBy2(3)); // menghasilkan output 6
console.log(multiplyBy10(5)); // menghasilkan output 50
```

Pada bahasa pemograman yang tidak mendukung lexical scoping, variabel lokal akan dihapus setelah fungsi dipanggil. Namun hal ini tidak berlaku di Javascript. Pada contoh di atas, variabel `x` tetap dapat diakses oleh fungsi `multipleByX` meskipun fungsi `multipleBy` telah dipanggil. Hal ini disebabkan saat fungsi `multipleByX` dikembalikan oleh pemanggilan fungsi `multipleBy`, fungsi `multipleByX` masih menyimpan scope dari fungsi `multipleBy`. Hal ini yang dinamakan closure.

> Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created. - [Mozilla Developer Network](https://developer.mozilla.org/en/docs/Web/JavaScript/Closures)

## Konsep Private Method di Javascript

Kita sudah tahu bahwa Javascript tidak memiliki konsep OOP. Meskipun demikian, kita masih bisa membuat suatu private method di Javascript dengan memanfaatkan closure. Perhatikan contoh berikut ini:

``` js
function Giraffe() {
    var eatingObject = 'leaves';

    function eat() {
        console.log('Giraffe is eating ' + place);
    }

    return {
        eating: function() {
            eat();
        },
        changeFood: function(food) {
            eatingObject = food;
        }
    };
}
var babyGiraffe = Giraffe();
babyGiraffe.eat(); // error 'Undefined property'
babyGiraffe.eatingObject; // error 'Undefined property'
babyGiraffe.eating(); // output 'Giraffe is eating leaves'
babyGiraffe.changeFood('french fries');
babyGiraffe.eating(); // output 'Giraffe is eating french fries'
```

Fungsi `Giraffe` mengembalikan objek yang terdiri dari dua properti, `eating` dan `changeFood`. Karena adanya lexical scoping, kedua properti tersebut menyimpan scope dari `Giraffe`, yaitu variabel `eatingObject` dan fungsi `eat`. Sehingga saat `babyGiraffe.eating` dan `babyGiraffe.changeFood` dipanggil, variabel dan fungsi tersebut masih dapat diakses.

Contoh di atas juga menunjukkan bahwa variabel `eatingObject` dan fungsi `eat` hanya bisa diakses via properti yang dikembalikan oleh fungsi `Giraffe`. Model fungsi di atas sangat sering dipakai untuk mencegah global scope pollution, dan lebih populer dengan istilah **module pattern**.

---

Konsep lexical scoping dan closure merupakan fondasi utama dari pemograman Javascript. Lucunya, saya sendiri baru kenal konsep ini setelah sekian banyak baris kode yang sudah saya buat yang ternyata telah mengaplikasikan closure. Kedepannya saya akan lebih banyak lagi menulis tentang dasar-dasar pemograman Javascript. Semoga artikel ini bermanfaat!

