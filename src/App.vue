<script setup>
import PantallaEntrada from './components/PantallaEntrada.vue'
import PantallaInicio from './components/PantallaInicio.vue'

</script>

<template>
  <header>
    <div class="lema">
      <img class="logo" src="./assets/logoQUIZIQ.jpg" alt="QuizIQ" />
    </div>
  </header>
  <br><br><br><br>
  <br><br><br><br>
  <main>
    <PantallaEntrada />
  </main>
</template>

<style scoped>

  /* Quiero poner el logo en el centro*/
  /* .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  } */

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }



  header .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

</style>
