<script setup>
import { useRuletaStore } from '@/stores/ruleta'; // Asegúrate de importar el store correctamente
import { usePartidaStore } from '@/stores/partida';
const ruletaStore = useRuletaStore();
const partidaStore = usePartidaStore();
</script>
 
<template>
    <div v-if="partidaStore.partidaData.showCoronaPopup" class="popup">
        <div class="popup--inner">
            <h2 class="popup--inner__title">Te ha tocado la Corona</h2>
            <span class="popup--inner__subtitle">Elige la categoría de tu pregunta</span>
            <div class="categorias--container">
                <div v-if="!partidaStore.partidaData.selectedCorona.deportes" class="respuestas deporte"
                    @click="ruletaStore.selectCategory('deportes')">
                    <p>deporte</p>
                </div>
                <div v-if="!partidaStore.partidaData.selectedCorona.entretenimiento"
                    class="respuestas entretenimiento" @click="ruletaStore.selectCategory('entretenimiento')">
                    <p>entretenimiento</p>
                </div>

                <div v-if="!partidaStore.partidaData.selectedCorona.ciencia" class="respuestas ciencia"
                    @click="ruletaStore.selectCategory('ciencia')">
                    <p>ciencia</p>
                </div>

                <div v-if="!partidaStore.partidaData.selectedCorona.arte" class="respuestas arte"
                    @click="ruletaStore.selectCategory('arte')">
                    <p>arte</p>
                </div>

                <div v-if="!partidaStore.partidaData.selectedCorona.historia" class="respuestas historia"
                    @click="ruletaStore.selectCategory('historia')">
                    <p>Historia</p>
                </div>

                <div v-if="!partidaStore.partidaData.selectedCorona.geografia" class="respuestas geografia"
                    @click="ruletaStore.selectCategory('geografia')">
                    <p>Geografía</p>
                </div>

            </div>

        </div>
    </div>
</template>
<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    overflow: hidden;
    /* Evita el desplazamiento */
}

.popup--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 80%;

    border-radius: 2rem;
    overflow-y: auto;
    /* Añade desplazamiento interno si el contenido es demasiado largo */
    display: flex;
    flex-direction: column;
    align-items: center;

}

.popup--inner__title {
    text-align: center;
    font-size: 6rem;
    font-weight: 900;
    margin-top: 4rem;
}
@media (max-width: 768px) {
    .popup--inner__title {
        font-size: 3.5rem;
    }
    
}

.popup--inner__subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--blanco);
}



.categorias--container {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template: 1fr / 50% 50%;
    place-content: center;
    gap: 2rem;
}
@media (max-width: 768px) {

    .categorias--container {
        grid-template: 1fr / 1fr;
        place-items: center;
    }
}

.respuestas {
    max-width: 90%;
    width: 30rem;
    background-color: var(--color4);
    color: var(--blanco);
    text-shadow: 0 0 1rem rgba(0, 0, 0, 1);
    font-size: 2rem;
    border-radius: 2rem;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
     text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.6);
    text-align: center;
    text-transform: uppercase;



}

.respuestas:hover {
    cursor: pointer;
    background-color: var(--color3);
    color: var(--blanco);
    transform: scale(1.05);
    transition: all .3s;
}

.respuestas:active {
    background-color: var(--color2-active);
    transition: all .1s;
}

.deporte {
    background-color: orange;
}

.entretenimiento {
    background-color: hotpink;
}

.ciencia {
    background-color: greenyellow;
}

.arte {
    background-color: red;
}

.historia {
    background-color: yellow;
}

.geografia {
    background-color: lightskyblue;
}</style>