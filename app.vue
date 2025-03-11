<script setup lang="ts">
import DisplayFilesComponent from './client/components/display/DisplayItemsComponent.vue';
import SearchBarComponent from './client/components/SearchBarComponent.vue';
import ToolBarComponent from './client/components/ToolBarComponent.vue';
import { useWindowStore } from './client/stores/WindowStore';
import Drag_DropComponent from './client/components/Drag_DropComponent.vue';
import WindowCreateFileComponent from './client/components/window/WindowCreateFileComponent.vue';
import WindowCreateFolderComponent from './client/components/window/WindowCreateFolderComponent.vue';
import WindowRenameComponent from './client/components/window/WindowRenameComponent.vue';
import WindowTextComponent from './client/components/window/WindowTextComponent.vue';

const selectedPath: Ref<string> = ref("/");
const windowStore = useWindowStore();
</script>

<template>
  <SearchBarComponent v-model:selected-path="selectedPath" />
  <ToolBarComponent />
  <Drag_DropComponent>
    <DisplayFilesComponent :selected-path="selectedPath" />
  </Drag_DropComponent>
  <WindowCreateFileComponent v-if="windowStore.createFileWindow"/>
  <WindowCreateFolderComponent v-if="windowStore.createFolderWindow"/>
  <WindowRenameComponent v-if="windowStore.renameWindow.state"/>
  <WindowTextComponent v-if="windowStore.textWindow.state"/>
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