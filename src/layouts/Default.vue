<template>
  <div class="layout bg-gray-50">
    <div class="c-header text-gray-800">
      <nav class="max-w-2xl mx-auto py-3 px-5 text-base whitespace-nowrap overflow-y-auto flex items-center">
        <g-link :to="linkToHomepage" class="c-logo flex-none flex items-center">
          <g-image src="~/images/r-logo-small.png" alt="logo" class="flex-none"/>
        </g-link>
        <div class="flex-1 flex justify-end font-sans text-right">
          <g-link class="ml-4" :to="linkToBlog">Blog</g-link>
          <g-link class="ml-4" :to="linkToTil">#TIL</g-link>
          <a class="ml-4" href="https://linkedin.com/in/rahmandawibowo">LinkedIn</a>
          <div v-if="pageType == 'home'" class="rounded text-white bg-indigo-800 flex ml-4">
            <g-link
              :to="localeLinks.en"
              :class="{ 'bg-black rounded': locale === 'en' }"
              class="px-2">
              EN
            </g-link>
            <g-link
              :to="localeLinks.id"
              :class="{ 'bg-black rounded': locale === 'id' }"
              class="px-2">
              ID
            </g-link>
          </div>
        </div>
      </nav>
    </div>

    <slot/>

    <PageFooter type="small"/>
  </div>
</template>

<script>
import PageFooter from '~/components/PageFooter.vue'

export default {
  metaInfo: {
    meta: [
      {
        name: 'theme-color', content: '#fffefe'
      }
    ]
  },
  props: {
    pageType: {
      type: String,
      default: 'home'
    },
    locale: {
      type: String,
      default: 'en'
    },
    localeLinks: {
      type: Object,
      default() {
        return {
          en: '/blog/en/',
          id: '/blog/id/'
        }
      }
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
