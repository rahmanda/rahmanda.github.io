<template>
  <HomeLayout locale="id">
    <template slot="hero">
      <p class="text-indigo-200 mb-2 text-xl">Selamat, kamu menemukan...</p>
      <p class="text-5xl md:text-6xl leading-tight tracking-tighter font-bold">Satu lagi Web Developer!</p>
    </template>
    <section class="max-w-4xl mx-auto pl-5 pr-5 md:pr-20 pt-20 pb-16 flex items-center flex-col md:flex-row" role="main">
      <div class="w-56 flex-none mb-10 md:mb-0 md:mr-10">
        <g-image src="~/images/profile-picture.png" class="rounded-md" alt="Foto profil Rahmanda Wibowo" />
      </div>
      <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
      <p class="md:mb-2 text-lg md:text-xl text-center md:text-left font-light text-gray-800 flex-1 md:mr-10">
        Saya Rahmanda Wibowo. Saya menggunakan metode pengembangan progresif dan peralatan apa saja untuk membuat tampilan website yang menarik. Saat ini saya bekerja di <a class="text-indigo-600 underline" href="https://www.bukalapak.com">Bukalapak</a> untuk mengembangkan berbagai macam produk digital dan marketplace.
      </p>
    </section>
    <section class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-2xl font-sans-title font-bold text-gray-800 mb-12">Hasil otak-atik saya</h2>
      <div class="flex flex-wrap -mx-1 text-gray-800">
        <article v-for="(item, idx) in tinkeringList" :key="idx" class="w-full md:w-1/3 mb-5">
          <div class="text-lg mx-1">
            <h3 class="mb-2">
              <a class="c-link" :href="item.url">{{ item.name }}</a>
            </h3>
            <p class="text-lg">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </section>
    <section class="max-w-4xl mx-auto px-5 py-12">
      <header class="flex items-center mb-8">
        <h2 class="text-2xl font-sans-title font-bold text-gray-800 flex-1">Tulisan Terbaru</h2>
        <g-link class="text-lg text-gray-600 flex-none" to="/blog/id/">lihat semua artikel →</g-link>
      </header>
      <p class="text-lg md:text-xl text-gray-800 mb-12">
        Saya suka menulis artikel mengenai Vue.js, Javascript, software engineering dan web development pada umumnya. Kamu bisa membaca semua artikel di sini dalam Bahasa Indonesia dan Inggris.
      </p>
      <div class="flex flex-wrap -mx-2 text-gray-800">
        <article v-for="post in $page.posts.edges" :key="post.node.id" class="w-full md:w-1/3 mb-8">
          <div class="mx-2">
            <header>
              <time class="text-sm text-gray-600">{{ $date(post.node.published_date, post.node.language) }}</time>
            </header>
            <h3>
              <g-link
                :to="`/blog/${post.node.language}/${post.node.slug}/`"
                class="c-link">
                {{ post.node.title }}
              </g-link>
            </h3>
          </div>
        </article>
      </div>
    </section>
    <section class="max-w-4xl mx-auto px-5 py-12">
      <header class="flex items-center mb-8">
        <h2 class="text-2xl font-sans-title font-bold text-gray-800 flex-1">#TIL</h2>
        <g-link class="text-lg text-gray-600 flex-none" to="/til/en/">lihat semua #TIL →</g-link>
      </header>
      <p class="text-lg md:text-xl text-gray-800 mb-12">
        Saya juga suka menulis catatan mengenai hal-hal baru yang baru saya temui dalam kegiatan sehari-hari yang berhubungan dengan pekerjaan, teknologi, ataupun hasil pemikiran yang random!
      </p>
      <div class="flex flex-wrap -mx-2 text-gray-800">
        <article v-for="til in $page.tils.edges" :key="til.node.id" class="w-full md:w-1/3 mb-8">
          <div class="mx-2">
            <header>
              <time class="text-sm text-gray-600">{{ $date(til.node.published_date, til.node.language) }}</time>
            </header>
            <h3>
              <g-link
                :to="`/til/${til.node.language}/#${til.node.slug}`"
                class="c-link">
                {{ til.node.title }}
              </g-link>
            </h3>
          </div>
        </article>
      </div>
    </section>

  </HomeLayout>
</template>

<script>
import HomeLayout from '~/layouts/Home';

export default {
  metaInfo() {
    return this.meta
  },
  components: { HomeLayout },
  computed: {
    meta() {
      const title = 'Rahmanda Wibowo - Satu lagi web developer'
      const description = 'Saya Rahmanda Wibowo. Saya menggunakan metode pengembangan progresif dan peralatan apa saja untuk membuat tampilan website yang menarik. Saat ini saya bekerja di Bukalapak untuk mengembangkan berbagai macam produk digital dan marketplace.'
      const siteUrl = this.$page.metadata.siteUrl
      const url = `${siteUrl}/id/`

      return {
        title,
        htmlAttrs: {
          lang: 'id',
          dir: 'ltr'
        },
        link: [
          {
            href: url, rel: 'canonical'
          },
          {
            href: url, hreflang: 'id', rel: 'alternate'
          },
          {
            href: `${siteUrl}/en/`, hreflang: 'en', rel: 'alternate'
          }
        ],
        meta: this.$generateMeta(title, description, siteUrl, url)
      }
    },
    tinkeringList() {
      return [
        {
          name: 'Nusadata',
          url: 'https://www.nusadata.org',
          description: 'Kumpulan visualisasi data dan statistik yang menarik seputar Indonesia'
        },
        {
          name: 'Ambercat',
          url: 'https://github.com/rahmanda/ambercat',
          description: 'Librari sederhana untuk membuat static blog berbasiskan Vue.js dan Tailwind CSS'
        },
        {
          name: 'Tailwind SCSS',
          url: 'https://github.com/rahmanda/tailwindscss',
          description: 'Versi SCSS dari Tailwind CSS untuk para pengembang yang belum menggunakan bundler modern'
        }
      ]
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "id"}, type: {eq: "blog"}}, limit: 6) {
    edges {
      node {
        id
        title
        slug
        published_date
        language
      }
    }
  }
  tils: allTil(sortBy: "published_date", filter: {language: {eq: "id"}}, limit: 6) {
    edges {
      node {
        id
        title
        content
        slug
        published_date
        language
      }
    }
  }

}
</page-query>
