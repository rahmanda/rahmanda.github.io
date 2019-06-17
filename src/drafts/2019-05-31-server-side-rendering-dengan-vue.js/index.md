---
title: Server Side Rendering dengan Vue.js
---

Vue.js sejatinya adalah *framework* antar-muka yang melakukan proses *rendering* di sisi klien. Dengan kata lain, tag-tag HTML yang kita bangun dengan Vue.js tidak akan muncul sebelum file Javascript terunduh dan dijalankan di dalam *browser*. Namun untuk beberapa kasus seperti SEO, kita perlu mendapatkan tag-tag HTML tsb. seketika, bahkan sebelum Javascript-nya dijalankan. Untuk mengatasi hal ini, kita bisa memanfaatkan fitur *Server Side Rendering* (SSR) pada Vue.js.

## TLDR;

Singkatnya, kode Vue.js kamu nantinya akan di-*compile* menjadi kode yang bisa dijalankan di server (Node.js). Setelah itu, kode hasil *compilation* tsb. akan di-*render* di server untuk menghasilkan tag HTML setiap kali ada rekues HTML ke server web.

## Batasan

Pilihan teknologi membatasi implementasi SSR pada aplikasi yang telah kamu miliki saat ini. Berikut rangkuman batasan-batasan untuk SSR Vue.js (yang mungkin berlaku juga untuk SSR pada *framework* lain yang sejenis).

1. Hanya bisa menggunakan Node.js. Kalau aplikasi kamu monolitik (web dan *backend*-nya satu kesatuan), cukup sulit untuk mengimplementasikan SSR.
2. Perlu menggunakan *module bundler* untuk mentransformasi kode Vue.js kamu agar bisa dijalankan di server. Jadi bagi yang *ngoding* Vue.js-nya menggunakan versi CDN atau *distribution* tidak akan bisa mengimplementasikan SSR.

## Kode Vue.js untuk Server

Sudah beberapa kali disampaikan bahwa untuk melakukan SSR, kita perlu meng-*compile* dahulu kode Vue.js kita menjadi kode yang bisa dijalankan di server. Oleh karena itu, kita perlu memerhatikan kode Vue.js kita agar tidak *error* saat dijalankan di server. Beberapa poin yang perlu diperhatikan adalah:

### 1. Hanya menggunakan window pada beforeMount atau mounted

### 2.

### 3. Tidak menggunakan Vue.mount pada server

## Module Bundler

Untuk konfigurasi *module bundler* sebenarnya cukup sederhana, yaitu dengan mengubah target *compilation* pada *module bundler* yang kita gunakan. Berikut adalah contoh konfigurasi untuk beberapa *module bundler* yang populer.

``` js
// Konfigurasi Webpack
module.exports = {
  target: 'node', // set nilai target menjadi 'node'
  entry: path.resolve(__dirname, 'your-app.js'),
  output: {
    path: __dirname,
    filename: 'your-app.server.js',
    libraryTarget: 'commonjs2', // set nilai libraryTarget menjadi 'commonjs2' agar bisa diimpor ke kode Node.js
  },
};

// Konfigurasi Rollup
module.exports = {
  input: path.resolve(__dirname, 'your-app.js'),
  output: {
    file: 'your-app.server.js',
    format: 'cjs', // set nilai format menjadi 'cjs'
  },
};
```

Karena kita perlu melakukan kompilasi untuk browser dan server, kita perlu memisahkan konfigurasi untuk browser dan server. Contoh penggunaannya kira-kira akan seperti di bawah ini.

``` js
// Webpack
const webpack = require('webpack');
const webpackConfigs = [
  require('webpack.client.config'),
  require('webpack.server.config'),
];

webpack(webpackConfigs, (err, stats) => {
  if (err || stats.hasErrors()) {
    throw err;
  }
  console.log('Selesai!');
})

// Rollup
const rollup = require('rollup');
const rollupConfigs = [
  require('rollup.client.config'),
  require('rollup.server.config'),
];

rollupConfigs.forEach((config) => {
  rollup.rollup(config.input)
    then(bundle => {
      bundle.write(config.output);
    });
})
```

## Vue-Server-Renderer

Vue memiliki *package* tersendiri untuk melakukan *rendering* di server, yaitu `vue-server-renderer`.
