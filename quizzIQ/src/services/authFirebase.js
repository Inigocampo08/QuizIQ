// firebase.js
import { useFirebaseAuth } from 'vuefire'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

  function observeAuthState(callback) {
    return onAuthStateChanged(auth, callback)
  }

  // Agrega otras funciones según sea necesario

  return {
    signIn,
    signUp,
    signOutUser,
    observeAuthState
    // Otros métodos necesarios
  }
}
