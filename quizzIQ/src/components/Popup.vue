<script setup>
import { useRouter } from 'vue-router';
import { useRuletaStore } from '@/stores/ruleta';
const ruletaStore = useRuletaStore();

const router = useRouter();

const volver = () => {
    if (confirm("¿Seguro que quieres volver?")) {
        router.push({ name: 'home' });
        document.body.classList.remove('no-scroll')

    }
};
const seguir = () => {
    router.push({ name: 'access' })
    document.body.classList.remove('no-scroll')


};

</script>
<template>
    <div class="popup">
        <div class="popup--inner">
            <h2>Perdiste <span>Te quedaste sin vidas</span></h2>
            <h3>Tus puntos fueron: <span>{{ ruletaStore.puntos }}</span></h3>

            <div class="btn--container">
                <button @click="volver" class="btn--primary">Volver</button>
                <button @click="seguir" class="btn--primary">Seguir jugando</button>
            </div>

        </div>

    </div>
</template>
<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    overflow: hidden;
    /* Evita el desplazamiento */
}

.popup--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 70%;
    background-color: #fff;
    border-radius: 2rem;
    overflow-y: auto;
    /* Añade desplazamiento interno si el contenido es demasiado largo */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

h2 span {
    color: var(--color3);
    font-family: var(--parrafo);
    font-size: 2rem;
}

;

h3 span {
    color: var(--color2);
    font-family: var(--parrafo);
    font-size: 2rem;
}

.btn--container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15rem;
    margin-top: 10rem;
}
</style>