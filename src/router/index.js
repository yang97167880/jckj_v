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
    // name: 'home',
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
        path: '/SysLog',
        component: resolve => require(['../views/System/SysLog.vue'], resolve)
      },
      {
        path: '/DataView',
        component: resolve => require(['../views/Data/DataView.vue'], resolve)
      },
      {
        path: '/TotalView',
        component: resolve => require(['../views/Data/TotalView.vue'], resolve)
      },
      {
        path: '/HistoryData',
        component: resolve => require(['../views/Data/HistoryData.vue'], resolve)
      },
      {
        path: '/RealData',
        component: resolve => require(['../views/Data/RealData.vue'], resolve)
      },
      {
        path: '/AdminList',
        component: resolve => require(['../views/Admin/AdminList.vue'], resolve)
      },
      {
        path: '/UserAdmin',
        component: resolve => require(['../views/Admin/UserAdmin.vue'], resolve)
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
//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   //to will visit
//   //from where are you come from
//   //next fuction means OK
//   //next()放行 next('login')强行跳转
//   if (to.path === '/login') return next();
//   //获得token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router