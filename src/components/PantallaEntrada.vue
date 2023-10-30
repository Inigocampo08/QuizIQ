<template>
    <div class="login-form">
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            // Guardar los datos ingresados por el usuario en variables
            const username = this.username;
            const password = this.password;

            // Guardar los datos en el LocalStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            // Aquí puedes agregar la lógica para autenticar al usuario
            // utilizando los valores de this.username y this.password

            // Redirigir al usuario a la pantalla de inicio
            this.redirectToHome();
        },
        redirectToHome() {
            this.$router.push('/PantallaInicio');
        }
    }
}

</script>

<style>
.login-form {
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content:space-around ;

}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

label {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button[type="submit"] {
    display: block;
    width: 100%;
    padding: 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}
</style>
