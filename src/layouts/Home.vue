<template>
  <div class="layout bg-gray-50">
    <header class="text-gray-300 bg-indigo-800">
      <nav class="max-w-4xl mx-auto py-3 px-5 text-base whitespace-nowrap overflow-y-auto flex items-center">
        <g-link to="/" class="c-logo flex-none flex items-center">
          <g-image src="~/images/r-logo-white-small.png" alt="logo" class="flex-none"/>
        </g-link>
        <div class="flex-1 flex justify-end font-sans text-right">
          <g-link class="ml-4" :to="linkToBlog">Blog</g-link>
          <g-link class="ml-4" :to="linkToTil">#TIL</g-link>
          <a class="ml-4" href="https://linkedin.com/in/rahmandawibowo">LinkedIn</a>
          <div class="rounded bg-indigo-800 flex ml-4">
            <g-link
              to="/en/"
              :class="{ 'bg-black rounded': ['/en/', '/en', '/', ''].includes($route.path) }"
              class="px-2">
              EN
            </g-link>
            <g-link
              to="/id/"
              :class="{ 'bg-black rounded': ['/id/', '/id'].includes($route.path) }"
              class="px-2">
              ID
            </g-link>
          </div>
        </div>
      </nav>
      <div class="max-w-4xl text-gray-100 mx-auto px-5 pt-16 pb-20 font-sans-title">
        <slot name="hero">
          <p class="text-indigo-200 mb-2 text-xl">Congrats, you've found...</p>
          <p class="text-5xl md:text-6xl leading-tight tracking-tighter font-bold">Yet another Web Developer!</p>
        </slot>
      </div>
    </header>

    <slot/>

    <PageFooter class="pt-20 pb-10" />
  </div>
</template>

<script>
import PageFooter from '~/components/PageFooter.vue'

export default {
  metaInfo: {
    meta: [
      {
        name: 'theme-color', content: '#434190'
      }
    ]
  },
  props: {
    locale: {
      type: String,
      default: 'en'
    }
  },
  components: { PageFooter },
  computed: {
    linkToBlog() {
      if (this.locale === 'id') {
        return '/blog/'
      }
      return `/blog/${this.locale}/`
    },
    linkToTil() {
      if (this.locale === 'id') {
        return '/til/'
      }
      return `/til/${this.locale}/`
    }
  }
}
</script>
