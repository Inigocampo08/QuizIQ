<script setup>
</script>
 
<template>
    <header>
        <div class="contenedor header__container">
            <img class="logo" src="/public/logo.jpg" alt="logo QuizIQ">
            <nav>
                <RouterLink :to="{ name: 'access' }"> <button class=" btn--secondary">Iniciar sesion</button></RouterLink>
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

.logo {
    max-width: 10rem;
    width: 100%;
    border-radius: 50%;
}

.btn__jugar {
    position: absolute;
    top: 40vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    animation: infinite animation 1.2s;
}

.btn__jugar:hover {
    padding: 5rem;

}

@keyframes animation {
    0% {
        transform: translate(-50%, -50%) scale(.5);
    }

    50% {
        transform: translate(-50%, -50%) scale(2);
    }

    100% {
        transform: translate(-50%, -50%) scale(.5);

    }
}</style>