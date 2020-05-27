<template>
  <HomeLayout locale="en">
    <article class="max-w-4xl mx-auto pl-5 pr-5 md:pr-20 pt-20 pb-16 flex items-center flex-col md:flex-row" role="main">
      <div class="w-56 flex-none mb-10 md:mb-0 md:mr-10">
        <g-image src="~/images/profile-picture.png" class="rounded-md" alt="Profile picture of Rahmanda Wibowo" />
      </div>
      <h1 class="hidden" aria-hidden="true">{{ h1 }}</h1>
      <p class="md:mb-2 text-lg md:text-xl text-center md:text-left font-light text-gray-800 flex-1 md:mr-10">
        My name is Rahmanda Wibowo. I build web interfaces using pragmatic tools and progressive development. Currently I'm working at <a class="text-indigo-600 underline" href="https://www.bukalapak.com">Bukalapak</a> to develop wide range of digital products and marketplace features.
      </p>
    </article>
    <article class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Some of My Tinkering List</h2>
      <div class="flex flex-wrap -mx-1 text-gray-800">
        <div class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/ambercat">Ambercat</a>
            <p class="text-lg">Stupidly simple static blog generator based on Vue.js and Tailwind CSS</p>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/tailwindscss">Tailwind SCSS</a>
            <p class="text-lg">SCSS version of Tailwind CSS for people who don't use modern module bundler</p>
          </div>
        </div>
        <div class="w-full md:w-1/3 mb-5">
          <div class="text-lg mx-1">
            <a class="text-xl font-bold underline mb-2 block" href="https://github.com/rahmanda/prasmananjs">Prasmanan.js</a>
            <p class="text-lg">Alternative for infinite slider that plays nicely with mobile.</p>
          </div>
        </div>
      </div>
    </article>
    <article class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-500 mb-12">Recent Writings</h2>
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
        <g-link class="text-lg text-gray-600" to="/blog/en/">Read more →</g-link>
      </div>
    </article>
  </HomeLayout>
</template>

<script>
import HomeLayout from '~/layouts/Home';

export default {
  metaInfo() {
    return {
      title: this.h1,
      link: [
        {
          href: this.$page.metadata.siteUrl, rel: 'canonical'
        }
      ]
    }
  },
  components: { HomeLayout },
  data() {
    return {
      h1: 'Rahmanda Wibowo - Yet another web developer'
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
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
