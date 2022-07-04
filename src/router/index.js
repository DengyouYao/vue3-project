import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/index.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
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
