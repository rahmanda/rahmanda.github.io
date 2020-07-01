---
title: Membuat Komponen untuk Mengecek Viewport di Vue
slug: membuat-komponen-untuk-mengecek-viewport-di-vue
published_date: 2020-06-22
language: id
type: blog
translations:
  en: /blog/en/building-component-to-check-viewport-in-vue
---

Kadang-kadang kita perlu mengecek viewport melalui JS untuk melengkapi media query CSS untuk membuat sebuah desain web yang responsif. Pada artikel ini, saya akan menjelaskan bagaimana cara mengimplementasikannya sebagai suatu komponen untuk mendapatkan keuntungan reusabilitas dan penggunaan secara deklaratif pada template.

## Mendesain API-nya

Misalkan kita hanya ingin menggunakan nilai viewport dari slot scope. Di bawah ini adalah ide kasar bagaimana kita akan menggunakannya di template.

``` html
<template>
  <Viewport>
    <template v-slot:default="{ value }">
      <div v-if="value > 1280">
        <!-- konten yang tampil -->
      </div>
      <div v-else>
        <!-- konten default -->
      </div>
    </template>
  </Viewport>
</template>
```

Pada komponen ini, kita hanya menggunakan slot default untuk menyediakan nilai viewport. Properti `value` perlu diubah setiap kali pengguna melakukan resize pada layar browser. Oleh karena itu, kita akan membutuhkan listener untuk event resize untuk mengupdate nilai viewport di komponen.

## Implementasi

Kita akan membuat sebuah state untuk menyimpan nilai viewport dan mengembalikannya sebagai slot prop. Kodenya akan terlihat seperti di bawah ini:

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  render() {
    // mengembalikan state sebagai slot props
    return this.$scopedSlots.default({
      value: this.value
    })
  }
}
</script>
```

Sekarang kita perlu mengeset nilai awal dari state pada lifecycle `mounted`.

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  // set nilai awal 'value'
  mounted() {
    this.value = window.innerWidth
  },
  // ...
}
</script>
```

Karena kita ingin state `value` untuk berubah setiap saat pengguna melakukan resize, kita akan mengeset sebuah event listener seperti berikut ini.

``` html
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    // kita membuat sebuah method untuk bagian ini
    // supaya kita bisa menggunakannya kembali nanti di dalam listener
    this.setValue()
    this.setListener()
  },
  methods: {
    setValue() {
      this.value = window.innerWidth
    },
    setListener() {
      let timeout
      // karena event resize bisa menjadi proses yang cukup intensif
      // kita menggunakan requestAnimationFrame supaya tidak menghalangi proses rendering browser
      window.addEventListener('resize', () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.setValue()
        })
      })
    }
  }
  // ...
}
</script>

```

Dan selesai!

## Menambahkan fungsi breakpoint

Daripada mengecek secara manual nilai viewport dari komponen, kita juga bisa menambahkan fungsi breakpoint di komponen supaya kita tidak perlu menambahkan nilai-nilai aneh atau mengimpor konfigurasi breakpoint dari framework CSS kita ke template. Penggunaannya akan terlihat seperti di bawah ini:

``` html
<template>
  <Viewport>
    <template v-slot:default="{ breakpoint }">
      <div v-if="breakpoint === 'lg'">
        <!-- konten untuk ditampilkan pada layar yang lebih lebar -->
      </div>
      <div v-else>
        <!-- konten untuk ditampilkan pada layar yang lebih kecil -->
      </div>
    </template>
  </Viewport>
</template>
```

Untuk menambahkan fungsi breakpoint, kita perlu memperkenalkan state baru dengan nama `breakpoint`, lalu state tersebut akan berubah tergantung kepada state `value`. Kita akan memanfaatkan watcher untuk men-track state `value` dan menjalankan sebuah method untuk mengubah state `breakpoint`.

``` html
<script>
export default {
  data() {
    return {
      value: 0,
      // tambah state baru
      breakpoint: ''
    }
  },
  // menambahkan watcher untuk state 'value'
  watch: {
    value: {
      // perlu mengeset immediate sebagai 'true' untuk menjalankan handler
      // segera setelah observasi state-nya dimulai
      immediate: true,
      handler: 'setBreakpoint'
    }
  },
  // ...
  methods: {
    // ...
    // Saya menggunakan aturan small-to-large disini
    // tapi kamu bisa mengubah logic-nya sesuai keperluan
    setBreakpoint(value) {
      let breakpoint = 'xs'

      if (value >= 576) {
        breakpoint = 'sm'
      } else if (value >= 756) {
        breakpoint = 'md'
      } else if (value >= 1024) {
        breakpoint = 'lg'
      } else if (value >= 1280) {
        breakpoint = 'xl'
      }

      this.breakpoint = breakpoint
    }
  },
  render() {
    return this.$scopedSlots.default({
      value: this.value,
      // mengembalikan state 'breakpoint' sebagai slot props
      breakpoint: this.breakpoint
    })
  }
}
</script>
```

Akhirnya, versi komplit dari kodenya akan terlihat seperti ini.

``` html
<script>
export default {
  data() {
    return {
      value: 0,
      breakpoint: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'setBreakpoint'
    }
  },
  mounted() {
    this.setValue()
    this.setListener()
  },
  methods: {
    setValue() {
      this.value = window.innerWidth
    },
    setListener() {
      let timeout
      window.addEventListener('resize', () => {
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(() => {
          this.setValue()
        })
      })
    },
    setBreakpoint(value) {
      let breakpoint = 'xs'

      if (value >= 576) {
        breakpoint = 'sm'
      } else if (value >= 756) {
        breakpoint = 'md'
      } else if (value >= 1024) {
        breakpoint = 'lg'
      } else if (value >= 1280) {
        breakpoint = 'xl'
      }

      this.breakpoint = breakpoint
    }
  },
  render() {
    return this.$scopedSlots.default({
      value: this.value,
      breakpoint: this.breakpoint
    })
  }
}
</script>
```

Selesai! Semoga bermanfaat!
