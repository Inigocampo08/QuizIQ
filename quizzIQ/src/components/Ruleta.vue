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
    <Roulette class="ruleta" ref="wheel" size="500" :items="ruletaStore.items" @click="launchWheel"
        @wheel-end="ruletaStore.wheelEndedCallback" />
</template>
<style scoped>
.ruleta {
    display: block;
    margin: 10rem;
}
</style>