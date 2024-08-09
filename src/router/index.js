import Login from '@/views/Login.vue'
import Layout from '@/layout/Layout.vue';
import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/views/Homepage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout, // set parents layouts. so the children component will rendered from parents 
      meta: { requiresAuth: true },
      children: [
        {
          path: '/homepage',
          name: 'Homepage',
          component: Homepage,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ],
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authenticated');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
      console.log('im in!')
    } else {
      next({ name: 'Login' });
    }
  } else {
    next();
    console.log('im inout!')
  }
});

export default router
