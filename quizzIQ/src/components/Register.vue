<script setup>
import { ref } from 'vue';
import Alerta from '@/components/Alerta.vue';

import { useAccessStore } from '../stores/access';
const accessStore = useAccessStore();

const formData = ref({
    email: '',
    password: '',
    password2: '',
    username: '',
});

const submit = () => {
    // Validación de datos aquí (si es necesario)
    accessStore.validateRegister(formData.value);
}
</script>
 
<template>
    <form class="form" @submit.prevent="submit">
        <h2 class="form-title">Crear una nueva Cuenta</h2>
        <Alerta v-if="accessStore.hasError">
            <template #error>
                ¡Error!
            </template>
            <template #mensaje>
                {{ accessStore.errorMsg }}
            </template>

        </Alerta>

        <div class="input-container">
            <input @input="accessStore.validateUsername(formData)" v-model="formData.username" type="username"
                name="username" id="username" placeholder="Nombre de Usuario">
        </div>
        <div class="input-container">
            <input v-model="formData.email" type="email" name="email" id="email" placeholder="Correo Electrónico">
        </div>
        <div class="input-container">
            <input @input="accessStore.validatePasswordFormat(formData)" v-model="formData.password" type="password"
                name="password" id="password" placeholder="Contraseña">
        </div>
        <div class="input-container">
            <input @input="accessStore.validatePasswordMatch(formData)" v-model="formData.password2" type="password"
                name="password2" id="password2" placeholder="Repetir Contraseña">
        </div>
        <button type="submit" class="btn--primary submit">
            Crear cuenta
        </button>

        <p class="signup-link">
            ¿Ya tienes tu cuenta?
            <a @click="accessStore.setHaveAccount">Inicia Sesión</a>
        </p>
    </form>
</template>
<style scoped>
.form {
    margin: auto;
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

}

.input-container {
    position: relative;
    width: 100%;

}

.input-container input,
.form button {
    outline: none;
    border: none;
    margin: 8px 0;
}

.input-container input {
    background-color: var(--blanco);
    padding: 2rem;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}



.submit {
    width: 100%;
}

.signup-link {
    text-align: center;
}

.signup-link a {
    text-decoration: underline;
}
</style>