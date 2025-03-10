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