import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useNotificacionStore = defineStore('notificacion', () => {
  const texto = ref('')
  const notificacion = ref('')
  const show = ref(false)

  watch(show, () => {
    if (show.value) {
      setTimeout(() => {
        show.value = false
        texto.value = ''
        notificacion.value = ''
      }, 3000)
    }
  })

  return {
    texto,
    notificacion,
    show
  }
})
