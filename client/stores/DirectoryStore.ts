import type { Item } from "~/server/responses/IFolderResponse";
import FolderService from "../services/FolderService";
import type IFolderResponse from "~/server/responses/IFolderResponse";

const folderService = new FolderService();

export const useDirectoryStore = defineStore('directory', () => {
    const oldPath: Ref<string> = ref('');
    const folderItems: Ref<Item[]> = ref([]);

    async function findItems(currentFolderPath: string): Promise<void> {
        const response = await folderService.get(currentFolderPath) as IFolderResponse;
        folderItems.value = response.items;
        oldPath.value = response.folderPath;
    }

    function folderNumber(): number {
        const folders = folderItems.value.filter(item => item.isFolder);
        return folders.length;
    }

    return {
        oldPath, folderItems, findItems, folderNumber,
    }
});