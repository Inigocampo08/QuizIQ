import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRuletaStore = defineStore('ruleta', () => {
  const acitveRoulette = ref(true)
  const categoria = ref('')

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

  function wheelEndedCallback(item) {
    categoria.value = item
    preguntasVue()
  }
  return {
    acitveRoulette,
    items,
    isActiveRoulette,
    wheelEndedCallback
  }
})
