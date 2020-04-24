import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/dashboard"
    },
    {
      path: "/",
      component: () => import("../components/common/Home.vue"),
      meta: { title: "首页文件" },
      children: [

        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/register',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Register.vue'),
          meta: { title: '注册页面' },
          children: [

          ]
        },
        {
          path: '/release',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Release.vue'),
          meta: { title: '发布文章' }
        },
        {
          path: '/register-release',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/RegisterRelease.vue'),
          meta: { title: '发布文章' }
        },
        {
          path: '/setting',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Setting.vue'),
          meta: { title: '设置' }
        },
        {
          path: '/setting-email',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Email.vue'),
          meta: { title: '设置邮箱' }
        },

        {
          path: '/task',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Task.vue'),
          meta: { title: '获取任务列表' }
        },
        {
          path: '/webside-details',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/SiteDetail.vue'),
          meta: { title: '获取ID' },
        },
        {
          path: '/addWebsite',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/AddWebsite.vue'),
          meta: { title: '添加网站' },
        },
        {
          path: '/start',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/Start.vue'),
          meta: { title: '开启任务' },             
        },
        {
          path: '/task-details',
          component: () => import(/* webpackChunkName: "icon" */ '../components/page/TaskDetails.vue'),
          meta: { title: '任务详情' },             
        }
      ]
    },
    {
      path: "/login",
      component: () => import("../components/page/Login.vue"),
      meta: { title: "首页文件" }},
    {
      path: '*',
      redirect: "/dashboard"
    },
  ]
})
