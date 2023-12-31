<script setup>
import { ref } from 'vue';
import { Roulette } from "vue3-roulette";
import { useDemoGameStore } from '@/stores/demoGame';

const demoGameStore = useDemoGameStore();
const wheel = ref(null);
const launchWheel = () => {
    wheel.value.launchWheel()
}
</script>
 
<template>
    <Roulette class="ruleta" ref="wheel" size="500" :items="demoGameStore.items"
        @click="launchWheel" @wheel-end="demoGameStore.wheelEndedCallback" />
</template>
<style scoped>
.ruleta {
    display: block;
    margin: 10rem;
}
</style>