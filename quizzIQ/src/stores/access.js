import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
export const useAccessStore = defineStore('access', () => {
  //Variables
  const router = useRouter()

  const haveAccount = ref(true)
  const users = [
    {
      email: 'andrei@gmail.com',
      password: 1234
    }
  ]

  //Functions
  function setHaveAccount() {
    haveAccount.value = !haveAccount.value
  }
  function loginValidate() {
 console.log('Hola');
 
  }

  //RETURN
  return {
    haveAccount,
    setHaveAccount,
    loginValidate
  }
})
