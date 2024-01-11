// Importación de librerías y módulos necesarios
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useContadorStore } from './contador'

// Inicialización de router y contadorStore
const contadorStore = useContadorStore()

// Definición del store 'ruleta' con Pinia
export const useRuletaStore = defineStore('ruleta', () => {
  // Definición de referencias reactivas
  const activeRoulette = ref(true)
  const preguntasAleatoria = ref({})
  const categoria = ref('')
  const vidas = ref('')
  const puntos = ref('')
  const showCoronaPopup = ref(false)
  const mostrarPopupFinVidas = ref(false)
  const coronaContador = ref(0)
  const progressBar = ref(0)

  // Definición de ítems para la ruleta
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
      background: 'lightskyblue'
    },
    {
      id: 5,
      name: 'historia',
      htmlContent: 'Historia',
      textColor: 'black',
      background: 'yellow'
    },
    { id: 6, name: 'arte', htmlContent: 'Arte', textColor: 'white', background: 'red' },
    {
      id: 7,
      name: 'ciencia',
      htmlContent: 'Ciencia',
      textColor: 'white',
      background: 'greenyellow'
    }
  ]

  // Watcher para observar cambios en 'vidas'
  watch(vidas, (newValue) => {
    if (newValue === 0) {
      // Mostrar el popup y desactivar el desplazamiento del cuerpo
      mostrarPopupFinVidas.value = true
      document.body.classList.add('no-scroll')
    }
  })

  watch(coronaContador, (newValue) => {
    if (newValue === 3) {
      // Mostrar el popup y desactivar el desplazamiento del cuerpo
      openCoronaPopup()
    } else {
      console.log(newValue)
    }
  })

  // Función para cambiar el estado de 'activeRoulette'
  function isActiveRoulette() {
    activeRoulette.value = !activeRoulette.value
  }
  // Callback para cuando la rueda termina
  function wheelEndedCallback(item) {
    categoria.value = item

    if (categoria.value.name === 'corona') {
      openCoronaPopup()
    } else {
      preguntasVue()
    }
  }
  // Función para cargar preguntas
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

  // Función para mostrar el popup
  function openCoronaPopup() {
    showCoronaPopup.value = true
    document.body.classList.add('no-scroll') // Añadir clase para evitar desplazamiento
    coronaContador.value = -1
    progressBar.value = -33.33
  }
  // Función para cerrar el popup
  function closeCoronaPopup() {
    showCoronaPopup.value = false
    document.body.classList.remove('no-scroll') // Eliminar clase para permitir desplazamiento
  }
  // Función para seleccionar una categoría
  function selectCategory(category) {
    categoria.value = category
    console.log(`Categoría seleccionada: ${categoria.value}`)
    // Aquí puedes agregar más lógica según la categoría seleccionada
    // Hacer la solicitud GET
    axios
      .get('../../src/assets/json/preguntas.json')
      .then((response) => {
        // Datos obtenidos
        const triviaData = response.data

        // Acceder a las preguntas de una categoría específica (por ejemplo, Historia)
        const preguntasJson = triviaData.find(
          (cat) => cat.categoria.toUpperCase() === categoria.value.toUpperCase()
        )
        console.log(preguntasJson)

        // Randomizar la selección de una pregunta
        const indiceAleatorio = Math.floor(Math.random() * preguntasJson.preguntas.length)
        preguntasAleatoria.value = preguntasJson.preguntas[indiceAleatorio]

        closeCoronaPopup() // Cerrar el popup después de seleccionar una categoría
        isActiveRoulette()
        contadorStore.iniciarContador()
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

 
  
  // Propiedad computada para obtener pregunta aleatoria
  const getPreguntaAleatoria = computed(() => {
    return {
      pregunta: preguntasAleatoria.value.pregunta,
      opciones: preguntasAleatoria.value.opciones,
      respuestaCorrecta: preguntasAleatoria.value.respuesta_correcta
    }
  })

  // Retorno de todas las propiedades y funciones del store
  return {
    activeRoulette,
    items,
    getPreguntaAleatoria,
    vidas,
    puntos,
    showCoronaPopup,
    mostrarPopupFinVidas,
    coronaContador,
    progressBar,
    ,
    isActiveRoulette,
    wheelEndedCallback,
    selectCategory
  }
})
