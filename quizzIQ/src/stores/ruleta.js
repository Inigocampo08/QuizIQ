// Importación de librerías y módulos necesarios
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useFirestore } from 'vuefire'
import { doc, increment, updateDoc } from 'firebase/firestore'

import { useAccessStore } from '@/stores/access'
import { usePartidaStore } from '@/stores/partida'
// Definición del store 'ruleta' con Pinia
export const useRuletaStore = defineStore('ruleta', () => {
  const db = useFirestore()

  const router = useRouter()
  const accessStore = useAccessStore()
  const partidaStore = usePartidaStore()
  // Definición de referencias reactivas
  const preguntasAleatoria = ref({})
  const categoria = ref('')
  const categoriaAleatoria = ref('')
  const colorAleatoria = ref('')

  // Definición de ítems para la ruleta
  const items = [
    {
      id: 1,
      name: 'corona',
      htmlContent: '<img class="categoria__ruleta--icon" src="/corona.png" alt="Corona"/>',
      textColor: 'white',
      background: '#9b59b6'
    },
    {
      id: 2,
      name: 'deportes',
      htmlContent: '<img class="categoria__ruleta--icon" src="/deportes.png" alt="Deportes"/>',
      textColor: 'white',
      background: '#e67e22'
    },
    {
      id: 3,
      name: 'entretenimiento',
      htmlContent:
        '<img class="categoria__ruleta--icon" src="/entretenimiento.png" alt="Entretenimiento"/>',
      textColor: 'white',
      background: '#ff69b4'
    },
    {
      id: 4,
      name: 'geografia',
      htmlContent: '<img class="categoria__ruleta--icon" src="/geografia.png" alt="Geografia"/>',
      textColor: 'white',
      background: '#3498db'
    },
    {
      id: 5,
      name: 'historia',
      htmlContent: '<img class="categoria__ruleta--icon" src="/historia.png" alt="Historia"/>',
      textColor: 'white',
      background: '#f1c40f'
    },
    {
      id: 6,
      name: 'arte',
      htmlContent: '<img class="categoria__ruleta--icon" src="/arte.png" alt="Arte"/>',
      textColor: 'white',
      background: '#e74c3c'
    },
    {
      id: 7,
      name: 'ciencia',
      htmlContent: '<img class="categoria__ruleta--icon" src="/ciencia.png" alt="Ciencia"/>',
      textColor: 'white',
      background: '#2ecc71'
    }
  ]
  watch(
    () => partidaStore.partidaData.vidas,
    (newValue) => {
      if (newValue === 0) {
        setTimeout(() => {
          partidaStore.partidaData.mostrarPopupFinVidas = true
          document.body.classList.add('no-scroll')
        }, 1500)

        if (accessStore.isAuth) {
          actualizarPuntos(partidaStore.partidaData.logedUser)
        }
      }
    }
  )

  watch(
    () => partidaStore.partidaData.coronaContador,
    (newValue) => {
      if (newValue === 3) {
        openCoronaPopup()
      }
      partidaStore.partidaData.progressBar = 33.33 * newValue
    }
  )

  watch(partidaStore.partidaData.selectedCorona, (newValue) => {
    if (
      newValue.arte &&
      newValue.ciencia &&
      newValue.deportes &&
      newValue.entretenimiento &&
      newValue.geografia &&
      newValue.historia
    ) {
      document.body.classList.add('no-scroll')
      partidaStore.partidaData.mostrarPopupGanador = true
      if (accessStore.isAuth) {
        actualizarPuntos(partidaStore.partidaData.logedUser)
      }
    }
  })

  // Callback para cuando la rueda termina
  function wheelEndedCallback(item) {
    categoria.value = item

    partidaStore.partidaData.preguntaContestada = false
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
      .get('https://raw.githubusercontent.com/Andriucm/preguntas.json/main/db.json')
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
        categoriaAleatoria.value = preguntasJson.categoria
        colorAleatoria.value = preguntasJson.color
        shuffleArray(preguntasAleatoria.value.opciones)
        guardarDatosParida()
        router.push({ name: 'preguntas' })
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

  function selectCategory(category) {
    categoria.value = category
    partidaStore.partidaData.preguntaContestada = false

    // Hacer la solicitud GET
    axios
      .get('https://raw.githubusercontent.com/Andriucm/preguntas.json/main/db.json')
      .then((response) => {
        // Datos obtenidos
        const triviaData = response.data
        // Acceder a las preguntas de una categoría específica (por ejemplo, Historia)
        const preguntasJson = triviaData.find(
          (cat) => cat.categoria.toUpperCase() === categoria.value.toUpperCase()
        )
        // Randomizar la selección de una pregunta
        const indiceAleatorio = Math.floor(Math.random() * preguntasJson.preguntas.length)
        preguntasAleatoria.value = preguntasJson.preguntas[indiceAleatorio]
        categoriaAleatoria.value = preguntasJson.categoria
        colorAleatoria.value = preguntasJson.color
        shuffleArray(preguntasAleatoria.value.opciones)
        guardarDatosParida()
        partidaStore.partidaData.selectedCorona.isCorona = true

        closeCoronaPopup() // Cerrar el popup después de seleccionar una categoría
        router.push({ name: 'preguntas' })
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

  function cambiarEstadoCategoria(cat) {
    // Verifica si la categoría existe en el objeto reativo
    if (cat in partidaStore.partidaData.selectedCorona) {
      // Cambia el estado de la categoría
      partidaStore.partidaData.selectedCorona[cat] = !partidaStore.partidaData.selectedCorona[cat]
    } else {
      console.error('Categoría no encontrada en el objeto selectedCorona')
    }
  }
  function openCoronaPopup() {
    partidaStore.partidaData.showCoronaPopup = true
    document.body.classList.add('no-scroll') // Añadir clase para evitar desplazamiento
    partidaStore.partidaData.coronaContador = -1
  }
  // Función para cerrar el popup
  function closeCoronaPopup() {
    partidaStore.partidaData.showCoronaPopup = false
    document.body.classList.remove('no-scroll') // Eliminar clase para permitir desplazamiento
  }
  function resetearValoresPartida() {
    partidaStore.partidaData.vidas = 3
    partidaStore.partidaData.coronaContador = 0
    partidaStore.partidaData.coronaContador = 0
    partidaStore.partidaData.puntos = 0
    partidaStore.partidaData.preguntaContestada = false

    Object.assign(partidaStore.partidaData.selectedCorona, {
      isCorona: false,
      deportes: false,
      arte: false,
      ciencia: false,
      entretenimiento: false,
      historia: false,
      geografia: false
    })
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }
  function guardarDatosParida() {
    partidaStore.partidaData.pregunta = preguntasAleatoria.value.pregunta
    partidaStore.partidaData.opciones = preguntasAleatoria.value.opciones
    partidaStore.partidaData.categoria = categoriaAleatoria.value
    partidaStore.partidaData.color = colorAleatoria.value
    partidaStore.partidaData.respuestaCorrecta = preguntasAleatoria.value.respuesta_correcta
  }
  async function actualizarPuntos(u) {
    await updateDoc(doc(db, 'users', u.email), {
      puntos: increment(partidaStore.partidaData.puntos)
    })
  }

  // Retorno de todas las propiedades y funciones del store
  return {
    items,
    wheelEndedCallback,
    selectCategory,
    cambiarEstadoCategoria,
    resetearValoresPartida
  }
})
