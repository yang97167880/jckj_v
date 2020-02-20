import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Base/Login.vue'
import Home from '../views/Base/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/top',
        component: resolve => require(['../views/Base/top.vue'], resolve)

      },
      {
        path: '/index',
        component: resolve => require(['../views/Index/index.vue'], resolve)
      },
      {
        path: '/TotalView',
        component: resolve => require(['../views/Data/TotalView.vue'], resolve)
      },
      {
        path: '/',
        redirect: '/top'
      }
    ]
  },
  {
    path: '/',
    redirect: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_ENV,
  routes
})

export default router