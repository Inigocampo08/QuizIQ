import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useContadorStore = defineStore('contador', () => {

    //************* CONTADOR  *************/
    const segundosRestantes = ref(60) // Inicializamos el contador en 60 segundos
    let intervalo
    function iniciarContador() {
        intervalo = setInterval(() => {
        if (segundosRestantes.value > 0) {
            segundosRestantes.value--
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
        segundosRestantes.value = 60
        iniciarContador()
    }

    return {
        //COUNTADOR
        segundosRestantes,
        iniciarContador,
        detenerContador,
        resetearContador,
    }
})