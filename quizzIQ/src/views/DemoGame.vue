<script setup>
// Importaciones de Vue y otros módulos
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRuletaStore } from '@/stores/ruleta';
import { useContadorStore } from '@/stores/contador';
import Contador from '@/components/Contador.vue';
import Preguntas from '@/components/Preguntas.vue';
import Ruleta from '@/components/Ruleta.vue';
import CoronaPopup from '@/components/CoronaPopup.vue';
import Popup from '@/components/Popup.vue';

// Inicialización de Vue Router y stores
const router = useRouter();
const ruletaStore = useRuletaStore();
const contadorStore = useContadorStore();

// Lógica que se ejecuta después de que el componente se monta
onMounted(() => {
    // Inicialización de valores iniciales
    ruletaStore.vidas = 1;
    ruletaStore.puntos = 0;
    ruletaStore.activeRoulette = true;
    ruletaStore.mostrarPopupFinVidas = false;
    ruletaStore.coronaContador = 0;
    ruletaStore.progressBar = 0;
    contadorStore.resetearContador();
});

// Función para volver atrás
const volver = () => {
    if (confirm("¿Seguro que quieres volver?")) {
        router.push({ name: 'home' });
    }
};
</script>
 
<template>
    <header class="header">
        <div class="contenedor header__container">
            <div class="salir">
                <button @click="volver" class=" button">
                    <span class="X"></span>
                    <span class="Y"></span>
                </button>
            </div>
            <div class="user__info">
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
                    <p>{{ ruletaStore.vidas }}</p>
                </div>
                <div class="contador">
                    <Contador />
                </div>
            </div>
        </div>
    </header>

    <main>
        <CoronaPopup v-if="ruletaStore.showCoronaPopup" />
        <Popup v-if="ruletaStore.mostrarPopupFinVidas" />
        <div v-if="ruletaStore.activeRoulette" class="ruleta">
            <Ruleta />
        </div>
        <Preguntas v-else />
    </main>
</template>
<style scoped>
.header {
    font-family: var(--encabezado);
    background-color: var(--blanco);
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

.button {
    position: relative;
    width: 6rem;
    height: 4em;
    border: none;
    background: transparent;
    border-radius: 5px;
    transition: all 800ms ease;


}

.X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: var(--color3);
    transform: translateX(-50%) rotate(45deg);
}

.Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: var(--color3);
    transform: translateX(-50%) rotate(-45deg);
}

.button:hover {
    background-color: var(--color3);
    cursor: pointer;
}

.button:hover .X,
.button:hover .Y {
    background-color: var(--blanco);

}

.button:active {
    background-color: rgb(130, 0, 0);
}


.user__info {

    text-align: center;
    position: relative;
    /* Para posicionar el botón de salida de manera absoluta */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    border-radius: 0.5rem;
    font-size: 2rem;
    color: var(--color3);

}

.vidas {
    position: relative;
    display: inline-block;
    text-align: center;
}

.vidas .icon {
    font-size: 6rem;
}

.vidas p {
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);

}

.contador {
    width: 12rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    font-family: var(--parrafo);

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
    background-color: var(--color3);
}

.flip-card-back {
    background-color: var(--color3);
    transform: rotateY(180deg);
    /* Inicialmente oculto, girado 180 grados */
    font-size: 2rem;

}


</style>