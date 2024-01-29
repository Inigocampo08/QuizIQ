<!-- ProgressBar.vue -->
<script setup>
import { usePartidaStore } from '@/stores/partida'

const partidaStore = usePartidaStore()


</script>

<template>
    <div class="progress-bar">
        <img class="categoria__ruleta--icon" src="/corona.png" alt="Corona" />
        <div class="progress-bar-container">
            <div class="progress" :style="{ width: `${partidaStore.partidaData.progressBar}%` }"></div>
            <div class="divider" style="left: 33.3333%;"></div>
            <div class="divider" style="left: 66.6666%;"></div>
        </div>
    </div>
</template>


<style scoped>
.progress-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.categoria__ruleta--icon {
    width: 5rem;
}

.progress-bar-container {
    position: relative;
    width: 20rem;
    height: 3rem;
    background-color: lightgray;
    border-radius: 2rem;
    border: 5px solid var(--negro);
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);


}

.progress {
    height: 100%;
    background-color: #FFD700;
    transition: width 1s ease;
}

.divider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--negro);
    pointer-events: none;
}
</style>
