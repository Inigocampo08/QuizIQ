<script setup>

</script>
 
<template>
    <footer>
        <div class="contenedor">
            <div class="row--1">
                <div class="col">
                    <h3>Nuestra Politica</h3>
                    <ul>
                        <li><a href="#">Terminos y condiciones</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                        <li><a href="#">Ayuda</a></li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Siguenos en:</h3>
                    <div>
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-twitter"></a>
                    </div>
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

.row--1 {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 2rem;

}
.row--1 ul {
    padding-top:2rem ;
}

@media screen and (min-width: 1024px) {
    .row--1 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        align-items: baseline;

    }

    .row--1 ul {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;

    }

    ;

}

.col a:hover {
    color: var(--color2);
}


.col div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fa {
    padding: 2rem;
}

/* Add a hover effect if you want */
.fa:hover {
    color: var(--color2);

}




/* Style all font awesome icons */



.row--2 {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--blanco);
    text-align: center;


}

.row--2 p {
    margin: 0;
}

.row--2 span {
    color: var(--color2);
}
</style>