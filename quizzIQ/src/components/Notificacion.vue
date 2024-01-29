<script setup>
import { useNotificacionStore } from '@/stores/notificacion';
const notificacionStore = useNotificacionStore();
</script>

<template>
    <Transition name="fade">
        <div class="notificacion__container" v-if="notificacionStore.show">
            <p><strong>{{ notificacionStore.notificacion }}</strong></p>
            <p>{{ notificacionStore.texto }}</p>

        </div>
    </Transition>
</template>

<style scoped>
.notificacion__container {
    background-color: var(--color4);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    text-align: center;
    border-radius: 0.5rem;
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    width: 25rem;
    height: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease;
}

.fade-enter,
.fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
}
</style>
