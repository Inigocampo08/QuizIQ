import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDemoGameStore = defineStore('demoGame', () => {
  //************* COUNTADOR  *************/
  const segundosRestantes = ref(60) // Inicializamos el contador en 60 segundos
  let intervalo
  function iniciarContador() {
    intervalo = setInterval(() => {
      if (segundosRestantes.value > 0) {
        segundosRestantes.value--
      } else {
        clearInterval(intervalo) // Detener el intervalo cuando el contador llega a 0
        console.log('Tiempo agotado') // Emitir evento cuando el tiempo se agota
      }
    }, 1000) // Actualizar cada segundo
  }
  function detenerContador() {
    clearInterval(intervalo)
  }
  function resetearContador() {
    clearInterval(intervalo)
    segundosRestantes.value = 60
    iniciarContador()
  }
  //? *************************************************/

  // ************* PREGUNTAS *************/
  //? *************************************************/

  // ************* RULETA *************/
  const acitveRoulette = ref(true)
  const result = ref('')

  function isActiveRoulette() {
    acitveRoulette.value = !acitveRoulette.value
  }

  const items = [
    { id: 1, name: 'corona', htmlContent: 'Corona', textColor: 'white', background: 'purple' },
    {
      id: 2,
      name: 'deportes',
      htmlContent: 'Deportes',
      textColor: 'white',
      background: 'orange'
    },
    {
      id: 3,
      name: 'entretenimiento',
      htmlContent: 'Entretenimiento',
      textColor: 'white',
      background: 'hotpink'
    },
    {
      id: 4,
      name: 'geografia',
      htmlContent: 'Geografia',
      textColor: 'white',
      background: 'blue'
    },
    {
      id: 5,
      name: 'historia',
      htmlContent: 'Historia',
      textColor: 'black',
      background: 'yellow'
    },
    { id: 6, name: 'arte', htmlContent: 'Arte', textColor: 'white', background: 'red' },
    { id: 7, name: 'ciencia', htmlContent: 'Ciencia', textColor: 'white', background: 'green' }
  ]

  const wheelEndedCallback = (item) => {
    console.log('wheel ended !', item)
    result.value = item
    console.log(result.value.id)
    acitveRoulette.value = !acitveRoulette.value
  }
  //? *************************************************/

  return {
    //COUNTADOR
    segundosRestantes,
    iniciarContador,
    detenerContador,
    resetearContador,
    //RULETA
    acitveRoulette,
    items,
    isActiveRoulette,
    wheelEndedCallback
  }
})
