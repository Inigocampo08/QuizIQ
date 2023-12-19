import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/acceso',
      name: 'access',
      component: () => import('@/views/AccessView.vue')
    },
    {
      path: '/partida-demo',
      name: 'demo-game',
      component: () => import('@/views/DemoGame.vue')
    },
  ]
})

export default router
