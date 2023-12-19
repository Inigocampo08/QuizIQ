<script setup>
import { useAccessStore } from '../stores/access';

const access = useAccessStore();
const formData = {
    email: '',
    password:'' 
}
</script>
 
<template>
    <form class="form" @submit.prevent="access.loginValidate(formData)">
        <h2 class="form-title">Inicia Sesión Con su cuenta</h2>
        <div class="input-container">
            <input v-model="formData.email" type="email" name="email" id="email" placeholder="Correo Electronico">
            <span>
            </span>
        </div>
        <div class="input-container">
            <input v-model="formData.password" type="password" name="password" id="password" placeholder="Contraseña">
        </div>
        <button type="submit" class="btn--primary submit">
            Iniciar Sesion
        </button>

        <p class="signup-link">
            ¿Aun no tienes una cuenta?
            <a @click="access.setHaveAccount">Registrarse</a>
        </p>
    </form>
</template>
<style scoped>
.form {
    margin: 0 auto 20rem auto;
    background-color: var(--blanco);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 70rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
    text-align: center;
    color: var(--negro);

}

.input-container {
    position: relative;
    width: 100%;

}

.input-container input,
.form button {
    outline: none;
    border: 1px solid var(--gris);
    margin: 8px 0;
}

.input-container input {
    background-color: var(--gris);
    padding: 2rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container input::placeholder {
    color: var(--negro);
}

.submit {
    width: 100%;
}

.signup-link {
    color: var(--grisOscuro);
    text-align: center;
}

.signup-link a {
    text-decoration: underline;
}
</style>