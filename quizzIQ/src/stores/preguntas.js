import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useRuletaStore } from '@/stores/ruleta'
import { useContadorStore } from '@/stores/contador'
import { usePartidaStore } from '@/stores/partida'

export const usePreguntasStore = defineStore('preguntas', () => {
  // Inicialización de Vue Router y stores
  const router = useRouter()
  const contadorStore = useContadorStore()
  const ruletaStore = useRuletaStore()
  const partidaStore = usePartidaStore()

  // Variables reactivas
  const respuestaUsuario = ref(null)
  const opcionesHabilitadas = ref(true)
  // Variables para manejo de errores
  const error = ref()
  const errorMsg = ref('')

  //variable para comprobar si se ha contestado a la pregunta y una funcion para resetearla
  function isPreguntaContestada() {
    partidaStore.partidaData.preguntaContestada = true
  }

  watchEffect(() => {
    if (partidaStore.partidaData.segundosRestantes === 0) {
      // Si el tiempo se ha agotado
      error.value = true
      errorMsg.value = 'Se terminó el tiempo!'
      opcionesHabilitadas.value = false
      partidaStore.partidaData.vidas--
      partidaStore.partidaData.coronaContador = 0
      partidaStore.partidaData.selectedCorona.isCorona = false
    isPreguntaContestada()

      // Reinicio de la ruleta y el contador después de 3 segundos
      setTimeout(() => {
        if (!partidaStore.partidaData.mostrarPopupFinVidas) {
          router.push({ name: 'ruleta' })
        }
      }, 1500)
    } else {
      // Si el tiempo no se ha agotado
      error.value = false
      errorMsg.value = ''
    }
  })

  function handleRespuestaCorrecta() {
    // Si la respuesta es correcta
    error.value = false
    errorMsg.value = '¡Respuesta correcta!'
    // Cálculo de puntos basado en el tiempo restante y actualización del store
    const tiempoRestante = partidaStore.partidaData.segundosRestantes
    if (partidaStore.partidaData.selectedCorona.isCorona) {
      partidaStore.partidaData.puntos += tiempoRestante * 20
    } else {
      partidaStore.partidaData.puntos += tiempoRestante * 10
    }
    setTimeout(() => {
      partidaStore.partidaData.coronaContador++
    }, 1800)
  }
  function validarRespuesta(opcion) {
    // Asignación de la respuesta del usuario y deshabilitación de opciones
    respuestaUsuario.value = opcion
    opcionesHabilitadas.value = false
    contadorStore.detenerContador()
    if (respuestaUsuario.value === partidaStore.partidaData.respuestaCorrecta) {
      if (partidaStore.partidaData.selectedCorona.isCorona) {
        handleRespuestaCorrecta()
        ruletaStore.cambiarEstadoCategoria(partidaStore.partidaData.categoria)
        if (!partidaStore.partidaData.mostrarPopupGanador) {
          setTimeout(() => {
            router.push({ name: 'ruleta' })
          }, 1500)
        }
      } else {
        handleRespuestaCorrecta()
        setTimeout(() => {
          router.push({ name: 'ruleta' })
        }, 1500)
      }
    } else {
      // Si la respuesta es incorrecta
      error.value = true
      errorMsg.value = '¡Respuesta incorrecta!'
      // Reducción del número de vidas en el store
      partidaStore.partidaData.vidas--
      partidaStore.partidaData.coronaContador = 0
      partidaStore.partidaData.progressBar = 0

      setTimeout(() => {
        if (!partidaStore.partidaData.mostrarPopupFinVidas) {
          router.push({ name: 'ruleta' })
        }
      }, 1500)
    }
    isPreguntaContestada()
    partidaStore.partidaData.selectedCorona.isCorona = false
    if (partidaStore.partidaData.coronaContador === 3) {
      router.push({ name: 'ruleta' })
    }
  }

  return {
    respuestaUsuario,
    opcionesHabilitadas,
    error,
    errorMsg,
    validarRespuesta
  }
})
