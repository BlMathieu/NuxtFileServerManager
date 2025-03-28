<script setup lang="ts">
import axios from 'axios';
import { useDirectoryStore } from '../stores/DirectoryStore';
import { useUploadStore } from '../stores/UploadStore';

const uploadStore = useUploadStore();
const progressBar: Ref<number> = ref(0);
const isDrag = ref(false);

const dragSwitch = () => {
    isDrag.value = !isDrag.value;
}

const directoryStore = useDirectoryStore();
const handleFiles = (event: any) => {
    event.preventDefault();
    isDrag.value = false;
    const files:FileList = event.dataTransfer.files;
    Array.from(files).forEach((file: File) => {
        uploadStore.addFile(file);
    })
    progressBar.value = 0;
}

const sendFiles = async () => {
    const formData = new FormData();
    const arrayFiles = [...uploadStore.files];
    arrayFiles.forEach(file => {
        formData.append('files', file)
    });

    const itemPath = `${directoryStore.oldPath}`;
    formData.append('itemPath', itemPath);
    await axios.post("/api/upload", formData, {
        onUploadProgress: (progressEvent: any) => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            progressBar.value = (Math.round((progressEvent.loaded * 100) / totalLength));
        }
    }).catch((err) => {
        console.error(err);
    });
    await directoryStore.findItems(directoryStore.oldPath);
    uploadStore.setFiles([]);
}
</script>

<template>
    <div :class="`content ${{ 'draggable': isDrag }}`" @dragenter="dragSwitch" @dragleave="dragSwitch" @dragover.prevent
        @drop="handleFiles">
        <slot></slot>
    </div>

    <div v-if="uploadStore.files.length > 0" class="upload">
        <div>
            <h3>Fichiers à télécharger</h3>
            <div class="files">
                <div v-for="file in uploadStore.files">
                    <img src="/client/assets/download.svg" />
                    <p class="file-name">{{ file.name }}</p>
                    <button class="bt-remove" @click="() => { uploadStore.deleteFile(file) }">Supprimer</button>
                </div>
            </div>
            <div>
                <div>
                    <button class="bt-add" @click="sendFiles">Envoyer</button>
                </div>
                <div>
                    <progress :value="progressBar" max="100"></progress>
                    <p>{{ progressBar }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    color: white;
}
.content {
    min-width: 100%;
}
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
    max-width: 60px;
    overflow:hidden;
}

.draggable {
    background-color: rgb(148, 236, 148);
    border: 1px dashed green;
}
</style>