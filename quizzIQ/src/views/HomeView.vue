<script setup>
</script>
 
<template>
    <header>
        <div class="contenedor header__container">
            <h1>Logo</h1>
            <nav>
                <RouterLink class="boton btn--secondary" :to="{ name: 'access' }">Iniciar sesion</RouterLink>
            </nav>
        </div>
    </header>

    <main>
        <div class="contenedor">
            <RouterLink :to="{ name: 'demo-game' }" class="btn--primary btn__jugar">Juega a nuestra demo</RouterLink>

        </div>
    </main>
</template>
<style scoped>
/** Estilo IndexView header */
.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.btn__jugar {
    position: absolute;
    top: 40vh;
    left: 50vw;
    transform: translate(-50%, -50%) scale(.5);
    transition: 0.5s;

}

.btn__jugar:hover {
    padding: 5rem;
    transform: translate(-50%, -50%) scale(2);
    transition: 0.5s;

}
</style>