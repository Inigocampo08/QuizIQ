<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { RouterView } from 'vue-router'
/* Componentes*/
import CabeceraInicio from './components/CabeceraInicio.vue';

// Variables
const logged= false;
</script>

<template>
<CabeceraInicio v-if="logged" />
    <div class="contenido">
      <RouterView />
    </div>

</template>

<style>
:root {
  /*Paleta de colores*/
  --verdeLima: #A4C400;
  --rojo: #E70000;
  --azul: #00A4E4;
  --amarillo: #FFD100;
  --naranja: #FF8700;
  --rosa: #FF41B4;
  --blanco: #F2F2F2;
  --grisClaro: #EEE9E9;
  --gris: #CCCCCC;
  --grisOscuro: #666666;
  --negro: #333333;
  /*Tipografia*/
  --encabezado: 'Gluten', cursive;
  --parrafo: 'Josefin Sans', sans-serif;


}

html {
  font-size: 62.5%;
  box-sizing: border-box;

}

*,
*:before,
*:after {
  box-sizing: inherit;

}

body {
  /**Tipografia*/
  margin: 0;
  padding: 0;
  font-family: var(--parrafo);
  font-size: 1.6rem;
  background-color: var(--blanco);

}

/*Encabezados*/
h1 {
  font-size: 6rem;
}

h2 {
  font-size: 5rem;
}

h3 {
  font-size: 4.2re;
}

h4 {
  font-size: 3.4rem;
}

h1,
h2,
h3,
h4 {
  font-family: var(--encabezado);
  color: var(--negro);
  font-weight: bold;
  text-transform: uppercase;
}

/* Estilo para los enlaces */
a {
  color: var(--grisOscuro);
  text-decoration: none;
  transition: color 3ms ease-in-out;
}

a:hover {
  color: var(--naranja);
}

/* Estilo para los botones */
.boton {
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 1rem ;
  color: white;
  animation: anim 6s infinite;
}
@keyframes anim{
  0% {background-color: var(--amarillo);} 
  10% {background-color: var(--verdeLima);} 
  20% {background-color: var(--azul);} 
  30% {background-color: var(--rosa);} 
  40% {background-color: var(--rojo);} 
 50% {background-color: var(--naranja);} 
 60% {background-color: var(--rojo)}
 70% {background-color:var(--rosa)} 
80% {background-color:var(--azul)} 
90% {background-color:var(--verdeLima)} 
100% {background-color:var(--amarillo)} 

}

/* Estilo para los contenido */
.contenido {
  width: 90%;
  max-width: 120rem;
  margin: 0 auto;
}
</style>
