<script setup>
// Importaciones de Vue y otros módulos
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useRuletaStore } from '@/stores/ruleta';
import { useContadorStore } from '@/stores/contador';
import CoronaPopup from '@/components/CoronaPopup.vue';
import Popup from '@/components/Popup.vue';
import Contador from '@/components/Contador.vue';

// Inicialización de Vue Router y stores
const ruletaStore = useRuletaStore();
const router = useRouter();
const contadorStore = useContadorStore();
// Variables reactivas
const respuestaUsuario = ref(null);
const opcionesHabilitadas = ref(true);

// Variables para manejo de errores
const error = ref();
const errorMsg = ref('');

// Lógica que se ejecuta después de que el componente se monta
onMounted(() => {
    // Inicialización de valores iniciales
    ruletaStore.mostrarPopupFinVidas = false;
    contadorStore.resetearContador();
    contadorStore.iniciarContador();
});

watchEffect(() => {
    if (contadorStore.segundosRestantes === 0) {
        // Si el tiempo se ha agotado
        error.value = true;
        errorMsg.value = 'Se terminó el tiempo!';
        opcionesHabilitadas.value = false;
        ruletaStore.vidas--;
        ruletaStore.coronaContador = 0;

    } else {
        // Si el tiempo no se ha agotado
        error.value = false;
        errorMsg.value = '';
    }
});

function validarRespuesta(opcion) {
    // Asignación de la respuesta del usuario y deshabilitación de opciones
    respuestaUsuario.value = opcion;
    opcionesHabilitadas.value = false;
    contadorStore.detenerContador();

    if (respuestaUsuario.value === ruletaStore.getPreguntaAleatoria.respuestaCorrecta) {
        // Si la respuesta es correcta
        error.value = false;
        errorMsg.value = '¡Respuesta correcta!';

        if (ruletaStore.coronaStatus) {
            console.log(respuestaUsuario.value);
        }
        // Cálculo de puntos basado en el tiempo restante y actualización del store
        const tiempoRestante = contadorStore.segundosRestantes;
        ruletaStore.puntos = ruletaStore.puntos + tiempoRestante * 10;
        ruletaStore.coronaContador++;
        ruletaStore.progressBar += 33.33


    } else {
        // Si la respuesta es incorrecta
        error.value = true;
        errorMsg.value = '¡Respuesta incorrecta!';

        // Reducción del número de vidas en el store
        ruletaStore.vidas--;
        ruletaStore.coronaContador = 0;
        ruletaStore.progressBar = 0


    }

    // Reinicio de la ruleta y el contador después de 3 segundos
    setTimeout(() => {
        if (ruletaStore.mostrarPopupFinVidas || ruletaStore.coronaContador === 3) {
            return
        }
        router.push({ name: 'ruleta-demo' })
    }, 3000);
}
</script>
<template>
    <header class="header">
        <div class="contenedor header__container">
            <div class="categoria">
                <p> {{ ruletaStore.getPreguntaAleatoria.categoria }} </p>
            </div>
            <div class="contador">
                <Contador />
            </div>
        </div>
    </header>
    <Popup v-if="ruletaStore.mostrarPopupFinVidas" />
    <CoronaPopup v-if="ruletaStore.showCoronaPopup" />

    <main>
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
    </main>
</template>
<style>
.header {
    font-family: var(--encabezado);
    background-color: var(--blanco);
    /* Fondo blanco para el header */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra suave */

}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 3rem;
    color: var(--color3);

}

.categoria {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
}

.contador {
    font-size: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--encabezado);

}

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