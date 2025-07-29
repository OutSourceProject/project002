import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/homePage/index.vue'),
    },
    {
      path: '/retrospect',
      name: 'retrospect',
      component: () => import('@/views/retrospectPage/index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/aboutPage/index.vue'),
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: () => import('@/views/aboutPage/aboutMe.vue'),
    },
    {
      path: '/license',
      name: 'license',
      component: () => import('@/views/licensePage/index.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/reportPage/index.vue'),
    },
  ],
});

export default router;
