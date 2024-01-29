<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { usePreguntasStore } from '@/stores/preguntas';
import { useContadorStore } from '@/stores/contador'
import { usePartidaStore } from '@/stores/partida'
import Contador from '@/components/Contador.vue';


const preguntasStore = usePreguntasStore();
const contadorStore = useContadorStore()
const partidaStore = usePartidaStore();

const pregunta = ref('');
const opciones = ref([]);
const categoria = ref('');
const color = ref('');

onMounted(() => {
    pregunta.value = partidaStore.partidaData.pregunta;
    opciones.value = partidaStore.partidaData.opciones;
    categoria.value = partidaStore.partidaData.categoria;
    color.value = partidaStore.partidaData.color;
    contadorStore.iniciarContador()
    partidaStore.partidaData.mostrarPopupFinVidas = false

    partidaStore.partidaData.preguntaContestada = false;

})
</script>
<template>
    <header :style="{ 'background-color': color }" class="header-in-game">
        <div class="contenedor header__container">
            <div class="categoria">
                <h3> {{ categoria }} </h3>
            </div>
            <div class="contador">
                <Contador />
            </div>
        </div>
    </header>
    <main :style="{ backgroundImage: categoria ? 'url(\'/fondo-' + categoria + '.jpg\')' : 'none' }">
        <div class="contenedor">

            <div class="preguntas">
                <p>{{ pregunta }}</p>
                <span v-if="preguntasStore.error === true" class="incorrecto">{{ preguntasStore.errorMsg }}</span>
                <span v-else-if="preguntasStore.error === false" class="correcto">{{ preguntasStore.errorMsg }}</span>
                <span v-else>{{ preguntasStore.errorMsg }}</span>
            </div>
            <div class="respuestas__container">
                <ul class="respuestas__list">
                    <div :key="opcion" :class="{
                        'respuesta-incorrecta': preguntasStore.error && opcion === preguntasStore.respuestaUsuario,
                        'respuesta-correcta': !preguntasStore.error && opcion === preguntasStore.respuestaUsuario
                    }" :style="preguntasStore.opcionesHabilitadas ? {} : { 'pointer-events': 'none' }"
                        v-for=" opcion  in  opciones " class="respuestas" @click="preguntasStore.validarRespuesta(opcion)">
                        <li> {{ opcion }}</li>
                    </div>
                </ul>
            </div>

        </div>
    </main>
</template>
<style scoped>
.header-in-game {
    background-color: var(--blanco);
}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 3rem;
    color: white
}

.categoria {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}
.categoria h3{
    color: var(--blanco);
    
}
.contador {
    font-size: 7rem;
    display: flex;

    justify-content: center;
    align-items: center;
    font-family: var(--encabezado);

}

main {
    min-height: 90vh;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

}

.preguntas {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.5);
    border-radius: 2rem;
    background-color: var(--blanco);
    text-align: center;
    margin-top: 2rem;
}

.preguntas p {
    font-size: 4rem;
    font-weight: 900;

}

.preguntas span {
    padding: 0;
    margin-bottom: 1rem;

}

.respuestas__container {
    margin-top: 3rem;
    margin-bottom: 20rem;
}

.respuestas__list {
    padding: 0;
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    justify-items: center;
    gap: 2rem;
    text-align: center;
}

@media (max-width: 768px) {
    .respuestas__list {
        grid-template: 1fr / 1fr;
    }

}

.respuestas {
    width: 100%;
    max-width: 100%;
    padding: 3rem;
    background-color: var(--blanco);
    font-size: 3rem;
    border-radius: 5rem;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    text-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);
    
background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

}

.respuestas:hover {
    cursor: pointer;
    background-color: var(--color2);
    color: var(--blanco);
    transform: scale(1.05);
    transition: all .3s;
}

.respuesta-incorrecta, .respuesta-incorrecta:hover, .respuesta-incorrecta:active {
    background-color: red;

}

.respuesta-correcta, .respuesta-correcta:hover, .respuesta-correcta:active{
    background-color: chartreuse;

}

.respuesta-incorrecta,
.respuesta-correcta {
    transition: all .3s;
    pointer-events: none;
}


.respuestas span {
    font-weight: 900;
    font-size: 2.5rem;
    opacity: 0.6;
    font-family: var(--encabezado);

}

.correcto,
.incorrecto {
    padding: 2rem;
    border-radius: 2rem;
    font-weight: 900;
    font-size: 2.5rem;
    font-family: var(--encabezado);

}

.correcto {
    color: green;
}

.incorrecto {
    color: red;
}
</style>