<template>
  <div class="layout bg-gray-50">
    <div class="c-header text-gray-800">
      <nav class="max-w-2xl mx-auto py-3 px-5 text-base whitespace-nowrap overflow-y-auto flex items-center">
        <g-link :to="linkToHomepage" class="c-logo flex-none flex items-center">
          <g-image src="~/images/r-logo-small.png" alt="logo" class="flex-none"/>
        </g-link>
        <div class="flex-1 flex justify-end font-sans-title text-right">
          <g-link class="ml-4" :to="linkToBlog">Blog</g-link>
          <a class="ml-4" href="https://linkedin.com/in/rahmandawibowo">LinkedIn</a>
          <div v-if="pageType == 'home'" class="rounded border border-gray-900 text-white bg-indigo-900 ml-4">
            <g-link to="/blog/en/" active-class="bg-black" class="border-r border-gray-900 px-2">EN</g-link>
            <g-link to="/blog/id/" active-class="bg-black" class="px-2">ID</g-link>
          </div>
        </div>
      </nav>
    </div>

    <slot/>

  </div>
</template>

<script>
export default {
  props: {
    pageType: {
      type: String,
      default: 'home'
    },
    locale: {
      type: String,
      default: 'en'
    }
  },
  computed: {
    linkToBlog() {
      if (this.locale === 'id') {
        return '/blog/'
      }
      return `/blog/${this.locale}/`
    },
    linkToHomepage() {
      if (this.locale === 'id') {
        return '/id/'
      }
      return '/'
    }
  }
}
</script>
