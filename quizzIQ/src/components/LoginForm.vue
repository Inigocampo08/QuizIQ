<script setup>

</script>

<template>
    <!-- Creame -->
    <div class="contenido-login">
        <form class="login">
            <div class="campos">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" class="usuario" placeholder="Ej. Manolo">
            </div>
            <div class="campos">
                <label for="password">Contraseña: </label>
                <input type="text" name="password" class="password" placeholder="Ecriba su codigo secreto">
            </div>
            <input class="boton" type="submit" value="Iniciar Sesión">
        </form>
    </div>
</template>

<style  scoped>
.contenido-login{
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
}
.login {
    background-color: #fff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 50%;
    display: grid;
    gap: 2rem;
}

.campos {
    display: grid;
    gap: 1rem
}

.campos label {
    padding: 0 2rem;
}

.campos>input {
    width: 100%;
    padding: 2rem;
    border: none;

}
</style>