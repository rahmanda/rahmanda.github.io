<template>
  <Blog :posts="$page.posts.edges" locale="en">
    <h1 class="hidden" aria-hidden="true">{{ h1 }}</h1>
  </Blog>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo() {
    return {
      title: this.h1,
      link: [
        {
          href: `${this.$page.metadata.siteUrl}/blog/en/`, rel: 'canonical'
        }
      ],
      meta: [
        {
          name: 'description', content: 'Blog by Rahmanda Wibowo which focus on web development and technology in general'
        }
      ]
    }
  },
  components: { Blog },
  data() {
    return {
      h1: 'Blog by Rahmanda Wibowo'
    }
  }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "en"}, type: {eq: "blog"}}) {
    edges {
      node {
        id
        title
        slug
        published_date
        language
        timeToRead
      }
    }
  }
}
</page-query>
