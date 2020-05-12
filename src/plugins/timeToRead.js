export default {
  install(Vue) {
    Vue.prototype.$timeToRead = timeToRead;
  }
}

function timeToRead(val, locale = 'id') {
  if (locale === 'id') {
    return `Baca ${val} menit`;
  }
  if (locale === 'en') {
    return `${val} minutes read`;
  }
  return val;
}
