<script setup lang="ts">
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import { useWindowStore } from '~/client/stores/WindowStore';

import FileService from '~/client/services/FileService';
import FolderService from '~/client/services/FolderService';

const props = defineProps(['item']);
const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const fileService = new FileService();
const folderService = new FolderService();


const renameItem = () => {
    windowStore.setRenameWindow(true, props.item.name);
}
const deleteItem = async () => {
    const path = `${directoryStore.oldPath}/${props.item.name}`;
    if (props.item.isFolder) folderService.delete(path);
    else fileService.delete(path);
    await directoryStore.findItems(directoryStore.oldPath);
}
</script>

<template>
    <div class="item-global">
        <div class="item-info">
            <img v-if="props.item.isFolder" src="/client/assets/folder.svg" alt="folder" />
            <img v-else src="/client/assets/file.svg" alt="file" />
            <p class="item" @click="renameItem">{{ props.item.name }}</p>
        </div>
        <div class="item-bt">
            <button class="bt-remove" @click="deleteItem">Supprimer</button>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 30px;
    margin-right: 1em;
}

.item-global {
    display: flex;
}

.item-info {
    display: flex;
    align-items: center;
    margin-right: 2em;
}

div button {
    margin-left: 1em;
}
</style>