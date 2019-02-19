module.exports = {
  serverPort: 3000,
  themeDir: 'src',
  buildDir: 'docs',
  buildPrefix: 'client.build',
  tmpDir: 'tmp',
  postDir: 'src/posts',
  numOfRecentPosts: 10,
  tailwindConfig: 'src/tailwind.js',
  staticFilesDir: 'public',
  staticPages: [
    { filename: 'index', title: 'Ambercat' },
    { filename: '404', title: '404' },
  ],
  assetInjector(assetType, pageType) {
    if (assetType === 'js' && pageType === 'post') {
      return require('./disqus');
    }
    return '';
  },
  configureWebpack(config, isServer) {
    return {};
  },
};
