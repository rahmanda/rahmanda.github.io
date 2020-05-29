<template>
  <div class="bg-gray-50">
    <div class="bg-indigo-800">
      <div class="max-w-4xl text-gray-100 mx-auto px-5 pt-16 pb-20 font-sans-title">
        <p class="text-indigo-200 mb-2 text-xl">It looks like...</p>
        <p class="text-5xl md:text-6xl leading-tight tracking-tighter font-bold">You just got lost!</p>
      </div>
    </div>
    <article class="max-w-4xl mx-auto px-5 py-12">
      <h1 class="hidden" aria-hidden="true">
        {{ h1 }}
      </h1>
      <p class="text-xl mb-8">
        In this situation, people will find these links useful:
      </p>
      <ul class="text-lg">
        <li class="block mb-5">
          <g-link class="c-link" to="/">Rahmanda's homepage</g-link>
        </li>
        <li class="block mb-5">
          <g-link class="c-link" to="/blog/en/">Blog by Rahmanda</g-link>
        </li>
        <li v-for="post in $page.posts.edges" :key="post.node.id" class="block mb-5">
          <g-link
            class="c-link"
            :to="`/blog/${post.node.language}/${post.node.slug}/`">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>

export default {
  metaInfo() {
    return {
      htmlAttrs: {
        lang: 'en',
        dir: 'ltr'
      },
      title: this.h1,
      link: [
        {
          href: `${this.$page.metadata.siteUrl}/404/`, rel: 'canonical'
        }
      ],
      meta: [
        {
          name: 'description', content: `It looks like you just got lost!. But don't worry though, you are still on the right website (right?).`
        }
      ]
    }
  },
  data() {
    return {
      h1: 'It looks like you just got lost!'
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
