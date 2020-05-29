<template>
  <div class="max-w-2xl mx-auto px-5 py-6">
    <h1 class="hidden" aria-hidden="true">{{ h1 }}</h1>
    <p class="text-indigo-700 text-6xl font-sans-title font-bold tracking-tighter leading-tight">Just a Blog</p>
    <p class="text-gray-600 text-2xl mb-5">by Rahmanda Wibowo</p>
    <p class="text-gray-800 text-xl leading-tight">
      <slot>
        Collection of my writings in web development and other technology
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    h1: {
      type: String,
      default: 'Just a Blog by Rahmanda Wibowo'
    }
  }
}
</script>
