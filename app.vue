<script setup lang="ts">
import DisplayFilesComponent from './client/components/DisplayFilesComponent.vue';
import SearchBarComponent from './client/components/SearchBarComponent.vue';
import ToolBarComponent from './client/components/ToolBarComponent.vue';
import WindowComponent from './client/components/window/WindowComponent.vue';
import { useWindowStore } from './client/stores/WindowStore';
import { useDirectoryStore } from './client/stores/DirectoryStore';
import Drag_DropComponent from './client/components/Drag_DropComponent.vue';

const selectedPath: Ref<string> = ref("/");
const newFileName: Ref<string> = ref("");
const newFolderName: Ref<string> = ref("");
const directoryStore = useDirectoryStore();
const windowStore = useWindowStore();
</script>

<template>
  <SearchBarComponent v-model:selected-path="selectedPath" />
  <ToolBarComponent />
  <Drag_DropComponent>
    <DisplayFilesComponent :selected-path="selectedPath" />
  </Drag_DropComponent>
  <WindowComponent v-if="windowStore.createFileWindow" :title="'Créer un fichier'"
    @cancel="() => { windowStore.setCreateFileWindow(false) }" @trigger="async () => {
      if (newFileName) {
        await directoryStore.createFile(newFileName);
        windowStore.setCreateFileWindow(false);
      }
    }" v-model:input="newFileName" />
  <WindowComponent v-if="windowStore.createFolderWindow" :title="'Créer un dossier'" v-model:input="newFolderName"
    @trigger="async () => {
      if (newFolderName) {
        await directoryStore.createFolder(newFolderName);
        windowStore.setCreateFolderWindow(false);
      }
    }" @cancel="() => { windowStore.setCreateFolderWindow(false) }" />
</template>

<style>
html * {
  margin: 0;
  padding: 0;
}

html {
  background-image: url('Cloudy.svg');
  background-size: 100%;
  background-repeat: no-repeat;
}

.files-container {
  border: 1px solid black;
}

.bt-add {
  margin: 1em;
  padding: 0.5em;
  background-color: green;
  border: none;
  color: white;
  font-weight: bolder;
}

.bt-remove {
  margin: 1em;
  padding: 0.5em;
  background-color: red;
  border: none;
  color: white;
  font-weight: bolder;
}

.bt-add:hover,
.bt-remove:hover {
  background-color: rgb(203, 197, 197);
}

.bt-add:active,
.bt-remove:active {
  scale: 1.1;
}
</style>