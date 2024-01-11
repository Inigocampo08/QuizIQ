<script setup>
import { ref } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';
import CoronaPopup from '@/components/CoronaPopup.vue';
import { Roulette } from 'vue3-roulette';
import { useRuletaStore } from '@/stores/ruleta';
import { RouterLink } from 'vue-router';

const ruletaStore = useRuletaStore();
const wheel = ref(null);
const launchWheel = () => {
    wheel.value.launchWheel()
}
</script>
 
<template>
    <header class="header">
        <div class="contenedor header__container">
            <div class="volver">
                <RouterLink :to="{ name: 'home' }">volver</RouterLink>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <!-- Contenido de la cara frontal -->
                        <span>Puntos</span>
                    </div>
                    <div class="flip-card-back">
                        <!-- Contenido de la cara trasera -->
                        <span><font-awesome-icon icon="award" /> {{ ruletaStore.puntos }}</span>
                    </div>
                </div>
            </div>
            <div class="vidas">
                <font-awesome-icon icon="heart" class="icon" />
                <p>{{ ruletaStore.vidas }} </p>
            </div>


        </div>

    </header>
    <CoronaPopup v-if="ruletaStore.showCoronaPopup"></CoronaPopup>
    <main class="center-container">
        <h2>Toca para ¡Girar!</h2>
        <Roulette base-display base-size="100" base-display-shadow base-display-indicator base-background="white"
            class="ruleta" ref="wheel" size="350" display-shadow indicator-position="top" display-indicator display-border
            :items="ruletaStore.items" @click="launchWheel" @wheel-end="ruletaStore.wheelEndedCallback" />
        <ProgressBar />
    </main>
</template>
<style scoped>
.header {
    font-family: var(--encabezado);
    background-color: var(--color3);
    /* Fondo blanco para el header */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    position: relative;

}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.volver {
    text-transform: uppercase;
    font-size: 3rem;
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
    font-size: 2rem;
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
    font-size: 2.5rem;

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
    justify-content: center;
    /* Centra el contenido horizontalmente */
    align-items: center;
    /* Centra el contenido verticalmente */
    text-align: center;
    position: relative;
    height: 90vh;
    background-image: url('../../public/fondo-ruleta.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.ruleta {
    margin-left: auto;
    /* Establece el margen izquierdo a auto */
    margin-right: auto;
    /* Establece el margen derecho a auto */
    margin-bottom: 10rem;
}
</style>