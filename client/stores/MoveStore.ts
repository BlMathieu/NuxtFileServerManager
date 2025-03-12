import FolderService from "../services/FolderService";

export const useMoveStore = defineStore('move', () => {
    const toMove = ref({
        selected: '',
        btItem: true,
    });


    function cancel() {
        toMove.value.selected = '';
        toMove.value.btItem = true;
    }

    function setSelectedItem(item: string) {
        toMove.value.selected = item;
        toMove.value.btItem = false;
    }

    function move(oldPath: string, newPath: string) {
        const service = new FolderService();
        service.rename(oldPath, newPath);
        cancel();
    }

    return { toMove, setSelectedItem, move, cancel };
});