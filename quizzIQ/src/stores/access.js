import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

import { useNotificacionStore } from './notificacion'

export const useAccessStore = defineStore('access', () => {
  //Variables
  const router = useRouter()

  const notificacionStore = useNotificacionStore()

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
        router.push({ name: 'home' })
        //Notificaciones Login
        notificacionStore.notificacion = 'Bienvenido'
        notificacionStore.texto = 'Has iniciado sesión'
        notificacionStore.show = true
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

        //Notificaciones Logout
        notificacionStore.notificacion = 'Se ha cerrado la sesión'
        notificacionStore.texto = '¡Muchas gracias por jugar!'
        notificacionStore.show = true
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
        router.push({ name: 'home' })
        logedUser.value = user

        //Notificaciones Register
        notificacionStore.notificacion = 'Bienvenido '
        notificacionStore.texto = 'Tu cuenta ha sido creada correctamente'
        notificacionStore.show = true
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

  const isAuth = computed(() => {
    return logedUser.value
  })
  //RETURN
  return {
    haveAccount,
    logedUser,
    errorMsg,
    hasError,
    isAuth,
    login,
    logout,
    validateRegister,
    setHaveAccount
  }
})
