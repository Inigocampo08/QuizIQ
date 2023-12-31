<script setup>
import { onMounted } from 'vue';
import { useDemoGameStore } from '../stores/demoGame';

const demoGameStore = useDemoGameStore();
// Iniciar el contador cuando el componente se monta
onMounted(() => {
    demoGameStore.iniciarContador();
});
</script>
<template>
        {{ demoGameStore.segundosRestantes }}s
</template>


<style scoped>

</style>