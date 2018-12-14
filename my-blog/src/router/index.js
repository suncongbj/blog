import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import admin from '@/components/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/admin',
      component: admin
    },
  ]
})
