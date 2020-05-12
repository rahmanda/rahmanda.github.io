import _get from 'lodash/get'

export default {
  install(Vue) {
    Vue.prototype.$t = translate
  }
}

var translations = {
  id: {
  },
  en: {
  }
}

function translate(key, locale = 'en') {
  const translation = translations[locale]
  return _get(translation, key)
}
