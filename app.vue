<script setup lang="ts">
import DisplayFilesComponent from './client/components/display/DisplayItemsComponent.vue';
import SearchBarComponent from './client/components/SearchBarComponent.vue';
import ToolBarComponent from './client/components/ToolBarComponent.vue';
import { useWindowStore } from './client/stores/WindowStore';
import WindowCreateFileComponent from './client/components/window/WindowCreateFileComponent.vue';
import WindowCreateFolderComponent from './client/components/window/WindowCreateFolderComponent.vue';
import WindowRenameComponent from './client/components/window/WindowRenameComponent.vue';
import WindowContentComponent from './client/components/window/WindowContentComponent.vue';
import WindowDeleteComponent from './client/components/window/WindowDeleteComponent.vue';
import MigrationComponent from './client/components/MigrationComponent.vue';

const selectedPath: Ref<string> = ref("/");
const windowStore = useWindowStore();
</script>

<template>
  <MigrationComponent/>
  <SearchBarComponent v-model:selected-path="selectedPath" />
  <ToolBarComponent/>
  <DisplayFilesComponent :selected-path="selectedPath" />
  <WindowCreateFileComponent v-if="windowStore.createFileWindow" />
  <WindowCreateFolderComponent v-if="windowStore.createFolderWindow" />
  <WindowRenameComponent v-if="windowStore.renameWindow.state" />
  <WindowContentComponent v-if="windowStore.textWindow.state" />
  <WindowDeleteComponent v-if="windowStore.deleteWindow.state"/>

</template>

<style>
html * {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
}

html {
  background-image: url('./client/assets/Cloudy.svg');
  background-size: 100%;
  background-repeat: no-repeat;
}

.files-container {
  border: 1px solid black;
}

.bt-move {
  margin: 1em;
  padding: 0.5em;
  background-color: rgb(21, 85, 223);
  border: none;
  color: white;
  font-weight: bolder;
}

.bt-open {
  margin: 1em;
  padding: 0.5em;
  background-color: rgb(145, 145, 0);
  border: none;
  color: white;
  font-weight: bolder;
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

.bt-move:hover,
.bt-add:hover,
.bt-remove:hover,
.bt-open:hover {
  background-color: rgb(203, 197, 197);
}

.bt-move:active,
.bt-add:active,
.bt-remove:active,
.bt-open:active {
  scale: 1.1;
}

p::selection,
img::selection {
  columns: none;
}
</style>