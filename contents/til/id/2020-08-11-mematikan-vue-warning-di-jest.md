---
title: Mematikan Vue Warning di Jest
slug: mematikan-vue-warning-di-jest
published_date: 2020-08-31
language: id
type: til
translations:
  en: /til/en/#silent-vue-warning-on-jest
---

Kalau kamu perlu menggunakan `shallowMount` tetapi aplikasi kamu menggunakan komponen global, kamu mungkin akan terganggu dengan banyaknya log warning yang muncul pada terminal kamu saat menjalankan skrip unit testing.

Untuk mematikan warning tersebut, taruh kode dibawah ini pada setup files yang kamu definisikan dalam [konfigurasi jest kamu](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array).

``` js
global.beforeEach(() => {
  // surpress Vue warn
  spyOnConsoleError = jest.spyOn(global.console, 'error').mockImplementation(message => {
    if (!String(message).includes('[Vue warn]: : Unknown custom element')) {
      consoleError(message);
    }
  });
});
```

Cara ini akan membuat jest hanya mematikan warning untuk error 'unknown custom element' saja.
