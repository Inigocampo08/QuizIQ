<script setup>

</script>
 
<template>
    <div class="contenedor">
        <div class="preguntas">
            <p>¿Cual es la capital de Costa Rica?</p>
        </div>
        <div class="respuestas__container">
            <ul class="respuestas__list">

                <div class="respuestas">
                    <li><span>a)</span> Valladolid</li>
                </div>
                <div class="respuestas">
                    <li><span>b)</span> San José</li>
                </div>
                <div class="respuestas">
                    <li><span>c)</span> Barcelona</li>
                </div>
                <div class="respuestas">
                    <li><span>d)</span> Bogota</li>
                </div>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.preguntas {
    text-align: center;
    margin-top: 5rem;
}

.preguntas p {
    font-size: 6rem;
    font-weight: 900;

}

.respuestas__container {
    margin-top: 5rem;
    margin-bottom: 20rem;
}

.respuestas__list {
    display: grid;
    grid-template: 1fr / auto auto;
    justify-items: center;
    gap: 2rem;

}

.respuestas {
    width: 100%;
    padding: 5rem;
    background-color: var(--naranja);
    font-size: 3rem;

}

.respuestas:hover {
    cursor: pointer;
    background-color: var(--amarillo);
    border: 4px solid var(--negro);
}

.respuestas span {
    font-weight: 900;
    font-size: 2.5rem;
    color: var(--grisOscuro);
    opacity: 0.8;
    font-family: var(--encabezado);

}</style>