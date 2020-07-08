---
title: Mengubah Warna Teks Menggunakan D3
slug: mengubah-warna-teks-menggunakan-d3
published_date: 2020-07-07
language: id
type: til
translations:
  en: /til/en/#adjusting-text-color-using-d3
---

Saat saya mengerjakan [visualisasi kalender ini](https://www.nusadata.org/coronavirus-calendar/), saya menemukan cara yang keren untuk mengubah warna teks supaya tampil hitam pada background yang terang dan putih pada background yang gelap.

``` html
<template>
  <div style="display: flex;">
    <div v-for="value in items" :style="{ backgroundColor: `${bgScale(value)}`, width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
      <span :style="{ color: `${colorScale(valueToRatio(value))}` }">{{ value }}</span>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  props: {
    // set data random
    items: {
      type: Array,
      default: () => [0, 1, 20, 30, 40, 23, 33, 50],
    }
  },
  data() {
    return {
      // nilai yang lebih tinggi berarti warnanya lebih gelap, nilai yang lebih rendah
      // berarti warnanya lebih terang
      bgScale: d3.scaleQuantize([0, d3.max(this.items, value => value)], d3.schemeBlues[9]),

      // nilai yang lebih tinggi berarti warnanya putih, nilai yang lebih rendah
      // berarti warnanya hitam
      colorScale: d3.scaleQuantize([0, 1], ['black', 'white']),

      // fungsi untuk mengubah nilai menjadi rasio
      valueToRatio: d3.scaleLinear().domain([0, d3.max(this.items, value => value)]).range([0, 1])
    }
  }
}
</script>
```

Idenya adalah mengubah data menjadi rasio menggunakan fungsi `valueToRatio`, dan membuat dua fungsi scale untuk warna background dan teks.

Dengan nilai yang belum ditransform, ambil warna background dengan fungsi `bgScale` yang mengembalikan warna terang pada range rendah, dan warna gelap pada range tinggi. Lalu dengan nilai rasio, ambil warna teks dengan fungsi `colorScale` yang mengembalikan warna gelap pada range rendah, dan warna terang pada range tinggi.
