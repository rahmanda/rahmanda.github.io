import DefaultLayout from '~/layouts/Default.vue'
import datePlugins from '~/plugins/date'
import timeToRead from '~/plugins/timeToRead'
import i18n from '~/plugins/i18n'
import 'prismjs/themes/prism.css'
import './main.css'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
  Vue.use(datePlugins)
  Vue.use(timeToRead)
  Vue.use(i18n)

  // HEAD manipulation
	head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=PT+Sans&display=swap'
  })

  // Route hooks
  router.beforeEach(({ path }, _, next) => {
    let lang = 'en'
    // Blog root path is targeting for Indonesian
    // Other root path is for English speakers
    if (/\/blog\/?$/.test(path)) {
      lang = 'id'
    } else if (path.indexOf('/id/') > -1) {
      lang = 'id'
    } else if (path.indexOf('/en/') > -1) {
      lang = 'en'
    }
    head.htmlAttrs.lang = lang
    next();
  });
}
