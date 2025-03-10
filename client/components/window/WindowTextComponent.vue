<script setup lang="ts">
const content:Ref<string> = ref("");
</script>
<template>
<section class="window">
    <div>
        <textarea v-model="content"></textarea>
    </div>
    <div>
        <button>Confirmer</button>
        <button>Annuler</button>
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
</style>