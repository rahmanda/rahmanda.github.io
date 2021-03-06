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
      <h2 class="text-2xl font-sans-title font-bold text-gray-800 mb-12">My Tinkering List</h2>
      <div class="flex flex-wrap -mx-1 text-gray-800">
        <article v-for="(item, idx) in tinkeringList" :key="idx" class="w-full md:w-1/3 mb-5">
          <div class="mx-1">
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
        <h2 class="text-2xl font-sans-title font-bold text-gray-800 flex-1">Latest Articles</h2>
        <g-link class="text-lg text-gray-600 flex-none" to="/blog/en/">view all articles →</g-link>
      </header>
      <p class="text-lg md:text-xl text-gray-800 mb-12">I write in-depth articles about Vue.js, Javascript, software engineering and development in general. You can read all articles here in English and Bahasa Indonesia.</p>
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
        <g-link class="text-lg text-gray-600 flex-none" to="/til/en/">view all #TIL →</g-link>
      </header>
      <p class="text-lg md:text-xl text-gray-800 mb-12">I take notes about new things that I just learned in my everyday activities. It could be related to work, tech or even random thoughts!</p>
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
    },
    tinkeringList() {
      return [
        {
          name: 'Nusadata',
          url: 'https://www.nusadata.org',
          description: 'Collection of interesting data visualizations and statistics about Indonesia'
        },
        {
          name: 'Ambercat',
          url: 'https://github.com/rahmanda/ambercat',
          description: 'Stupidly simple static blog generator based on Vue.js and Tailwind CSS'
        },
        {
          name: 'Tailwind SCSS',
          url: 'https://github.com/rahmanda/tailwindscss',
          description: 'SCSS version of Tailwind CSS for people who don\'t use modern module bundler'
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
  tils: allTil(sortBy: "published_date", filter: {language: {eq: "en"}}, limit: 6) {
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
