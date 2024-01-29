<script setup>
import { RouterView } from 'vue-router'
import CoronaPopup from '@/components/CoronaPopup.vue';
import PopupFinVidas from '@/components/PopupFinVidas.vue';
import PopupGanador from '@/components/PopupGanador.vue';


</script>

<template>
    <RouterView />
    <CoronaPopup></CoronaPopup>
    <PopupFinVidas />
    <PopupGanador />
</template>

