import axios from "axios";
import AbstractDirectoryService from "./AbstractDirectoryService";

export default class FolderService extends AbstractDirectoryService {
    constructor() { super("/api/folder"); }

    public async download(folderPath: string) {
        return await axios.get(`${this.dirPath}/download`, { params: { folderPath: folderPath }, responseType: 'blob' }).then((response) => {
            return response.data;
        }).catch((err) => {
            console.error(err);
        })
    }
}