<script setup>

</script>
 
<template>
    <footer>
        <div class="contenedor">
            <div class="row--1">
                <div class="col--1">
                    <h3>Nuestra empresa</h3>
                </div>
                <div class="col--2">
                    <h3>Servicios</h3>
                </div>
                <div class="col--3">
                    <h3>Nuestra Politica</h3>
                    <ul>
                        <li><a href="#">Terminos y condiciones</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Ayuda</a></li>
                    </ul>
                </div>
                <div class="col--4">
                    <h3>Siguenos en:</h3>
                </div>
            </div>
        </div>
        <div class="row--2">
            <p> ©2024 <span>Quizziq</span>. Todos los derechos reservados.</p>
        </div>


    </footer>
</template>
<style scoped>
footer {
    margin-top: auto;
    background-color: var(--negro);
    color: var(--blanco);
    padding: 2rem;
}

footer h3,
footer a {
    margin: 0;
    color: var(--blanco);

}

@media screen and (min-width: 768px) {
    .row--1 {
        margin: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
        align-items: baseline;
    }
}

.row--2 {
    padding-top: 2rem;
    border-top: 1px solid var(--gris);
    text-align: center;
    

}

.row--2 p {
    margin: 0;
    color: var(--naranja);
}
</style>