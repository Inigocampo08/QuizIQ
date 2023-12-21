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
        <div class="contenedor header__container">
            <div class="salir">
                <button @click="volver" class=" button">
                    <span class="X"></span>
                    <span class="Y"></span>
                </button>
            </div>
            <div class="marcador">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <!-- Contenido de la cara frontal -->
                            <span>Cara Frontal</span>
                        </div>
                        <div class="flip-card-back">
                            <!-- Contenido de la cara trasera -->
                            0
                        </div>
                    </div>
                </div>
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
    border: solid 1px var(--color4);
}

.header__container {
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
    background-color: var(--color4);
    transform: translateX(-50%) rotate(45deg);
}

.Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2em;
    height: 1.5px;
    background-color: var(--color4);
    transform: translateX(-50%) rotate(-45deg);
}

.button:hover {
    background-color: var(--color4);
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

.flip-card {
    
    height: 4rem;
    width: 15rem;
    perspective: 1000px;
    /* Profundidad de la perspectiva */
}

.flip-card-inner {
    
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    /* Duración de la animación */
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
    /* Giro de 180 grados en el eje Y */
}

.flip-card-front,
.flip-card-back {
    display:flex;
    justify-content: center;
    align-items: center;
    color: var(--blanco);
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    /* Oculta la cara trasera durante la animación */
}

.flip-card-front {
    background-color: var(--color3);
}

.flip-card-back {
    background-color: var(--color3);
    transform: rotateY(180deg);
    /* Inicialmente oculto, girado 180 grados */
}
</style>