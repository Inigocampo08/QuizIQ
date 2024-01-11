<!-- ProgressBar.vue -->
<script setup>
import { ref } from 'vue';
import { useRuletaStore } from '@/stores/ruleta'

const ruletaStore = useRuletaStore()


</script>

<template>
    <div class="progress-bar-container">
        <div class="progress" :style="{ width: `${ruletaStore.progressBar}%` }"></div>
    </div>
</template>


<style scoped>
.progress-bar-container {
    width: 20rem;
    height: 2rem;
    background-color: #eee;
    border-radius: 2rem;
    border: 2px solid var(--negro);
    overflow: hidden;
    
}

.progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 1s ease;
}
</style>
