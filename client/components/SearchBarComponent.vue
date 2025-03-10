<script setup lang="ts">
import { useDirectoryStore } from '../stores/DirectoryStore';
const selectedPath = defineModel('selectedPath');
const folderStore = useDirectoryStore();
</script>

<template>
    <div>
        <form @submit="async (event: Event) => {
            event.preventDefault();
            await folderStore.findItems(selectedPath as string);
        }">
            <input type="text" v-model="selectedPath" />
            <button><img src="/client/assets/search.svg" /></button>
        </form>
    </div>
</template>

<style scoped>
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
</style>