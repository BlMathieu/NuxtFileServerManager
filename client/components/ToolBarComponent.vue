<script setup lang="ts">
import { useWindowStore } from '../stores/WindowStore';
const windowStore = useWindowStore();
</script>

<template>
    <section>
        <div>
            <button class="bt-add" @click="windowStore.setCreateFileWindow(true)">Creer un fichier</button>
            <button class="bt-add" @click="windowStore.setCreateFolderWindow(true)">Creer un dossier</button>
        </div>
    </section>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
}
</style>