<script setup lang="ts">
const props = defineProps(['title']);
const emits = defineEmits(['trigger', 'cancel']);
</script>

<template>
    <section class="window">
        <div>
            <h3>{{ props.title }}</h3>
        </div>
        <div>
            <slot></slot>
            <div class="bt-div">
                <button class="bt-add" @click="$emit('trigger')">Confirmer</button>
                <button class="bt-remove" @click="$emit('cancel')">Annuler</button>
            </div>
        </div>
    </section>
</template>

<style scoped>

.window {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    background-color: rgba(255, 255, 255, 0.851);
    border: 1px black solid;
    border-radius: 0.25em;
    display: grid;
    font-size: 20px;
}

.bt-div {
    display: flex;
    justify-content: center;
}

.bt-div button {
    margin: 1em;
}

h3 {
    text-align: center;
    margin: 1em;
}
</style>