<script setup>
import { useDemoGameStore } from '../stores/demoGame';

const demoGameStore = useDemoGameStore();
</script>
<template>
        <span>{{ demoGameStore.segundosRestantes }}s</span>
</template>


<style scoped>

</style>