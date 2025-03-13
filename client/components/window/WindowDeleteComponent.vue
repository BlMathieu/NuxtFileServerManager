<script setup lang="ts">
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import WindowComponent from './WindowComponent.vue';
import FileService from '~/client/services/FileService';
import FolderService from '~/client/services/FolderService';
import { useWindowStore } from '~/client/stores/WindowStore';

const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const fileService = new FileService();
const folderService = new FolderService();

const trigger = async () => {
    const path = `${directoryStore.oldPath}/${windowStore.deleteWindow.item.name}`;
    if (windowStore.deleteWindow.item.isFolder) folderService.delete(path);
    else fileService.delete(path);
    await directoryStore.findItems(directoryStore.oldPath);
    windowStore.deleteWindow.state = false;
}
const cancel = () => {
    windowStore.deleteWindow.state = false;
}

</script>

<template>
    <WindowComponent :title="`Confirmer la suppression de : '${windowStore.deleteWindow.item.name}'`" @trigger="trigger"
        @cancel="cancel" />
</template>