<template>
  <Layout locale="en" :locale-links="localeLinks">
    <div class="bg-gray-900">
      <div class="max-w-2xl mx-auto px-5 pt-6 py-16">
        <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
        <p lang="en" class="text-indigo-700 text-6xl font-sans-title font-bold tracking-tight leading-tight">#TIL</p>
        <p lang="en" class="text-gray-600 text-2xl mb-5">by Rahmanda Wibowo</p>
        <p class="text-gray-400 text-xl leading-tight">
          {{ meta.description }}
        </p>
      </div>
    </div>
    <div class="text-lg">
      <ul class="max-w-2xl mx-auto px-5 -mt-8 pb-6 block">
        <li v-for="post in $page.posts.edges"
            :key="post.node.id"
            class="mb-8 block">
          <article class="post pt-5 bg-gray-50 border border-indigo-500 rounded" style="padding-bottom: 0;">
            <header>
              <time :datetime="post.node.published_date" class="text-gray-600">
                {{ $date(post.node.published_date, post.node.language) }}
              </time>
              <h2 :id="post.node.slug" style="margin-top: 1rem;">
                {{ post.node.title }}
              </h2>
            </header>
            <div v-html="post.node.content"/>
          </article>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Til.vue'

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
    Layout
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
