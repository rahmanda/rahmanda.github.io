// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Rahmanda Wibowo',
  siteDescription: 'Front-end web developer with professional experience in online marketplace and digital product industry',
  siteUrl: 'https://www.rahmandawibowo.com',
  titleTemplate: '%s',
  templates: {
    Post: [
      {
        path: (node) => {
          return `/blog/${node.language}/${node.slug}`;
        }
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: './contents/blog/**/*.md',
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Til',
        path: './contents/til/**/*.md',
      }
    },
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        purgeConfig: {
          whitelistPatternsChildren: [/^token/, /^pre/, /^code/, /^a/, /^post/]
        }
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-73365330-1'
      }
    },
    {
      use: '@gridsome/plugin-sitemap'
    },
    {
      use: 'gridsome-plugin-robots',
      options: {
        policy: [{ userAgent: '*', allow: '/*.html$' }]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        ['@gridsome/remark-prismjs', { transformInlineCode: false }]
      ],
      slug: false
    }
  }
}
