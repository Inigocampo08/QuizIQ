<template>
    <div class="container">
        <header>
            <button class="profile-btn">Perfil</button>
            <button class="settings-btn">Ajustes</button>
        </header>
        <main>
            <img src="../assets/logo.png" alt="Logo" class="logo">
            <div class="buttons-container">
                <button class="button1">Botón 1</button>
                <button class="button2">Botón 2</button>
                <button class="button3">Botón 3</button>
            </div>
        </main>
    </div>
</template>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }

    .profile-btn,
    .settings-btn {
        background-color: transparent;
        border: none;
        color: #333;
        font-size: 1rem;
        cursor: pointer;
    }

    .logo {
        width: 200px;
        height: 200px;
        margin: 2rem 0;
    }

    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button1,
    .button2,
    .button3 {
        background-color: #333;
        color: #fff;
        border: none;
        padding: 1rem 2rem;
        margin: 1rem 0;
        font-size: 1.2rem;
        cursor: pointer;
        border-radius: 5px;
    }

    .button1:hover,
    .button2:hover,
    .button3:hover {
        background-color: #555;
    }
</style>
