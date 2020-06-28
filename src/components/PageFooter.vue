<template>
  <footer class="bg-gray-200 py-8" lang="en">
    <div class="mx-auto" :class="{'max-w-4xl': type === 'large', 'max-w-2xl': type === 'small'}">
      <p class="font-sans text-gray-600 text-sm px-5 mb-8">
        © 2015-present Rahmanda Wibowo. All rights reserved.
      </p>
      <p class="px-5 mb-1 font-sans text-gray-600 text-sm">
      Connect with me on <a class="underline text-gray-800" href="https://twitter.com/rahmandawibowo">Twitter</a>, <a class="underline text-gray-800" href="https://linkedin.com/in/rahmandawibowo">Linkedin</a>, or <a class="underline text-gray-800" href="https://github.com/rahmanda">Github</a>
      </p>
      <p class="px-5 mb-10 font-sans text-gray-600 text-sm">
      This site is built with <a class="underline text-gray-800" href="https://gridsome.org">Gridsome</a> and hosted on <a class="underline text-gray-800" href="https://www.netlify.com">Netlify</a>. The source code is hosted on <a class="underline text-gray-800" href="https://github.com/rahmanda/blog">Github</a>.
      </p>
      <ul class="mb-5 px-5 flex items-center text-sm text-gray-800">
        <li class="pr-4">
          <g-link to="/" class="underline">Home</g-link>
        </li>
        <li class="pr-4">
          <g-link to="/blog/" class="underline">Blog</g-link>
        </li>
        <li class="pr-4">
          <g-link to="/til/" class="underline">#TIL</g-link>
        </li>
        <li class="pr-4">
          <a href="/sitemap.xml" class="underline">Sitemap</a>
        </li>
        <li>
          <a href="/feed.xml" class="underline">RSS</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'large',
    }
  }
}
</script>
