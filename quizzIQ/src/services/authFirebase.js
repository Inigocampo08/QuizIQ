// firebase.js
import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, // Importa la función de restablecimiento de contraseña
  onAuthStateChanged,
  signOut
} from 'firebase/auth'

export function useAuth() {
  const auth = useFirebaseAuth()

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function signOutUser() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function observeAuthState(callback) {
    return onAuthStateChanged(auth, callback)
  }

  // Agrega otras funciones según sea necesario

  return {
    signIn,
    signUp,
    signOutUser,
    resetPassword, // Agrega la función de restablecimiento de contraseña
    observeAuthState
    // Otros métodos necesarios
  }
}
