<script setup>
import { useAccessStore } from '@/stores/access';

const AccessStore = useAccessStore();
</script>
 
<template>
    <header>
        <div class="contenedor header__container">
            <RouterLink :to="{ name: 'home' }">
                <img class="logo" src="/public/logo.jpg" alt="logo QuizIQ">
            </RouterLink>
            <nav>
                <RouterLink class="active" :to="{ name: 'home' }">Inicio</RouterLink>
                <RouterLink class="active" :to="{ name: 'home' }">Perfil</RouterLink>
                <RouterLink class="active" :to="{ name: 'home' }">Ajustes</RouterLink>
                <button @click="AccessStore.logout()" class=" btn--primary">Cerrar Sesion</button>
            </nav>
        </div>
    </header>
</template>
<style scoped>
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

nav {
    display: flex;
    gap: 4rem;
    align-items: center;
}

.active {
    text-transform: uppercase;
    color: var(--color2);
    transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);

}

.active:hover {
    color: var(--blanco);
    background-color: var(--color2-hover);
    padding: 2rem 3rem;
    border-radius: 2rem;

}
</style>
