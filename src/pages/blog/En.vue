<template>
  <Blog :posts="$page.posts.edges" locale="en">
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
        lang: 'en',
        dir: 'ltr'
      },
      title: this.h1,
      link: [
        {
          href: `${this.$page.metadata.siteUrl}/blog/en/`, rel: 'canonical'
        },
        {
          href: `${this.$page.metadata.siteUrl}/blog/en/`, hreflang: 'en', rel: 'alternate'
        },
        {
          href: `${this.$page.metadata.siteUrl}/blog/`, hreflang: 'id', rel: 'alternate'
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
    BlogHero,
  },
  data() {
    return {
      h1: 'Just a Blog by Rahmanda Wibowo',
      description: 'Collection of my writings in web development and other technology'
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "en"}, type: {eq: "blog"}}) {
    edges {
      node {
        id
        title
        slug
        published_date
        language
        summary
        timeToRead
      }
    }
  }
}
</page-query>
