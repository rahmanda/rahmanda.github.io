import moment from 'moment';

export default {
  install(Vue) {
    Vue.prototype.$date = date;
  }
}

function date(val, locale = 'id') {
  return moment(val).locale(locale).format('LL');
}
