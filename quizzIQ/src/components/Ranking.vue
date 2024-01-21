<script setup>
import { computed, reactive } from 'vue';

import { useFirestore, useCollection } from 'vuefire'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
const db = useFirestore()

const q =  query(collection(db, 'users'), orderBy('puntos', 'desc'), limit(5))
const users = reactive(useCollection(q))



const ranking = computed(() => {
    return users.value
})
const emptyRanking = computed(() => {
    return users.value.length === 0
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
                <td>Todavia</td>
                <td>No hay</td>
                <td>Datos</td>

            </tr>
            <tr v-else v-for="(user, index) in ranking">
                <td>{{ index + 1 }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.puntos }}</td>
            </tr>

        </tbody>
    </table>
</template>
<style scoped>
table {
    margin: 0 auto;
    max-width: 100rem;
    width: 100%;
    /* Modificado para ocupar todo el ancho disponible */
    border-collapse: collapse;
    margin-top: 2rem;
    /* Añadido espacio superior */
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    overflow: hidden;
    font-family: var(--encabezado);

}

th,
td {
    border: 1px solid;
    padding: 1.5rem;
    text-align: center;
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
