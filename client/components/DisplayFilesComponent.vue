<script setup lang="ts">
import { useDirectoryStore } from '../stores/DirectoryStore';
import { useWindowStore } from '../stores/WindowStore';
import WindowComponent from './window/WindowComponent.vue';

const windowStore = useWindowStore();
const props = defineProps(['selectedPath']);
const directoryStore = useDirectoryStore();

let oldName = '';
const rename: Ref<string> = ref("");

const openFolder = async (isFolder: boolean, name: string) => {
  if (isFolder) await directoryStore.findItems(`${directoryStore.oldPath}/${name}`);
}
</script>

<template>
  <section>
    <div class="path-information">
      <p>Chemin : {{ directoryStore.oldPath }}</p>
    </div>
    <div v-if="(directoryStore.folderItems.length > 0 || directoryStore.oldPath != '')">
      <ul>
        <li v-if="directoryStore.oldPath != '/'"
          @click="() => { directoryStore.findItems(`${directoryStore.oldPath}/../`) }">
          <p>Retour</p>
        </li>
        <li v-for="item in directoryStore.folderItems" @dblclick="() => { openFolder(item.isFolder, item.name) }">
          <div>
            <img v-if="item.isFolder" src="/client/assets/folder.svg" />
            <img v-else src="/client/assets/file.svg" />
            <p class="item" @click="() => {
              windowStore.setRenameWindow(true);
              rename = item.name;
              oldName = item.name;
            }">
              {{ item.name }}
            </p>
            <button class="bt-remove"
              @click="async () => { await directoryStore.deleteItem(item.name, item.isFolder); }">Supprimer</button>
          </div>
        </li>
      </ul>
    </div>

    <WindowComponent v-if="windowStore.renameWindow" :title="'Renommer'" v-model:input="rename"
      @cancel="() => { windowStore.setRenameWindow(false) }" @trigger="() => {
        directoryStore.renameItem(`${directoryStore.oldPath}/${oldName}`, `${directoryStore.oldPath}/${rename}`);
        windowStore.setRenameWindow(false);
      }" />

  </section>
</template>

<style scoped>
ul {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  font-size: 25px;
  height: 50vh;
  overflow-y: scroll;
}

li:hover,
ul li:nth-child(odd):hover {
  background-color: gray;
}

ul li:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.824);
}

li {
  list-style: none;
  padding: 1em;
  background-color: rgba(128, 128, 128, 0.398);
}

li div {
  display: flex;
}

li div p {
  width: 200px;
}

li div button {
  margin-left: 1em;
}

img {
  width: 30px;
  margin-right: 1em;
}

.path-information {
  text-align: center;
  color: rgb(84, 255, 22);
  font-size: 20px;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

p::selection,
img::selection {
  columns: none;
}
</style>