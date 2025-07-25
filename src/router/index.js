import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'testPage',
      component: () => import('@/views/testPage.vue'),
    },
  ],
})

export default router
