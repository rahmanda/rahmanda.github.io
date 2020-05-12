<template>
  <HomeLayout>
    <div class="max-w-4xl mx-auto pl-5 pr-20 pt-20 pb-20 flex items-center">
      <div class="w-1/4 flex-none mr-10">
        <img src="/profile-picture.png" class="rounded-md" />
      </div>
      <p class="mb-2 text-xl font-light text-gray-800 flex-1 mr-10">
        My name is Rahmanda Wibowo. I build web interfaces using pragmatic tools and progressive development. Currently I'm working at <a class="text-indigo-600 underline" href="https://www.bukalapak.com">Bukalapak</a> to develop wide range of digital products and marketplace features.
      </p>
    </div>
    <div class="max-w-4xl mx-auto px-5 py-16">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Some of My Tinkering List</h2>
      <div class="flex -mx-1 text-gray-800">
        <div class="w-1/3">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/ambercat">Ambercat</a>
            <p class="text-lg">Stupidly simple static blog generator based on Vue.js and Tailwind CSS</p>
          </div>
        </div>
        <div class="w-1/3">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/tailwindscss">Tailwind SCSS</a>
            <p class="text-lg">SCSS version of Tailwind CSS for people who don't use modern module bundler</p>
          </div>
        </div>
        <div class="w-1/3">
          <div class="text-lg mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/prasmananjs">Prasmanan.js</a>
            <p class="text-lg">Alternative for infinite slider that plays nicely with mobile.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto px-5 py-16">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Recent Writings</h2>
      <div class="flex flex-wrap -mx-2 text-gray-800">
        <div v-for="post in $page.posts.edges" :key="post.node.id" class="w-1/3 mb-10">
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
        <g-link class="text-lg text-gray-600" to="/blog/en/">Read more →</g-link>
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
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "en"}}, limit: 6) {
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