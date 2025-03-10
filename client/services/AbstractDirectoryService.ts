import type IDirectoryResponse from "~/server/responses/IDirectoryResponse";

export default abstract class AbstractDirectoryService {

    protected dirPath: string;

    constructor(dir: string) { this.dirPath = dir; }

    public async get(path: string): Promise<IDirectoryResponse> {
        const folders = await $fetch<IDirectoryResponse>(`${this.dirPath}/get?path=${path}`);
        return folders
    }

    public async delete(path: string): Promise<void> {
        await $fetch(`${this.dirPath}/delete`, {
            method: 'DELETE',
            body: JSON.stringify({ itemPath: path }),
        });
    }

    public async add(path: string): Promise<void> {
        await $fetch(`${this.dirPath}/add`, {
            method: 'POST',
            body: JSON.stringify({ itemPath: path }),
        });
    }

    public async rename(oldPath: string, newPath: string): Promise<void> {
        await $fetch(`/api/rename`, {
            method: 'PATCH',
            body: JSON.stringify({ oldPath: oldPath, newPath: newPath }),
        });
    }
}