import { defineStore } from 'pinia'
import axios from 'axios'

export const usePreguntasStore = defineStore('preguntas', () => {
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
          iniciarContador()
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
      getPreguntaAleatoria
    }
})
