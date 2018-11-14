import Vue from 'vue'
import Router from 'vue-router'
import Facde from '@/components/facde/Facde'
import user from '@/components/business/basic/user'
import category from '@/components/business/basic/category'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Facde',
      component: Facde,
      children: [{
        path: '/merchants',
        name: 'user',
        component: user
      }, {
        path: '/categories',
        name: 'category',
        component: category
      }]
    }
  ]
})
