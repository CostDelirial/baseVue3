import isAuthenticated from '@/guards/is-authenticated';
import PageNotFound from '@/views/PageNotFound.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ///////////////////////////404
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: PageNotFound,
    },
    ///////////////////////////HOME
    {
      path: '/',
      name: 'home',
      redirect: { name: 'dashboard' },
      beforeEnter: [isAuthenticated],
      component: () => import('@/layout/HomeLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/HomeView.vue'),
        },
      ],
    },

    ///////////////////AUTH
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/layout/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
      ],
    },
  ],
});

export default router;
