import Vue from 'vue'
import Router from 'vue-router'
import facde from '@/components/facde/facde'
import login from '@/components/login/login'
import merchant from '@/components/business/merchant/merchant'
import merchandise from '@/components/business/merchandise/merchandise'
import category from '@/components/business/merchandise/category'
import order from '@/components/business/order/order'
import account from '@/components/business/basic/account'
import authentication from '@/components/business/basic/authentication'
import help from '@/components/business/help/help'

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
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        show: true
      },
      component: facde,
      children: [{
        path: '/merchandise',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: false
        }
      }, {
        path: '/system',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: false
        }
      }, {
        path: '/merchants',
        name: 'merchant',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: merchant
      }, {
        path: '/merchandises',
        name: 'merchandise',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: merchandise
      }, {
        path: '/categories',
        name: 'category',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: category
      },{
        path: '/orders',
        name: 'order',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: order
      }, {
        path: '/accounts',
        name: 'account',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: account
      }, {
        path: '/authentications',
        name: 'authentication',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: authentication
      }, {
        path: '/help',
        name: 'help',
        meta: {
          requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          show: true
        },
        component: help
      }]
    }
  ]
})
