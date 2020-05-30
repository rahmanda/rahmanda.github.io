<template>
  <Blog :posts="$page.posts.edges" locale="en">
    <BlogHero :h1="meta.title">
      {{ meta.description }}
    </BlogHero>
  </Blog>
</template>

<script>
import Blog from '~/components/Blog.vue'
import BlogHero from '~/components/BlogHero.vue'

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    Blog,
    BlogHero,
  },
  computed: {
    meta() {
      const title = 'Just a Blog by Rahmanda Wibowo'
      const description = 'Collection of my writings in web development and other technology'
      const siteUrl = this.$page.metadata.siteUrl
      const url = `${siteUrl}/blog/en/`

      return {
        htmlAttrs: {
          lang: 'en',
          dir: 'ltr'
        },
        title,
        description,
        link: [
          {
            href: url, rel: 'canonical'
          },
          {
            href: url, hreflang: 'en', rel: 'alternate'
          },
          {
            href: `${siteUrl}/blog/id/`, hreflang: 'id', rel: 'alternate'
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
