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

form {
  display: flex;
  justify-content: center;
  margin: 1em;
}

form input[type="text"] {
  border-radius: 0.25em;
  width: 25%;
  height: 30px;
  font-size: 25px;
  padding: 0.5em;
}

form button {
  height: 60px;
  width: 50px;
}

form button img {
  width: 15px;
}

.files-container {
  border: 1px solid black;
}
</style>