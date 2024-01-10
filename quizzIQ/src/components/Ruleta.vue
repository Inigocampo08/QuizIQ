<script setup>
import { ref } from 'vue';
import { Roulette } from "vue3-roulette";
import { useRuletaStore } from '@/stores/ruleta';

const ruletaStore = useRuletaStore();
const wheel = ref(null);
const launchWheel = () => {
    wheel.value.launchWheel()
}
</script>
 
<template>
    <div class="center-container">
        <h1>¡Toca para jugar! </h1>
        <Roulette base-display base-size="100" base-display-shadow base-display-indicator base-background="white"
            class="ruleta" ref="wheel" size="450" display-shadow indicator-position="top" display-indicator display-border
            :items="ruletaStore.items" @click="launchWheel" @wheel-end="ruletaStore.wheelEndedCallback" />
    </div>
</template>
<style scoped>
.center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centra el contenido horizontalmente */
    align-items: center;
    /* Centra el contenido verticalmente */
    text-align: center;

}

.ruleta {
    margin-left: auto;
    /* Establece el margen izquierdo a auto */
    margin-right: auto;
    /* Establece el margen derecho a auto */
    margin-bottom: 10rem;
}

</style>