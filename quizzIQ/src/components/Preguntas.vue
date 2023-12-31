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
    background-color: var(--color4);
    font-size: 3rem;
    border-radius: 5rem;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    text-shadow:3px 5px 2px rgba(0, 0, 0, 0.15) ;


}

.respuestas:hover  {
    cursor: pointer;
    background-color: var(--color2);
    color: var(--blanco);
    transform:scale(1.05);
    transition: all .3s;
}
.respuestas:active  {
    background-color: var(--color3-active);
    transition: all .1s;
}

.respuestas span {
    font-weight: 900;
    font-size: 2.5rem;
    opacity: 0.6;
    font-family: var(--encabezado);

}</style>