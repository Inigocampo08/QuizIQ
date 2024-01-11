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
        <span>Girar</span>
        <Roulette base-display base-size="100" base-display-shadow base-display-indicator base-background="white"
            class="ruleta" ref="wheel" size="350"  display-shadow indicator-position="top" display-indicator display-border
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
    position: relative;
    padding-top:10rem;

}
span {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1;
    font-family: var(--encabezado);
    font-size: 2rem;
    color: var(--negro);
    
    
}
.ruleta {
    margin-left: auto;
    /* Establece el margen izquierdo a auto */
    margin-right: auto;
    /* Establece el margen derecho a auto */
    margin-bottom: 10rem;
}

</style>