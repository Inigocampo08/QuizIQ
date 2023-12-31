import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { useFirebaseAuth } from 'vuefire'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const useAccessStore = defineStore('access', () => {
  //Variables
  const router = useRouter()

  const haveAccount = ref(true)

  //! Firebase
  const auth = useFirebaseAuth()
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-email': 'Correo electronico invalido',
    'auth/invalid-credential': 'Contraseña incorrecta',
    'auth/missing-password': 'La contraseña es obligatoria'
  }
  //Functions
  function setHaveAccount() {
    haveAccount.value = !haveAccount.value
  }

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        console.log(errorCodes[error.code])
      })
  }

  //RETURN
  return {
    haveAccount,
    login,
    setHaveAccount
  }
})
