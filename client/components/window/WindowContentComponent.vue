<script setup lang="ts">
import FileService from '~/client/services/FileService';
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import type IFileResponse from '~/server/responses/IFileResponse';
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import { imgFormat } from '~/server/utils/fileFormat';

const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const content: Ref<string> = ref("");
const fileService = new FileService();

const getContent = async () => {
    const response = await fileService.get(`${directoryStore.oldPath}/${windowStore.textWindow.fileName}`) as IFileResponse;
    content.value = response.content;
}

onMounted(async () => {
    await getContent();
});

watch(windowStore.textWindow, async () => {
    await getContent();
})

const cancel = () => {
    windowStore.setTextWindow(false, '');
}
const trigger = () => {
    if (!isImg()) {
        const path = `${directoryStore.oldPath}/${windowStore.textWindow.fileName}`;
        fileService.save(path, content.value);
    }
    windowStore.setTextWindow(false, '');
}

const isImg = (): boolean => {
    return imgFormat.some(f => windowStore.textWindow.fileName.includes(f));
}
</script>
<template>
    <WindowComponent :title="`Contenu du fichier : ${windowStore.textWindow.fileName}`" v-model:input="content"
        @cancel="cancel" @trigger="trigger">
        <div class="areadiv">
            <img v-if="isImg()" :src="`data:image/jpeg;base64,${content}`">
            <textarea v-else v-model="content" rows="10"></textarea>
        </div>
    </WindowComponent>
</template>

<style scoped>
.areadiv {
    display: flex;
    justify-content: center;
    margin: 2em;
}

img {
    max-width: fit-content;
    max-height: fit-content;
}

@media (min-width: 400px) {
    textarea {
        width: 400px;
    }
}
</style>