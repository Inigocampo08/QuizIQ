<script setup>
import { useRouter } from 'vue-router'
import Preguntas from '../components/Preguntas.vue'
const router = useRouter()

const volver = () => {
    if (confirm("¿Seguro que quieres volver?")) {
        router.push({ name: 'home' })
    }
}
</script>
 
<template>
    <header class="header">
        <div class="contenedor header--container">
            <div class="salir">
                <button @click="volver" class="button">
                    <span class="X"></span>
                    <span class="Y"></span>
                </button>
            </div>
            <div class="tiempo">
                Puntos
            </div>
            <div class="user__info">
                <div class="vidas">
                    Vidas</div>
                <div class="tiempo">
                    60s
                </div>
            </div>

        </div>
    </header>
    <main>
        <Preguntas />

    </main>
</template>
<style scoped>
header {
    border: solid 1px var(--gris);
}

.header--container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.button {
    position: relative;
    width: 4em;
    height: 4em;
    border: none;
    background: transparent;
    border-radius: 5px;
    transition: background 0.5s;
}

.X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: var(--naranja);
    transform: translateX(-50%) rotate(45deg);
}

.Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: var(--naranja);
    transform: translateX(-50%) rotate(-45deg);
}

.button:hover {
    background-color: rgb(211, 21, 21);
    cursor: pointer;
}

.button:hover .X,
.button:hover .Y {
    background-color: var(--blanco);

}

.button:active {
    background-color: rgb(130, 0, 0);
}


.user__info {
    text-align: center;
}
</style>