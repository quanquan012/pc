import Vue from 'vue'
import Router from 'vue-router'
import facde from '@/components/facde/facde'
import login from '@/components/login/login'
import merchant from '@/components/business/merchant/merchant'
import category from '@/components/business/merchandise/category'
import account from '@/components/business/basic/account'
import authentication from '@/components/business/basic/authentication'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/facde',
      name: 'facde',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: facde,
      children: [{
        path: '/merchants',
        name: 'merchant',
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: merchant
      }, {
        path: '/categories',
        name: 'category',
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: category
      }, {
        path: '/accounts',
        name: 'account',
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: account
      }, {
        path: '/authentications',
        name: 'authentication',
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: authentication
      }]
    }
  ]
})
