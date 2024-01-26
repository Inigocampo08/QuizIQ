import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/config/firebase'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faAward } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faAward, faHeart)

//Componente de ruleta
import { Roulette } from 'vue3-roulette'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})

app.use(createPinia())
app.use(router)
app.component('roulette', Roulette)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
