<script setup lang="ts">
const props = defineProps(['title']);
const emits = defineEmits(['trigger', 'cancel']);
const input = defineModel('input');
</script>

<template>
    <section class="window">
        <div>
            <h3>{{ title }}</h3>
        </div>
        <div>
            <div class="input-div">
                <label for="name">{{ props.title }}</label>
                <input v-model="input" id="name" type="text" />
            </div>
            <div class="bt-div">
                <button @click="$emit('trigger')">Confirmer</button>
                <button @click="$emit('cancel')">Annuler</button>
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
    width: 25%;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.851);
    border: 1px black solid;
    border-radius: 0.25em;
    display: grid;
}

.input-div{
    display: flex;
    justify-content: center;
}
.input-div label{
    margin-right:1em;
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