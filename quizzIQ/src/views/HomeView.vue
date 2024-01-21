<script setup>
import Notificacion from '@/components/Notificacion.vue';
import Footer from '@/components/Footer.vue';
import { useAccessStore } from '@/stores/access';

const accessStore = useAccessStore();

</script>

<template>
    <!-- Sección de encabezado para usuarios no autenticados -->
    <header>
        <div class="contenedor header__container">
            <RouterLink :to="{ name: 'home' }">
                <img class="logo" src="/public/logo.jpg" alt="logo QuizIQ">
            </RouterLink>
        </div>
    </header>
    <!-- Componente de notificación siempre visible -->
    <Notificacion />

    <!-- Contenido principal de la página -->
    <main>
        <div v-if="accessStore.isAuth" class="button__container contenedor">
            <RouterLink :to="{ name: 'ruleta-demo' }" class="btn--secondary btn">Jugar</RouterLink>
            <RouterLink :to="{ name: 'perfil' }" class="btn--secondary btn">Perfil</RouterLink>
            <RouterLink :to="{ name: 'ajustes' }" class="btn--secondary btn">Ajustes</RouterLink>
            <button v-if="accessStore.isAuth" @click="accessStore.logout()" class=" btn--primary btn">Cerrar
                Sesion</button>
        </div>
        <div v-else class="button__container contenedor">
            <RouterLink :to="{ name: 'ruleta-demo' }" class="btn--primary btn">Demo</RouterLink>
            <RouterLink class="btn--secondary btn" :to="{ name: 'access' }">Iniciar sesión</RouterLink>
        </div>

    </main>

    <!-- Componente de pie de página -->
    <Footer />
</template>

<style scoped>
/** Estilo IndexView header */
.header__container {
    display: flex;
    justify-content: center;
}

.logo {
    max-width: 10rem;
    width: 100%;
    border-radius: 50%;
}


main {
    background-image: url('../../public/fondo-home.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.button__container {
    text-align: center;
    position: absolute;
    min-width: 20%;
    max-width: 60rem;
    top: 45vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.btn {
    width: 90%;

}

.btn:hover {
    width: 100%;
    font-size: 2rem;
}
</style>
