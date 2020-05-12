---
title: Edit Format Tanggal dan Waktu dengan Intl.DateTimeFormat
slug: edit-format-tanggal-dan-waktu-dengan-datetimeformat
summary: Intl.DateTimeFormat adalah cara mudah untuk mengedit format tanggal dan waktu tanpa bikin ukuran Javascript jadi gemuk
published_date: 2019-06-17
language: id
type: blog
translations:
  en: /blog/en/formatting-date-and-time-with-datetimeformat/
---

Mengedit format tanggal dan waktu sepertinya sudah menjadi makanan sehari-hari anak *web developer* karena beberapa alasan, yaitu:

1. Hampir semua jenis web perlu menampilkan tanggal dan waktu
2. API hanya menyediakan data dengan format universal, yaitu *timestamp*

Pengeditan format tanggal dan waktu bisa diimplementasikan dalam bentuk yang bermacam-macam tergantung dengan kebutuhan. Tapi biasanya kita cenderung ogah membuat sendiri modul atau fungsi untuk hal itu karena ribet. Iya, ribet.

Satu-satunya fungsi tanggal dan waktu di Javascript adalah `Date`. Untuk memulai melakukan pengeditan format, kita perlu memasukkan *timestamp* dari API sebagai parameter `Date` lalu memanggil fungsi *constructor* dari kelas tersebut.

``` js
const datetime = new Date('2019-06-17T08:00:00Z'); // memasukkan tanggal dengan format ISO 8601
```

Dari variabel `datetime` tersebut kita bisa mendapatkan data tanggal, bulan, tahun dan waktu yang nantinya digunakan untuk membentuk sebuah format. Hanya saja, kita tidak bisa mendapatkan nama hari atau bulan secara otomatis sehingga kita perlu melakukan *mapping* sendiri secara manual.

``` js
// mendapatkan tanggal, bulan, tahun, jam, menit dan detik
const date = datetime.getDate();
const month = datetime.getMonth(); // bulan dimulai dari angka 0
const year = datetime.getFullYear();
const hour = datetime.getHours();
const minute = datetime.getMinutes();
const second = datetime.getSeconds();

// cara format tanggal dan waktu yang paling sederhana
console.log(`${date}-${month + 1}-${year} ${hour}:${minute}:${second}`);

// mendapatkan hari dalam bentuk angka integer
const day = datetime.getDay() // 0 adalah Minggu, 1 adalah Senin dst..

// mapping nama-nama hari dan bulan
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

console.log(`${days[day]}, ${date} ${months[month]} ${year}`); // Senin, 17 Juni 2019
```

Kalau hanya berurusan dengan satu format saja (Indonesia), hal itu mungkin adalah perkara yang cukup mudah. Tetapi kalau kita butuh dukungan antar bahasa akan sangat menyulitkan karena kita perlu membuat *mapping* yang banyak sekali. Sekarang kalian jadi tahu *kan* kenapa [moment.js](https://momentjs.com) + *internationalization* itu ukurannya lumayan besar.

---

Melalui versi ES6, kita sudah bisa menggunakan `Intl.DateTimeFormat` untuk melakukan pengeditan format waktu dan tanggal tanpa perlu membuat fungsi sendiri atau menggunakan *library* eksternal.

``` js
const datetime = new Date('2019-06-17T08:00:00Z');

console.log(new Intl.DateTimeFormat('id').format(datetime)); // untuk 'id' secara default mengembalikan format d/m/yyyy

// kustomisasi format
let options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

console.log(new Intl.DateTimeFormat('id', options).format(datetime)); // Senin, 17 Juni 2019

// kustomisasi penuh dengan semua opsi
options = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
};

console.log(new Intl.DateTimeFormat('id', options).format(datetime)); // Senin, 17 Juni 2019 15.00.00 WIB
```

Pedoman untuk semua opsi pada `Intl.DateTimeFormat` dapat dibaca secara lengkap pada web [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

Dengan menggunakan `Intl.DateTimeFormat`, kita bisa mengurangi ukuran Javascript kita karena tidak perlu lagi membuat fungsi sendiri atau menggunakan *library* eksternal. Berdasarkan website [caniuse](https://caniuse.com/#search=Intl), saat ini API tersebut telah dapat diakses oleh lebih dari 90% pengguna internet secara global sehingga sudah sangat aman untuk dipakai.

Kekurangan dari `Intl.DateTimeFormat` adalah kita tidak bisa mengontrol penuh terhadap format yang ditampilkan. Kita hanya bisa bergantung kepada format yang telah distandarisasi oleh ECMA. Kalau diperhatikan, separator waktu yang digunakan oleh `Intl.DateTimeFormat` adalah titik `.`, sedangkan di Indonesia kita lebih umum menggunakan titik dua `:`. Sayangnya, untuk mengganti separator waktu kita harus mengedit kembalian `string` dari format tersebut secara manual. Tentu saja hal ini adalah solusi yang tidak ideal karena kita tetap mesti melakukan pengeditan sendiri.

Apabila banyak dari pengguna website kamu yang menggunakan IE versi 6-10, Opera Mini dan UC Browser, kamu perlu menyediakan *polyfill* untuk API ini karena peramban-peramban tersebut belum mendukung `Intl.DateTimeFormat`. Saya merekomendasikan menggunakan *polyfill* via CDN [Polyfill.io](https://polyfill.io/v3/) karena CDN tersebut mempunyai kemampuan untuk mendeteksi peramban mana saja yang butuh *polyfill* dan mana yang tidak sehingga hanya akan mengembalikan *polyfill* apabila dibutuhkan.

``` html
<!-- Tambah skrip dibawah ini untuk polyfill -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.id"></script>
```

Menurut saya pribadi, saya lebih suka menggunakan `Intl.DateTimeFormat` ketimbang membuat fungsi sendiri ataupun menggunakan *library*. Selain karena sudah mengikuti standar Javascript, kita juga tidak perlu ribet untuk memikirkan format yang belum tentu sesuai dengan standar. Perihal nanti hasil antarmukanya sedikit tidak sesuai dari arahan desainer, saya rela berargumen dengan mereka demi menghemat tiap KB Javascript yang sangat berharga bagi pengguna internet, *hehe*. Semoga membantu!

