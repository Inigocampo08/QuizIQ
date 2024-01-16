// Importación de librerías y módulos necesarios
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useFirestore } from 'vuefire'
import { doc, increment, updateDoc } from 'firebase/firestore'

import { useAccessStore } from '@/stores/access'
// Definición del store 'ruleta' con Pinia
export const useRuletaStore = defineStore('ruleta', () => {
  const db = useFirestore()

  const router = useRouter()
  const accessStore = useAccessStore()
  // Definición de referencias reactivas
  const preguntasAleatoria = ref({})
  const categoria = ref('')
  const categoriaAleatoria = ref('')
  const colorAleatoria = ref('')
  const vidas = ref(3)
  const puntos = ref(0)
  const showCoronaPopup = ref(false)
  const mostrarPopupFinVidas = ref(false)
  const mostrarPopupGanador = ref(false)
  const coronaContador = ref(0)
  const progressBar = ref(0)

  const selectedCorona = ref({
    isCorona: false,
    deportes: false,
    entretenimiento: false,
    ciencia: false,
    arte: false,
    historia: false,
    geografia: false
  })
  // Definición de ítems para la ruleta
  const items = [
    {
      id: 1,
      name: 'corona',
      htmlContent: '<img class="categoria__ruleta--icon" src="/public/corona.png" alt="Corona"/>',
      textColor: 'white',
      background: '#9b59b6'
    },
    {
      id: 2,
      name: 'deportes',
      htmlContent: 'Deportes',
      textColor: 'white',
      background: '#e67e22'
    },
    {
      id: 3,
      name: 'entretenimiento',
      htmlContent: 'Entretenimiento',
      textColor: 'white',
      background: '#ff69b4'
    },
    {
      id: 4,
      name: 'geografia',
      htmlContent: 'Geografia',
      textColor: 'white',
      background: '#3498db'
    },
    {
      id: 5,
      name: 'historia',
      htmlContent: 'Historia',
      textColor: 'white',
      background: '#f1c40f'
    },
    { id: 6, name: 'arte', htmlContent: 'Arte', textColor: 'white', background: '#e74c3c' },
    {
      id: 7,
      name: 'ciencia',
      htmlContent: 'Ciencia',
      textColor: 'white',
      background: '#2ecc71'
    }
  ]
  // Watcher para observar cambios en 'vidas'
  watch(vidas, (newValue) => {
    if (newValue === 0) {
      mostrarPopupFinVidas.value = true
    document.body.classList.add('no-scroll')

      if (accessStore.isAuth) {
        actualizarPuntos(accessStore.logedUser)
      }

    }
  })

  watch(coronaContador, (newValue) => {
    if (newValue === 3) {
      // Mostrar el popup y desactivar el desplazamiento del cuerpo
      openCoronaPopup()
    } else {
      console.log(newValue)
    }
    progressBar.value = 33.33 * newValue
  })

  watch(selectedCorona.value, (newValue) => {
    if (
      newValue.arte &&
      newValue.ciencia &&
      newValue.deportes &&
      newValue.entretenimiento &&
      newValue.geografia &&
      newValue.historia
    ) {
    document.body.classList.add('no-scroll')
      mostrarPopupGanador.value = true
      if (accessStore.isAuth) {
        actualizarPuntos(accessStore.logedUser)
      }
    }
  })

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
        categoriaAleatoria.value = preguntasJson.categoria
        colorAleatoria.value = preguntasJson.color
        router.push({ name: 'preguntas-demo' })
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

  function selectCategory(category) {
    categoria.value = category
    console.log(`Categoría seleccionada: ${categoria.value}`)

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
        categoriaAleatoria.value = preguntasJson.categoria
        colorAleatoria.value = preguntasJson.color
        selectedCorona.value.isCorona = true
        closeCoronaPopup() // Cerrar el popup después de seleccionar una categoría
        router.push({ name: 'preguntas-demo' })
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }

  function cambiarEstadoCategoria(cat) {
    // Verifica si la categoría existe en el objeto reativo
    if (cat in selectedCorona.value) {
      // Cambia el estado de la categoría
      selectedCorona.value[cat] = !selectedCorona.value[cat]
    } else {
      console.error('Categoría no encontrada en el objeto selectedCorona')
    }
  }
  function openCoronaPopup() {
    showCoronaPopup.value = true
    document.body.classList.add('no-scroll') // Añadir clase para evitar desplazamiento
    coronaContador.value = -1
  }
  // Función para cerrar el popup
  function closeCoronaPopup() {
    showCoronaPopup.value = false
    document.body.classList.remove('no-scroll') // Eliminar clase para permitir desplazamiento
  }
  function resetearValoresPartida() {
    vidas.value = 3
    coronaContador.value = 0
    progressBar.value = 0
    puntos.value = 0
    progressBar.value = 0
    Object.assign(selectedCorona.value, {
      isCorona: false,
      deportes: false,
      arte: false,
      ciencia: false,
      entretenimiento: false,
      historia: false,
      geografia: false
    })
  }

  async function actualizarPuntos(u) {
    await updateDoc(doc(db, 'users', u.email), {
      puntos: increment(puntos.value)
    })
  }
  // Propiedad computada para obtener pregunta aleatoria
  const getPreguntaAleatoria = computed(() => {
    return {
      pregunta: preguntasAleatoria.value.pregunta,
      opciones: preguntasAleatoria.value.opciones,
      respuestaCorrecta: preguntasAleatoria.value.respuesta_correcta,
      categoria: categoriaAleatoria.value,
      color: colorAleatoria.value,
      seleccionado: selectedCorona.value
    }
  })

  // Retorno de todas las propiedades y funciones del store
  return {
    items,
    categoria,
    getPreguntaAleatoria,
    vidas,
    puntos,
    showCoronaPopup,
    mostrarPopupFinVidas,
    mostrarPopupGanador,
    coronaContador,
    progressBar,
    selectedCorona,
    wheelEndedCallback,
    selectCategory,
    cambiarEstadoCategoria,
    resetearValoresPartida
  }
})
