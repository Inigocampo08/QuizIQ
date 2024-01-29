<script setup>
import { useRouter } from 'vue-router';
import { useRuletaStore } from '@/stores/ruleta';
import { usePartidaStore } from '@/stores/partida'
import { useAccessStore } from '@/stores/access';

const ruletaStore = useRuletaStore();
const partidaStore = usePartidaStore()
const accesStore = useAccessStore()
const router = useRouter();

const volver = () => {
    partidaStore.partidaData.mostrarPopupFinVidas = false
    ruletaStore.resetearValoresPartida()
    router.push({ name: 'home' });
    document.body.classList.remove('no-scroll')
};
const seguir = () => {
    partidaStore.partidaData.mostrarPopupFinVidas = false
    ruletaStore.resetearValoresPartida()
    router.push({ name: 'access' })
    document.body.classList.remove('no-scroll')
};

</script>
<template>
    <div v-if="partidaStore.partidaData.mostrarPopupFinVidas" class="popup">
        <div class="popup--inner">
            <div class="popup--inner__title">
                <h2>Perdiste <span>Te quedaste sin vidas</span></h2>
            </div>
            <div class="popup--inner__subtitle">
                <h3>Tus puntos fueron: <span>{{ partidaStore.partidaData.puntos }}</span></h3>
            </div>


            <div class="btn--container">
                <button @click="volver" class="btn--primary">Volver</button>
                <button v-if="!accesStore.isAuth" @click="seguir" class="btn--primary">Seguir jugando</button>
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
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    overflow: hidden;
    /* Evita el desplazamiento */
}

.popup--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 70%;
    background-color: var(--blanco);
    border-radius: 2rem;
    overflow-y: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    border: .5rem solid rgba(100, 100, 100, 0.5);

}

.popup--inner__title {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid rgba(100, 100, 100, 0.5);
}

h2 span {
    color: var(--color3);
    font-family: var(--parrafo);
    font-size: 2rem;
}

h3 span {
    color: var(--color2);
    font-family: var(--parrafo);
    font-size: 2rem;
}

.btn--container {
    display: flex;
    margin: 0 auto;
    width: 90%;
    gap: 2rem;
    margin-top: 10rem;
}

.btn--container button {
    width: 100%;
    margin-top: 10%;
}
@media (max-width: 768px) {
    .btn--container{
        flex-direction: column;
        gap: 0;
    }  
    span{
        display: block;
        margin-top: .5rem;
    }
}
</style>