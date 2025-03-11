<script setup lang="ts">
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import FileService from '~/client/services/FileService';

const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const fileService = new FileService();

const fileName: Ref<string> = ref("");

const cancel = () => {
    windowStore.setCreateFileWindow(false)
}
const trigger = async () => {
    if (fileName.value) {
        const path = `${directoryStore.oldPath}/${fileName.value}`;
        fileService.add(path);
        await directoryStore.findItems(directoryStore.oldPath);
        windowStore.setCreateFileWindow(false);
    }
}
</script>

<template>
    <WindowComponent :title="'Créer un fichier'" @cancel="cancel" @trigger="trigger" v-model:input="fileName">
        <div class="input-div">
            <label for="name">Nom du fichier</label>
            <input v-model="fileName" id="name" type="text" />
        </div>
    </WindowComponent>
</template>

<style scoped>
.input-div {
    display: flex;
    justify-content: center;
}

.input-div label {
    margin-right: 1em;
}
</style>