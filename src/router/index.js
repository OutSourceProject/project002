import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: () => import('@/views/homePage/index.vue'),
    },
    {
      path: '/retrospect',
      name: 'retrospect',
      component: () => import('@/views/homePage/retrospect.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/homePage/about.vue'),
    },
  ],
})

export default router
