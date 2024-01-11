// Importación de librerías y módulos necesarios
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

// Definición del store 'ruleta' con Pinia
export const useRuletaStore = defineStore('ruleta', () => {
  const router = useRouter()
  // Definición de referencias reactivas
  const preguntasAleatoria = ref({})
  const categoria = ref('')
  const categoriaAleatoria = ref('')
  const colorAleatoria = ref('')
  const vidas = ref(2)
  const puntos = ref(0)
  const showCoronaPopup = ref(false)
  const mostrarPopupFinVidas = ref(false)
  const coronaContador = ref(0)
  const progressBar = ref(0)
  // Definición de ítems para la ruleta
  const items = [
    { id: 1, name: 'corona', htmlContent: 'Corona', textColor: 'white', background: '#9b59b6' },
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
      // Mostrar el popup y desactivar el desplazamiento del cuerpo
      mostrarPopupFinVidas.value = true
      vidas.value = 2
      puntos.value = 0
      coronaContador.value = 0
      progressBar.value = 0

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
        categoriaAleatoria.value = preguntasJson.categoria
        colorAleatoria.value = preguntasJson.color
        closeCoronaPopup() // Cerrar el popup después de seleccionar una categoría
        router.push({ name: 'preguntas-demo' })
      })
      .catch((error) => {
        // Manejar el error
        console.error('Error al obtener los datos:', error)
      })
  }
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
  // Propiedad computada para obtener pregunta aleatoria
  const getPreguntaAleatoria = computed(() => {
    return {
      pregunta: preguntasAleatoria.value.pregunta,
      opciones: preguntasAleatoria.value.opciones,
      respuestaCorrecta: preguntasAleatoria.value.respuesta_correcta,
      categoria: categoriaAleatoria.value,
      color: colorAleatoria.value
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
    coronaContador,
    progressBar,
    wheelEndedCallback,
    selectCategory
  }
})
