<script setup>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import { useAccessStore } from '@/stores/access';

const access = useAccessStore();
</script>
 
<template>
    <header>
        <div class="contenedor header">
            <RouterLink :to="{ name: 'home' }">
                <button class="btn--primary"> Volver</button>

            </RouterLink>
        </div>
    </header>
    <main>
        <div class="contenedor">
            <Transition name="fade" mode="out-in">
                <Login v-if="access.haveAccount" />
                <Register v-else />
            </Transition>
        </div>
    </main>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}
</style>