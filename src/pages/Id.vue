<template>
  <HomeLayout locale="id">
    <template slot="hero">
      <p class="text-indigo-200 mb-2 text-xl">Selamat, kamu menemukan...</p>
      <p class="text-5xl md:text-6xl leading-tight tracking-tighter font-bold">Satu lagi Web Developer!</p>
    </template>
    <div class="max-w-4xl mx-auto pl-5 pr-5 md:pr-20 pt-20 pb-16 flex items-center flex-col md:flex-row">
      <div class="w-56 flex-none mb-10 md:mb-0 md:mr-10">
        <img src="/profile-picture.png" class="rounded-md" />
      </div>
      <p class="md:mb-2 text-lg md:text-xl text-center md:text-left font-light text-gray-800 flex-1 md:mr-10">
        Saya Rahmanda Wibowo. Saya menggunakan metode pengembangan progresif dan peralatan apa saja untuk membuat tampilan website yang menarik. Saat ini saya bekerja di <a class="text-indigo-600 underline" href="https://www.bukalapak.com">Bukalapak</a> untuk mengembangkan berbagai macam produk digital dan marketplace.
      </p>
    </div>
    <div class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Beberapa hasil otak-atik saya</h2>
      <div class="flex flex-wrap -mx-1 text-gray-800">
        <div class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/ambercat">Ambercat</a>
            <p class="text-lg">Librari sederhana untuk membuat static blog berbasiskan Vue.js dan Tailwind CSS</p>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/tailwindscss">Tailwind SCSS</a>
            <p class="text-lg">Versi SCSS dari Tailwind CSS untuk para pengembang yang belum menggunakan bundler modern</p>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-5">
          <div class="text-lg mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/prasmananjs">Prasmanan.js</a>
            <p class="text-lg">Alternatif untuk infinite slider yang cocok untuk platform desktop dan mobile.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Tulisan Terbaru</h2>
      <div class="flex flex-wrap -mx-2 text-gray-800">
        <div v-for="post in $page.posts.edges" :key="post.node.id" class="w-full md:w-1/3 mb-5">
          <div class="mx-2">
            <time class="text-sm text-gray-600">{{ $date(post.node.published_date, post.node.language) }}</time>
            <g-link
              :to="`/blog/${post.node.language}/${post.node.slug}/`"
              class="text-xl font-bold underline mb-2 block">
              {{ post.node.title }}
            </g-link>
          </div>
        </div>
      </div>
      <div class="text-center">
        <g-link class="text-lg text-gray-600" to="/blog/id/">Lihat selengkapnya →</g-link>
      </div>
    </div>
  </HomeLayout>
</template>

<script>
import HomeLayout from '~/layouts/Home';

export default {
  metaInfo: {
    title: 'Rahmanda Wibowo - Yet another web developer'
  },
  components: { HomeLayout }
}
</script>

<page-query>
query {
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "id"}}, limit: 6) {
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
}
</page-query>
