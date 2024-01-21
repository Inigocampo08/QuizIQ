<script setup>
import { useRouter } from 'vue-router';
import { useAccessStore } from '@/stores/access';
import Ranking from '@/components/Ranking.vue';

const accessStore = useAccessStore();
const router = useRouter();

const volver = () => {
    router.push({ name: 'home' })
}
</script>
 
<template>
    <header>
        <div class="contenedor header__container">
            <button class="btn--primary" @click="volver">Volver</button>
            <h1 class="header__title">Perfil</h1>
        </div>
    </header>
    <main>
        <div class="contenedor">
            <div class="user-info__container">
                <h3 class="user-info__title">{{ accessStore.isAuth.username }}</h3>
                <RouterLink :to="{ name: 'ajustes' }">
                    <h3 class="user-info__button">Editar Perfil -> </h3>
                </RouterLink>
            </div>
            <div class="puntos__container">
                <p>Puntos: {{ accessStore.isAuth.puntos }}</p>
                <Ranking />
            </div>
        </div>

    </main>
</template>
<style scoped>
header {
    position: relative;
    border-bottom: 1px solid var(--color1);
    background-color: var(--color1-active);
    padding: 1rem;
    /* Añadido espacio interno para mejor apariencia */
}

.header__container {
    display: flex;
    align-items: center;
    gap: 5rem;
}

.header__title {
    text-shadow: 3px 5px 2px rgba(255, 255, 255, 0.6);
    margin: 0;
    /* Añadido para evitar el espacio adicional en h1 */
}

.user-info__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    /* Añadido espacio superior */
}

.user-info__title {
    margin: 0;
    /* Añadido para evitar el espacio adicional en h3 */
}

.user-info__button:hover {
    transition: .3s;
    color: var(--color1-hover);
}

.puntos__container {
    margin-top: 2rem;
    /* Añadido espacio superior */
}

table {
    margin: 0 auto;
    max-width: 100rem;
    width: 100%;
    /* Modificado para ocupar todo el ancho disponible */
    border-collapse: collapse;
    margin-top: 2rem;
    /* Añadido espacio superior */
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    font-family: var(--encabezado);

}

th,
td {
    border: 1px solid;
    padding: 1.5rem;
    text-align: center;
}

th {
    background-color: var(--color1-active);
    color: var(--blanco);
}

tr:nth-child(even) {
    background-color: var(--color1);
}

tr:hover {
    background-color: var(--color1-hover);
}

td:first-child {
    font-size: 1.2em;
    font-weight: bold;
}
</style>
