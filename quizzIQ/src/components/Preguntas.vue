<script setup>
// Importación de módulos y stores necesarios
import { ref, watchEffect } from 'vue';
import { useRuletaStore } from '@/stores/ruleta';
import { useContadorStore } from '@/stores/contador'

// Inicialización de stores
const contadorStore = useContadorStore()
const ruletaStore = useRuletaStore();

// Variables reactivas
const respuestaUsuario = ref(null);
const opcionesHabilitadas = ref(true);

// Variables para manejo de errores
const error = ref();
const errorMsg = ref('');

// Watcher efectivo para observar cambios en segundosRestantes del contador
watchEffect(() => {
    if (contadorStore.segundosRestantes === 0) {
        // Si el tiempo se ha agotado
        error.value = true;
        errorMsg.value = 'Se terminó el tiempo!';
        opcionesHabilitadas.value = false;
        ruletaStore.vidas--;
        setTimeout(() => {
            ruletaStore.isActiveRoulette();
            contadorStore.resetearContador();
        }, 3000);
    } else {
        // Si el tiempo no se ha agotado
        error.value = false;
        errorMsg.value = '';
    }
});

// Función para validar la respuesta seleccionada por el usuario
function validarRespuesta(opcion) {
    // Asignación de la respuesta del usuario y deshabilitación de opciones
    respuestaUsuario.value = opcion;
    opcionesHabilitadas.value = false;
    contadorStore.detenerContador();

    if (respuestaUsuario.value === ruletaStore.getPreguntaAleatoria.respuestaCorrecta) {
        // Si la respuesta es correcta
        error.value = false;
        errorMsg.value = '¡Respuesta correcta!';

        // Cálculo de puntos basado en el tiempo restante y actualización del store
        const tiempoRestante = contadorStore.segundosRestantes;
        ruletaStore.puntos = ruletaStore.puntos + tiempoRestante * 10;


        // Aquí puedes añadir más lógica como mostrar un mensaje, sumar puntos, etc.
    } else {
        // Si la respuesta es incorrecta
        error.value = true;
        errorMsg.value = '¡Respuesta incorrecta!';

        // Reducción del número de vidas en el store
        ruletaStore.vidas--;

    }

    // Reinicio de la ruleta y el contador después de 3 segundos
    setTimeout(() => {
        ruletaStore.isActiveRoulette();
        contadorStore.resetearContador();
    }, 3000);
}
</script>

 
<template>
    <div class="contenedor">
        <div class="preguntas">
            <p>{{ ruletaStore.getPreguntaAleatoria.pregunta }}</p>
            <span v-if="error === true" class="incorrecto">{{ errorMsg }}</span>
            <span v-else-if="error === false" class="correcto">{{ errorMsg }}</span>
            <span v-else>{{ errorMsg }}</span>
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
    grid-template: 1fr / 50% 50%;
    justify-items: center;
    gap: 2rem;
    text-align: center;

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

.respuestas:active {
    background-color: var(--color3-active);
    transition: all .1s;
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