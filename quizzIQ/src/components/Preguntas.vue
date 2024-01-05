<script setup>
import { ref } from 'vue';
import { useRuletaStore } from '@/stores/ruleta';

const ruletaStore = useRuletaStore();
const respuestaUsuario = ref(null);
const opcionesHabilitadas = ref(true);

const error = ref();
const errorMsg = ref('');

function validarRespuesta(opcion) {
    respuestaUsuario.value = opcion;
    opcionesHabilitadas.value = false;
    if (respuestaUsuario.value === ruletaStore.getPreguntaAleatoria.respuestaCorrecta) {
        // La respuesta es correcta
        error.value = false;

        errorMsg.value = '¡Respuesta correcta!';
        // Aquí puedes añadir más lógica como mostrar un mensaje, sumar puntos, etc.
    } else {
        // La respuesta es incorrecta
        error.value = true;
        errorMsg.value = '¡Respuesta incorrecta!';
    }
}
</script>
 
<template>
    <div class="contenedor">
        <div class="preguntas">
            <p>{{ ruletaStore.getPreguntaAleatoria.pregunta }}</p>
        </div>
        <div class="respuestas__container">
            <ul class="respuestas__list">
                <div :class="{
                    'respuesta-incorrecta': error && opcion === respuestaUsuario,
                    'respuesta-correcta': !error && opcion === respuestaUsuario
                }" :style="opcionesHabilitadas ? {} : { 'pointer-events': 'none' }"
                    v-for="opcion in ruletaStore.getPreguntaAleatoria.opciones" class="respuestas"
                    @click="validarRespuesta(opcion)">
                    <li> {{ opcion }}</li>
                </div>
            </ul>
        </div>
        <span v-if="error != null">{{ errorMsg }}</span>
    </div>
</template>
<style scoped>
.preguntas {
    text-align: center;
    margin-top: 5rem;
}

.preguntas p {
    font-size: 6rem;
    font-weight: 900;

}

.respuestas__container {
    margin-top: 5rem;
    margin-bottom: 20rem;
}

.respuestas__list {
    display: grid;
    grid-template: 1fr / auto auto;
    justify-items: center;
    gap: 2rem;

}

.respuestas {
    width: 100%;
    padding: 5rem;
    background-color: var(--color4);
    font-size: 3rem;
    border-radius: 5rem;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    text-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15);


}

.respuestas:hover {
    cursor: pointer;
    background-color: var(--color2);
    color: var(--blanco);
    transform: scale(1.05);
    transition: all .3s;
}

.respuesta-incorrecta {
    background-color: red;

}

.respuesta-correcta {
    background-color: chartreuse;

}

.respuesta-incorrecta,
.respuesta-correcta {
    transition: all .3s;
    pointer-events: none;
}

.respuestas:active {
    background-color: var(--color3-active);
    transition: all .1s;
}

.respuestas span {
    font-weight: 900;
    font-size: 2.5rem;
    opacity: 0.6;
    font-family: var(--encabezado);

}
</style>