---
title: Javascript This
slug: javascript-this
published_date: 2017-01-07
language: id
type: blog
translations:
  en: /en/javascript-this/
---

Operator `this` sering kali digunakan apabila kamu mengimplementasikan suatu _class_ atau _object_ pada bahasa pemograman _object oriented_. Javascript tidak memiliki paradigma _object oriented_, namun Javascript mendukung penggunaan operator `this`. Tetapi karena ini Javascript, (tentu saja) cara kerja `this` akan sedikit berbeda dengan bahasa pemograman pada umumnya....

Pada keadaan normal, pemanggilan operator `this` akan mengembalikan objek __global__. Perhatikan contoh berikut:

``` js
console.log(this === window); // output 'true'
function callingGlobal() {
    console.log(this === window);
}
callingGlobal(); // output 'true' (?)
```

Seperti pada contoh di atas, kita bisa mengakses objek global via operator `this` meskipun di dalam _scope function_. Namun apabila kita mengeset `use strict` di awal deklarasi fungsi, operator `this` tidak lagi mereferensikan objek global karena konteksnya (dipaksa) berada di dalam _scope_ yang berbeda.

``` js
console.log(this == window); // output 'true'
function callingGlobal() {
    'use strict';
    console.log(this == window);
}
callingGlobal(); // output undefined
```

Beberapa fungsi bawaan Javascript mengeset `this` menjadi objek tertentu seperti pada fungsi `addEventListener`.

``` js
function changeBodyBackground(e) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    this.style.backgroundColor = color;
}
var $body = document.getElementsByTagName('body')[0];
$body.addEventListener('click', changeBodyBackground, false); // body berubah warna background apabila di klik
```

Pada contoh di atas, operator `this` secara default mereferensikan objek DOM dari elemen `body` yang telah dipasang _event handler_. Namun kita juga bisa mengubah operator `this` agar mereferensikan objek yang kita definisikan sendiri. Misalkan kita ingin agar saat elemen `body` diklik, hanya warna _background_ dari elemen `h1` yang berubah (dengan asumsi hanya ada satu `h1` pada halaman).

``` js
// fungsi changeBodyBackground sama dengan contoh sebelumnya
var $body = document.getElementsByTagName('body')[0];
var $h1 = document.getElementsByTagName('h1')[0];
$body.addEventListener('click', changeBodyBackground.bind($h1), false); // h1 berubah warna background apabila di klik
```

Dengan menggunakan fungsi `bind`, kita bisa mengeset nilai `this` sesuai dengan objek yang kita masukkan sebagai parameter. Selain `bind`, kita juga bisa menggunakan fungsi `call` dan `apply`. Perbedaannya adalah saat `call` dan `apply` digunakan pada suatu fungsi, fungsi tersebut akan langsung dijalankan.

``` js
var someObject = {
    arr: [2, 3, 5, 8, 13]
};

function multiplyWith(x, y) {
    for (var i = 0; i < this.arr.length; i++ ) {
        this.arr[i] = this.arr[i] * x * y;
    }
    return this.arr;
}

multiplyWith.call(someObject, 10, 2); // [40, 60, 100, 160, 260]
multiplyWith.apply(someObject, [10, 2]); // [40, 60, 100, 160, 260]
```

> Terdapat perbedaan antara `call` dan `apply` saat memasukkan parameter. Fungsi `call` menerima parameter secara eksplisit, sedangkan `apply` menerima parameter dalam bentuk _array_.

Pada artikel [sebelumnya](/closure-javascript.html) saya sempat menjelaskan tentang _module pattern_. Dengan menggunakan `this` di dalam _method_, kita dapat memanggil _method_ atau properti objek pada modul yang sama seperti yang diperlihatkan oleh contoh berikut.

``` js
function Cat(type) {
    return {
        walking: function() {
            return type + ' is walking');
        },
        walkingWhileEating: function() {
            return this.walking() + 'while eating..';
        }
    };
}

var siamese = Cat('siamese');
siamese.walkingWhileEating(); // siamese is walking while eating
```

---

Berurusan dengan operator `this` memang agak _tricky_, terutama saat dipakai diluar _module pattern_. Pastikan kode javascript kamu selalu diberi `use strict` agar kode kamu konsisten dan terhindar dari memodifikasi objek global.

