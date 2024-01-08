import { ref, computed, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { defineStore } from 'pinia'

import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

export const useAccessStore = defineStore('access', () => {
  //Variables
  const router = useRouter()
  const route = useRoute()

  const logedUser = ref(null)
  const haveAccount = ref(true)
  const errorMsg = ref('')

  //! Firebase
  const auth = useFirebaseAuth()
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-email': 'Correo electronico invalido',
    'auth/invalid-credential': 'Contraseña incorrecta',
    'auth/missing-password': 'La contraseña es obligatoria',
    'auth/wrong-password': 'Contraseña incorrecta'
  }
  //Functions
  function setHaveAccount() {
    haveAccount.value = !haveAccount.value
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        logedUser.value = user
      }
    })
  })

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        logedUser.value = user
        console.log(user.uid);
        router.push({ name: 'index', params: { id: user.uid } })
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code]
        setTimeout(() => {
          errorMsg.value = ''
        }, 3000)
      })
  }
  function logout() {
    signOut(auth)
      .then(() => {
        logedUser.value = null
        router.push({ name: 'home' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  //RETURN
  return {
    haveAccount,
    errorMsg,
    hasError,
    login,
    logout,
    setHaveAccount
  }
})
