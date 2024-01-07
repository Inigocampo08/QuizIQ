<template>
    <div class="popup">
        <div class="popup--inner">
            <slot></slot>

        </div>

    </div>
</template>
<style scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    overflow: hidden;
    /* Evita el desplazamiento */
}
.popup--inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 70%;
    background-color: #fff;
    border-radius: 2rem;
    overflow-y: auto;
    /* Añade desplazamiento interno si el contenido es demasiado largo */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

</style>