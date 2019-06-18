<template>
  <main role="main" class="text-lg text-grey-darkest">
    <div class="max-w-md mx-auto px-5">
      <template v-if="data.language !== 'en'">
        <h1 class="text-3xl text-indigo-dark my-8">{{ data.title }}</h1>
        <p v-if="data.description"
          class="text-xl font-semibold text-grey-dark">{{ data.description }}</p>
      </template>
      <div v-else class="py-12">
        <h1 class="text-5xl text-indigo-dark mt-0 mb-4">Ambercat</h1>
        <p class="text-xl mb-0 font-semibold text-grey-darker">A blog by <a href="https://id.linkedin.com/in/rahmandawibowo">Rahmanda Wibowo</a></p>
      </div>
    </div>
    <div class="max-w-md mx-auto px-5 py-6">
      <div v-for="post in data.posts"
           class="mb-10">
        <div class="text-sm text-grey-darker">
          <time :datetime="post.data.date">
            {{ post.data.date | date(post.data.language) }}
          </time>
          <span class="mx-1">•</span>
          <span :title="post.data.readingTime.text">{{ post.data.readingTime.text }}</span>
        </div>
        <a :href="post.data.path"
           class="text-xl font-semibold">
          {{ post.data.title }}
        </a>
        <p v-if="post.data.summary"
           class="text-base text-grey-darker mt-2">{{ post.data.summary }}</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['data'],
};
</script>
