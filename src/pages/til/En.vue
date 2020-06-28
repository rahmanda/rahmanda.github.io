<template>
  <Til locale="en" :locale-links="localeLinks" :meta="meta" :posts="$page.posts.edges"/>
</template>

<script>
import Til from '~/components/Til.vue'

async function generateAnchors() {
  const { default: anchorjs } = await import('anchor-js');
  const anchors = new anchorjs({
    visible: 'always',
  });
  const tags = ['h2'];
  tags.forEach(tag => anchors.add(tag));
}

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
    },
    localeLinks() {
      return {
        en: '/til/en/',
        id: '/til/id/'
      }
    }
  },
  mounted() {
    generateAnchors()
  },
  watch: {
    '$route'() {
      if (this.$isClient) {
        generateAnchors()
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

