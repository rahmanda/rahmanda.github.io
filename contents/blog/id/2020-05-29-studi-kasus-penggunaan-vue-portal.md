---
title: Studi Kasus Penggunaan Vue Portal
summary: Saya memberikan beberapa contoh studi kasus penggunaan vue portal untuk meningkatkan struktur aplikasi Vue
slug: studi-kasus-penggunaan-vue-portal
published_date: 2020-05-29
language: id
type: blog
translations:
  en: /blog/en/vue-portal-in-action/
---

Apakah kamu pernah galau saat mengubah state suatu komponen dari komponen lain yang sangat jauh posisinya di dalam struktur komponen kamu? Daripada membuat terlalu banyak emitter yang melalui beberapa lapisan komponen, mungkin pada akhirnya kamu memilih untuk menggunakan event bus atau sebuah state management saja. Sekarang dengan adanya konsep portal, kamu baru saja menemukan sebuah alternatif lain.

## Konsep

Sebenarnya konsepnya cukup sederhana. Daripada menggunakan event atau global state, kamu hanya perlu menggunakan komponen. Buat sebuah komponen sebagai portal target, lalu kamu bisa langsung mengtransfer tags atau komponen kesana dengan membungkus komponennya dengan sebuah portal gate yang sudah diarahkan ke target. Dengan cara ini, kita bisa menjadi lebih kreatif saat membuat struktur aplikasi kita tanpa perlu khawatir dimana komponen kita akan muncul.

---

Agar kamu lebih paham bagaimana mengimplementasikan konsep ini secara nyata, saya akan membagikan beberapa contoh penggunaan portal di Vue.

## Kasus 1: Modal dalam button

Misalkan aplikasi kita memiliki beberapa button. Saat kita mengklik button, modal akan muncul.

``` html
<!-- komponen utama -->
<!-- App.vue -->
<template>
  <div>
    <div class="actions">
      <button @click="openCreateModal">Buat postingan</button>
      <button @click="openEditModal">Edit postingan</button>
      <button @click="openConfirmModal">Hapus postingan</button>
    </div>
    <div v-if="showCreateModal" class="modal">
      <!-- konten modal untuk buat postingan -->
      <button @click="closeCreateModal">Tutup</button>
    </div>
    <div v-if="showEditModal" class="modal">
      <!-- konten modal untuk edit postingan -->
      <button @click="closeEditModal">Close</button>
    </div>
    <div v-if="showConfirmModal" class="modal">
      <!-- konten modal untuk hapus postingan -->
      <button @click="closeConfirmModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCreateModal: false,
      showEditModal: false,
      showConfirmModal: false,
    };
  },
  methods: {
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    openEditModal() {
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
    },
    openConfirmModal() {
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
  },
};
</script>
```
Apabila kita ingin membuat modal yang baru, kita perlu membuat sebuah state dan method untuk mengontrol state-nya. Tapi setelah dilihat-lihat, ternyata modal ini hanya berinteraksi dengan button yang berhubungan saja. Untuk memperbaikinya, kita bisa membuat sebuah abstraksi untuk menaruh semua logic yang relevan dalam satu tempat.

