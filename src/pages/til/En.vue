<template>
  <Til locale="en" :meta="meta" :posts="$page.posts.edges"/>
</template>

<script>
import Til from '~/components/Til.vue'

export default {
  metaInfo() {
    return this.meta
  },
  components: {
    Til
  },
  computed: {
    meta() {
      const title = '#TIL by Rahmanda Wibowo'
      const description = 'Collections of TIL about web, technology, and random things'
      const siteUrl = this.$page.metadata.siteUrl
      const url = `${siteUrl}/til/en/`

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
            href: `${siteUrl}/til/id/`, hreflang: 'id', rel: 'alternate'
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
  posts: allTil(sortBy: "published_date", filter: {language: {eq: "en"}}) {
    edges {
      node {
        id
        title
        content
        slug
        published_date
        language
        translations {
          id
          en
        }
      }
    }
  }
}
</page-query>

