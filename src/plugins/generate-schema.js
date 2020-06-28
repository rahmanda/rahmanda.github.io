export default {
  install(Vue) {
    Vue.prototype.$generateSchemaPost = generateSchemaPost
  }
}

function generateSchemaPost(title, description, publishedDate, language, siteUrl, url) {
  const siteLogoUrl = `${siteUrl}/r-logo-small.png`
  const siteLogoWidth = 75
  const siteLogoHeight = 75
  const authorPictUrl = `${siteUrl}/profile-picture.png`
  const authorPictWidth = 400
  const authorPictHeight = 400
  const twitterUrl = 'https://twitter.com/rahmandawibowo'
  const linkedinUrl = 'https://linkedin.com/in/rahmandawibowo'
  const githubUrl = 'https://github.com/rahmanda'
  const ogImageUrl = `${siteUrl}/og-image.jpg`
  const ogImageWidth = 1200
  const ogImageHeight = 800
  const blogUrl = language === 'en' ? `${siteUrl}/blog/en/` : `${siteUrl}/blog/`

  const schema = {
    type: 'application/ld+json',
    json: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      publisher: {
        '@type': 'Organization',
        name: 'rahmandawibowo.com',
        logo: {
          '@type': 'ImageObject',
          url: siteLogoUrl,
          width: siteLogoWidth,
          height: siteLogoHeight
        }
      },
      author: {
        '@type': 'Person',
        name: 'Rahmanda Wibowo',
        image: {
          '@type': 'ImageObject',
          url: authorPictUrl,
          width: authorPictWidth,
          height: authorPictHeight
        },
        sameAs: [
          twitterUrl,
          linkedinUrl,
          githubUrl
        ]
      },
      headline: title,
      url,
      description,
      datePublished: publishedDate,
      dateModified: publishedDate,
      inLanguage: language,
      image: {
        '@type': 'ImageObject',
        url: ogImageUrl,
        width: ogImageWidth,
        height: ogImageHeight
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': blogUrl,
      }
    }
  }

  return schema
}
