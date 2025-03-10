export const useWindowStore = defineStore('window', () => {
    const renameWindow: Ref<boolean> = ref(false);
    const createFolderWindow: Ref<boolean> = ref(false);
    const createFileWindow: Ref<boolean> = ref(false);

    function setRenameWindow(state: boolean) {
        renameWindow.value = state;
    }
    function setCreateFolderWindow(state: boolean) {
        createFolderWindow.value = state;
    }
    function setCreateFileWindow(state: boolean) {
        createFileWindow.value = state;
    }
    return {
        renameWindow,
        createFileWindow,
        createFolderWindow,
        setCreateFileWindow,
        setCreateFolderWindow,
        setRenameWindow,
    };
});