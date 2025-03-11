<script setup lang="ts">
import FileService from '~/client/services/FileService';
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import type IFileResponse from '~/server/responses/IFileResponse';
import { useDirectoryStore } from '~/client/stores/DirectoryStore';

const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const content: Ref<string> = ref("");
const fileService = new FileService();

onMounted(async () => {
    const response = await fileService.get(`${directoryStore.oldPath}/${windowStore.textWindow.value}`) as IFileResponse;
    content.value = response.content;
})

const cancel = () => {
    windowStore.setTextWindow(false,'');
}
const trigger = () => {
    const path = `${directoryStore.oldPath}/${windowStore.textWindow.value}`;
    fileService.save(path, content.value);
    windowStore.setTextWindow(false,'');
}

</script>
<template>
    <WindowComponent :title="`Contenu du fichier : ${windowStore.textWindow.value}`" v-model:input="content" @cancel="cancel"
        @trigger="trigger">
        <textarea v-model="content"></textarea>
    </WindowComponent>
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