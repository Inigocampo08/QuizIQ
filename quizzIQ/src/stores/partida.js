import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const usePartidaStore = defineStore('partida', () => {
  const partidaData = reactive({
    categoria: '',
    pregunta: '',
    opciones: '',
    color: '',
    selectedCorona: {
      isCorona: false,
      deportes: false,
      entretenimiento: false,
      ciencia: false,
      arte: false,
      historia: false,
      geografia: false
    },
    respuestaCorrecta: '',
    puntos: 0,
    vidas: 3,
    coronaContador: 0,
    progressBar: 0,
    segundosRestantes: 10,
    showCoronaPopup: false,
    mostrarPopupFinVidas: false,
    mostrarPopupGanador: false,
    preguntaContestada:false,
    logedUser: null
  })

  // Intenta cargar los datos almacenados en localStorage al iniciar la aplicación
  const storedPartidaData = JSON.parse(localStorage.getItem('partidaData'))
  if (storedPartidaData) {
    Object.assign(partidaData, storedPartidaData)
  }

  // Observa cambios en partidaData y actualiza localStorage
  watch(
    partidaData,
    () => {
      localStorage.setItem('partidaData', JSON.stringify(partidaData))
    },
    { deep: true }
  )

  return {
    partidaData
  }
})
