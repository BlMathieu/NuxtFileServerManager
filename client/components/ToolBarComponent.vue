<script setup lang="ts">
import { useUploadStore } from '../stores/UploadStore';
import { useWindowStore } from '../stores/WindowStore';
const windowStore = useWindowStore();
const uploadStore = useUploadStore();
</script>

<template>
    <section>
        <div class="bt-div">
            <button class="bt-add" @click="windowStore.setCreateFileWindow(true)">Creer un fichier</button>
            <button class="bt-add" @click="windowStore.setCreateFolderWindow(true)">Creer un dossier</button>
            <label class="bt-add" for="bt-file">Ajouter une ressource</label>
            <input id="bt-file" type="file" @change="(event: any) => {
                const files: FileList = event.target.files;
                uploadStore.setFiles(Array.from(files));
            }" />
        </div>
    </section>
</template>

<style scoped>
.bt-div {
    display: flex;
    justify-content: center;
}

input[type="file"] {
    display: none;
}

label {
    font-size: 13px;
}
</style>