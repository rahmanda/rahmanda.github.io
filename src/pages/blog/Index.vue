<template>
  <Blog :posts="$page.posts.edges" locale="id"/>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo: {
    title: 'Blog-nya Rahmanda Wibowo',
    meta: [
      {
        name: 'description', content: 'Blog-nya Rahmanda Wibowo yang membahas seputar pemograman web dan teknologi secara umum'
      }
    ]
  },
  components: { Blog },
}
</script>

<page-query>
query {
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "id"}}) {
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
