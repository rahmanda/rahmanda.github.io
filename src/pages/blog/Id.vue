<template>
  <Blog :posts="$page.posts.edges" locale="id"/>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo: {
    title: 'Blognya Rahmanda Wibowo',
    meta: [
      {
        name: 'description', content: 'Blognya Rahmanda Wibowo yang isinya membahas seputar pemograman web dan teknologi lainnya'
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
