<script setup>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { useAccessStore } from '../stores/access';

const access = useAccessStore();
</script>
 
<template>
    <header>
        <div class="contenedor header">
            <RouterLink class="btn--primary" :to="{ name: 'home' }"> Volver

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
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-out;
}
</style>