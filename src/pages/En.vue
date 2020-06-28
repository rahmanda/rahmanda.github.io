<template>
  <HomeLayout locale="en">
    <section class="max-w-4xl mx-auto pl-5 pr-5 md:pr-20 pt-20 pb-16 flex items-center flex-col md:flex-row" role="main">
      <div class="w-56 flex-none mb-10 md:mb-0 md:mr-10">
        <g-image src="~/images/profile-picture.png" class="rounded-md" alt="Profile picture of Rahmanda Wibowo" />
      </div>
      <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
      <p class="md:mb-2 text-lg md:text-xl text-center md:text-left font-light text-gray-800 flex-1 md:mr-10">
        My name is Rahmanda Wibowo. I build web interfaces using pragmatic tools and progressive development. Currently I'm working at <a class="text-indigo-600 underline" href="https://www.bukalapak.com">Bukalapak</a> to develop wide range of digital products and marketplace features.
      </p>
    </section>
    <section class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-800 mb-12">Some of My Tinkering List</h2>
      <div class="flex flex-wrap -mx-1 text-gray-800">
        <article class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <h3 class="mb-2">
              <a class="c-link" href="https://www.nusadata.org">Nusadata</a>
            </h3>
            <p class="text-lg">Collection of interesting data visualizations and statistics about Indonesia</p>
          </div>
        </article>
        <article class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <h3 class="mb-2">
              <a class="c-link" href="https://github.com/rahmanda/ambercat">Ambercat</a>
            </h3>
            <p class="text-lg">Stupidly simple static blog generator based on Vue.js and Tailwind CSS</p>
          </div>
        </article>
        <article class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
            <h3 class="mb-2">
              <a class="c-link" href="https://github.com/rahmanda/tailwindscss">Tailwind SCSS</a>
            </h3>
            <p class="text-lg">SCSS version of Tailwind CSS for people who don't use modern module bundler</p>
          </div>
        </article>
      </div>
    </section>
    <section class="max-w-4xl mx-auto px-5 py-12">
      <h2 class="text-center text-2xl font-sans-title font-bold text-gray-800 mb-12">Recent Writings</h2>
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
      <div class="text-center">
        <g-link class="text-lg text-gray-600" to="/blog/en/">Read more →</g-link>
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
      const title = 'Rahmanda Wibowo - Yet another web developer'
      const description = 'My name is Rahmanda Wibowo. I build web interfaces using pragmatic tools and progressive development. Currently I\'m working at Bukalapak to develop wide range of digital products and marketplace features.'
      const siteUrl = this.$page.metadata.siteUrl
      const url = `${siteUrl}/en/`

      return {
        title,
        htmlAttrs: {
          lang: 'en',
          dir: 'ltr'
        },
        link: [
          {
            href: siteUrl, rel: 'canonical'
          },
          {
            href: url, hreflang: 'en', rel: 'alternate'
          },
          {
            href: `${siteUrl}/id/`, hreflang: 'id', rel: 'alternate'
          }
        ],
        meta: this.$generateMeta(title, description, siteUrl, url)
      }
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "en"}, type: {eq: "blog"}}, limit: 6) {
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
