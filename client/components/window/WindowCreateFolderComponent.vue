<script setup lang="ts">
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import FolderService from '~/client/services/FolderService';
const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const folderService = new FolderService();

const folderName: Ref<string> = ref("");

const cancel = () => {
    windowStore.setCreateFolderWindow(false);
}
const trigger = async () => {
    if (folderName.value) {
        const path = `${directoryStore.oldPath}/${folderName.value}`;
        await folderService.add(path);
        await directoryStore.findItems(directoryStore.oldPath);
        windowStore.setCreateFolderWindow(false);
    }
}
</script>

<template>
    <WindowComponent :title="'Créer un dossier'" @trigger="trigger" @cancel="cancel">
        <div class="input-div">
            <label for="name">Nom du dossier</label>
            <input v-model="folderName" id="name" type="text" />
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