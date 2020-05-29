<template>
  <Layout :locale="locale">
    <slot/>
		<div class="text-lg">
			<ul class="max-w-2xl mx-auto px-5 py-6 block">
				<li v-for="post in posts"
             :key="post.node.id"
						 class="mb-8 block">
          <article>
            <header class="text-sm text-gray-600">
              <time :datetime="post.node.published_date">
                {{ $date(post.node.published_date, post.node.language) }}
              </time>
              <span class="mx-1">•</span>
              <span :title="post.node.timeToRead">{{ $timeToRead(post.node.timeToRead, post.node.language) }}</span>
            </header>
            <h3>
              <g-link :to="`/blog/${post.node.language}/${post.node.slug}/`"
                 class="c-link">
                {{ post.node.title }}
              </g-link>
            </h3>
            <p v-if="post.node.summary"
               class="text-base text-gray-800 mt-2">{{ post.node.summary }}</p>
          </article>
				</li>
			</ul>
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
