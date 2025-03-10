<script setup lang="ts">
const files: Ref<File[]> = ref([]);
const handleFiles = (event: any) => {
    event.preventDefault();
    files.value = event.dataTransfer.files;
}
const deleteFile = (file: File) => {
    const arrayFiles = [...files.value];
    files.value = arrayFiles.filter((f) => f.name !== file.name);
}

const sendFiles = async () => {
    const formData = new FormData();
    const arrayFiles = [...files.value];
    arrayFiles.forEach(file=>{
        formData.append('files',file)
    })
    await $fetch("/api/upload",{
        method:'POST',
        body:formData
    })
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
                <p>{{ file.name }}</p>
                <button @click="() => { deleteFile(file) }">Supprimer</button>
            </div>
        </div>
        <div>
            <h3>Fichiers à télécharger</h3>
            <button @click="sendFiles">Envoyer</button>
        </div>
    </div>
</template>

<style scoped>
.draggable:hover {
    background-color: rgba(113, 113, 113, 0.55);
    border: 1px dashed black;
    padding-bottom: 3em;
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
}

.upload {
    display: flex;
    flex-direction: column;
    margin: 1em;
    border: 2px solid black;
    border-radius: 5px;
    padding: 1em;
    text-align: center;
}
</style>