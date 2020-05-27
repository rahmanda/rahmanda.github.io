<template>
  <Blog :posts="$page.posts.edges" locale="en"/>
</template>

<script>
import Blog from '~/components/Blog.vue'

export default {
  metaInfo() {
    return {
      title: 'Blog by Rahmanda Wibowo',
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
  components: { Blog }
}
</script>

<page-query>
query {
  metadata {
    siteUrl
  }
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
