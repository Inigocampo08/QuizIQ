<script setup>
import { useContadorStore } from '@/stores/contador';

const contadorStore = useContadorStore();
</script>
<template>
        <span>{{ contadorStore.segundosRestantes }}s</span>
</template>


<style scoped>

</style>