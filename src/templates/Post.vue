<template>
  <Layout page-type="post" :locale="$page.post.language">
		<main role="main"
					:dir="$page.post.direction"
					:class="{ 'rtl': $page.post.direction === 'rtl' }">
			<article class="post">
				<div class="mt-12 mb-5 text-sm text-gray-600 font-sans">
					<time :datetime="$page.post.published_date">
						{{ $date($page.post.published_date, $page.post.language) }}
					</time>
					<span class="mx-1">•</span>
					<span :title="$timeToRead($page.post.timeToRead, $page.post.language)">
            {{ $timeToRead($page.post.timeToRead, $page.post.language) }}
          </span>
				</div>
				<h1 class="font-sans-title text-xl">{{ $page.post.title }}</h1>
				<div v-if="$page.post.translations"
						class="text-md mt-10 text-gray-600 font-sans">
					<span>
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
				</div>
				<section class="mt-8" v-html="$page.post.content"/>
			</article>
			<footer v-if="false" class="flex flex-col md:flex-row max-w-md mx-auto my-8">
				<div v-if="$page.post.olderPost"
							class="flex-1 px-6 pb-8 text-left">
					<p class="mb-2 text-grey-dark">Older Post</p>
					<a :href="$page.post.olderPost.data.path">← {{ $page.post.olderPost.data.title }}</a>
				</div>
				<div v-if="$page.post.newerPost"
							class="flex-1 px-6 pb-8 text-left md:text-right">
					<p class="mb-2 text-grey-dark">Newer Post</p>
					<a :href="$page.post.newerPost.data.path">{{ $page.post.newerPost.data.title }} →</a>
				</div>
			</footer>
		</main>
  </Layout>
</template>

<script>
async function generateAnchors() {
  const { default: anchorjs } = await import('anchor-js');
  const anchors = new anchorjs({
    visible: 'always',
  });
  const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  tags.forEach(tag => anchors.add(tag));
}

export default {
  metaInfo() {
    return {
      title: `${this.$page.post.title} - Rahmanda Wibowo`,
      meta: [
        {
          name: 'description', content: this.summary
        },
        {
          name: 'twitter:card', content: 'summary'
        },
        {
          name: 'twitter:title', content: this.$page.post.title
        },
        {
          name: 'twitter:creator', content: '@rahmandawibowo'
        },
        {
          name: 'twitter:description', content: this.summary
        },
        {
          property: 'og:title', content: this.$page.post.title
        },
        {
          property: 'og:description', content: this.summary
        },
        {
          property: 'og:url', content: this.url
        }
      ]
    }
  },
  computed: {
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
      return `${this.$page.metadata.siteUrl}/${this.$page.post.language}/${this.$page.post.slug}/`;
    }
  },
  mounted() {
    generateAnchors()
  },
  watch: {
    '$route'() {
      generateAnchors()
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

