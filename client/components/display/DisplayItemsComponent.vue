<script setup lang="ts">
import { useDirectoryStore } from '../../stores/DirectoryStore';
import { useWindowStore } from '../../stores/WindowStore';
import ItemCardComponent from './ItemCardComponent.vue';


const windowStore = useWindowStore();
const directoryStore = useDirectoryStore();

const openFolder = async (isFolder: boolean, name: string) => {
  if (isFolder) await directoryStore.findItems(`${directoryStore.oldPath}/${name}`);
  else windowStore.setTextWindow(true, name);
}
const goBack = () => {
  directoryStore.findItems(`${directoryStore.oldPath}/../`);
}
</script>

<template>
  <section>

    <div class="path-information">
      <p>Chemin : {{ directoryStore.oldPath }}</p>
    </div>

    <div v-if="(directoryStore.folderItems.length > 0 || directoryStore.oldPath != '')">
      <ul>
        <li v-if="directoryStore.oldPath != '/'" @dblclick="goBack">
          <p>Retour</p>
        </li>
        <li v-for="item in directoryStore.folderItems" @dblclick="() => { openFolder(item.isFolder, item.name) }">
          <ItemCardComponent :item="item" />
        </li>
      </ul>
    </div>
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