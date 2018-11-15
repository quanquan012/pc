import Vue from 'vue'
import Router from 'vue-router'
import facde from '@/components/facde/facde'
import login from '@/components/login/login'
import user from '@/components/business/basic/user'
import category from '@/components/business/basic/category'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/facde',
      name: 'facde',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: facde,
      children: [{
        path: '/merchants',
        name: 'user',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: user
      }, {
        path: '/categories',
        name: 'category',
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: category
      }]
    }
  ]
})
