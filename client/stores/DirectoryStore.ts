import type { Item } from "~/server/responses/IFolderResponse";
import FolderService from "../services/FolderService";
import type IFolderResponse from "~/server/responses/IFolderResponse";
import FileService from "../services/FileService";

const folderService = new FolderService();
const fileService = new FileService();

export const useDirectoryStore = defineStore('directory', () => {
    const oldPath: Ref<string> = ref('');
    const folderItems: Ref<Item[]> = ref([]);

    async function findItems(currentFolderPath: string) {
        const response = await folderService.get(currentFolderPath) as IFolderResponse;
        folderItems.value = response.items;
        oldPath.value = response.folderPath;
    }
    async function deleteItem(itemPath: string, isFolder: boolean) {
        if (isFolder) await folderService.delete(`${oldPath.value}/${itemPath}`);
        else await fileService.delete(`${oldPath.value}/${itemPath}`);
        await findItems(oldPath.value);
    }
    async function createFile(filePath: string) {
        await fileService.add(`${oldPath.value}/${filePath}`)
        await findItems(oldPath.value);
    }
    async function createFolder(folderPath: string) {
        await folderService.add(`${oldPath.value}/${folderPath}`);
        await findItems(oldPath.value);
    }
    async function renameItem(oldItemPath: string, newItemPath: string) {
        await folderService.rename(oldItemPath, newItemPath);
        await findItems(oldPath.value);
    }

    return {
        oldPath, folderItems, findItems, deleteItem, createFile, createFolder, renameItem,
    }
});