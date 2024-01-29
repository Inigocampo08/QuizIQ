<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from '@/components/ProgressBar.vue';
import { Roulette } from 'vue3-roulette';
import { useContadorStore } from '@/stores/contador';
import { useRuletaStore } from '@/stores/ruleta';
import { usePreguntasStore } from '@/stores/preguntas';
import { usePartidaStore } from '@/stores/partida'

const router = useRouter();

const ruletaStore = useRuletaStore();
const preguntasStore = usePreguntasStore();
const partidaStore = usePartidaStore()
const contadorStore = useContadorStore();
const wheel = ref(null);

onMounted(() => {
    preguntasStore.opcionesHabilitadas = true
    preguntasStore.respuestaUsuario = null
    preguntasStore.error = null
    preguntasStore.errorMsg = null
    contadorStore.resetearContador()


})

const launchWheel = () => {
    wheel.value.launchWheel()
}
const volver = () => {
    if (confirm('¿Deseas terminar la partida?')) {
        router.push({ name: 'home' })
        ruletaStore.resetearValoresPartida()

    }
}
</script>
 
<template>
    <header class="header-in-game">
        <div class="contenedor header__container">
            <div class="volver">
                <a @click="volver">volver</a>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <!-- Contenido de la cara frontal -->
                        <span>Puntos</span>
                    </div>
                    <div class="flip-card-back">
                        <!-- Contenido de la cara trasera -->
                        <span><font-awesome-icon icon="award" /> {{ partidaStore.partidaData.puntos }}</span>
                    </div>
                </div>
            </div>
            <div class="vidas">
                <font-awesome-icon icon="heart" class="icon" />
                <p>{{ partidaStore.partidaData.vidas }} </p>
            </div>


        </div>

    </header>

    <main class="center-container">
        <div class="coronas__container">
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.arte === true ? { 'stroke': '#e74c3c' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
                    <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
                    <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
                    <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
                </svg>
            </div>
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.deportes === true ? { 'stroke': '#e67e22' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 9l-6 6" />
                    <path d="M10 12l2 2" />
                    <path d="M12 10l2 2" />
                    <path d="M8 21a5 5 0 0 0 -5 -5" />
                    <path d="M16 3c-7.18 0 -13 5.82 -13 13a5 5 0 0 0 5 5c7.18 0 13 -5.82 13 -13a5 5 0 0 0 -5 -5" />
                    <path d="M16 3a5 5 0 0 0 5 5" />
                </svg>
            </div>
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.entretenimiento === true ? { 'stroke': '#ff69b4' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 3h-2l-3 9" />
                    <path d="M16 3h2l3 9" />
                    <path
                        d="M3 12v7a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707 -.293l2 -2a1 1 0 0 1 1.414 0l2 2a1 1 0 0 0 .707 .293h4.586a1 1 0 0 0 1 -1v-7h-18z" />
                    <path d="M7 16h1" />
                    <path d="M16 16h1" />
                </svg>
            </div>
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.historia === true ? { 'stroke': '#f1c40f' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 18l2 -13l2 -2l2 2l2 13" />
                    <path d="M5 21v-3h14v3" />
                    <path d="M3 21l18 0" />
                </svg>
            </div>
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.ciencia === true ? { 'stroke': '#2ecc71' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 21h14" />
                    <path d="M6 18h2" />
                    <path d="M7 18v3" />
                    <path d="M9 11l3 3l6 -6l-3 -3z" />
                    <path d="M10.5 12.5l-1.5 1.5" />
                    <path d="M17 3l3 3" />
                    <path d="M12 21a6 6 0 0 0 3.715 -10.712" />
                </svg>
            </div>
            <div class="corona__img">
                <svg :style="partidaStore.partidaData.selectedCorona.geografia === true ? { 'stroke': '#3498db' } : { 'stroke': 'lightgray' }"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightgray" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M3.6 9h16.8" />
                    <path d="M3.6 15h16.8" />
                    <path d="M11.5 3a17 17 0 0 0 0 18" />
                    <path d="M12.5 3a17 17 0 0 1 0 18" />
                </svg>
            </div>
        </div>
        <Roulette base-display base-size="100" base-display-shadow base-display-indicator base-background="white"
            class="ruleta" ref="wheel" size="350" display-shadow indicator-position="top" display-indicator display-border
            :items="ruletaStore.items" @click="launchWheel" @wheel-end="ruletaStore.wheelEndedCallback" />
        <ProgressBar />
    </main>
</template>
<style scoped>
.header-in-game {
  
    background-color: var(--color3);

}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.volver {
    text-transform: uppercase;
    /* font-size: 3rem;*/
}

.volver a {
    color: var(--color3-hover);
}

.volver a:hover {
    color: var(--color3-active);
}



.user__info {
    position: relative;
    /* Para posicionar el botón de salida de manera absoluta */


}

.vidas {
    position: relative;
    display: inline-block;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    border-radius: 0.5rem;
    /*font-size: 2rem;*/ 
    color: var(--color3);
}

.vidas .icon {
    color: var(--color3-active);
    font-size: 6rem;
}

.vidas p {
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
 /*   font-size: 2.5rem;*/

}

.flip-card {
    height: 4rem;
    width: 15rem;
    perspective: 1000px;
    /* Profundidad de la perspectiva */
}

.flip-card-inner {

    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    /* Duración de la animación */
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
    /* Giro de 180 grados en el eje Y */
}

.flip-card-front,
.flip-card-back {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--blanco);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    /* Oculta la cara trasera durante la animación */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra suave */

}

.flip-card-front {
    background-color: var(--color3-active);
}

.flip-card-back {
    background-color: var(--color3-hover);
    transform: rotateY(180deg);
    /* Inicialmente oculto, girado 180 grados */
    font-size: 2rem;

}





/*RULETA*/
.center-container {
    display: flex;
    flex-direction: column;
    /* Centra el contenido horizontalmente */
    align-items: center;
    /* Centra el contenido verticalmente */
    text-align: center;
    position: relative;
    height: 100%;
    background-image: url('../../public/fondo-ruleta.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.coronas__container {
    margin-top: 1rem;
    max-width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    background-color: gray;
    padding: 3rem 2rem;
    border-radius: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.corona__img svg {
    max-height: 3rem;
    width: 100%;
    height: 100%;
}

.ruleta {
    margin-left: auto;
    /* Establece el margen izquierdo a auto */
    margin-right: auto;
    /* Establece el margen derecho a auto */
    margin-bottom: 4rem;
    margin-top: 3rem;
}
</style>