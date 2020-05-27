---
title: Menggunakan Vue Prototype Untuk Shared Utilities
slug: menggunakan-vue-prototype-untuk-shared-utilities
published_date: 2020-05-27
language: id
type: blog
translations:
  en: /blog/en/using-vue-prototype-for-shared-utilities/
---

Ada beberapa cara untuk membuat *utility function* dalam suatu aplikasi Vue. Namun saya pikir cara yang paling baik adalah memanfaatkan prototype Vue. Pada artikel ini, saya akan memberikan beberapa kelebihan dan kekurangan dari beberapa pendekatan dan menjelaskan mengapa saya memilih menggunakan *prototype* untuk kasus ini.

Membuat sebuah modul JS merupakan cara yang paling mudah untuk membuat *utility function*. Sederhananya, tulis sebuah fungsi dalam suatu *file* JS, lalu impor dia ke dalam *file* JS yang mau menggunakannya. Berikut adalah contoh bagaimana kita dapat menggunakan modul JS dalam sebuah komponen.

``` js
// asset-utility.js

export function imageUrl(path) {
  return `https://cdn.com/${path}`;
}
```
``` html
<template>
  <div>
    <img :src="logoUrl">
  </div>
</template>

<script>
// lalu dalam komponen kamu
import { imageUrl } from './asset-utility';

export default {
  data() {
    return {
      logoUrl: imageUrl('/your-logo.png'),
    };
  },
};
</script>
```

Contoh di atas menunjukkan bahwa fungsi kita hanya dapat digunakan sekali dengan parameter yang tetap. Apabila saya ingin menggunakan fungsi itu lagi tapi dengan parameter yang berbeda, saya mungkin perlu membuat beberapa `data` atau `computed` dengan kode yang serupa.

Untuk membuatnya lebih simpel, bagaimana kalau kita memanggil fungsi tersebut langsung di dalam *template* komponen saja? Dengan begini, kita tidak perlu membuat `data` atau `computed` berkali-kali untuk setiap *path* atau parameter. Untuk itu, saya perlu membuat fungsi tersebut supaya bisa diakses dalam konteks objek komponen kita.

``` html
<template>
  <!-- koleksi gambar -->
  <div>
    <img :src="imageUrl('/poster-image-1.jpg')">
    <img :src="imageUrl('/poster-image-2.jpg')">
    <img :src="imageUrl('/poster-image-3.jpg')">
  </div>
</template>

<script>
import { imageUrl } from './asset-utility';

export default {
  methods: {
    imageUrl,
  },
};
</script>
```

Nah, sekarang komponen kita sudah lebih baik, tapi pendekatan ini bakal cepat usang. Menggunakan gaya ngoding seperti ini membuat saya harus selalu menulis referensi impor dan *methods* setiap kali saya ingin menggunakan *utility function* dalam beberapa komponen yang berbeda.

Karena kita perlu membuat fungsi tersebut dapat diakses dalam konteks objek komponen kita, kenapa tidak pakai *mixins* saja sekalian?

``` js
// Ubah kode utility menjadi mixin
// mixins/asset-utility.js
export default {
  methods: {
    imageUrl(path) {
      return `https://cdn.com/${path}`;
    },
  },
};
```

``` html
<template>
  <!-- koleksi gambar -->
  <div>
    <img :src="imageUrl('/poster-image-1.jpg')">
    <img :src="imageUrl('/poster-image-2.jpg')">
    <img :src="imageUrl('/poster-image-3.jpg')">
  </div>
</template>

<script>
import assetUtility from './mixins/asset-utility';

export default {
  mixins: [assetUtility],
};
</script>
```

Dengan menggunakan *mixins*, saya tidak perlu lagi menulis *methods* dalam komponen. Hal ini dapat menghemat beberapa baris kode, tapi saya tetap perlu menulis referensi impor ke *file mixins* dan mendeklarasikannya dalam setiap komponen.

Ada dua hal yang mengganggu saya saat mengubah kode menjadi sebuah *mixin*. Apakah kamu tahu apa saja hal tersebut?

Pertama adalah kejelasan referensi. Saat saya mengubah kode menjadi *mixin*, saya tidak bisa mengetahui secara langsung apa saja fungsi yang tersedia dalam sebuah *mixin* dengan hanya melihat kode di komponen. Hal ini terjadi karena saat membuat *mixin*, saya perlu mengekspor beberapa kode sekaligus dari modul.

Kedua adalah saya memberikan akses yang luas kepada *utility function*. Meskipun kita gak mau, sekarang *utility function* kita bisa mengakses komponen secara penuh. Sebagai contoh, saya bisa saja mengubah sebuah *state* dari dalam *mixin* untuk mengubah cari kerja dari komponen. Implementasi seperti ini tidak bagus karena bisa menambah kompleksitas yang tidak perlu dan dapat memunculkan *bugs* di kemudian hari.

---

Untuk mencegah hal tersebut, kita bisa menggunakan *prototype* untuk membuat *utility function*. Coba lihat contoh berikut ini.


``` js
// misal ini adalah file utama aplikasi Vue kita
// main.js
import Vue from 'vue';
import { imageUrl } from './asset-utility';

Vue.prototype.$imageUrl = imageUrl;

const app = new Vue({
 // konfigurasi vue ditulis disini...
});

app.$mount('#app');
```

``` html
<template>
  <!-- koleksi gambar -->
  <div>
    <img :src="$imageUrl('/poster-image-1.jpg')">
    <img :src="$imageUrl('/poster-image-2.jpg')">
    <img :src="$imageUrl('/poster-image-3.jpg')">
  </div>
</template>
```

Implementasi ini memberikan kita keuntungan dari *mixin* tanpa memberikan akses yang berlebihan kepada *utility function* kita. Karena setiap komponen mewarisi konteks dari objek Vue, *utility function* juga dapat diakses dari dalam konteks sebuah komponen. Bonusnya adalah, *utility function* tidak dapat mengakses konteks dari komponen. Dengan cara ini, saya hanya perlu ngoding sekali di `main.js`, lalu *utility function*-nya bisa dipanggil di semua komponen dalam aplikasi.

Apabila kamu memperhatikan dengan jeli, sekarang kita sudah tidak perlu menulis kode apapun pada *tag script*. Kalaupun kamu ingin pun, kamu juga bisa memanggil fungsi `this.$imageUrl` di dalam *tag script* komponen kamu.

Kamu juga bisa menulis sebuah *plugin* untuk mengurangi inisialisasi *prototype* dalam *file* `main.js`.

``` js
// plugins/asset.js
import { imageUrl } from './asset-utility';

export default {
  install(Vue) {
    Vue.prototype.$imageUrl = imageUrl;
  },
};

// main.js
import Vue from 'vue';
import assetPlugin from './plugins/asset';

Vue.use(assetPlugin);

const app = new Vue({
 // konfigurasi vue ditulis disini...
});

app.$mount('#app');
```

---


Sekarang kita sudah mengulas beberapa cara untuk membuat *shared utilities*. Menurut pengalaman saya, cara yang paling baik untuk membuat *shared utilities* adalah dengan memanfaatkan *prototype*. Dengan menggunakan *prototype*, kita dapat mengurangi duplikasi sekaligus memberikan limitasi akses terhadap konteks sebuah komponen.
