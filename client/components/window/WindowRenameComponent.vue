<script setup lang="ts">
import { useWindowStore } from '~/client/stores/WindowStore';
import WindowComponent from './WindowComponent.vue';
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import FolderService from '~/client/services/FolderService';


const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();

const newName = ref(windowStore.renameWindow.value);

const folderService = new FolderService();

const trigger = async () => {
    const oldPath = `${directoryStore.oldPath}/${windowStore.renameWindow.value}`;
    const newPath = `${directoryStore.oldPath}/${newName.value}`;
    folderService.rename(oldPath, newPath)
    await directoryStore.findItems(directoryStore.oldPath);
    windowStore.setRenameWindow(false, '');
}
const cancel = () => {
    windowStore.setRenameWindow(false, '');
}

</script>
<template>
    <WindowComponent :title="`Renommer : ${windowStore.renameWindow.value}`" @cancel="cancel" @trigger="trigger">
        <div class="input-div">
            <label for="name">Nom du dossier</label>
            <input v-model="newName" id="name" type="text" />
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