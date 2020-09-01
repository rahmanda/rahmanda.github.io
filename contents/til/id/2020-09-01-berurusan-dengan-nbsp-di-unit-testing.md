---
title: Berurusan dengan &nbsp; di unit testing
slug: berurusan-dengan-nbsp-di-unit-testing
published_date: 2020-09-01
language: id
type: til
translations:
  en: /til/en/#dealing-with-nbsp-on-unit-testing
---

Kadang-kadang kita perlu menggunakan `&nbsp;` pada HTML kita sebagai pengganti dari spasi. Tetapi karena `&nbsp;` mempunyai byte code yang berbeda, perbandingan antara `&nbsp;` dan spasi akan mengembalikan nilai false. Oleh karena itu apabila kita ingin melakukan unit testing dengan sebuah teks HTML yang mengandung karakter `&nbsp;`, kita perlu mengganti spasi dengan `\u00a0` (`&nbsp;` akan ditransform ke kode unix saat dirender).

``` js
const mount = function render() {
  return <p>&nbsp;</p>;
}

const wrapper = mount();

expect(wrapper.text()).toBe(' '); // false
expect(wrapper.text()).toBe('\u00a0'); // true
```
