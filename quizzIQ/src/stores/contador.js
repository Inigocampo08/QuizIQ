import { defineStore } from 'pinia'
import { usePartidaStore } from '@/stores/partida'

export const useContadorStore = defineStore('contador', () => {
  const partidaStore = usePartidaStore() 
  let intervalo
  function iniciarContador() {
    intervalo = setInterval(() => {
      if (partidaStore.partidaData.segundosRestantes > 0) {
        partidaStore.partidaData.segundosRestantes--
      } else {
        clearInterval(intervalo) // Detener el intervalo cuando el contador llega a 0
      }
    }, 1000) // Actualizar cada segundo
  }
  function detenerContador() {
    clearInterval(intervalo)
  }
  function resetearContador() {
    clearInterval(intervalo)
    partidaStore.partidaData.segundosRestantes = 10
  }



  return {
    iniciarContador,
    detenerContador,
    resetearContador
  }
})
