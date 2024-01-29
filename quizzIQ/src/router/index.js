import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import Home from '@/views/HomeView.vue'
import { usePartidaStore } from '@/stores/partida'

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
      path: '/ruleta',
      name: 'ruleta',
      component: () => import('@/views/RuletaView.vue'),
      beforeEnter: (to, from, next) => {
        // Asegúrate de tener correctamente inicializada la tienda de preguntas
        const partidaStore = usePartidaStore()
        // Si la pregunta no ha sido contestada y se intenta navegar a 'ruleta', bloquea la navegación
        if (from.name === 'preguntas' && partidaStore.partidaData.preguntaContestada === false) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/preguntas',
      name: 'preguntas',
      component: () => import('@/views/PreguntasView.vue'),
      beforeEnter: (to, from, next) => {
        // Asegúrate de tener correctamente inicializada la tienda de preguntas
        const partidaStore = usePartidaStore()
        // Si la pregunta no ha sido contestada y se intenta navegar a 'ruleta', bloquea la navegación
        if (from.name === 'ruleta' && partidaStore.partidaData.preguntaContestada !== false) {
          next(false)
        } else {
          next()
        }
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/perfil',
          name: 'perfil',
          component: () => import('@/views/admin/PerfilView.vue')
        }
      ]
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
