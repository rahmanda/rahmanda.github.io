---
title: Peran Hoisting dalam Meningkatkan Keterbacaan Kode Javascript
summary: Pendapat kurang populer terhadap hoisting dan penggunaannya
---

Banyak orang yang tidak suka dengan *hoisting* karena sifatnya yang membingungkan. Bahkan *style guide* populer seperti [airbnb/javascript](https://github.com/airbnb/javascript#functions) merekomendasikan untuk tidak menggunakan *hoisting* sama sekali. Kenapa ya bisa begitu?

Supaya tahu apa alasannya, coba perhatikan contoh di bawah ini.

``` js
add(1, 3);

function add(a, b) {
  return a + b;
}
```

Apakah hasil keluaran dari pemanggilan fungsi `add` di atas?

Ternyata hasil keluarannya adalah `4` meskipun fungsi `add` dideklarasikan setelah pemanggilan fungsinya. Karena terdapat sifat *hoisting* pada Javascript, deklarasi fungsi dengan cara ini akan otomatis dipindahkan ke bagian paling atas pada sebuah *scope* pada proses eksekusi kode. Oleh karena itu selama berada di dalam *scope* yang sama, pemanggilan fungsi tidak akan memunculkan *reference error*.

Sifat *hoisting* ini tidak lazim ditemukan pada bahasa pemrograman yang lain. Umumnya apabila suatu fungsi belum dideklarasikan secara eksplisit di bagian atas *scope*, maka akan terjadi *error*. Itulah mengapa banyak pemrogram, terutama yang telah memiliki pengetahuan bahasa pemrograman yang lain, merasa tidak nyaman dalam menggunakan *hoisting* dan membiasakan diri untuk selalu mendeklarasikan fungsi pada awal program. Beberapa orang bahkan [mengambil langkah lebih jauh](https://github.com/airbnb/javascript#functions--declarations) untuk menggunakan pola seperti ini untuk mencegah sifat hoisting muncul pada program.

``` js
add(1, 3); // ReferenceError: can't access lexical declaration `add' before initialization

const add = function addFn(a, b) {
  return a + b;
}
```

Menurut saya, contoh kode di atas hanya mempersulit keadaan karena kodenya menjadi lebih panjang dan kita harus memikirkan penamaan sebanyak dua kali, satu untuk variabel dan satu untuk nama fungsinya. Kode seperti ini juga tidak membuat menjadi lebih mudah dibaca karena pola ini juga tidak umum digunakan pada bahasa pemrograman lain.

## Keterbacaan pada kode *anti-hoisting* vs *hoisting-first*

Di bawah ini adalah contoh kode sederhana yang tidak memanfaatkan *hoisting* (meskipun sifat *hoisting*-nya sendiri masih bekerja).

``` js
// anti-hoisting.js

import path from 'path';
import fs from 'fs';
import glob from 'glob';

function getFilename(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function readFile(filePath) {
  return {
    path: filePath,
    filename: getFilename(filePath),
    content: fs.readFileSync(filePath, 'utf-8'),
  };
}

function getAllFiles() {
  const globPattern = path.join(__dirname, 'src/*.md');
  const filePaths = glob.sync(globPattern);
  const files = filePaths.map(readFile);
  return files;
}

export default getAllFiles;
```

Menurut saya, penulisan kode seperti ini kurang enak untuk dibaca karena beberapa hal:

**Sulit untuk mengidentifikasi apa fungsi utamanya dan apa saja fungsi yang diekspor**

Pada contoh kode di atas, kita tidak bisa mengetahui secara langsung apa fungsi utama dan apa saja yang diekspor pada kode tersebut. Padahal itu adalah hal yang paling pertama kali ingin kita ketahui setiap kali membaca sebuah modul Javascript. Karena deklarasi ekspor berada pada bagian paling akhir, seringkali tidak mudah untuk mengidentifikasinya karena kita harus membaca semuanya sampai ke bagian paling bawah. Hal ini akan lebih menyulitkan apabila baris kodenya cukup panjang.

**Sulit untuk menelusuri cara kerja program secara keseluruhan**

Karena semua fungsi yang akan digunakan harus dideklarasikan terlebih dahulu di atas, kita tidak dapat dengan mudah untuk mengetahui bagaimana alur programnya bekerja.

Misalkan kita ingin mengetahui keseluruhan cara kerja dari kode pada contoh. Fungsi utama kita, `getAllFiles` melakukan pemanggilan fungsi `readFile` sehingga kita perlu mencari tahu bagaimana fungsi ini bekerja. Karena fungsi utama `getAllFiles` berada di paling bawah, kita harus mencari kode di bagian atasnya. Setelah menemukan letak deklarasi `readFile`, ternyata di dalam fungsinya ada lagi pemanggilan fungsi lain, yaitu `getFilename`. Lalu kita telusuri lagi ke baris-baris sebelumnya sampai tidak ada lagi pemanggilan fungsi selain fungsi eksternal.

Jadi untuk menelusuri cara kerja kode tersebut secara keseluruhan, kita perlu membaca terbalik dari bawah ke atas. Tentu saja cara baca yang demikian tidaklah nyaman karena kita lebih terbiasa membaca dari atas ke bawah.

Salah satu tujuan awal dari menulis semua deklarasi pada bagian atas adalah agar kita mengetahui apa saja fungsi yang tersedia. Namun pada kenyataannya, pada setiap pemanggilan fungsi internal, kita tetap perlu membaca kembali ke baris dimana fungsi itu dideklarasikan untuk memahami cara kerja dari fungsi tersebut.

Sekarang bandingkan dengan kode di bawah ini yang memanfaatkan *hoisting* (atau saya lebih suka menyebutnya metode *hoisting-first*).

``` js
// hoisting-first.js

import path from 'path';
import fs from 'fs';
import glob from 'glob';

export default getAllFiles;

function getAllFiles() {
  const globPattern = path.join(__dirname, 'src/*.md');
  const filePaths = glob.sync(globPattern);
  const files = filePaths.map(readFile);
  return files;
}

function readFile(filePath) {
  return {
    path: filePath,
    filename: getFilename(filePath),
    content: fs.readFileSync(filePath, 'utf-8'),
  };
}

function getFilename(filePath) {
  return path.basename(filePath, path.extname(filePath));
}
```

Yang saya lakukan pada kode di atas hanyalah mengatur kembali urutan deklarasi fungsi-fungsi pada contoh kode sebelumnya. Dengan cara penulisan seperti ini, kode lebih mudah diketahui apa fungsi utamanya karena sekarang deklarasi ekspornya berada di atas. Selain itu, kode ini juga lebih mudah untuk ditelusuri karena setiap deklarasi fungsi berada persis di bawah fungsi yang memanggilnya. Jadi kita hanya perlu membaca secara alamiah dari atas ke bawah tanpa perlu melihat kembali deklarasi fungsi di atasnya.

Hasil penulisan kode dengan metode *hoisting-first* juga lebih mudah untuk dibaca pada modul yang memiliki banyak fungsi. Meskipun saya juga tidak merekomendasikan untuk menulis banyak kode dalam satu modul atau *file*, saya hanya ingin menjelaskan bahwa cara penulisan seperti ini mungkin bisa bermanfaat untuk kebutuhan yang tidak dapat dihindari.

## Kekurangan pada *hoisting-first*

Kalau kamu ingin menggunakan *hoisting-first* dan kamu suka pakai eslint pada *text editor*, kamu mungkin perlu mengatur ulang pengaturan eslint kamu. Hal ini disebabkan beberapa preset eslint, terutama [airbnb config](https://www.npmjs.com/package/eslint-config-airbnb), memasang aturan *anti-hoisting*. Oleh karena itu, aturan-aturan terkait dengan *anti-hoisting* perlu dimatikan supaya tidak muncul *error* pada saat *ngoding* atau melakukan *git commit*.

Tetapi dengan dimatikannya aturan *anti-hoisting*, kita menjadi lebih bebas dalam mendeklarasikan suatu fungsi. Oleh karena itu, kesadaran diri perlu lebih ditingkatkan untuk menjaga agar kode tetap bagus dan tidak malah membingungkan.

## Penutup

Karena sifat *hoisting* itu sudah menjadi bagian dari Javascript itu sendiri, penulisan kode dengan pendekatan *hoisting-first* itu seharusnya dipahami oleh semua pemrogram Javascript. Saya tidak mencoba untuk berargumen bahwa pendekatan saya adalah pendekatan yang paling benar. Semua yang saya tulis semata-mata hanya untuk memberikan sudut pandang yang berbeda.

Kalau enggak bakal pakai *hoisting-first*, setidaknya sekarang kamu sudah mengerti apa itu *hoisting* (mudah-mudahan).

## Ekstra

Karena saya jadi penasaran kenapa kok dulu Javascript dibuatnya menggunakan *hoisting*, saya mencoba mencari hal ini di internet dan akhirnya menemukan jawaban menarik yang datang dari seorang [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich), pencipta dari Javascript itu sendiri. Beliau beralasan bahwa penambahan sifat *hoisting* pada Javascript itu didasari oleh keperluan *mutual recursion* dan **menghindari cara baca dari bawah ke atas**. Jadi sebenarnya pendekatan yang saya lakukan itu selaras dengan tujuan awal dari penambahan sifat *hoisting* pada Javascript.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/DmitrySoshnikov?ref_src=twsrc%5Etfw">@DmitrySoshnikov</a> <a href="https://twitter.com/jashkenas?ref_src=twsrc%5Etfw">@jashkenas</a> yes, function declaration hoisting is for mutual recursion &amp; generally to avoid painful bottom-up ML-like order</p>&mdash; BrendanEich (@BrendanEich) <a href="https://twitter.com/BrendanEich/status/33403701100154880?ref_src=twsrc%5Etfw">February 4, 2011</a></blockquote>

Bagaimana menurutmu?
