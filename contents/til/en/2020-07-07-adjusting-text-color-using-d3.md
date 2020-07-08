---
title: Adjusting text color using D3
slug: adjusting-text-color-using-d3
published_date: 2020-07-07
language: en
type: til
translations:
  id: /til/id/#mengubah-warna-teks-menggunakan-d3
---

When I was working on [this calendar visualization](https://www.nusadata.org/coronavirus-calendar/), I found a pretty cool method to adjust the text color so that it will appear black on a lighter background and white on a darker background.

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
    // some random data items
    items: {
      type: Array,
      default: () => [0, 1, 20, 30, 40, 23, 33, 50],
    }
  },
  data() {
    return {
      // higher value means darker bg color, lower value means lighter bg color
      bgScale: d3.scaleQuantize([0, d3.max(this.items, value => value)], d3.schemeBlues[9]),

      // higher value will have white color, lower value will have black color
      colorScale: d3.scaleQuantize([0, 1], ['black', 'white']),

      // function to transform value into a ratio
      valueToRatio: d3.scaleLinear().domain([0, d3.max(this.items, value => value)]).range([0, 1])
    }
  }
}
</script>
```

The idea is to transform our data into a ratio with `valueToRatio` function, and have two scale functions for background and text color.

With a untransformed value, get the background color from `bgScale` which returns a lighter color on the lower range, and a darker color on the lower range. Then with a ratio value, get the text color from `colorScale` which returns a darker color on the lower range, and a lighter color on the higher range.
