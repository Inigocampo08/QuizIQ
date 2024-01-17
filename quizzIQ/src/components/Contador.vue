<script setup>
import { usePartidaStore } from '@/stores/partida';

const partidaStore = usePartidaStore();
</script>
<template>
        <span>{{ partidaStore.partidaData.segundosRestantes }}'</span>
</template>


<style scoped></style>