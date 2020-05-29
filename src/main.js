import DefaultLayout from '~/layouts/Default.vue'
import datePlugins from '~/plugins/date'
import timeToRead from '~/plugins/timeToRead'
import i18n from '~/plugins/i18n'
import font from './font'
import 'prism-themes/themes/prism-vsc-dark-plus.css'
import './main.css'

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', DefaultLayout)
  Vue.use(datePlugins)
  Vue.use(timeToRead)
  Vue.use(i18n)

  // HEAD manipulation
  head.meta.push({
    name: 'google-site-verification',
    content: 'cxX6bHKFtfWlAhhWluGZII6peqca8Hsd2aaobASSxEI'
  })
  head.style.push({
    cssText: font,
    type: 'text/css'
  })
}
