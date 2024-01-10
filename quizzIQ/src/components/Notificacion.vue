<script setup>
import { useNotificacionStore } from '@/stores/notificacion';
const notificacionStore = useNotificacionStore();
</script>
 
<template>
    <transition name="fade">
        <div v-if="notificacionStore.show">
            <div>
                <p><strong>
                        {{ notificacionStore.notificacion }}
                    </strong>
                    {{ notificacionStore.texto }}
                </p>
                <span class="closebtn">&times;</span>
            </div>
        </div>
    </transition>
</template>
<style scoped>
div {
    /* Estilo base de la notificación */
    background-color: #f2f2f2;
    /* Color grisáceo */
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 4px;

    /* Transición */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    opacity: 1;
    /* Valor por defecto */
    transform: translateY(0);
    /* Valor por defecto */
}

.fade-enter-active,
.fade-leave-active {
    /* Transición para ambas entradas y salidas */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active para Vue < 2.1.8 */
    {
    /* Estilos al inicio y al final de la transición */
    opacity: 0;
    transform: translateY(-10px);
}</style>