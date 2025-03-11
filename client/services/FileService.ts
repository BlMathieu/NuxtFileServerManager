import axios from "axios";
import AbstractDirectoryService from "./AbstractDirectoryService";

export default class FileService extends AbstractDirectoryService {
    constructor() { super("/api/file"); }

    save(filePath: string, content: string): void {
        axios.post(`${this.dirPath}/save`, { filePath: filePath, content: content }).catch((err) => {
            console.error(err);
        });
    }
}