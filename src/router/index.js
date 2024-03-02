import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/view1',
    name: 'view1',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view1.vue')
  },
  {
    path: '/view1_1',
    name: 'view1_1',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view1_1.vue')
  },
  {
    path: '/view2',
    name: 'view2',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view2.vue')
  },
  {
    path: '/view3_1',
    name: 'view3_1',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view3_1.vue')
  },
  {
    path: '/view3_2',
    name: 'view3_2',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view3_2.vue')
  },
  {
    path: '/view3_3',
    name: 'view3_3',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view3_3.vue')
  },
  {
    path: '/view4',
    name: 'view4',
    component: () => import(/* webpackChunkName: "about" */ '../views/d3Base/view4.vue')
  },
  {
    path: '/VegaChart',
    name: 'VegaChart',
    component: () => import(/* webpackChunkName: "about" */ '../views/VegaLiteBase/VegaChart.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
