import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
    'auth/invalid-email': 'Correo electrónico inválido',
    'auth/invalid-credential': 'Credencial inválida',
    'auth/missing-password': 'La contraseña es obligatoria',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/weak-password':
      'La contraseña es débil. Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.',
    'auth/email-already-in-use': 'El correo electrónico ya está en uso',
    'auth/requires-recent-login': 'Necesitas iniciar sesión de nuevo para realizar esta acción',
    'auth/user-disabled': 'La cuenta de usuario ha sido deshabilitada',
    'auth/operation-not-allowed': 'Operación no permitida'
    // Puedes añadir más códigos de error y mensajes aquí según lo necesites
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
        console.log(user.uid)
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

  function validateRegister({ email, password, password2 }) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&@#()=¡¿*^+,-./\\])[A-Za-z\d@$!%*?&@#()=¡¿*^+,-./\\]{8,}$/

    if (password !== password2) {
      errorMsg.value = 'Las contraseñas no coinciden'
      setTimeout(() => {
        errorMsg.value = ''
      }, 3000)
      return
    }

    if (!passwordRegex.test(password)) {
      errorMsg.value =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un signo especial'
      setTimeout(() => {
        errorMsg.value = ''
      }, 3000)
      return
    }

    register(email, password)
  }

  function register(email, password) {
    // Asegúrate de que 'auth' y 'errorCodes' estén correctamente definidos y accesibles aquí
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user.uid)
        router.push({ name: 'index', params: { id: user.uid } })
        logedUser.value = user
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code] || 'Error desconocido'
        setTimeout(() => {
          errorMsg.value = ''
        }, 3000)
      })
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  //RETURN
  return {
    haveAccount,
    logedUser,
    errorMsg,
    hasError,
    login,
    logout,
    validateRegister,
    setHaveAccount
  }
})
