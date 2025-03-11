export const useWindowStore = defineStore('window', () => {
    const createFolderWindow: Ref<boolean> = ref(false);
    const createFileWindow: Ref<boolean> = ref(false);
    const textWindow = ref({ state: false, value: '' });
    const renameWindow = ref({ state: false, value: '' });

    function setCreateFolderWindow(state: boolean) {
        createFolderWindow.value = state;
    }
    function setCreateFileWindow(state: boolean) {
        createFileWindow.value = state;
    }
    function setTextWindow(state: boolean, initialValue: string) {
        textWindow.value.state = state;
        textWindow.value.value = initialValue;
    }
    function setRenameWindow(state: boolean, initialValue: string) {
        renameWindow.value.state = state;
        renameWindow.value.value = initialValue;
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