<script setup>
import { computed, reactive } from 'vue';
import { usePartidaStore } from '@/stores/partida';
import { useFirestore, useCollection } from 'vuefire'
import { collection, query, orderBy, limit } from 'firebase/firestore'

const partidaStore = usePartidaStore()

const db = useFirestore()
const userCollection = collection(db, 'users')
const q = query(userCollection, orderBy('puntos', 'desc'), limit(5))
const users = reactive(useCollection(q))




const ranking = computed(() => {
    return users.value
})
const emptyRanking = computed(() => {
    return users.value.length === 0
})
const myUser = computed(() => {
    if (users.value) {
        return users.value.find(user => user.username === partidaStore.partidaData.logedUser.username)
    }
})

</script>
 
<template>
    <table>
        <thead>
            <tr>
                <th>Puesto</th>
                <th>Usuario</th>
                <th>Puntos</th>
            </tr>
        </thead>
        <tbody>
            <!-- Datos de ejemplo (puedes reemplazarlos con tus datos reales) -->
            <tr v-if="emptyRanking">
                <td colspan="3">Todavía No hay Datos</td>
            </tr>
            <tr :key="index" v-else v-for="(user, index) in ranking">
                <td>{{ index + 1 }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.puntos }}</td>
            </tr>

            <tr v-if="myUser">
                <td colspan="3">Mis Puntos: {{ myUser.puntos }}</td>
            </tr>


        </tbody>
    </table>
</template>
<style scoped>
table {
    margin: 0 auto;
    max-width: 100rem;
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    font-family: var(--encabezado);
    border: none;
    /* Eliminar el borde de la tabla */
}

th,
td {
    padding: 1.5rem;
    text-align: center;
    border-top: none;
    /* Eliminar el borde superior de las celdas */
    border-bottom: none;
    /* Eliminar el borde inferior de las celdas */
}

th {
    background-color: var(--color1-active);
    color: var(--blanco);
}

tr:nth-child(even) {
    background-color: var(--color1);
}

tr:hover {
    background-color: var(--color1-hover);
}

td:first-child {
    font-size: 1.2em;
    font-weight: bold;
}
</style>
