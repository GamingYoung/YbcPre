import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'view2',
    component: () => import(/* webpackChunkName: "about" */ '../views/view2.vue')
  },
  {
    path: '/view2',
    name: 'view2',
    component: () => import(/* webpackChunkName: "about" */ '../views/view2.vue')
  },
  {
    path: '/view3_1',
    name: 'view3_1',
    component: () => import(/* webpackChunkName: "about" */ '../views/view3_1.vue')
  },
  {
    path: '/view3_2',
    name: 'view3_2',
    component: () => import(/* webpackChunkName: "about" */ '../views/view3_2.vue')
  },
  {
    path: '/view3_3',
    name: 'view3_3',
    component: () => import(/* webpackChunkName: "about" */ '../views/view3_3.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
