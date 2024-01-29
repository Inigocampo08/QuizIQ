import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useFirestore } from 'vuefire'
import { doc, setDoc, collection, query, where, getDoc, getDocs } from 'firebase/firestore'
import { useAuth } from '@/services/authFirebase'

import { useNotificacionStore } from '@/stores/notificacion'
import { useRuletaStore } from '@/stores/ruleta'
import { usePartidaStore } from '@/stores/partida'

export const useAccessStore = defineStore('access', () => {
  //Variables

  const { signIn, signUp, signOutUser, observeAuthState } = useAuth()
  const db = useFirestore()

  const router = useRouter()
  const notificacionStore = useNotificacionStore()
  const ruletaStore = useRuletaStore()
  const partidaStore = usePartidaStore()
  const logedUser = ref(null)
  const haveAccount = ref(true)
  const errorMsg = ref('')

  //! Firebase
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
    observeAuthState((user) => {
      if (user) {
        obtainLogedUser(user)
      }
    })
  })
  function login({ email, password }) {
    signIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        obtainLogedUser(user)
        //Notificaciones Login
        notificacionStore.notificacion = `Bienvenido ${partidaStore.partidaData.logedUser.username} `
        notificacionStore.texto = 'Has iniciado sesión'
        notificacionStore.show = true
        router.push({ name: 'home' })
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code]
        setTimeout(() => {
          errorMsg.value = ''
        }, 3000)
      })
  }
  function logout() {
    signOutUser()
      .then(() => {
        partidaStore.partidaData.logedUser = null
        router.push({ name: 'home' })

        //Notificaciones Logout
        notificacionStore.notificacion = 'Se ha cerrado la sesión'
        notificacionStore.texto = '¡Muchas gracias por jugar!'
        notificacionStore.show = true
        ruletaStore.resetearValoresPartida()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&@#()=¡¿*^+,-./\\])[A-Za-z\d@$!%*?&@#()=¡¿*^+,-./\\]{8,}$/
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/
  async function validateRegister({ email, password, password2, username }) {
    // Verifica si el nombre de usuario ya existe
   validateUsername(username)
    validatePasswordFormat(password)
    validatePasswordMatch(password, password2)
    register(username, email, password)
  }

  function validatePasswordFormat({ password }) {
    if (!passwordRegex.test(password)) {
      errorMsg.value =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un signo especial'
      return false // Indica que la validación no pasó
    }else{
      errorMsg.value = ''
    }
    return true // Indica que la validación pasó
  }

  function validatePasswordMatch({ password, password2 }) {
    if (password !== password2) {
      errorMsg.value = 'Las contraseñas no coinciden'
  
      return false // Indica que la validación no pasó
    } else {
      errorMsg.value = ''
    }

    return true // Indica que la validación pasó
  }

  async function validateUsername({username}) {
    // Verifica si el nombre de usuario ya existe
    const usernameAlreadyExists = await usernameExist(username)

    if (usernameAlreadyExists) {
      errorMsg.value = 'El nombre de usuario ya existe. Por favor, elija otro nombre de usuario'
      return false // Indica que la validación no pasó
    } else {
        errorMsg.value = ''
      
    }

    if (!usernameRegex.test(username)) {
      errorMsg.value =
        'El nombre de usuario debe contener solo letras, números, guiones bajos (_) o guiones (-) y tener entre 3 y 16 caracteres'
      return false // Indica que la validación no pasó
    } else {
      errorMsg.value = ''
    }

    return true // Indica que la validación pasó
  }

  function register(username, email, password) {
    // Asegúrate de que 'auth' y 'errorCodes' estén correctamente definidos y accesibles aquí
    signUp(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        createUser(user, username)
        // Combina los datos relevantes y asígnalos a 'logedUser'
        partidaStore.partidaData.logedUser = {
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
    partidaStore.partidaData.logedUser = {
      uid: u.uid,
      email: u.email,
      username: usuario.data().username
    }
  }

  async function usernameExist(username) {
    try {
      const q = query(collection(db, 'users'), where('username', '==', username))
      const snapshot = await getDocs(q)
      if (snapshot.docs.length > 0) {
        errorMsg.value = 'El nombre de usuario ya existe. Por favor, elija otro nombre de usuario'
        setTimeout(() => {
          errorMsg.value = ''
        }, 3000)
        return true // Indica que el nombre de usuario ya existe
      }
      return false // Indica que el nombre de usuario está disponible
    } catch (error) {
      console.error('Error al verificar la existencia del nombre de usuario:', error)
      // Puedes manejar el error de alguna manera (mostrar un mensaje, log, etc.)
      return false // Indica que ocurrió un error, pero el nombre de usuario se considera disponible
    }
  }

  const hasError = computed(() => {
    return errorMsg.value
  })

  const isAuth = computed(() => {
    return partidaStore.partidaData.logedUser
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
    validatePasswordFormat,
    validatePasswordMatch,
    validateUsername,
    setHaveAccount
  }
})
