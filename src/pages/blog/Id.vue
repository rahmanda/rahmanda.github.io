<template>
  <Blog :posts="$page.posts.edges" locale="id">
    <h1 class="hidden" aria-hidden="true">{{ h1 }}</h1>
  </Blog>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo() {
    return {
      title: this.h1,
      link: [
        {
          href: `${this.$page.metadata.siteUrl}/blog/`, rel: 'canonical'
        }
      ],
      meta: [
        {
          name: 'description', content: 'Blog-nya Rahmanda Wibowo membahas seputar pemograman web dan teknologi secara umum'
        }
      ]
    }
  },
  components: { Blog },
  data() {
    return {
      h1: 'Blog-nya Rahmanda Wibowo'
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "id"}, type: {eq: "blog"}}) {
    edges {
      node {
        id
        title
        slug
        published_date
        language
        timeToRead
      }
    }
  }
}
</page-query>
