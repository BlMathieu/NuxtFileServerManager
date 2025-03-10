import type IDirectoryResponse from "./IDirectoryResponse";

export interface Item {
    name: string,
    isFolder: boolean,
}

export default interface IFolderResponse extends IDirectoryResponse {
    items: Item[],
    folderPath:string
}