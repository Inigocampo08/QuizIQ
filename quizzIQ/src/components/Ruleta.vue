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
        <Roulette class="ruleta" ref="wheel" size="450" display-shadow indicator-position="top" display-indicator display-border
            :items="ruletaStore.items" @click="launchWheel" @wheel-end="ruletaStore.wheelEndedCallback" />
    </div>
</template>
<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    /* Centra el contenido horizontalmente */
    align-items: center;
    padding: 10rem;
    /* Centra el contenido verticalmente */
}

.ruleta {
    text-align: center;
    margin-left: auto;
    /* Establece el margen izquierdo a auto */
    margin-right: auto;
    /* Establece el margen derecho a auto */
}</style>