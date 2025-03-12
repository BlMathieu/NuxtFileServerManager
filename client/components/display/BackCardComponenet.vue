<script setup lang="ts">
import { useMoveStore } from '~/client/stores/MoveStore';
import { useDirectoryStore } from '../../stores/DirectoryStore';
const directoryStore = useDirectoryStore();
const moveStore = useMoveStore();
const emits = defineEmits(['moveItem']);
const goBack = () => {
    directoryStore.findItems(`${directoryStore.oldPath}/../`);
}

</script>

<template>
    <li @dblclick="goBack">
        <div class="main">
            <div>
                <p>Retour</p>
            </div>
            <div>
                <button class="bt-move" v-if="!moveStore.toMove.btItem" @click="$emit('moveItem', '../')">Déplacer ici</button>
            </div>
        </div>
    </li>
</template>

<style scoped>
.main{
    display: flex;
    justify-items: center;
    justify-content: space-between;
    
}
</style>