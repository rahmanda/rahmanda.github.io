<template>
  <Layout page-type="post" :locale="$page.post.language">
		<main role="main"
					:dir="$page.post.direction"
					:class="{ 'rtl': $page.post.direction === 'rtl' }">
			<article class="post post-blog">
				<header class="mt-12 mb-5 text-sm text-gray-600 font-sans">
					<time :datetime="$page.post.published_date">
						{{ $date($page.post.published_date, $page.post.language) }}
					</time>
					<span class="mx-1">•</span>
					<span :title="$timeToRead($page.post.timeToRead, $page.post.language)">
            {{ $timeToRead($page.post.timeToRead, $page.post.language) }}
          </span>
				</header>
				<h1 class="font-sans-title text-xl">{{ $page.post.title }}</h1>
				<aside v-if="$page.post.translations"
						class="text-md mt-10 text-gray-600 font-sans flex items-center">
 					<span class="flex-1 leading-none">
            Translate into:
            <template v-for="(path, key) in $page.post.translations">
              <g-link v-if="path"
                 :key="key"
                 :to="path"
                 class="mx-1 underline text-indigo-700">
                {{ languageNames[key] }}
              </g-link>
            </template>
					</span>
          <SocialMediaShare :title="$page.post.title" :url="url" class="flex-none"/>
				</aside>
				<div class="mt-8" v-html="$page.post.content"/>
        <aside class="flex items-center text-gray-600">
          <span class="flex-none leading-none mr-3">Share this article:</span>
          <SocialMediaShare :title="$page.post.title" :url="url" class="flex-none"/>
        </aside>
			</article>
		</main>
  </Layout>
</template>

<script>
import SocialMediaShare from '~/components/SocialMediaShare.vue'

async function generateAnchors() {
  const { default: anchorjs } = await import('anchor-js');
  const anchors = new anchorjs({
    visible: 'always',
  });
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  tags.forEach(tag => anchors.add(tag));
}

export default {
  components: {
    SocialMediaShare
  },
  metaInfo() {
    return this.meta
  },
  computed: {
    meta() {
      return {
        htmlAttrs: {
          lang: this.$page.post.language,
          dir: 'ltr'
        },
        title: `${this.$page.post.title} - Rahmanda Wibowo`,
        link: [
          {
            href: this.url, rel: 'canonical'
          },
          {
            href: this.url, hreflang: this.$page.post.language, rel: 'alternate'
          },
          ...this.linkAlternate
        ],
        meta: this.$generateMeta(this.$page.post.title, this.summary, this.$page.metadata.siteUrl, this.url),
        script: [this.$generateSchemaPost(this.$page.post.title, this.summary, this.$page.post.published_date, this.$page.post.language, this.$page.metadata.siteUrl, this.url)]
      }
    },
    languageNames() {
      return {
        id: 'Bahasa Indonesia',
        en: 'English'
      }
    },
    summary() {
      return this.$page.post.summary || this.$page.post.excerpt
    },
    url() {
      return `${this.$page.metadata.siteUrl}/blog/${this.$page.post.language}/${this.$page.post.slug}/`;
    },
    linkAlternate() {
      let links = []
      if (this.$page.post.translations) {
        Object.keys(this.$page.post.translations).forEach(lang => {
          if (this.$page.post.translations[lang]) {
            links.push({
              href: `${this.$page.metadata.siteUrl}${this.$page.post.translations[lang]}`,
              hreflang: lang,
              rel: 'alternate'
            })
          }
        })
      }
      return links
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
query ($id: ID!) {
  metadata {
    siteUrl
  }
  post(id: $id) {
    title
		content
    published_date
    timeToRead
    language
    summary
    slug
    excerpt(length: 160)
    translations {
      id
      en
    }
  }
}
</page-query>

