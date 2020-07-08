---
title: Hapus semua listener di beforeDestroy!
slug: hapus-semua-listener-di-beforeDestroy
published_date: 2020-07-08
language: id
type: til
translations:
  en: /til/id/#remove-all-listeners-on-beforeDestroy
---

Menghapus listeners sudah menjadi pengetahuan umum saat bekerja di bagian front-end, tapi saya masih sering lupa dengan itu. Kali ini, saya tidak menghapus sebuah listener scroll pada sebuah page component yang menyebabkan error saat saya bernavigasi ke page lain.

Ini disebabkan karena callback yang dipakai di listener-nya masih mengakses konteks dari component yang, tentu saja, telah dihapus saat berpindah dari page tsb. Solusinya simpel, tinggal menambahkan `removeEventListener` di dalam lifecycle `beforeDestroy`:

``` html
<script>
export default {
  // ...
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollCallback)
  }
}
</script>
```

Meskipun kata orang kita tidak perlu peduli dengan itu selama kita pakai browser modern (yang punya garbage collector yang pintar), hal ini masih akan terjadi terutama kalau app kalian mempunyai routing di client side. Jadi, jangan lupa untuk menghapus semua listener ya!

