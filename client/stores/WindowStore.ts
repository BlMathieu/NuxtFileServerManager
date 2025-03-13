import type { Item } from "~/server/responses/IFolderResponse";

export const useWindowStore = defineStore('window', () => {
    const createFolderWindow: Ref<boolean> = ref(false);
    const createFileWindow: Ref<boolean> = ref(false);
    const textWindow = ref({ state: false, fileName: '' });
    const renameWindow = ref({ state: false, value: '' });
    const deleteWindow = ref({ state: false, item: { name: '', isFolder: false } });
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
    function setDeleteWindow(state: boolean, item: Item) {
        deleteWindow.value.state = state;
        deleteWindow.value.item = item;
    }
    return {
        textWindow,
        renameWindow,
        deleteWindow,
        createFileWindow,
        createFolderWindow,
        setCreateFileWindow,
        setCreateFolderWindow,
        setRenameWindow,
        setDeleteWindow,
        setTextWindow,
    };
});