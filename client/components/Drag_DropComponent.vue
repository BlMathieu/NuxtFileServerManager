<script setup lang="ts">
import axios from 'axios';
import { useDirectoryStore } from '../stores/DirectoryStore';

const files: Ref<File[]> = ref([]);
const progressBar: Ref<number> = ref(0);

const directoryStore = useDirectoryStore();
const handleFiles = (event: any) => {
    event.preventDefault();
    files.value = event.dataTransfer.files;
    progressBar.value = 0;
}

const deleteFile = (file: File) => {
    const arrayFiles = [...files.value];
    files.value = arrayFiles.filter((f) => f.name !== file.name);
}

const sendFiles = async () => {
    const formData = new FormData();
    const arrayFiles = [...files.value];
    arrayFiles.forEach(file => {
        formData.append('files', file)
    })
    await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent: any) => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            progressBar.value = (Math.round((progressEvent.loaded * 100) / totalLength));
        }
    }).catch((err) => {
        console.error(err);
    });
    directoryStore.findItems(directoryStore.oldPath);
    files.value = [];
}
</script>

<template>
    <div class="draggable" @dragover.prevent @drop="handleFiles">
        <slot></slot>
    </div>
    <div class="upload" v-if="files.length > 0">
        <div class="files">
            <div v-for="file in files">
                <img src="/client/assets/upload.svg" />
                <p class="file-name">{{ file.name }}</p>
                <button @click="() => { deleteFile(file) }">Supprimer</button>
            </div>
        </div>
        <div>
            <div>
                <h3>Fichiers à télécharger</h3>
                <button @click="sendFiles">Envoyer</button>
            </div>
            <div>
                <progress :value="progressBar" max="100"></progress>
                <p>{{ progressBar }}%</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
.files {
    display: flex;
    justify-content: space-evenly;
    margin: 1em;
}

.files div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    width: 30px;
    background-color: white;
    border-radius: 0.25em;
}

.upload {
    display: flex;
    flex-direction: column;
    margin: 1em;
    border: 2px solid black;
    border-radius: 5px;
    padding: 1em;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.475);
}

.upload button {
    margin: 0.5em;
    padding: 0.5em;
    border: none
}

.file-name {
    color: white;
}
</style>