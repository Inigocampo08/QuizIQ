import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

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
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      // children: [
      //   {
      //     path: '/index/:id',
      //     name: 'index',
      //     component: () => import('@/views/admin/IndexView.vue')
      //   }
      // ]
    }
  ]
})
//Guard de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)
  if (requiresAuth) {
    //Comprobar si el usuario esta autenticado
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({ name: 'access' })
    }
  } else {
    //no esta protegido
    next()
  }
})
function authenticateUser() {
  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const observer = onAuthStateChanged(auth, (user) => {
      observer()
      if (user) {
        resolve()
      } else {
        reject()
      }
    })
  })
}
export default router
