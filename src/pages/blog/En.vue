<template>
  <Blog :posts="$page.posts.edges" locale="en"/>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo: {
    title: 'Blog by Rahmanda Wibowo',
    meta: [
      {
        name: 'description', content: 'Blog by Rahmanda Wibowo which focus on web development and technology in general'
      }
    ]
  },
  components: { Blog }
}
</script>

<page-query>
query {
  posts: allPost(sortBy: "published_date", filter: {language: {eq: "en"}}) {
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
