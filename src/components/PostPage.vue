<template>
  <main role="main"
        :dir="postData.direction"
        :class="{ 'rtl': postData.direction === 'rtl' }">
    <section class="post">
      <h1>{{ postData.title }}</h1>
      <div class="text-sm text-grey-darker font-sans">
        <time :datetime="postData.date">
          {{ postData.date | date(postData.language) }}
        </time>
        <span class="mx-1">•</span>
        <span :title="postData.readingTime.text">{{ postData.readingTime.text }}</span>
      </div>
      <div v-if="postData.translations || postData.originalPostPath"
          class="text-sm mt-6 text-grey-darker font-sans">
        <span v-if="postData.translations">
          Translate to:
          <a v-for="(translation, key) in postData.translations"
             :key="key"
             :href="translation.path"
             class="mx-1">
            {{ translation.name }}
          </a>
        </span>
        <span v-if="postData.originalPostPath">
          <a :href="postData.originalPostPath">
            Read original post (ID)
          </a>
	  <span class="mx-1">•</span>
	  <a :href="`/${data.language}`">
	    View all posts ({{ data.language.toUpperCase() }})
	  </a>
        </span>
      </div>     
      <article class="mt-8" v-html="postContent"/>
    </section>
    <footer class="flex flex-col md:flex-row max-w-md mx-auto my-8">
      <div v-if="postData.olderPost"
            class="flex-1 px-6 pb-8 text-left">
        <p class="mb-2 text-grey-dark">Older Post</p>
        <a :href="postData.olderPost.data.path">← {{ postData.olderPost.data.title }}</a>
      </div>
      <div v-if="postData.newerPost"
            class="flex-1 px-6 pb-8 text-left md:text-right">
        <p class="mb-2 text-grey-dark">Newer Post</p>
        <a :href="postData.newerPost.data.path">{{ postData.newerPost.data.title }} →</a>
      </div>
    </footer>
  </main>
</template>

<script>
import { markdownCompiler } from '../vendor';

export default {
  props: ['content', 'data'],
  data() {
    return {
      postContent: this.content,
      postData: this.data,
    };
  },
}
</script>
