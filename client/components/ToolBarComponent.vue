<script setup lang="ts">
import { useWindowStore } from '../stores/WindowStore';
const windowStore = useWindowStore();
</script>

<template>
<section>
    <div>
        <button @click="windowStore.setCreateFileWindow(true)">Creer un fichier</button>
        <button @click="windowStore.setCreateFolderWindow(true)">Creer un dossier</button>
    </div>
</section>    
</template>

<style scoped>
    div{
        display: flex;
    }
</style>