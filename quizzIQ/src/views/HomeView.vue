<script setup>
import AdminHeader from '@/components/admin/Header.vue';
import Notificacion from '@/components/Notificacion.vue';
import Footer from '@/components/Footer.vue'

import { useAccessStore } from '@/stores/access';
const accessStore = useAccessStore();


</script>
 
<template>
    <AdminHeader v-if="accessStore.isAuth" />
    <header v-else>
        <div class="contenedor header__container">
            <img class="logo" src="/public/logo.jpg" alt="logo QuizIQ">
            <nav>
                <RouterLink :to="{ name: 'access' }"> <button class=" btn--secondary">Iniciar sesion</button></RouterLink>
            </nav>
        </div>
    </header>

    <Notificacion />
    <main>
        <div class="contenedor">
            <RouterLink :to="{ name: 'ruleta-demo' }" class="btn--primary btn__play">Juega a nuestra demo</RouterLink>

        </div>
    </main>
    <Footer />
</template>
<style scoped>
/** Estilo IndexView header */
.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;


}

.logo {
    max-width: 10rem;
    width: 100%;
    border-radius: 50%;
}

.btn__play {
    position: absolute;
    top: 40vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    animation: infinite animation 1.2s;
}

.btn__play:hover {
    padding: 5rem;

}

@keyframes animation {
    0% {
        transform: translate(-50%, -50%) scale(.5);
    }

    50% {
        transform: translate(-50%, -50%) scale(2);
    }

    100% {
        transform: translate(-50%, -50%) scale(.5);

    }
}
</style>