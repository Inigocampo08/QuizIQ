import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useRuletaStore } from '@/stores/ruleta'
import { useContadorStore } from '@/stores/contador'

export const usePreguntasStore = defineStore('preguntas', () => {
  // Inicialización de Vue Router y stores
  const ruletaStore = useRuletaStore()
  const router = useRouter()
  const contadorStore = useContadorStore()
  // Variables reactivas
  const respuestaUsuario = ref(null)
  const opcionesHabilitadas = ref(true)
  // Variables para manejo de errores
  const error = ref()
  const errorMsg = ref('')

  watchEffect(() => {
    if (contadorStore.segundosRestantes === 0) {
      // Si el tiempo se ha agotado
      error.value = true
      errorMsg.value = 'Se terminó el tiempo!'
      opcionesHabilitadas.value = false
      ruletaStore.vidas--
      ruletaStore.coronaContador = 0
      ruletaStore.selectedCorona.isCorona = false
      // Reinicio de la ruleta y el contador después de 3 segundos
      setTimeout(() => {
        if (!ruletaStore.mostrarPopupFinVidas) {
          router.push({ name: 'ruleta-demo' })
        } else {
          return
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
    const tiempoRestante = contadorStore.segundosRestantes
    ruletaStore.puntos += tiempoRestante * 10
    ruletaStore.coronaContador++
  }

  function validarRespuesta(opcion) {
    // Asignación de la respuesta del usuario y deshabilitación de opciones
    respuestaUsuario.value = opcion
    opcionesHabilitadas.value = false
    contadorStore.detenerContador()
    if (respuestaUsuario.value === ruletaStore.getPreguntaAleatoria.respuestaCorrecta) {
      if (ruletaStore.getPreguntaAleatoria.seleccionado.isCorona) {
        console.log('Corona')
        handleRespuestaCorrecta()
        ruletaStore.cambiarEstadoCategoria(ruletaStore.getPreguntaAleatoria.categoria)
        if (!ruletaStore.mostrarPopupGanador) {
           setTimeout(() => {
          router.push({ name: 'ruleta-demo' })
        }, 1500)
        }
       
      } else {
        handleRespuestaCorrecta()
        setTimeout(() => {
          router.push({ name: 'ruleta-demo' })
        }, 1500)
      }
    } else {
      // Si la respuesta es incorrecta
      error.value = true
      errorMsg.value = '¡Respuesta incorrecta!'
      // Reducción del número de vidas en el store
      ruletaStore.vidas--
      ruletaStore.coronaContador = 0
      ruletaStore.progressBar = 0
      setTimeout(() => {
        if (!ruletaStore.mostrarPopupFinVidas) {
          router.push({ name: 'ruleta-demo' })
        }
      }, 1500)
    }
    ruletaStore.selectedCorona.isCorona = false
    if (ruletaStore.coronaContador === 3) {
      router.push({ name: 'ruleta-demo' })
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
