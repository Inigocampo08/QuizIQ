<script>
// Importaciones de Vue y otros módulos
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRuletaStore } from '@/stores/ruleta';
import { useContadorStore } from '@/stores/contador';
import Preguntas from '@/components/Preguntas.vue';
import Popup from '@/components/Popup.vue';
import Contador from '@/components/Contador.vue';


// Inicialización de Vue Router y stores
const ruletaStore = useRuletaStore();
const router = useRouter();
const contadorStore = useContadorStore();

// Lógica que se ejecuta después de que el componente se monta
onMounted(() => {
    // Inicialización de valores iniciales
    ruletaStore.mostrarPopupFinVidas = false;
    ruletaStore.coronaContador = 0;
    contadorStore.resetearContador();
});

</script>
<template>
    <header class="header">
        <div class="contenedor_header__container">
            <div class="categoria">
                <p> HISTORIA </p>
            </div>
            <div class="contador">
                <Contador />
            </div>
        </div>
    </header>
    <main>
        <!-- <Popup v-if="ruletaStore.mostrarPopupFinVidas" /> -->
        <Preguntas/>
    </main>
</template>
<style>
.header {
    font-family: var(--encabezado);
    background-color: var(--blanco);
    /* Fondo blanco para el header */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    position: relative;

}
.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.categoria{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.contador {
    width: 12rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    font-family: var(--parrafo);

}
.contenedor_header__container {
    text-align: center;
    position: relative;
    /* Para posicionar el botón de salida de manera absoluta */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    border-radius: 0.5rem;
    font-size: 2rem;
    color: var(--color3);
}
</style>