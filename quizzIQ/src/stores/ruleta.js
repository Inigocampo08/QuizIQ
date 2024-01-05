import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useContadorStore } from './contador'

const contadorStore = useContadorStore()

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
  const preguntasAleatoria = ref({})
  function preguntasVue() {
    // Hacer la solicitud GET
    axios
      .get('../../src/assets/json/preguntas.json')
      .then((response) => {
        // Datos obtenidos
        const triviaData = response.data

        // Acceder a las preguntas de una categoría específica (por ejemplo, Historia)
        const preguntasJson = triviaData.find(
          (cat) => cat.categoria.toUpperCase() === categoria.value.name.toUpperCase()
        )

        // Randomizar la selección de una pregunta
        const indiceAleatorio = Math.floor(Math.random() * preguntasJson.preguntas.length)
        preguntasAleatoria.value = preguntasJson.preguntas[indiceAleatorio]

        isActiveRoulette()
        contadorStore.iniciarContador()
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

  const getPreguntaAleatoria = computed(() => {
    return {
      pregunta: preguntasAleatoria.value.pregunta,
      opciones: preguntasAleatoria.value.opciones,
      respuestaCorrecta: preguntasAleatoria.value.respuesta_correcta // Asegúrate de incluir esto en tus datos de preguntas
    }
  })
  return {
    acitveRoulette,
    items,
    isActiveRoulette,
    wheelEndedCallback,
    getPreguntaAleatoria
  }
})
