<script setup lang="ts">
import FileService from '~/client/services/FileService';
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import { useDirectoryStore } from '~/client/stores/DirectoryStore';

const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const content: Ref<string> = ref("");
const fileService = new FileService();

const config = useRuntimeConfig();
const serverAddress = config.public.SERVER_IP as string;
const serverPort = config.public.PORT as string;
const server = `${serverAddress}:${serverPort}`;

const getContent = async () => {
    const response = await fileService.get(`${directoryStore.oldPath}/${windowStore.textWindow.fileName}`);
    content.value = response;
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
    if (isTxt()) {
        const path = `${directoryStore.oldPath}/${windowStore.textWindow.fileName}`;
        fileService.save(path, content.value);
    }
    windowStore.setTextWindow(false, '');
}

const isTxt = (): boolean => { return windowStore.textWindow.fileName.includes('.txt'); }

</script>
<template>
    <WindowComponent :title="`Contenu du fichier : ${windowStore.textWindow.fileName}`" v-model:input="content"
        @cancel="cancel" @trigger="trigger">
        <div class="areadiv">
            <textarea v-if="isTxt()" v-model="content" rows="10"></textarea>
            <embed v-else
                :src="`${server}/api/file/get?path=${directoryStore.oldPath}/${windowStore.textWindow.fileName}`">
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