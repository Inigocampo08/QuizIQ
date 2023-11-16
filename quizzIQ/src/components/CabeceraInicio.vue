<script setup>
import logo from '../assets/logo.jpg'
import userIcon from '../assets/user-icon.png'
import ajustesIcon from '../assets/ajustes.png'
</script>
 
<template>
    <header>
        <div class="contenido contenedor-header">
            <img class="icono " :src="userIcon" alt="Icono-Usuario">
            <img class="icono-logo" :src="logo" alt="logo-del-sitio">
            <img class="icono icono" :src="ajustesIcon" alt="Icono-ajustes-tuerca">
        </div>
    </header>
</template>
<style scoped>
/* Estilo para la cabecera */
header {
    width: 100%;
    margin: 0;
    background-color: var(--verdeLima);
    padding: 2rem 0;
    background-image: url(../assets/header-fondo.jpg);
    background-size: cover;
    background-position: top;

}

.contenedor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icono {
    width: 4rem;
    height: 100%;
    transition: transform 300ms ease-in-out;
}

.icono:hover {
    transform: scale(1.2) rotate(360deg);

}

.icono-logo {
    width: 10rem;
    height: 100%;
    margin-bottom: -7rem;
    transition: transform 300ms ease-in-out;
}
.icono-logo:hover{
   animation: scale 1s infinite ease-in-out ; ;
}
@keyframes scale{
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.5);
        box-shadow: 5px 5px 10px rgba(0,0,0,.5);
    }100%{
        transform: scale(1);
    }
}
</style>