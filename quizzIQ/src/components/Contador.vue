<script setup>
import { useContadorStore } from '@/stores/contador';

const contadorStore = useContadorStore();
</script>
<template>
        <span>{{ contadorStore.segundosRestantes }}'</span>
</template>


<style scoped></style>