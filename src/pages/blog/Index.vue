<template>
  <Blog :posts="$page.posts.edges" locale="id">
    <BlogHero :h1="h1">
      {{ description }}
    </BlogHero>
  </Blog>
</template>

<script>
import Blog from '~/components/Blog.vue'
import BlogHero from '~/components/BlogHero.vue'

export default {
  metaInfo() {
    return {
      htmlAttrs: {
        lang: 'id',
        dir: 'ltr'
      },
      title: this.h1,
      link: [
        {
          href: `${this.$page.metadata.siteUrl}/blog/`, rel: 'canonical'
        },
        {
          href: `${this.$page.metadata.siteUrl}/blog/en/`, hreflang: 'en', rel: 'alternate'
        }
      ],
      meta: [
        {
          key: 'description', name: 'description', content: this.description
        }
      ]
    }
  },
  components: {
    Blog,
    BlogHero
  },
  data() {
    return {
      h1: 'Just a Blog by Rahmanda Wibowo',
      description: 'Kumpulan artikel seputar pemograman web dan teknologi lainnya'
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
        summary
      }
    }
  }
}
</page-query>
