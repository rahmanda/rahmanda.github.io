<template>
  <Layout>
		<main role="main"
					:dir="$page.post.direction"
					:class="{ 'rtl': $page.post.direction === 'rtl' }">
			<article class="post">
				<h1 class="font-sans-title text-xl">{{ $page.post.title }}</h1>
				<div class="text-sm text-gray-600 font-sans">
					<time :datetime="$page.post.published_date">
						{{ $date($page.post.published_date, $page.post.language) }}
					</time>
					<span class="mx-1">•</span>
					<span :title="$timeToRead($page.post.timeToRead, $page.post.language)">
            {{ $timeToRead($page.post.timeToRead, $page.post.language) }}
          </span>
				</div>
				<div v-if="false"
						class="text-sm mt-6 text-grey-darker font-sans">
					<span v-if="$page.post.translations">
						Translate to:
						<a v-for="(translation, key) in $page.post.translations"
							 :key="key"
							 :href="translation.path"
							 class="mx-1">
							{{ translation.name }}
						</a>
					</span>
					<span v-if="$page.post.originalPostPath">
						<a :href="$page.post.originalPostPath">
							Read original post (ID)
						</a>
						<span class="mx-1">•</span>
						<a :href="`/${data.language}`">
							View all posts ({{ data.language.toUpperCase() }})
						</a>
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
import 'prism-themes/themes/prism-vsc-dark-plus.css';

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
      title: this.$page.post.title
    }
  },
  mounted() {
    generateAnchors();
  },
}
</script>

<page-query>
query ($id: ID!) {
  post(id: $id) {
    title
		content
    published_date
    timeToRead
    language
  }
}
</page-query>

