export const useWindowStore = defineStore('window', () => {
    const createFolderWindow: Ref<boolean> = ref(false);
    const createFileWindow: Ref<boolean> = ref(false);
    const textWindow = ref({ state: false, fileName: '' });
    const renameWindow = ref({ state: false, value: '' });

    function setCreateFolderWindow(state: boolean) {
        createFolderWindow.value = state;
    }
    function setCreateFileWindow(state: boolean) {
        createFileWindow.value = state;
    }
    function setTextWindow(state: boolean, fileName: string) {
        textWindow.value.state = state;
        textWindow.value.fileName = fileName
    }
    function setRenameWindow(state: boolean, itemName: string) {
        renameWindow.value.state = state;
        renameWindow.value.value = itemName;
    }
    return {
        textWindow,
        renameWindow,
        createFileWindow,
        createFolderWindow,
        setCreateFileWindow,
        setCreateFolderWindow,
        setRenameWindow,
        setTextWindow,
    };
});