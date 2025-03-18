<script setup lang="ts">
const isBackuped = ref(false);
const isLoading = ref(false);

const setStatus = async () => {
    const response = await fetch('/api/backup/stats').then((value: any) => { return value.json() });
    isBackuped.value = response.status;
}

onMounted(async () => {
    await setStatus();
});

const migrate = async () => {
    isLoading.value = true;
    await fetch('/api/backup/migrate', { method: 'POST' });
    await setStatus();
    isLoading.value = false;
}
</script>
<template>
    <div class="flex-col main">
        <div class="flex-row margin">
            <p class="margin">Status backup :</p>
            <img class="margin" v-if="isBackuped" src="/client/assets/checked.svg" alt="checked" />
            <img class="margin" v-else src="/client/assets/wrong.svg" alt="wrong" />
        </div>
        <div class="flex-col margin">
            <button class="bt-add" @click="migrate">Migrer</button>
            <img v-if="isLoading" src="/client/assets/loading.gif" alt="loading" />
        </div>
    </div>
</template>
v-if="isLoading"
<style scoped>
.flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.flex-row {
    display: flex;
}

.main {
    width: 15%;
    color: white;
    align-items: center;
    border: 1px solid white;
    border-top: none;
    border-left: none;
}

.margin {
    margin: 0.25em;
}

img {
    width: 25px;
}
</style>