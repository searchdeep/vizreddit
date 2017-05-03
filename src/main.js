// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/searchera.css'

// Node modules
import '../node_modules/c3/c3.min.css'

// Vue imports
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './app'
import router from './router'
import * as filters from './filters'

Vue.use(VueResource)

Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
