<script setup>
import { useAccessStore } from '@/stores/access';
const accessStore = useAccessStore();
</script>
 
<template>
    <div class="alert">
        <p><strong>
                <slot name="error"></slot>
            </strong>
            <slot name="mensaje"></slot>
        </p>
        <span @click="accessStore.errorMsg = ''" class="closebtn">&times;</span>
    </div>
</template>
<style scoped>
.alert {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    background-color: #f44336;
    color: white;
    border-radius: 2rem;
    margin-bottom: 2rem;
}

.closebtn {
    margin-left: 1.5rem;
    color: white;
    font-weight: 700;
    font-size: 5rem;
    line-height: 2rem;
    cursor: pointer;
    transition: 0.3s;
}

.closebtn:hover {
    color: var(--color1-hover);
}
</style>