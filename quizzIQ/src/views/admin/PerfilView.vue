<script setup>
import { useRouter } from 'vue-router';
import Ranking from '@/components/Ranking.vue';
import { useAccessStore } from '@/stores/access';

import { useAuth } from '@/services/authFirebase'

const { resetPassword } = useAuth()

const accessStore = useAccessStore();

const router = useRouter();

const volver = () => {
    router.push({ name: 'home' })
}
const cambiarPsw = () => {
    if (confirm('¿Deseas cambiar la contraseña?')) {
        resetPassword(accessStore.isAuth.email).then(() => {
            // Correo electrónico enviado exitosamente
            alert('Revise su correo electrónico para cambiar la contraseña')
            accessStore.logout()
        }).catch((error) => {
            console.log(error)
        });
    }

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
            </div>
            <div class="puntos__container">
                <Ranking />
            </div>

            <h3 class="user-info__button" @click="cambiarPsw">Cambiar Contraseña</h3>
        </div>

    </main>
</template>
<style scoped>
header {
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

.user-info__button {
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: max-content;
    color: var(--color1);
    text-shadow: 3px 5px 2px rgba(255, 255, 255, 0.6);
    font-weight: bold;
    
}

.user-info__button:hover {
    cursor: pointer;
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
