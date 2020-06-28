import DefaultLayout from '~/layouts/Default.vue'

import datePlugin from '~/plugins/date'
import i18nPlugin from '~/plugins/i18n'
import generateMetaPlugin from '~/plugins/generate-meta'
import generateSchemaPlugin from '~/plugins/generate-schema'
import timeToReadPlugin from '~/plugins/timeToRead'

import font from './font'
import 'prism-themes/themes/prism-vsc-dark-plus.css'
import './main.css'

export default function (Vue, { router, head, isClient }) {
  Vue.prototype.$isClient = isClient

  Vue.component('Layout', DefaultLayout)
  Vue.use(datePlugin)
  Vue.use(generateMetaPlugin)
  Vue.use(generateSchemaPlugin)
  Vue.use(i18nPlugin)
  Vue.use(timeToReadPlugin)

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
