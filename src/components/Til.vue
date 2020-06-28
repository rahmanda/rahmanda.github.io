<template>
  <Layout :locale="locale" :locale-links="localeLinks">
    <div>
      <div class="max-w-2xl mx-auto px-5 pt-6 py-10">
        <h1 class="hidden" aria-hidden="true">{{ meta.title }}</h1>
        <p lang="en" class="text-indigo-700 text-6xl font-sans-title font-bold tracking-tight leading-tight">#TIL</p>
        <p lang="en" class="text-gray-600 text-2xl mb-5">by Rahmanda Wibowo</p>
        <p class="text-gray-800 text-xl leading-tight">
          {{ meta.description }}
        </p>
      </div>
    </div>
    <div>
      <ul class="max-w-2xl mx-auto px-5 pb-6 block">
        <li v-for="post in posts"
            :key="post.node.id"
            class="mb-10 block">
          <article class="post pt-5 bg-gray-50 border-gray-300 rounded-lg shadow border">
            <header>
              <time :datetime="post.node.published_date" class="text-gray-600">
                {{ $date(post.node.published_date, post.node.language) }}
              </time>
              <h2 :id="post.node.slug" class="tracking-tight" style="margin-top: 1rem;">
                {{ post.node.title }}
              </h2>
            </header>
            <div v-html="post.node.content" class="content"/>
          </article>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Til.vue'

export default {
  props: {
    locale: {
      type: String,
      default: 'id'
    },
    localeLinks: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
    posts: {
      type: Array,
      required: true,
    }
  },
  components: {
    Layout
  }
}
</script>
