import Vue from 'vue'
import Router from 'vue-router'
import reddit from '@/components/reddit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: reddit
    }
  ]
})
