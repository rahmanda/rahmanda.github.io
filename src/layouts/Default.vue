<template>
  <div class="layout bg-gray-50">
    <div class="c-header text-gray-800">
      <nav class="max-w-2xl mx-auto py-3 px-5 text-base whitespace-nowrap overflow-y-auto flex items-center">
        <g-link to="/" class="c-logo flex-none flex items-center">
          <img :src="headerLogo" alt="logo" class="flex-none">
        </g-link>
        <div class="flex-1 font-sans-title text-right">
          <g-link class="ml-4" :to="linkToBlog">Blog</g-link>
          <a class="ml-4" href="https://linkedin.com/in/rahmandawibowo">LinkedIn</a>
        </div>
      </nav>
    </div>

    <slot/>

  </div>
</template>

<script>
export default {
  props: {
    headerLogo: {
      type: String,
      default: '/r-logo-small.png'
    }
  },
  computed: {
    linkToBlog() {
      if (this.$locale === 'id') {
        return '/blog/'
      }
      return `/blog/${this.$locale}/`
    }
  }
}
</script>
