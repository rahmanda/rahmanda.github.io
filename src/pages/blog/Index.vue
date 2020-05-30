<template>
  <Blog :posts="$page.posts.edges" locale="id">
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
    BlogHero
  },
  computed: {
    meta() {
      const title = 'Just a Blog by Rahmanda Wibowo'
      const description = 'Kumpulan artikel seputar pengembangan web dan teknologi lainnya'
      const siteUrl = this.$page.metadata.siteUrl
      const url = `${siteUrl}/blog/`

      return {
        htmlAttrs: {
          lang: 'id',
          dir: 'ltr'
        },
        title,
        description,
        link: [
          {
            href: url, rel: 'canonical'
          },
          {
            href: url, hreflang: 'id', rel: 'alternate'
          },
          {
            href: `${siteUrl}/blog/en/`, hreflang: 'en', rel: 'alternate'
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