Permasalahannya, kita tidak dapat memindahkan komponen modal keluar untuk mengurangi logic di dalam `App.vue`. Semua modal harus tetap berada di `App.vue` karena kita perlu menerapkankan `z-index` yang bergantung kepada kedalaman dari sebuah tag (tag child tidak bisa tampil di atas parent tag-nya meskipun tag-nya mempunyai nilai `z-index` yang lebih tinggi). Dengan [vue-portal](https://portal-vue.linusb.org/), kita bisa mengelompokkan button dan modal menjadi satu komponen.

``` html
<!-- CreatePostButton.vue -->
<template>
  <button @click="openModal">
    Create a post
    <!-- bungkus modal dengan tag portal -->
    <!-- nilai 'to' harus sama dengan nilai yang kita set untuk 'name' di portal-target di App.vue -->
    <portal v-if="showModal" to="app">
      <div class="modal">
        <!-- konten modal -->
        <button @click="closeModal">Close</button>
      </div>
    </portal>
  </button>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<!-- App.vue -->
<template>
  <div>
    <div class="actions">
      <create-post-button/>
      <edit-post-button/>
      <delete-post-button/>
    </div>

    <!-- secara default, portal-target akan menjadi sebuah tag div pada DOM -->
    <portal-target name="app"/>
  </div>
</template>

<script>
import CreatePostButton from './CreatePostButton.vue';
import EditPostButton from './EditPostButton.vue';
import DeletePostButton from './DeletePostButton.vue';

export default {
  components: {
    CreatePostButton,
    EditPostButton,
    DeletePostButton,
  },
};
</script>
```

Hasilnya, kode `App.vue` kita sekarang menjadi jauh lebih bersih karena semua logic yang berhubungan telah dikelompokkan dan dipindahkan ke dalam komponen terpisah. Kita juga tetap bisa menggunakan `z-index` di modal kita karena tag-nya tetap akan dimunculkan di dalam `portal-target` saat button-nya diklik.

Agak aneh memang, sekarang kita jadi punya modal di dalam tag button. Namun, ini hanya sebuah representasi dari struktur komponen, bukan DOM yang beneran. Tapi jangan khawatir karena seluruh tag modal akan ditransfer ke dalam tag `portal-target` saat kondisinya terpenuhi.

## Kasus 2: Ganti konten saat route berubah

Misalkan aplikasi kita menggunakan [vue-router](https://router.vuejs.org/) dan kita memiliki sebuah sidebar untuk bernavigasi. Konten di dalam sidebar bisa berubah tergantung dengan path yang sedang aktif. Tapi, kontainer dari sidebar-nya harus diletakkan di luar dari `router-view` untuk kegunaan styling.

``` js
// routes.js
// impor semua komponen page

export default [
  { path: '/', component: HomePage },
  { path: '/product', component: ProductPage },
  { path: '/product/active', component: ProductActivePage },
  { path: '/product/inactive', component: ProductInactivePage },
  { path: '/product/drafted', component: ProductDraftedPage },
  // ....
];
```

``` html
<!-- App.vue -->
<template>
  <div>
    <aside>
      <div v-if="$route.path === '/'">
        <router-link to="/product">Produk</router-link>
        <router-link to="/transaction">Transaksi</router-link>
      </div>

      <div v-if="$route.path === '/product'">
        <router-link to="/">Kembali ke beranda</router-link>
        <router-link to="/product/active">Produk aktif</router-link>
        <router-link to="/product/inactive">Produk non-aktif</router-link>
        <router-link to="/product/drafted">Produk draf</router-link>
      </div>

      <!-- ... -->

    </aside>

    <router-view/>

  </div>
</template>
```

Kode di dalam `App.vue` kita penuh dengan pengecekan path. Agar lebih bagus, kita bisa menaruh `portal-target` di dalam tag `aside` dan memindahkan semua link ke dalam komponen page-nya masing-masing.

``` html
<!-- HomePage.vue -->
<template>
  <div>
    <portal to="app">
      <div>
        <router-link to="/product">Produk</router-link>
        <router-link to="/transaction">Transaksi</router-link>
      </div>
    </portal>
    <!-- dan komponen-komponen lainnya -->
  </div>
</template>

<!-- ProductPage.vue -->
<template>
  <div>
    <portal to="app">
      <div>
        <router-link to="/">Kembali ke beranda</router-link>
        <router-link to="/product/active">Produk aktif</router-link>
        <router-link to="/product/inactive">Produk non-aktif</router-link>
        <router-link to="/product/drafted">Produk draf</router-link>
      </div>
    </portal>
    <!-- dan tag-tag lainnya -->
  </div>
</template>

<!-- App.vue -->
<template>
  <div>
    <!-- kamu bisa mengeset tipe tag dari portal-target menggunakan prop 'tag' -->
    <portal-target name="app" tag="aside"/>
    <router-view/>
  </div>
</template>

```

Karena `router-view` sudah tahu bagaimana menampilkan komponen page berdasarkan path saat ini, kita tidak perlu lagi membuat kondisi apapun dalam komponen page-nya. Sekali lagi, dengan menggunakan portal `App.vue` kita menjadi lebih bersih dan semua kode berada di dalam tempat yang seharusnya.

Kamu mungkin tidak suka menggunakan pendekatan ini apabila kamu hanya memiliki satu bagian yang dapat berganti-ganti. Namun, keuntungan dari pendekatan ini akan terlihat lebih jelas apabila aplikasi kamu punya lebih dari satu bagian yang berganti-ganti.

## Kasus 3: Mendistribusikan konten dari dalam komponen Promise

Mungkin kamu sama dengan saya, suka menggunakan [vue-promised](https://github.com/posva/vue-promised). Librari itu membantu saya untuk tidak membuat state yang berulang-ulang setiap kali ada API request. Meskipun demikian, penggunaannya menjadi kurang menyenangkan apabila ada beberapa bagian yang bergantung kepada state promise-nya. Hal ini karena state hanya bisa diakses dari dalam komponen `promised`.

``` html
<!-- App.vue -->
<template>
  <div>
    <div class="breadcrumb">
      <ul>
        <li>Beranda</li>
        <li>Invoice</li>
      </ul>
    </div>

    <promised :promise="requestInvoice">
      <p v-slot:pending>Menunggu...</p>

      <div v-slot:data>
        <!-- konten of detail invoice -->
      </div>

      <p v-slot:rejected="error">
        Ada error dari server. Mohon menunggu sampai kami memperbaikinya.
      </p>
    </promised>
  </div>
</template>
```

Contoh di atas dapat bekerja dengan baik-baik saja, kecuali satu hal. Saya perlu mengubah bagian breadcrumb saat promise-nya telah sukses. Ayo kita coba ubah kodenya dengan menggunakan portal.

``` html
<!-- App.vue -->
<template>
  <div>
    <portal-target class="breadcrumb" name="breadcrumb">
      <ul>
        <li>Beranda</li>
        <li>Invoice</li>
      </ul>
    </portal-target>

    <promised :promise="requestInvoice">
      <p v-slot:pending>Menunggu...</p>

      <template v-slot:data>
        <portal to="breadcrumb">
          <ul>
            <li>Beranda</li>
            <li>Invoice</li>
            <li>{{ data.payment_id }}</li>
          <ul>
        </portal>

        <div>
          <!-- konten dari detail invoice -->
        </div>
      </template>

      <p v-slot:rejected="error">
        Ada error dari server. Mohon menunggu sampai kami memperbaikinya.
      </p>
    </promised>
  </div>
</template>

```

Dengan menggunakan portal, kita bisa mendistribusikan konten dari dalam komponen `promised` dengan tetap mendapatkan struktur yang sama. Slot dari `portal-target` sangat berguna untuk menaruh tag-tag default. Daripada hanya membuat tag-tag yang biasa, untuk kasus tertentu kamu mungkin ingin menggantinya dengan shimmering loader yang bisa memberitahukan user bahwa ada sesuatu yang sedang diproses.

## Penutup

Awalnya saya pikir kita hanya bisa membuat struktur aplikasi berbasiskan kepada hubungan antara parent dan child komponen saja. Namun dengan adanya portal, kita bisa menghapus limitasi tersebut sehingga kita bisa memperbanyak cara dalam strukturisasi aplikasi kita tanpa terbatas kepada lokasi komponen atau template.

