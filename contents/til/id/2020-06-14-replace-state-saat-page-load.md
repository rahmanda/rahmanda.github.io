---
title: Replace state saat page load
slug: replace-state-saat-page-load
published_date: 2020-06-14
language: id
type: til
translations:
  en: /til/en/#replace-state-on-page-load
---

Setiap kali kamu mengontrol history via JS menggunakan `window.history` dan `onpopstate` untuk mengatasi event back, kamu perlu menaruh `replaceState` saat page load. Hal ini disebabkan saat user mengunjungi sebuah URL untuk pertama kali, state history untuk page tersebut masih kosong dan akan menimbulkan bug saat user mencoba kembali ke halaman ini menggunakan back button.


