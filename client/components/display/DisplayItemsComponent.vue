<script setup lang="ts">
import { useMoveStore } from '~/client/stores/MoveStore';
import { useDirectoryStore } from '../../stores/DirectoryStore';
import ItemCardComponent from './ItemCardComponent.vue';
import BackCardComponenet from './BackCardComponenet.vue';
import Drag_DropComponent from '../Drag_DropComponent.vue';

const moveStore = useMoveStore();
const directoryStore = useDirectoryStore();

const openFolder = async (isFolder: boolean, name: string) => {
  if (isFolder) await directoryStore.findItems(`${directoryStore.oldPath}/${name}`);
}

const moveItem = async (itemName: string) => {
  const oldPath = `${directoryStore.oldPath}/${moveStore.toMove.selected}`;
  const newPath = `${directoryStore.oldPath}/${itemName}/${moveStore.toMove.selected}`;
  moveStore.move(oldPath, newPath);
  await directoryStore.findItems(directoryStore.oldPath);
}

</script>

<template>
  <section>
    <div class="path-information">
      <p>Chemin : {{ directoryStore.oldPath }}</p>
    </div>
    <Drag_DropComponent>
      <div v-if="(directoryStore.folderItems.length > 0 || directoryStore.oldPath != '')">
        <ul>
          <BackCardComponenet v-if="directoryStore.oldPath != '/'" @moveItem="moveItem" />
          <li v-for="item in directoryStore.folderItems" @dblclick="() => { openFolder(item.isFolder, item.name) }">
            <ItemCardComponent :item="item" @moveItem="moveItem" />
          </li>
        </ul>
      </div>
    </Drag_DropComponent>
  </section>
</template>

<style scoped>
ul {
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  font-size: 25px;
  max-height: 50vh;
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
  background-color: green;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

p::selection,
img::selection {
  columns: none;
}
</style>