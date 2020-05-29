<template>
  <Layout :locale="locale">
    <slot/>
		<div class="text-lg">
			<div class="max-w-2xl mx-auto px-5 py-6">
				<div v-for="post in posts"
             :key="post.node.id"
						 class="mb-8">
					<div class="text-sm text-gray-600">
						<time :datetime="post.node.published_date">
							{{ $date(post.node.published_date, post.node.language) }}
						</time>
						<span class="mx-1">•</span>
						<span :title="post.node.timeToRead">{{ $timeToRead(post.node.timeToRead, post.node.language) }}</span>
					</div>
					<g-link :to="`/blog/${post.node.language}/${post.node.slug}/`"
						 class="c-link">
						{{ post.node.title }}
					</g-link>
					<p v-if="post.node.summary"
						 class="text-base text-grey-darker mt-2">{{ post.node.summary }}</p>
				</div>
			</div>
		</div>
  </Layout>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    },
    locale: {
      type: String,
      default: 'en'
    }
  }
}
</script>
