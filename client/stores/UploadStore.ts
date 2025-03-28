export const useUploadStore = defineStore('upload', () => {
    const files: Ref<File[]> = ref([]);

    function deleteFile(item: File) {
        files.value = files.value.filter(i => i.name != item.name);
    }
    function addFile(item: File) {
        if (files.value.find(f => f.name == item.name)) throw new Error("File already exists !");
        files.value.push(item);
    }
    function setFiles(items: File[]) {
        files.value = items;
    }

    return { files, addFile, deleteFile, setFiles };
});