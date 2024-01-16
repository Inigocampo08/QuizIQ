import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useFirebaseAuth, useFirestore, useCollection /* UseDocument */ } from 'vuefire'
import { collection, doc, setDoc, getDoc, query, where } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

import { useNotificacionStore } from './notificacion'

export const useAccessStore = defineStore('access', () => {
  //Variables
  const db = useFirestore()

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
        obtainLogedUser(user)
      }
    })
  })

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user.uid)

        obtainLogedUser(user)

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

  function validateRegister({ email, password, password2, username }) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&@#()=¡¿*^+,-./\\])[A-Za-z\d@$!%*?&@#()=¡¿*^+,-./\\]{8,}$/
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/
    if (!usernameRegex.test(username)) {
      errorMsg.value =
        'El nombre de usuario debe contener solo letras, números, guiones bajos (_) o guiones (-) y tener entre 3 y 16 caracteres'
      setTimeout(() => {
        errorMsg.value = ''
      }, 3000)
      return
    }
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

    register(username, email, password)
  }

  function register(username, email, password) {
    // Asegúrate de que 'auth' y 'errorCodes' estén correctamente definidos y accesibles aquí
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        createUser(user, username)
        // Combina los datos relevantes y asígnalos a 'logedUser'
        logedUser.value = {
          uid: user.uid,
          email: user.email,
          username: username
          // Puedes agregar más campos si es necesario
        }

        router.push({ name: 'home' })
        //Notificaciones Register
        notificacionStore.notificacion = `Bienvenido ${username} `
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

  async function createUser({ email, uid }, username) {
    await setDoc(doc(db, 'users', email), {
      uid: uid,
      username: username,
      puntos: 0
    })
  }
  async function obtainLogedUser(u) {
    const usuario = await getDoc(doc(db, 'users', u.email))
    logedUser.value = {
      uid: u.uid,
      email: u.email,
      username: usuario.data().username
    }
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
