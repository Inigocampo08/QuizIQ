import { createRouter, createWebHistory } from 'vue-router'
import AccessView from '../views/AccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccessView
    },
    {
      path: '/access',
      name: 'acceso',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AccessView.vue')
    }
  ]
})

export default router