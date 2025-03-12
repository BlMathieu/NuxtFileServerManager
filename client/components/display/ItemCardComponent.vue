<script setup lang="ts">
import { useDirectoryStore } from '~/client/stores/DirectoryStore';
import { useWindowStore } from '~/client/stores/WindowStore';

import FileService from '~/client/services/FileService';
import FolderService from '~/client/services/FolderService';
import { canOpen } from '~/server/utils/fileFormat';
import { useMoveStore } from '~/client/stores/MoveStore';

const props = defineProps(['item']);
const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();
const fileService = new FileService();
const folderService = new FolderService();
const moveStore = useMoveStore();
const emits = defineEmits(['moveItem']);


const isOpenable = (): boolean => {
    const fileName = props.item.name;
    return canOpen.some(co => fileName.includes(co));
}
const canMove = () => {
    if (!props.item.isFolder && directoryStore.folderNumber() > 0) return true;
    else if (props.item.isFolder && (directoryStore.folderNumber() > 1 || directoryStore.oldPath != '/')) return true;
    return false;
}

const openFile = () => {
    if (!props.item.isFolder) windowStore.setTextWindow(true, props.item.name);
}

const renameItem = () => {
    windowStore.setRenameWindow(true, props.item.name);
}
const deleteItem = async () => {
    const path = `${directoryStore.oldPath}/${props.item.name}`;
    if (props.item.isFolder) folderService.delete(path);
    else fileService.delete(path);
    await directoryStore.findItems(directoryStore.oldPath);
}
const download = async () => {
    const path = `${directoryStore.oldPath}/${props.item.name}`
    let data;
    if (props.item.isFolder) data = await folderService.download(path)
    else data = await fileService.download(path);
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = props.item.name;
    link.click();
}
</script>

<template>
    <div class="item-global">
        <div class="item-info">
            <img v-if="props.item.isFolder" src="/client/assets/folder.svg" alt="folder" />
            <img v-else src="/client/assets/file.svg" alt="file" />
            <p class="item" @click="renameItem">{{ props.item.name }}</p>

            <div class="item-bt">
                <button v-if="!props.item.isFolder && isOpenable()" class="bt-open" @click="openFile">Ouvrir</button>
                <button class="bt-add" @click="download">Télécharger</button>
            </div>
        </div>

        <div>
            <button v-if="moveStore.toMove.btItem && canMove()" class="bt-move"
                @click="() => { moveStore.setSelectedItem(props.item.name); }">Déplacer</button>

            <button
                v-else-if="props.item.isFolder && !moveStore.toMove.btItem && props.item.name != moveStore.toMove.selected"
                class="bt-move" @click="$emit('moveItem', props.item.name)">Déplacer ici</button>
            <button v-else-if="!moveStore.toMove.btItem && moveStore.toMove.selected == props.item.name" class="bt-move"
                @click="moveStore.cancel">Annuler</button>

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
    justify-content: space-between;
}

.item-info {
    display: flex;
    align-items: center;
    margin-right: 2em;
}

div button {
    margin-left: 1em;
}

.active {
    border: solid 1px green;
}

.item-bt {
    margin-left: 1em;
}
</style>