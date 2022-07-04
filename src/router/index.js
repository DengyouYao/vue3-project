import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: import(/* webpackChunkName: "about" */ '@/views/index')
  },
  {
    path: '/super-lotto',
    name: 'superLotto',
    component: () => import(/* webpackChunkName: "about" */ '@/views/lottery/super-lotto')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
